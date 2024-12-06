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

export default function EvervaultCard({
  text,
  className,
  item,
  selected,
  setSelected,
  lastSelected,
  handleOnClose,
  setLastSelected,
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
        `bg-transparent aspect-square  flex items-center justify-center w-full h-64 relative`,
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className={` group/card w-full absolute overflow-hidden bg-transparent flex items-center justify-center  ${
          selected?.id ? "  backdrop-blur-lg top-10" : "h-full"
        } `}
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
          selected={selected}
        />
        <div
          className={`relative z-10 flex items-center justify-center w-full h-full dark:text-white hover:text-black ${
            selected?.id ? `grid grid-cols-2 gap-4 ` : ""
          } `}
        >
          {selected?.id ? (
            <div className={`col-span-2 md:col-span-1 px-20`}>
              <p className=" text-center text-3xl md:text-5xl lg:text-5xl font-extrabold antialiased z-20">
                {text}
              </p>
              <br />
              <br />
              {item.claves.map((a, i) => (
                // <div>
                //   <p className=" text-center text-lg md:text-3xl lg:text-2xl mt-4 font-semibold z-20">{a.texto}</p>
                // </div>
                <li
                  key={i}
                  className="flex items-center p-4 rounded-lg shadow hover:shadow-lg transition-shadow backdrop-hue-rotate-180	my-1"
                >
                  <i class="bx bx-check bx-tada text-green-500 text-2xl mr-4"></i>
                  <span className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    {a.texto}
                  </span>
                </li>
              ))}
            </div>
          ) : (
            <div className={`absolute  ${selected?.id ? "rounded-sm" : ""}`}>
              <p className=" text-center text-3xl md:text-5xl font-extrabold antialiased z-20">
                {text}
              </p>
              <p className="text-center text-ms md:text-2xl font-semibold z-20 px-2 md:px-0">
                {item.description}
              </p>
            </div>
          )}

          <div
            class={`col-span-2 h-full md:col-span-1  ${
              selected?.id ? " " : "hidden"
            }  `}
          >
            {/* <div>
              <button className="absolute text-7xl top-2 right-2" onClick={handleOnClose}>x</button>
            </div> */}
            <div className="flex-1 w-full h-full rounded-none md:rounded-2xl shadow-input relative flex justify-center">
              <Modelo3D modeloUrl="/moon.glb" />
              <Link
      to={"contacto"}
      smooth={true}
      duration={500}
      className="cursor-pointer transition-colors"
    >
              <button className="absolute p-1 flex items-center justify-center bottom-8 rounded-md">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-semibold">
                  Cotiza ya!
                </div>
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
            selected?.id ? "text-8xl " : "text-6xl "
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
