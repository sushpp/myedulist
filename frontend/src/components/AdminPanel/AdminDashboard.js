import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { adminService } from '../../services/admin';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [recentActivities, setRecentActivities] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await adminService.getDashboardAnalytics();
      setAnalytics(data.analytics);
      setRecentActivities(data.recentActivities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="admin-dashboard">
            <div className="dashboard-header">
              <h1>Admin Dashboard</h1>
              <p>Welcome to EduList Administration Panel</p>
            </div>

            {/* Analytics Cards */}
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="card-icon users">👥</div>
                <div className="card-content">
                  <h3>{analytics.totalUsers || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-icon institutes">🏫</div>
                <div className="card-content">
                  <h3>{analytics.totalInstitutes || 0}</h3>
                  <p>Approved Institutes</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-icon pending">⏳</div>
                <div className="card-content">
                  <h3>{analytics.pendingInstitutes || 0}</h3>
                  <p>Pending Institutes</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-icon reviews">⭐</div>
                <div className="card-content">
                  <h3>{analytics.totalReviews || 0}</h3>
                  <p>Total Reviews</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-icon enquiries">📧</div>
                <div className="card-content">
                  <h3>{analytics.totalEnquiries || 0}</h3>
                  <p>Total Enquiries</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-icon courses">📚</div>
                <div className="card-content">
                  <h3>{analytics.totalCourses || 0}</h3>
                  <p>Total Courses</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <Link to="/admin/dashboard/institutes/pending" className="action-btn">
                  <span>📋</span>
                  <span>Manage Institutes</span>
                  <small>{analytics.pendingInstitutes || 0} pending</small>
                </Link>
                
                <Link to="/admin/dashboard/users" className="action-btn">
                  <span>👥</span>
                  <span>Manage Users</span>
                  <small>{analytics.totalUsers || 0} total</small>
                </Link>
                
                <Link to="/admin/dashboard/analytics" className="action-btn">
                  <span>📊</span>
                  <span>View Analytics</span>
                  <small>Platform insights</small>
                </Link>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="recent-activities">
              <div className="activity-section">
                <h3>New Users</h3>
                <div className="activity-list">
                  {recentActivities.newUsers?.length > 0 ? (
                    recentActivities.newUsers.map(user => (
                      <div key={user._id} className="activity-item">
                        <div className="activity-avatar">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="activity-details">
                          <p><strong>{user.name}</strong> registered</p>
                          <small>{new Date(user.createdAt).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-activity">
                      <p>No new users</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="activity-section">
                <h3>Pending Institutes</h3>
                <div className="activity-list">
                  {recentActivities.pendingInstitutes?.length > 0 ? (
                    recentActivities.pendingInstitutes.map(institute => (
                      <div key={institute._id} className="activity-item">
                        <div className="activity-avatar">
                          {institute.name?.charAt(0).toUpperCase() || 'I'}
                        </div>
                        <div className="activity-details">
                          <p><strong>{institute.name}</strong> waiting approval</p>
                          <small>{institute.category} • {institute.affiliation}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-activity">
                      <p>No pending institutes</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="activity-section">
                <h3>Recent Reviews</h3>
                <div className="activity-list">
                  {recentActivities.recentReviews?.length > 0 ? (
                    recentActivities.recentReviews.map(review => (
                      <div key={review._id} className="activity-item">
                        <div className="activity-avatar">
                          {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="activity-details">
                          <p>
                            <strong>{review.user?.name}</strong> reviewed 
                            <strong> {review.institute?.name}</strong>
                          </p>
                          <div className="rating">
                            {'⭐'.repeat(review.rating)}
                          </div>
                          <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-activity">
                      <p>No recent reviews</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import ManageInstitutes from './ManageInstitutes';
import ManageUsers from './ManageUsers';
import AnalyticsDashboard from './AnalyticsDashboard';
import { instituteAPI, userAPI, reviewAPI, enquiryAPI } from '../../services/api';
import './AdminPanel.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalInstitutes: 0,
    totalUsers: 0,
    totalReviews: 0,
    pendingInstitutes: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [institutesRes, usersRes, reviewsRes] = await Promise.all([
        instituteAPI.getAll(),
        userAPI.getAll(),
        reviewAPI.getAll()
      ]);

      const pendingInstitutes = await instituteAPI.getPending();

      setStats({
        totalInstitutes: institutesRes.data.length,
        totalUsers: usersRes.data.length,
        totalReviews: reviewsRes.data.length,
        pendingInstitutes: pendingInstitutes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome stats={stats} />} />
          <Route path="/institutes" element={<ManageInstitutes />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = ({ stats }) => {
  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage platform activities and users</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏫</div>
          <div className="stat-info">
            <h3>{stats.totalInstitutes}</h3>
            <p>Total Institutes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{stats.totalReviews}</h3>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingInstitutes}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          <div className="activity-item">
            <div className="activity-icon">🏫</div>
            <div className="activity-content">
              <p>New institute registration pending approval</p>
              <span>Just now</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">⭐</div>
            <div className="activity-content">
              <p>New review submitted for ABC College</p>
              <span>5 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👥</div>
            <div className="activity-content">
              <p>New user registered on the platform</p>
              <span>10 minutes ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div 
            className="action-card"
            onClick={() => window.location.href = '/admin/dashboard/institutes'}
          >
            <span className="action-icon">🏫</span>
            <span className="action-text">Manage Institutes</span>
            {stats.pendingInstitutes > 0 && (
              <span className="action-badge">{stats.pendingInstitutes}</span>
            )}
          </div>

          <div 
            className="action-card"
            onClick={() => window.location.href = '/admin/dashboard/users'}
          >
            <span className="action-icon">👥</span>
            <span className="action-text">Manage Users</span>
          </div>

          <div 
            className="action-card"
            onClick={() => window.location.href = '/admin/dashboard/analytics'}
          >
            <span className="action-icon">📊</span>
            <span className="action-text">View Analytics</span>
          </div>

<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;