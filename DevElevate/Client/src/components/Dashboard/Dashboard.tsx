import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import StatsCards from './StatsCards';
import ProgressWidget from './ProgressWidget';
import NewsWidget from './NewsWidget';
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
        streak: 0, // Initialize with 0
        totalPoints: 1250,
        level: 'Intermediate'
      };
      dispatch({ type: 'SET_USER', payload: defaultUser });
    }

    // Fetch streak data from backend
    const fetchStreakData = async () => {
      try {
        const response = await fetch('/api/user/streak', {
          headers: {
            'Authorization': `Bearer ${authState.sessionToken}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          // Update global state with streak data
          dispatch({ 
            type: 'SET_USER', 
            payload: {
              ...state.user,
              streak: data.currentStreakData.currentStreak
            }
          });
          
          // Convert streak data to the format expected by StreakCalendar
          const streakData = {};
          data.currentStreakData.dayStreak.forEach((visit: { dateOfVisiting: string | number | Date }) => {
            const date = new Date(visit.dateOfVisiting).toISOString().split('T')[0];
            streakData[date] = true;
          });
          
          dispatch({ type: 'HYDRATE_STATE', payload: { streakData } });
        }
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    };

    if (authState.isAuthenticated && authState.sessionToken) {
      fetchStreakData();
    }
  }, [authState.isAuthenticated, authState.sessionToken, dispatch, state.user]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className={`text-4xl font-extrabold tracking-tight mb-3 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {authState.user?.name || 'Developer'}! 👋
          </h1>
          <p className={`text-lg sm:text-xl font-medium leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressWidget />
            <NewsWidget />
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