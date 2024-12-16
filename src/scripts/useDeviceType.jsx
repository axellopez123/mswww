import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

export const useDeviceType = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ minWidth: 441, maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isLaptop = useMediaQuery({ minWidth: 1025, maxWidth: 1440 });
  const isDesktop = useMediaQuery({ minWidth: 1441 });

  const deviceType = useMemo(() => {
    if (isSmall) return "small";
    if (isMobile) return "mobile";
    if (isTablet) return "tablet";
    if (isLaptop) return "laptop";
    if (isDesktop) return "desktop";
    return "else";
  }, [isSmall, isMobile, isTablet, isLaptop, isDesktop]);

  return deviceType;
};
