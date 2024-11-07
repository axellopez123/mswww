// src/layouts/MainLayout.jsx
import React, { useEffect, useState } from 'react';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Box from "@mui/material/Box";
import Logoindex from "../components/Logoindex";
import './MainLayout.css'; // Optional: add styles for layout

export default function MainLayout({ children }) {
  const [visible, setVisisble] = useState('invisible');
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisisble('visible')
    }, 3000)
  }, [visible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowFirstDiv(false), 1000); // Espera a que termine la animación
    }, 4000); // Tiempo antes de empezar a ocultar

    return () => clearTimeout(timer);
  }, []);


  return (
    <DrawerProvider>
      {showFirstDiv ? (
      <div className={fadeOut ? 'fade-out' : ''}>
      <Logoindex />
    </div>
      ) : (
      <Box className={`z-10 h-screen flex flex-col ${visible}`}>
        <Navbar />
        <Sidebar />
        <main >
          {children}</main>
      </Box>
      )}
    </DrawerProvider>
  );
}
