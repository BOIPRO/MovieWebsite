import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const api = axios.create({ 
  baseURL: '/api/bemovie', 
  withCredentials: true 
});

// --- THÊM PHẦN NÀY VÀO ---
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi là 401 và chưa từng thử retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('/auth/refresh');
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          
          // Sau khi có token mới, gắn vào header request gốc rồi gọi lại
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;