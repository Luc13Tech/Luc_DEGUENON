import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const STORAGE_KEY = "luc-deguenon-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Activer le mode clair"
          : "Activer le mode sombre"
      }
      aria-pressed={!isDark}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
    >
      {isDark ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </motion.button>
  );
}
