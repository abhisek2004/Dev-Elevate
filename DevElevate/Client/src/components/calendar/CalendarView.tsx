import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useTasks } from '../../contexts/AppContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, parseISO, isSameWeek, isWithinInterval, setHours, setMinutes, getHours, getMinutes } from 'date-fns';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonthGrid = (date: Date) => {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
  const endDate = endOfWeek(endMonth, { weekStartsOn: 0 });
  const days = [];
  let curr = startDate;
  while (curr <= endDate) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

const getWeekDays = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

 const CalendarView: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { state } = useGlobalState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTask, setModalTask] = useState<any>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Safety check for tasks
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

  // Modal state for creating/editing
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskTime, setTaskTime] = useState('12:00');

  // Filter tasks/events for a given day
  const getTasksForDay = (day: Date) =>
    tasks.filter(t => {
      if (!t.dueDate) return false;
      const d = typeof t.dueDate === 'string' ? parseISO(t.dueDate) : t.dueDate;
      return isSameDay(d, day);
    });

  // Filter tasks/events for a given week
  const getTasksForWeek = (weekStart: Date) =>
    tasks.filter(t => {
      if (!t.dueDate) return false;
      const d = typeof t.dueDate === 'string' ? parseISO(t.dueDate) : t.dueDate;
      return isSameWeek(d, weekStart, { weekStartsOn: 0 });
    });

  // Filter tasks/events for a given day and hour
  const getTasksForDayAndHour = (day: Date, hour: number) =>
    getTasksForDay(day).filter(t => {
      if (!t.dueDate) return false;
      const d = typeof t.dueDate === 'string' ? parseISO(t.dueDate) : t.dueDate;
      return getHours(d) === hour;
    });

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setModalTask(null);
    setTaskTime('12:00');
    setShowModal(true);
  };

  const handleTaskClick = (task: any) => {
    setModalTask(task);
    setSelectedDate(task.dueDate ? (typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate) : null);
    setTaskTime(task.dueDate ? format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm') : '12:00');
    setShowModal(true);
  };

  const handlePrev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(addDays(currentDate, -7));
    else setCurrentDate(addDays(currentDate, -1));
  };
  const handleNext = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(addDays(currentDate, 7));
    else setCurrentDate(addDays(currentDate, 1));
  };
  const handleToday = () => setCurrentDate(new Date());

  const handleSaveTask = () => {
    if (!taskTitle.trim() || !selectedDate) return;
    const [h, m] = taskTime.split(':').map(Number);
    const dateWithTime = setMinutes(setHours(selectedDate, h), m);
    if (taskId) {
      updateTask(taskId, { title: taskTitle, description: taskDesc, dueDate: dateWithTime });
    } else {
      addTask({
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDesc,
        status: 'todo',
        priority: 'medium',
        dueDate: dateWithTime,
        createdBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        subtasks: [],
        tags: [],
      });
    }
    setShowModal(false);
    setTaskTitle('');
    setTaskDesc('');
    setTaskId(null);
    setModalTask(null);
    setTaskTime('12:00');
  };

  const handleDeleteTask = () => {
    if (modalTask) {
      deleteTask(modalTask.id);
      setShowModal(false);
      setModalTask(null);
    }
  };

  // Populate modal fields when editing
  React.useEffect(() => {
    if (modalTask) {
      setTaskTitle(modalTask.title);
      setTaskDesc(modalTask.description);
      setTaskId(modalTask.id);
      setTaskTime(modalTask.dueDate ? format(typeof modalTask.dueDate === 'string' ? parseISO(modalTask.dueDate) : modalTask.dueDate, 'HH:mm') : '12:00');
    } else {
      setTaskTitle('');
      setTaskDesc('');
      setTaskId(null);
      setTaskTime('12:00');
    }
  }, [modalTask]);

  // Renderers for different views
  const renderMonthView = () => {
    const days = getDaysInMonthGrid(currentDate);
    return (
      <>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className={`py-2 font-semibold text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const dayTasks = getTasksForDay(day);
            return (
              <div
                key={i}
                className={`rounded-lg p-2 min-h-[80px] cursor-pointer border transition-all ${isCurrentMonth ? (state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200') : (state.darkMode ? 'bg-gray-800 border-gray-800' : 'bg-gray-100 border-gray-100')} ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold text-sm ${isCurrentMonth ? (state.darkMode ? 'text-white' : 'text-gray-900') : (state.darkMode ? 'text-gray-600' : 'text-gray-400')}`}>{format(day, 'd')}</span>
                  <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); handleDayClick(day); }}><Plus size={14} /></Button>
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map(task => (
                    <div
                      key={task.id}
                      className={`px-2 py-1 mb-1 text-xs truncate rounded cursor-pointer ${state.darkMode ? 'bg-blue-900/40 text-blue-100 hover:bg-blue-800' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'}`}
                      onClick={e => { e.stopPropagation(); handleTaskClick(task); }}
                    >
                      {task.title} {task.dueDate && (<span className="ml-1 text-gray-400">{format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm')}</span>)}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-400">+{dayTasks.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const weekDaysArr = getWeekDays(currentDate);
    return (
      <>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="py-2 font-semibold text-center text-gray-700 dark:text-gray-300">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDaysArr.map((day, i) => {
            const isToday = isSameDay(day, new Date());
            const dayTasks = getTasksForDay(day);
            return (
              <div
                key={i}
                className={`rounded-lg p-2 min-h-[80px] cursor-pointer border transition-all ${state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>{format(day, 'EEE d')}</span>
                  <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); handleDayClick(day); }}><Plus size={14} /></Button>
                </div>
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      className={`px-2 py-1 mb-1 text-xs truncate rounded cursor-pointer ${state.darkMode ? 'bg-blue-900/40 text-blue-100 hover:bg-blue-800' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'}`}
                      onClick={e => { e.stopPropagation(); handleTaskClick(task); }}
                    >
                      {task.title} {task.dueDate && (<span className="ml-1 text-gray-400">{format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm')}</span>)}
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
    return (
      <>
        <div className={`py-2 mb-2 font-semibold text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {hours.map(hour => {
            const hourTasks = getTasksForDayAndHour(currentDate, hour);
            return (
              <div key={hour} className={`flex items-center border-b min-h-[40px] ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="pr-2 w-16 text-xs text-right text-gray-400">{format(setHours(currentDate, hour), 'HH:00')}</div>
                <div className="flex-1">
                  {hourTasks.map(task => (
                    <div
                      key={task.id}
                      className={`inline-block px-2 py-1 mr-2 mb-1 text-xs rounded cursor-pointer ${state.darkMode ? 'bg-blue-900/40 text-blue-100 hover:bg-blue-800' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'}`}
                      onClick={() => handleTaskClick(task)}
                    >
                      {task.title} {task.dueDate && (<span className="ml-1 text-gray-400">{format(typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate, 'HH:mm')}</span>)}
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

  return (
    <div className={`p-6 mx-auto mt-8 max-w-5xl rounded-xl shadow-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={handlePrev}><ChevronLeft /></Button>
          <Button variant="ghost" onClick={handleToday}>Today</Button>
          <Button variant="ghost" onClick={handleNext}><ChevronRight /></Button>
          <h2 className={`flex items-center ml-4 text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            <CalendarIcon className="mr-2" />
            {view === 'month' ? format(currentDate, 'MMMM yyyy') : view === 'week' ? `Week of ${format(startOfWeek(currentDate), 'MMM d')}` : format(currentDate, 'MMMM d, yyyy')}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={view === 'month' ? 'primary' : 'outline'} onClick={() => setView('month')}>Month</Button>
          <Button variant={view === 'week' ? 'primary' : 'outline'} onClick={() => setView('week')}>Week</Button>
          <Button variant={view === 'day' ? 'primary' : 'outline'} onClick={() => setView('day')}>Day</Button>
        </div>
      </div>
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}
      {/* Modal for creating/editing tasks */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={modalTask ? 'Edit Task' : 'Add Task'} size="md">
        <div className="space-y-4">
          <input
            type="text"
            className="px-3 py-2 w-full rounded border"
            placeholder="Task title"
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
          />
          <textarea
            className="px-3 py-2 w-full rounded border"
            placeholder="Description"
            value={taskDesc}
            onChange={e => setTaskDesc(e.target.value)}
          />
          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              className="px-3 py-2 w-full rounded border"
              value={taskTime}
              onChange={e => setTaskTime(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="primary" onClick={handleSaveTask}>{modalTask ? 'Update' : 'Add'} Task</Button>
            {modalTask && <Button variant="danger" onClick={handleDeleteTask}>Delete</Button>}
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}; 
export default CalendarView;