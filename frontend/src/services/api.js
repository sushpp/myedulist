import axios from 'axios';

<<<<<<< HEAD
=======
<<<<<<< HEAD
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

<<<<<<< HEAD
// Handle responses
=======
<<<<<<< HEAD
// Handle responses and errors
=======
// Handle responses
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
<<<<<<< HEAD
=======
<<<<<<< HEAD
      window.location.href = '/login';
    }
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Log API errors for debugging
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    return Promise.reject(error);
  }
);

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
// Auth API
export const authAPI = {
  login: (email, password, role) => api.post('/auth/login', { email, password, role }),
  register: (data) => api.post('/auth/register', data),
};

// Institute API
export const instituteAPI = {
  getAll: (filters = {}) => api.get('/institutes', { params: filters }),
  getById: (id) => api.get(`/institutes/${id}`),
  getPending: () => api.get('/institutes/admin/pending'),
  updateStatus: (id, status) => api.put(`/institutes/admin/${id}/status`, { status }),
  update: (id, data) => api.put(`/institutes/${id}`, data), // Fixed: changed from updateProfile to update
  getMyInstitute: () => api.get('/institutes/my/institute'), // New endpoint for institute's own data
};

// Course API
export const courseAPI = {
  create: (data) => api.post('/courses', data),
  getByInstitute: (instituteId) => api.get(`/courses/institute/${instituteId}`),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  getMyCourses: () => api.get('/courses/my/courses'), // New endpoint for institute's own courses
};

// Review API
export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getByInstitute: (instituteId) => api.get(`/reviews/institute/${instituteId}`),
  getMyReviews: () => api.get('/reviews/my-reviews'), // User's own reviews
  getAll: () => api.get('/reviews'), // Admin only
  updateStatus: (id, status) => api.put(`/reviews/admin/${id}/status`, { status }),
};

// Enquiry API - Update with user-specific endpoints
export const enquiryAPI = {
  create: (data) => api.post('/enquiries', data),
  getMyEnquiries: () => api.get('/enquiries/my-enquiries'), // User's own enquiries
  getByInstitute: (instituteId) => api.get(`/enquiries/institute/${instituteId}`),
  getAll: () => api.get('/enquiries'), // Admin only
  updateStatus: (id, status) => api.put(`/enquiries/${id}`, { status }),
};

// User API
export const userAPI = {
  getAll: () => api.get('/users'),
  updateStatus: (id, isActive) => api.put(`/users/${id}/status`, { isActive }),
};

// Facilities API - FIXED: Corrected method names
export const facilitiesAPI = {
  create: (data) => api.post('/facilities', data),
  getByInstitute: (instituteId) => api.get(`/facilities/institute/${instituteId}`),
  getMyFacilities: () => api.get('/facilities/my/facilities'), // Fixed method name
  update: (id, data) => api.put(`/facilities/${id}`, data),
  delete: (id) => api.delete(`/facilities/${id}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getUserStats: (userId) => api.get(`/analytics/user/${userId}`),
};

// File Upload API
export const uploadAPI = {
  uploadImage: (formData) => api.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
export default api;