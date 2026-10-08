import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", sectionId: "home" },
  { name: "About", href: "#about", sectionId: "about" },
  { name: "Experience", href: "#experience", sectionId: "experience" },
  { name: "Projects", href: "#projects", sectionId: "projects" },
  { name: "Certifications", href: "#certifications", sectionId: "certifications" },
  { name: "Contact", href: "#contact", sectionId: "contact" },
];

const ThemeToggleButton = ({ isDarkMode, onToggle }) => (
  <button
    onClick={onToggle}
    className="p-2 text-foreground rounded-full transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    {isDarkMode ? (
      <Sun className="h-6 w-6 text-yellow-300" />
    ) : (
      <Moon className="h-6 w-6 text-blue-900" />
    )}
  </button>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [activeSection, setActiveSection] = useState("home");

  // Scrolled glass state — all viewports
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      // If switching to desktop, close the mobile menu
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // initial run to set correct state on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scrollspy — highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter(Boolean);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Lock background scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Load saved theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    const isDark = storedTheme === "dark";

    setIsDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      // Switching to dark mode
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      // Switching to light mode
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Notify other components about theme change
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { isDarkMode: newMode } })
    );
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border-b",
        isScrolled && !isMenuOpen
          ? "py-3 border-border/60"
          : "py-5 border-transparent"
      )}
    >
      {/* Glass layer crossfades via opacity so blur/background never pop in */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-background/80 backdrop-blur-md shadow-sm transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isScrolled && !isMenuOpen ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="container relative flex items-center justify-between">
        {/* LEFT: Logo */}
        <a
          href="#home"
          className="text-xl font-bold text-primary flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Waywaya </span>
            T.
          </span>
        </a>

        {/* RIGHT: Nav links + Theme toggle (desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative px-1 py-2 transition-colors duration-300 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isActive
                    ? "text-primary font-medium"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <Motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </a>
            );
          })}

          <ThemeToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2 z-50">
          {/* Theme toggle */}
          <ThemeToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme} />

          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground rounded-full transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center space-y-8 text-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "transition-colors duration-300 rounded-md px-4 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground/80 hover:text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
