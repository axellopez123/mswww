import React, { useState, useEffect } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { motion } from "framer-motion";

export function NavbarMobile() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Manejar el scroll para mostrar/ocultar el menú
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY < lastScrollY || currentScrollY <= 0); // Mostrar si se desplaza hacia arriba o está al inicio
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }} // Animación de desaparición
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 px-3 pt-2 z-50"
    >
      <div className="flex backdrop-blur-xl bg-white/10 border-white/10 rounded-xl pt-2 pb-1 shadow-lg">
        {/* Espacio a la izquierda */}
        <div className="flex-none w-1/5"></div>

        {/* Título centrado */}
        <div className="grow flex items-center justify-center">
          <p className="font-bold text-3xl text-slate-600 dark:text-white">ARWAX</p>
        </div>

        {/* Botón de tema a la derecha */}
        <div className="flex-none w-1/5">
          <ThemeToggleButton />
        </div>
      </div>
    </motion.div>
  );
}
