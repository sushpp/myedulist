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

export default AdminSidebar;