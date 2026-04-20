import axios from 'axios';

const API = axios.create({
  baseURL: 'http://145.223.19.16',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;