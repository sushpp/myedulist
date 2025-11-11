<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ReviewForm = ({ institute, onSubmit, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewAPI, instituteAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ReviewForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [institutes, setInstitutes] = useState([]);
  const [formData, setFormData] = useState({
    institute: '',
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    rating: 5,
    reviewText: ''
  });
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
<<<<<<< HEAD

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    setLoading(true);
<<<<<<< HEAD
=======
<<<<<<< HEAD
    try {
      await onSubmit(formData);
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc

    try {
      await reviewAPI.create({
        ...formData,
        user: user.id
      });
      setSubmitted(true);
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
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
          <h3>Write a Review for {institute.name}</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Rating</label>
            <div className="rating-input">
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  if (submitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✅</div>
        <h2>Review Submitted Successfully!</h2>
        <p>Thank you for sharing your experience.</p>
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="review-form-page">
      <div className="page-header">
        <h1>Write a Review</h1>
        <p>Share your experience to help other students and parents</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label className="form-label">Select Institute *</label>
            <select
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Choose an institute...</option>
              {institutes.map(institute => (
                <option key={institute._id} value={institute._id}>
                  {institute.name} - {institute.city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Your Rating *</label>
            <div className="rating-input-large">
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
<<<<<<< HEAD
                  className={`star-btn-large ${star <= formData.rating ? 'active' : ''}`}
                  onClick={() => handleRatingChange(star)}
=======
<<<<<<< HEAD
                  className={`star ${star <= formData.rating ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
=======
                  className={`star-btn-large ${star <= formData.rating ? 'active' : ''}`}
                  onClick={() => handleRatingChange(star)}
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                >
                  ⭐
                </button>
              ))}
            </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
          </div>

          <div className="form-group">
            <label htmlFor="reviewText">Your Review</label>
            <textarea
              id="reviewText"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              placeholder="Share your experience with this institute..."
              rows="5"
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <div className="rating-text">
              {formData.rating === 5 && 'Excellent ⭐⭐⭐⭐⭐'}
              {formData.rating === 4 && 'Very Good ⭐⭐⭐⭐'}
              {formData.rating === 3 && 'Good ⭐⭐⭐'}
              {formData.rating === 2 && 'Fair ⭐⭐'}
              {formData.rating === 1 && 'Poor ⭐'}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Review *</label>
            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              rows="6"
              className="form-control"
              placeholder="Share your detailed experience with this institute..."
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
              {loading ? 'Submitting...' : 'Submit Review'}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <button type="submit" disabled={loading} className="btn-primary btn-lg">
              {loading ? 'Submitting Review...' : 'Submit Review'}
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

export default ReviewForm;