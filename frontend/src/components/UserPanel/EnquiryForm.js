<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const EnquiryForm = ({ institute, onSubmit, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enquiryAPI, instituteAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const EnquiryForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [institutes, setInstitutes] = useState([]);
  const [formData, setFormData] = useState({
    institute: '',
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
<<<<<<< HEAD

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const response = await instituteAPI.getAll();
      setInstitutes(response.data);
    } catch (error) {
      console.error('Error fetching institutes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to send an enquiry');
      return;
    }

    setLoading(true);

    try {
      await enquiryAPI.create({
        ...formData,
        user: user.id
      });
      setSubmitted(true);
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Enquire about {institute.name}</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  if (submitted) {
    return (
      <div className="success-message">
        <div className="success-icon">📧</div>
        <h2>Enquiry Sent Successfully!</h2>
        <p>Your enquiry has been sent to the institute.</p>
        <p>They will contact you soon.</p>
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="enquiry-form-page">
      <div className="page-header">
        <h1>Send Enquiry</h1>
        <p>Get more information from educational institutes</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="form-group">
            <label className="form-label">Select Institute *</label>
            <select
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Choose an institute to contact...</option>
              {institutes.map(institute => (
                <option key={institute._id} value={institute._id}>
                  {institute.name} - {institute.city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="+91 9876543210"
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              required
            />
          </div>

          <div className="form-group">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What would you like to know about this institute?"
              rows="4"
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <label className="form-label">Your Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="form-control"
              placeholder="Please tell us about your requirements and questions..."
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              required
            />
          </div>

          <div className="form-actions">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Enquiry'}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <button type="submit" disabled={loading} className="btn-primary btn-lg">
              {loading ? 'Sending Enquiry...' : 'Send Enquiry'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/user/dashboard')}
              className="btn-outline"
            >
              Cancel
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;