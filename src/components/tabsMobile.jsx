// src/TabMenu.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';

const TabMobile = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", icon: "a", label: "Home" },
    { id: "search", icon: "a", label: "Search" },
    { id: "notifications", icon: "a", label: "Notifications" },
    { id: "settings", icon: "a", label: "Settings" },
    { id: "profile", icon: "a", label: "Profile" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-800 py-2">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
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
        className={`p-3 rounded-full ${isActive ? "bg-yellow-500" : "bg-gray-700"}`}
        style={{ scale: isActive ? 1.2 : 1 }}
      >
        {tab.icon}
      </motion.div>
      <span className={`mt-1 text-xs ${isActive ? "font-bold" : ""}`}>
        {tab.label}
      </span>
    </motion.div>
  );
};

export default TabMobile;
