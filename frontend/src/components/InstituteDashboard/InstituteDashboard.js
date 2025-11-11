import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
=======
<<<<<<< HEAD
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
=======
import { Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import InstituteSidebar from './InstituteSidebar';
import ProfileManagement from './ProfileManagement';
import CourseManagement from './CourseManagement';
import FacilitiesManagement from './FacilitiesManagement';
import Enquiries from './Enquiries';
import Reviews from './Reviews';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import './InstituteDashboard.css';

const InstituteDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect to profile if on base dashboard path
    if (location.pathname === '/institute/dashboard') {
      navigate('/institute/dashboard/profile');
    }
  }, [location, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <InstituteSidebar 
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
          <h1>Institute Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <Routes>
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="facilities" element={<FacilitiesManagement />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import { useAuth } from '../../context/AuthContext';
import { instituteAPI, enquiryAPI, reviewAPI, courseAPI } from '../../services/api';
import './InstituteDashboard.css';

const InstituteDashboard = () => {
  const { user } = useAuth();
  const [institute, setInstitute] = useState(null);
  const [stats, setStats] = useState({
    enquiries: 0,
    reviews: 0,
    courses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstituteData();
  }, [user]);

  const fetchInstituteData = async () => {
    try {
      // Get all institutes and find the one belonging to the current user
      const response = await instituteAPI.getAll();
      const userInstitute = response.data.find(inst => inst.user?._id === user.id);
      
      if (userInstitute) {
        setInstitute(userInstitute);
        
        // Fetch stats
        const [enquiriesRes, reviewsRes, coursesRes] = await Promise.all([
          enquiryAPI.getByInstitute(userInstitute._id),
          reviewAPI.getByInstitute(userInstitute._id),
          courseAPI.getByInstitute(userInstitute._id)
        ]);

        setStats({
          enquiries: enquiriesRes.data.length,
          reviews: reviewsRes.data.length,
          courses: coursesRes.data.length
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching institute data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your institute dashboard...</div>;
  }

  if (!institute) {
    return (
      <div className="no-institute">
        <h2>No Institute Found</h2>
        <p>We couldn't find an institute associated with your account.</p>
        <p>Please contact support if you believe this is an error.</p>
      </div>
    );
  }

  return (
    <div className="institute-dashboard">
      <InstituteSidebar institute={institute} />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome stats={stats} institute={institute} />} />
          <Route path="/profile" element={<ProfileManagement institute={institute} onUpdate={fetchInstituteData} />} />
          <Route path="/courses" element={<CourseManagement institute={institute} />} />
          <Route path="/facilities" element={<FacilitiesManagement institute={institute} />} />
          <Route path="/enquiries" element={<Enquiries institute={institute} />} />
          <Route path="/reviews" element={<Reviews institute={institute} />} />
          <Route path="*" element={<Navigate to="/institute/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = ({ stats, institute }) => {
  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Welcome, {institute.name}</h1>
        <p>Manage your institute profile and activities</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>{stats.enquiries}</h3>
            <p>New Enquiries</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{stats.reviews}</h3>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.courses}</h3>
            <p>Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Active</h3>
            <p>Status: {institute.status}</p>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {stats.enquiries > 0 && (
            <div className="activity-item">
              <div className="activity-icon">📧</div>
              <div className="activity-content">
                <p>You have {stats.enquiries} new enquiry{stats.enquiries !== 1 ? 's' : ''}</p>
                <span>Check the enquiries section to respond</span>
              </div>
            </div>
          )}
          
          {stats.reviews > 0 && (
            <div className="activity-item">
              <div className="activity-icon">⭐</div>
              <div className="activity-content">
                <p>You have received {stats.reviews} review{stats.reviews !== 1 ? 's' : ''}</p>
                <span>Check what students are saying</span>
              </div>
            </div>
          )}

          <div className="activity-item">
            <div className="activity-icon">🏫</div>
            <div className="activity-content">
              <p>Your institute profile is {institute.status === 'approved' ? 'approved' : 'pending approval'}</p>
              <span>{institute.status === 'approved' ? 'You can now manage your profile' : 'Waiting for admin approval'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card" onClick={() => window.location.href = '/institute/dashboard/profile'}>
            <span className="action-icon">✏️</span>
            <span className="action-text">Update Profile</span>
            <p>Keep your institute information up to date</p>
          </div>

          <div className="action-card" onClick={() => window.location.href = '/institute/dashboard/courses'}>
            <span className="action-icon">📚</span>
            <span className="action-text">Manage Courses</span>
            <p>Add or update your course offerings</p>
          </div>

          <div className="action-card" onClick={() => window.location.href = '/institute/dashboard/facilities'}>
            <span className="action-icon">⚙️</span>
            <span className="action-text">Update Facilities</span>
            <p>Showcase your campus amenities</p>
          </div>

          <div className="action-card" onClick={() => window.location.href = '/institute/dashboard/enquiries'}>
            <span className="action-icon">📧</span>
            <span className="action-text">View Enquiries</span>
            <p>Respond to student questions</p>
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

export default InstituteDashboard;