import { cn } from "../lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { MenuItem } from "./Menu";
import { TypewriterEffect, TypewriterEffectSmooth } from "./TypewriterEffect";

export default function FloatingDock ({
  items,
  desktopClassName,
  mobileClassName
}) {
  return (<>
    <FloatingDockDesktop items={items} className={desktopClassName} />
  </>);
};



const FloatingDockDesktop = ({
  items,
  className
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    (<motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-10 items-end rounded-2xl px-4 pb-2 bg-transparent",
        className
      )}>
        

      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} effect={true} {...item} />
      ))}
      <div className="mb-1">
      <ThemeToggleButton/>
      </div>
      <IconContainer mouseX={mouseX} key="Pide Info" title="Info" icon={<h4 className="text-xl font-bold text-black dark:text-white">❓</h4>} emoji={<h4 className="text-xl font-bold text-black dark:text-white px-1">❓</h4>} effect={false}/>
    </motion.div>)
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  emoji,
  effect,
}) {
  let ref = useRef(null);



  const [hovered, setHovered] = useState(false);

  return (
    (<a href={href}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-full bg-green-600/70 hover:bg-green-500/80 border-2 border-white/20 border-double shadow-lg shadow-green-600 hover:shadow-green-500 flex items-center justify-center relative px-3 py-3 hover:scale-110 transition duration-150 ease-in-out delay-0">
        {/* <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-16 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
              {title}
            </motion.div>
          )}
        </AnimatePresence> */}
        <motion.div
          className="flex items-center justify-center cursor-pointer text-black dark:text-white text-shadow text-xl font-extrabold">
            {hovered && effect && <TypewriterEffect words={[{text: title}]} className="inline text-white" />}
            {!effect && title}
          {icon}
        </motion.div>
      </motion.div>
    </a>)
  );
}
