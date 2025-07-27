import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. http://localhost:5000/api/v1
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;