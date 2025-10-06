import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setIsDarkMode(newMode);

    // 🔥 Tell other components (like StarBackground) immediately
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { isDarkMode: newMode } })
    );
  };

  return (
    <>
      {/* Desktop Theme Toggle - Fixed position */}
      <button
        onClick={toggleTheme}
        className={cn(
          "hidden md:block fixed top-5 right-5 z-50 p-2 rounded-full transition-all duration-300",
          "focus:outline-none",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : ""
        )}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="h-6 w-6 text-yellow-300" />
        ) : (
          <Moon className="h-6 w-6 text-blue-900" />
        )}
      </button>

      {/* Mobile Theme Toggle - In navbar area */}
      <button
        onClick={toggleTheme}
        className={cn(
          "md:hidden fixed top-5 right-16 z-50 p-2 rounded-full transition-all duration-300",
          "focus:outline-none",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : ""
        )}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-900" />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;