"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function EvervaultCard ({
  text,
  className,
  item
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const icons =  generateRandomString(1500);
  const [randomString, setRandomString] = useState(icons);

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    (<div
      className={cn(
        "bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
        className
      )}>
      <div
        onMouseMove={onMouseMove}
        className="group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full">
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
        <div className="relative z-10 flex items-center justify-center w-full h-full p-16">
          <div
            className="relative h-11/12 w-full  rounded-full flex items-center justify-center">
            <div
              className="absolute w-full h-full bg-green-300/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" />
              <div className="absolute">
                <p className="dark:text-white text-black text-center text-5xl font-extrabold antialiased z-20">{text}</p>
                <p className="dark:text-white text-black text-center text-lg font-bold z-20">{item.description}</p>
              </div>
          </div>
        </div>
      </div>
    </div>)
  );
};

function CardPattern({
  mouseX,
  mouseY,
  randomString
}) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    (<div className="pointer-events-none">
      <div
        className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style} />
      <motion.div
        className="absolute inset-0 rounded-2xl mix-blend-overlay group-hover/card:opacity-100"
        style={style}>
        <span
          className="absolute inset-x-0 text-3xl h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </span>
      </motion.div>
    </div>)
  );
}

const characters = [<i class='bx bxl-docker'></i>,<i class='bx bxl-aws' ></i>,<i class='bx bx-bluetooth'></i>,<i class='bx bx-data' ></i>,<i class='bx bx-cloud' ></i>];
export const generateRandomString = (length) => {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push(characters[Math.floor(Math.random() * characters.length)]);
  }
  return result;
};

