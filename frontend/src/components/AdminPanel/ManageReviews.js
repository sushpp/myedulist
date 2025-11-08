import React, { useState, useEffect } from 'react';
import { reviewAPI } from '../../services/api';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getAll();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (reviewId, action) => {
    try {
      await reviewAPI.moderate(reviewId, action);
      fetchReviews();
      alert(`Review ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      alert('Error moderating review: ' + error.message);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        {index < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  return (
    <div className="manage-reviews">
      <div className="section-header">
        <h2>Moderate Reviews</h2>
        <p>Review and manage user-submitted reviews</p>
      </div>

      <div className="reviews-stats">
        <div className="stat-card">
          <h3>Total Reviews</h3>
          <div className="stat-number">{reviews.length}</div>
        </div>
        <div className="stat-card">
          <h3>Approved</h3>
          <div className="stat-number">
            {reviews.filter(r => r.isApproved).length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="stat-number">
            {reviews.filter(r => !r.isApproved).length}
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <h3>No Reviews Found</h3>
            <p>There are no reviews to moderate at this time.</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h4>{review.user.name}</h4>
                  <p>Reviewed: {review.institute.name}</p>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="review-meta">
                  <span className={`status ${review.isApproved ? 'approved' : 'pending'}`}>
                    {review.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  <span className="review-date">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>

              <div className="review-content">
                <p>{review.reviewText}</p>
              </div>

              {!review.isApproved && (
                <div className="moderation-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleModerate(review._id, 'approve')}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleModerate(review._id, 'reject')}
                  >
                    ✗ Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageReviews;