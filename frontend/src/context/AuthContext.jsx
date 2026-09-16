import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read saved session from localStorage on app initial load
    const savedToken = localStorage.getItem('jwt_token');
    const savedUser = localStorage.getItem('user_info');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const userInfo = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    localStorage.setItem('jwt_token', data.token);
    localStorage.setItem('user_info', JSON.stringify(userInfo));

    setToken(data.token);
    setUser(userInfo);
    return data;
  };

  const register = async (name, email, password) => {
    return await authService.register(name, email, password);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
