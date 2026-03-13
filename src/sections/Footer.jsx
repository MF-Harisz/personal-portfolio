import React, { useContext, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faSquareLinkedin,
  faInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { LangContext } from "../providers/LangContext";
import socialLinks from "../data/social";
import PropTypes from "prop-types";

const iconMap = {
  faGithub,
  faSquareLinkedin,
  faInstagram,
  faSquareXTwitter,
};

const Footer = ({ onOpenContact }) => {
  const { t } = useContext(LangContext);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const quickLinks = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "services", href: "#services" },
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      navigate("/#contact");
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    if (onOpenContact) {
      onOpenContact();
    }
  };

  const copyrightText =
    t?.footer?.copyright?.replace("{year}", currentYear) ||
    `© ${currentYear} MF Haris.Tech | All rights reserved.`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.footer
      ref={footerRef}
      style={{ y, opacity, scale }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
      bg-light
      text-foreground
      px-6 md:px-12 lg:px-25
      pt-16 pb-10
      relative
    "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-5 left-5 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px]"
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-5 right-5 w-40 h-40 bg-purple-500/5 rounded-full blur-[50px]"
          animate={{
            x: [0, -10, 0],
            y: [0, -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* TOP SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
        >
          {/* LEFT - BRAND AND HEADLINE */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 text-center md:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="font-poppins text-xl text-blue-700 font-bold tracking-widest mb-4"
            >
              Haris <span className="text-black dark:text-white">Tech</span>
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-bebas font-bold text-5xl md:text-6xl lg:text-7xl leading-none flex flex-col items-center md:items-start"
            >
              <motion.span
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                LET'S GET
              </motion.span>
              <motion.span
                className="ml-10 md:ml-15 text-blue-700"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                STARTED!
              </motion.span>
            </motion.h2>

            {/* Decorative Dot */}
            <motion.div
              className="w-2 h-2 bg-blue-700 rounded-full mt-4 mx-auto md:mx-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* RIGHT - QUICK LINKS & CONTACT */}
          <motion.div variants={itemVariants} className="md:col-span-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-6 md:gap-12">
              {/* QUICK LINKS */}
              <motion.div
                variants={itemVariants}
                className="col-span-1 md:col-span-3 flex justify-center md:justify-start"
              >
                <div className="text-center md:text-left">
                  <motion.h4
                    variants={itemVariants}
                    className="font-bebas text-base mb-4 tracking-wide"
                  >
                    {t?.footer?.quickLinks || "QUICK LINKS"}
                  </motion.h4>

                  <ul className="space-y-1.5 text-xs opacity-70">
                    {quickLinks.map((item, index) => (
                      <motion.li
                        key={item.key}
                        custom={index}
                        variants={linkVariants}
                        whileHover={{ x: 5 }}
                      >
                        <a
                          href={item.href}
                          className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors inline-block"
                        >
                          {t?.footer?.links?.[item.key] ||
                            item.key.charAt(0).toUpperCase() +
                              item.key.slice(1)}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* CONTACT SECTION */}
              <motion.div
                variants={itemVariants}
                className="col-span-1 md:col-span-3"
              >
                <motion.h4
                  variants={itemVariants}
                  className="font-bebas text-base mb-4 tracking-wide"
                >
                  {t?.footer?.contact || "CONTACT"}
                </motion.h4>

                <motion.ul
                  variants={containerVariants}
                  className="space-y-2.5 text-xs opacity-70 mb-6"
                >
                  {[
                    {
                      icon: Mail,
                      text: t?.footer?.email || "mfharis.dev@gmail.com",
                      href: `mailto:${t?.footer?.email || "mfharis.dev@gmail.com"}`,
                    },
                    {
                      icon: MapPin,
                      text:
                        t?.footer?.location || "Kediri, East Java, Indonesia",
                    },
                    {
                      icon: Phone,
                      text: t?.footer?.phone || "+62 822-2822-2869",
                      href: `tel:${t?.footer?.phone || "+62 822-2822-2869"}`,
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={linkVariants}
                      className="flex items-center gap-3 group"
                    >
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ type: "spring" }}
                      >
                        <item.icon
                          size={14}
                          className="text-blue-700 dark:text-blue-400"
                        />
                      </motion.div>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* SOCIAL ICONS */}
                <motion.div variants={itemVariants} className="flex gap-3">
                  {socialLinks.map((link, index) => {
                    const IconComponent = iconMap[link.icon];
                    return (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group
                          text-black/50 dark:text-white/50 
                          hover:text-blue-700 hover:scale-110
                          transition-all duration-300
                        "
                        aria-label={
                          t?.footer?.social?.[link.name] || link.ariaLabel
                        }
                        custom={index}
                        variants={linkVariants}
                        whileHover={{
                          scale: 1.2,
                          rotate: 5,
                          transition: { type: "spring", stiffness: 400 },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FontAwesomeIcon
                          icon={IconComponent}
                          className="text-xl md:text-2xl"
                        />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-black/10 dark:border-white/10 mb-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60"
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            {copyrightText}
          </motion.p>

          <motion.div
            className="flex gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {[
              { to: "/terms", label: t?.footer?.terms || "Terms & Conditions" },
              { to: "/privacy", label: t?.footer?.privacy || "Privacy Policy" },
              {
                action: handleScrollToContact,
                label: t?.footer?.contactMe || "Contact Me",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={linkVariants}
                custom={index}
                whileHover={{ y: -2 }}
              >
                {item.to ? (
                  <Link
                    to={item.to}
                    className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href="#contact"
                    onClick={item.action}
                    className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

Footer.propTypes = {
  onOpenContact: PropTypes.func,
};

Footer.defaultProps = {
  onOpenContact: () => {},
};

export default Footer;
