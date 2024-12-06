// src/contexts/DrawerContext.jsx
import React, { createContext, useCallback, useContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState({
    icon: "",
    title: "",
    message: "",
    time: 0,
  });

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const trackEvent = useCallback((event) => {
    setEvents((prev) => [
      ...prev,
      { ...event, timestamp: new Date().toISOString() },
    ]);
  }, []);

  const showNotification = (icon, title, message, time = 3000) => {
    setNotification({ icon, title, message, time });
    console.log(notification);
    
    setTimeout(() => setNotification({ icon: "", title: "", message: "", time: 0 }), time);
  };

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        events,
        trackEvent,
        notification,
        showNotification,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};
