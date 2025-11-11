import { authAPI } from './api';

export const authService = {
  // 🔐 Login function
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

  // 🧾 Register function
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

  // 👤 Get current logged-in user
  getCurrentUser: async () => {
    try {
      const response = await authAPI.getCurrentUser();
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user details.');
    }
  },
};
