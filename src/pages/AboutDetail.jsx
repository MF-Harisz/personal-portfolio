import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useContext } from "react";
import {
  ArrowLeft,
  Download,
  Layout,
  Code2,
  Wrench,
  ListTodo,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import MoreButton from "../components/MoreButton";
import { LangContext } from "../providers/LangContext";

const AboutDetail = () => {
  const { t } = useContext(LangContext);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const blurValue = useTransform(scrollYProgress, [0, 0.8], [0, 15]);
  const blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const fromBottomVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.5 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hiddenLeft: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.6 },
    },
    hiddenRight: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.6 },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const ctaTextVariants = {
    hiddenLeft: {
      opacity: 0,
      x: -150,
      transition: { duration: 0.6 },
    },
    hiddenRight: {
      opacity: 0,
      x: 150,
      transition: { duration: 0.6 },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const ctaButtonVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.5 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen bg-light px-6 md:px-12 lg:px-24 py-20 transition-colors dark:bg-dark">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* HEADER ACTION */}
        <div className="flex items-center justify-between">
          <Link
            to="/#about"
            className="inline-flex items-center gap-2 font-bebas font-bold text-xl tracking-widest
              text-black dark:text-white transition-all duration-300 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.common?.backToHome}
          </Link>

          <a
            href="/file/CV ATS Miftahul Haris.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 font-bebas font-bold text-xl leading-none text-black dark:text-white transition-all duration-300 hover:text-blue-700"
          >
            <span>{t.common?.downloadCV}</span>
            <Download className="w-4 h-4 text-blue-700 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* ABOUT ME SECTION (Parallax Container) */}
        <div ref={containerRef} className="relative isolate w-full py-24 px-4">
          {/* HEADER TEXT */}
          <motion.div
            ref={headerRef}
            style={{
              y: yTranslate,
              opacity,
              filter: blurFilter,
            }}
            className="relative z-0 flex flex-col items-center gap-4 mb-12 text-center"
          >
            <span className="text-2xl md:text-3xl font-poppins font-bold tracking-[0.20em] text-black dark:text-white opacity-80">
              {t.about?.letThe}
            </span>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold uppercase leading-none text-black dark:text-white">
              {t.about?.story}{" "}
              <span className="text-blue-700">{t.about?.begin}</span>
            </h2>
          </motion.div>

          <div className="relative z-10 w-full max-w-5xl mx-auto mt-[-20px]">
            {/* SEPARATOR */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-700 dark:via-gray-400 to-transparent" />
            </div>
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[130%] lg:w-[110%] h-[400px] md:h-[450px] -z-10">
              <div
                className="
                absolute inset-0
                rounded-[0_0_100%_100%]
                bg-[radial-gradient(50%_50%_at_50%_0%,_rgba(59,130,246,0.18)_0%,_rgba(59,130,246,0.06)_55%,_transparent_100%)]
                blur-[0.5px]
              "
              />
            </div>
            {/* TEXT CONTENT */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-10 text-center bg-light/80 dark:bg-dark/80 backdrop-blur-sm rounded-2xl">
              <p className="font-poppins text-lg md:text-xl leading-relaxed md:leading-loose font-medium text-black dark:text-gray-300">
                {t.about?.hi}{" "}
                <span className="text-blue-700 font-semibold hover:italic transition-all duration-300">
                  {t.about?.haris}
                </span>{" "}
                {t.about?.bridge}{" "}
                <span className="text-blue-700">{t.about?.complexLogic}</span>{" "}
                {t.about?.and}{" "}
                <span className="text-blue-700">
                  {t.about?.intuitiveDesign}
                </span>{" "}
                {t.about?.craft}{" "}
                <span className="text-blue-700">{t.about?.captivating}</span>{" "}
                {t.about?.effortless}
              </p>

              <p className="font-poppins text-lg md:text-xl leading-relaxed md:leading-loose font-medium text-black dark:text-gray-300">
                {t.about?.background}{" "}
                <span className="text-blue-700">{t.about?.development}</span>{" "}
                {t.about?.and}{" "}
                <span className="text-blue-700">{t.about?.uiux}</span>,{" "}
                {t.about?.build}{" "}
                <span className="text-blue-700 font-semibold">
                  {t.about?.performance}
                </span>
              </p>

              <p className="font-poppins text-lg md:text-xl leading-relaxed md:leading-loose font-medium text-black dark:text-gray-300">
                {t.about?.exploring}{" "}
                <span className="text-blue-700">{t.about?.newHorizons}</span>{" "}
                {t.about?.technology}{" "}
                <span className="text-blue-700 font-semibold">
                  {t.about?.futureProof}
                </span>
              </p>
            </div>

            {/* GRADIENT OVERLAY */}
            <div className="pointer-events-none absolute -bottom-20 left-0 w-full h-40 -z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-light via-light/80 to-transparent dark:from-dark dark:via-dark/80" />
            </div>
          </div>
        </div>

        {/* MY VALUE */}
        <motion.div
          ref={valuesRef}
          className="flex flex-col gap-8 text-center py-5"
        >
          <div className="space-y-4">
            {/* Judul  */}
            <motion.h2
              variants={fromBottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-4xl md:text-5xl font-bold font-bebas text-black dark:text-white uppercase"
            >
              {t.about?.whatIBring}
            </motion.h2>

            {/* Deskripsi  */}
            <motion.p
              variants={fromBottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg font-poppins font-medium text-gray-600 dark:text-gray-400 max-w-md mx-auto"
            >
              {t.about?.valueDesc}
            </motion.p>
          </div>

          <div className="relative w-full max-w-3xl mx-auto mt-8 py-24">
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 inset-y-0 w-[2px] bg-black dark:bg-white line-pointed-soft" />
            <div className="flex flex-col gap-16">
              {/* CLARITY */}
              <motion.div
                variants={contentVariants}
                initial="hiddenLeft"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.1 }}
                className="relative w-1/2 pr-16 text-right self-start"
              >
                <span className="absolute -right-px top-3 w-12 h-px bg-gradient-to-l from-black dark:from-white to-transparent" />
                <h4 className="font-bebas text-2xl uppercase text-black dark:text-white">
                  {t.about?.clarity}
                </h4>
                <p className="mt-4 text-base font-poppins text-gray-700 dark:text-gray-400">
                  {t.about?.clarityDesc}
                </p>
              </motion.div>

              {/* PRECISION */}
              <motion.div
                variants={contentVariants}
                initial="hiddenRight"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.2 }}
                className="relative w-1/2 pl-16 text-left self-end"
              >
                <span className="absolute -left-px top-3 w-12 h-px bg-gradient-to-r from-black dark:from-white to-transparent" />
                <h4 className="font-bebas text-2xl uppercase text-black dark:text-white">
                  {t.about?.precision}
                </h4>
                <p className="mt-4 text-base font-poppins text-gray-700 dark:text-gray-400">
                  {t.about?.precisionDesc}
                </p>
              </motion.div>

              {/* PURPOSE */}
              <motion.div
                variants={contentVariants}
                initial="hiddenLeft"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.3 }}
                className="relative w-1/2 pr-16 text-right self-start"
              >
                <span className="absolute -right-px top-3 w-12 h-px bg-gradient-to-l from-black dark:from-white to-transparent" />
                <h4 className="font-bebas text-2xl uppercase text-black dark:text-white">
                  {t.about?.purpose}
                </h4>
                <p className="mt-4 text-base font-poppins text-gray-700 dark:text-gray-400">
                  {t.about?.purposeDesc}
                </p>
              </motion.div>

              {/* CONSISTENCY */}
              <motion.div
                variants={contentVariants}
                initial="hiddenRight"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.4 }}
                className="relative w-1/2 pl-16 text-left self-end"
              >
                <span className="absolute -left-px top-3 w-12 h-px bg-gradient-to-r from-black dark:from-white to-transparent" />
                <h4 className="font-bebas text-2xl uppercase text-black dark:text-white">
                  {t.about?.consistency}
                </h4>
                <p className="mt-4 text-base font-poppins text-gray-700 dark:text-gray-400">
                  {t.about?.consistencyDesc}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* SPECIALIZED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 text-center"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-bebas uppercase text-black dark:text-white">
              {t.about?.specialized}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-4 w-full max-w-5xl mx-auto mt-12">
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.1 }}
                className="
                  h-64 rounded-xl p-8 text-left flex flex-col justify-between
                  bg-gradient-to-br 
                  from-indigo-500/10 via-indigo-500/5 to-transparent
                  dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-indigo-500/5
                  border border-indigo-500/20 dark:border-indigo-400/30
                  backdrop-blur-xl
                  hover:shadow-lg hover:shadow-indigo-500/20
                  transition-all duration-300
                  "
              >
                <Layout className="w-8 h-8 text-blue-700 mb-4" />
                <div>
                  <h3 className="font-bebas text-2xl text-black dark:text-white mb-2">
                    {t.about?.uiDesign}
                  </h3>
                  <p className="text-sm font-poppins text-gray-600 dark:text-gray-400">
                    {t.about?.uiDesc}
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 }}
                className="h-52 rounded-xl p-8 text-left flex flex-col justify-between bg-gradient-to-br 
                  from-indigo-500/10 via-indigo-500/5 to-transparent
                  dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-indigo-500/5
                  border border-indigo-500/20 dark:border-indigo-400/30
                  backdrop-blur-xl
                  hover:shadow-lg hover:shadow-indigo-500/20
                  transition-all duration-300"
              >
                <Code2 className="w-8 h-8 text-blue-700 mb-4" />
                <div>
                  <h3 className="font-bebas text-2xl text-black dark:text-white mb-2">
                    {t.about?.frontend}
                  </h3>
                  <p className="text-sm font-poppins text-gray-600 dark:text-gray-400">
                    {t.about?.frontendDesc}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-[1.3fr_1.7fr] gap-4">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.15 }}
                className="col-span-2 h-52 rounded-xl p-8 text-left flex flex-col justify-between bg-gradient-to-br 
                  from-indigo-500/10 via-indigo-500/5 to-transparent
                  dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-indigo-500/5
                  border border-indigo-500/20 dark:border-indigo-400/30
                  backdrop-blur-xl
                  hover:shadow-lg hover:shadow-indigo-500/20
                  transition-all duration-300"
              >
                <ListTodo className="w-8 h-8 text-blue-700 mb-4" />
                <h3 className="font-bebas text-2xl text-black dark:text-white">
                  {t.about?.designApproach}
                </h3>
                <p className="text-sm font-poppins text-gray-600 dark:text-gray-400">
                  {t.about?.designApproachDesc}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.25 }}
                className="h-64 rounded-xl p-8 text-left bg-gradient-to-br 
                from-indigo-500/10 via-indigo-500/5 to-transparent
                dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-indigo-500/5
                border border-indigo-500/20 dark:border-indigo-400/30
                backdrop-blur-xl
                hover:shadow-lg hover:shadow-indigo-500/20
                transition-all duration-300"
              >
                <Wrench className="w-8 h-8 text-blue-700 mb-4" />
                <h3 className="font-bebas text-2xl text-black dark:text-white mb-4">
                  {t.about?.tools}
                </h3>
                <ul className="grid grid-cols-2 gap-x-4 text-sm font-poppins text-gray-600 dark:text-gray-400">
                  <li>• React</li>
                  <li>• Next.js</li>
                  <li>• Tailwind</li>
                  <li>• Figma</li>
                  <li>• Framer</li>
                  <li>• VS Code</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.35 }}
                className="h-64 rounded-xl p-8 text-left bg-gradient-to-br 
                  from-indigo-500/10 via-indigo-500/5 to-transparent
                  dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-indigo-500/5
                  border border-indigo-500/20 dark:border-indigo-400/30
                  backdrop-blur-xl
                  hover:shadow-lg hover:shadow-indigo-500/20
                  transition-all duration-300"
              >
                <PackageCheck className="w-8 h-8 text-blue-700 mb-4" />
                <h3 className="font-bebas text-2xl text-black dark:text-white mb-4">
                  {t.about?.deliverables}
                </h3>
                <ul className="text-sm font-poppins text-gray-600 dark:text-gray-400">
                  <li>• {t.about?.landingPage}</li>
                  <li>• {t.about?.dashboardUI}</li>
                  <li>• {t.about?.designSystem}</li>
                  <li>• {t.about?.reusableComponents}</li>
                  <li>• {t.about?.scalableSystems}</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center gap-12 mt-24 w-full max-w-5xl mx-auto pb-20"
        >
          <h1
            className="
              font-bebas 
              text-5xl sm:text-6xl md:text-7xl lg:text-9xl
              leading-[0.85] md:leading-[0.9]
              font-bold 
              text-black dark:text-white 
              uppercase 
              flex flex-col 
              w-full 
              text-center
            "
          >
            <div className="flex justify-center gap-4 flex-wrap">
              {/* DARE TO */}
              <motion.span
                variants={ctaTextVariants}
                initial="hiddenLeft"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.1 }}
              >
                {t.about?.dareTo}
              </motion.span>

              {/* REALIZE */}
              <motion.span
                variants={ctaTextVariants}
                initial="hiddenRight"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.2 }}
                className="text-blue-700"
              >
                {t.about?.realize}
              </motion.span>
            </div>

            <div className="flex justify-center gap-4 flex-wrap mt-4">
              {/* YOUR */}
              <motion.span
                variants={ctaTextVariants}
                initial="hiddenLeft"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.3 }}
              >
                {t.about?.your}
              </motion.span>

              {/* DREAMS */}
              <motion.span
                variants={ctaTextVariants}
                initial="hiddenRight"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.4 }}
                className="text-blue-700"
              >
                {t.about?.dreams}
              </motion.span>
            </div>
          </h1>

          {/* button */}
          <motion.div
            variants={ctaButtonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            <MoreButton
              as="link"
              to="/#contact"
              label={t.common?.getInTouch}
              size="lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDetail;
