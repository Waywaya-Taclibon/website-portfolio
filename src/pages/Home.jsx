import React, { useRef, useEffect } from "react";
import StarBackground from "../components/StarBackground";
import Navbar from "../components/Navbar";
import MySection from "../components/MySection";
import About from "../components/About";
import Experience from "../components/Experience";
import { Parallax } from "@react-spring/parallax";
import City from "../components/City";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Certifications from "../components/Certifications";

const Home = () => {
  const parallaxRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const viewportHeight = window.innerHeight;
        const maxCityScroll = viewportHeight * 5; // 300vh
        
        // Only control parallax during the first 3 viewport heights
        if (scrolled <= maxCityScroll) {
          // Convert scroll position to parallax pages (0 to 3)
          const parallaxPosition = scrolled / viewportHeight;
          parallaxRef.current.scrollTo(parallaxPosition);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <Navbar />

      {/* ✅ Section 2: Regular scroll sections */}
      <main className="relative z-10 bg-[var(--background)]">
        <MySection />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Home;