import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const api = axios.create({ 
  baseURL: '/api/bemovie', 
  withCredentials: true 
});
api.interceptors.request.use(async (config) => {
  let token = useAuthStore.getState().accessToken;
  const url: string = config.url ?? '';

  if (!token && !url.includes('/auth/refresh')) {
    try {
      const { data } = await api.post<{ accessToken?: string }>('/auth/refresh');
      if (data?.accessToken) {
        token = data.accessToken;
        useAuthStore.getState().setAccessToken(token);
      }
    } catch (error: any) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }
  }

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
    const requestUrl: string = originalRequest?.url ?? '';
    if (requestUrl.includes('/auth/refresh')) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post<{ accessToken?: string }>('/auth/refresh');
        if (data?.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;