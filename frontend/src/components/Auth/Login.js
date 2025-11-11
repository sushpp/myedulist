<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> c15d45fca (Initial commit)
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
<<<<<<< HEAD
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
=======
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing errors when component mounts
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
>>>>>>> c15d45fca (Initial commit)
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
<<<<<<< HEAD
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
=======
    }

>>>>>>> c15d45fca (Initial commit)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
=======
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear general error
    if (error) {
      clearError();
    }
  };

>>>>>>> c15d45fca (Initial commit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
<<<<<<< HEAD
    
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Login failed' });
=======

    setLoading(true);
    setErrors({});

    try {
      const result = await login(formData.email, formData.password, formData.role);
      if (result.success) {
        navigate(formData.role === 'admin' ? '/admin' : `/${formData.role}`);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
>>>>>>> c15d45fca (Initial commit)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
<<<<<<< HEAD
        <h2>Login to Your Account</h2>
        
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
=======
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
>>>>>>> c15d45fca (Initial commit)
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
=======
            <label>Password *</label>
            <input
              type="password"
>>>>>>> c15d45fca (Initial commit)
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

<<<<<<< HEAD
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
=======
          <div className="form-group">
            <label>Login As *</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Student/Parent</option>
              <option value="institute">Institute</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Display general error from context */}
          {error && <div className="error-text submit-error">{error}</div>}

          {/* Display submit error */}
          {errors.submit && <div className="error-text submit-error">{errors.submit}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>

          {/* Demo credentials info */}
          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Admin:</strong> admin@edulist.com / admin123</p>
            <p><strong>Note:</strong> Institute accounts require admin approval after registration</p>
          </div>
        </form>
>>>>>>> c15d45fca (Initial commit)
      </div>
    </div>
  );
};

export default Login;