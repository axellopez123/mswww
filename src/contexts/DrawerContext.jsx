// src/contexts/DrawerContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const trackEvent = (event) => {
    console.log(event);
    
    setEvents((prev) => [...prev, { ...event, timestamp: new Date().toISOString() }]);
  };


  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer, events, trackEvent }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};
