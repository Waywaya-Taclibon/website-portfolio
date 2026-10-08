import { motion as Motion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

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

const MySection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-20"
    >

      <Motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container max-w-4xl mx-auto text-center z-10"
      >
        <div className="flex flex-col items-center space-y-6">
          <Motion.span
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-card/60 backdrop-blur px-4 py-1.5 text-sm text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for new opportunities
          </Motion.span>

          <Motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.05]"
          >
            <span className="block text-foreground">Hi, I&apos;m</span>
            <span className="text-gradient animate-gradient">
              Waywaya Taclibon
            </span>
          </Motion.h1>

          <Motion.p
            variants={item}
            className="text-lg md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            Software Engineer &amp; Full-Stack Developer
          </Motion.p>

          <Motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a
              href="#about"
              className="cosmic-button group inline-flex items-center gap-2 px-8 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              About Me
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-primary/30 text-foreground font-medium transition-all duration-300 hover:bg-primary/10 hover:border-primary/60 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get In Touch
            </a>
          </Motion.div>

          <Motion.div
            variants={item}
            className="flex items-center justify-center gap-3 pt-2"
          >
            <a
              href="https://github.com/Waywaya-Taclibon"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/waywaya-taclibon-443432312/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:waywayataclibon.wt@gmail.com"
              aria-label="Send email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Motion.div>

          <Motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
            aria-label="Core technologies"
          >
          </Motion.div>
        </div>
      </Motion.div>

      <Motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-md"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <span className="animate-bounce">
          <ArrowDown className="h-5 w-5 text-primary" />
        </span>
      </Motion.a>
    </section>
  );
};

export default MySection;
