<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { reviewService } from '../../services/review';
import { instituteService } from '../../services/institute';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstituteAndReviews();
  }, []);

  const fetchInstituteAndReviews = async () => {
    try {
      // Get institute profile first to get the institute ID
      const instituteData = await instituteService.getInstituteProfile();
      setInstitute(instituteData);
      
      // Then fetch reviews for this institute
      if (instituteData && instituteData._id) {
        const reviewsData = await reviewService.getInstituteReviews(instituteData._id);
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
=======
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { reviewAPI } from '../../services/api';

const Reviews = ({ institute }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fixed: Added useCallback
  const fetchReviews = useCallback(async () => {
    try {
      const response = await reviewAPI.getByInstitute(institute._id);
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  }, [institute._id]); // Added institute._id dependency

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]); // Added fetchReviews to dependencies

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
>>>>>>> c15d45fca (Initial commit)
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  return (
    <div className="reviews-management">
      <div className="page-header">
<<<<<<< HEAD
        <h2>Student Reviews</h2>
        <p>View and manage reviews from students and parents</p>
      </div>

      {/* Reviews Summary */}
      <div className="reviews-summary">
        <div className="summary-card">
          <h3>Average Rating</h3>
          <div className="rating-display">
            <span className="average-rating">
              {reviews.length > 0 
                ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                : '0.0'
              }
            </span>
            <div className="stars">
              {reviews.length > 0 
                ? getRatingStars(Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length))
                : '☆☆☆☆☆'
              }
            </div>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="summary-card">
          <h3>Rating Distribution</h3>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = reviews.filter(review => review.rating === stars).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={stars} className="rating-bar">
                  <span className="stars">{'⭐'.repeat(stars)}</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="count">({count})</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        <h3>All Reviews</h3>
        
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>No reviews received yet</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <strong>{review.user?.name || 'Anonymous'}</strong>
                      <div className="review-rating">
                        {getRatingStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="review-text">{review.reviewText}</p>
              </div>
            ))}
          </div>
=======
        <h1>Student Reviews</h1>
        <p>See what students are saying about your institute</p>
      </div>

      <div className="reviews-stats">
        <div className="stat-card">
          <h3>{reviews.length}</h3>
          <p>Total Reviews</p>
        </div>
        <div className="stat-card">
          <h3>
            {reviews.length > 0 
              ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
              : '0.0'
            }
          </h3>
          <p>Average Rating</p>
        </div>
        <div className="stat-card">
          <h3>{reviews.filter(r => r.rating >= 4).length}</h3>
          <p>Positive Reviews</p>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-data">
            <h3>No reviews yet</h3>
            <p>Student reviews will appear here when they review your institute</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h4>{review.user?.name || 'Anonymous'}</h4>
                  {renderStars(review.rating)}
                </div>
                <span className="review-date">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              
              <div className="review-content">
                <p>{review.reviewText}</p>
              </div>
            </div>
          ))
>>>>>>> c15d45fca (Initial commit)
        )}
      </div>
    </div>
  );
};

export default Reviews;