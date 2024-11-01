import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

export default function Home() {
  const sectionRef = useRef(null);
  const ulRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && ulRef.current) {
        // Obtener la posición de desplazamiento vertical
        const scrollPosition = window.scrollY;
        // Calcular la distancia de desplazamiento horizontal basado en la posición
        const scrollWidth = ulRef.current.scrollWidth;
        const scrollDistance = scrollWidth - window.innerWidth;
        // Aplicar el efecto de desplazamiento horizontal
        ulRef.current.style.transform = `translateX(-${
          (scrollPosition / sectionRef.current.offsetHeight) * scrollDistance
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box className="flex-1 overflow-y-auto p-6 bg-gray-100">
      <div className="h-screen flex items-center justify-center text-gray-700">
        <h1 className="text-7xl font-bold tracking-tighter leading-tight text-center">
          Lines of London
        </h1>
      </div>
      <section ref={sectionRef} className="relative h-[500vh]">
        <ul ref={ulRef} className="flex sticky top-0 transition-transform duration-200">
          {[1, 2, 3, 4, 5].map((item) => (
            <li
              key={item}
              className="flex flex-col items-center justify-center w-screen h-screen flex-none overflow-hidden"
            >
              <div className="w-72 h-96 bg-red-700 flex items-center justify-center">
                <span className="text-white text-3xl">s</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tighter leading-tight text-red-600 mt-[-30px]">
                #{`00${item}`}
              </h2>
            </li>
          ))}
        </ul>
      </section>
      <div className="flex justify-center mt-8 text-center">
        <p className="text-lg">
          Photos by <span className="font-semibold">Matt Perry</span>
        </p>
      </div>
    </Box>
  );
}
