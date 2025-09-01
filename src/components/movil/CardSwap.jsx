import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";
import CircularText from './CircularText';
import { motion } from "framer-motion";

export const Card = forwardRef(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`z-0 card_ ${customClass ?? ""} ${rest.className ?? ""} -mt-9`.trim()}
    />
  )
);
Card.displayName = "Card";

const makeSlot = (
  i,
  distX,
  distY,
  total
) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

// Ajustamos placeNow para también manejar la opacidad inicial
const placeNow = (el, slot, skew, isFront) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
    opacity: isFront ? 1 : 0.3, // Establecer opacidad inicial aquí
  });

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
  children,onCardChange
}) => {
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

  const childArr = useMemo(
    () => Children.toArray(children),
    [children]
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    // Inicializar la posición y opacidad de todas las tarjetas
    refs.forEach((r, i) => {
      // Determinar si esta tarjeta es la frontal en el orden inicial
      const isFrontCard = order.current[0] === i;
      placeNow(
        r.current,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount,
        isFrontCard // Pasar el estado de frontal a placeNow
      );
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [frontCardIdx, ...restOfCardsIdx] = order.current;
      const elFront = refs[frontCardIdx].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Asegurarse de que todas las tarjetas que NO son la frontal estén transparentes
      // antes de que comience la animación, y la frontal esté opaca.
      refs.forEach((ref, i) => {
        if (i === frontCardIdx) {
          gsap.to(ref.current, { opacity: 1, duration: 0.2 }); // La frontal siempre 1
        } else {
          gsap.to(ref.current, { opacity: 0.3, duration: 0.2 }); // Las demás 0.3
        }
      });
      
      // Animate the front card (now the current `elFront`) to drop and fade out
      tl.to(elFront, {
        y: "+=500",
        opacity: 0, // Se desvanece por completo al salir
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      restOfCardsIdx.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            // Cuando una tarjeta se mueve a la posición frontal, se vuelve opaca
            opacity: i === 0 ? 1 : 0.3, // Si es la primera de 'rest', será la nueva frontal
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          opacity: 0.3, // La tarjeta que regresa al fondo siempre es transparente
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...restOfCardsIdx, frontCardIdx];
        if (typeof onCardChange === "function") {
    onCardChange(restOfCardsIdx[0]); // 👈 índice de la nueva frontal
  }
      });
      // dentro de swap(), después de actualizar order.current


    };

    // La primera llamada a swap() se encargará de inicializar las opacidades
    // y empezar el ciclo.
    swap(); 
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
  ]);

  const rendered = childArr.map((child, i) => {
    // La opacidad inicial se maneja en el useEffect con placeNow,
    // por lo que no necesitamos forzarla aquí con 'initialOpacity'.
    // GSAP tomará control.
    return isValidElement(child)
      ? cloneElement(child, {
        key: i,
        ref: refs[i],
        style: {
          width,
          height,
          // Eliminamos la opacidad forzada aquí, GSAP la controlará
          // ...(child.props.style ?? {})
        },
        onClick: (e) => {
          child.props.onClick?.(e);
          onCardClick?.(i);
        },
      })
      : child;
  });

  return (
    <div
      ref={container}
      className="card-swap-container relative flex flex-col"
      style={{ width, height, minHeight: "400px" }}
    >
      {/* HEADER interno */}
      <div
        className="bg- w-full p-2 relative"
        style={{
          height: `calc(50vh - 64px)`, // altura del div
        }}
      >
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

        <CircularText
          text="REACT*ARWAX*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class mt-5 "
        />
      </div>


      {/* CONTENIDO central que debe ir encima de todo */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-auto"
        style={{ zIndex: 2000 }} // mucho más alto que las cards
      >
        {rendered}
      </div>
    </div>
  );
};

export default CardSwap;