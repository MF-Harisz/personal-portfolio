import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#0a0a0a]"
    >
      <div className="relative flex flex-col items-start px-10 w-full max-w-4xl">
        {/* Number 0 to 100 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-8xl md:text-[12rem] font-bebas leading-none text-black dark:text-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {progress}%
          </motion.h1>
        </div>

        {/* Status */}
        <div className="flex justify-between w-full font-mono text-xs uppercase tracking-widest text-gray-500">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Miftahul Haris — Portfolio 2026
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {progress < 100 ? "Initializing..." : "Ready"}
          </motion.span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-[1px] w-full bg-gray-200 dark:bg-gray-800 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-blue-700"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;