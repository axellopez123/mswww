import React from "react";
import MagicBento from './MagicBento'

export default function ScooterShowcase() {
  return (
    
    <div className="w-full mx-auto p-4 bg-white dark:bg-black  rounded-2xl text-gray-900 dark:text-white ">

  <MagicBento 
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
      />
</div>

  );
}
