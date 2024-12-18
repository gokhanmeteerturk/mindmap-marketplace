// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'https://cloudcomputing-django-gme.azurewebsites.net', 
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
