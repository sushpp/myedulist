<<<<<<< HEAD
=======
<<<<<<< HEAD
import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
import { authAPI } from './api';

export const authService = {
  login: async (email, password, role) => {
    try {
      const response = await authAPI.login(email, password, role);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },
  
  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
};