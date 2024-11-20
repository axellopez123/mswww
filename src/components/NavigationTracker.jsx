import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDrawerContext } from "../contexts/DrawerContext"

const NavigationTracker = () => {
  const location = useLocation();
  const { trackEvent } = useDrawerContext();

  useEffect(() => {
    trackEvent({ type: "navigation", path: location.pathname });
  }, [location, trackEvent]);

  return null;
};

export default NavigationTracker;
