import axios from 'axios';
import { baseUrl } from "../config/routes";

const instance = axios.create({
<<<<<<< HEAD:DevElevate/Client/src/utils/axiosinstance.ts
  baseURL: import.meta.env.VITE_API_URL || `http://localhost:5000/api/v1`,
=======
  baseURL: baseUrl,
>>>>>>> 2bce4321cb943de3c0ee55880c17a00aaf2cd102:DevElevate/Client/src/api/axiosinstance.ts
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

<<<<<<< HEAD:DevElevate/Client/src/utils/axiosinstance.ts
// Helper function to add auth token to requests
const addAuthToken = (config: any) => {
  try {
    const authData = localStorage.getItem('devElevateAuth');
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      if (parsedAuth.sessionToken) {
        config.headers.Authorization = `Bearer ${parsedAuth.sessionToken}`;
      }
    }
  } catch (error) {
    console.error('Error adding auth token:', error);
  }
  return config;
};

// Add auth token to all requests
instance.interceptors.request.use(addAuthToken);

// API functions for updating dashboard stats
export const updateUserPoints = async (points: number) => {
  try {
    const response = await instance.post('/update-points', { points });
    return response.data;
  } catch (error) {
    console.error('Error updating points:', error);
    throw error;
  }
};

export const updateLearningProgress = async (track: string, moduleId: string, completed: boolean) => {
  try {
    const response = await instance.post('/update-learning-progress', { 
      track, 
      moduleId, 
      completed 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating learning progress:', error);
    throw error;
  }
};

export const updateCompletedGoals = async (completed: boolean) => {
  try {
    const response = await instance.post('/update-completed-goals', { completed });
    return response.data;
  } catch (error) {
    console.error('Error updating completed goals:', error);
    throw error;
  }
};

export const completeModule = async (track: string, moduleId: string, pointsEarned: number = 50) => {
  try {
    const response = await instance.post('/complete-module', { 
      track, 
      moduleId, 
      pointsEarned 
    });
    return response.data;
  } catch (error) {
    console.error('Error completing module:', error);
    throw error;
  }
};

export default instance;
=======
export default instance;
>>>>>>> 2bce4321cb943de3c0ee55880c17a00aaf2cd102:DevElevate/Client/src/api/axiosinstance.ts
