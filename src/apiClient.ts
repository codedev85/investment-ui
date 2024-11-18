// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// // Create an Axios instance
// const apiClient = axios.create({
//   baseURL: 'http://localhost:8000/api', 
//   withCredentials: true, 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     console.log('Request Config:', config);
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     console.log('Response:', response);
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error('Unauthorized - Redirecting to login');
//       window.location.href = '/login'; 
//     } else {
//       console.error('Response Error:', error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
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


