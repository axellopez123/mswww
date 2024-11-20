// src/layouts/MainLayout.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Box from "@mui/material/Box";
import Logoindex from "../components/Logoindex";
import './MainLayout.css'; // Optional: add styles for layout
import { Navbear } from '../components/Navbear';
import TabMobile from '../components/tabsMobile';
import { VortexProps } from '../components/VortexProps';

import { NavbarMobile } from '../components/NavbarMobile';
export default function MainLayout({ children }) {
  const [visible, setVisisble] = useState("invisible");
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisisble("visible");
    }, 3000);
  }, [visible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowFirstDiv(false), 1000); // Espera a que termine la animación
    }, 4000); // Tiempo antes de empezar a ocultar

    return () => clearTimeout(timer);
  }, []);

  return (
<>
      <Box className={`${fadeOut ? 'fade-out' : ''} ${showFirstDiv ? 'block' : 'hidden'}`}>
        <Logoindex />
      </Box>

      <Box className={`h-screen flex flex-col ${visible} ${showFirstDiv ? 'hidden' : 'block'}`}>
        <div className="hidden md:block">
          <Navbear />
        </div>
        <Sidebar />
        <main>{children}</main>
        <div className="block md:hidden">
          <NavbarMobile/>
          <TabMobile/>
        </div>
        <Sidebar />
      </Box>
</>

  );
}
