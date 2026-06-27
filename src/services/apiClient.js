import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mock-egrcp-api.com/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Request Interceptor — attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || 'mock-token';
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor — handle errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    if (status === 403) console.error('Access forbidden:', message);
    if (status === 404) console.error('Resource not found:', message);
    if (status >= 500)  console.error('Server error:', message);

    return Promise.reject({ status, message });
  }
);

export default apiClient;