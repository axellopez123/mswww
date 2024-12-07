// src/TabMenu.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundGradient from './BackgroundGradient';
const TabMobile = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "servicios", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7 m-1 text-amber-400 hover:text-amber-500">
      <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
    </svg>
    , label: "Servicios" },
    { id: "joyitas", icon: <i class='bx bxl-sketch text-3xl mx-1 text-cyan-400 hover:text-cyan-500'></i>, label: "Joyitas" },
    { id: "contacto", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7 m-1 text-gray-100 hover:text-gray-300">
      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
    </svg>
    
    , label: "Contacto" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 shadow-2xl">
          <div>

      <div className='flex justify-around  backdrop-blur-xl bg-white/10 border-white/20'>
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
      </div>
      </div>
    </div>
  );
};

const TabItem = ({ tab, isActive, onClick }) => {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer text-white"
      onClick={onClick}
      animate={{
        y: isActive ? -10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className={`z-10 text-xl rounded-full ${isActive ? "bg-green-600/70 border-2 border-white/20 border-double shadow-lg shadow-green-600" : "bg-green-500/80 border-2 border-white/20 border-double shadow-lg shadow-green-500"}`}
        style={{ scale: isActive ? 1.2 : 1 }}
      >
        {tab.icon}
      </motion.div>
      <span className={`antialiased mt-3 text-sm z-40 font-bold ${isActive ? "font-extrabold" : ""}`}>
        {tab.label}
      </span>
    </motion.div>
  );
};

export default TabMobile;
