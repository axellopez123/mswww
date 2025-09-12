import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";
import CircularText from './CircularText';
import { motion } from "framer-motion";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`z-0 card_ ${customClass ?? ""} ${rest.className ?? ""} -mt-9`.trim()}
  />
));
Card.displayName = "Card";

/* ---------- Helpers ---------- */
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const safeSet = (el, props) => {
  if (!el) return;
  gsap.set(el, props);
};

const safeTo = (el, props) => {
  if (!el) return Promise.resolve();
  return gsap.to(el, props);
};

// Busca recursivamente el primer src de imagen dentro de un child React element
const findImageSrc = (el) => {
  if (!isValidElement(el)) return null;
  // si el propio elemento tiene prop src
  if (el.props && el.props.src) return el.props.src;
  // si tiene estilo con backgroundImage (opcional)
  if (el.props && el.props.style && el.props.style.backgroundImage) {
    // format: url("...") -> extraer ...
    const match = /url\((['"]?)(.*?)\1\)/.exec(el.props.style.backgroundImage);
    if (match) return match[2];
  }
  const ch = React.Children.toArray(el.props.children || []);
  for (const c of ch) {
    const found = findImageSrc(c);
    if (found) return found;
  }
  return null;
};

/* ---------- Componente ---------- */
const CardSwap = ({
  width = 500,
  height = 500,
  cardDistance = 10,
  verticalDistance = 7,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 1,
  easing = "elastic",
  children,
  onCardChange,
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  // refs se recalculan cuando cambia el número de children
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(null);
  const container = useRef(null);
  const [activeIndex, setActiveIndex] = useState(order.current[0] ?? 0);

  const config =
    easing === "elastic"
      ? {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 0.5,
        durMove: 0.5,
        durReturn: 0.5,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
      : {
        ease: "power1.inOut",
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      };

  // Coloca instantáneamente usando gsap.set (safe)
  const placeNow = (el, slot, skew, isFront) =>
    safeSet(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: "center center",
      zIndex: slot.zIndex,
      force3D: true,
      opacity: isFront ? 1 : 0.3,
    });

  // swap original (rota 1 hacia atrás). Protege refs nulos.
  const swap = () => {
    if (!refs || refs.length < 2 || order.current.length < 2) return;

    const [frontCardIdx, ...restOfCardsIdx] = order.current;
    const elFront = refs[frontCardIdx]?.current;
    const tl = gsap.timeline();
    tlRef.current = tl;

    // opacidades rápidas
    refs.forEach((r, i) => {
      const el = r?.current;
      if (el) gsap.to(el, { opacity: i === frontCardIdx ? 1 : 0.3, duration: 0.2 });
    });

    if (elFront) {
      tl.to(elFront, { y: "+=500", opacity: 0, duration: config.durDrop, ease: config.ease });
    }

    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

    restOfCardsIdx.forEach((idx, i) => {
      const el = refs[idx]?.current;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      if (el) {
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, opacity: i === 0 ? 1 : 0.3, duration: config.durMove, ease: config.ease },
          `promote+=${i * 0.15}`
        );
      }
    });
if (!elFront) {
  console.warn("Front card ref is null, skipping animation");
  return;
}
    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => { if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, "return");
    tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
    tl.to(elFront, { y: backSlot.y, opacity: 0.3, duration: config.durReturn, ease: config.ease }, "return");

    tl.call(() => {
      order.current = [...restOfCardsIdx, frontCardIdx];
      setActiveIndex(order.current[0]);
      if (typeof onCardChange === "function") onCardChange(order.current[0]);
    });
  };

  // Animar a un nuevo orden (sin llamar swap repetidamente)
  const animateToOrder = (newOrder) => {
    if (!refs || refs.length < 1) return;
    const total = refs.length;
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Para cada elemento original (origIdx) colocarlo en la posición pos dentro del stack
    newOrder.forEach((origIdx, pos) => {
      const el = refs[origIdx]?.current;
      if (!el) return;
      const slot = makeSlot(pos, cardDistance, verticalDistance, total);
      tl.set(el, { zIndex: slot.zIndex }, 0);
      tl.to(el, { x: slot.x, y: slot.y, z: slot.z, skewY: skewAmount, opacity: pos === 0 ? 1 : 0.3, duration: config.durMove, ease: config.ease }, 0);
    });

    tl.call(() => {
      order.current = [...newOrder];
      setActiveIndex(order.current[0]);
      if (typeof onCardChange === "function") onCardChange(order.current[0]);
    });
  };

  // goToIndex robusto: construye nueva orden, anima a ella, reinicia intervalo
  const goToIndex = (index) => {
    if (index === order.current[0]) return;
    clearInterval(intervalRef.current);

    // nueva orden: clicked al frente, luego los demás en el mismo orden relativo (sin el clicked)
    const newOrder = [index, ...order.current.filter(i => i !== index)];
    animateToOrder(newOrder);

    intervalRef.current = window.setInterval(swap, delay);
  };

  // Init & efectos: recalcula posiciones cuando cambia el número de children u otros props relevantes
  useEffect(() => {
    // asegúrate de que order tenga longitud correcta si cambió childArr
    if (order.current.length !== childArr.length) {
      order.current = Array.from({ length: childArr.length }, (_, i) => i);
    }

    const total = refs.length;
    refs.forEach((r, i) => {
      const isFrontCard = order.current[0] === i;
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount, isFrontCard);
    });

    // iniciar ciclo
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    // pauseOnHover handlers (con guards)
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => { tlRef.current?.play(); intervalRef.current = window.setInterval(swap, delay); };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
    // IMPORTANTE: incluye childArr.length para recalcular cuando cambia el número de tarjetas
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length]);

  // Render: clonamos children para inyectar ref y tamaño
  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
        key: i,
        ref: refs[i],
        style: { width, height },
        onClick: (e) => {
          child.props.onClick?.(e);
          onCardClick?.(i);
        },
      })
      : child
  );

  return (
    <div
      ref={container}
      className="card-swap-container relative flex flex-col items-center"
      style={{ width, height, minHeight: "400px" }}
    >
      {/* HEADER */}
      <div className="bg- w-full p-2 relative" style={{ height: `calc(50vh - 64px)` }}>
        <div className="absolute top-1/3 left-[36%] -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
          <motion.img
            src="/images/PRO.png"
            alt="Bean 1"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <CircularText text="REACT*ARWAX*" onHover="speedUp" spinDuration={20} className="custom-class mt-5" />
      </div>

      {/* TARJETAS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-visible" style={{ zIndex: 2000 }}>
        {rendered}
      </div>

      {/* MINIATURAS (sin texto) */}
      <div className="flex justify-center gap-2 mt-[220px] relative z-[9999]">
        {childArr.map((child, idx) => {
          if (!isValidElement(child)) return null;
          const isActive = activeIndex === idx;

          // Encuentra el src de la imagen dentro del child (si existe)
          const src = findImageSrc(child);

          return (
            <motion.button
              key={idx}
              onClick={() => goToIndex(idx)}
              className={`cursor-pointer overflow-hidden rounded-md border-2 p-0 ${isActive ? "border-bg-purple-900 " : "border-gray-300"
                }`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: isActive ? 1.2 : 0.9, // 👉 activo más grande
                opacity: isActive ? 1 : 0.6,
              }}
              whileHover={{ scale: isActive ? 1.25 : 1.05, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{ width: 50, height: 50 }}
              aria-label={`Ir a tarjeta ${idx + 1}`}
            >
              {src ? (
                <motion.img
                  key={src} // 🔑 importante para que se reanime al cambiar
                  src={src}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100"></div>
              )}
            </motion.button>
          );
        })}
      </div>

    </div>
  );
};

export default CardSwap;
