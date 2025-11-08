import React, { useState, useEffect } from 'react';
import { instituteAPI } from '../../services/api';

const ManageInstitutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [pendingInstitutes, setPendingInstitutes] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutes();
    fetchPendingInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const response = await instituteAPI.getAll();
      setInstitutes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching institutes:', error);
      setLoading(false);
    }
  };

  const fetchPendingInstitutes = async () => {
    try {
      const response = await instituteAPI.getPending();
      setPendingInstitutes(response.data);
    } catch (error) {
      console.error('Error fetching pending institutes:', error);
    }
  };

  const handleStatusUpdate = async (instituteId, status) => {
    try {
      await instituteAPI.updateStatus(instituteId, status);
      // Refresh both lists
      fetchPendingInstitutes();
      fetchInstitutes();
      alert(`Institute ${status} successfully!`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating institute status. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending' },
      approved: { class: 'status-approved', text: 'Approved' },
      rejected: { class: 'status-rejected', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return <div className="loading">Loading institutes...</div>;
  }

  return (
    <div className="manage-institutes">
      <div className="page-header">
        <h1>Manage Institutes</h1>
        <p>Approve, reject, and manage educational institutes</p>
        
        <div className="tab-navigation">
          <button 
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            Pending Approval ({pendingInstitutes.length})
          </button>
          <button 
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Institutes ({institutes.length})
          </button>
        </div>
      </div>

      {activeTab === 'pending' && (
        <div className="institutes-list">
          <h2>Pending Institute Approvals</h2>
          {pendingInstitutes.length === 0 ? (
            <div className="no-data">
              <h3>No pending institutes for approval</h3>
              <p>All institute registrations have been processed</p>
            </div>
          ) : (
            pendingInstitutes.map(institute => (
              <div key={institute._id} className="institute-card pending">
                <div className="institute-info">
                  <div className="institute-avatar">
                    {institute.name?.charAt(0) || 'I'}
                  </div>
                  <div className="institute-details">
                    <h3>{institute.name}</h3>
                    <div className="institute-meta">
                      <p><strong>Category:</strong> {institute.category}</p>
                      <p><strong>Affiliation:</strong> {institute.affiliation}</p>
                      <p><strong>Address:</strong> {institute.address}, {institute.city}, {institute.state}</p>
                      <p><strong>Contact:</strong> {institute.phone} | {institute.email}</p>
                      <p><strong>Description:</strong> {institute.description}</p>
                      <p><strong>Registered:</strong> {new Date(institute.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="institute-actions">
                  <div className="action-buttons">
                    <button 
                      className="btn-success"
                      onClick={() => handleStatusUpdate(institute._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleStatusUpdate(institute._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'all' && (
        <div className="institutes-list">
          <h2>All Institutes</h2>
          {institutes.map(institute => (
            <div key={institute._id} className="institute-card">
              <div className="institute-info">
                <div className="institute-avatar">
                  {institute.name?.charAt(0) || 'I'}
                </div>
                <div className="institute-details">
                  <h3>{institute.name}</h3>
                  <div className="institute-meta">
                    <p><strong>Status:</strong> {getStatusBadge(institute.status)}</p>
                    <p><strong>Category:</strong> {institute.category}</p>
                    <p><strong>City:</strong> {institute.city}</p>
                    <p><strong>Contact:</strong> {institute.phone}</p>
                    <p><strong>Email:</strong> {institute.email}</p>
                  </div>
                </div>
              </div>
              <div className="institute-actions">
                <div className="action-buttons">
                  {institute.status === 'approved' ? (
                    <button 
                      className="btn-danger"
                      onClick={() => handleStatusUpdate(institute._id, 'rejected')}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button 
                      className="btn-success"
                      onClick={() => handleStatusUpdate(institute._id, 'approved')}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageInstitutes;