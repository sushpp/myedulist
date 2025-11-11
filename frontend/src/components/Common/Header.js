import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Common.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
<<<<<<< HEAD
    setIsMenuOpen(false);
=======
>>>>>>> c15d45fca (Initial commit)
  };

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'institute':
        return '/institute/dashboard';
      case 'user':
        return '/user/dashboard';
      default:
<<<<<<< HEAD
        return null;
=======
        return '/';
>>>>>>> c15d45fca (Initial commit)
    }
  };

  return (
    <header className="header">
<<<<<<< HEAD
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">EduList</span>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/institutes" onClick={() => setIsMenuOpen(false)}>
              Browse Institutes
            </Link>
            
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <div className="user-menu">
                  <span className="user-greeting">Hello, {user.name}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
=======
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎓</span>
          EduList
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/institutes" className="nav-link">Institutes</Link>
          
          {user ? (
            <>
              <Link to={getDashboardLink()} className="nav-link">Dashboard</Link>
              <div className="user-menu">
                <span className="user-name">Hello, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
>>>>>>> c15d45fca (Initial commit)
      </div>
    </header>
  );
};

export default Header;