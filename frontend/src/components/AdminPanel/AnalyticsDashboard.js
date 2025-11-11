import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { adminService } from '../../services/admin';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const data = await adminService.getDashboardAnalytics();
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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

<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-dashboard">
      <div className="page-header">
<<<<<<< HEAD
        <h1>Platform Analytics</h1>
        <p>Comprehensive overview of platform performance and activities</p>
=======
<<<<<<< HEAD
        <h2>Platform Analytics</h2>
        <div className="time-filter">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
=======
        <h1>Platform Analytics</h1>
        <p>Comprehensive overview of platform performance and activities</p>
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{analytics.totalUsers}</h3>
            <p>Total Users</p>
            <small>+12% from last month</small>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🏫</div>
          <div className="metric-content">
            <h3>{analytics.totalInstitutes}</h3>
            <p>Approved Institutes</p>
            <small>+8% from last month</small>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏳</div>
          <div className="metric-content">
            <h3>{analytics.pendingInstitutes}</h3>
            <p>Pending Approvals</p>
            <small>Waiting for review</small>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h3>{analytics.totalReviews}</h3>
            <p>Total Reviews</p>
            <small>+25% from last month</small>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📧</div>
          <div className="metric-content">
            <h3>{analytics.totalEnquiries}</h3>
            <p>Total Enquiries</p>
            <small>+15% from last month</small>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📚</div>
          <div className="metric-content">
            <h3>{analytics.totalCourses}</h3>
            <p>Total Courses</p>
            <small>Active courses listed</small>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>User Registration Trend</h3>
          <div className="chart-placeholder">
            <p>📈 Chart visualization would be implemented with a charting library</p>
            <div className="mock-chart">
              <div className="chart-bar" style={{ height: '80%' }}></div>
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '90%' }}></div>
              <div className="chart-bar" style={{ height: '70%' }}></div>
              <div className="chart-bar" style={{ height: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Institute Categories</h3>
          <div className="chart-placeholder">
            <p>📊 Category distribution chart</p>
            <div className="mock-pie-chart">
              <div className="pie-segment" style={{ backgroundColor: '#3498db' }}></div>
              <div className="pie-segment" style={{ backgroundColor: '#e74c3c' }}></div>
              <div className="pie-segment" style={{ backgroundColor: '#2ecc71' }}></div>
              <div className="pie-segment" style={{ backgroundColor: '#f39c12' }}></div>
            </div>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
      {/* Recent Activity */}
      <div className="activity-section">
        <h3>Recent Platform Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🎓</div>
            <div className="activity-content">
              <p><strong>5 new institutes</strong> registered in the last 24 hours</p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">⭐</div>
            <div className="activity-content">
              <p><strong>12 new reviews</strong> submitted by users</p>
              <small>4 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📧</div>
            <div className="activity-content">
              <p><strong>8 new enquiries</strong> sent to institutes</p>
              <small>6 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👥</div>
            <div className="activity-content">
              <p><strong>23 new users</strong> joined the platform</p>
              <small>1 day ago</small>
            </div>
          </div>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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

        
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;