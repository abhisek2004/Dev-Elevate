import React from 'react';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const StatsCards: React.FC = () => {
  const { state } = useGlobalState();

  const stats = [
    {
      title: 'Total Points',
      value: state.user?.totalPoints || 0,
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Current Streak',
      value: state.user?.streak || 0,
      icon: Calendar,
      color: 'from-green-500 to-teal-500',
      textColor: 'text-green-600',
      suffix: ' days'
    },
    {
      title: 'Completed Goals',
      value: state.completedGoals.length,
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Learning Progress',
      value: Object.keys(state.learningProgress).length,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600',
      suffix: ' modules'
    }
  ];

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat, index) => {
    const Icon = stat.icon;
    return (
      <div
        key={index}
        className={`
          rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300
          focus:outline-none focus:ring-0
          ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}
        tabIndex={0}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-inner`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}{stat.suffix || ''}
            </p>
            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.title}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
            style={{ width: `${Math.min(100, (stat.value / 100) * 100)}%` }}
          ></div>
        </div>
      </div>
    );
  })}
</div>

  );
};

export default StatsCards;