import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
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
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

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
      </div>
    </div>
  );
};

export default Login;