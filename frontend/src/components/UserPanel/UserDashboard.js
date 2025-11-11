import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/review';
import { enquiryService } from '../../services/enquiry';

const UserDashboard = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [userEnquiries, setUserEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user's reviews and enquiries
      const [reviews, enquiries] = await Promise.all([
        reviewService.getUserReviews(),
        enquiryService.getUserEnquiries()
      ]);
      
      setUserReviews(reviews);
      setUserEnquiries(enquiries);
    } catch (error) {
      console.error('Error fetching user data:', error);
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import { Routes, Route, Navigate } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import InstituteList from './InstituteList';
import ReviewForm from './ReviewForm';
import EnquiryForm from './EnquiryForm';
import { useAuth } from '../../context/AuthContext';
import { reviewAPI, enquiryAPI } from '../../services/api';
import './UserPanel.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    reviewsGiven: 0,
    enquiriesSent: 0,
    institutesViewed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      // Use user-specific endpoints instead of admin endpoints
      const [myReviewsRes, myEnquiriesRes] = await Promise.all([
        reviewAPI.getMyReviews().catch(() => ({ data: [] })), // Fallback if API not ready
        enquiryAPI.getMyEnquiries().catch(() => ({ data: [] })) // Fallback if API not ready
      ]);

      const userReviews = myReviewsRes.data || [];
      const userEnquiries = myEnquiriesRes.data || [];

      setUserStats({
        reviewsGiven: userReviews.length,
        enquiriesSent: userEnquiries.length,
        institutesViewed: new Set([
          ...userReviews.map(r => r.institute?._id),
          ...userEnquiries.map(e => e.institute?._id)
        ].filter(Boolean)).size
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Set default stats if API fails
      setUserStats({
        reviewsGiven: 0,
        enquiriesSent: 0,
        institutesViewed: 0
      });
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    return <div className="loading">Loading your dashboard...</div>;
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    return (
      <div className="user-dashboard">
        <UserSidebar />
        <div className="dashboard-content">
          <div className="loading">Loading your dashboard...</div>
        </div>
      </div>
    );
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  }

  return (
    <div className="user-dashboard">
<<<<<<< HEAD
=======
<<<<<<< HEAD
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's your activity and saved information</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{userReviews.length}</h3>
            <p>Reviews Written</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>{userEnquiries.length}</h3>
            <p>Enquiries Sent</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>0</h3>
            <p>Saved Institutes</p>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      <UserSidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome userStats={userStats} user={user} />} />
          <Route path="/institutes" element={<InstituteList />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/enquiries" element={<EnquiryForm />} />
          <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = ({ userStats, user }) => {
  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Find the perfect educational institution for your needs</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏫</div>
          <div className="stat-info">
            <h3>{userStats.institutesViewed}</h3>
            <p>Institutes Viewed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{userStats.reviewsGiven}</h3>
            <p>Reviews Given</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>{userStats.enquiriesSent}</h3>
            <p>Enquiries Sent</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <h3>Active</h3>
            <p>Account Status</p>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
      <div className="dashboard-content">
        {/* Recent Reviews */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Your Recent Reviews</h2>
            <Link to="/institutes" className="btn btn-outline">
              Write New Review
            </Link>
          </div>
          
          {userReviews.length === 0 ? (
            <div className="empty-state">
              <p>You haven't written any reviews yet.</p>
              <Link to="/institutes" className="btn btn-primary">
                Browse Institutes
              </Link>
            </div>
          ) : (
            <div className="reviews-list">
              {userReviews.slice(0, 5).map(review => (
                <div key={review._id} className="review-item">
                  <div className="review-header">
                    <h4>{review.institute?.name}</h4>
                    <div className="rating">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <p className="review-text">{review.reviewText}</p>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Enquiries */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Your Recent Enquiries</h2>
            <Link to="/institutes" className="btn btn-outline">
              Send New Enquiry
            </Link>
          </div>
          
          {userEnquiries.length === 0 ? (
            <div className="empty-state">
              <p>You haven't sent any enquiries yet.</p>
              <Link to="/institutes" className="btn btn-primary">
                Contact Institutes
              </Link>
            </div>
          ) : (
            <div className="enquiries-list">
              {userEnquiries.slice(0, 5).map(enquiry => (
                <div key={enquiry._id} className="enquiry-item">
                  <div className="enquiry-header">
                    <h4>{enquiry.institute?.name}</h4>
                    <span className={`status-badge ${enquiry.status}`}>
                      {enquiry.status}
                    </span>
                  </div>
                  <p className="enquiry-message">{enquiry.message}</p>
                  {enquiry.response && (
                    <div className="enquiry-response">
                      <strong>Response: </strong>
                      {enquiry.response}
                    </div>
                  )}
                  <span className="enquiry-date">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/institutes" className="action-btn">
              <span>🔍</span>
              <span>Browse Institutes</span>
            </Link>
            <Link to="/institutes?category=school" className="action-btn">
              <span>🏫</span>
              <span>Find Schools</span>
            </Link>
            <Link to="/institutes?category=college" className="action-btn">
              <span>🎓</span>
              <span>Find Colleges</span>
            </Link>
            <Link to="/institutes?category=coaching" className="action-btn">
              <span>📚</span>
              <span>Find Coaching</span>
            </Link>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      

      <div className="recent-activity">
        <h2>Getting Started</h2>
        <div className="activity-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Browse Institutes</h4>
              <p>Search and filter through our extensive database of educational institutions</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Read Reviews</h4>
              <p>Check authentic reviews from other students and parents</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Send Enquiries</h4>
              <p>Contact institutes directly with your questions and requirements</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Share Experience</h4>
              <p>Help others by sharing your own reviews and experiences</p>
            </div>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;