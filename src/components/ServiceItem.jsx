import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDownLeft } from "lucide-react";
import PropTypes from "prop-types";

const ServiceItem = ({ service, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEffectActive = isHovered || isActive;

  const leftImageY = useMotionValue(0);
  const rightImageY = useMotionValue(0);

  const leftImageTransform = useTransform(leftImageY, [0, 1], ["-50%", "-55%"]);
  const rightImageTransform = useTransform(
    rightImageY,
    [0, 1],
    ["-50%", "-45%"],
  );

  useEffect(() => {
    let animationId;
    if (isEffectActive) {
      const animate = () => {
        const time = Date.now() * 0.001;
        leftImageY.set(Math.sin(time * 1.5) * 0.5 + 0.5);
        rightImageY.set(Math.cos(time * 1.5) * 0.5 + 0.5);
        animationId = requestAnimationFrame(animate);
      };
      animate();
    } else {
      leftImageY.set(0);
      rightImageY.set(0);
    }
    return () => animationId && cancelAnimationFrame(animationId);
  }, [isEffectActive, leftImageY, rightImageY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 z-50 overflow-visible hidden md:block">
        {/* LEFT IMAGE */}
        <motion.div
          style={{
            y: leftImageTransform,
            translateX: `-${service.offset}%`,
            rotate: service.rotateL,
          }}
          animate={{ opacity: isEffectActive ? 1 : 0 }}
          className="absolute left-1/2 top-1/2 transition-opacity duration-500"
        >
          <div className="w-40 h-28 rounded-lg shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
            <motion.img
              src={service.leftImg}
              alt=""
              className="w-full h-full object-cover"
              animate={isEffectActive ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          style={{
            y: rightImageTransform,
            translateX: `${service.offset - 100}%`,
            rotate: service.rotateR,
          }}
          animate={{ opacity: isEffectActive ? 1 : 0 }}
          className="absolute left-1/2 top-1/2 transition-opacity duration-500"
        >
          <div className="w-40 h-28 rounded-lg shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
            <motion.img
              src={service.rightImg}
              alt=""
              className="w-full h-full object-cover"
              animate={isEffectActive ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.5, delay: 0.1 }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent dark:via-blue-400/5"
        animate={{ opacity: isEffectActive ? 1 : 0 }}
      />

      <div className="relative z-10 px-4 md:px-10 py-10">
        <div className="flex items-center justify-between">
          <div className="w-6 md:w-8" />
          <h2
            className={`
              font-bebas font-bold tracking-widest transition-all duration-500 text-center
              text-xl md:text-4xl
              ${
                isEffectActive
                  ? "text-blue-700 scale-[0.94]"
                  : "text-black dark:text-white scale-100"
              }
            `}
          >
            {service.title}
          </h2>

          <motion.div
            animate={{
              rotate: isActive ? 0 : -45,
              scale: isEffectActive ? 1.1 : 1,
              color: isEffectActive ? "#1d4ed8" : "#9ca3af",
            }}
          >
            <ArrowDownLeft className="w-6 h-6 md:w-8 md:h-8" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-0">
        <motion.div
          className={`h-px bg-gradient-to-r from-transparent ${
            isEffectActive ? "via-blue-700" : "via-black/20 dark:via-white/20"
          } to-transparent`}
          animate={{
            scaleX: isEffectActive ? 1 : 0.8,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

ServiceItem.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    rotateL: PropTypes.number.isRequired,
    rotateR: PropTypes.number.isRequired,
    leftImg: PropTypes.string.isRequired,
    rightImg: PropTypes.string.isRequired,
    servicesList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ServiceItem;
