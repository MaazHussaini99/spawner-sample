import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/validate-token`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true
            }
          );
          if (response.data.response.code === 'TOKEN_VALID') {
            setIsAuthenticated(true);
          } else {
            console.log('Token invalid:', response.data.response.message);
            setIsAuthenticated(false);
            Cookies.remove('token');
          }
        } catch (error) {
          console.error('Error validating token:', error);
          setIsAuthenticated(false);
          Cookies.remove('token');
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (encryptedEmpId, encryptedPassword) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        { empId: encryptedEmpId, password: encryptedPassword },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (response.data.response.code === 'USER_LOGIN_SUCCESS') {
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful.' };
      } else {
        return { success: false, message: response.data.response.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.response?.message || 'An error occurred during login.'
      };
    }
  };

  const logout = () => {
    console.log('Logging out, removing token.');
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
