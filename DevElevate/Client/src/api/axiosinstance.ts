import axios from 'axios';
import { baseUrl } from "../config/routes";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const stored = localStorage.getItem("devElevateAuth");
    
    if (stored) {
      try {
        const authData = JSON.parse(stored);
        if (authData.sessionToken) {
          // Ensure headers object exists
          if (!config.headers) {
            config.headers = {} as Record<string, string>;
          }
          config.headers.Authorization = `Bearer ${authData.sessionToken}`;
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("devElevateAuth");
      // Optionally redirect to login page
      // window.location.href = "/login";
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden:", error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default instance;