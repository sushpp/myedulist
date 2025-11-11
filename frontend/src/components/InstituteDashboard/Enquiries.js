<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { enquiryService } from '../../services/enquiry';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await enquiryService.getInstituteEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enquiryId, status) => {
    try {
      await enquiryService.updateEnquiryStatus(enquiryId, status);
      fetchEnquiries(); // Refresh list
    } catch (error) {
      console.error('Error updating enquiry status:', error);
    }
  };

  const handleRespond = async (enquiryId) => {
    if (!responseText.trim()) return;

    try {
      await enquiryService.respondToEnquiry(enquiryId, responseText);
      setSelectedEnquiry(null);
      setResponseText('');
      fetchEnquiries(); // Refresh list
      alert('Response sent successfully!');
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Error sending response');
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
<<<<<<< HEAD
=======
<<<<<<< HEAD
      new: { class: 'new', label: 'New' },
      contacted: { class: 'contacted', label: 'Contacted' },
      resolved: { class: 'resolved', label: 'Resolved' }
    };
    
    const config = statusConfig[status] || statusConfig.new;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      pending: { class: 'status-pending', text: 'Pending' },
      responded: { class: 'status-responded', text: 'Responded' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  };

  if (loading) {
    return <div className="loading">Loading enquiries...</div>;
  }

  return (
    <div className="enquiries-management">
      <div className="page-header">
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <h2>Student Enquiries</h2>
        <p>Manage and respond to student and parent enquiries</p>
      </div>

      {/* Enquiries List */}
      <div className="enquiries-list">
        {enquiries.length === 0 ? (
          <div className="empty-state">
            <p>No enquiries received yet</p>
          </div>
        ) : (
          <div className="enquiries-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(enquiry => (
                  <tr key={enquiry._id}>
                    <td>
                      <div className="user-info">
                        <strong>{enquiry.name}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div>{enquiry.email}</div>
                        <div>{enquiry.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="message-preview">
                        {enquiry.message.substring(0, 50)}...
                      </div>
                    </td>
                    <td>
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {getStatusBadge(enquiry.status)}
                    </td>
                    <td>
                      <div className="enquiry-actions">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="btn btn-sm btn-primary"
                        >
                          View & Respond
                        </button>
                        {enquiry.status === 'new' && (
                          <button
                            onClick={() => handleStatusUpdate(enquiry._id, 'contacted')}
                            className="btn btn-sm btn-outline"
                          >
                            Mark Contacted
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Response Modal */}
      {selectedEnquiry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Respond to Enquiry</h3>
              <button 
                onClick={() => {
                  setSelectedEnquiry(null);
                  setResponseText('');
                }}
                className="close-button"
              >
                ×
              </button>
            </div>

            <div className="enquiry-details">
              <div className="detail-section">
                <h4>Enquiry Details</h4>
                <p><strong>From:</strong> {selectedEnquiry.name}</p>
                <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                <p><strong>Message:</strong> {selectedEnquiry.message}</p>
                <p><strong>Received:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
              </div>

              {selectedEnquiry.response && (
                <div className="detail-section">
                  <h4>Previous Response</h4>
                  <p>{selectedEnquiry.response}</p>
                </div>
              )}

              <div className="response-section">
                <h4>Your Response</h4>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
                  rows="6"
                />
              </div>

              <div className="form-actions">
                <button
                  onClick={() => {
                    setSelectedEnquiry(null);
                    setResponseText('');
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRespond(selectedEnquiry._id)}
                  className="btn btn-primary"
                  disabled={!responseText.trim()}
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    </div>
  );
};

export default Enquiries;