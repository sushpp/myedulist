import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Loading from './components/Common/Loading';
import Notification from './components/Common/Notification';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/UserPanel/UserDashboard';
import InstituteDashboard from './components/InstituteDashboard/InstituteDashboard';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import InstituteList from './components/UserPanel/InstituteList';
import InstituteDetail from './components/UserPanel/InstituteDetail';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

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

export default App;