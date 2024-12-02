import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GridComponent from "../components/GridComponent";
import HoverEffect from "../components/HoverEffect";
import { Contact } from "../components/Contact";
import { Layout_grid } from "../components/Layout-grid";


export default function Home() {
  useEffect(() => {

  }, []);

   
const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House in the woods
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
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
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
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
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
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
      claves: [{icono: "",texto: "Consultoría en la nube"},
      {icono: "",texto: "Base de datos en la nube"},
      {icono: "",texto: "Optimización de servidores"},
      {icono: "",texto: "Migración de servidores a la nube"},
      {icono: "",texto: "Infraestructura con las mejores soluciones de cómputo en la nube"}]
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
      claves: [{icono: "",texto: "Identificación de procesos clave"},
      {icono: "",texto: "Evaluación de herramientas tecnológicas"},
      {icono: "",texto: "Integración de sistemas"},
      {icono: "",texto: "Capacitación y adaptación"},
      {icono: "",texto: "Monitoreo y optimización continua"},
      {icono: "",texto: "Gestión del cambio"}]
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
      claves: [{icono: "",texto: "Identificación de procesos clave"},
      {icono: "",texto: "Evaluación de herramientas tecnológicas"},
      {icono: "",texto: "Integración de sistemas"},
      {icono: "",texto: "Capacitación y adaptación"},
      {icono: "",texto: "Monitoreo y optimización continua"},
      {icono: "",texto: "Gestión del cambio"}]
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
      claves: [{icono: "",texto: "Identificación de procesos clave"},
      {icono: "",texto: "Evaluación de herramientas tecnológicas"},
      {icono: "",texto: "Integración de sistemas"},
      {icono: "",texto: "Capacitación y adaptación"},
      {icono: "",texto: "Monitoreo y optimización continua"},
      {icono: "",texto: "Gestión del cambio"}]
    },/*
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
    },*/
  ];

  
  return (
    <div className="bg-white dark:bg-black">
        <GridComponent />
        
        <LayoutGridDemo cards={projects}/>
        <Contact/>
      </div>
  );
}
 function LayoutGridDemo(cards) {
  return (
    <div className="h-screem w-full">
      <Layout_grid cards={cards}/>
    </div>
  );
}




