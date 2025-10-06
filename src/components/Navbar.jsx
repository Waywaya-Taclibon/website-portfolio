import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Handle scroll and resize effects (mobile-only scroll effect)
  useEffect(() => {
    const mobileBreakpoint = 768; // Tailwind 'md' breakpoint

    const handleScroll = () => {
      // Only apply the scrolled state when in mobile view
      if (window.innerWidth < mobileBreakpoint) {
        setIsScrolled(window.scrollY > 10);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      // If switching to desktop, close mobile menu and reset scrolled state
      if (window.innerWidth >= mobileBreakpoint) {
        setIsMenuOpen(false);
        setIsScrolled(false);
      } else {
        // If switching to mobile, check current scroll position
        setIsScrolled(window.scrollY > 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // initial run to set correct state on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* LEFT: Logo */}
        <a
          href="#home"
          className="text-xl font-bold text-primary flex items-center"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Waywaya Taclibon</span>{" "}
            Portfolio
          </span>
        </a>

        {/* RIGHT: Nav links + Theme toggle (desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 text-foreground transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
              <Moon className="h-6 w-6 text-blue-900" />
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2 z-50">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
              <Moon className="h-6 w-6 text-blue-900" />
            )}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground"
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
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;