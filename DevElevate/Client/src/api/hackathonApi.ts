// api/hackathonApi.ts
import instance from './axiosinstance';
import {
  Hackathon,
  HackathonSubmission,
  CreateHackathonRequest,
  SubmissionRequest,
  TeamCreateRequest,
  TeamJoinRequest,
  VoteRequest,
  RegisterRequest,
  ApiResponse,
  HackathonTeam
} from '../types/hackathon';

export const hackathonApi = {
  // Public routes
  getAllHackathons: async (status?: string): Promise<ApiResponse<Hackathon[]>> => {
    const params = status ? { status } : {};
    const response = await instance.get('/api/v1/hackathons', { params });
    return response.data;
  },

  getHackathon: async (id: string): Promise<ApiResponse<Hackathon>> => {
    const response = await instance.get(`/api/v1/hackathons/${id}`);
    return response.data;
  },

  // User routes
  registerToHackathon: async (id: string, data: RegisterRequest): Promise<ApiResponse<void>> => {
    const response = await instance.post(`/api/v1/hackathons/${id}/register`, data);
    return response.data;
  },

  createTeam: async (id: string, data: TeamCreateRequest): Promise<ApiResponse<HackathonTeam>> => {
    const response = await instance.post(`/api/v1/hackathons/${id}/create-team`, data);
    return response.data;
  },

  joinTeam: async (id: string, data: TeamJoinRequest): Promise<ApiResponse<void>> => {
    const response = await instance.post(`/api/v1/hackathons/${id}/join-team`, data);
    return response.data;
  },

  submitProject: async (id: string, data: SubmissionRequest): Promise<ApiResponse<HackathonSubmission>> => {
    const response = await instance.post(`/api/v1/hackathons/${id}/submit`, data);
    return response.data;
  },

  getLeaderboard: async (id: string): Promise<ApiResponse<HackathonSubmission[]>> => {
    const response = await instance.get(`/api/v1/hackathons/${id}/leaderboard`);
    return response.data;
  },

  voteSubmission: async (data: VoteRequest): Promise<ApiResponse<void>> => {
    const response = await instance.post('/api/v1/hackathons/vote', data);
    return response.data;
  },

  unvoteSubmission: async (data: VoteRequest): Promise<ApiResponse<void>> => {
    const response = await instance.post('/api/v1/hackathons/unvote', data);
    return response.data;
  },

  // Admin routes
  createHackathon: async (data: CreateHackathonRequest): Promise<ApiResponse<Hackathon>> => {
    const response = await instance.post('/api/v1/hackathons/create', data);
    return response.data;
  },
};

// Utility function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
