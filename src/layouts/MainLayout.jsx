// src/layouts/MainLayout.jsx
import React, { useEffect } from 'react';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Box from "@mui/material/Box";

import './MainLayout.css'; // Optional: add styles for layout

export default function MainLayout({ children }) {


  return (
    <DrawerProvider>
    <Box className="h-screen flex flex-col">
    <Navbar />
        <Sidebar />
        <main className="flex-1 mt-16 overflow-y-auto p-6">
        {children}</main>
      </Box>
    </DrawerProvider>
  );
}
