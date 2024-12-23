"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";
import EvervaultCard from "./EvervaultCard";
import BackgroundGradient from "./BackgroundGradient";
import { Link, scroller } from "react-scroll"; // Importa react-scroll

function LayoutGrid({ cards, className }) {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [isCardFullyOpened, setIsCardFullyOpened] = useState(false); // Estado para el modelo 3D
  let [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (card) => {
    if(card.id === selected?.id)
      return;
    setLastSelected(selected);
    setSelected((prev) => (prev?.id === card.id ? null : card));
    setIsCardFullyOpened(false); // Reinicia el estado al abrir otra card
    scroller.scrollTo(`servicios`, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: 0, // Ajusta la posición del scroll si es necesario
    });
  };

  const handleOnClose = () => {
    console.log("Cerrando la tarjeta...");

    setLastSelected(selected);
    setSelected(null);
    setIsCardFullyOpened(false); // Oculta el modelo 3D al cerrar
  };

  useEffect(() => {
    if (selected?.id && selected.id === lastSelected?.id) {
      setIsCardFullyOpened(true);
    } else {
      setIsCardFullyOpened(false);
    }
  }, [isCardFullyOpened, selected, lastSelected]);
  
  return (
    <div id="servicios" className="h-full pt-16 md:pt-36">
      <div className="flex justify-center items-center">
        <p className="font-exo text-5xl md:text-7xl font-bold text-slate-800 dark:text-white z-40">
          Servicios
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="m-1 text-amber-400 size-20 hover:text-amber-500"
        >
          <path
            fill-rule="evenodd"
            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div className="w-full h-5/6 grid grid-cols-1 md:grid-cols-3 relative z-30">
        {cards.map((card, i) => (
          <>
            <div
              id={`card-${card.id}`} // Asegúrate de usar IDs únicos
              className={cn(card.className, "")}
            >
              <motion.div
                onClick={() => handleClick(card)}
                className={cn(
                  "",
                  "overflow-hidden",
                  selected?.id === card.id
                    ? "rounded-lg cursor-pointer absolute inset-0 w-full h-full md:h-full z-50 flex justify-center items-center flex-wrap flex-col"
                    : lastSelected?.id === card.id
                    ? "z-40 rounded-xl h-full w-full"
                    : "rounded-xl h-full w-full"
                )}
                initial={selected?.id === card.id ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={selected?.id === card.id ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                onAnimationComplete={() => {
                  if (selected?.id === card.id) {
                    console.log("GG: Card is fully opened");
                  }                  
                }}
                layoutId={`card-${card.id}`}
              >
                <div
                  id={card.id}
                  className="relative group  block p-2 h-full w-full backdrop-blur-lg"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.span
                        className={`absolute inset-0 h-full w-full block rounded-3xl  ${card.gbc} `}
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 0.5 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.5, delay: 0.0 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <Card
                    title={card.title}
                    card={card}
                    selected={selected}
                    setSelected={setSelected}
                    lastSelected={lastSelected}
                    setLastSelected={setLastSelected}
                    handleOnClose={handleOnClose}
                    isCardFullyOpened={isCardFullyOpened}
                  />
                </div>
                {/* {selected?.id === card.id && <SelectedCard selected={selected} />} */}
              </motion.div>
            </div>
            {selected?.id === card.id && (
              <motion.button
                onClick={handleOnClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute bg-red-500/70 hover:bg-red-500 top-5 right-5 text-white rounded-full shadow-lg z-50"
              >
                <i class="bx bx-x bx-tada text-lg md:text-3xl font-extrabold px-1"></i>
              </motion.button>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

const Card = ({
  className,
  children,
  title,
  card,
  selected,
  setSelected,
  lastSelected,
  handleOnClose,
  setLastSelected,
  isCardFullyOpened,
}) => {
  const isSelected = selected?.id === card.id;

  return (
    <div
      className={cn(
        `rounded-2xl h-full w-full overflow-hidden bg-gray-500/30 border-2 border-white/20 border-double shadow-lg shadow-gray-600 ${
          handleOnClose?.id ? "relative" : ""
        }  z-20`,
        className
      )}
    >
      <div className="relative h-full">
        <EvervaultCard
          text={title}
          item={isSelected?.id ? card : card}
          selected={selected}
          handleOnClose={handleOnClose}
          setLastSelected={setLastSelected}
          setSelected={setSelected}
          lastSelected={lastSelected}
          isCardFullyOpened={isCardFullyOpened}
        />
      </div>
    </div>
  );
};

export { LayoutGrid };
