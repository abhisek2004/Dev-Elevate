import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users, MoreHorizontal } from 'lucide-react';
import { useTasks } from '../../contexts/AppContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, parseISO, isSameWeek, setHours, setMinutes, getHours, isToday, startOfDay } from 'date-fns';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { state } = useGlobalState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTask, setModalTask] = useState<any>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskTime, setTaskTime] = useState('09:00');
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!tasks) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="mx-auto mb-4 w-8 h-8 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
          <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading calendar...</p>
        </div>
      </div>
    );
  }

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = [];
    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentDate]);

  const getTasksForDay = (day: Date) =>
    tasks.filter(t => {
      if (!t.dueDate) return false;
      const taskDate = typeof t.dueDate === 'string' ? parseISO(t.dueDate) : t.dueDate;
      return isSameDay(taskDate, day);
    });

  const handleDayClick = (day: Date) => {
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(day);
    
    if (selectedDay < today) {
      return; // Don't allow adding tasks to past dates
    }
    
    setSelectedDate(day);
    setModalTask(null);
    setTaskTitle('');
    setTaskDesc('');
    setTaskTime('09:00');
    setShowModal(true);
  };

  const handleTaskClick = (task: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalTask(task);
    setTaskTitle(task.title);
    setTaskDesc(task.description || '');
    const taskDate = typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate;
    setTaskTime(format(taskDate, 'HH:mm'));
    setSelectedDate(taskDate);
    setShowModal(true);
  };

  const handleSaveTask = () => {
    if (!taskTitle.trim() || !selectedDate) return;
    const [h, m] = taskTime.split(':').map(Number);
    const dateWithTime = setMinutes(setHours(selectedDate, h), m);
    
    if (modalTask) {
      updateTask(modalTask.id, { 
        title: taskTitle, 
        description: taskDesc, 
        dueDate: dateWithTime 
      });
    } else {
      addTask({
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDesc,
        status: 'todo',
        priority: 'medium',
        dueDate: dateWithTime,
        createdBy: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        subtasks: [],
        tags: [],
      });
    }
    setShowModal(false);
    resetModal();
  };

  const resetModal = () => {
    setTaskTitle('');
    setTaskDesc('');
    setTaskTime('09:00');
    setModalTask(null);
    setSelectedDate(null);
  };

  const handleDeleteTask = () => {
    if (modalTask) {
      deleteTask(modalTask.id);
      setShowModal(false);
      resetModal();
    }
  };

  const navigateCalendar = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentDate(new Date());
    } else if (direction === 'prev') {
      setCurrentDate(prev => {
        switch (view) {
          case 'month': return subMonths(prev, 1);
          case 'week': return addDays(prev, -7);
          case 'day': return addDays(prev, -1);
          default: return prev;
        }
      });
    } else {
      setCurrentDate(prev => {
        switch (view) {
          case 'month': return addMonths(prev, 1);
          case 'week': return addDays(prev, 7);
          case 'day': return addDays(prev, 1);
          default: return prev;
        }
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    return (
      <>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day.toString()} className={`py-2 font-semibold text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {format(day, 'EEE d')}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const dayTasks = getTasksForDay(day);
            const isDayToday = isToday(day);
            
            return (
              <div
                key={index}
                className={`group rounded-lg p-2 min-h-[120px] cursor-pointer border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                  state.darkMode 
                    ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-blue-500' 
                    : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                } ${isDayToday ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold text-sm transition-colors ${
                    isDayToday 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : state.darkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    onClick={(e) => { e.stopPropagation(); handleDayClick(day); }}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      className={`px-2 py-1 text-xs truncate rounded cursor-pointer transition-all hover:scale-105 ${
                        state.darkMode 
                          ? 'bg-blue-900/40 text-blue-100 hover:bg-blue-800' 
                          : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                      }`}
                      onClick={(e) => handleTaskClick(task, e)}
                    >
                      <div className="flex items-center space-x-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(task.priority)}`} />
                        <span className="truncate">{task.title}</span>
                      </div>
                      {task.dueDate && (
                        <span className="ml-1 text-gray-400 text-xs">
                          {format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayTasks = getTasksForDay(currentDate);
    
    return (
      <>
        <div className={`py-3 mb-4 font-semibold text-center border-b ${state.darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-200'}`}>
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {hours.map(hour => {
            const hourTasks = dayTasks.filter(task => {
              if (!task.dueDate) return false;
              const taskDate = typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate;
              return getHours(taskDate) === hour;
            });
            
            return (
              <div 
                key={hour} 
                className={`flex items-start border-b min-h-[50px] py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                  state.darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
                onClick={() => {
                  const hourDate = setHours(currentDate, hour);
                  setSelectedDate(hourDate);
                  setTaskTime(format(hourDate, 'HH:mm'));
                  setShowModal(true);
                }}
              >
                <div className={`w-16 text-xs text-right pr-4 pt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {format(setHours(new Date(), hour), 'HH:00')}
                </div>
                <div className="flex-1 space-y-1">
                  {hourTasks.map(task => (
                    <div
                      key={task.id}
                      className={`px-3 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                        state.darkMode 
                          ? 'bg-blue-900/40 text-blue-100 hover:bg-blue-800' 
                          : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                      }`}
                      onClick={(e) => handleTaskClick(task, e)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                        <span className="font-medium">{task.title}</span>
                        <span className="text-xs opacity-70">
                          {format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm')}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-xs mt-1 opacity-80">{task.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderMonthView = () => (
    <>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map(day => (
          <div key={day} className={`py-2 font-semibold text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {monthDays.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);
          
          return (
            <div
              key={index}
              className={`group rounded-lg p-2 min-h-[80px] border transition-all duration-200 ${
                startOfDay(day) < startOfDay(new Date()) 
                  ? 'cursor-not-allowed' 
                  : 'cursor-pointer hover:shadow-md hover:scale-[1.02]'
              } ${
                isCurrentMonth 
                  ? state.darkMode 
                    ? 'bg-gray-900 border-gray-700' + (startOfDay(day) >= startOfDay(new Date()) ? ' hover:bg-gray-800 hover:border-blue-500' : '')
                    : 'bg-white border-gray-200' + (startOfDay(day) >= startOfDay(new Date()) ? ' hover:bg-blue-50 hover:border-blue-300' : '')
                  : state.darkMode 
                    ? 'bg-gray-800/80 border-gray-700' + (startOfDay(day) >= startOfDay(new Date()) ? ' hover:bg-gray-700' : '')
                    : 'bg-gray-50 border-gray-200' + (startOfDay(day) >= startOfDay(new Date()) ? ' hover:bg-gray-100' : '')
              } ${isDayToday ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold text-sm transition-colors ${
                  isDayToday 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : isCurrentMonth 
                      ? state.darkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'
                      : state.darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {format(day, 'd')}
                </span>
                {startOfDay(day) >= startOfDay(new Date()) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    onClick={(e) => { e.stopPropagation(); handleDayClick(day); }}
                  >
                    <Plus size={14} />
                  </Button>
                )}
              </div>
              <div className="space-y-1">
                {dayTasks.slice(0, 2).map(task => (
                  <div
                    key={task.id}
                    className={`px-2 py-1 text-xs truncate rounded cursor-pointer transition-all hover:scale-105 ${
                      state.darkMode 
                        ? 'bg-blue-900/40 text-blue-100 hover:bg-blue-800' 
                        : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                    }`}
                    onClick={(e) => handleTaskClick(task, e)}
                  >
                    <div className="flex items-center space-x-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(task.priority)}`} />
                      <span className="truncate">{task.title}</span>
                    </div>
                    {task.dueDate && (
                      <span className="ml-1 text-gray-400 text-xs">
                        {format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm')}
                      </span>
                    )}
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="text-xs text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const getViewTitle = () => {
    switch (view) {
      case 'month': return format(currentDate, 'MMMM yyyy');
      case 'week': return `Week of ${format(startOfWeek(currentDate), 'MMM d')}`;
      case 'day': return format(currentDate, 'MMMM d, yyyy');
      default: return '';
    }
  };

  return (
    <div className={`p-6 mx-auto mt-8 max-w-5xl rounded-xl shadow-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={() => navigateCalendar('prev')} className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <ChevronLeft />
          </Button>
          <Button variant="ghost" onClick={() => navigateCalendar('today')} className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
            Today
          </Button>
          <Button variant="ghost" onClick={() => navigateCalendar('next')} className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <ChevronRight />
          </Button>
          <h2 
            className={`flex items-center ml-4 text-2xl font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${state.darkMode ? 'text-white' : 'text-gray-900'}`}
            onClick={() => setShowDatePicker(true)}
          >
            <CalendarIcon className="mr-2" />
            {getViewTitle()}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {(['month', 'week', 'day'] as const).map((viewType) => (
            <Button
              key={viewType}
              variant={view === viewType ? 'primary' : 'outline'}
              onClick={() => setView(viewType)}
              className="capitalize hover:scale-105 transition-transform"
            >
              {viewType}
            </Button>
          ))}
        </div>
      </div>
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}

      {/* Task Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={modalTask ? 'Edit Task' : 'Add Task'} size="md">
        <div className="space-y-4">
          <input
            type="text"
            className={`px-3 py-2 w-full rounded border transition-all focus:ring-2 focus:ring-blue-500 ${
              state.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            className={`px-3 py-2 w-full rounded border transition-all focus:ring-2 focus:ring-blue-500 ${
              state.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className={`px-3 py-2 w-full rounded border transition-all focus:ring-2 focus:ring-blue-500 ${
                state.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            <input
              type="time"
              className={`px-3 py-2 w-full rounded border transition-all focus:ring-2 focus:ring-blue-500 ${
                state.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="primary" onClick={handleSaveTask} className="hover:scale-105 transition-transform">
              {modalTask ? 'Update' : 'Add'} Task
            </Button>
            {modalTask && (
              <Button variant="outline" onClick={handleDeleteTask} className="hover:scale-105 transition-transform text-red-600">
                Delete
              </Button>
            )}
            <Button variant="outline" onClick={() => setShowModal(false)} className="hover:scale-105 transition-transform">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Date Picker Modal */}
      <Modal isOpen={showDatePicker} onClose={() => setShowDatePicker(false)} title="Select Date" size="sm">
        <div className="space-y-4">
          <input
            type="month"
            className={`px-3 py-2 w-full rounded border transition-all focus:ring-2 focus:ring-blue-500 ${
              state.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            value={format(currentDate, 'yyyy-MM')}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              setCurrentDate(new Date(parseInt(year), parseInt(month) - 1, 1));
              setShowDatePicker(false);
            }}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDatePicker(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => { setCurrentDate(new Date()); setShowDatePicker(false); }}>
              Today
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarView;