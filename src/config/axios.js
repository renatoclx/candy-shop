import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
  });

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log(config);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  api.interceptors.response.use(response => {
    console.log(response);
    return response;
  }, error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  });

  export default api;