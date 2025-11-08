import React from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🎓</span>
            EduList
          </div>
          <p>Find the best educational institutions with authentic reviews and ratings.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/institutes">Institutes</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <Link to="/institutes?category=School">Schools</Link>
          <Link to="/institutes?category=College">Colleges</Link>
          <Link to="/institutes?category=University">Universities</Link>
          <Link to="/institutes?category=Coaching Center">Coaching Centers</Link>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 info@edulist.com</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>📍 123 Education Street, Learning City</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 EduList. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;