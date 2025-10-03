import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import StarBackground from "../components/StarBackground";
import Navbar from "../components/Navbar";
import MySection from "../components/MySection";
import About from "../components/About";
import Skills from "../components/Skills";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Fire from "../components/Fire";
import City from "../components/City";
import App from "../App";
import TextBlock from "../components/TextBlock";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <StarBackground />

      <Parallax
        pages={10}
        style={{ top: "0", left: "0" }}
        config={{ tension: 500, friction: 50 }}
      >
        {/* 🔥 Fire parallax layers */}
        <City />

        {/* Page 2 */}

        <ParallaxLayer offset={2.2} speed={0.3}>
          <MySection />
        </ParallaxLayer>

        {/* Page 3 */}
        <ParallaxLayer offset={3} speed={0.3}>
          <About />
        </ParallaxLayer>

        {/* Page 4 */}
        <ParallaxLayer offset={4} speed={0.3}>
          <Skills />
        </ParallaxLayer>

        {/* Page 5 */}
        <ParallaxLayer offset={5.2} speed={0.3}>
          <Projects />
        </ParallaxLayer>

        {/* Page 6 */}
        <ParallaxLayer offset={6.2} speed={0.3}>
          <Contact />
        </ParallaxLayer>

      </Parallax>
      <Navbar />
    </div>
  );
};

export default Home;
