import api from './api';

export const authService = {
  // Login user and return JWT payload
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Register new user
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  // Clear auth data
  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
  }
};
