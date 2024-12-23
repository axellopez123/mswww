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
        { icono: "", texto: "Optimiza tus operaciones con nuestras soluciones en la nube" },
        { icono: "", texto: "Accede a tus datos desde cualquier lugar con acceso a internet" },
        { icono: "", texto: "Aumenta la productividad de tu negocio" },
        { icono: "", texto: "Migración de servidores a la nube" },
        {
          icono: "",
          texto: "Infraestructura con las mejores soluciones en la nube",
        },
        {
          icono: "",
          texto: "Servicios en la nube con la máxima confiabilidad y privacidad garantizada",
        },
      ],
      modelo: {
        url: "/moon.glb",
        color: "white",
        scales: {
          small: [0.08, 0.5, 0.03],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.07, 0.7, 0.3],
          else: [0.15, 0.7, 0.3],
        },
        rotation: [0.1, -Math.PI, 0],
        position: [-3, 0, 0],
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
        { icono: "", texto: "Capta la atención de tus clientes con los diseños más modernos de internet" },
        { icono: "", texto: "Brinda a tus clientes la experiencia fluida y eficiente que merecen en tu sitio" },
        { icono: "", texto: "Convierte visitas en ventas con un sitio web que hable por tu marca." },
        { icono: "", texto: "Tu cliente ya te está buscando en internet, ¡asegúrate de estar ahí!" },
        { icono: "", texto: "Diseño web a la medida de tus necesidades y las de tus clientes." },
        // { icono: "", texto: "Deja que el diseño hable por ti: construimos sitios que inspiran confianza." },
      ],
      modelo: {
        url: "/ImageToStl.com_uploads_files_2067459_all+models.glb",
        color: "white",
        scales: {
          small: [30, 30, 30],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [20, 20, 20],
          else: [0.15, 0.7, 0.3],
        },
        rotation: [0, -Math.PI/1.3, 0],
        position: [1, 1, 0],
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
        { icono: "", texto: "Identificación de procesos clave: Aprovechamos para encontrar puntos que te generen ventaja" },
        { icono: "", texto: "Mejora la estabilidad y el rendimiento de tu sistema con tecnologías de vanguardia." },
        { icono: "", texto: "Aprovecha lo mejor de la tecnología actual para dar un salto competitivo en tu industria." },
        { icono: "", texto: "Da el paso hacia la innovación tecnológica y asegura la ventaja competitiva de tu empresa" },
        { icono: "", texto: "Identificamos oportunidades clave para hacer tu plataforma más eficiente y rentable" },
      ],
      modelo: {
        url: "/toy_rocket.glb",
        color: "white",
        scales: {
          small: [2, 2, 2],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.8, 0.7, 1.1],
          else: [0.15, 0.7, 0.3],
        },
        rotation: [0, -Math.PI/1.2, 7],
        position: [-2, 2, 0],
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
        { icono: "", texto: "Ahorra tiempo y recursos con procesos automatizados que nunca fallan." },
        { icono: "", texto: "Tus datos no solo se almacenan, se convierten en decisiones estratégicas." },
        { icono: "", texto: "Automatización hecha para reducir costor y aumentar la productividad." },
        { icono: "", texto: "Bots inteligentes que optimizan tareas repetitivas y liberan tiempo valioso." },
        { icono: "", texto: "Desde la captura de datos hasta la toma de decisiones: tu empresa más inteligente con IA." },
        // { icono: "", texto: "Convierte prospectos en clientes con bots que venden por ti, 24/7." },
      ],
      modelo: {
        url: "/bot.glb",
        color: "cyan",
        scales: {
          small: [0.7, 0.7, 0.7],
          mobile: [0.05, 0.05, 0.03],
          tablet: [0.15, 0.7, 0.3],
          laptop: [0.15, 0.7, 0.3],
          desktop: [0.7, 0.7, 0.7],
          else: [0.15, 0.7, 0.3],
        },
        rotation: [0.1, -Math.PI, 0],
        position: [7, -3, 0],
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
