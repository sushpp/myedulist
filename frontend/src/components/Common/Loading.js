import React from 'react';
import './Common.css';

<<<<<<< HEAD
const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
=======
const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className={`loading-container ${size}`}>
>>>>>>> c15d45fca (Initial commit)
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;