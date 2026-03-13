import { motion } from "framer-motion";
import { useEffect, useContext } from "react";
import LegalLayout from "../pages/LegalLayout";
import { FileText } from "lucide-react";
import { LangContext } from "../providers/LangContext";

const TermsConditions = () => {
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
      title: t.terms?.sections?.usage?.title,
      content: t.terms?.sections?.usage?.content,
    },
    {
      number: "02",
      title: t.terms?.sections?.intellectual?.title,
      content: t.terms?.sections?.intellectual?.content,
    },
    {
      number: "03",
      title: t.terms?.sections?.projects?.title,
      content: t.terms?.sections?.projects?.content,
    },
    {
      number: "04",
      title: t.terms?.sections?.external?.title,
      content: t.terms?.sections?.external?.content,
    },
    {
      number: "05",
      title: t.terms?.sections?.changes?.title,
      content: t.terms?.sections?.changes?.content,
    },
  ];

  return (
    <LegalLayout
      title={t.terms?.title || "Terms of Service"}
      icon={FileText}
      lastUpdated={`${t.terms?.lastUpdated || "Last Updated"}: February 24, 2026`}
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
              <p className="font-poppins text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
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
              {t.terms?.contact?.question || "Questions?"}
            </span>
            {t.terms?.contact?.message ||
              "If you have any questions about these Terms, please contact me through the contact form on this website."}
          </p>
        </motion.div>
      </motion.div>
    </LegalLayout>
  );
};

export default TermsConditions;
