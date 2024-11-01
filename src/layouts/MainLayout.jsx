// src/layouts/MainLayout.jsx
import React, { useEffect, useState } from 'react';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Box from "@mui/material/Box";
import Logoindex from "../components/Logoindex";


import './MainLayout.css'; // Optional: add styles for layout

export default function MainLayout({ children }) {
  const [visible,setVisisble] = useState('invisible');
/*
useEffect(() => {
    setTimeout(() => {
      setVisisble('visible')
    },3000)
  }, [visible]);*/


  return (
    <DrawerProvider className="bg-red-500">
    <Logoindex/>
    <Box className={`z-10 h-screen flex flex-col ${visible}`}>
    <Navbar/>
        <Sidebar />
        <main className="flex-1 mt-16 overflow-y-auto p-6">
        {children}</main>
      </Box>
    </DrawerProvider>
  );
}
