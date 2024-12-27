// src/contexts/DrawerContext.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState({
    emoji: "",
    title: "",
    message: "",
    time: 0,
  });
  const [navigationStartTime, setNavigationStartTime] = useState(null);

  useEffect(() => {
    // Capturar el tiempo de inicio al montar la página
    setNavigationStartTime(Date.now());
  }, []);


  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const trackEvent = useCallback((event) => {
    setEvents((prev) => [
      ...prev,
      { ...event, timestamp: new Date().toISOString() },
    ]);
  }, []);

  const showNotification = (emoji, title, message, duration) => {
    // Configurar la notificación
    setNotification({ emoji, title, message, duration });

    // Configurar el ocultamiento de la notificación después del tiempo establecido
    setTimeout(() => {
      setNotification({ emoji: "", title: "", message: "", time: 0 });
    }, duration);
  };

  useEffect(() => {
    if (notification) {
      console.log("Notificación mostrada:", notification);
    }
  }, [notification]);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        events,
        trackEvent,
        notification,
        showNotification,
        navigationStartTime
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
