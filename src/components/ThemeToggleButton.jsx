import React, { useState, useEffect } from "react";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar si hay un tema guardado en localStorage
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Cambiar la clase del tema en el body
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Cambiar a {isDarkMode ? "Tema Claro" : "Tema Oscuro"}
    </button>
  );
};

export default ThemeToggleButton;
