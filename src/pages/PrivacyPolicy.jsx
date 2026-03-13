import { motion } from "framer-motion";
import { useEffect, useContext } from "react";
import LegalLayout from "../pages/LegalLayout";
import { Shield } from "lucide-react";
import { LangContext } from "../providers/LangContext";

const PrivacyPolicy = () => {
  const { t } = useContext(LangContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const separatorVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.8, delay: 0.2 } },
  };

  const sections = [
    {
      number: "01",
      title: t.privacy?.sections?.info?.title,
      content: t.privacy?.sections?.info?.content,
    },
    {
      number: "02",
      title: t.privacy?.sections?.usage?.title,
      content: t.privacy?.sections?.usage?.content,
    },
    {
      number: "03",
      title: t.privacy?.sections?.security?.title,
      content: t.privacy?.sections?.security?.content,
    },
    {
      number: "04",
      title: t.privacy?.sections?.cookies?.title,
      content: t.privacy?.sections?.cookies?.content,
    },
    {
      number: "05",
      title: t.privacy?.sections?.consent?.title,
      content: t.privacy?.sections?.consent?.content,
    },
  ];

  return (
    <LegalLayout
      title={t.privacy?.title || "Privacy Policy"}
      icon={Shield}
      lastUpdated={`${t.privacy?.lastUpdated || "Last Updated"}: February 24, 2026`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {sections.map((section, index) => (
          <motion.section
            key={section.number}
            variants={itemVariants}
            className="relative"
          >
            {/* Nomor section */}
            <div className="flex items-start gap-6 mb-6">
              <span className="font-bebas text-5xl md:text-6xl text-blue-700/20 dark:text-blue-500/20 select-none">
                {section.number}
              </span>
              <h2 className="font-bebas text-3xl md:text-4xl text-black dark:text-white pt-2">
                {section.title}
              </h2>
            </div>

            {/* Content */}
            <div className="pl-0 md:pl-16">
              {Array.isArray(section.content) ? (
                <div className="space-y-4">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      {Array.isArray(item) ? (
                        <ul className="space-y-2 font-poppins text-base md:text-lg text-gray-600 dark:text-gray-300">
                          {item.map((li, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 + i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <span className="text-blue-700 text-lg mt-1">
                                •
                              </span>
                              <span className="leading-relaxed">{li}</span>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="font-poppins text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-poppins text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>

            {/* Separator */}
            {index < sections.length - 1 && (
              <motion.div
                variants={separatorVariants}
                initial="hidden"
                animate="visible"
                className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mt-12"
              />
            )}
          </motion.section>
        ))}

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/30 backdrop-blur-sm"
        >
          <p className="font-poppins text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="text-2xl font-bebas text-blue-700 dark:text-blue-400 block mb-3">
              {t.privacy?.contact?.question || "Questions?"}
            </span>
            {t.privacy?.contact?.message ||
              "If you have any questions about this Privacy Policy, please contact me through the contact form on this website."}
          </p>
        </motion.div>
      </motion.div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
