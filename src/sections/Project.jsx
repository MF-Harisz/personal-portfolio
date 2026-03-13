import { useState, useContext, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { LangContext } from "../providers/LangContext";

const Projects = () => {
  const { t } = useContext(LangContext);
  const [active, setActive] = useState("BEST");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const tabs = [
    { key: "BEST", label: t.projects.tabs.BEST, category: "BEST" },
    { key: "WEB", label: t.projects.tabs.WEB, category: "WEB" },
    { key: "UI_UX", label: t.projects.tabs.UI_UX, category: "UI/UX" },
    { key: "BRANDING", label: t.projects.tabs.BRANDING, category: "BRANDING" },
    {
      key: "ILLUSTRATION",
      label: t.projects.tabs.ILLUSTRATION,
      category: "ILLUSTRATION",
    },
  ];

  const filtered = projects.filter((project) => {
    if (active === "BEST") {
      return project.category.includes("BEST");
    }

    const activeTab = tabs.find((tab) => tab.key === active);
    return project.category.includes(activeTab?.category || active);
  });

  const large = filtered.slice(0, 2);
  const small = filtered.slice(2);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full min-h-screen bg-light py-24 overflow-hidden relative"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 text-xl font-bebas font-bold tracking-widest text-black dark:text-white"
          >
            <LayoutGrid className="w-5 h-5 text-blue-700" />
            {t.projects.projectTitle}
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-sm font-poppins font-medium leading-relaxed text-black/70 dark:text-gray-300 max-w-xl mx-auto"
          >
            {t.projects.projectDesc}
          </motion.p>

          {/* FILTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-xl flex-wrap justify-center">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`whitespace-nowrap px-5 py-2.5 text-xs font-bebas tracking-widest rounded-lg transition-all duration-300
                    ${
                      active === tab.key
                        ? "bg-blue-700 text-white"
                        : "bg-transparent text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                    }
                  `}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* GRID */}
        <div className="mt-20 space-y-20">
          {large.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-14"
            >
              {large.map((item, i) => (
                <motion.div key={item.slug} variants={itemVariants}>
                  <ProjectCard
                    item={item}
                    variant="large"
                    index={i}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {small.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`grid gap-14 ${
                small.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : small.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                    : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {small.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <ProjectCard
                    item={item}
                    variant="small"
                    index={i + large.length}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <motion.p
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-lg text-gray-500 dark:text-gray-400"
              >
                {t.projects.emptyMessage}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;