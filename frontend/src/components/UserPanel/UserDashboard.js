import React, { useState, useEffect } from 'react';
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-dashboard">
        <UserSidebar />
        <div className="dashboard-content">
          <div className="loading">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
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
          </div>
        </div>
      </div>

      

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;