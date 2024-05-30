import axios from 'axios';
import { ACCESS_TOKEN } from './constants';
import { getCookie } from './utils';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://8000-sivajisj2-taskmanager-fzcchz5a13t.ws-us114.gitpod.io',
  withCredentials: true,
  // Use your base URL
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const csrfToken = getCookie('csrftoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
