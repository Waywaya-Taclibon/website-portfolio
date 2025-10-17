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
              Passionate Web Developer & Tech Creator
            </h3>

            <p className="text-muted-foreground">
              I take pride in transforming ideas into functional, user-focused
              digital solutions. From crafting intuitive interfaces to
              developing reliable backend systems, I’m driven by the goal of
              creating applications that make a real impact. My background in
              Computer Engineering has equipped me with both technical expertise
              and hands-on leadership experience, enabling me to collaborate
              effectively and deliver results in real-world projects.
            </p>

            <p className="text-muted-foreground">
              I’m deeply motivated by the process of learning and refining
              whether it’s experimenting with new frameworks, improving code
              efficiency, or understanding how design affects user behavior. I
              see development as both a craft and a continuous journey one
              that challenges me to think critically, stay adaptable, and build
              with purpose.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>
              <a
                href={Resume}
                download="Waywaya_Resume.pdf"
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
