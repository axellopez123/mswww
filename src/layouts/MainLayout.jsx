// src/layouts/MainLayout.jsx
import React, { useEffect } from 'react';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './MainLayout.css'; // Optional: add styles for layout

export default function MainLayout({ children }) {


  return (
    <DrawerProvider>
      <div>
        {/* Your layout components */}
        <Navbar />
        <Sidebar />
        <main>{children}</main>
      </div>
    </DrawerProvider>
  );
}
