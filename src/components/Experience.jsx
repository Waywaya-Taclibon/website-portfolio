import { motion as Motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
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

// TODO: Replace with your real experience — same shape, just overwrite values.
const experiences = [
  {
    id: 1,
    role: "Junior Software Engineer",
    company: "Komunidad Global Services & Operations Philippines Inc.",
    employmentType: "Full-time",
    period: "Nov 2025 — August 2026",
    location: "Taguig, Philippines",
    summary:
      "Full-stack development of a multi-module ESG Sustainability platform for enterprise clients, from database design and backend workflows to dashboards and client-facing delivery.",
    highlights: [
      "313 Story Points delivered across 73 tickets in 10 months",
      "3 UAT Sessions with the same client conducting real-time changes",
      "Built an ESG Sustainability platform with Django and MySQL for enterprise clients",
    ],
    tech: ["HTML/CSS", "JavaScript", "Django", "MySQL"],
    current: false,
  },
  {
    id: 2,
    role: "Software Development Intern",
    company: "Torre Lorenzo Development Corp.",
    employmentType: "Internship",
    period: "July 2024 — Jan 2025",
    location: "Makati, Philippines",
    summary:
      "Supported the testing and documentation of a web-based Real Estate Management System, working with developers to catch issues before release.",
    highlights: [
      "Conducted UAT on the Real Estate Management System, catching UI and functional issues before deployment",
      "Worked with developers to resolve system issues and keep the platform stable",
      "Created flowchart documentation of internal processes for executive reporting and project handovers",
    ],
    tech: ["HTML/CSS", "JavaScript"],
    current: false,
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-secondary/30"
    >
      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-5xl relative z-10"
      >
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <Motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance"
          >
            My <span className="text-gradient">Experience</span>
          </Motion.h2>
        </div>

        <div className="relative">
          {/* Rail */}
          <div
            aria-hidden="true"
            className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
          />

          <ol className="space-y-8">
            {experiences.map((experience) => (
              <Motion.li
                key={experience.id}
                variants={item}
                className="relative pl-14 md:pl-16"
              >
                {/* Dot */}
                <span className="absolute left-5 md:left-6 top-7 -translate-x-1/2">
                  {experience.current ? (
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary ring-4 ring-primary/20" />
                    </span>
                  ) : (
                    <span className="block h-3.5 w-3.5 rounded-full bg-card border-2 border-primary/60" />
                  )}
                </span>

                <article className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 text-left shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {experience.period}
                    </span>
                    {experience.current && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {experience.role}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      {experience.company}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{experience.employmentType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {experience.location}
                    </span>
                  </p>

                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {experience.summary}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.tech.map((tech) => {
                      const icon = getTechIcon(tech);
                      return (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-border bg-background/60 text-muted-foreground"
                        >
                          {icon && (
                            <i
                              className={cn(icon, "text-base")}
                              aria-hidden="true"
                            />
                          )}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </article>
              </Motion.li>
            ))}
          </ol>
        </div>
      </Motion.div>
    </section>
  );
};

export default Experience;
