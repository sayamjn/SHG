import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        if (localStorage.getItem('token')) {
          // Set auth token header
          setAuthToken(localStorage.getItem('token'));
          
          // Get user info
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
          
          setGroup(res.data.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setAuthToken(null);
        setError(err.response?.data?.error || 'Authentication failed');
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Set token in headers for all requests
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Login
  const login = async (groupCode, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        groupCode,
        password
      });

      // Set token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set token to Auth header
      setAuthToken(res.data.token);
      
      // Get user info
      const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
      
      setGroup(userRes.data.data);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setIsAuthenticated(false);
      setGroup(null);
    }
    setLoading(false);
  };

  // Logout
  const logout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    setAuthToken(null);
    
    // Reset state
    setIsAuthenticated(false);
    setGroup(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        group,
        loading,
        error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};