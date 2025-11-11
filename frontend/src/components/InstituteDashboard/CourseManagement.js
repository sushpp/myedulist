import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { courseService } from '../../services/course';
import './InstituteDashboard.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
=======
import { courseAPI } from '../../services/api';
import { useApp } from '../../context/AppContext';

const CourseManagement = ({ institute }) => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
>>>>>>> c15d45fca (Initial commit)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    fees: '',
    category: '',
<<<<<<< HEAD
    facilities: [],
    eligibility: '',
    syllabus: [],
    image: null
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getCoursesByInstitute();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse._id, formData);
      } else {
        await courseService.createCourse(formData);
=======
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useApp();

  useEffect(() => {
    fetchCourses();
  }, [institute]);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getByInstitute(institute._id);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      showNotification('Error loading courses', 'error');
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
      if (editingCourse) {
        await courseAPI.update(editingCourse._id, formData);
        showNotification('Course updated successfully!', 'success');
      } else {
        await courseAPI.create({
          ...formData,
          institute: institute._id
        });
        showNotification('Course created successfully!', 'success');
>>>>>>> c15d45fca (Initial commit)
      }
      
      setShowForm(false);
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        duration: '',
        fees: '',
        category: '',
<<<<<<< HEAD
        facilities: [],
        eligibility: '',
        syllabus: [],
        image: null
      });
      setImagePreview(null);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course. Please try again.');
=======
        image: ''
      });
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      showNotification('Error saving course', 'error');
>>>>>>> c15d45fca (Initial commit)
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fees: course.fees,
      category: course.category,
<<<<<<< HEAD
      facilities: course.facilities || [],
      eligibility: course.eligibility || '',
      syllabus: course.syllabus || [],
      image: null
    });
    setImagePreview(course.imageUrl || null);
=======
      image: course.image || ''
    });
>>>>>>> c15d45fca (Initial commit)
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
<<<<<<< HEAD
        await courseService.deleteCourse(courseId);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. Please try again.');
=======
        await courseAPI.delete(courseId);
        showNotification('Course deleted successfully!', 'success');
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        showNotification('Error deleting course', 'error');
>>>>>>> c15d45fca (Initial commit)
      }
    }
  };

<<<<<<< HEAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFacility = () => {
    setFormData(prev => ({
      ...prev,
      facilities: [...prev.facilities, '']
    }));
  };

  const updateFacility = (index, value) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.map((fac, i) => i === index ? value : fac)
    }));
  };

  const removeFacility = (index) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
=======
  const cancelEdit = () => {
    setShowForm(false);
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      fees: '',
      category: '',
      image: ''
    });
>>>>>>> c15d45fca (Initial commit)
  };

  return (
    <div className="course-management">
      <div className="page-header">
<<<<<<< HEAD
        <h2>Course Management</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          + Add New Course
        </button>
      </div>

      {/* Course Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingCourse(null);
                  setFormData({
                    title: '',
                    description: '',
                    duration: '',
                    fees: '',
                    category: '',
                    facilities: [],
                    eligibility: '',
                    syllabus: [],
                    image: null
                  });
                  setImagePreview(null);
                }}
                className="close-button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
=======
        <h1>Course Management</h1>
        <p>Manage your institute's courses and programs</p>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Course
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
            <form onSubmit={handleSubmit}>
>>>>>>> c15d45fca (Initial commit)
              <div className="form-grid">
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
<<<<<<< HEAD
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
=======
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
>>>>>>> c15d45fca (Initial commit)
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
<<<<<<< HEAD
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="engineering">Engineering</option>
                    <option value="medical">Medical</option>
                    <option value="arts">Arts</option>
                    <option value="science">Science</option>
                    <option value="commerce">Commerce</option>
                    <option value="coaching">Coaching</option>
=======
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
>>>>>>> c15d45fca (Initial commit)
                  </select>
                </div>

                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
<<<<<<< HEAD
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
=======
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
>>>>>>> c15d45fca (Initial commit)
                    placeholder="e.g., 4 years, 6 months"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fees (₹) *</label>
                  <input
                    type="number"
<<<<<<< HEAD
                    value={formData.fees}
                    onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
=======
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
>>>>>>> c15d45fca (Initial commit)
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
<<<<<<< HEAD
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
=======
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
>>>>>>> c15d45fca (Initial commit)
                  required
                />
              </div>

              <div className="form-group">
<<<<<<< HEAD
                <label>Eligibility Criteria</label>
                <input
                  type="text"
                  value={formData.eligibility}
                  onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
                  placeholder="e.g., 12th grade with 60% marks"
                />
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label>Course Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Course preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Facilities</label>
                {formData.facilities.map((facility, index) => (
                  <div key={index} className="facility-input">
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => updateFacility(index, e.target.value)}
                      placeholder="Facility name"
                    />
                    <button 
                      type="button"
                      onClick={() => removeFacility(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addFacility}
                  className="btn btn-outline btn-sm"
                >
                  + Add Facility
                </button>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCourse(null);
                    setImagePreview(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
=======
                <label>Course Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Saving...' : (editingCourse ? 'Update Course' : 'Add Course')}
                </button>
                <button type="button" onClick={cancelEdit} className="btn-outline">
                  Cancel
>>>>>>> c15d45fca (Initial commit)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Courses List */}
      <div className="courses-list">
        {courses.length === 0 ? (
          <div className="empty-state">
            <p>No courses added yet</p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Add Your First Course
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course._id} className="course-card">
                <div className="course-header">
                  <h3>{course.title}</h3>
                  <div className="course-actions">
                    <button 
                      onClick={() => handleEdit(course)}
                      className="btn btn-sm btn-outline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Course Image */}
                {course.imageUrl && (
                  <div className="course-image">
                    <img src={course.imageUrl} alt={course.title} />
                  </div>
                )}
                
                <p className="course-category">{course.category}</p>
                <p className="course-description">{course.description}</p>
                
                <div className="course-details">
                  <span><strong>Duration:</strong> {course.duration}</span>
                  <span><strong>Fees:</strong> ₹{course.fees}</span>
                  {course.eligibility && (
                    <span><strong>Eligibility:</strong> {course.eligibility}</span>
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
              </div>
            ))}
          </div>
=======
      <div className="courses-grid">
        {courses.length === 0 ? (
          <div className="no-data">
            <h3>No courses added yet</h3>
            <p>Click "Add New Course" to get started</p>
          </div>
        ) : (
          courses.map(course => (
            <div key={course._id} className="course-card">
              <div className="course-image">
                {course.image ? (
                  <img src={course.image} alt={course.title} />
                ) : (
                  <div className="image-placeholder">
                    {course.title.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-category">{course.category}</p>
                <p className="course-duration">⏱️ {course.duration}</p>
                <p className="course-fees">💰 ₹{course.fees?.toLocaleString()}</p>
                <p className="course-description">{course.description}</p>
                
                <div className="course-actions">
                  <button 
                    onClick={() => handleEdit(course)}
                    className="btn-outline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(course._id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
>>>>>>> c15d45fca (Initial commit)
        )}
      </div>
    </div>
  );
};

export default CourseManagement;