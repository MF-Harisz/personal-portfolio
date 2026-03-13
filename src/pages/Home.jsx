import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Project from "../sections/Project";
import Services from "../sections/Services";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 150);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
