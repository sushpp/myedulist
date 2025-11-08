import React, { useState, useEffect } from 'react';
import { instituteAPI, userAPI, reviewAPI, enquiryAPI } from '../../services/api';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInstitutes: 0,
    totalReviews: 0,
    totalEnquiries: 0,
    pendingInstitutes: 0,
    activeInstitutes: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [usersRes, institutesRes, reviewsRes, enquiriesRes, pendingRes] = await Promise.all([
        userAPI.getAll(),
        instituteAPI.getAll(),
        reviewAPI.getAll(),
        enquiryAPI.getAll(),
        instituteAPI.getPending()
      ]);

      const users = usersRes.data;
      const institutes = institutesRes.data;
      const reviews = reviewsRes.data;
      const enquiries = enquiriesRes.data;
      const pendingInstitutes = pendingRes.data;

      setStats({
        totalUsers: users.length,
        totalInstitutes: institutes.length,
        totalReviews: reviews.length,
        totalEnquiries: enquiries.length,
        pendingInstitutes: pendingInstitutes.length,
        activeInstitutes: institutes.filter(inst => inst.status === 'approved').length
      });

      // Generate recent activities
      const activities = [
        ...pendingInstitutes.slice(0, 3).map(inst => ({
          type: 'institute_registration',
          message: `New institute registration: ${inst.name}`,
          timestamp: inst.createdAt,
          icon: '🏫'
        })),
        ...reviews.slice(0, 3).map(review => ({
          type: 'review',
          message: `New review submitted by ${review.user?.name}`,
          timestamp: review.createdAt,
          icon: '⭐'
        })),
        ...enquiries.slice(0, 2).map(enquiry => ({
          type: 'enquiry',
          message: `New enquiry from ${enquiry.name}`,
          timestamp: enquiry.createdAt,
          icon: '📧'
        }))
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 8);

      setRecentActivities(activities);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const getCategoryStats = () => {
    // Mock category data - in real app, get from API
    return [
      { name: 'Schools', count: 45, color: '#007bff' },
      { name: 'Colleges', count: 32, color: '#28a745' },
      { name: 'Universities', count: 18, color: '#dc3545' },
      { name: 'Coaching Centers', count: 27, color: '#ffc107' },
      { name: 'Preschools', count: 15, color: '#6f42c1' }
    ];
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-dashboard">
      <div className="page-header">
        <h1>Platform Analytics</h1>
        <p>Comprehensive overview of platform performance and activities</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">👥</div>
          <div className="metric-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">🏫</div>
          <div className="metric-info">
            <h3>{stats.totalInstitutes}</h3>
            <p>Total Institutes</p>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon">⭐</div>
          <div className="metric-info">
            <h3>{stats.totalReviews}</h3>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">📧</div>
          <div className="metric-info">
            <h3>{stats.totalEnquiries}</h3>
            <p>Total Enquiries</p>
          </div>
        </div>

        <div className="metric-card danger">
          <div className="metric-icon">⏳</div>
          <div className="metric-info">
            <h3>{stats.pendingInstitutes}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>

        <div className="metric-card secondary">
          <div className="metric-icon">✅</div>
          <div className="metric-info">
            <h3>{stats.activeInstitutes}</h3>
            <p>Active Institutes</p>
          </div>
        </div>
      </div>

      <div className="analytics-content">
        <div className="chart-section">
          <h3>Institute Categories</h3>
          <div className="category-stats">
            {getCategoryStats().map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-progress"
                    style={{
                      width: `${(category.count / 100) * 100}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="activities-section">
          <h3>Recent Activities</h3>
          <div className="activities-list">
            {recentActivities.length === 0 ? (
              <p className="no-data">No recent activities</p>
            ) : (
              recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p>{activity.message}</p>
                    <span>
                      {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button 
            className="action-card"
            onClick={() => window.location.href = '/admin/dashboard/institutes'}
          >
            <span className="action-icon">🏫</span>
            <span className="action-text">Review Pending Institutes</span>
            <span className="action-badge">{stats.pendingInstitutes}</span>
          </button>

          <button 
            className="action-card"
            onClick={() => window.location.href = '/admin/dashboard/users'}
          >
            <span className="action-icon">👥</span>
            <span className="action-text">Manage Users</span>
          </button>

        
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;