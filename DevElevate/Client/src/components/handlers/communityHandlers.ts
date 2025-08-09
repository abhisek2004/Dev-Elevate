import axios from '../../api/axiosinstance';
import { baseUrl } from '../../config/routes';

// User functions to interact with the community API

export const getQuestions = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/community/questions`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching questions:', error.message);
        throw error;
    }
}

export const postQuestion = async (title: string, description: string, tags: string[]) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/community/questions`, { title, description, tags }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error posting question:', error.message);
        throw error;
    }
}

export const getAnswers = async (questionId: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/community/questions/${questionId}/answers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching answers:', error.message);
        throw error;
    }
}

export const postAnswer = async (questionId: string, content: string) => {
    try {
        if (!questionId || !content) {
            throw new Error('Question ID and content are required');
        }
        const response = await axios.post(`${baseUrl}/api/v1/community/questions/${questionId}/answers`, { content }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error posting answer:', error.message);
        throw error;
    }
}

// Admin functions to manage the community API

export const deleteQuestion = async (questionId: string) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/v1/community/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error deleting question:', error.message);
        throw error;
    }
}

export const markAsResolved = async (questionId: string) => {
    try {
        const response = await axios.patch(`${baseUrl}/api/v1/community/questions/${questionId}/mark-as-resolved`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error resolving question:', error.message);
        throw error;
    }
}

export const acceptAnswer = async (answerId: string) => {
    try {
        const response = await axios.patch(`${baseUrl}/api/v1/community/questions/answers/${answerId}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error accepting answer:', error.message);
        throw error;
    }
}