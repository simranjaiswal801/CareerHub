import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Attach JWT token to every request automatically, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('careerhub_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If token is invalid/expired, log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('careerhub_token');
      localStorage.removeItem('careerhub_user');
    }
    return Promise.reject(error);
  }
);

export default api;
