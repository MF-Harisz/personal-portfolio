import { useState, useContext, useRef } from "react";
import { LangContext } from "../providers/LangContext";
import ContactModal from "../components/ContactModal";
import MoreButton from "../components/MoreButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquareMore, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faSquareLinkedin,
  faInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import socialLinks from "../data/social";

const iconMap = {
  faGithub,
  faSquareLinkedin,
  faInstagram,
  faSquareXTwitter,
};

const Contact = () => {
  const { t } = useContext(LangContext);
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const headline1 = (t?.contact?.headline1 || "HAVE AN").split("");
  const headline2 = (t?.contact?.headline2 || "IDEA?").split("");
  const headline3 = (t?.contact?.headline3 || "TALK").split("");
  const headline4 = (t?.contact?.headline4 || "TO ME!").split("");

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-light px-4 md:px-10 lg:px-16 py-28 overflow-hidden relative"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 px-4 md:px-8 relative z-10">
        {/* LEFT SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10"
        >
          {/* HEADLINE with Letter Animation */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h2
              variants={itemVariants}
              className="font-bebas font-bold text-5xl md:text-6xl lg:text-7xl leading-none text-black dark:text-white flex flex-wrap"
            >
              {headline1.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className={letter === " " ? "w-4" : ""}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                custom={headline1.length}
                variants={letterVariants}
                className="text-blue-700 ml-2"
              >
                {headline2.map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={headline1.length + index + 1}
                    variants={letterVariants}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h2>

            <motion.div variants={itemVariants} className="flex items-center">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageSquareMore className="w-15 h-15 text-blue-700 mx-4 md:mx-8 -rotate-12 hover:rotate-0 transition-transform duration-300" />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="font-bebas font-bold text-5xl md:text-6xl lg:text-7xl leading-none flex flex-wrap"
              >
                <motion.span
                  custom={0}
                  variants={letterVariants}
                  className="text-blue-700"
                >
                  {headline3.map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  custom={headline3.length}
                  variants={letterVariants}
                  className="ml-2"
                >
                  {headline4.map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={headline3.length + index + 1}
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h2>
            </motion.div>
          </motion.div>

          {/* SOCIAL MEDIA LINKS */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 md:gap-7"
          >
            {socialLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={t?.contact?.social?.[link.name] || link.ariaLabel}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon
                    icon={IconComponent}
                    className={`text-black/50 dark:text-white/50 transition-all duration-300 group-hover:scale-110 text-2xl md:text-3xl ${link.color}`}
                  />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            variants={itemVariants}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-blue-700 to-transparent"
          />
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div
          style={{ scale }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col h-full justify-between items-end text-right"
        >
          {/* TOP INFO */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-end gap-3"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Mail className="w-5 h-5 text-blue-700" />
              </motion.div>
              <motion.span
                variants={itemVariants}
                className="tracking-widest text-xl font-bebas font-bold"
              >
                {t?.contact?.workTogether || "LET'S WORK TOGETHER!"}
              </motion.span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-poppins text-sm leading-relaxed text-black/70 dark:text-gray-300 max-w-sm"
            >
              {t?.contact?.description ||
                "Have a project in mind or just want to say hello? Feel free to reach out."}
            </motion.p>
          </motion.div>

          {/* CTA SECTION */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-end gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <MoreButton
                label={t?.common?.sendMessage || "Send Me a Message"}
                size="lg"
                onClick={() => setOpenModal(true)}
              />
            </motion.div>

            {/* MICRO INFO */}
            <motion.span
              variants={itemVariants}
              className="text-xs font-poppins text-black/50 dark:text-white/50"
            >
              {t?.contact?.replyTime || "Usually replies within 24 hours"}
            </motion.span>

            <motion.p
              variants={itemVariants}
              className="text-xs text-black/50 dark:text-white/50"
            >
              {t?.contact?.location ||
                "Based in Indonesia (GMT+7) · Available Worldwide"}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <ContactModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </section>
  );
};

export default Contact;
