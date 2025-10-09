import React, { useState, useRef, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { useAuth } from "../../contexts/AuthContext";

// ===== DEFAULTS for Focus Mode =====
const DEFAULTS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  cycles: 4,
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const FocusMode: React.FC = () => {
  const { state } = useGlobalState();
  const [workDuration, setWorkDuration] = useState(DEFAULTS.work);
  const [shortBreak, setShortBreak] = useState(DEFAULTS.shortBreak);
  const [longBreak, setLongBreak] = useState(DEFAULTS.longBreak);
  const [cycles, setCycles] = useState(DEFAULTS.cycles);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [secondsLeft, setSecondsLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get total duration for current mode
  const getTotalDuration = () => {
    switch (mode) {
      case 'work': return workDuration * 60;
      case 'shortBreak': return shortBreak * 60;
      case 'longBreak': return longBreak * 60;
      default: return workDuration * 60;
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const total = getTotalDuration();
    const elapsed = total - secondsLeft;
    return (elapsed / total) * 100;
  };

  // Get background color based on mode
  const getBackgroundColor = () => {
    switch (mode) {
      case 'work': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'shortBreak': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'longBreak': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default: return 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700';
    }
  };

  // Get clock background color
  const getClockBackgroundColor = () => {
    switch (mode) {
      case 'work': return 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200';
      case 'shortBreak': return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200';
      case 'longBreak': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  // Get progress bar color
  const getProgressBarColor = () => {
    switch (mode) {
      case 'work': return 'bg-red-500';
      case 'shortBreak': return 'bg-green-500';
      case 'longBreak': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Play tick sound
  const playTickSound = () => {
    try {
      // Create a more pleasant tick sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a pleasant bell-like sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      // Fallback to simple beep if Web Audio API fails
      console.log('Web Audio API not supported, using fallback sound');
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(() => {
        // Silent fallback if audio fails
        console.log('Audio playback failed');
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if (Notification && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        handleSessionEnd();
        return 0;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [isRunning, mode, workDuration, shortBreak, longBreak, cycles]);

  // Reset when mode changes
  useEffect(() => {
    if (mode === 'work') setSecondsLeft(workDuration * 60);
    if (mode === 'shortBreak') setSecondsLeft(shortBreak * 60);
    if (mode === 'longBreak') setSecondsLeft(longBreak * 60);
  }, [mode, workDuration, shortBreak, longBreak]);

  const handleSessionEnd = () => {
    setIsRunning(false);
    if (mode === 'work') {
      if (currentCycle < cycles) {
        setMode('shortBreak');
      } else {
        setMode('longBreak');
        setCompletedSets((s) => s + 1);
      }
    } else if (mode === 'shortBreak') {
      setCurrentCycle((c) => c + 1);
      setMode('work');
    } else if (mode === 'longBreak') {
      setCurrentCycle(1);
      setMode('work');
    }

    // Play tick notification sound
    playTickSound();

    // Notification
    if (Notification && Notification.permission === 'granted') {
      new Notification('Focus Mode', {
        body:
          mode === 'work'
            ? currentCycle < cycles
              ? 'Time for a short break!'
              : 'Time for a long break!'
            : 'Back to work!',
      });
    }
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setCurrentCycle(1);
    setMode('work');
    setSecondsLeft(workDuration * 60);
  };

  const handleSaveSettings = () => {
    setShowSettings(false);
    setCurrentCycle(1);
    setMode('work');
    setSecondsLeft(workDuration * 60);
  };

  return (
    <div className={`p-6 mb-8 rounded-2xl border shadow-md transition-all duration-300 ease-in-out ${getBackgroundColor()}`}>
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Focus Mode</h3>
      <p className="mb-4 text-gray-500 dark:text-gray-400">Pomodoro Timer with advanced features</p>
      <div className="mb-4 text-center">
        <div className={`inline-block px-8 py-6 rounded-2xl mb-4 transition-all duration-300 ${getClockBackgroundColor()}`}>
          <div className="font-mono text-6xl font-bold">{formatTime(secondsLeft)}</div>
        </div>
        <div className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {mode === 'work' && 'Work Session'}
          {mode === 'shortBreak' && 'Short Break'}
          {mode === 'longBreak' && 'Long Break'}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Cycle {currentCycle} of {cycles} &bull; Sets completed: {completedSets}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 mx-auto max-w-md">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Elapsed: {formatTime(getTotalDuration() - secondsLeft)}</span>
            <span>Remaining: {formatTime(secondsLeft)}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${getProgressBarColor()}`}
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
            {Math.round(getProgressPercentage())}% Complete
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-4 space-x-2">
        {!isRunning ? (
          <Button variant="default" onClick={handleStart}>Start</Button>
        ) : (
          <Button variant="secondary" onClick={handlePause}>Pause</Button>
        )}
        <Button variant="outline" onClick={handleReset}>Reset</Button>
        <Button variant="ghost" onClick={() => setShowSettings(true)}>Settings</Button>
      </div>
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Focus Mode Settings">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className={`block mb-2 text-sm font-semibold ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Work Duration (minutes)
              </label>
              <input 
                type="number" 
                min={1} 
                max={120} 
                value={workDuration} 
                onChange={e => setWorkDuration(Number(e.target.value))} 
                className={`px-4 py-3 w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="25"
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-semibold ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Short Break (minutes)
              </label>
              <input 
                type="number" 
                min={1} 
                max={60} 
                value={shortBreak} 
                onChange={e => setShortBreak(Number(e.target.value))} 
                className={`px-4 py-3 w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="5"
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-semibold ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Long Break (minutes)
              </label>
              <input 
                type="number" 
                min={1} 
                max={60} 
                value={longBreak} 
                onChange={e => setLongBreak(Number(e.target.value))} 
                className={`px-4 py-3 w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="15"
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-semibold ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Cycles per Set
              </label>
              <input 
                type="number" 
                min={1} 
                max={10} 
                value={cycles} 
                onChange={e => setCycles(Number(e.target.value))} 
                className={`px-4 py-3 w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="4"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button 
              variant="default" 
              className="w-full py-3 text-base font-semibold rounded-xl transition-all duration-200 hover:scale-105 focus:scale-105" 
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ===== Daily Goals Component =====
const DailyGoals: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { state: authState } = useAuth();
  const [newGoal, setNewGoal] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const addGoal = () => {
    if (newGoal.trim()) {
      dispatch({ type: 'ADD_DAILY_GOAL', payload: newGoal.trim() });
      setNewGoal('');
      setShowAddForm(false);
    }
  };

  const toggleGoal = async (goal: string) => {
    if (state.completedGoals.includes(goal)) {
      dispatch({ type: 'UNDO_DAILY_GOAL', payload: goal });
    } else {
      dispatch({ type: 'COMPLETE_DAILY_GOAL', payload: goal });
      
      // Update streak on backend when goal is completed
      try {
        const response = await fetch('/api/user/streak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.sessionToken}`
          },
          body: JSON.stringify({ activity: goal })
        });
        
        if (response.ok) {
          const data = await response.json();
          dispatch({ 
            type: 'SET_USER', 
            payload: {
              ...state.user,
              streak: data.currentStreak
            }
          });
        }
      } catch (error) {
        console.error('Error updating streak:', error);
      }
    }
  };

  return (
    <>
      <FocusMode />
      
      <div className={`rounded-2xl p-6 border transition-all duration-300 ease-in-out shadow-md ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Daily Goals
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex gap-1 items-center px-3 py-2 text-white bg-blue-600 rounded-lg shadow transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden text-sm sm:inline">Add</span>
          </button>
        </div>

        {showAddForm && (
          <div className="mb-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter your goal..."
                className={`flex-1 px-4 py-2 rounded-lg border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  state.darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              />
              <button
                onClick={addGoal}
                className="flex justify-center items-center px-4 py-2 text-white bg-green-600 rounded-lg transition-all duration-200 hover:bg-green-700"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {state.dailyGoals.length === 0 && state.completedGoals.length === 0 ? (
            <p className={`text-center py-8 italic ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No goals set for today. Add one to get started!
            </p>
          ) : (
            state.dailyGoals.map((goal, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm transition-all duration-200 ${
                  state.darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-100'
                }`}
              >
                <button
                  onClick={() => toggleGoal(goal)}
                  className="flex justify-center items-center w-6 h-6 rounded-full border-2 border-green-500 transition-all duration-200 hover:bg-green-500 group"
                >
                  <Check className="w-3 h-3 text-transparent transition-colors group-hover:text-white" />
                </button>
                <p className={`flex-1 text-base font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {goal}
                </p>
              </div>
            ))
          )}
        </div>

        {state.completedGoals.length > 0 && (
          <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wide ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Completed Today ({state.completedGoals.length})
            </h4>
            <div className="space-y-3">
              {state.completedGoals.map((goal, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                    state.darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <button
                    onClick={() => toggleGoal(goal)}
                    className="flex justify-center items-center w-5 h-6 bg-green-500 rounded-full transition-colors duration-200 hover:bg-red-500"
                    title="Undo"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </button>
                  <p className={`flex-1 text-sm line-through ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DailyGoals;
