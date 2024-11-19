import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://investment.veloxsolution.ng/api', 
  withCredentials: true, 
});

// Utility function to get the CSRF token from cookies
function getCSRFToken(): string | null {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return null;
}

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token'); 
    const csrfToken = getCSRFToken(); 

    if (token) {
      (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
    }

    if (csrfToken) {
      (config.headers as AxiosRequestHeaders)['X-CSRFToken'] = csrfToken; 
       config.headers['X-CSRFToken'] = csrfToken;
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token'); // Clear token from localStorage

      // setTimeout(()=> {
      //   window.location.href = '/'; 
      // },3000)
      
    }
    return Promise.reject(error); 
  }
);

export default apiClient;
