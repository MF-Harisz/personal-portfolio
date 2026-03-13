import { motion } from "framer-motion";
import { useContext, useMemo } from "react";
import { LangContext } from "../providers/LangContext";
import MoreButton from "../components/MoreButton";
import PropTypes from "prop-types";

const ProjectCard = ({ item, variant = "small", index }) => {
  const { t } = useContext(LangContext);
  const isLarge = variant === "large";

  const text = useMemo(() => {
    return {
      title:
        t?.projects?.items?.[item.slug]?.title ||
        item.title ||
        "Untitled Project",
      desc:
        t?.projects?.items?.[item.slug]?.desc ||
        item.desc ||
        "No description available",
      ...t?.projects?.items?.[item.slug],
    };
  }, [t, item.slug, item.title, item.desc]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const handleImageError = (e) => {
    e.target.src = "/images/fallback-project.jpg";
    e.target.alt = "Image failed to load";
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group"
      itemScope
      itemType="https://schema.org/Project"
    >
      {/* IMAGE CONTAINER */}
      <div
        className={`
          relative
          ${isLarge ? "h-72" : "h-56"}
          rounded-xl overflow-hidden
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900
          shadow-lg dark:shadow-gray-900/30
          group-hover:shadow-2xl
          group-hover:shadow-blue-500/20
          transition-all duration-500
        `}
      >
        <img
          src={item.image}
          alt={text.title}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover
            group-hover:scale-105 
            transition-transform duration-700
            will-change-transform"
          draggable={false}
        />

        {/* Optional: Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* CONTENT */}
      <div className="mt-6 space-y-3">
        {/* HEADER with title and button */}
        <div className="flex items-end justify-between gap-4">
          <h3
            className="text-sm font-bebas font-bold tracking-widest text-black dark:text-white"
            itemProp="name"
          >
            {text.title}
          </h3>

          <MoreButton
            label={t?.common?.explore || "Explore"}
            size="sm"
            to={`/project/${item.slug}`}
            aria-label={`Explore ${text.title} project`}
          />
        </div>

        {/* DESCRIPTION */}
        <p
          className="text-xs font-poppins text-black/70 dark:text-gray-300 line-clamp-2"
          itemProp="description"
        >
          {text.desc}
        </p>

        {/* TECH STACK */}
        <p
          className="text-[10px] font-poppins uppercase tracking-widest text-black/50 dark:text-gray-400"
          itemProp="keywords"
        >
          {item.tech || "No tech stack specified"}
        </p>
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tech: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(["small", "large"]),
  index: PropTypes.number.isRequired,
};

ProjectCard.defaultProps = {
  variant: "small",
  item: {
    tech: "",
    title: "",
    desc: "",
  },
};

export default ProjectCard;
