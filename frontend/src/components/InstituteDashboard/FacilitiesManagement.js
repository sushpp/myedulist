import React, { useState, useEffect } from 'react';
import { facilitiesAPI } from '../../services/api';
import { useApp } from '../../context/AppContext';

const FacilitiesManagement = ({ institute }) => {
  const [facilities, setFacilities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🏢'
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useApp();

  useEffect(() => {
    fetchFacilities();
  }, [institute]);

  const fetchFacilities = async () => {
    try {
      const response = await facilitiesAPI.getByInstitute(institute._id);
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      showNotification('Error loading facilities', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingFacility) {
        await facilitiesAPI.update(editingFacility._id, formData);
        showNotification('Facility updated successfully!', 'success');
      } else {
        await facilitiesAPI.create({
          ...formData,
          institute: institute._id
        });
        showNotification('Facility created successfully!', 'success');
      }
      
      setShowForm(false);
      setEditingFacility(null);
      setFormData({
        name: '',
        description: '',
        icon: '🏢'
      });
      fetchFacilities();
    } catch (error) {
      console.error('Error saving facility:', error);
      showNotification('Error saving facility', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (facility) => {
    setEditingFacility(facility);
    setFormData({
      name: facility.name,
      description: facility.description,
      icon: facility.icon
    });
    setShowForm(true);
  };

  const handleDelete = async (facilityId) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await facilitiesAPI.delete(facilityId);
        showNotification('Facility deleted successfully!', 'success');
        fetchFacilities();
      } catch (error) {
        console.error('Error deleting facility:', error);
        showNotification('Error deleting facility', 'error');
      }
    }
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingFacility(null);
    setFormData({
      name: '',
      description: '',
      icon: '🏢'
    });
  };

  const commonFacilities = [
    { name: 'Library', icon: '📚', description: 'Well-stocked library with books and digital resources' },
    { name: 'Sports Complex', icon: '⚽', description: 'Indoor and outdoor sports facilities' },
    { name: 'Laboratory', icon: '🔬', description: 'Modern laboratories for practical learning' },
    { name: 'Hostel', icon: '🏠', description: 'Comfortable hostel accommodation for students' },
    { name: 'Cafeteria', icon: '🍽️', description: 'Hygienic and nutritious food services' },
    { name: 'Transport', icon: '🚌', description: 'Safe and reliable transportation services' },
    { name: 'WiFi', icon: '📶', description: 'High-speed internet connectivity across campus' },
    { name: 'Medical', icon: '🏥', description: 'Medical room with first-aid facilities' }
  ];

  const addCommonFacility = (facility) => {
    setFormData(facility);
    setShowForm(true);
  };

  return (
    <div className="facilities-management">
      <div className="page-header">
        <h1>Facilities Management</h1>
        <p>Manage your institute's facilities and amenities</p>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Facility
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <h3>{editingFacility ? 'Edit Facility' : 'Add New Facility'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Facility Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Icon</label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                  >
                    <option value="🏢">🏢 Building</option>
                    <option value="📚">📚 Library</option>
                    <option value="⚽">⚽ Sports</option>
                    <option value="🔬">🔬 Lab</option>
                    <option value="🏠">🏠 Hostel</option>
                    <option value="🍽️">🍽️ Cafeteria</option>
                    <option value="🚌">🚌 Transport</option>
                    <option value="📶">📶 WiFi</option>
                    <option value="🏥">🏥 Medical</option>
                    <option value="💻">💻 Computer Lab</option>
                    <option value="🎭">🎭 Auditorium</option>
                    <option value="🏊">🏊 Swimming Pool</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Saving...' : (editingFacility ? 'Update Facility' : 'Add Facility')}
                </button>
                <button type="button" onClick={cancelEdit} className="btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="common-facilities">
        <h3>Common Facilities</h3>
        <p>Quick add commonly used facilities</p>
        <div className="common-facilities-grid">
          {commonFacilities.map((facility, index) => (
            <div 
              key={index}
              className="common-facility-card"
              onClick={() => addCommonFacility(facility)}
            >
              <span className="facility-icon">{facility.icon}</span>
              <span className="facility-name">{facility.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="facilities-grid">
        <h3>Your Facilities</h3>
        {facilities.length === 0 ? (
          <div className="no-data">
            <h3>No facilities added yet</h3>
            <p>Add facilities to showcase your institute's amenities</p>
          </div>
        ) : (
          <div className="facilities-list">
            {facilities.map(facility => (
              <div key={facility._id} className="facility-card">
                <div className="facility-header">
                  <span className="facility-icon">{facility.icon}</span>
                  <h4>{facility.name}</h4>
                </div>
                <p className="facility-description">{facility.description}</p>
                <div className="facility-actions">
                  <button 
                    onClick={() => handleEdit(facility)}
                    className="btn-outline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(facility._id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesManagement;