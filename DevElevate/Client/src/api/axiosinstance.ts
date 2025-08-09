import axios from 'axios';
import { baseUrl } from "../config/routes";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default instance;
