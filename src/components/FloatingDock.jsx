import { cn } from "../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { MenuItem } from "./Menu";
import { TypewriterEffect, TypewriterEffectSmooth } from "./TypewriterEffect";
import { Link } from "react-scroll";

export default function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
}) {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
}

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-10 items-end rounded-2xl px-4 pb-2 bg-transparent",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          effect={true}
          {...item}
          target={item.target}
        />
      ))}
      <div className="mb-1">
        <ThemeToggleButton />
      </div>
      <IconContainer
        mouseX={mouseX}
        key="Pide Info"
        title="Info"
        icon={
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12 text-gray-100 hover:text-gray-200">
  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
</svg>
      }
        emoji={
          <h4 className="text-xl font-bold text-black dark:text-white px-1">
            ❓
          </h4>
        }
        effect={false}
        target={"contacto"}
      />
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, target, emoji, effect }) {
  let ref = useRef(null);

  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={target}
      smooth={true}
      duration={500}
      className="cursor-pointer transition-colors"
    >
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-full bg-green-600/70 hover:bg-green-500/80 border-2 border-white/20 border-double shadow-lg shadow-green-600 hover:shadow-green-500 flex items-center justify-center relative px-1 py-1 hover:scale-110 transition duration-150 ease-in-out delay-0"
      >
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
        <motion.div className="flex items-center justify-center cursor-pointer text-black dark:text-white text-shadow text-xl font-extrabold">
          {hovered && effect && (
            <TypewriterEffect
              words={[{ text: title }]}
              className="inline text-white"
            />
          )}
          {!effect && title}
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
