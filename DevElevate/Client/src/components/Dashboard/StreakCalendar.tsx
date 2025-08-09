import React, { useRef, useState } from 'react';
import { Calendar, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useInView, motion } from 'framer-motion';

const StreakCalendar: React.FC = () => {
  const { state } = useGlobalState();

  const ref=useRef(null);
  const inView=useInView(ref, {once:true})

  // Current view date (month + year)
  const [viewDate, setViewDate] = useState(new Date());

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const changeYear = (newYear: number) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newYear);
    setViewDate(newDate);
  };

  const generateCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const calendar = generateCalendar();
  const today = new Date();

  const isActiveDay = (day: number | null) => {
    if (!day) return false;
    const dateStr = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
      .toISOString()
      .split('T')[0];
    return state.streakData[dateStr];
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      today.getFullYear() === viewDate.getFullYear() &&
      today.getMonth() === viewDate.getMonth() &&
      today.getDate() === day
    );
  };

  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const year = viewDate.getFullYear();

  // Years available (current ± 5)
  const yearOptions = Array.from({ length: 11 }, (_, i) => today.getFullYear() - 5 + i);

  return (
    <motion.div
     ref={ref}
     initial={{opacity:0, x:-12}}
     animate={inView? {opacity:1, x:0,
      transition:{delay:0.5, type:'spring'}
     }:{opacity:0, x:-12}}
    className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Learning Streak
        </h3>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className={`font-semibold text-sm ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {state.user?.streak || 0} days
          </span>
        </div>
      </div>

      {/* Month + Year Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <span className={`text-lg font-medium ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
            {monthName}
          </span>
          <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Year Dropdown */}
        <select
          className={`text-sm px-2 py-1 border rounded-md focus:outline-none ${state.darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
          value={year}
          onChange={(e) => changeYear(Number(e.target.value))}
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Day grid */}
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1 text-[13px] font-semibold text-gray-50 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-1 rounded-md bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-200">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendar.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm rounded-md transition-colors ${
                day === null
                  ? ''
                  : isToday(day)
                  ? 'bg-blue-500 text-white font-bold'
                  : isActiveDay(day)
                  ? 'bg-green-500 text-white'
                  : state.darkMode
                  ? 'text-sky-400 hover:bg-sky-700'
                  : 'text-sky-600 hover:bg-sky-100'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>Active days</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>Today</span>
        </div>
      </div>
    </motion.div>
  );

};

export default StreakCalendar;
