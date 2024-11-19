"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Input } from "./Input";
import { Label } from "./Label";
import { TextArea } from "./TextArea";

export default function EvervaultCard({
  text,
  className,
  item,
  s
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const icons = generateRandomString(160);
  const [randomString, setRandomString] = useState(icons);

  useEffect(() => {
    let str = generateRandomString(160);
    setRandomString(str);
  }, []);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }) {
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
    (<div
      className={cn(
        "bg-transparent aspect-square  flex items-center justify-center w-full h-64 relative",
        className
      )}>
      <div
        onMouseMove={onMouseMove}
        className={`group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center  ${s?.id ? "h-screen backdrop-blur-lg" : "h-full"} `}>
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} s={s} />
        <div className={`relative z-10 flex items-center justify-center w-full h-full p-16 dark:text-white hover:text-white ${s?.id ? `grid grid-cols-2 gap-4 top-40 ` : ""} `} >
          <div
            className="relative h-11/12 w-full  rounded-full flex items-center justify-center">
            <div
              className="absolute w-full h-full bg-green-300/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" />
            <div className={`absolute  ${s?.id ?  "rounded-sm" : ""}`}>
              <p className=" text-center text-5xl font-extrabold antialiased z-20">{text}</p>
              <p className="text-center text-2xl font-extrabold z-20">{item.description}</p>
            </div>
          </div>
          <div class={`  ${s?.id ? "relative " : "absolute hidden"}  `}>
            <div className="flex-1 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-white/20 ">
              <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">Nombre</Label>
                    <Input id="firstname" placeholder="Tyler" type="text" />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Apellido(s)</Label>
                    <Input id="lastname" placeholder="Durden" type="text" />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Correo electronico</Label>
                  <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">Telefono</Label>
                    <Input id="firstname" placeholder="33 777 12345" type="text" />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Website</Label>
                    <Input id="lastname" placeholder="Durden" type="text" />
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
                  Pedir información &rarr;
                  <BottomGradient />
                </button>
              </form>
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
  randomString, s
}) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };
  return (
    (<div className="pointer-events-none">
      <div
        className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-blue-700  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style} />
      <motion.div
        className="absolute inset-0 rounded-2xl mix-blend-overlay group-hover/card:opacity-100"
        style={style}>
        <span
          className={`absolute inset-x-0 h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500 ${s?.id ? "text-8xl " : "text-6xl "}`}>
          {randomString}
        </span>
      </motion.div>
    </div>)
  );
}

const characters = [<i class='bx bxl-docker'></i>, <i class='bx bxl-aws' ></i>, <i class='bx bx-bluetooth'></i>, <i class='bx bx-data' ></i>, <i class='bx bx-cloud' ></i>];
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
