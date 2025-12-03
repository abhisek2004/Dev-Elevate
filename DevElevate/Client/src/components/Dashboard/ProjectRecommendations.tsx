import React, { useState, useEffect } from 'react';
import { Lightbulb, BookOpen, Clock, Tag } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Link } from 'react-router-dom';
import { fetchDashboardData } from '../../api/dashboardApi';
import { ProjectRecommendation } from '../../api/dashboardApi';

const ProjectRecommendations: React.FC = () => {
    const { state } = useGlobalState();
    const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRecommendations = async () => {
        try {
            setLoading(true);
            const response = await fetchDashboardData();
            if (response.success) {
                setRecommendations(response.data.projectRecommendations);
            } else {
                setError("Failed to load project recommendations");
            }
        } catch (err) {
            console.error("Error fetching project recommendations:", err);
            setError("Failed to load project recommendations. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecommendations();

        // Auto-refresh every 24 hours
        const interval = setInterval(() => {
            loadRecommendations();
        }, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

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

    if (loading) {
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
                                Loading personalized suggestions...
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`p-4 rounded-xl border ${state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-start justify-between mb-2">
                                <div className={`h-5 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse w-2/3`}></div>
                                <div className={`h-5 w-20 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                            </div>
                            <div className={`h-4 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse mb-3`}></div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className={`h-5 w-16 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className={`h-4 w-24 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                                <div className={`h-6 w-20 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
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
                            <p className={`text-sm ${state.darkMode ? 'text-red-400' : 'text-red-600'}`}>
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={loadRecommendations}
                    className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${state.darkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                >
                    Retry
                </button>
            </div>
        );
    }

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
                    to="/projects"
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
                            <Link to={`/projects`} className="text-xs font-medium text-blue-500 hover:text-blue-600">
                                Start Project
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                    to="/projects"
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