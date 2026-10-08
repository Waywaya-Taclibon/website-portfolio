export const skills = [
  // Frontend
  { name: "HTML/CSS", icon: "devicon-html5-plain colored", category: "frontend" },
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
  { name: "C#", icon: "devicon-csharp-plain colored", category: "backend" },

  // Tools
  { name: "Git/GitHub", icon: "devicon-git-plain colored", category: "tools" },
  { name: "Figma", icon: "devicon-figma-plain colored", category: "tools" },
  { name: "Postman", icon: "devicon-postman-plain colored", category: "tools" },
];

export const categories = ["all", "frontend", "backend", "tools"];

// Extra icons for tech that isn't part of the Skills section grid
// (e.g. tech tags used in the Experience timeline).
const extraTechIcons = {
  Django: "devicon-django-plain colored",
  MongoDB: "devicon-mongodb-plain colored",
  PostgreSQL: "devicon-postgresql-plain colored",
  Postgres: "devicon-postgresql-plain colored",
  SQLite: "devicon-sqlite-plain colored",
  Supabase: "devicon-supabase-plain colored",
  Docker: "devicon-docker-plain colored",
  Kubernetes: "devicon-kubernetes-plain colored",
  Redis: "devicon-redis-plain colored",
  GraphQL: "devicon-graphql-plain colored",
  "Vue.js": "devicon-vuejs-plain colored",
  Vue: "devicon-vuejs-plain colored",
  Angular: "devicon-angular-plain colored",
  Svelte: "devicon-svelte-plain colored",
  "NextJS": "devicon-nextjs-plain",
  Laravel: "devicon-laravel-original colored",
  Flask: "devicon-flask-original",
  FastAPI: "devicon-fastapi-plain colored",
  Spring: "devicon-spring-original colored",
  Java: "devicon-java-plain colored",
  Go: "devicon-go-original-wordmark colored",
  Rust: "devicon-rust-original",
  PHP: "devicon-php-plain colored",
  AWS: "devicon-amazonwebservices-plain-wordmark colored",
  Azure: "devicon-azure-plain colored",
  "Google Cloud": "devicon-googlecloud-plain colored",
  Vercel: "devicon-vercel-original",
  Jest: "devicon-jest-plain colored",
  Cypress: "devicon-cypress-plain colored",
  Playwright: "devicon-playwright-plain colored",
  Jira: "devicon-jira-plain colored",
  Linux: "devicon-linux-plain colored",
  Nginx: "devicon-nginx-original colored",
};

const techIconMap = new Map([
  ...skills.map((skill) => [skill.name, skill.icon]),
  ...Object.entries(extraTechIcons),
]);

// Returns the devicon class for a tech name, or null when unknown.
// Unknown tech still renders as a plain text chip — just add an entry
// above to give it an icon.
export const getTechIcon = (name) => techIconMap.get(name?.trim()) ?? null;
