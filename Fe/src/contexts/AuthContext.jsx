// FE/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const baseURL = 'https://login-system-javis-production-65cd.up.railway.app';

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('🔍 Checking auth status...');
        const response = await fetch(`${API_BASE}/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.user);
            console.log('✅ User authenticated:', data.user.email);
          } else {
            localStorage.removeItem('token');
          }
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔄 Attempting login...');
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📨 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Login response:', data);

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        
        // Redirect ke dashboard setelah login berhasil
        console.log('🎉 Login successful, redirecting to dashboard...');
        navigate('/dashboard');
        
        return { success: true };
      } else {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }

    } catch (error) {
      console.error('💥 Login error:', error);
      return {
        success: false,
        error: 'Network error: Unable to connect to server.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};