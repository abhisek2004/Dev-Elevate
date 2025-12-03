import axiosInstance from "./axiosinstance";

const BASE_PATH = "/api/v1/dashboard";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  dateEarned: string | null;
}

export interface LearningInsight {
  peakLearningTime: string;
  favoriteTopic: string;
  weeklyGoalProgress: string;
  learningStreak: string;
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  techStack: string[];
  estimatedTime: string;
  tags: string[];
}

export interface DashboardDataResponse {
  success: boolean;
  data: {
    achievements: Achievement[];
    insights: LearningInsight;
    projectRecommendations: ProjectRecommendation[];
  };
}

export const fetchDashboardData = async (): Promise<DashboardDataResponse> => {
  const { data } = await axiosInstance.get<DashboardDataResponse>(`${BASE_PATH}/`);
  return data;
};