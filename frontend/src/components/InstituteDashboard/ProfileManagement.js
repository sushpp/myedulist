import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { instituteService } from '../../services/institute';
import { uploadService } from '../../services/upload';
import './InstituteDashboard.css';

const ProfileManagement = () => {
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchInstituteProfile();
  }, []);

  const fetchInstituteProfile = async () => {
    try {
      const data = await instituteService.getInstituteProfile();
      setInstitute(data);
      setFormData(data);
    } catch (error) {
      console.error('Error fetching institute profile:', error);
      setMessage('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = async (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size should be less than 5MB');
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      return;
    }

    setUploading(true);
    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
      const uploadResponse = await uploadService.uploadImage(file);
      
      if (imageType === 'logo') {
        setFormData(prev => ({
          ...prev,
          logo: {
            url: uploadResponse.imageUrl,
            filename: uploadResponse.filename
          }
        }));
      } else if (imageType === 'institute') {
        // For institute images, add to images array
        const newImage = {
          url: uploadResponse.imageUrl,
          filename: uploadResponse.filename,
          isPrimary: formData.images?.length === 0 // Set as primary if first image
        };
        
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), newImage]
        }));
      }
      
      setMessage('Image uploaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    } finally {
      setUploading(false);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const removeImage = (index, imageType) => {
    if (imageType === 'logo') {
      setFormData(prev => ({
        ...prev,
        logo: null
      }));
    } else if (imageType === 'institute') {
      setFormData(prev => ({
        ...prev,
        images: prev.images?.filter((_, i) => i !== index)
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  const removeImage = (index, type) => {
    if (type === 'logo') {
      setFormData(prev => ({ ...prev, logo: '' }));
    } else if (type === 'banner') {
      setFormData(prev => ({ ...prev, banner: '' }));
    } else if (type === 'gallery') {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      }));
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const setPrimaryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await instituteService.updateInstitute(formData);
      setInstitute(formData);
      setEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  if (loading && !institute) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-management">
      <div className="page-header">
        <h2>Institute Profile</h2>
        <button 
          onClick={() => setEditing(!editing)}
          className="btn btn-primary"
        >
          {editing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {institute && (
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Logo Upload Section */}
          <div className="form-section">
            <h3>Institute Logo</h3>
            <div className="image-upload-section">
              <div className="current-images">
                {formData.logo?.url ? (
                  <div className="image-preview">
                    <img 
                      src={`http://localhost:5000${formData.logo.url}`} 
                      alt="Institute Logo" 
                      className="logo-preview"
                    />
                    {editing && (
                      <button 
                        type="button"
                        onClick={() => removeImage(0, 'logo')}
                        className="remove-image-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="no-image">No logo uploaded</div>
                )}
              </div>
              
              {editing && (
                <div className="upload-controls">
                  <label className="upload-btn">
                    {uploading ? 'Uploading...' : 'Upload Logo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      disabled={uploading}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <small>Recommended: 200x200px, PNG or JPG</small>
                </div>
              )}
            </div>
          </div>

          {/* Institute Images Section */}
          <div className="form-section">
            <h3>Institute Images</h3>
            <div className="image-upload-section">
              <div className="current-images">
                {formData.images?.length > 0 ? (
                  <div className="images-grid">
                    {formData.images.map((image, index) => (
                      <div key={index} className={`image-preview ${image.isPrimary ? 'primary' : ''}`}>
                        <img 
                          src={`http://localhost:5000${image.url}`} 
                          alt={`Institute ${index + 1}`}
                        />
                        {image.isPrimary && <span className="primary-badge">Primary</span>}
                        {editing && (
                          <div className="image-actions">
                            <button 
                              type="button"
                              onClick={() => setPrimaryImage(index)}
                              disabled={image.isPrimary}
                            >
                              Set Primary
                            </button>
                            <button 
                              type="button"
                              onClick={() => removeImage(index, 'institute')}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-image">No images uploaded</div>
                )}
              </div>
              
              {editing && (
                <div className="upload-controls">
                  <label className="upload-btn">
                    {uploading ? 'Uploading...' : 'Add Images'}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e, 'institute')}
                      disabled={uploading}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <small>Upload multiple images to showcase your institute</small>
                </div>
              )}
            </div>
          </div>

          {/* Rest of the form remains the same */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Institute Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  disabled={!editing}
                >
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                  <option value="coaching">Coaching Center</option>
                  <option value="preschool">Preschool</option>
                </select>
              </div>

              <div className="form-group">
                <label>Affiliation</label>
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          {/* Contact and Address sections remain the same */}
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact?.email || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={formData.contact?.phone || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="contact.website"
                  value={formData.contact?.website || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Address</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address?.street || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address?.city || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address?.state || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="address.pincode"
                  value={formData.address?.pincode || ''}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Description</h3>
            <div className="form-group">
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                disabled={!editing}
                rows="4"
                placeholder="Describe your institute..."
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
              />
            </div>
          </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
          {editing && (
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          )}
        </form>
      )}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    </div>
  );
};

export default ProfileManagement;