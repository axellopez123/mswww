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
              <Box className={`h-screen flex flex-col fade-in `}>
                <Header  products={products} />
              </Box>
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
