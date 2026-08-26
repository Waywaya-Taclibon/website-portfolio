import React, { useState } from "react";
import { cn } from "../lib/utils";

const HTMLCSS = <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

const skills = [
  // Frontend
  { name: "HTML/CSS", icon: "devicon-html5-plain coloured", category: "frontend" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored", category: "frontend" },
  { name: "React", icon: "devicon-react-original colored", category: "frontend" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored", category: "frontend" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored", category: "frontend" },
  { name: "Next.js", icon: "devicon-nextjs-plain", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "devicon-nodejs-plain colored", category: "backend" },
  { name: "Express", icon: "devicon-express-original", category: "backend" },
  { name: "Firebase", icon: "devicon-firebase-plain colored", category: "backend" },
  { name: "MySQL", icon: "devicon-mysql-plain colored", category: "backend" },
  { name: "Python", icon: "devicon-python-plain colored", category: "backend" },
  { name: "C++", icon: "devicon-cplusplus-plain colored", category: "backend" },
  { name: "C#", icon: "devicon-csharp-plain colored", category: "backend" },
  { name: "OpenCV", icon: "devicon-opencv-plain colored", category: "backend" },

  // Tools
  { name: "Git/GitHub", icon: "devicon-git-plain colored", category: "tools" },
  { name: "Figma", icon: "devicon-figma-plain colored", category: "tools" },
  { name: "VS Code", icon: "devicon-vscode-plain colored", category: "tools" },
  { name: "Arduino", icon: "devicon-arduino-plain colored", category: "tools" },
  { name: "Anaconda", icon: "devicon-anaconda-original colored", category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover flex flex-col items-center justify-center text-center gap-3"
            >
              <i className={cn(skill.icon, "text-5xl")} />

              <h3 className="font-semibold text-base">{skill.name}</h3>

              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
