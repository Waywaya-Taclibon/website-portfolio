import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDarkMode(isDark);

    // This part ensures React syncs state without reapplying the class
    document.documentElement.classList.remove(isDark ? "light" : "dark");
    document.documentElement.classList.add(isDark ? "dark" : "light");
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

    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { isDarkMode: newMode } })
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-5 right-5 z-50 p-2 rounded-full transition-all duration-300 md:hidden",
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
  );
};

export default ThemeToggle;
