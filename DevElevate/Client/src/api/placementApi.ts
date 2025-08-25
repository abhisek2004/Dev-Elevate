import axiosInstance from './axiosinstance';

// Types for placement preparation
export interface JobOpportunity {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Freelance';
    category: 'Product Based' | 'Service Based' | 'Startup' | 'Government' | 'Non-Profit';
    description: string;
    requirements: string[];
    responsibilities?: string[];
    salary: {
        min: number;
        max: number;
        currency: string;
        period: 'hourly' | 'monthly' | 'yearly';
    };
    benefits?: string[];
    deadline?: string;
    postedDate: string;
    source: 'Indeed' | 'LinkedIn' | 'Glassdoor' | 'Company Website' | 'Internal';
    sourceUrl?: string;
    isActive: boolean;
    tags: string[];
    experienceLevel: 'Entry' | 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal';
    skills: string[];
    applicationCount: number;
    views: number;
}

export interface InterviewSession {
    _id: string;
    type: 'AI Mock' | 'Peer Mock' | 'Practice';
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    participants: Array<{
        userId: string;
        role: 'Interviewer' | 'Interviewee' | 'Observer';
        joinedAt: string;
    }>;
    category: 'Technical' | 'HR' | 'Behavioral' | 'System Design' | 'Coding' | 'General';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    duration: number;
    scheduledAt: string;
    startedAt?: string;
    endedAt?: string;
    questions: Array<{
        question: string;
        type: string;
        difficulty: string;
        answer?: string;
        feedback?: string;
        score?: number;
    }>;
    feedback?: {
        overallScore: number;
        strengths: string[];
        areasForImprovement: string[];
        generalFeedback: string;
        technicalSkills: number;
        communicationSkills: number;
        problemSolving: number;
    };
    recording?: {
        url: string;
        duration: number;
    };
    notes?: string;
    tags: string[];
}

export interface Resource {
    _id: string;
    title: string;
    description: string;
    type: 'PDF' | 'Video' | 'Document' | 'Template' | 'Code' | 'Presentation' | 'Audio';
    category: 'Interview Prep' | 'DSA' | 'System Design' | 'Resume' | 'Cover Letter' | 'Technical Skills' | 'Soft Skills';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    fileUrl: string;
    fileSize: number;
    thumbnail?: string;
    tags: string[];
    author: string;
    version: string;
    isActive: boolean;
    downloads: number;
    views: number;
    rating: {
        average: number;
        count: number;
    };
    estimatedTime: number;
}

export interface JobApplication {
    _id: string;
    userId: string;
    jobId: string;
    status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Interview Completed' | 'Offer Extended' | 'Rejected' | 'Withdrawn';
    appliedAt: string;
    resume?: {
        url: string;
        filename: string;
        version: string;
    };
    coverLetter?: {
        url: string;
        filename: string;
        content: string;
    };
    portfolio?: {
        url: string;
        description: string;
    };
    additionalDocuments?: Array<{
        name: string;
        url: string;
        type: string;
    }>;
    notes?: string;
    followUpDate?: string;
    interviewScheduled?: string;
    companyNotes?: string;
    salaryExpectation?: {
        amount: number;
        currency: string;
        period: 'hourly' | 'monthly' | 'yearly';
    };
    availability?: {
        startDate: string;
        noticePeriod: number;
    };
    tags: string[];
    source: 'DevElevate' | 'Company Website' | 'Job Board' | 'Referral' | 'Networking';
}

// Job Opportunities API
export const getJobOpportunities = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    location?: string;
    type?: string;
    experienceLevel?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    const response = await axiosInstance.get('/placement/jobs', { params });
    return response.data;
};

export const getJobById = async (id: string) => {
    const response = await axiosInstance.get(`/placement/jobs/${id}`);
    return response.data;
};

export const applyToJob = async (jobId: string, applicationData: {
    userId: string;
    resume?: any;
    coverLetter?: any;
    portfolio?: any;
    additionalDocuments?: any[];
    salaryExpectation?: any;
    availability?: any;
    notes?: string;
}) => {
    const response = await axiosInstance.post(`/placement/jobs/${jobId}/apply`, applicationData);
    return response.data;
};

export const getUserApplications = async (userId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
}) => {
    const response = await axiosInstance.get(`/placement/users/${userId}/applications`, { params });
    return response.data;
};

// Interview Sessions API
export const createInterviewSession = async (sessionData: {
    type: string;
    category: string;
    difficulty: string;
    duration: number;
    scheduledAt: string;
    participants: any[];
}) => {
    const response = await axiosInstance.post('/placement/interviews', sessionData);
    return response.data;
};

export const getInterviewSessions = async (params?: {
    userId?: string;
    type?: string;
    status?: string;
    category?: string;
}) => {
    const response = await axiosInstance.get('/placement/interviews', { params });
    return response.data;
};

export const updateInterviewSession = async (id: string, updateData: any) => {
    const response = await axiosInstance.put(`/placement/interviews/${id}`, updateData);
    return response.data;
};

export const startAIMockInterview = async (interviewData: {
    userId: string;
    category: string;
    difficulty: string;
    duration: number;
}) => {
    const response = await axiosInstance.post('/placement/interviews/ai-mock', interviewData);
    return response.data;
};

// Resources API
export const getResources = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    type?: string;
    difficulty?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    const response = await axiosInstance.get('/placement/resources', { params });
    return response.data;
};

export const downloadResource = async (id: string) => {
    const response = await axiosInstance.post(`/placement/resources/${id}/download`);
    return response.data;
};

// External Jobs API
export const fetchExternalJobs = async (params?: {
    keywords?: string;
    location?: string;
    page?: number;
}) => {
    const response = await axiosInstance.get('/placement/external-jobs', { params });
    return response.data;
};

// Mock data for development/testing
export const mockJobOpportunities: JobOpportunity[] = [
    {
        _id: '1',
        title: 'Software Engineer',
        company: 'Google',
        location: 'Mountain View, CA',
        type: 'Full-time',
        category: 'Product Based',
        description: 'Join our team to build products that help create opportunities for everyone. Work on cutting-edge technologies.',
        requirements: ['BS/MS in Computer Science', '3+ years experience', 'Strong coding skills', 'System design experience'],
        salary: { min: 120000, max: 180000, currency: 'USD', period: 'yearly' },
        postedDate: new Date().toISOString(),
        source: 'Internal',
        isActive: true,
        tags: ['Software Engineering', 'Full Stack', 'Google'],
        experienceLevel: 'Mid',
        skills: ['JavaScript', 'Python', 'System Design'],
        applicationCount: 45,
        views: 120
    },
    {
        _id: '2',
        title: 'Senior Software Engineer',
        company: 'Microsoft',
        location: 'Redmond, WA',
        type: 'Full-time',
        category: 'Product Based',
        description: 'Build and maintain software solutions for Microsoft products. Work on Azure, Office, and other platforms.',
        requirements: ['BS/MS in Computer Science', 'C#/Java experience', 'Cloud platforms', 'Problem-solving skills'],
        salary: { min: 130000, max: 200000, currency: 'USD', period: 'yearly' },
        postedDate: new Date().toISOString(),
        source: 'Internal',
        isActive: true,
        tags: ['Software Engineering', 'Backend', 'Microsoft'],
        experienceLevel: 'Senior',
        skills: ['C#', 'Java', 'Azure'],
        applicationCount: 32,
        views: 89
    }
];

export const mockResources: Resource[] = [
    {
        _id: '1',
        title: 'Complete Interview Preparation Guide',
        description: 'A comprehensive guide covering technical, HR, and behavioral interview questions with sample answers.',
        type: 'PDF',
        category: 'Interview Prep',
        difficulty: 'Intermediate',
        fileUrl: '/resources/interview-guide.pdf',
        fileSize: 2048576, // 2MB
        tags: ['Interview', 'Guide', 'Preparation'],
        author: 'DevElevate Team',
        version: '2.1',
        isActive: true,
        downloads: 1250,
        views: 3200,
        rating: { average: 4.5, count: 89 },
        estimatedTime: 120
    },
    {
        _id: '2',
        title: 'DSA Practice Problems - Advanced',
        description: 'Collection of advanced data structures and algorithms problems with solutions and explanations.',
        type: 'PDF',
        category: 'DSA',
        difficulty: 'Advanced',
        fileUrl: '/resources/dsa-advanced.pdf',
        fileSize: 1536000, // 1.5MB
        tags: ['DSA', 'Algorithms', 'Advanced'],
        author: 'DevElevate Team',
        version: '1.8',
        isActive: true,
        downloads: 890,
        views: 2100,
        rating: { average: 4.7, count: 67 },
        estimatedTime: 180
    }
];
