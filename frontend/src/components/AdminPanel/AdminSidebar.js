<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/dashboard/institutes/pending', icon: '🏫', label: 'Manage Institutes' },
    { path: '/admin/dashboard/users', icon: '👥', label: 'Manage Users' },
    { path: '/admin/dashboard/analytics', icon: '📈', label: 'Analytics' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
          <button className="close-sidebar" onClick={onClose}>×</button>
        </div>
        
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/dashboard/institutes', label: 'Manage Institutes', icon: '🏫' },
    { path: '/admin/dashboard/users', label: 'Manage Users', icon: '👥' },
    { path: '/admin/dashboard/analytics', label: 'Analytics', icon: '📈' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="sidebar-mobile-toggle">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="menu-toggle-btn"
        >
          ☰
        </button>
      </div>

      <div className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-info">
            <div className="admin-avatar">
              ⚙️
            </div>
            <div className="admin-details">
              <h3>Admin Panel</h3>
              <p>Welcome, {user?.name}</p>
              <p className="admin-email">{user?.email}</p>
            </div>
          </div>
        </div>

<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
<<<<<<< HEAD
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
=======
<<<<<<< HEAD
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={onClose}
=======
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
<<<<<<< HEAD
=======
<<<<<<< HEAD
        
        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-btn">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    </>
  );
};

export default AdminSidebar;