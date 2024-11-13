import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import EvervaultCard from "./EvervaultCard";
import BackgroundGradient from "./BackgroundGradient";
export default function HoverEffect ({
  items,
  className
}) {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    (<div
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-16 gap-8 md:px-10", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full block  rounded-3xl bg-green-700/50"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
          <Card title={item.title} item={item}>
            {/* <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription> */}
          </Card>

        </a>
      ))}
    </div>)
  );
};

const Card = ({
  className,
  children,
  title,
  item
}) => {
  return (
    (
      <BackgroundGradient>
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-green-700/50 border-2 border-white/20 border-double shadow-lg shadow-green-600 relative z-20",
        className
      )}>
      <div className="relative z-50">
        <EvervaultCard text={title} item={item} />
      </div>
    </div>
    </BackgroundGradient>
  )
  );
};
const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>)
  );
};
const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>)
  );
};
