import React, { useState, useEffect } from 'react';
import { instituteAPI, uploadAPI } from '../../services/api';
import { useApp } from '../../context/AppContext';
import './InstituteDashboard.css';

const ProfileManagement = ({ institute, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    affiliation: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    facilities: [],
    logo: '',
    banner: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const { showNotification } = useApp();

  useEffect(() => {
    if (institute) {
      setFormData({
        name: institute.name || '',
        category: institute.category || '',
        affiliation: institute.affiliation || '',
        address: institute.address || '',
        city: institute.city || '',
        state: institute.state || '',
        phone: institute.phone || '',
        email: institute.email || '',
        website: institute.website || '',
        description: institute.description || '',
        facilities: institute.facilities || [],
        logo: institute.logo || '',
        banner: institute.banner || '',
        images: institute.images || []
      });
    }
  }, [institute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacilityChange = (e) => {
    const facilities = e.target.value.split(',').map(f => f.trim()).filter(f => f);
    setFormData(prev => ({
      ...prev,
      facilities
    }));
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('Please select an image file', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image size should be less than 5MB', 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadAPI.uploadImage(formData);
      const imageUrl = response.data.url;

      if (type === 'logo') {
        setFormData(prev => ({ ...prev, logo: imageUrl }));
      } else if (type === 'banner') {
        setFormData(prev => ({ ...prev, banner: imageUrl }));
      } else if (type === 'gallery') {
        setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
      }

      showNotification('Image uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      showNotification('Error uploading image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index, type) => {
    if (type === 'logo') {
      setFormData(prev => ({ ...prev, logo: '' }));
    } else if (type === 'banner') {
      setFormData(prev => ({ ...prev, banner: '' }));
    } else if (type === 'gallery') {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await instituteAPI.update(institute._id, formData);
      setMessage('Profile updated successfully!');
      showNotification('Profile updated successfully!', 'success');
      if (onUpdate) {
        onUpdate(); // Refresh parent data
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
      showNotification('Error updating profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-management">
      <div className="page-header">
        <h1>Institute Profile Management</h1>
        <p>Update your institute information and details</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Image Upload Section */}
        <div className="form-section">
          <h3>Institute Images</h3>
          
          {/* Logo Upload */}
          <div className="image-upload-group">
            <label>Institute Logo</label>
            <div className="image-upload-container">
              {formData.logo ? (
                <div className="image-preview">
                  <img src={formData.logo} alt="Institute Logo" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(0, 'logo')}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-placeholder">
                  <span>📷</span>
                  <p>Upload Logo (Square, 200x200px recommended)</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'logo')}
                disabled={uploading}
                className="image-upload-input"
              />
            </div>
          </div>

          {/* Banner Upload */}
          <div className="image-upload-group">
            <label>Institute Banner</label>
            <div className="image-upload-container">
              {formData.banner ? (
                <div className="image-preview">
                  <img src={formData.banner} alt="Institute Banner" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(0, 'banner')}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-placeholder">
                  <span>🏞️</span>
                  <p>Upload Banner (1200x400px recommended)</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'banner')}
                disabled={uploading}
                className="image-upload-input"
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div className="image-upload-group">
            <label>Gallery Images</label>
            <div className="gallery-upload">
              <div className="gallery-images">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Gallery ${index + 1}`} />
                    <button 
                      type="button" 
                      onClick={() => removeImage(index, 'gallery')}
                      className="remove-image-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {formData.images.length < 6 && (
                  <div className="image-upload-placeholder small">
                    <span>➕</span>
                    <p>Add Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'gallery')}
                      disabled={uploading}
                      className="image-upload-input"
                    />
                  </div>
                )}
              </div>
              <small>You can upload up to 6 gallery images</small>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Institute Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="School">School</option>
                <option value="College">College</option>
                <option value="University">University</option>
                <option value="Coaching Center">Coaching Center</option>
                <option value="Preschool">Preschool</option>
              </select>
            </div>

            <div className="form-group">
              <label>Affiliation *</label>
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe your institute, its history, mission, vision, and unique features..."
              required
            />
          </div>

          <div className="form-group">
            <label>Facilities (comma separated)</label>
            <input
              type="text"
              value={formData.facilities.join(', ')}
              onChange={handleFacilityChange}
              placeholder="Library, Sports, Lab, Hostel, Cafeteria, etc."
            />
            <small>Separate multiple facilities with commas</small>
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading || uploading} className="btn-primary">
            {loading ? 'Updating...' : uploading ? 'Uploading...' : 'Update Profile'}
          </button>
          <button 
            type="button" 
            onClick={() => window.history.back()} 
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManagement;