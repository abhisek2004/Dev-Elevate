import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, BookOpen, Target, Zap, Award } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const LearningInsights: React.FC = () => {
    const { state } = useGlobalState();
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // Auto-refresh daily
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

    // Mock insights data - in a real app, this would come from analytics
    const insights = [
        {
            id: '1',
            title: 'Peak Learning Time',
            value: '2:00 PM - 4:00 PM',
            description: 'You\'re most active during afternoon sessions',
            icon: Clock,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: '2',
            title: 'Favorite Topic',
            value: 'Data Structures',
            description: 'You spend 40% more time on DSA topics',
            icon: BookOpen,
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: '3',
            title: 'Weekly Goal',
            value: '85% Completed',
            description: 'You\'re on track to meet your weekly targets',
            icon: Target,
            color: 'from-green-500 to-teal-500'
        },
        {
            id: '4',
            title: 'Learning Streak',
            value: `${state.user?.streak || 0} Days`,
            description: 'Keep it up! You\'re on a roll',
            icon: Zap,
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Learning Insights
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {insights.map((insight) => {
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
                    Try tackling Dynamic Programming problems during your peak hours for better retention.
                </p>
            </div>
        </div>
    );
};

export default LearningInsights;