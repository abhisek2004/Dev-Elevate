import React, { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Target, Award, CheckCircle } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { fetchDashboardData } from '../../api/dashboardApi';
import { Achievement } from '../../api/dashboardApi';

const Achievements: React.FC = () => {
    const { state } = useGlobalState();
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAchievements = async () => {
        try {
            setLoading(true);
            const response = await fetchDashboardData();
            if (response.success) {
                setAchievements(response.data.achievements);
            } else {
                setError("Failed to load achievements");
            }
        } catch (err) {
            console.error("Error fetching achievements:", err);
            setError("Failed to load achievements. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAchievements();

        // Auto-refresh every 24 hours
        const interval = setInterval(() => {
            loadAchievements();
        }, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

    const getEarnedCount = () => {
        return achievements.filter(a => a.earned).length;
    };

    if (loading) {
        return (
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Achievements
                            </h3>
                            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Loading...
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${state.darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                            <div className={`p-2 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex-1">
                                <div className={`h-4 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                                <div className={`h-3 mt-2 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse w-3/4`}></div>
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
                        <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Achievements
                            </h3>
                            <p className={`text-sm ${state.darkMode ? 'text-red-400' : 'text-red-600'}`}>
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={loadAchievements}
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
                    <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Achievements
                        </h3>
                        <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {getEarnedCount()} of {achievements.length} unlocked
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {getEarnedCount()}
                    </div>
                    <div className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Earned
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {achievements.map((achievement) => {
                    const Icon = achievement.earned ? CheckCircle : Trophy;
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