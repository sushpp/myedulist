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
};