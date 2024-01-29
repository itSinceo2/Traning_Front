// BaseService.js

import axios from 'axios';
import { getAccessToken, logout } from '../Stores/AccessTokenStore';

const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL:  import.meta.env.VITE_API_URL || 'http://localhost:3000',
  });
  console.log(import.meta.env.VITE_API_URL)

  if (useAccessToken) {
    http.interceptors.request.use((config) => {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (
        error?.response?.status &&
        [401, 403].includes(error.response.status)
      ) {
        if (getAccessToken()) {
          logout();

          if (window.location.pathname !== "/login") {
            window.location.assign("/login");
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return http;
};

export default createHttp;
