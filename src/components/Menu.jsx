import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

function MenuItem({ setActive, active, item, children, emoji }) {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.div
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white text-shadow text-xl font-extrabold"
      >
        {emoji}
      </motion.div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                // layoutId ensures smooth animation
                layoutId="active"
                className="bg-white/95 backdrop-blur-3xl dark:bg-black/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  // layout ensures smooth animation
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function Menu({ setActive, children }) {
  return (
    <nav
      // resets the state
      onMouseLeave={() => setActive(null)}
      className="relative border dark:border-white/[0.2] bg-white/30 border-white/20 rounded-xl shadow-lg flex justify-between space-x-4 px-8 pt-4 pb-3"
    >
      {children}
    </nav>
  );
}

function ProductItem({ title, description, href, src }) {
  return (
    <a href={href} className="flex space-x-2">
      <i class={src}></i>
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
}

function HoveredLink({ children, ...rest }) {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </a>
  );
}

export { MenuItem, Menu, ProductItem, HoveredLink };
