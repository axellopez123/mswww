import React, { useState, useEffect, useRef } from 'react';
import { VortexProps } from './VortexProps';
import Silk from './Silk';
import Lanyard2 from './modelos3D/Tarjeta';
import BlurText from './BlurText';
import Orb from './Orb';
import { useDrawerContext } from "../contexts/DrawerContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import GooeyNav from './GooeyNav';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ScooterShowcase from './ScooterShowcase';
import { Navbear } from './Navbear';
import MagicBento from './MagicBento'

const BACKGROUNDS = {
  vortex: VortexProps,
  aurora: Silk,
  orb: Orb,
};
const BACKGROUND_COLORS = {
  vortex: "#c6841e",
  aurora: "#2bd2ff",
  orb: "#ff66cc",
};

{/*Joyitas*/ }
function Header({ products }) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 500, damping: 30, bounce: 100 };
  const velocity = 100;
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 400]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 100]), springConfig);

  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  useEffect(() => {
    if (firstRowRef.current) {
      const el = firstRowRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }
    if (secondRowRef.current) {
      const el = secondRowRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }
  }, [firstRow, secondRow]);
  const [showNavbear, setShowNavbear] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbear(true);
    }, 4000); // Espera 15 segundos tras carga

    return () => clearTimeout(timer);
  }, []);


  return (<> <div>
    {showNavbear ? (
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'fixed', // aseguramos que se vea claramente
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Navbear />
      </motion.div>
    ) : null}
  </div>
    <div
      id="joyitas"
      ref={ref}
      className="min-h-[180vh] sm:min-h-[170vh] md:min-h-[170vh] lg:min-h-[170vh]  top-0 py-0 overflow-hidden antialiased relative 
      flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-white dark:bg-black transition-colors duration-500
      ">
      <div className="flex items-center justify-center h-screem w-screem w-screen ">
        <Index />
      </div>


      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="
          bg-white dark:bg-black 
          text-black dark:text-white 
          transition-colors duration-500
          rounded-xl p-6 shadow-lg -mt-[90px]
        "
      >
        <div className="flex justify-center items-center mb-12 ">
          <p className="font-exo text-5xl md:text-7xl font-bold dark:text-white">Joyitas</p><i class='bx bxl-sketch text-cyan-400 hover:text-cyan-500 text-7xl md:text-9xl'></i>
        </div>
        <motion.div
          ref={firstRowRef}
          className="flex flex-row mb-20 space-x-20 overflow-x-auto scrollbar-hide no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>

        <motion.div
          ref={secondRowRef}
          className="flex flex-row mb-20 space-x-20 overflow-x-auto scrollbar-hide no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>


      </motion.div>


    </div> <ScooterShowcase />
    

    </>

  );
}

function Index() {
  const indexRef = useRef(0);
  useEffect(() => {
    const backgrounds = ['vortex', 'aurora', 'orb'];

    // Ejecutar inmediatamente al cargar
    handleChangeBackground(backgrounds[indexRef.current]);

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % backgrounds.length;
      handleChangeBackground(backgrounds[indexRef.current]);
    }, 9000); // cambia cada 15s

    return () => clearInterval(interval); // limpieza
  }, []);

  const [currentBackground, setCurrentBackground] = useState('vortex');
  const [prevBackground, setPrevBackground] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [showLanyard2, setShowLanyard2] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const positionY = scrollY * 0.8;

  const handleChangeBackground = (newBackground) => {
  if (transitioning) return; 

  setPrevBackground(currentBackground);
  setTransitioning(true);

  const el = document.getElementById("titulo");
  const el2 = document.getElementById("titulo2");
  if (el) {
    /*if (newBackground === "aurora") {
      el.style.filter = "drop-shadow(-5px 1px 2px rgb(0, 0, 0))";
      el2.style.filter = "drop-shadow(-5px 1px 2px rgb(0, 0, 0))";
    } else {
      el.style.filter = "drop-shadow(-5px 1px 2px rgba(0, 0, 0, 0.7))";
      el2.style.filter = "drop-shadow(-5px 1px 2px rgba(0, 0, 0, 0.7))";
    }*/
  }

  setTimeout(() => {
    setCurrentBackground(newBackground);
    setPrevBackground(null);
    setTransitioning(false);
  }, 1000);
};


  useEffect(() => {
    const handleLoad = () => {
      // espera 15s DESPUÉS de que la página esté completamente cargada
      setTimeout(() => setShowLanyard2(true), 4000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (

    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fondo dinámico con transición */}
      <div className="absolute inset-0 z-0">
        {prevBackground && (
          <div className="absolute inset-0 transition-opacity duration-1000 opacity-0 pointer-events-none">
            {React.createElement(BACKGROUNDS[prevBackground])}
          </div>
        )}

        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${transitioning ? 'opacity-0' : 'opacity-100'
            }`}
        >
          {React.createElement(BACKGROUNDS[currentBackground], {
            color: currentBackground === "aurora" ? '#eaecee' : undefined,
          })}
        </div>
      </div>



      {/* Contenido principal */}
      <div className="relative z-10 p-6 md:p-10 w-11/12 mx-auto">
        {showLanyard2 && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="top-14 left-0 w-screen h-10"
            style={{ transform: `translateY(${positionY}px)` }}
          >
            <Lanyard2 position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 px-4 lg:px-16 py-10">
          {/* Contenido principal */}
          <div className="w-full lg:w-4/5 flex flex-col justify-center space-y-4 min-h-[60vh] text-center lg:text-left">
            <BlurText
              id="titulo"
              text="Impulsa tu empresa"
              delay={150}
              animateBy="words"
              direction="top"
              className={`text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold drop-shadow-[-5px_1px_2px_rgba(0,0,0,0.7)] dark:drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] ${
                currentBackground === 'aurora' ? 'text-[#eaecee]' : 'text-black dark:text-white drop-shadow-[2px_2px_2px_rgba(7,255,255,0.1)]'
            }`}
            />
            <BlurText
              id="titulo2"
              text="a otro nivel"
              delay={250}
              animateBy="words"
              direction="top"
               className={`text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold drop-shadow-[-5px_1px_2px_rgba(0,0,0,0.7)] dark:drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] ${
                currentBackground === 'aurora' ? 'text-[#eaecee]' : 'text-black dark:text-white drop-shadow-[2px_2px_2px_rgba(7,255,255,0.1)]'
            }`}
            />
            <BlurText
              text="Destaca en el mercado digital, confiando en nuestros expertos para llevar tu empresa al nivel que siempre has deseado."
              delay={100}
              animateBy="words"
              direction="top"
              className={`text-3xl sm:text-4x1 md:text-4x1 lg:text-4xl xl:text-4xl font-semibold drop-shadow-[-5px_1px_2px_rgba(0,0,0,0.7)] dark:drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] ${
                currentBackground === 'aurora' ? 'text-white' : 'text-black dark:text-white drop-shadow-[2px_2px_2px_rgba(7,255,255,0.1)]'
            }`}
            />
            
          </div>

          {/* Contenedor vacío o para imagen/icono */}
          <div className="w-full lg:w-1/5 flex justify-center lg:justify-start">
            {/* Puedes poner una imagen, animación o ícono aquí si lo necesitas */}
          </div>
        </div>

      </div>
    </div>
  );
}


function ProductCard({
  product,
  translate
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Click detectado en ProductCard");
    console.log("Producto clickeado:", product);
    //window.location.href = "http://localhost:3000/coffee";

    //trackEvent({ type: "click", target: "Promo Banner" });
    if (product.title == '3D Coffee') {
      navigate('/coffee');
    }
  };


  return (
    <motion.div
      onClick={handleClick}
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product relative flex-shrink-0
    w-48 sm:w-42 md:w-42 lg:w-42 xl:w-96
    h-[12rem] sm:h-[12rem] md:h-[12rem] lg:h-[12rem] xl:h-[12rem]
    overflow-hidden rounded-xl shadow-lg cursor-pointer"
    >
      <div className="block h-full w-full transition-shadow duration-300 group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
          height={600}
          width={600}
        />
      </div>

      <div className="absolute inset-0 h-full w-full bg-black/60 opacity-0 transition-opacity duration-300 group-hover/product:opacity-80" />

      <h2 className="absolute bottom-4 left-4 text-sm xs:text-base md:text-lg lg:text-xl font-semibold text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>


  );
}

export default Header;

