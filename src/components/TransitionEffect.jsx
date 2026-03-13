import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const TransitionEffect = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const bgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white/10" : "text-black/10";
  const borderColor = isDark ? "border-white/5" : "border-black/5";

  const overlayColor = isDark
    ? "bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
    : "bg-gradient-to-b from-transparent via-blue-500/10 to-transparent";

  return (
    <>
      <motion.div
        className={`fixed inset-0 z-[100] ${bgColor} flex flex-col justify-center gap-4 overflow-hidden`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 1.0,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {/* gradient overlay */}
        <div className={`absolute inset-0 ${overlayColor}`} />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`flex whitespace-nowrap border-y ${borderColor} py-3 relative`}
            initial={{ x: i % 2 === 0 ? "-100%" : "100%" }}
            animate={{ x: i % 2 === 0 ? "100%" : "-100%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          >
            <span
              className={`font-bebas text-6xl ${textColor} px-4 tracking-wider`}
            >
              {isDark
                ? "◈ DESIGNER ◈ DEVELOPER ◈ CREATIVE ◈ "
                : "◆ DESIGNER ◆ DEVELOPER ◆ CREATIVE ◆ "}
              {isDark
                ? "◈ DESIGNER ◈ DEVELOPER ◈ CREATIVE ◈ "
                : "◆ DESIGNER ◆ DEVELOPER ◆ CREATIVE ◆ "}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

TransitionEffect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransitionEffect;