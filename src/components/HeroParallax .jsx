"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { VortexProps } from "./VortexProps";
import { useDrawerContext } from "../contexts/DrawerContext";
function HeroParallax({
  products
}) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 500, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 400]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 100]), springConfig);
  return (
    (<div
    id="joyitas"
      ref={ref}
      className=" h-[250vh] top-0 py-0 overflow-hidden  antialiased relative 
      flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <div className="flex items-center justify-center h-screem w-screem w-screen">
      <Header /></div>  
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
          <div className="flex justify-center items-center mb-12">
            <p className="font-exo text-5xl md:text-7xl font-bold dark:text-white">Joyitas</p><i class='bx bxl-sketch text-cyan-400 hover:text-cyan-500 text-7xl md:text-9xl'></i>
          </div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>)
  );
};

function Header ()  {
  return (
    (<VortexProps
      className=" rounded md:p-6 w-11/12"  >
      <h1 className="text-5xl md:text-8xl font-bold dark:text-white">
        Impulsa tu empresa <br /> a otro nivel
      </h1>
      <p className="max-w-3xl text-xl md:text-4xl mt-8 dark:text-neutral-200 font-bold">
      Destaca en el mercado digital, confiando en nuestros expertos para llevar tu empresa al nivel que siempre has deseado. 
      </p>
    </VortexProps>)
  );
};

function ProductCard ({
  product,
  translate
}) {
  const { events, trackEvent } = useDrawerContext();

  const handleClick = () => {
    trackEvent({ type: "click", target: "Promo Banner" });
    console.log(events);
  };
  return (
    (<motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 py-40">
      <div onClick={handleClick} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </div>
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none "></div>
      <h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white ">
        {product.title}
      </h2>
    </motion.div>)
  );
};

export {
    HeroParallax,Header,ProductCard
}
