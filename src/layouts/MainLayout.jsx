// src/layouts/MainLayout.jsx
import React from 'react';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children }) {
  return (
    <DrawerProvider>
      <div>
        <Navbar />
        <Sidebar />
        <main>{children}</main>
      </div>
    </DrawerProvider>
  );
}
