import React, { useState, useEffect } from 'react';
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

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;