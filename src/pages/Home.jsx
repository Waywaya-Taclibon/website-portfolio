import React, { useRef, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import StarBackground from "../components/StarBackground";
import Navbar from "../components/Navbar";
import MySection from "../components/MySection";
import About from "../components/About";
import Skills from "../components/Skills";
import { Parallax } from "@react-spring/parallax";
import City from "../components/City";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

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
      <ThemeToggle />
      <StarBackground />
      <Navbar />

      {/* ✅ Section 1: City Parallax (fixed, controlled by main scroll) */}
      <section className="relative w-full h-[300vh]">
        {/* Fixed sticky container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Parallax 
            ref={parallaxRef}
            pages={3} 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%",
              overflow: "hidden" 
            }} 
            config={{ tension: 16000, friction: 999}}
          >
            <City />
          </Parallax>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="w-full h-24 bg-gradient-to-b from-transparent to-[var(--background)] relative z-10" />

      {/* ✅ Section 2: Regular scroll sections */}
      <main className="relative z-10 bg-[var(--background)]">
        <MySection />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Home;