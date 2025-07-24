import React, { useState, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Model } from "../components/modelos3D/Coffee_cup";
import Silk from "../components/Silk";
import GlareHover from '../components/GlareHover';
import BlurText from '../components/BlurText';
import AnimatedContent from '../components/AnimatedContent ';
import ProfileCard from '../components/ProfileCard ';
import { useSpring } from "@react-spring/three";
import Carousel from '../components/Carousel';
import '../pages/Coffee.css';

function CameraController({ desiredPosition, targetPosition, isUserInteracting }) {
  const { camera } = useThree();
  const currentPos = useRef(camera.position.clone());

  useFrame(() => {
    if (isUserInteracting) {
      currentPos.current.copy(camera.position);
    } else {
      currentPos.current.lerp(
        { x: desiredPosition[0], y: desiredPosition[1], z: desiredPosition[2] },
        0.05
      );
      camera.position.copy(currentPos.current);
      camera.lookAt(...targetPosition);
    }
  });

  return null;
}

function Marker({ position, label }) {
  return (
    <Html
      position={position}
      center
      style={{
        background: "rgba(250, 240, 230, 0.9)",
        padding: "6px 14px",
        borderRadius: 12,
        color: "#4B2E05",
        fontWeight: "600",
        fontSize: "1.1rem",
        userSelect: "none",
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(75, 46, 5, 0.3)",
        whiteSpace: "nowrap",
        fontFamily: "'Georgia', serif",
      }}
    >
      {label}
    </Html>
  );
}

export default function Coffee() {
  const [modelPos] = useState([1.5, -0.5, -2]);
  const [targetPos, setTargetPos] = useState(modelPos);
  const [marker, setMarker] = useState({ position: null, label: "" });
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [profileCardPos, setProfileCardPos] = useState(null);

  const [camPos, setCamPos] = useState([1.5, 12, 12]);

  useSpring({
    from: { camPos: [1.5, 12, 12] },
    to: { camPos: [1.5, 8.5, 6] },
    config: { mass: 1, tension: 120, friction: 26 },
    onChange: ({ value }) => {
      if (value.camPos) setCamPos(value.camPos);
    }
  });

  const moveCameraRelativeToObject = (offset, label = "") => {
    const newCamPos = [
      modelPos[0] + offset[0],
      modelPos[1] + offset[1],
      modelPos[2] + offset[2],
    ];
    setCamPos(newCamPos);
    setTargetPos(modelPos);

    if (label === "Crafted by") {
      setShowProfileCard(true);
      setProfileCardPos([modelPos[0] - 0.3, modelPos[1] + 1, modelPos[2]]);
      setMarker({ position: null, label: "" });
    } else {
      setShowProfileCard(false);
      setProfileCardPos(null);

      if (label) {
        const markerPos = [
          modelPos[0] + offset[0] / 2,
          modelPos[1] + offset[1] / 2,
          modelPos[2] + offset[2] / 2,
        ];
        setMarker({ position: markerPos, label });
      } else {
        setMarker({ position: null, label: "" });
      }
    }
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Silk />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-8 w-full px-8">
        <div className="flex gap-10">
          {["TUESTE LIGERO", "TUESTE OSCURO"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-sm uppercase tracking-widest transition-colors duration-300 hover:underline hover:text-[#f4d03f]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-10">
          {["Sobre nosotros", "contactos"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-sm uppercase tracking-widest transition-colors duration-300 hover:underline hover:text-[#f4d03f]"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <div
        className="relative min-h-screen font-sans text-white overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundColor: "transparent",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <GlareHover
          className="relative overflow-hidden border-4 border-[#a67c4b] shadow-lg mb-10 glare-hover rounded-full"
          width="400px"
          height="400px"
          background="rgba(58, 35, 11, 0.5)"
          borderRadius="50%"
          borderColor="#a67c4b"
          glareColor="#ffffff"
          glareOpacity={0.3}
          glareAngle={-30}
          glareSize={300}
          transitionDuration={800}
          playOnce={false}
          style={{
            boxShadow: "0 15px 30px rgba(58, 35, 11, 0.6)",
            marginTop: 0,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <Canvas
            shadows
            camera={{ position: camPos, fov: 25, near: 0.1, far: 1000 }}
            style={{ borderRadius: "50%" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Model position={modelPos} />
            <CameraController
              desiredPosition={camPos}
              targetPosition={targetPos}
              isUserInteracting={isUserInteracting}
            />
            {marker.position && <Marker position={marker.position} label={marker.label} />}
            {showProfileCard && profileCardPos && (
              <Html
                center
                position={[1.5, -0.8, -2]}
                style={{
                  pointerEvents: "auto",
                  width: "auto",
                  height: "auto",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "auto",
                    zIndex: 9999,
                    transform: "scale(0.5)",
                  }}
                >
                  <ProfileCard
                    name="Ing. R. Rodriguez"
                    title="Software Engineer"
                    handle="ARWAX"
                    status="Siempre listos"
                    contactText="Contáctame"
                    avatarUrl="/images/YO.png"
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => console.log("Contact clicked")}
                    iconUrl="/images/code.png"
                  />
                </div>
              </Html>
            )}
            <OrbitControls
              target={[...modelPos]}
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              onStart={() => setIsUserInteracting(true)}
              onEnd={() => setIsUserInteracting(false)}
              rotateSpeed={0.5}
              zoomSpeed={0.6}
            />
          </Canvas>
        </GlareHover>

        <div
          className="text-center mb-12 w-full max-w-3xl px-6 py-4"
          style={{ position: "relative", zIndex: 9999 }}
        >
          <div className="flex justify-center">
            <BlurText
              text="Granos de café frescos"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-5xl font-bold mb-3 text-center"
              style={{
                color: "#f4e3d7",
                textShadow: "2px 2px 6px #3a230b",
              }}
            />
          </div>

          <p className="text-lg leading-relaxed" style={{ color: "#d6c3a3", fontStyle: "italic" }}>
            Experimente la excelencia con nuestros granos de café premium, cuidadosamente seleccionados
          </p>
        </div>

        {/* Resto de tu código con AnimatedContent, botones, modal, etc., sin cambios */}

        <AnimatedContent
          distance={14}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <div className="fixed top-[330px] right-2 md:right-12 transform -translate-y-1/2 w-[230px] md:w-[260px] lg:w-[300px] h-[260px] md:h-[290px] lg:h-[320px] z-50">
            <GlareHover
              className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-[#a67c4b] shadow-lg glare-hover"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              width="100%"
              height="100%"
            >
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center">
                  <img
                    src="/images/coffee_bean1.png"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-full rotate-[-20deg]"
                    alt="Bean 1"
                  />
                  <img
                    src="/images/coffee_bean2.png"
                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-cover rounded-full rotate-[-15deg] -ml-4 md:-ml-6 mt-3 md:mt-5"
                    alt="Bean 2"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 mb-4 text-center">
                <span className="text-xs md:text-sm lg:text-base uppercase tracking-wider text-[#f4e3d7]">
                  DESDE
                </span>
                <span className="text-xs md:text-sm lg:text-base uppercase tracking-wider text-[#f4e3d7]">
                  GRANOS DE ALTURA HASTA
                </span>
                <span className="text-xs md:text-sm lg:text-base uppercase tracking-wider text-[#f4e3d7]">
                  TU TUESTE IDEAL
                </span>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-[#6f4e37] text-[#f4e3d7] text-xs md:text-sm font-bold py-2 px-4 z-0 rounded-full hover:bg-[#b88655] transition uppercase shadow-md"
              >
                + Inicia
              </button>
            </GlareHover>
          </div>
        </AnimatedContent>


        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fade-in-up">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold text-[#6f4e37] mb-4">Bienvenido</h2>
              <p className="text-sm text-gray-600 mb-4">
                Aquí puedes iniciar sesión o continuar con tu proceso.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 rounded-md text-sm bg-[#6f4e37] hover:bg-[#b88655] text-[#f4e3d7] font-semibold">
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}


        <AnimatedContent
          distance={14}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <div className="fixed top-[330px] left-2 md:left-12 transform -translate-y-1/2 w-[230px] md:w-[260px] lg:w-[300px] h-[260px] md:h-[290px] lg:h-[320px] z-50">
            <GlareHover
              className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-[#a67c4b] shadow-lg glare-hover"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              width="100%"
              height="100%"
            ><Carousel
                baseWidth={230}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />

            </GlareHover>
          </div>
        </AnimatedContent>


        <div className="flex gap-4 items-center mb-3 pointer-events-auto z-50 relative">
          {[
            { label: "Crafted by", offset: [0, 0, 6] },
            { label: "Contáctame", offset: [0, 6, 0] },
          ].map(({ label, offset }) => (
            <button
              key={label}
              onClick={() => moveCameraRelativeToObject(offset, label)}
              className="text-sm font-bold rounded-full transition duration-300 w-28 py-2 cursor-pointer z-50 tracking-wider"
              style={{
                background: "rgba(0, 0, 0, 0.7)",
                color: "#fcebd5",
                border: "1px solid #a87c4f",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                textTransform: "uppercase",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30, 20, 10, 0.9)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
