import { motion as Motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Hammer } from "lucide-react";
import { getTechIcon } from "../data/skills";
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

const projects = [
  {
    id: 1,
    title: "ADUPay Admin Dashboard",
    description:
      "An interactive admin dashboard page for AduPay that is tasked to monitor RSO payments",
    image: "/Projectimg/ADUPAY.png",
    tags: ["React", "Firebase"],
    demoUrl: "https://adupay-kiosk.vercel.app/login",
    githubUrl: "https://github.com/Waywaya-Taclibon/admin-dashboard",
  },

  {
    id: 2,
    title: "DopaWink",
    description:
      "A real-time dating web app built with React, Node.js, and MongoDB that lets users match, chat, and receive live notifications seamlessly.",
    image: "/Projectimg/DopaWink.png",
    tags: ["React", "Node.js", "MongoDB", "Clerk"],
    demoUrl: "https://dopawink.vercel.app/",
    githubUrl: "https://github.com/Waywaya-Taclibon/dating-webapp",
  },

  {
    id: 3,
    title: "Makatipid",
    description:
      "Rental management system that acts as a platform for user who are looking for rental properties and users that post rental properties.",
    image: "",
    tags: ["React", "Node.js", "Express", "MySQL"],
    demoUrl: "",
    githubUrl: "",
    status: "in-progress",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-5xl relative z-10"
      >
        <Motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance text-center mb-4"
        >
          Featured <span className="text-gradient">Projects</span>
        </Motion.h2>
        <Motion.p
          variants={item}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-balance"
        >
          Here are some of my featured projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </Motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const isInProgress = project.status === "in-progress";
            return (
            <Motion.article
              key={project.id}
              variants={item}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-secondary/40 to-transparent">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-card/60">
                      <Hammer className="h-6 w-6 text-primary" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Preview coming soon
                    </span>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {isInProgress && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-card/90 backdrop-blur px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                    In Development
                  </span>
                )}
                {(project.demoUrl || project.githubUrl) && (
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View live demo of ${project.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur text-foreground transition-colors duration-300 hover:text-primary hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View source code of ${project.title} on GitHub`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur text-foreground transition-colors duration-300 hover:text-primary hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => {
                    const icon = getTechIcon(tag);
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-border bg-background/60 text-muted-foreground"
                      >
                        {icon && (
                          <i
                            className={cn(icon, "text-base")}
                            aria-hidden="true"
                          />
                        )}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="mt-auto">
                {(project.demoUrl || project.githubUrl) ? (
                  <div className="flex items-center gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View live demo of ${project.title}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View source code of ${project.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Hammer className="h-4 w-4 text-amber-500" />
                    Demo and code links coming soon
                  </p>
                )}
                </div>
              </div>
            </Motion.article>
            );
          })}
        </div>
        <Motion.div variants={item} className="text-center mt-12">
          <a
            className="cosmic-button group w-fit inline-flex items-center mx-auto gap-2 px-8 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Waywaya-Taclibon"
          >
            Check My GitHub
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Motion.div>
      </Motion.div>
    </section>
  );
};

export default Projects;
