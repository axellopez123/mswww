// src/components/PricingPlans.jsx
import { motion } from "framer-motion";

const plans = [
  {
    name: "Boost",
    price: "$79/mes",
    description: "Potencia tu evento con control y herramientas avanzadas.",
    details: [
      "Todo en Start",
      "Panel en vivo de pagos e inscripciones",
      "App web con branding",
      "Cronometraje manual",
      "Podios y rankings automáticos",
      "Certificados digitales",
      "Acreditación por QR",
      "Soporte prioritario",
    ],
    note: "Para 5-50 usuarios",
    blurred: true,
  },
  {
    name: "Inicial",
    description: "Ideal para eventos. Empieza sin complicaciones.",
    details: [
      "Eventos ilimitados",
      "Inscripciones online",
      "Pagos",
      "Gestión de participantes",
      "Gestión de usuarios",
      "Notificaciones",
      "Reportes",
      "E-tickets con QR",
      "Página web",
      "Soporte",
    ],
    note: "1 Administrador",
    featured: true,
    infra: [
      "Infraestructura en la nube",
      "Base de datos escalable y segura",
      "Servidores optimizados para alto rendimiento",
      "Certificado SSL y encriptación de datos",
      "Respaldos",
    ],
  },
  {
    name: "Xperience",
    price: "Contáctanos",
    description: "La experiencia completa para eventos grandes y memorables.",
    details: [
      "Todo en Boost",
      "Resultados en tiempo real",
      "Pantallas de meta en vivo",
      "Tracking por dorsal",
      "Portal del atleta",
      "Galería y Video Finish",
      "Transmisión en vivo",
      "Dominio y diseño premium",
      "Soporte VIP en evento",
    ],
    note: "Para más de 50 usuarios",
    blurred: true,
  },
];

export default function PricingPlans() {
  return (
    <div className="bg-black text-white py-20">
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold ">Paquete inicial</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`
              border rounded-xl p-8 shadow-lg transition-all duration-300 
              ${plan.featured
                ? "bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-400 scale-105"
                : "bg-gradient-to-br from-white/5 to-white/10 border-white/10"
              }
              ${plan.blurred ? "blur-md opacity-40 pointer-events-none select-none" : ""}
            `}
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-2">{plan.price}</p>
            <p className="text-sm text-gray-400 mb-4">{plan.note}</p>
            <p className="text-gray-300 mb-6">{plan.description}</p>

            <ul className="space-y-2 text-sm mb-6">
              {plan.details.map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-400 mr-2">✔</span> {item}
                </li>
              ))}
            </ul>

            {plan.infra && (
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-lg font-semibold mb-2">Infraestructura incluida</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {plan.infra.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-blue-400 mr-2">☁</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
