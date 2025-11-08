import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    instituteData: {
      name: '',
      category: '',
      affiliation: '',
      address: '',
      city: '',
      state: '',
      website: '',
      description: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    if (formData.role === 'institute') {
      if (!formData.instituteData.name.trim()) newErrors.instituteName = 'Institute name is required';
      if (!formData.instituteData.category) newErrors.category = 'Category is required';
      if (!formData.instituteData.affiliation.trim()) newErrors.affiliation = 'Affiliation is required';
      if (!formData.instituteData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.instituteData.city.trim()) newErrors.city = 'City is required';
      if (!formData.instituteData.state.trim()) newErrors.state = 'State is required';
      if (!formData.instituteData.description.trim()) newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('institute.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        instituteData: {
          ...prev.instituteData,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const result = await register(formData);
      if (result.success) {
        navigate(formData.role === 'admin' ? '/admin' : `/${formData.role}`);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label>Register As *</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Student/Parent</option>
              <option value="institute">Institute</option>
            </select>
          </div>

          {formData.role === 'institute' && (
            <div className="institute-fields">
              <h3>Institute Information</h3>
              
              <div className="form-group">
                <label>Institute Name *</label>
                <input
                  type="text"
                  name="institute.name"
                  value={formData.instituteData.name}
                  onChange={handleChange}
                  className={errors.instituteName ? 'error' : ''}
                />
                {errors.instituteName && <span className="error-text">{errors.instituteName}</span>}
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="institute.category"
                  value={formData.instituteData.category}
                  onChange={handleChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Select Category</option>
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="Coaching Center">Coaching Center</option>
                  <option value="Preschool">Preschool</option>
                  <option value="University">University</option>
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Affiliation *</label>
                <input
                  type="text"
                  name="institute.affiliation"
                  value={formData.instituteData.affiliation}
                  onChange={handleChange}
                  className={errors.affiliation ? 'error' : ''}
                />
                {errors.affiliation && <span className="error-text">{errors.affiliation}</span>}
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="institute.address"
                  value={formData.instituteData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="institute.city"
                    value={formData.instituteData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="institute.state"
                    value={formData.instituteData.state}
                    onChange={handleChange}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="institute.website"
                  value={formData.instituteData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="institute.description"
                  value={formData.instituteData.description}
                  onChange={handleChange}
                  rows="4"
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>
            </div>
          )}

          {errors.submit && <div className="error-text submit-error">{errors.submit}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;