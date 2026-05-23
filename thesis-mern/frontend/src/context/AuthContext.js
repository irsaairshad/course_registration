import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Set up Axios interceptor to dynamically add JWT token to every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Fetch user details when token changes
  useEffect(() => {
    if (token) {
      fetchMe();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchMe = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
