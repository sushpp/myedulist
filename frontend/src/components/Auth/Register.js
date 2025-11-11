import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
<<<<<<< HEAD
=======
<<<<<<< HEAD
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    instituteName: '',
    category: 'school',
    affiliation: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.role === 'institute') {
      if (!formData.instituteName.trim()) {
        newErrors.instituteName = 'Institute name is required';
      }
      if (!formData.affiliation.trim()) {
        newErrors.affiliation = 'Affiliation is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
<<<<<<< HEAD
=======
<<<<<<< HEAD
    
    setLoading(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      };
      
      if (formData.role === 'institute') {
        userData.instituteData = {
          name: formData.instituteName,
          category: formData.category,
          affiliation: formData.affiliation,
          address: formData.address,
          contact: formData.contact,
          description: formData.description
        };
      }
      
      await register(userData);
      navigate('/');
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Registration failed' });
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc

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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <h2>Create Your Account</h2>
        
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
<<<<<<< HEAD
=======
<<<<<<< HEAD
              placeholder="Enter your full name"
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label>Email *</label>
            <input
              type="email"
=======
<<<<<<< HEAD
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
=======
            <label>Email *</label>
            <input
              type="email"
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
<<<<<<< HEAD
=======
<<<<<<< HEAD
              placeholder="Enter your email"
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label>Phone *</label>
            <input
              type="tel"
=======
<<<<<<< HEAD
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
=======
            <label>Phone *</label>
            <input
              type="tel"
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
<<<<<<< HEAD
=======
<<<<<<< HEAD
              placeholder="Enter your phone number"
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <label htmlFor="role">Account Type *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Student/Parent</option>
              <option value="institute">Educational Institute</option>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            </select>
          </div>

          {formData.role === 'institute' && (
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <>
              <div className="form-group">
                <label htmlFor="instituteName">Institute Name *</label>
                <input
                  type="text"
                  id="instituteName"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  className={errors.instituteName ? 'error' : ''}
                  placeholder="Enter institute name"
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                />
                {errors.instituteName && <span className="error-text">{errors.instituteName}</span>}
              </div>

              <div className="form-group">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <label htmlFor="category">Category *</label>
                // In the Register component, ensure category values are lowercase
<select
  id="category"
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="school">School</option>
  <option value="college">College</option>
  <option value="university">University</option>
  <option value="coaching">Coaching Center</option>
  <option value="preschool">Preschool</option>
</select>
              </div>

              <div className="form-group">
                <label htmlFor="affiliation">Affiliation/Board *</label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  className={errors.affiliation ? 'error' : ''}
                  placeholder="e.g., CBSE, ICSE, State Board"
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                />
                {errors.affiliation && <span className="error-text">{errors.affiliation}</span>}
              </div>

              <div className="form-group">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <label htmlFor="description">Institute Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'error' : ''}
                  placeholder="Describe your institute"
                  rows="3"
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                <label>Address *</label>
                <input
                  type="text"
                  name="institute.address"
                  value={formData.instituteData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              </div>

              <div className="form-row">
                <div className="form-group">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <label htmlFor="address.city">City *</label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address.state">State *</label>
                  <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                </div>
              </div>

              <div className="form-group">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <label htmlFor="contact.website">Website</label>
                <input
                  type="url"
                  id="contact.website"
                  name="contact.website"
                  value={formData.contact.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      </div>
    </div>
  );
};

export default Register;