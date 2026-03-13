import React, { useContext, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LangContext } from "../providers/LangContext";
import MoreButton from "../components/MoreButton";

const Hero = () => {
  const { t } = useContext(LangContext);
  const [isHover, setIsHover] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0,
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const floatingAnimation = {
    animate: {
      x: [0, 6, -5, 8, -4, 0],
      y: [0, -8, 4, 6, -6, 0],
    },
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="home"
      className="bg-light min-h-[90vh] flex items-center py-20 overflow-hidden relative"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-3 items-center lg:gap-10">
          {/* LEFT — Desktop Name */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ scale }}
            className="hidden lg:block lg:-mt-12"
          >
            <h1 className="font-bebas text-6xl lg:text-[6rem] leading-[0.8] tracking-tighter text-right">
              MIFTAHUL <br /> HARIS
            </h1>
          </motion.div>

          {/* CENTER — Portrait */}
          <motion.div
            className="flex justify-center items-center relative w-full lg:w-auto order-first lg:order-none mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ y: useTransform(scrollY, [0, 300], [0, 50]) }}
          >
            {/* Mobile Name Overlay */}
            <div className="lg:hidden absolute inset-0 flex justify-center items-center z-20 pointer-events-none mt-48">
              <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-[0.8] tracking-tighter text-white drop-shadow-lg text-center">
                MIFTAHUL <br /> HARIS
              </h1>
            </div>

            {/* IMAGE — Random Floating */}
            <motion.div
              className="relative cursor-pointer"
              onMouseEnter={() => !isTouchDevice && setIsHover(true)}
              onMouseLeave={() => !isTouchDevice && setIsHover(false)}
              animate={{
                scale: isHover ? 1.08 : 1,
                x: floatingAnimation.animate.x,
                y: floatingAnimation.animate.y,
              }}
              transition={{
                scale: {
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                },
                x: floatingAnimation.transition,
                y: floatingAnimation.transition,
              }}
              whileTap={{
                scale: 0.95,
                transition: {
                  duration: 0.15,
                  ease: "easeOut",
                },
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ boxShadow: "0 0 0 0px rgba(59,130,246,0)" }}
                whileTap={{
                  boxShadow: "0 0 0 10px rgba(59,130,246,0.25)",
                }}
                transition={{ duration: 0.2 }}
              />

              <img
                src="/images/Hero.png"
                alt="Portrait"
                className="
              w-[280px]
              sm:w-[320px]
              md:w-[380px]
              lg:w-[420px]
              drop-shadow-xl
              select-none
            "
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ opacity }}
            className="max-w-md mx-auto lg:mx-0 mt-10 lg:mt-36"
          >
            <h3 className="text-xl font-bebas font-bold tracking-widest text-black dark:text-white text-center lg:text-left flex items-center justify-center lg:justify-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-700" />
              <span>{t.hero?.hello}</span>
            </h3>

            <p className="mt-4 text-black dark:text-gray-300 text-sm leading-relaxed font-poppins font-medium text-center lg:text-left">
              {t.hero?.heroDesc}{" "}
              <span
                onClick={scrollToContact}
                className="font-semibold italic cursor-pointer underline underline-offset-4 hover:text-blue-600"
              >
                {t.hero?.colab}
              </span>
            </p>

            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
              <span className="italic opacity-60 text-xs">
                {t.hero?.lets} <br /> {t.hero?.more}
              </span>

              <div className="h-8 w-px bg-gray-300"></div>

              <MoreButton
                onClick={scrollToAbout}
                label={t.common?.learnMore}
                size="lg"
              />
            </div>
          </motion.div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
