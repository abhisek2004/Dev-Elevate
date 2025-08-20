import axiosInstance from './axiosinstance';

export interface TestCase {
    id: string;
    input: string;
    expectedOutput: string;
    hidden: boolean;
}

export interface TestResult {
    testCaseId: string;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    runtime: number;
    memory: number;
    error: string | null;
}

export interface Problem {
    _id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    tags: string[];
    examples: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    constraints: string[];
    testCases: TestCase[];
    acceptance: number;
    submissions: number;
    starterCode: {
        python?: string;
        javascript?: string;
        java?: string;
        cpp?: string;
        c?: string;
    };
    timeLimit: number;
    memoryLimit: number;
    createdAt: string;
    updatedAt: string;
}

export interface Submission {
    _id: string;
    userId: string;
    problemId: string;
    code: string;
    language: string;
    results: TestResult[];
    passed: boolean;
    runtime: number;
    memory: number;
    submittedAt: string;
    executionTime: number;
}

export interface ExecutionResult {
    results: TestResult[];
    summary: {
        total: number;
        passed: number;
        failed: number;
        averageRuntime: number;
        averageMemory: number;
    };
}

export interface SubmissionResult {
    submissionId: string;
    passed: boolean;
    results: TestResult[];
    summary: {
        total: number;
        passed: number;
        failed: number;
        averageRuntime: number;
        averageMemory: number;
    };
}

export interface LeaderboardEntry {
    _id: string;
    username: string;
    problemsSolved: number;
    totalSubmissions: number;
    successRate: number;
}

export interface UserStats {
    problemsSolved: number;
    totalSubmissions: number;
    successRate: number;
}

export interface ProblemsResponse {
    problems: Problem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface LeaderboardResponse {
    leaderboard: LeaderboardEntry[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface SubmissionsResponse {
    submissions: Submission[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// API endpoints
const CODING_API = {
    // Problems
    getProblems: '/api/v1/coding/problems',
    getProblemById: (id: string) => `/api/v1/coding/problems/${id}`,
    createProblem: '/api/v1/coding/problems',
    updateProblem: (id: string) => `/api/v1/coding/problems/${id}`,
    deleteProblem: (id: string) => `/api/v1/coding/problems/${id}`,

    // Code execution and submission
    executeCode: '/api/v1/coding/execute',
    submitSolution: '/api/v1/coding/submit',

    // User data
    getSubmissions: '/api/v1/coding/submissions',
    getLeaderboard: '/api/v1/coding/leaderboard',
    getUserStats: '/api/v1/coding/stats'
};

// API functions
export const codingApi = {
    // Get all problems with optional filtering
    getProblems: async (params?: {
        difficulty?: string;
        category?: string;
        page?: number;
        limit?: number;
    }): Promise<ProblemsResponse> => {
        const response = await axiosInstance.get(CODING_API.getProblems, { params });
        return response.data.data;
    },

    // Get problem by ID
    getProblemById: async (id: string): Promise<Problem> => {
        const response = await axiosInstance.get(CODING_API.getProblemById(id));
        return response.data.data;
    },

    // Execute code (run against visible test cases)
    executeCode: async (data: {
        code: string;
        language: string;
        problemId: string;
    }): Promise<ExecutionResult> => {
        const response = await axiosInstance.post(CODING_API.executeCode, data);
        return response.data.data;
    },

    // Submit solution (run against all test cases)
    submitSolution: async (data: {
        code: string;
        language: string;
        problemId: string;
    }): Promise<SubmissionResult> => {
        const response = await axiosInstance.post(CODING_API.submitSolution, data);
        return response.data.data;
    },

    // Get user submissions
    getSubmissions: async (params?: {
        page?: number;
        limit?: number;
    }): Promise<SubmissionsResponse> => {
        const response = await axiosInstance.get(CODING_API.getSubmissions, { params });
        return response.data.data;
    },

    // Get leaderboard
    getLeaderboard: async (params?: {
        page?: number;
        limit?: number;
    }): Promise<LeaderboardResponse> => {
        const response = await axiosInstance.get(CODING_API.getLeaderboard, { params });
        return response.data.data;
    },

    // Get user stats
    getUserStats: async (): Promise<UserStats> => {
        const response = await axiosInstance.get(CODING_API.getUserStats);
        return response.data.data;
    },

    // Admin functions
    createProblem: async (problemData: Partial<Problem>): Promise<Problem> => {
        const response = await axiosInstance.post(CODING_API.createProblem, problemData);
        return response.data.data;
    },

    updateProblem: async (id: string, problemData: Partial<Problem>): Promise<Problem> => {
        const response = await axiosInstance.put(CODING_API.updateProblem(id), problemData);
        return response.data.data;
    },

    deleteProblem: async (id: string): Promise<void> => {
        await axiosInstance.delete(CODING_API.deleteProblem(id));
    }
};

export default codingApi;
