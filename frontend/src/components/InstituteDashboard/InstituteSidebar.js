import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const InstituteSidebar = ({ institute }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/institute/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/institute/dashboard/profile', label: 'Profile', icon: '🏫' },
    { path: '/institute/dashboard/courses', label: 'Courses', icon: '📚' },
    { path: '/institute/dashboard/facilities', label: 'Facilities', icon: '⚙️' },
    { path: '/institute/dashboard/enquiries', label: 'Enquiries', icon: '📧' },
    { path: '/institute/dashboard/reviews', label: 'Reviews', icon: '⭐' }
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

      <div className={`institute-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="institute-info">
            <div className="institute-avatar">
              {institute?.name?.charAt(0) || 'I'}
            </div>
            <div className="institute-details">
              <h3>{institute?.name || 'Institute'}</h3>
              <p>{institute?.category || 'Education'}</p>
              <p className={`status ${institute?.status || 'pending'}`}>
                {institute?.status || 'Pending'}
              </p>
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

export default InstituteSidebar;