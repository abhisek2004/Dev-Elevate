import axiosInstance from "./axiosinstance";
import {
  AssessmentHistoryResponse,
  AssessmentSubmissionPayload,
  GenerateAssessmentResponse,
  LatestAssessmentSummaryResponse,
  SubmitAssessmentResponse,
} from "../types/assessment";

const BASE_PATH = "/api/v1/assessments";

export const generateSkillAssessment = async (
  payload: {
    track: string;
    questionCount?: number;
    difficulty?: "Beginner" | "Intermediate" | "Advanced";
  }
): Promise<GenerateAssessmentResponse> => {
  const { data } = await axiosInstance.post<GenerateAssessmentResponse>(
    `${BASE_PATH}/generate`,
    payload
  );
  return data;
};

export const submitSkillAssessment = async (
  payload: AssessmentSubmissionPayload
): Promise<SubmitAssessmentResponse> => {
  const { data } = await axiosInstance.post<SubmitAssessmentResponse>(
    `${BASE_PATH}/submit`,
    payload
  );
  return data;
};

export const fetchAssessmentHistory = async (
  limit = 10
): Promise<AssessmentHistoryResponse> => {
  const { data } = await axiosInstance.get<AssessmentHistoryResponse>(
    `${BASE_PATH}/history`,
    {
      params: { limit },
    }
  );
  return data;
};

export const fetchLatestAssessmentSummary = async (): Promise<LatestAssessmentSummaryResponse> => {
  const { data } = await axiosInstance.get<LatestAssessmentSummaryResponse>(
    `${BASE_PATH}/latest`
  );
  return data;
};

