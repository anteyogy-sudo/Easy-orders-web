import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: '/api', // все запросы идут через прокси Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

// Автоматически добавляем токен в каждый запрос
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// При 401 удаляем токен и перенаправляем на логин
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;