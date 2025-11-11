import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
<<<<<<< HEAD
  return useContext(AuthContext);
=======
<<<<<<< HEAD
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
=======
  return useContext(AuthContext);
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
<<<<<<< HEAD

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser()
        .then(userData => {
          setUser(userData.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw error;
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const clearError = () => {
    setError('');
  };

  const login = async (email, password, role) => {
    try {
      setError('');
      const response = await authService.login(email, password, role);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    }
  };

  const register = async (userData) => {
    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
      const response = await authService.register(userData);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw error;
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
      setError('');
      const response = await authService.register(userData);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    }
  };

  const logout = () => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    setUser(null);
    localStorage.removeItem('token');
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError('');
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  };

  const value = {
    user,
    login,
    register,
    logout,
<<<<<<< HEAD
    loading,
    error,
    clearError
=======
<<<<<<< HEAD
    loading
=======
    loading,
    error,
    clearError
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};