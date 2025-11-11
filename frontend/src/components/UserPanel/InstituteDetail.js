import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { instituteService } from '../../services/institute';
import { reviewService } from '../../services/review';
import { enquiryService } from '../../services/enquiry';
import { courseService } from '../../services/course';
import ReviewForm from './ReviewForm';
import EnquiryForm from './EnquiryForm';
import Loading from '../Common/Loading';
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { instituteAPI, reviewAPI, courseAPI, facilitiesAPI, enquiryAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import './UserPanel.css';

const InstituteDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
<<<<<<< HEAD
=======
<<<<<<< HEAD
  const [institute, setInstitute] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchInstituteDetail();
  }, [id]);

  const fetchInstituteDetail = async () => {
    try {
      setError('');
      const institutes = await instituteService.getAllInstitutes();
      const foundInstitute = institutes.find(inst => inst._id === id);
      
      if (foundInstitute) {
        setInstitute(foundInstitute);
        
        // Try to fetch courses and reviews, but don't fail if they error
        try {
          const coursesData = await courseService.getInstituteCourses(id);
          setCourses(coursesData);
        } catch (courseError) {
          console.log('No courses found');
          setCourses([]);
        }
        
        try {
          const reviewsData = await reviewService.getInstituteReviews(id);
          setReviews(reviewsData);
        } catch (reviewError) {
          console.log('No reviews found');
          setReviews([]);
        }
      } else {
        setError('Institute not found');
      }
    } catch (error) {
      console.error('Error fetching institute details:', error);
      setError('Failed to load institute details');
    } finally {
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  const { showNotification } = useApp();
  const navigate = useNavigate();
  
  const [institute, setInstitute] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: ''
  });
  
  const [enquiryForm, setEnquiryForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Check if the ID is a valid MongoDB ObjectId (24 hex characters)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      setError('Invalid institute ID');
      setLoading(false);
      return;
    }

    fetchInstituteData();
  }, [id]);

  const fetchInstituteData = async () => {
    try {
      console.log('Fetching institute data for ID:', id);
      
      const [instituteRes, reviewsRes, coursesRes, facilitiesRes] = await Promise.all([
        instituteAPI.getById(id),
        reviewAPI.getByInstitute(id),
        courseAPI.getByInstitute(id),
        facilitiesAPI.getByInstitute(id)
      ]);

      console.log('Institute data:', instituteRes.data);
      console.log('Reviews data:', reviewsRes.data);
      console.log('Courses data:', coursesRes.data);
      console.log('Facilities data:', facilitiesRes.data);

      setInstitute(instituteRes.data);
      setReviews(reviewsRes.data);
      setCourses(coursesRes.data);
      setFacilities(facilitiesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching institute data:', error);
      setError('Failed to load institute details. Please try again later.');
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const handleReviewSubmit = async (reviewData) => {
    try {
      await reviewService.createReview({
        ...reviewData,
        institute: id
      });
      setShowReviewForm(false);
      fetchInstituteDetail();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
  };

  const handleEnquirySubmit = async (enquiryData) => {
    try {
      await enquiryService.createEnquiry({
        ...enquiryData,
        institute: id
      });
      setShowEnquiryForm(false);
      alert('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    }
  };

  const getAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Get primary image or first image
  const getPrimaryImage = () => {
    if (!institute) return null;
    
    // For mock data, we don't have actual images, so we'll use a placeholder
    return null;
  };

  // Get all images including primary
  const getAllImages = () => {
    if (!institute) return [];
    
    // For now, return empty array since we don't have actual image data
    // You can add mock images here for testing
    return [];
  };

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image || !image.url) return null;
    if (image.url.startsWith('http')) {
      return image.url;
    }
    return `http://localhost:5000${image.url}`;
  };

  if (loading) {
    return <Loading message="Loading institute details..." />;
  }

  if (error || !institute) {
    return (
      <div className="error-page">
        <h2>Institute Not Found</h2>
        <p>{error || 'The institute you are looking for does not exist.'}</p>
        <a href="/institutes" className="btn btn-primary">Browse Institutes</a>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      showNotification('Please login to submit a review', 'warning');
      navigate('/login');
      return;
    }

    if (user.role !== 'user') {
      showNotification('Only students/parents can submit reviews', 'warning');
      return;
    }

    setSubmitting(true);

    try {
      await reviewAPI.create({
        institute: id,
        ...reviewForm
      });
      
      setShowReviewForm(false);
      setReviewForm({ rating: 5, reviewText: '' });
      showNotification('Review submitted successfully!', 'success');
      
      // Refresh reviews
      const reviewsRes = await reviewAPI.getByInstitute(id);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error submitting review:', error);
      showNotification('Error submitting review. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await enquiryAPI.create({
        institute: id,
        ...enquiryForm
      });
      
      setShowEnquiryForm(false);
      setEnquiryForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        message: ''
      });
      showNotification('Enquiry submitted successfully! The institute will contact you soon.', 'success');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      showNotification('Error submitting enquiry. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      breakdown[review.rating]++;
    });
    return breakdown;
  };

  const getDefaultLogo = (name) => {
    return name?.charAt(0)?.toUpperCase() || 'I';
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading institute details...</p>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      </div>
    );
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const primaryImage = getPrimaryImage();
  const allImages = getAllImages();

  return (
    <div className="institute-detail">
      {/* Header Section with Images */}
      <div className="institute-header">
        <div className="header-background">
          {institute.images && institute.images.length > 0 ? (
            <img 
              src={getImageUrl(institute.images.find(img => img.isPrimary) || institute.images[0])}
              alt={institute.name}
              className="header-background-image"
            />
          ) : (
            <div className="header-background-placeholder">
              {institute.logo ? (
                <img 
                  src={getImageUrl(institute.logo)}
                  alt={`${institute.name} Logo`}
                  className="header-logo-large"
                />
              ) : (
                <span className="header-initial">
                  {institute.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          )}
          <div className="header-overlay"></div>
        </div>
        
        <div className="header-content">
          <div className="institute-basic">
            {institute.logo && (
              <img 
                src={getImageUrl(institute.logo)}
                alt={`${institute.name} Logo`}
                className="institute-header-logo"
              />
            )}
            <div className="institute-info">
              <h1>{institute.name}</h1>
              <div className="institute-meta">
                <span className="category">{institute.category}</span>
                <span className="affiliation">{institute.affiliation}</span>
                <div className="rating-section">
                  <span className="rating">⭐ {getAverageRating()}</span>
                  <span className="review-count">({reviews.length} reviews)</span>
                </div>
              </div>
              <p className="location">
                📍 {institute.address?.street}, {institute.address?.city}, {institute.address?.state} - {institute.address?.pincode}
              </p>
            </div>
          </div>

          <div className="header-actions">
            <button 
              onClick={() => setShowEnquiryForm(true)}
              className="btn btn-primary"
            >
              📧 Enquire Now
            </button>
            <button 
              onClick={() => setShowReviewForm(true)}
              className="btn btn-outline"
              disabled={!user}
            >
              ⭐ Write Review
            </button>
            {!user && (
              <small style={{color: '#e74c3c', display: 'block', marginTop: '5px'}}>
                Please login to write a review
              </small>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={() => window.history.back()} className="btn-primary">
            Go Back
          </button>
          <button onClick={fetchInstituteData} className="btn-outline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!institute) {
    return <Navigate to="/institutes" replace />;
  }

  const ratingBreakdown = getRatingBreakdown();
  const averageRating = calculateAverageRating();

  return (
    <div className="institute-detail">
      {/* Banner Section */}
      <div className="institute-banner">
        {institute.banner ? (
          <img 
            src={institute.banner} 
            alt={`${institute.name} banner`}
            className="banner-image"
          />
        ) : (
          <div className="banner-placeholder">
            <div className="banner-content">
              <h1>{institute.name}</h1>
              <p>{institute.affiliation}</p>
            </div>
          </div>
        )}
        
        {/* Logo Overlay */}
        <div className="logo-overlay">
          <div className="institute-logo">
            {institute.logo ? (
              <img 
                src={institute.logo} 
                alt={`${institute.name} logo`}
                className="logo-image"
              />
            ) : (
              <div className="logo-placeholder">
                {getDefaultLogo(institute.name)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="institute-header">
        <div className="institute-hero">
          <div className="hero-content">
            <div className="institute-badge">{institute.category}</div>
            <h1>{institute.name}</h1>
            <p className="affiliation">{institute.affiliation}</p>
            <p className="location">
              📍 {institute.address}, {institute.city}, {institute.state}
            </p>
            
            <div className="rating-section">
              <div className="average-rating">
                <div className="rating-main">
                  <span className="rating-number">{averageRating}</span>
                  <div className="rating-details">
                    {renderStars(averageRating)}
                    <span className="rating-count">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
                  </div>
                </div>
                
                {reviews.length > 0 && (
                  <div className="rating-breakdown">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <div key={stars} className="breakdown-row">
                        <span>{stars} ⭐</span>
                        <div className="breakdown-bar">
                          <div 
                            className="breakdown-fill"
                            style={{ 
                              width: `${(ratingBreakdown[stars] / reviews.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span>({ratingBreakdown[stars]})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button 
                onClick={() => setShowEnquiryForm(true)}
                className="btn-primary"
                disabled={institute.status !== 'approved'}
              >
                {institute.status === 'approved' ? 'Send Enquiry' : 'Institute Not Approved'}
              </button>
              
              {user && user.role === 'user' && (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="btn-outline"
                  disabled={institute.status !== 'approved'}
                >
                  {institute.status === 'approved' ? 'Write Review' : 'Cannot Review'}
                </button>
              )}
              
              {!user && (
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-outline"
                >
                  Login to Contact
                </button>
              )}
            </div>
          </div>
          
          <div className="hero-sidebar">
            <div className="contact-card">
              <h3>Contact Information</h3>
              <div className="contact-info">
                <p><span className="contact-icon">📞</span> {institute.phone}</p>
                <p><span className="contact-icon">📧</span> {institute.email}</p>
                {institute.website && (
                  <p>
                    <span className="contact-icon">🌐</span> 
                    <a href={institute.website} target="_blank" rel="noopener noreferrer">
                      {institute.website}
                    </a>
                  </p>
                )}
                <p><span className="contact-icon">🏢</span> {institute.category}</p>
                <p><span className="contact-icon">📋</span> Status: 
                  <span className={`status ${institute.status}`}>
                    {institute.status}
                  </span>
                </p>
              </div>
            </div>

            {institute.facilities && institute.facilities.length > 0 && (
              <div className="facilities-card">
                <h3>Key Facilities</h3>
                <div className="facilities-tags">
                  {institute.facilities.slice(0, 6).map((facility, index) => (
                    <span key={index} className="facility-tag">
                      {facility}
                    </span>
                  ))}
                  {institute.facilities.length > 6 && (
                    <span className="facility-tag more">
                      +{institute.facilities.length - 6} more
                    </span>
                  )}
                </div>
              </div>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="detail-tabs">
        <button 
<<<<<<< HEAD
          className={activeTab === 'overview' ? 'active' : ''}
=======
<<<<<<< HEAD
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
=======
          className={activeTab === 'overview' ? 'active' : ''}
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
<<<<<<< HEAD
          className={activeTab === 'courses' ? 'active' : ''}
=======
<<<<<<< HEAD
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
=======
          className={activeTab === 'courses' ? 'active' : ''}
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          onClick={() => setActiveTab('courses')}
        >
          Courses ({courses.length})
        </button>
        <button 
<<<<<<< HEAD
=======
<<<<<<< HEAD
          className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
          onClick={() => setActiveTab('facilities')}
        >
          Facilities ({institute.facilities?.length || 0})
        </button>
        <button 
          className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery ({allImages.length})
        </button>
        <button 
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          className={activeTab === 'facilities' ? 'active' : ''}
          onClick={() => setActiveTab('facilities')}
        >
          Facilities ({facilities.length})
        </button>
        <button 
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery ({institute.images ? institute.images.length : 0})
        </button>
        <button 
          className={activeTab === 'reviews' ? 'active' : ''}
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviews.length})
        </button>
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <button 
          className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="description-section">
              <h3>About {institute.name}</h3>
              <p>{institute.description}</p>
            </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
            <div className="quick-info">
              <div className="info-card">
                <h4>📞 Contact Info</h4>
                <p><strong>Email:</strong> {institute.contact?.email}</p>
                <p><strong>Phone:</strong> {institute.contact?.phone}</p>
                {institute.contact?.website && (
                  <p><strong>Website:</strong> <a href={institute.contact.website} target="_blank" rel="noopener noreferrer">
                    {institute.contact.website}
                  </a></p>
                )}
              </div>

              <div className="info-card">
                <h4>📍 Location</h4>
                <p>{institute.address?.street}</p>
                <p>{institute.address?.city}, {institute.address?.state}</p>
                <p><strong>Pincode:</strong> {institute.address?.pincode}</p>
              </div>
            </div>
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            {courses.length > 0 && (
              <div className="courses-preview">
                <h3>Popular Courses</h3>
                <div className="preview-courses">
                  {courses.slice(0, 3).map(course => (
                    <div key={course._id} className="preview-course">
                      <div className="preview-course-image">
                        {course.image ? (
                          <img src={course.image} alt={course.title} />
                        ) : (
                          <div className="course-image-placeholder">
                            {course.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="preview-course-content">
                        <h4>{course.title}</h4>
                        <p className="course-category">{course.category}</p>
                        <p className="course-fees">₹{course.fees?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {courses.length > 3 && (
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="btn-outline view-all-btn"
                  >
                    View All Courses ({courses.length})
                  </button>
                )}
              </div>
            )}

            {institute.images && institute.images.length > 0 && (
              <div className="gallery-preview">
                <h3>Campus Gallery</h3>
                <div className="preview-gallery">
                  {institute.images.slice(0, 4).map((image, index) => (
                    <div 
                      key={index} 
                      className="gallery-thumbnail"
                      onClick={() => openImageModal(image)}
                    >
                      <img src={image} alt={`Campus view ${index + 1}`} />
                    </div>
                  ))}
                </div>
                {institute.images.length > 4 && (
                  <button 
                    onClick={() => setActiveTab('gallery')}
                    className="btn-outline view-all-btn"
                  >
                    View All Photos ({institute.images.length})
                  </button>
                )}
              </div>
            )}
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="courses-tab">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <h3>Available Courses</h3>
            {courses.length === 0 ? (
              <div className="empty-state">
                <p>No courses listed yet. Check back later or contact the institute for course information.</p>
              </div>
            ) : (
              <div className="courses-grid">
                {courses.map(course => (
                  <div key={course._id} className="course-card">
                    <h4>{course.title}</h4>
                    <p className="course-description">{course.description}</p>
                    <div className="course-details">
                      <div className="detail-item">
                        <strong>Duration:</strong> {course.duration}
                      </div>
                      <div className="detail-item">
                        <strong>Fees:</strong> ₹{course.fees?.toLocaleString()}
                      </div>
                      {course.eligibility && (
                        <div className="detail-item">
                          <strong>Eligibility:</strong> {course.eligibility}
                        </div>
                      )}
                      {course.category && (
                        <div className="detail-item">
                          <strong>Category:</strong> {course.category}
                        </div>
                      )}
                    </div>
                    {course.facilities && course.facilities.length > 0 && (
                      <div className="course-facilities">
                        <strong>Facilities:</strong>
                        <div className="facilities-tags">
                          {course.facilities.map((facility, index) => (
                            <span key={index} className="facility-tag">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <div className="tab-header">
              <h3>Available Courses</h3>
              <p>Explore all the courses offered by {institute.name}</p>
            </div>
            
            {courses.length === 0 ? (
              <div className="no-data">
                <div className="no-data-icon">📚</div>
                <h4>No courses available</h4>
                <p>This institute hasn't added any courses yet.</p>
              </div>
            ) : (
              <div className="courses-grid-detailed">
                {courses.map(course => (
                  <div key={course._id} className="course-card-detailed">
                    <div className="course-image">
                      {course.image ? (
                        <img src={course.image} alt={course.title} />
                      ) : (
                        <div className="course-image-placeholder">
                          {course.title.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className="course-content">
                      <h4>{course.title}</h4>
                      <p className="course-category">{course.category}</p>
                      <p className="course-duration">⏱️ {course.duration}</p>
                      <p className="course-fees">💰 ₹{course.fees?.toLocaleString()}</p>
                      <p className="course-description">{course.description}</p>
                    </div>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="facilities-tab">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <h3>Facilities & Infrastructure</h3>
            {(!institute.facilities || institute.facilities.length === 0) ? (
              <div className="empty-state">
                <p>No facilities information available yet.</p>
              </div>
            ) : (
              <div className="facilities-grid">
                {institute.facilities.map((facility, index) => (
                  <div key={index} className="facility-item">
                    <h4>{facility.name}</h4>
                    {facility.description && (
                      <p>{facility.description}</p>
                    )}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <div className="tab-header">
              <h3>Campus Facilities</h3>
              <p>Discover the amenities and infrastructure at {institute.name}</p>
            </div>
            
            {facilities.length === 0 ? (
              <div className="no-data">
                <div className="no-data-icon">🏢</div>
                <h4>No facilities information</h4>
                <p>This institute hasn't added facility details yet.</p>
              </div>
            ) : (
              <div className="facilities-grid-detailed">
                {facilities.map(facility => (
                  <div key={facility._id} className="facility-card-detailed">
                    <div className="facility-icon">{facility.icon || '🏢'}</div>
                    <div className="facility-info">
                      <h4>{facility.name}</h4>
                      <p>{facility.description}</p>
                    </div>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="gallery-tab">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <h3>Institute Gallery</h3>
            {allImages.length === 0 ? (
              <div className="empty-state">
                <p>No images available for this institute.</p>
                <div className="placeholder-gallery">
                  <div className="placeholder-image">
                    <span className="placeholder-icon">🏫</span>
                    <p>Institute Building</p>
                  </div>
                  <div className="placeholder-image">
                    <span className="placeholder-icon">📚</span>
                    <p>Classrooms</p>
                  </div>
                  <div className="placeholder-image">
                    <span className="placeholder-icon">⚽</span>
                    <p>Sports Facilities</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gallery-grid">
                {allImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img 
                      src={getImageUrl(image)} 
                      alt={`${institute.name} - ${image.type === 'logo' ? 'Logo' : 'Image ' + (index + 1)}`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                    {image.type === 'logo' && (
                      <div className="image-badge">Logo</div>
                    )}
                    {image.isPrimary && image.type !== 'logo' && (
                      <div className="image-badge primary">Primary</div>
                    )}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <div className="tab-header">
              <h3>Campus Gallery</h3>
              <p>Explore the campus and facilities of {institute.name}</p>
            </div>
            
            {(!institute.images || institute.images.length === 0) ? (
              <div className="no-data">
                <div className="no-data-icon">🏛️</div>
                <h4>No gallery images</h4>
                <p>This institute hasn't added any campus photos yet.</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {institute.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="gallery-item"
                    onClick={() => openImageModal(image)}
                  >
                    <img src={image} alt={`Campus view ${index + 1}`} />
                    <div className="gallery-overlay">
                      <span className="view-icon">👁️</span>
                    </div>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab">
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <div className="reviews-header">
              <h3>Student & Parent Reviews</h3>
              <div className="average-rating">
                <div className="rating-score">{getAverageRating()}</div>
                <div className="rating-stars">
                  {'⭐'.repeat(5)}
                </div>
                <div className="rating-count">{reviews.length} reviews</div>
              </div>
            </div>

            <div className="reviews-list">
              {reviews.length === 0 ? (
                <div className="empty-state">
                  <p>No reviews yet. Be the first to review this institute!</p>
                  {user && (
                    <button 
                      onClick={() => setShowReviewForm(true)}
                      className="btn btn-primary"
                    >
                      Write First Review
                    </button>
                  )}
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review._id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <strong>{review.user?.name || 'Anonymous'}</strong>
                          <div className="review-rating">
                            {'⭐'.repeat(review.rating)}
                          </div>
                        </div>
                      </div>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
            <div className="tab-header">
              <div className="reviews-summary">
                <h3>Student Reviews</h3>
                <div className="summary-stats">
                  <span className="average-rating-badge">
                    {averageRating} ⭐ Overall
                  </span>
                  <span className="total-reviews">
                    Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              {user && user.role === 'user' && institute.status === 'approved' && (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="btn-primary"
                >
                  Write a Review
                </button>
              )}
            </div>
            
            {reviews.length === 0 ? (
              <div className="no-data">
                <div className="no-data-icon">⭐</div>
                <h4>No reviews yet</h4>
                <p>Be the first to share your experience with this institute!</p>
                {user && user.role === 'user' && institute.status === 'approved' && (
                  <button 
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary"
                  >
                    Write First Review
                  </button>
                )}
              </div>
            ) : (
              <div className="reviews-list-detailed">
                {reviews.map(review => (
                  <div key={review._id} className="review-card-detailed">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <h4>{review.user?.name || 'Anonymous'}</h4>
                        {renderStars(review.rating)}
                      </div>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
                      </span>
                    </div>
                    <p className="review-text">{review.reviewText}</p>
                  </div>
<<<<<<< HEAD
                ))}
              </div>
            )}
=======
<<<<<<< HEAD
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-tab">
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-info">
                <h4>📞 Phone</h4>
                <p>{institute.contact?.phone}</p>
              </div>
              <div className="contact-info">
                <h4>📧 Email</h4>
                <p>{institute.contact?.email}</p>
              </div>
              {institute.contact?.website && (
                <div className="contact-info">
                  <h4>🌐 Website</h4>
                  <p>
                    <a href={institute.contact.website} target="_blank" rel="noopener noreferrer">
                      {institute.contact.website}
                    </a>
                  </p>
                </div>
              )}
              <div className="contact-info">
                <h4>📍 Address</h4>
                <p>{institute.address?.street}</p>
                <p>{institute.address?.city}, {institute.address?.state}</p>
                <p><strong>Pincode:</strong> {institute.address?.pincode}</p>
              </div>
            </div>

            <div className="map-placeholder">
              <h4>📍 Location Map</h4>
              <div className="map-container">
                <p>Map would be integrated here showing the institute location</p>
                <div className="mock-map">
                  <div className="map-marker">📍</div>
                  <p>{institute.address?.city}, {institute.address?.state}</p>
                </div>
              </div>
            </div>
=======
                ))}
              </div>
            )}
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
          </div>
        )}
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
      {/* Modals */}
      {showReviewForm && (
        <ReviewForm
          institute={institute}
          onSubmit={handleReviewSubmit}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      {showEnquiryForm && (
        <EnquiryForm
          institute={institute}
          onSubmit={handleEnquirySubmit}
          onClose={() => setShowEnquiryForm(false)}
        />
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closeImageModal}
              className="close-btn"
            >
              ×
            </button>
            <img src={selectedImage} alt="Full size view" />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Write a Review for {institute.name}</h3>
              <button 
                onClick={() => setShowReviewForm(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="rating-input-large">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn-large ${star <= reviewForm.rating ? 'active' : ''}`}
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <div className="rating-text">
                  {reviewForm.rating === 5 && 'Excellent ⭐⭐⭐⭐⭐'}
                  {reviewForm.rating === 4 && 'Very Good ⭐⭐⭐⭐'}
                  {reviewForm.rating === 3 && 'Good ⭐⭐⭐'}
                  {reviewForm.rating === 2 && 'Fair ⭐⭐'}
                  {reviewForm.rating === 1 && 'Poor ⭐'}
                </div>
              </div>
              
              <div className="form-group">
                <label>Your Review *</label>
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, reviewText: e.target.value }))}
                  rows="6"
                  placeholder="Share your detailed experience with this institute. Consider mentioning teaching quality, facilities, campus life, and any suggestions for improvement."
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowReviewForm(false)}
                  className="btn-outline"
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {showEnquiryForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Send Enquiry to {institute.name}</h3>
              <button 
                onClick={() => setShowEnquiryForm(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleEnquirySubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                  rows="6"
                  placeholder={`Please include information about:
• Your educational background
• Course/program you're interested in
• Specific questions you have
• Preferred mode of communication
• Any other requirements`}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Sending...' : 'Send Enquiry'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowEnquiryForm(false)}
                  className="btn-outline"
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      )}
    </div>
  );
};

export default InstituteDetail;