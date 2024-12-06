// src/components/Notification.jsx
import React from 'react';
import { useDrawerContext } from '../contexts/DrawerContext';

const Notification = () => {
    const { notification } = useDrawerContext();
  
    console.log("Notification state:", notification);
  
    if (!notification.title) return null;
  
    return (
      <div className="notification">
        <div className="icon">{notification.icon}</div>
        <div className="message">
          <h4>{notification.title}</h4>
          <p>{notification.message}</p>
        </div>
      </div>
    );
  };
  

export default Notification;
