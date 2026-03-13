import { motion, useScroll, useTransform } from "framer-motion";
import { Asterisk, Download } from "lucide-react";
import { useContext, useRef } from "react";
import { LangContext } from "../providers/LangContext";
import MoreButton from "../components/MoreButton";

const About = () => {
  const { t } = useContext(LangContext);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full min-h-screen flex items-center bg-light transition-colors py-24 overflow-hidden relative"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 w-full relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1.7fr_0.7fr] gap-10 lg:gap-6 items-center"
        >
          {/* LEFT IMAGE WRAPPER */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full max-w-[260px] md:max-w-[300px] lg:max-w-[380px] h-[340px] md:h-[400px] lg:h-[480px] overflow-visible mx-auto lg:mx-0"
          >
            {/* TOP BUTTONS - MOBILE */}
            <div className="absolute -top-8 left-0 right-0 lg:hidden z-20 flex items-center justify-between">
              {/* DOWNLOAD CV */}
              <a
                href="/file/CV ATS Miftahul Haris.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 font-bebas font-bold text-base leading-none text-black dark:text-white transition-all duration-300 hover:text-blue-700"
              >
                <span>CV</span>
                <Download className="w-3.5 h-3.5 text-blue-700 transition-transform duration-300 group-hover:-translate-y-0.5" />

                {/* TOOLTIP */}
                <span className="pointer-events-none absolute -bottom-7 left-0 whitespace-nowrap rounded bg-black/70 px-2 py-1 font-poppins text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/70 dark:text-black">
                  {t.common?.downloadCV}
                </span>
              </a>

              {/* MORE ABOUT - mobile */}
              <MoreButton
                to="/about-detail"
                label={t.common?.moreAbout}
                size="md"
              />
            </div>

            {/* Main Image (Left) */}
            <motion.div
              className="w-full h-full overflow-hidden rounded-lg shadow-lg border border-gray-400/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/about1.jpg"
                alt="About me 1"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Vector Image (Mobile) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-6 lg:hidden w-[120px] md:w-[150px] z-10"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-[160px] md:h-[200px] overflow-hidden border-[3px] border-gray-300 dark:border-gray-900 shadow-2xl rounded-md">
                <img
                  src="/images/about2.png"
                  alt="About me 2"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* CENTER CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 mx-auto max-w-md mt-10 lg:mt-0 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bebas font-bold tracking-widest text-black dark:text-white"
            >
              <Asterisk className="inline w-5 h-5 text-blue-700 mr-1" />{" "}
              {t.about?.smallTitle}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold leading-tight font-bebas text-black dark:text-white uppercase"
            >
              A full-stack{" "}
              <span className="text-blue-700">
                {t.about?.mainTitleHighlight}
              </span>{" "}
              <br /> and graphic designer.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-black dark:text-gray-300 text-sm leading-relaxed font-poppins font-medium"
            >
              {t.about?.aboutDesc}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full h-px bg-gradient-to-r from-transparent via-black dark:via-gray-600 to-transparent mt-6"
            />

            {/* STATS */}
            <div className="flex gap-12 justify-center">
              {[
                { value: "4", label: t.about?.yearsOfExperience },
                { value: "200", label: t.about?.successfulProjects }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.h3
                    whileHover={{ scale: 1.2, color: "#2563eb" }}
                    className="text-3xl font-bebas text-blue-700"
                  >
                    <span className="text-5xl">{stat.value}</span>{" "}
                    <span className="text-2xl">+</span>
                  </motion.h3>
                  <p className="font-poppins font-bold text-[10px] uppercase text-black dark:text-gray-300 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE + BUTTON (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col h-full relative"
          >
            {/* DOWNLOAD CV - TOP RIGHT */}
            <motion.a
              href="/file/CV ATS Miftahul Haris.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: -5 }}
              className="absolute mt-10 right-0 group inline-flex items-center gap-2 font-bebas font-bold text-xl leading-none text-black dark:text-white transition-all duration-300 hover:text-blue-700"
            >
              <span>CV</span>
              <Download className="w-4 h-4 text-blue-700 transition-transform duration-300 group-hover:-translate-y-0.5" />

              {/* TOOLTIP */}
              <span className="pointer-events-none absolute -bottom-7 right-0 whitespace-nowrap rounded bg-black/70 px-2 py-1 font-poppins text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/70 dark:text-black">
                {t.common?.downloadCV}
              </span>
            </motion.a>

            {/* RIGHT images */}
            <div className="mt-auto flex justify-end w-full">
              <div className="flex flex-col gap-4 w-[200px]">
                <MoreButton
                  to="/about-detail"
                  label={t.common?.moreAbout}
                  size="lg"
                  className="self-end"
                />

                <motion.div
                  className="h-[250px] overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/about2.png"
                    alt="About me 2"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;