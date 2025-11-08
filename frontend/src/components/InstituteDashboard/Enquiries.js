import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { enquiryAPI } from '../../services/api';

const Enquiries = ({ institute }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fixed: Added useCallback
  const fetchEnquiries = useCallback(async () => {
    try {
      const response = await enquiryAPI.getByInstitute(institute._id);
      setEnquiries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setLoading(false);
    }
  }, [institute._id]); // Added institute._id dependency

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]); // Added fetchEnquiries to dependencies

  const markAsResponded = async (enquiryId) => {
    try {
      await enquiryAPI.updateStatus(enquiryId, 'responded');
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending' },
      responded: { class: 'status-responded', text: 'Responded' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return <div className="loading">Loading enquiries...</div>;
  }

  return (
    <div className="enquiries-management">
      <div className="page-header">
        <h1>Student Enquiries</h1>
        <p>Manage and respond to student enquiries</p>
      </div>

      <div className="enquiries-stats">
        <div className="stat-card">
          <h3>{enquiries.length}</h3>
          <p>Total Enquiries</p>
        </div>
        <div className="stat-card">
          <h3>{enquiries.filter(e => e.status === 'pending').length}</h3>
          <p>Pending Responses</p>
        </div>
        <div className="stat-card">
          <h3>{enquiries.filter(e => e.status === 'responded').length}</h3>
          <p>Responded</p>
        </div>
      </div>

      <div className="enquiries-list">
        {enquiries.length === 0 ? (
          <div className="no-data">
            <h3>No enquiries yet</h3>
            <p>Student enquiries will appear here when they contact your institute</p>
          </div>
        ) : (
          enquiries.map(enquiry => (
            <div key={enquiry._id} className="enquiry-card">
              <div className="enquiry-header">
                <div className="enquiry-info">
                  <h3>{enquiry.name}</h3>
                  <p className="enquiry-meta">
                    📧 {enquiry.email} | 📞 {enquiry.phone}
                  </p>
                  <p className="enquiry-date">
                    📅 {new Date(enquiry.createdAt).toLocaleDateString()} at{' '}
                    {new Date(enquiry.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="enquiry-status">
                  {getStatusBadge(enquiry.status)}
                  {enquiry.status === 'pending' && (
                    <button 
                      onClick={() => markAsResponded(enquiry._id)}
                      className="btn-primary btn-sm"
                    >
                      Mark Responded
                    </button>
                  )}
                </div>
              </div>
              
              <div className="enquiry-message">
                <p>{enquiry.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Enquiries;