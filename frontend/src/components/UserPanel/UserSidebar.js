import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/user/dashboard/institutes', label: 'Browse Institutes', icon: '🏫' },
    { path: '/user/dashboard/reviews', label: 'Write Review', icon: '⭐' },
    { path: '/user/dashboard/enquiries', label: 'Send Enquiry', icon: '📧' }
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

      <div className={`user-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="user-details">
              <h3>{user?.name || 'User'}</h3>
              <p>Student/Parent</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

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
    </>
  );
};

export default UserSidebar;