import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useContext } from "react";
import { LangContext } from "../providers/LangContext";

const LegalLayout = ({ title, icon: Icon, children, lastUpdated }) => {
  const { t } = useContext(LangContext);
  const headerRef = useRef(null);

  return (
    <section className="min-h-screen bg-light dark:bg-dark px-6 md:px-12 lg:px-24 py-20 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* BACK TO HOME */}
        <div className="flex items-center justify-between mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bebas font-bold text-xl tracking-widest text-black dark:text-white transition-all duration-300 hover:text-blue-700 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t.common?.backToHome || "Back to Home"}
          </Link>
        </div>

        {/* HEADER */}
        <div ref={headerRef} className="relative isolate w-full py-16 px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-0 flex flex-col items-center gap-4 mb-12 text-center"
          >
            <div className="flex items-center gap-4 justify-center mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl"
              >
                <Icon className="w-10 h-10 text-blue-700" />
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold uppercase leading-none text-black dark:text-white">
              {title}
            </h1>

            {lastUpdated && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-poppins text-sm text-gray-500 dark:text-gray-400 mt-4"
              >
                {lastUpdated}
              </motion.p>
            )}
          </motion.div>

          {/* Gradient effect */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[130%] lg:w-[110%] h-[400px] -z-10">
            <div className="absolute inset-0 rounded-[0_0_100%_100%] bg-[radial-gradient(50%_50%_at_50%_0%,_rgba(59,130,246,0.18)_0%,_rgba(59,130,246,0.06)_55%,_transparent_100%)] blur-[0.5px]" />
          </div>
        </div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 py-16 bg-light/80 dark:bg-dark/80 backdrop-blur-sm rounded-2xl"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

LegalLayout.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  lastUpdated: PropTypes.string,
};

export default LegalLayout;
