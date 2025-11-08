import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import './Common.css';

const Notification = () => {
  const { notification, showNotification } = useApp();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        showNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, showNotification]);

  if (!notification) return null;

  const handleClose = () => {
    showNotification(null);
  };

  return (
    <div className={`notification ${notification.type}`}>
      <div className="notification-content">
        <span className="notification-message">{notification.message}</span>
        <button onClick={handleClose} className="notification-close">
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;