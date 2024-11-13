import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GridComponent from "../components/GridComponent";
import HoverEffect from "../components/HoverEffect";
import { Contact } from "../components/Contact";
export default function Home() {
  useEffect(() => {

  }, []);

  const projects = [
    {
      title: "Cloud Solutions",
      description:
        "Almacena tu información en la nube y obtenla desde cualquier parte con acceso internet.",
      link: "https://stripe.com",
    },
    {
      title: "Pagínas Web",
      description:
        "Publica tu empresa en cualquier dispositivo con la mejor tecnología y diseño.",
      link: "https://netflix.com",
    },
    {
      title: "Migraciones",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Automatizaciones",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Richard",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];
  return (
    <div className="bg-white dark:bg-black">
      
        <GridComponent />
        <HoverEffect items={projects}/>
        <Contact/>
      </div>
  );
}
