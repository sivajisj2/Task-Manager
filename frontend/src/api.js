import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://8000-sivajisj2-taskmanager-fzcchz5a13t.ws-us114.gitpod.io', // Use your base URL
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
