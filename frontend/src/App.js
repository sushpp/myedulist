import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
<<<<<<< HEAD
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
=======
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Loading from './components/Common/Loading';
import Notification from './components/Common/Notification';
>>>>>>> c15d45fca (Initial commit)
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/UserPanel/UserDashboard';
import InstituteDashboard from './components/InstituteDashboard/InstituteDashboard';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import InstituteList from './components/UserPanel/InstituteList';
import InstituteDetail from './components/UserPanel/InstituteDetail';
<<<<<<< HEAD
import ManageInstitutes from './components/AdminPanel/ManageInstitutes';
import ManageUsers from './components/AdminPanel/ManageUsers';
import AnalyticsDashboard from './components/AdminPanel/AnalyticsDashboard';
import './App.css';
import ErrorBoundary from './components/Common/ErrorBoundary';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
=======
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }
>>>>>>> c15d45fca (Initial commit)
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

<<<<<<< HEAD
const AdminPanelWrapper = () => {
  return (
    <div className="admin-panel">
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="institutes/pending" element={<ManageInstitutes />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </div>
  );
};

const InstituteDashboardWrapper = () => {
  return (
    <div className="institute-dashboard-wrapper">
      <InstituteDashboard />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/institutes" element={<InstituteList />} />
                <Route path="/institute/:id" element={<InstituteDetail />} />
                
                {/* User Routes */}
                <Route path="/user/dashboard" element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Institute Routes */}
                <Route path="/institute/dashboard/*" element={
                  <ProtectedRoute allowedRoles={['institute']}>
                    <InstituteDashboardWrapper />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard/*" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPanelWrapper />
                  </ProtectedRoute>
                } />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}


=======
function AppContent() {
  const { loading } = useApp();

  return (
    <div className="App">
      {loading && <Loading message="Processing..." />}
      <Notification />
      
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/institutes" element={<InstituteList />} />
            <Route path="/institutes/:id" element={<InstituteDetail />} />
            
            {/* User Dashboard Routes */}
            <Route path="/user/dashboard/*" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Institute Dashboard Routes */}
            <Route path="/institute/dashboard/*" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <InstituteDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Redirect old routes to new ones */}
            <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
            <Route path="/institute" element={<Navigate to="/institute/dashboard" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppProvider>
  );
}
>>>>>>> c15d45fca (Initial commit)

export default App;