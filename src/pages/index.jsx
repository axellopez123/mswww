import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GridComponent from "../components/GridComponent";
import HoverEffect from "../components/HoverEffect";
import { Contact } from "../components/Contact";
import { LayoutGrid } from "../components/LayoutGrid";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-scroll";
import { useDrawerContext } from "../contexts/DrawerContext";
export default function Home() {
  const { notification } = useDrawerContext();

  useEffect(() => {}, [notification]);

  const projects = [
    {
      title: "Cómputo en la Nube",
      description:
        "Almacena tu información desde cualquier parte del mundo con acceso a internet y con una estructura robusta y con alta velocidad",
      link: "https://stripe.com",
      id: 1,
      className: "md:col-span-2",
      thumbnail: "",
      gbc: "bg-pink-500",
      claves: [
        { icono: "", texto: "Consultoría en la nube" },
        { icono: "", texto: "Base de datos en la nube" },
        { icono: "", texto: "Optimización de servidores" },
        { icono: "", texto: "Migración de servidores a la nube" },
        {
          icono: "",
          texto: "Infraestructura con las mejores soluciones en la nube",
        },
      ],
      modelo: {
        url: "/moon.glb",
        color: "white",
        scales: {
          small: [0.05, 0.05, 0.03],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.07, 0.5, 0.3],
          else: [0.15, 0.7, 0.3],
        },
        rotation:[0.1, -Math.PI, 0],
        position:[1, 1, 0],
      },
    },
    {
      title: "Pagínas Web",
      description:
        "Publica tu empresa en cualquier dispositivo captando la atención de tus clientes con la mejor experiencia UX y el mayor rendimiento.",
      link: "https://netflix.com",
      id: 2,
      className: "md:col-span-1",
      thumbnail: "",
      gbc: "bg-blue-500",
      claves: [
        { icono: "", texto: "Identificación de procesos clave" },
        { icono: "", texto: "Evaluación de herramientas tecnológicas" },
        { icono: "", texto: "Integración de sistemas" },
        { icono: "", texto: "Capacitación y adaptación" },
        { icono: "", texto: "Monitoreo y optimización continua" },
        { icono: "", texto: "Gestión del cambio" },
      ],
      modelo: {
        url: "/moon.glb",
        color: "white",
        scales: {
          small: [0.05, 0.05, 0.03],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.07, 0.5, 0.3],
          else: [0.15, 0.7, 0.3],
        },
        rotation:[0.1, -Math.PI, 0],
        position:[1, 1, 0],
      },
    },
    {
      title: "Migraciones",
      description:
        "Pasa tu sistema clásico a uno moderno y eficiente con las mejores tecnologías de vanguardia de ultima generación.",
      link: "https://google.com",
      id: 3,
      className: "md:col-span-1",
      thumbnail: "",
      gbc: "bg-red-500",
      claves: [
        { icono: "", texto: "Identificación de procesos clave" },
        { icono: "", texto: "Evaluación de herramientas tecnológicas" },
        { icono: "", texto: "Integración de sistemas" },
        { icono: "", texto: "Capacitación y adaptación" },
        { icono: "", texto: "Monitoreo y optimización continua" },
        { icono: "", texto: "Gestión del cambio" },
      ],
      modelo: {
        url: "/moon.glb",
        color: "white",
        scales: {
          small: [0.05, 0.05, 0.03],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.07, 0.5, 0.3],
          else: [0.15, 0.7, 0.3],
        },
        rotation:[0.1, -Math.PI, 0],
        position:[1, 1, 0],
      },
    },
    {
      title: "IA & Bots",
      description:
        // "Reemplaza las tareas repetitivas aumentando la eficiencia, reduciendo errores y liberando recursos para actividades más estratégicas. Es la clave para mantenerse competitivo en un mundo digitalizado.",
        "Optimiza el flujo de trabajo reduciendo errores dando reemplazo a tareas repetitivas con procesos automatizados inteligentes.",

      link: "https://meta.com",
      id: 4,
      className: "md:col-span-2",
      thumbnail: "",
      gbc: "bg-green-700",
      claves: [
        { icono: "", texto: "Identificación de procesos clave" },
        { icono: "", texto: "Evaluación de herramientas tecnológicas" },
        { icono: "", texto: "Integración de sistemas" },
        { icono: "", texto: "Capacitación y adaptación" },
        { icono: "", texto: "Monitoreo y optimización continua" },
        { icono: "", texto: "Gestión del cambio" },
      ],
      modelo: {
        url: "/moon.glb",
        color: "white",
        scales: {
          small: [0.05, 0.05, 0.03],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.07, 0.5, 0.3],
          else: [0.15, 0.7, 0.3],
        },
        rotation:[0.1, -Math.PI, 0],
        position:[1, 1, 0],
      },
    },
  ];

  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  };

  return (
    <div className="bg-slate-300/30 dark:bg-black z-40">
      {notification &&
        notification.emoji &&
        notification.title &&
        notification.message && (
          <div className="fixed top-0 left-0 h-screen w-screen bg-gray-600/50 text-white p-5 rounded-lg shadow-lg flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full text-center">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-4xl">{notification.emoji}</span>
                <p className="text-2xl font-semibold">{notification.title}</p>
              </div>
              <p className="mt-3 text-lg">{notification.message}</p>
            </div>
          </div>
        )}
      <GridComponent />

      <LayoutGrid cards={projects} />
      <Contact />
      {visible && (
        <div className="hidden md:block fixed bottom-5 right-5">
          <Link
            onClick={scrollToTop}
            smooth={true}
            duration={500}
            className="cursor-pointer transition-colors"
          >
            <motion.div className="rounded-full bg-green-600/70 hover:bg-green-500/80 border-2 border-white/20 border-double shadow-lg shadow-green-600 hover:shadow-green-500 flex items-center justify-center relative px-3 py-3 hover:scale-110 transition duration-150 ease-in-out delay-0">
              <motion.div className="flex items-center justify-center cursor-pointer text-black dark:text-white text-shadow text-xl font-extrabold px-1">
                ☝🏼
              </motion.div>
            </motion.div>
          </Link>
        </div>
      )}
    </div>
  );
}
