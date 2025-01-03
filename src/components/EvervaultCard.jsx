"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Input } from "./Input";
import { Label } from "./Label";
import { TextArea } from "./TextArea";
import Modelo3D from "./Modelo3D";
import { Link } from "react-scroll";
import Mod3D from "./Mod3D";
export default function EvervaultCard({
  text,
  className,
  item,
  selected,
  setSelected,
  lastSelected,
  handleOnClose,
  setLastSelected,
  isCardFullyOpened,
}) {
  
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const icons = generateRandomString(160);
  const [randomString, setRandomString] = useState(icons);

  useEffect(() => {
    let str = generateRandomString(160);
    setRandomString(str);
  }, []);

  useEffect(() => {
    setLastSelected(selected);
  }, [selected, setLastSelected]);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(160);
    setRandomString(str);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div
      className={cn(
        `bg-transparent flex items-center justify-center w-full relative`,
        selected?.id === item.id
          ? "h-full overflow-y-auto"
          : "h-80",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className={` group/card w-full h-full absolute overflow-hidden bg-transparent flex items-center justify-center  ${
          selected?.id ? "  backdrop-blur-lg" : ""
        } `}
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
          selected={selected}
        />
        <div
          className={`relative z-10 flex items-center justify-center w-full h-full dark:text-black flex-col md:flex-row ${
            selected?.id ? ` ` : ""
          } `}
        >
          {selected?.id ? (
            <div className={`flex-1 md:px-16 pt-10 md:pt-8 h-full`}>
              <p className=" text-center text-3xl md:text-7xl lg:text-8xl font-extrabold antialiased z-20 mb-2 uppercase mb-10">
                {text}
              </p>
              {item.claves.map((a, i) => (
                // <div>
                //   <p className=" text-center text-lg md:text-3xl lg:text-2xl mt-4 font-semibold z-20">{a.texto}</p>
                // </div>
                <li
                  key={i}
                  className="flex items-center p-2 rounded-lg shadow hover:shadow-xl transition-shadow backdrop-hue-rotate-180 backdrop-blur-lg	my-3"
                >
                  <i class="bx bx-check bx-tada text-green-500 text-2xl mr-2"></i>
                  <span className="text-md md:text-3xl text-gray-800 dark:text-gray-200 font-bold	">
                    {a.texto}
                  </span>
                </li>
              ))}
            </div>
          ) : (
            <div
              className={`flex-1 absolute  ${selected?.id ? "rounded-sm" : ""}`}
            >
              <p className="text-black dark:text-white text-center text-5xl md:text-5xl font-extrabold antialiased z-20 px-3 md:px-0">
                {text}
              </p>
              <p className="text-black dark:text-white text-center text-xl md:text-2xl font-bold z-20 px-2 md:px-0">
                {item.description}
              </p>
            </div>
          )}

          <div
            class={`flex-1 h-full w-full ${selected?.id ? " " : "hidden"}  `}
          >
            <div className="rounded-none md:rounded-2xl shadow-input flex flex-col justify-center h-full w-full">
              <div className="flex-1 md:flex-none h-5/6 w-full">
                {isCardFullyOpened && selected && (
                  <Modelo3D modelo={selected.modelo} />
                  // <Mod3D></Mod3D>
                )}
              </div>
              <Link
                to={"contacto"}
                onClick={handleOnClose}
                smooth={true}
                duration={500}
                className="flex-1 md:flex-none cursor-pointer transition-colors flex justify-center"
              >
                <button className="relative inline-flex h-16 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-450 px-3 py-1 text-lg font-semibold text-white backdrop-blur-3xl">
                    Comenzar
                  </span>
                </button>
              </Link>
              {/* <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname" >Nombre</Label>
                    <Input id="firstname" type="text" />
                  </LabelInputContainer>
                  <LabelInputContainer className="hidden">
                    <Input id="firstname" value={`${item.id}`} type="text" />
                  </LabelInputContainer>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">Telefono</Label>
                    <Input id="phone" placeholder="33 777 12345" type="text" />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="message">Mensaje</Label>
                  <TextArea
                    id="message"
                    placeholder="Escribe aquí tu mensaje..."
                    type="text"
                    className=""
                  />
                </LabelInputContainer>

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  Enviar &rarr;
                  <BottomGradient />
                </button>
              </form>  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardPattern({ mouseX, mouseY, randomString, selected }) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };
  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-blue-700  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <span
          className={`absolute inset-x-0 h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500 ${
            selected?.id ? "text-5xl md:text-8xl " : "text-6xl "
          }`}
        >
          {randomString}
        </span>
      </motion.div>
    </div>
  );
}

const characters = [
  <i class="bx bxl-docker"></i>,
  <i class="bx bxl-aws"></i>,
  <i class="bx bx-bluetooth"></i>,
  <i class="bx bx-data"></i>,
  <i class="bx bx-cloud"></i>,
];
export const generateRandomString = (length) => {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push(characters[Math.floor(Math.random() * characters.length)]);
  }
  return result;
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
