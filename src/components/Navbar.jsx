// src/components/Navbar.jsx
import React from 'react';
import Button from '@mui/material/Button';
import { useDrawerContext } from '../contexts/DrawerContext';

export default function Navbar() {
  const { toggleDrawer } = useDrawerContext();

  return (
    <nav>
      <Button onClick={() => toggleDrawer(true)}>Open Sidebar</Button>
    </nav>
  );
}
