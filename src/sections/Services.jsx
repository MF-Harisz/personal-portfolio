import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useState, useRef } from "react";
import { LangContext } from "../providers/LangContext";
import ServiceItem from "../components/ServiceItem";
import MoreButton from "../components/MoreButton";
import { Briefcase } from "lucide-react";
import serviceVisuals from "../data/services";

const Services = () => {
  const { t } = useContext(LangContext);
  const [activeService, setActiveService] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const services = serviceVisuals.map((visual) => {
    const serviceData = t?.services?.items?.[visual.key] || {};
    return {
      ...visual,
      title: serviceData.title || visual.key.toUpperCase().replace("-", " "),
      servicesList: serviceData.list || [],
    };
  });

  const handleServiceClick = (index) => {
    setActiveService(activeService === index ? null : index);
  };

  const handleStartClick = () => {
    setActiveService(null);

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const serviceVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-light py-32 transition-colors duration-300 overflow-hidden relative"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y, rotateX }}
      >
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* HEADER SECTION */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center gap-2 text-xl font-bebas font-bold tracking-widest text-black dark:text-white"
          >
            <Briefcase className="w-5 h-5 text-blue-700" />
            {t?.services?.title || "HOW I CAN HELP?"}
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm font-poppins font-medium leading-relaxed text-black/70 dark:text-gray-300 max-w-xl mx-auto"
          >
            {t?.services?.desc ||
              "I bridge the gap between design and code, providing end-to-end solutions for your digital needs."}
          </motion.p>
        </motion.div>

        {/* SERVICES LIST */}
        <motion.div style={{ scale }} className="mt-4">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              custom={i}
              variants={serviceVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div
                className="cursor-pointer"
                onClick={() => handleServiceClick(i)}
              >
                <ServiceItem
                  service={service}
                  index={i}
                  isActive={activeService === i}
                />
              </div>

              {/* SERVICE DETAILS PANEL */}
              {activeService === i && service.servicesList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="px-6 py-8 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg mb-6"
                  >
                    {/* SERVICES LIST */}
                    <div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {service.servicesList.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center font-poppins text-sm text-gray-700 dark:text-gray-300 group"
                          >
                            <motion.span
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: idx * 0.2,
                              }}
                              className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 flex-shrink-0 group-hover:bg-blue-500"
                            />
                            <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* ACTION BUTTON */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex justify-center mt-5 pt-6"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MoreButton
                          label={t?.common?.letStart || "Let's Start"}
                          size="lg"
                          onClick={handleStartClick}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Decorative Corner */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-600/10 rotate-45" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
