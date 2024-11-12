// src/TabMenu.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundGradient from './BackgroundGradient';
const TabMobile = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "servicios", icon: <i class='bx bx-cloud-drizzle'></i>, label: "Servicios" },
    { id: "joyitas", icon: <i class='bx bxl-sketch'></i>, label: "Joyitas" },
    { id: "contacto", icon: <i class='bx bxs-message'></i>, label: "Contacto" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 shadow-2xl">
          <BackgroundGradient>

      <div className='flex justify-around  backdrop-blur-xl bg-white/10 border-white/20 p-3'>
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
      </div>
      </BackgroundGradient>
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
        className={`px-3 pt-3 pb-1 z-10 text-3xl rounded-full ${isActive ? "bg-green-400/70 border-2 border-white/20 border-double shadow-lg shadow-green-600" : "bg-blue-400/70 border-2 border-white/20 border-double shadow-lg shadow-blue-500"}`}
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
