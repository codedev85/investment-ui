import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true, 
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token'); 

    if (token) {
      (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
    
      localStorage.removeItem('token');
      window.location.href = '/'; 
    }
    return Promise.reject(error); 
  }
);

export default apiClient;

