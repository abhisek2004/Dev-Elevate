export interface User {
    name: string;
}

export interface Question {
    id: string;
    title: string;
    description: string;
    tags: string[];
    createdAt: string;
    user: User;
    answers: string[];
    isResolved: boolean;
}