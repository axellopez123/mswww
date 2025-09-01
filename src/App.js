import './App.css';
import { VortexProps } from "./components/VortexProps";
import Logo from "./components/Logo";
import TextLogo from "./components/TextLogo";
import "./components/Logo.css";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from 'react';
import Header from './components/HeroParallax';
import { DrawerProvider } from './contexts/DrawerContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Coffee from './pages/Coffee';
import CardSwap, { Card } from './components/movil/CardSwap';
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { FiCpu, FiArrowRight } from "react-icons/fi";

import DecryptedText from './components/movil/DecryptedText';
function App() {
  const words = `Optimiza tu negocio`;

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowFirstDiv(false);
        setShowSecondDiv(true);
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const products_movil = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
      title: "Inmobiliaria",
      link: "https://inmobiliaria.arwax.pro",
      thumbnail: "/images/casas.jpeg",
    },
    {
      title: "3D Coffee",
      link: "http://localhost:3000/coffee",
      thumbnail: "/images/coffe_page.png",
    },
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },

  ];
   const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
      title: "Inmobiliaria",
      link: "https://inmobiliaria.arwax.pro",
      thumbnail: "/images/casas.jpeg",
    },
    {
      title: "3D Coffee",
      link: "http://localhost:3000/coffee",
      thumbnail: "/images/coffe_page.png",
    },
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
  ];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(timeout);
  }, []);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timeout);
  }, []);
  const [imageData, setImageData] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(products_movil[0]?.title || "");


  return (
    <DrawerProvider >
      <Routes>
        {/* Ruta principal con animaciones y botón */}
        <Route path="/" element={
          <>
            {showFirstDiv && (

              <Box className={`${fadeOut ? 'fade-out' : ''}`}>
                <VortexProps className="w-full h-full">
                  <div className="w-full h-full rounded-[22px] flex justify-center items-center">
                    <div className="w-screen px-4 md:px-0 md:w-2/4">
                      <Logo className="text-white" text="ARWAX" />
                      <TextLogo words={words} className="flex justify-center items-center" />
                    </div>
                  </div>
                </VortexProps>
              </Box>
            )}

            {showSecondDiv && (
              <>
                {/* Versión móvil/tablet */}
<Box className="block lg:hidden w-full h-screen overflow-hidden justify-center items-center bg-gray-100">
  <header
    className={`w-full p-4 text-white text-lg font-semibold flex items-center justify-between bg-transparent transition-all duration-700 ${
      show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
    }`}
  >
    <div className="flex items-center gap-2">
      <FiMenu
        size={24}
        color="black"
        className="drop-shadow-[0_0_1px_black] drop-shadow-[0_0_1px_black] drop-shadow-[0_0_1px_black]"
      />
    </div>
    <div className="flex-1 text-center"></div>
    <div className="flex items-center gap-4">
      <FiBell
        size={24}
        color="black"
        className="drop-shadow-[0_0_1px_black] drop-shadow-[0_0_1px_black] drop-shadow-[0_0_1px_black]"
      />
      <FiUser
        size={24}
        color="black"
        strokeWidth={2}
        className="drop-shadow-[0_0_1px_black] drop-shadow-[0_0_1px_black] drop-shadow-[0_0_1px_black]"
      />
    </div>
  </header>

  <CardSwap
    cardDistance={30}
    verticalDistance={20}
    delay={4000}
    pauseOnHover={true}
    height={320}
    width={370}
    onCardChange={(index) => {
      setSelectedTitle(products_movil[index].title);
    }}
  >
    {products_movil.map((product, index) => (
      <Card
        key={index}
        className="overflow-hidden rounded-xl shadow-md cursor-pointer"
      >
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative group w-full h-full"
        >
          {/* Imagen */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-xl h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay inferior para título */}
          <div className="absolute bottom-0 left-0 w-full bg-black/40 p-3">
            <h3 className="text-white text-lg font-semibold truncate">
              {product.title}
            </h3>
          </div>
        </a>
      </Card>
    ))}
  </CardSwap>

  <div className="relative min-h-screen bg-gray-100 ">
    {/* FONDO del footer */}
    <div className="fixed bottom-0 left-0 w-full h-[120px] z-40 pointer-events-none">
      <VortexProps className="w-full h-full text-1xl">
        <Logo className="text-white text-1xl" text="ARWAX" />
      </VortexProps>
    </div>

    {/* FOOTER */}
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 h-[120px] transition-all duration-700 ease-out transform 
        ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} 
        bg-white bg-opacity-20 backdrop-blur-md text-white text-sm rounded-t-xl py-6 flex items-center justify-between px-6`}
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-purple-900 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
        <FiCpu size={24} />
      </div>

      <div className="flex flex-col text-left font-sans">
        <span className="text-gray-700 text-lg font-bold mb-1 uppercase tracking-wide">
          Impulsa
        </span>
        <DecryptedText
          text={selectedTitle}
          animateOn="view"
          revealDirection="center"
          className="text-2xl md:text-6xl font-extrabold text-purple-900 leading-none uppercase transform transition-transform duration-200 hover:scale-105 [text-shadow:_1px_1px_#fff,_-1px_-1px_#fff,_1px_-1px_#fff,_-1px_1px_#fff]"
          encryptedClassName="text-2xl md:text-6xl font-extrabold text-gray-700 leading-none uppercase transform transition-transform duration-200 hover:scale-105 [text-shadow:_1px_1px_#fff,_-1px_-1px_#fff,_1px_-1px_#fff,_-1px_1px_#fff]"
        />
        <span className="text-gray-700 font-bold text-lg mt-1 self-start uppercase tracking-wide">
          Siempre
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="bg-white text-purple-900 rounded-full px-4 py-1 font-semibold cursor-pointer select-none">
          Buy now
        </span>
        <button className="bg-purple-900 rounded-full p-2 flex items-center justify-center hover:bg-purple-500 transition">
          <FiArrowRight className="text-white" size={20} />
        </button>
      </div>
    </footer>
  </div>
</Box>

{/* Versión escritorio */}
<Box className="hidden lg:flex h-screen flex-col fade-in">
  <Header products={products} />
</Box>

              </>
            )}

          </>
        } />

        {/* Ruta para Coffee */}
        <Route path="/coffee" element={<Coffee />} />
      </Routes>
    </DrawerProvider>
  );
}

export default App;
