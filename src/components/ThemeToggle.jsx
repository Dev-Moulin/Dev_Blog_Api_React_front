import React, { useEffect, useState } from "react";
import { AuthService } from "../services/auth";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Vérifier d'abord si l'utilisateur est connecté et a une préférence
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userTheme = localStorage.getItem(`theme_${userId}`);
      if (userTheme) {
        return userTheme === "dark";
      }
    }

    // Sinon, utiliser la préférence générale ou le thème système
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (darkMode) {
      document.documentElement.classList.add("dark");
      // Sauvegarder la préférence pour l'utilisateur connecté
      if (userId) {
        localStorage.setItem(`theme_${userId}`, "dark");
      }
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      // Sauvegarder la préférence pour l'utilisateur connecté
      if (userId) {
        localStorage.setItem(`theme_${userId}`, "light");
      }
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Écouter les changements d'authentification
  useEffect(() => {
    const handleAuthChange = () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const userTheme = localStorage.getItem(`theme_${userId}`);
        if (userTheme) {
          setDarkMode(userTheme === "dark");
        }
      }
    };

    // Vérifier au montage et lors des changements d'authentification
    handleAuthChange();
    window.addEventListener("storage", handleAuthChange);
    return () => window.removeEventListener("storage", handleAuthChange);
  }, []);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        // Icône soleil pour le mode clair
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Icône lune pour le mode sombre
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
