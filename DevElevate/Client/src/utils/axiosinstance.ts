import axios from 'axios';

// Define the structure of the data we expect to find in localStorage
interface AuthStateInStorage {
  sessionToken: string | null;
  // Other properties like user, etc. are not needed for the interceptor
}

const instance = axios.create({
  baseURL: `http://localhost:4000`, // e.g. http://localhost:5000/api/v1
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // Correctly get the entire auth state string from localStorage
    const authStateString = localStorage.getItem("devElevateAuth");
    let token = null;

    if (authStateString) {
      try {
        // Parse the JSON string to get the state object
        const authState: AuthStateInStorage = JSON.parse(authStateString);
        // Extract the sessionToken
        token = authState.sessionToken;
      } catch (error) {
        console.error("Error parsing auth state from localStorage:", error);
      }
    }

    // Ensure headers exists before assigning Authorization
    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization token attached:", config.headers.Authorization);
    } else {
      console.warn("⚠️ No authorization token found. This request may fail.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios error config:", error.config);
    console.error("Axios error response:", error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Please login again.');
    } else if (error.response?.status === 403) {
        console.warn('Forbidden. You do not have the necessary permissions for this action.');
    }
    return Promise.reject(error);
  }
);

export default instance;
