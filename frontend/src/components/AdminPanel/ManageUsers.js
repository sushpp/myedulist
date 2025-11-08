import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, isActive) => {
    try {
      await userAPI.updateStatus(userId, isActive);
      fetchUsers(); // Refresh the list
      alert(`User ${isActive ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error updating user status. Please try again.');
    }
  };

  const filteredUsers = users.filter(user => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return user.isActive;
    if (activeTab === 'inactive') return !user.isActive;
    if (activeTab === 'institutes') return user.role === 'institute';
    if (activeTab === 'students') return user.role === 'user';
    return true;
  });

  const getStatusBadge = (user) => {
    if (!user.isActive) {
      return <span className="status-badge status-inactive">Inactive</span>;
    }
    return <span className="status-badge status-active">Active</span>;
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      user: { class: 'role-user', text: 'Student/Parent' },
      institute: { class: 'role-institute', text: 'Institute' },
      admin: { class: 'role-admin', text: 'Admin' }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    return <span className={`role-badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="manage-users">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage all users and institutes on the platform</p>
        
        <div className="tab-navigation">
          <button 
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Users ({users.length})
          </button>
          <button 
            className={activeTab === 'active' ? 'active' : ''}
            onClick={() => setActiveTab('active')}
          >
            Active ({users.filter(u => u.isActive).length})
          </button>
          <button 
            className={activeTab === 'inactive' ? 'active' : ''}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive ({users.filter(u => !u.isActive).length})
          </button>
          <button 
            className={activeTab === 'institutes' ? 'active' : ''}
            onClick={() => setActiveTab('institutes')}
          >
            Institutes ({users.filter(u => u.role === 'institute').length})
          </button>
          <button 
            className={activeTab === 'students' ? 'active' : ''}
            onClick={() => setActiveTab('students')}
          >
            Students ({users.filter(u => u.role === 'user').length})
          </button>
        </div>
      </div>

      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <div className="no-data">
            <h3>No users found</h3>
            <p>There are no users matching your current filter</p>
          </div>
        ) : (
          filteredUsers.map(user => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <div className="user-avatar">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="user-details">
                  <h3>{user.name}</h3>
                  <div className="user-meta">
                    <p>📧 {user.email}</p>
                    <p>📞 {user.phone}</p>
                    <p>👤 {getRoleBadge(user.role)}</p>
                    <p>📅 Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="user-actions">
                <div className="user-status">
                  {getStatusBadge(user)}
                </div>
                
                <div className="action-buttons">
                  {user.isActive ? (
                    <button 
                      onClick={() => handleStatusUpdate(user._id, false)}
                      className="btn-danger"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStatusUpdate(user._id, true)}
                      className="btn-success"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;