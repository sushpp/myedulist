import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/api';
import { useApp } from '../../context/AppContext';

const CourseManagement = ({ institute }) => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    fees: '',
    category: '',
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
      }
      
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
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      showNotification('Error saving course', 'error');
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
      image: course.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.delete(courseId);
        showNotification('Course deleted successfully!', 'success');
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        showNotification('Error deleting course', 'error');
      }
    }
  };

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
  };

  return (
    <div className="course-management">
      <div className="page-header">
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
              <div className="form-grid">
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
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
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 4 years, 6 months"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fees (₹) *</label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    required
                  />
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

              <div className="form-group">
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
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        )}
      </div>
    </div>
  );
};

export default CourseManagement;