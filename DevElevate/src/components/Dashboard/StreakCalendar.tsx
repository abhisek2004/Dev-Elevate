import React from 'react';
import { Calendar, Flame } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const StreakCalendar: React.FC = () => {
  const { state } = useGlobalState();

  // Generate calendar for current month
  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const calendar = generateCalendar();
  const today = new Date().getDate();

  const isActiveDay = (day: number | null) => {
    if (!day) return false;
    const dateStr = new Date().toISOString().split('T')[0];
    return state.streakData[dateStr] || day <= today;
  };

  return (
   <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 border shadow transition-shadow hover:shadow-md`}>
  <div className="flex items-center justify-between mb-6">
    <h3 className={`text-xl font-semibold tracking-wide ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
      Learning Streak
    </h3>
    <div className="flex items-center space-x-2">
      <Flame className="w-5 h-5 text-orange-500" />
      <span className={`text-base font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        {state.user?.streak || 0} days
      </span>
    </div>
  </div>

  <div className="mb-4">
    <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-500 mb-2">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="text-center py-1">
          {day}
        </div>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-1">
      {calendar.map((day, index) => (
        <div
          key={index}
          className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
            day === null
              ? ''
              : day === today
              ? 'bg-blue-500 text-white font-bold ring-2 ring-blue-300'
              : isActiveDay(day)
              ? 'bg-green-500 text-white'
              : state.darkMode
              ? 'text-gray-400 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  </div>

  <div className="flex items-center justify-between text-sm pt-2 border-t mt-4">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Active days
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Today
      </span>
    </div>
  </div>
</div>

  );
};

export default StreakCalendar;