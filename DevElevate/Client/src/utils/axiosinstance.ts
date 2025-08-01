import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default instance;
