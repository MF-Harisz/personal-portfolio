import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LangContext } from "../providers/LangContext";
import { projects, getRelatedProjects } from "../data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const autoPlayRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [project, setProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const { t } = useContext(LangContext);

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLightboxOpen(false);
  }, [slug]);

  const currentProject = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug],
  );

  useEffect(() => {
    if (!currentProject) {
      navigate("/", { replace: true });
      return;
    }

    const translated = t?.projects?.items?.[currentProject.slug] || {};
    const mergedProject = {
      ...currentProject,
      ...translated,
    };

    setProject(mergedProject);

    const index = projects.findIndex((p) => p.slug === slug);

    if (index > 0) {
      const prev = projects[index - 1];
      setPrevProject({
        ...prev,
        ...(t?.projects?.items?.[prev.slug] || {}),
      });
    } else {
      setPrevProject(null);
    }

    if (index < projects.length - 1 && index !== -1) {
      const next = projects[index + 1];
      setNextProject({
        ...next,
        ...(t?.projects?.items?.[next.slug] || {}),
      });
    } else {
      setNextProject(null);
    }

    if (currentProject) {
      const related = getRelatedProjects(currentProject, 3).map((p) => ({
        ...p,
        ...(t?.projects?.items?.[p.slug] || {}),
      }));
      setRelatedProjects(related);
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [slug, navigate, t, currentProject]);

  const allImages = useMemo(() => {
    if (!project) return [];
    return project.images && project.images.length > 0
      ? [project.image, ...project.images]
      : [project.image];
  }, [project]);

  const nextImage = useCallback(() => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1,
      );
    }
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1,
      );
    }
  }, [allImages.length]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (!isHovered && !isLightboxOpen && allImages.length > 1) {
      autoPlayRef.current = setInterval(() => {
        nextImage();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered, isLightboxOpen, allImages.length, nextImage]);

  const handleManualNext = useCallback(
    (e) => {
      e?.stopPropagation();
      nextImage();
    },
    [nextImage],
  );

  const handleManualPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      prevImage();
    },
    [prevImage],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-poppins text-gray-600 dark:text-gray-400">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-light dark:bg-dark px-6 md:px-12 lg:px-24 py-20 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* BACK TO HOME */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-bebas font-bold text-xl tracking-widest text-black dark:text-white transition-all duration-300 hover:text-blue-700 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          {t?.common?.backToHome || "Back to Home"}
        </Link>

        {/* HERO SECTION - SLIDESHOW */}
        <motion.div
          key={slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl overflow-hidden group bg-gray-200 dark:bg-gray-800"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image Container */}
          <div
            className="relative cursor-pointer h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
            onClick={() => openLightbox(currentImageIndex)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={allImages[currentImageIndex]}
                alt={`${project.title || "Project"} - ${currentImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/fallback-project.jpg";
                }}
              />
            </AnimatePresence>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handleManualPrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleManualNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Image Counter */}
          {allImages.length > 1 && (
            <>
              <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {currentImageIndex + 1} / {allImages.length}
              </div>

              {/* Thumbnail Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      index === currentImageIndex
                        ? "w-10 bg-blue-600"
                        : "w-2 bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-black/20 hover:bg-black/40 transition-all z-50"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-black/20 hover:bg-black/40 transition-all z-50"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Lightbox Image */}
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={allImages[currentImageIndex]}
                alt={`${project.title || "Project"} - Image ${currentImageIndex + 1}`}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  e.target.src = "/images/fallback-project.jpg";
                }}
              />

              {/* Image Counter */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm overflow-x-auto max-w-[90vw]">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
                        index === currentImageIndex
                          ? "ring-2 ring-blue-600 scale-110"
                          : "opacity-50 hover:opacity-100"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/images/fallback-project.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INFO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-16">
          {/* LEFT COLUMN - PROJECT DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* PROJECT OVERVIEW */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bebas font-bold uppercase tracking-widest text-black dark:text-white">
                {project.title}
              </h2>
              <p className="text-sm md:text-base font-poppins leading-relaxed text-gray-600 dark:text-gray-400">
                {project.fullDescription || project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.category.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-1.5 text-xs font-bebas tracking-widest bg-black/5 dark:bg-white/10 text-black dark:text-white rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* KEY FEATURES */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bebas font-bold uppercase tracking-widest text-black dark:text-white">
                  {t.projects.keyFeature}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-sm font-poppins text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CHALLENGE & SOLUTION */}
            {(project.challenge || project.solution) && (
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bebas font-bold uppercase tracking-widest text-black dark:text-white">
                  {t.projects.theChallenge}
                </h2>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Vertical Line (Desktop) */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                  {project.challenge && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative md:pr-8"
                    >
                      <div className="mb-4 text-xl font-bebas tracking-widest text-blue-700">
                        {t.projects.challenge}
                      </div>
                      <p className="text-sm font-poppins leading-relaxed text-gray-600 dark:text-gray-400">
                        {project.challenge}
                      </p>
                    </motion.div>
                  )}

                  {project.solution && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative md:pl-8"
                    >
                      <div className="mb-4 text-xl font-bebas tracking-widest text-blue-700">
                        {t.projects.solution}
                      </div>

                      <p className="text-sm font-poppins leading-relaxed text-gray-600 dark:text-gray-400">
                        {project.solution}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN - STICKY INFO PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div
              className="
                rounded-xl p-8 space-y-8
                bg-gradient-to-br 
                  from-indigo-500/10 via-indigo-500/5 to-transparent
                  dark:from-indigo-500/20 dark:via-indigo-500/10 dark:to-indigo-500/5
                border border-indigo-500/20 dark:border-indigo-400/30
                backdrop-blur-xl
                shadow-sm
                hover:shadow-lg hover:shadow-indigo-500/20
                transition-all duration-300
              "
            >
              {/* PROJECT METADATA */}
              <div className="space-y-6">
                {/* Technology */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                    {t.projects.tech}
                  </p>
                  <p className="mt-2 text-sm font-medium font-poppins text-gray-900 dark:text-white">
                    {project.tech}
                  </p>
                </div>

                {/* Client */}
                {project.client && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                      {t.projects.forClient}
                    </p>
                    <p className="mt-2 text-sm font-medium font-poppins text-gray-900 dark:text-white">
                      {project.client}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {/* Duration */}
                  {project.duration && (
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                        {t.projects.start}
                      </p>
                      <p className="mt-2 text-sm font-medium font-poppins text-gray-900 dark:text-white">
                        {project.duration}
                      </p>
                    </div>
                  )}

                  {/* Completed Date */}
                  {project.completedDate && (
                    <div className="text-right">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                        {t.projects.finish}
                      </p>
                      <p className="mt-2 text-sm font-medium font-poppins text-gray-900 dark:text-white">
                        {project.completedDate}
                      </p>
                    </div>
                  )}
                </div>

                {/* Role */}
                {project.role && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                      {t.projects.role}
                    </p>
                    <p className="mt-2 text-sm font-medium font-poppins text-gray-900 dark:text-white">
                      {project.role}
                    </p>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-4">
                {project.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)]"
                  >
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Live Preview
                  </motion.a>
                )}

                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white border border-gray-300/50 dark:border-gray-700/50 text-gray-900 dark:text-white hover:text-white dark:hover:text-black font-semibold text-sm transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                    Source Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RELATED PROJECTS */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bebas font-bold uppercase tracking-widest text-black dark:text-white">
              {t.projects.simProject}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/project/${item.slug}`} className="group block">
                    <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="mt-4 text-sm font-bebas font-bold tracking-widest text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs font-poppins text-gray-600 dark:text-gray-400 line-clamp-2">
                      {item.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* NAVIGATION BETWEEN PROJECTS - Fixed to use slug */}
        <div className="flex justify-between items-center pt-12 border-t border-gray-200 dark:border-gray-800">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.slug}`}
              className="flex items-center gap-3 group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-blue-700" />
              <span className="text-sm font-bebas font-bold tracking-widest text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-300">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/project/${nextProject.slug}`}
              className="flex items-center gap-3 group"
            >
              <span className="text-sm font-bebas font-bold tracking-widest text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-300">
                {nextProject.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-blue-700" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
