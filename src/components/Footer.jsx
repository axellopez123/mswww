import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-300 mt-4">
      <div className="flex flex-col md:flex-row">
        {/* REDES SOCIALES */}
        <div className="flex-1 flex flex-col px-4 justify-center pt-2">
          <div className="flex space-x-4">
            <button className="px-2 bg-green-500 hover:bg-green-400 text-sm text-white font-semibold flex items-center rounded-xl">
              <i className="bx bxl-whatsapp text-lg"></i>
              <span className="ml-2">WhatsApp</span>
            </button>
            <button className="px-2 bg-slate-950 hover:bg-slate-800 text-sm text-white font-semibold flex items-center rounded-xl">
              <i className="bx bxl-tiktok text-lg"></i>
              <span className="ml-2">Tiktok</span>
            </button>
            <button className="px-2 bg-blue-500 hover:bg-blue-400 text-sm text-white font-semibold flex items-center rounded-xl">
              <i className="bx bxl-linkedin-square text-lg"></i>
              <span className="ml-2">LinkedIn</span>
            </button>
          </div>
        </div>

        {/* CONTACTO */}
        <div className="flex-1 flex flex-col justify-center items-end py-0 md:py-4 pr-24">
          <p>master@arwax.pro</p>
        </div>
      </div>
      <div className="flex-1 bg-gray-400">
        <p className="text-center">
          © 2024 ARWAX. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
