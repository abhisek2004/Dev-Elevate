import React, { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Target, Award, CheckCircle } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const Achievements: React.FC = () => {
    const { state } = useGlobalState();
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // Auto-refresh daily
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

    // Mock achievements - in a real app, this would come from an API
    const achievements = [
        {
            id: '1',
            title: 'First Steps',
            description: 'Complete your first lesson',
            icon: CheckCircle,
            earned: true,
            dateEarned: '2023-05-15'
        },
        {
            id: '2',
            title: 'Streak Master',
            description: 'Maintain a 7-day learning streak',
            icon: Zap,
            earned: state.user?.streak && state.user.streak >= 7,
            dateEarned: state.user?.streak && state.user.streak >= 7 ? '2023-06-20' : null
        },
        {
            id: '3',
            title: 'Quiz Champion',
            description: 'Score 90% or higher on 5 quizzes',
            icon: Target,
            earned: false,
            dateEarned: null
        },
        {
            id: '4',
            title: 'Polyglot',
            description: 'Complete courses in 3 different tracks',
            icon: Star,
            earned: false,
            dateEarned: null
        },
        {
            id: '5',
            title: 'Night Owl',
            description: 'Complete a lesson after 10 PM',
            icon: Award,
            earned: true,
            dateEarned: '2023-07-10'
        }
    ];

    const earnedCount = achievements.filter(a => a.earned).length;

    return (
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                        <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Achievements
                        </h3>
                        <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {earnedCount} of {achievements.length} unlocked
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {earnedCount}
                    </div>
                    <div className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Earned
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                        <div
                            key={achievement.id}
                            className={`flex items-center gap-4 p-3 rounded-xl border ${achievement.earned
                                ? state.darkMode
                                    ? 'bg-yellow-900/20 border-yellow-800/50'
                                    : 'bg-yellow-50 border-yellow-200'
                                : state.darkMode
                                    ? 'bg-gray-900/50 border-gray-700'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <div className={`p-2 rounded-lg ${achievement.earned
                                ? 'bg-yellow-500 text-white'
                                : state.darkMode
                                    ? 'bg-gray-700 text-gray-400'
                                    : 'bg-gray-200 text-gray-500'
                                }`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-medium ${achievement.earned
                                    ? state.darkMode ? 'text-white' : 'text-gray-900'
                                    : state.darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    {achievement.title}
                                </h4>
                                <p className={`text-xs ${achievement.earned
                                    ? state.darkMode ? 'text-gray-300' : 'text-gray-600'
                                    : state.darkMode ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                    {achievement.description}
                                </p>
                            </div>
                            {achievement.earned && achievement.dateEarned && (
                                <div className={`text-xs px-2 py-1 rounded-full ${state.darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    Earned
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;