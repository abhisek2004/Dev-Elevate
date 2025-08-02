import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import StatsCards from './StatsCards';
import ProgressWidget from './ProgressWidget';
import NewsWidget from './NewsWidget.tsx';
import QuickActions from './QuickActions';
import StreakCalendar from './StreakCalendar';
import DailyGoals from './DailyGoals';
import { User } from '../../contexts/GlobalContext';

const Dashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    // Initialize user if not exists
    if (!state.user) {
      const defaultUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: new Date().toISOString(),
        streak: 7,
        totalPoints: 1250,
        level: 'Intermediate'
      };
      dispatch({ type: 'SET_USER', payload: defaultUser });
    }

    // Initialize sample news items
    if (state.newsItems.length === 0) {
      const sampleNews = [
        {
          id: '1',
          title: 'React 18.3 Released with New Features',
          summary: 'Latest React version brings performance improvements and new hooks',
          url: '#',
          publishDate: new Date().toISOString(),
          category: 'tech' as const
        },
        {
          id: '2',
          title: 'Google Summer Internship 2024',
          summary: 'Applications open for software engineering internships',
          url: '#',
          publishDate: new Date().toISOString(),
          category: 'internships' as const
        },
        {
          id: '3',
          title: 'AI/ML Engineer Positions at Microsoft',
          summary: 'Multiple openings for machine learning specialists',
          url: '#',
          publishDate: new Date().toISOString(),
          category: 'jobs' as const
        }
      ];
      dispatch({ type: 'UPDATE_NEWS', payload: sampleNews });
    }
  }, [state.user, state.newsItems.length, dispatch]);

  return (
    <div className={`min-h-screen transition-colors duration-300  ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className={`text-4xl font-extrabold tracking-tight mb-3 ${state.darkMode ? 'text-white' : 'text-gray-900'} `}>
            Welcome back, {authState.user?.name || 'Developer'}! 👋
          </h1>
          <p className={`text-lg sm:text-xl font-medium leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {<><ProgressWidget /><NewsWidget /></> }
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <DailyGoals />
            <StreakCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;