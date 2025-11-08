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
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  return (
    <div className="reviews-management">
      <div className="page-header">
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
        )}
      </div>
    </div>
  );
};

export default Reviews;