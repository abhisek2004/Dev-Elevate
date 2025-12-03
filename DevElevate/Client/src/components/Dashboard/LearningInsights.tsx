import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, BookOpen, Target, Zap, Award } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { fetchDashboardData } from '../../api/dashboardApi';
import { LearningInsight } from '../../api/dashboardApi';

const LearningInsights: React.FC = () => {
    const { state } = useGlobalState();
    const [insights, setInsights] = useState<LearningInsight | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadInsights = async () => {
        try {
            setLoading(true);
            const response = await fetchDashboardData();
            if (response.success) {
                setInsights(response.data.insights);
            } else {
                setError("Failed to load learning insights");
            }
        } catch (err) {
            console.error("Error fetching learning insights:", err);
            setError("Failed to load learning insights. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInsights();

        // Auto-refresh every 24 hours
        const interval = setInterval(() => {
            loadInsights();
        }, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Learning Insights
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`p-4 rounded-xl border ${state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                                </div>
                                <div className={`h-6 w-16 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                            </div>
                            <div className={`h-4 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse mb-2`}></div>
                            <div className={`h-3 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse w-3/4`}></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Learning Insights
                    </h3>
                </div>
                <div className={`p-4 rounded-xl ${state.darkMode ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-200'} border`}>
                    <p className={`text-sm ${state.darkMode ? 'text-red-300' : 'text-red-700'}`}>
                        {error}
                    </p>
                    <button
                        onClick={loadInsights}
                        className={`mt-3 px-3 py-1 rounded text-xs font-medium ${state.darkMode
                                ? 'bg-red-800 text-white hover:bg-red-700'
                                : 'bg-red-200 text-red-800 hover:bg-red-300'
                            }`}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!insights) {
        return (
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Learning Insights
                    </h3>
                </div>
                <div className={`p-4 rounded-xl text-center ${state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}>
                    <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No insights available yet. Complete some activities to generate insights.
                    </p>
                </div>
            </div>
        );
    }

    // Map insights to display format
    const insightsData = [
        {
            id: '1',
            title: 'Peak Learning Time',
            value: insights.peakLearningTime,
            description: 'You\'re most active during this time period',
            icon: Clock,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: '2',
            title: 'Favorite Topic',
            value: insights.favoriteTopic,
            description: 'This is your most explored subject area',
            icon: BookOpen,
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: '3',
            title: 'Weekly Goal',
            value: insights.weeklyGoalProgress,
            description: 'Your progress toward weekly learning targets',
            icon: Target,
            color: 'from-green-500 to-teal-500'
        },
        {
            id: '4',
            title: 'Learning Streak',
            value: insights.learningStreak,
            description: 'Keep it up! You\'re on a roll',
            icon: Zap,
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Learning Insights
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {insightsData.map((insight) => {
                    const Icon = insight.icon;
                    return (
                        <div
                            key={insight.id}
                            className={`p-4 rounded-xl border ${state.darkMode
                                ? 'bg-gray-900 border-gray-700'
                                : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.color}`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {insight.value}
                                </div>
                            </div>
                            <h4 className={`font-medium mb-1 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {insight.title}
                            </h4>
                            <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {insight.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className={`mt-4 pt-4 border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className={`text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Personalized Tips
                        </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${state.darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                        New
                    </span>
                </div>
                <p className={`mt-2 text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try tackling {insights.favoriteTopic} problems during your peak hours ({insights.peakLearningTime}) for better retention.
                </p>
            </div>
        </div>
    );
};

export default LearningInsights;