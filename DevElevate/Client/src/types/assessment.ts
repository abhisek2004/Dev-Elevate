export type SkillAssessmentTrack =
  | "dsa"
  | "web-development"
  | "machine-learning"
  | "data-science"
  | "cloud-devops";

export type SkillAssessmentDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: string[];
  type: "mcq" | "short_answer";
  category?: string;
}

export interface GenerateAssessmentResponse {
  success: boolean;
  assessment: {
    id: string;
    track: SkillAssessmentTrack;
    trackLabel: string;
    questionCount: number;
    difficulty: SkillAssessmentDifficulty;
    status: "generated" | "completed";
    generatedAt: string;
    questions: AssessmentQuestion[];
  };
}

export interface AssessmentSubmissionPayload {
  assessmentId: string;
  responses: Array<{ questionId: string; answer: string }>;
  timeTakenInSeconds?: number;
}

export interface SubmittedAssessment {
  id: string;
  track: SkillAssessmentTrack;
  trackLabel: string;
  score: number;
  accuracy: number;
  skillLevel: SkillAssessmentDifficulty;
  improvementAreas: string[];
  summary: string;
  encouragement: string;
  totalQuestions: number;
  correctCount: number;
  responses: Array<{
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    feedback: string;
  }>;
  recommendedResources: Array<{
    title: string;
    url: string;
    description?: string;
    type: string;
    focusAreas?: string[];
  }>;
  roadmapRecommendations: {
    focus: string;
    summary: string;
    actionItems: string[];
  } | null;
  completedAt: string;
}

export interface SubmitAssessmentResponse {
  success: boolean;
  assessment: SubmittedAssessment;
}

export interface AssessmentHistoryItem {
  id: string;
  track: SkillAssessmentTrack;
  trackLabel: string;
  score: number;
  skillLevel: SkillAssessmentDifficulty;
  accuracy: number;
  improvementAreas: string[];
  completedAt: string;
}

export interface AssessmentHistoryResponse {
  success: boolean;
  assessments: AssessmentHistoryItem[];
}

export interface LatestAssessmentSummaryResponse {
  success: boolean;
  assessment: {
    id: string;
    track: SkillAssessmentTrack;
    trackLabel: string;
    score: number;
    accuracy: number;
    skillLevel: SkillAssessmentDifficulty;
    improvementAreas: string[];
    recommendedResources: Array<{
      title: string;
      url: string;
      description?: string;
      type: string;
      focusAreas?: string[];
    }>;
    roadmapRecommendations: {
      focus: string;
      summary: string;
      actionItems: string[];
    } | null;
    completedAt: string;
  } | null;
}

