import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import Resume from "../assets/Waywaya_Taclibon_Resume.pdf";
import { categories, skills } from "../data/skills";
import { cn } from "../lib/utils";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// One filmstrip row: runs the marquee film effect ONLY when its chips
// actually overflow the viewport (i.e. more than fits in the row).
// Otherwise it renders a plain static row — no animation, no edge fade.
const FilmRow = ({ items, reverse }) => {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      setOverflows(track.scrollWidth > viewport.clientWidth + 4);
    };

    measure();
    const frame = requestAnimationFrame(measure);

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(viewport);
    } else {
      window.addEventListener("resize", measure);
    }

    let fontsPromise;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      fontsPromise = document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      fontsPromise?.catch(() => {});
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      ref={viewportRef}
      className={cn(
        "marquee-viewport",
        overflows
          ? "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          : "overflow-visible"
      )}
    >
      <div
        ref={trackRef}
        className={cn(
          "marquee-track flex w-max gap-2",
          overflows &&
            "pr-2 group-hover:[animation-play-state:paused] animate-marquee-left"
        )}
        style={
          overflows
            ? {
                animationDuration: `${Math.max(18, items.length * 3.5)}s`,
                animationDirection: reverse ? "reverse" : "normal",
              }
            : undefined
        }
      >
        {(overflows ? [0, 1] : [0]).map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex gap-2">
            {items.map((skill) => (
              <span
                key={`${skill.name}-${copy}`}
                className="inline-flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background/60 text-xs font-medium text-foreground"
              >
                <i className={cn(skill.icon, "text-lg")} aria-hidden="true" />
                {skill.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Fixed two-row layout: split the filtered list so the panel never grows.
  const splitIndex = Math.ceil(filteredSkills.length / 2);
  const filmRows = [
    { key: "top", items: filteredSkills.slice(0, splitIndex), reverse: false },
    { key: "bottom", items: filteredSkills.slice(splitIndex), reverse: true },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle glows to match hero without overpowering */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[5%] h-[280px] w-[280px] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10" />
      </div>

      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-5xl relative z-10"
      >
        <Motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance text-center mb-12"
        >
          About <span className="text-gradient">Me</span>
        </Motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: image container */}
          <Motion.div variants={item} className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 via-violet-400/20 to-transparent blur-2xl"
              />
              <div className="relative rounded-3xl border border-border bg-card/60 backdrop-blur p-2 shadow-sm">
                <img
                  src="/image.jpg"
                  alt="Portrait of Waywaya Taclibon"
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl object-cover bg-secondary/40"
                />
                <div className="absolute -top-4 right-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 backdrop-blur px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Taguig, PH
                </div>
              </div>
            </div>
          </Motion.div>

          {/* Right: description */}
          <Motion.div variants={item} className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-balance">
              Software Engineer & Full-Stack Developer
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a Computer Engineering graduate who builds reliable,
              user-centered web apps, from responsive interfaces to the backends
              and databases behind them. I&apos;ve delivered enterprise
              platforms for real clients and I&apos;m always looking for better
              ways to build.
            </p>

            <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
              I work across React, JavaScript, Python, Django, Node.js, MySQL,
              and MongoDB — turning real-world requirements into maintainable,
              production-ready software.
            </p>

            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-4 sm:p-5 text-left shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-3">
                Core Skills
              </p>

              <div
                className="flex flex-wrap gap-2 mb-4"
                role="group"
                aria-label="Filter skills by category"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full capitalize transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      activeCategory === category
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-background/60 text-muted-foreground hover:text-foreground hover:border-primary/50"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Fixed-height two rows — film effect only on rows that overflow */}
              <div
                key={activeCategory}
                className="group space-y-2"
                aria-label={`${filteredSkills.length} skills in ${activeCategory}`}
              >
                {filmRows.map((row) => (
                  <FilmRow
                    key={`${activeCategory}-${row.key}`}
                    items={row.items}
                    reverse={row.reverse}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
              <a
                href={Resume}
                download="Waywaya_Taclibon_Resume.pdf"
                className="cosmic-button inline-flex items-center justify-center gap-2 px-8 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-primary/30 text-foreground font-medium transition-all duration-300 hover:bg-primary/10 hover:border-primary/60 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View My Works
              </a>
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
};

export default About;
