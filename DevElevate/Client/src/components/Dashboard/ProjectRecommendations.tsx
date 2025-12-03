import React, { useState, useEffect } from 'react';
import { Lightbulb, BookOpen, Clock, Tag } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Link } from 'react-router-dom';

const ProjectRecommendations: React.FC = () => {
    const { state } = useGlobalState();
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // Auto-refresh daily
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

    // Mock recommendations - in a real app, this would come from an API
    useEffect(() => {
        // Simulate fetching recommendations
        const mockRecommendations = [
            {
                id: '1',
                title: 'E-commerce Dashboard',
                description: 'Build a comprehensive dashboard for an online store with sales analytics.',
                difficulty: 'Intermediate',
                techStack: ['React', 'Node.js', 'MongoDB'],
                estimatedTime: '2-3 weeks',
                tags: ['fullstack', 'dashboard', 'ecommerce']
            },
            {
                id: '2',
                title: 'Task Management App',
                description: 'Create a productivity app with drag-and-drop task boards and team collaboration.',
                difficulty: 'Beginner',
                techStack: ['React', 'Firebase'],
                estimatedTime: '1-2 weeks',
                tags: ['productivity', 'collaboration']
            },
            {
                id: '3',
                title: 'AI Chat Interface',
                description: 'Design a modern chat interface integrated with OpenAI API for smart conversations.',
                difficulty: 'Advanced',
                techStack: ['React', 'Node.js', 'OpenAI'],
                estimatedTime: '3-4 weeks',
                tags: ['ai', 'chatbot', 'api']
            }
        ];
        setRecommendations(mockRecommendations);
    }, [lastUpdated]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'advanced':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Project Recommendations
                        </h3>
                        <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Build your portfolio with these AI-recommended projects
                        </p>
                    </div>
                </div>
                <Link
                    to="/project-recommender"
                    className="text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {recommendations.map((project) => (
                    <div
                        key={project.id}
                        className={`p-4 rounded-xl border transition-all hover:shadow-md ${state.darkMode
                            ? 'bg-gray-900 border-gray-700 hover:border-gray-600'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h4 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {project.title}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(project.difficulty)}`}>
                                {project.difficulty}
                            </span>
                        </div>

                        <p className={`text-sm mb-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.techStack.slice(0, 3).map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-md dark:bg-blue-900 dark:text-blue-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{project.estimatedTime}</span>
                                </div>
                            </div>
                            <button className="text-xs font-medium text-blue-500 hover:text-blue-600">
                                Start Project
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                    to="/project-recommender"
                    className="flex items-center justify-center w-full gap-2 py-2 text-sm font-medium text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                    <BookOpen className="w-4 h-4" />
                    <span>Discover More Projects</span>
                </Link>
            </div>
        </div>
    );
};

export default ProjectRecommendations;