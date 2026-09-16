import { UserStar, Code, Cog, CogIcon } from "lucide-react";
import Resume from "../assets/Waywaya_Taclibon.pdf";
import React from "react";

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 item-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Software Engineer & Full-Stack Developer
            </h3>

            <p className="text-muted-foreground">
              I’m a Software Engineer and Full-Stack Developer focused on
              building reliable, user-centered web applications and digital
              solutions. With a background in Computer Engineering and
              professional experience developing enterprise platforms, I work
              across frontend and backend technologies including React,
              JavaScript, Python, Django, Node.js, MySQL, and MongoDB. I enjoy
              turning real-world requirements into practical software, from
              responsive interfaces and data-driven dashboards to backend
              systems and database integrations.
            </p>

            <p className="text-muted-foreground">
              I’ve worked on client-facing platforms, collaborated with
              cross-functional teams, and supported testing, UAT, and production
              delivery. I’m driven by continuous learning and improving the way
              I build software, whether exploring new technologies, optimizing
              existing solutions, or using AI-assisted development tools such as
              Claude Code to improve my workflow. I’m always looking for better
              ways to solve problems, write maintainable code, and create
              technology that delivers meaningful value.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>
              <a
                href={Resume}
                download="Waywaya_Taclibon _Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Web Development</h4>
                  <p className="text-muted-foreground">
                    I build responsive and user-centered web applications using
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <CogIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Software Solutions</h4>
                  <p className="text-muted-foreground">
                    I create scalable systems that solve real-world problems
                    efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <UserStar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Team Leadership</h4>
                  <p className="text-muted-foreground">
                    I lead projects and collaborate effectively to deliver
                    quality results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
