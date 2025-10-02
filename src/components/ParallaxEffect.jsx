// ParallaxEffect.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxEffect() {
  const containerRef = useRef(null);

  // Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax layers
  const moonY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // 🔥 New: shrink effect for the whole scene
  // Start scaling at 80% scroll → fully shrunk at 100%
  const scaleScene = useTransform(scrollYProgress, [0.8, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0.8, 1], ["0rem", "2rem"]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0.8, 1],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 20px 50px rgba(0,0,0,0.4)"
    ]
  );

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-transparent">
      {/* Sticky container */}
      <motion.div
        style={{
          scale: scaleScene,
          borderRadius: borderRadius,
          boxShadow: boxShadow,
        }}
        className="sticky top-0 h-screen overflow-hidden bg-transparent"
      >
        {/* Sun */}
        <motion.img
          src="/Sun.png"
          style={{ y: moonY }}
          className="absolute top-15 left-0 w-full h-auto"
        />

        {/* Far mountains */}
        <motion.img
          src="/3Moun.png"
          style={{ y: farY }}
          className="absolute top-15 left-0 w-full h-auto"
        />

        {/* Mid mountains */}
        <motion.img
          src="/2Moun.png"
          style={{ y: midY }}
          className="absolute top-15 left-0 w-full h-auto"
        />

        {/* Front mountains */}
        <motion.img
          src="/1Moun.png"
          style={{ y: frontY }}
          className="absolute top-15 left-0 w-full h-auto"
        />
      </motion.div>
    </section>
  );
}
