import React from 'react';
import './Common.css';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;