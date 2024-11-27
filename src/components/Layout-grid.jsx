"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";
import EvervaultCard from "./EvervaultCard";
import BackgroundGradient from "./BackgroundGradient";

function Layout_grid({
    cards,
    className
}) {
    const [selected, setSelected] = useState(null);
    const [lastSelected, setLastSelected] = useState(null);
    let [hoveredIndex, setHoveredIndex] = useState(null);

    const handleClick = (card) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    return (
        (<div
            className="w-full h-full md:p-3 grid grid-cols-1 md:grid-cols-3    relative" id="grid-info">
            {cards["cards"].map((card, i) => (
                <div key={i} className={cn(card.className, "")}>
                    <motion.a
                        
                        onClick={() => handleClick(card)}
                        className={cn(card.className, " overflow-hidden ", selected?.id === card.id
                            ? " rounded-lg cursor-pointer absolute inset-0  w-full md:w-full m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                            : lastSelected?.id === card.id
                                ? "z-40  rounded-xl h-full w-full"
                                : " rounded-xl h-full w-full")}
                        layoutId={`card-${card.id}`}>
                        <div
                        id={card.id}
                            className="relative group  block p-2 h-full w-full backdrop-blur-lg"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}>
                            <AnimatePresence>
                                {hoveredIndex === i && (
                                    <motion.span
                                        className= {`absolute inset-0 h-full w-full block rounded-3xl  ${card.gbc } `}
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.5 },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.5, delay: 0.0 },
                                        }} />
                                )}
                            </AnimatePresence>
                            <Card title={card.title} card={card} s={selected} />
                        </div>
                        {selected?.id === card.id && <SelectedCard selected={selected} />}
                    </motion.a>
                </div>
            ))}
            <motion.div
                onClick={handleOutsideClick}
                className={cn(
                    "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10 ",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none "
                )}
                animate={{ opacity: selected?.id ? 0.3 : 0 }} />
        </div>)
    );
};


const Card = ({
    className,
    children,
    title,
    card,
    s
}) => {
    return (
        (
            
                <div
                    className={cn(
                        `rounded-2xl h-full w-full overflow-hidden bg-gray-500/30 border-2 border-white/20 border-double shadow-lg shadow-gray-600 ${s?.id ? "relative" : ""}  z-20`,
                        className
                    )}>
                    <div className="relative z-50 ">
                        <EvervaultCard text={title} item={s?.id? card:card} s={s}/>
                    </div>
                </div>
            
        )
    );
};

const ImageComponent = ({
    card
}) => {
    return (
        (<motion.img
            layoutId={`image-${card.id}-image`}
            src={card.thumbnail}
            height="500"
            width="500"
            className={cn(
                "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
            )}
            alt="" />)
    );
};

const SelectedCard = ({
    selected
}) => {
    return (
        (<div
            className="bg-transparent h-full w-5/6 flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 0.6,
                }}
                className="absolute inset-0 h-full w-full bg-black opacity-60 z-10" />
            <motion.div
                layoutId={`content-${selected?.id}`}
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: 100,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="relative px-8 pb-4 z-[70]">
                {selected?.content}
            </motion.div>
        </div>)
    );
};

export { Layout_grid }