import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* --- Componente principal --- */
const ShuffleHeroApp = () => {
  const temas = [
    { id: "panel", name: "Panel Administrativo" },
    { id: "institucional", name: "Sitio Institucional" },
    { id: "evento", name: "Portal de Eventos" }, // <-- NUEVO TEMA
  ];

  const [temaActivo, setTemaActivo] = useState("panel");

  return (
    <section className="w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 items-start gap-12 max-w-7xl mx-auto">
      {/* Lado izquierdo: botones y acordeón */}
      <div>
        <span className="block mb-2 text-xs md:text-sm text-indigo-500 font-medium uppercase tracking-wider">
          {temas.find((t) => t.id === temaActivo)?.name}
        </span>
        <h4 className="text-3xl md:text-3xl font-bold text-white">
          {temaActivo === "panel"
            ? "Panel Administrativo (Privado)"
            : temaActivo === "institucional"
            ? "Sitio Institucional del Organizador"
            : "Portal de Eventos para Participantes"} {/* <-- NUEVO TEXTO */}
        </h4>
        <p className="text-base md:text-lg text-white mt-3 mb-6">
          {temaActivo === "panel"
            ? "Plataforma completa para la gestión profesional de eventos deportivos."
            : temaActivo === "institucional"
            ? "Información básica y recursos del sitio institucional."
            : "Explora los eventos disponibles, registra tu participación y consulta detalles."} {/* <-- NUEVO TEXTO */}
        </p>

        {/* Botones para cambiar de tema */}
        <div className="flex gap-2 mb-4">
          {temas.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemaActivo(t.id)}
              className={`px-4 py-2 rounded font-medium ${
                temaActivo === t.id
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Acordeón según tema */}
        <AnimatePresence mode="wait">
          {temaActivo === "panel" && <AccordionFAQ key="panel" />}
          {temaActivo === "institucional" && (
            <AccordionInstitucional key="institucional" />
          )}
          {temaActivo === "evento" && <AccordionEventos key="evento" />} {/* <-- NUEVO ACORDEÓN */}
        </AnimatePresence>
      </div>

      {/* Lado derecho: ShuffleGrid */}
      <ShuffleGrid />
    </section>
  );
};

/* --- Componente acordeón Panel Administrativo --- */
const AccordionFAQ = () => {
  const modules = [
    {
      title: "Módulo de Autenticación",
      items: [
        "Acceso seguro mediante login con email y contraseña.",
        "Recuperación de contraseña vía correo electrónico.",
      ],
    },
    {
      title: "Dashboard / Panel de Control",
      items: [
        "Interfaz centralizada para monitorear la plataforma.",
        "Acceso rápido a eventos activos, próximos y finalizados.",
        "Estadísticas clave: inscripciones, pagos, categorías populares.",
        "Widgets configurables: resumen financiero, últimos registros, etc.",
      ],
    },
    {
      title: "Gestión de Eventos",
      items: [
        "CRUD completo (crear, editar, eliminar).",
        "Campos personalizables: nombre, tipo, fecha, ubicación (mapas), categorías, cupo máximo, estado.",
      ],
    },
    {
      title: "Configuración Avanzada",
      items: [
        "Distancias y recorridos personalizados.",
        "Editor de reglas y reglamentos con archivos o imágenes.",
        "Sponsors, información destacada y archivos descargables.",
      ],
    },
    {
      title: "Gestión de Inscripciones",
      items: [
        "Listado de inscritos por evento con filtros avanzados.",
        "Verificación de pagos y estados (pendiente, confirmado, cancelado).",
      ],
    },
    {
      title: "Carga y Resultados",
      items: [
        "Subida de resultados por categoría y tiempo.",
        "Publicación automática y corrección manual de errores.",
      ],
    },
    {
      title: "Módulo de Estadísticas",
      items: [
        "Reportes gráficos e interactivos.",
        "Comparativas de eventos pasados, participación por género/edad.",
        "Panel financiero con ingresos por evento.",
      ],
    },
    {
      title: "Notificaciones y Comunicación",
      items: [
        "Envío de emails, WhatsApp, Telegram (confirmaciones, recordatorios, avisos).",
        "Plantillas personalizables e historial de notificaciones.",
      ],
    },
    {
      title: "Gestión de Pagos",
      items: [
        "Integración con pasarelas de pago.",
        "Transacciones por evento y estados: pendiente, confirmado, reembolsado.",
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white rounded-2xl shadow-md border border-slate-200 divide-y divide-slate-200"
    >
      {modules.map((mod, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center px-6 py-4 text-left text-slate-800 font-medium hover:bg-slate-50 transition-all"
          >
            <span>{mod.title}</span>
            <span className="text-indigo-500 font-bold">
              {openIndex === i ? "-" : "+"}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-4 overflow-hidden text-slate-600"
              >
                <ul className="list-disc pl-5 space-y-1">
                  {mod.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

/* --- Componente acordeón Sitio Institucional --- */
const AccordionInstitucional = () => {
  const sections = [
    {
      title: "Inicio / Quiénes Somos",
      items: ["Resumen breve de quién eres, qué haces y tu propuesta de valor."],
    },
    { title: "Historia", items: ["Breve recorrido por tu origen, trayectoria y logros clave."] },
    { title: "Sponsors", items: ["Logos de marcas que te apoyan o han colaborado contigo."] },
    {
      title: "Próximos Eventos",
      items: ["Lista visual de los próximos eventos: nombre, fecha, lugar."],
    },
    { title: "Redes Sociales", items: ["Iconos con enlaces a tus redes."] },
    {
      title: "Contacto",
      items: ["Formulario simple + email y redes."],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white rounded-2xl shadow-md border border-slate-200 divide-y divide-slate-200"
    >
      {sections.map((sec, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center px-6 py-4 text-left text-slate-800 font-medium hover:bg-slate-50 transition-all"
          >
            <span>{sec.title}</span>
            <span className="text-indigo-500 font-bold">{openIndex === i ? "-" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-4 overflow-hidden text-slate-600"
              >
                <ul className="list-disc pl-5 space-y-1">
                  {sec.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

/* --- NUEVO ACORDEÓN: Portal de Eventos --- */
const AccordionEventos = () => {
  const sections = [
    {
      title: "Explorar Eventos",
      items: [
        "Buscador avanzado por fecha, ubicación y tipo de evento.",
        "Filtros inteligentes para encontrar eventos que te interesen.",
      ],
    },
    {
      title: "Detalles del Evento",
      items: [
        "Visualiza la información completa de cada evento.",
        "Consulta horarios, ubicaciones y requisitos de inscripción.",
      ],
    },
    {
      title: "Registro y Participación",
      items: [
        "Inscripción rápida en línea.",
        "Confirmación de participación y pago integrado.",
      ],
    },
    {
      title: "Descarga de Comprobante",
      items: [
        "Descargas comprobante de inscripción en formato PDF.",
        "Código QR para acreditación rápida.",
      ],
    },
    {
      title: "Consulta de Resultados Post-Evento",
      items: [
        "Resultados oficiales desde el portal.",
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white rounded-2xl shadow-md border border-slate-200 divide-y divide-slate-200"
    >
      {sections.map((sec, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center px-6 py-4 text-left text-slate-800 font-medium hover:bg-slate-50 transition-all"
          >
            <span>{sec.title}</span>
            <span className="text-indigo-500 font-bold">{openIndex === i ? "-" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-4 overflow-hidden text-slate-600"
              >
                <ul className="list-disc pl-5 space-y-1">
                  {sec.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

/* --- ShuffleGrid --- */
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const squareData = [
  { id: 1, src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1740&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?auto=format&fit=crop&w=687&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?auto=format&w=687&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?auto=format&w=687&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&w=1325&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&w=1740&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&w=1740&q=80" },
  { id: 8, src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?auto=format&w=1740&q=80" },
  { id: 9, src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&w=1740&q=80" },
  { id: 10, src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&w=687&q=80" },
  { id: 11, src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&w=684&q=80" },
  { id: 12, src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&w=882&q=80" },
  { id: 13, src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&w=870&q=80" },
  { id: 14, src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&w=686&q=80" },
  { id: 15, src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?auto=format&w=681&q=80" },
  { id: 16, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&w=1820&q=80" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-lg shadow-sm"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    timeoutRef.current = setTimeout(() => {
      setSquares(generateSquares());
      shuffleSquares();
    }, 4000);
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full h-full">
      {squares}
    </div>
  );
};

export default ShuffleHeroApp;
