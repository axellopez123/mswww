"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function Logo ({
  text,
  duration
}){
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "100%", cy: "100%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    (<svg
      ref={svgRef}
      
      viewBox="0 0 320 80"
      xmlns=""
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none bg-black/15 pt-6 rounded-xl">
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor={"#00ccb1"} />
              <stop offset="25%" stopColor={"#7b61ff"} />
              <stop offset="50%" stopColor={"#ffc414"} />
              <stop offset="75%" stopColor={"#1ca0fb"} />
              <stop offset="100%" stopColor={"#141316"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="10%"
          animate={maskPosition}
          // example for a smoother animation below
          //   transition={{
          //     type: "spring",
          //     stiffness: 300,
          //     damping: 50,
          //   }}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2.3"
        className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl"
        style={{ opacity: hovered ? 0.7 : 0 }}>
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2.3"
        
        className="font-[helvetica] font-bold text-7xl  stroke-neutral-200"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}>
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="6.3"
        mask="url(#textMask)"
        className="font-[helvetica] font-bold fill-transparent text-7xl">
        {text}
      </text>
    </svg>)
  );
};
