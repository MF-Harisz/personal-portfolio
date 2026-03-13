import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { Menu, Sun, Moon, X } from "lucide-react";
import { LangContext } from "../providers/LangContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuRef = useRef(null);
  const { lang, setLang } = useContext(LangContext);

  const navItems = useMemo(
    () => [
      { name: "Home", id: "home" },
      { name: "About", id: "about" },
      { name: "Projects", id: "projects" },
      { name: "Services", id: "services" },
      { name: "Contact", id: "contact" },
    ],
    [],
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((i) => document.getElementById(i.id));

    const spy = () => {
      const pos = window.scrollY + 140;
      sections.forEach((s) => {
        if (!s) return;
        if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
          setActiveSection(s.id);
        }
      });
    };

    window.addEventListener("scroll", spy);
    spy();
    return () => window.removeEventListener("scroll", spy);
  }, [navItems]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const buttonStyle = (item) =>
    `px-3 h-9 flex items-center justify-center rounded-md font-bebas text-xl transition-all
     ${
       activeSection === item?.id
         ? "text-primary-600 dark:text-blue-700"
         : "text-black/90 dark:text-white/90 hover:text-blue-700"
     }`;

  const iconButtonStyle =
    "px-3 h-9 flex items-center justify-center rounded-md font-bebas text-xl transition-all text-black/90 dark:text-white/90 hover:text-blue-700";

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 px-6 py-4 flex justify-between items-center
        transition-all ${
          isScrolled
            ? "bg-white/10 dark:bg-black/10 backdrop-blur-md"
            : "bg-transparent"
        }`}
    >
      {/* LOGO */}
      <button
        onClick={() => scrollToSection("home")}
        className="font-poppins text-xl font-bold"
      >
        <span className="text-blue-700">Haris</span>
        <span className="text-black dark:text-white"> Tech</span>
      </button>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={buttonStyle(item)}
          >
            {item.name}
          </button>
        ))}

        <div className="w-px h-6 bg-black/20 dark:bg-white/20" />

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={iconButtonStyle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="flex items-center justify-center">
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </span>
        </button>

        {/* Language Toggle Button */}
        <button
          onClick={() => setLang(lang === "en" ? "id" : "en")}
          className={`${iconButtonStyle} overflow-hidden`}
          aria-label={`Switch language to ${
            lang === "en" ? "Indonesian" : "English"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              style={{ backgroundColor: "transparent" }}
              className="font-bebas text-lg uppercase"
            >
              {lang}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden px-3 h-9 flex items-center justify-center rounded-md font-bebas text-xl transition-all text-black/90 dark:text-white/90 hover:text-blue-700"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-2 mt-2 w-30 md:hidden"
          >
            <div className="rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-lg p-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded text-right font-bebas text-lg transition-all
                    ${
                      activeSection === item.id
                        ? "text-blue-700"
                        : "text-black/90 dark:text-white/90 hover:text-blue-700"
                    }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="h-px bg-black/20 dark:bg-white/20 my-2" />

              <div className="flex gap-1.5">
                {/* Dark Mode Toggle (Mobile) */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`flex-1 px-3 py-2 rounded font-bebas text-lg transition-all flex items-center justify-center gap-2
                    text-black/90 dark:text-white/90 hover:text-blue-700`}
                >
                  {darkMode ? (
                    <>
                      <Moon size={16} />
                    </>
                  ) : (
                    <>
                      <Sun size={16} />
                    </>
                  )}
                </button>

                {/* Language Toggle (Mobile) */}
                <button
                  onClick={() => setLang(lang === "en" ? "id" : "en")}
                  className={`flex-1 px-3 py-2 rounded font-bebas text-lg transition-all flex items-center justify-center
                    text-black/90 dark:text-white/90 hover:text-blue-700`}
                >
                  {lang === "en" ? "ID" : "EN"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
