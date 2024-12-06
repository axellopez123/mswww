import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GridComponent from "../components/GridComponent";
import HoverEffect from "../components/HoverEffect";
import { Contact } from "../components/Contact";
import { Layout_grid } from "../components/Layout-grid";
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

  const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House in the woods
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A serene and tranquil retreat, this house in the woods offers a
          peaceful escape from the hustle and bustle of city life.
        </p>
      </div>
    );
  };

  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House above the clouds
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Perched high above the world, this house offers breathtaking views and
          a unique living experience. It&apos;s a place where the sky meets
          home, and tranquility is a way of life.
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Greens all over
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Rivers are serene
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house by the river is a place of peace and tranquility. It&apos;s
          the perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };

  const projects = [
    {
      title: "Cómputo en la Nube",
      description:
        "Almacena tu información desde cualquier parte del mundo con acceso a internet y con una estructura robusta y con alta velocidad",
      link: "https://stripe.com",
      id: 1,
      content: <SkeletonOne />,
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
    },
    {
      title: "Pagínas Web",
      description:
        "Publica tu empresa en cualquier dispositivo captando la atención de tus clientes con la mejor experiencia UX y el mayor rendimiento.",
      link: "https://netflix.com",
      id: 2,
      content: <SkeletonTwo />,
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
    },
    {
      title: "Migraciones",
      description:
        "Pasa tu sistema clásico a uno moderno y eficiente con las mejores tecnologías de vanguardia de ultima generación.",
      link: "https://google.com",
      id: 3,
      content: <SkeletonThree />,
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
    },
    {
      title: "Automatizaciones",
      description:
        // "Reemplaza las tareas repetitivas aumentando la eficiencia, reduciendo errores y liberando recursos para actividades más estratégicas. Es la clave para mantenerse competitivo en un mundo digitalizado.",
        "Optimiza el flujo de trabajo reduciendo errores dando reemplazo a tareas repetitivas con procesos automatizados inteligentes.",

      link: "https://meta.com",
      id: 4,
      content: <SkeletonFour />,
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
    } /*
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
      id: 5,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail: ""
    },
    {
      title: "Richard",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
      id: 6,
      content: <SkeletonOne />,
      className: "md:col-span-1",
      thumbnail: ""
    },*/,
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
    <div className="bg-white dark:bg-black z-40">
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

      <LayoutGridDemo cards={projects} />
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
              {/* <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-16 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
              {title}
            </motion.div>
          )}
        </AnimatePresence> */}
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
function LayoutGridDemo(cards) {
  return (
    <div className="h-screen w-full">
      <Layout_grid cards={cards} />
    </div>
  );
}
