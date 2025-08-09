import React, { useRef, useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { delay, scale, useInView } from 'framer-motion';
import {motion} from 'framer-motion';

const DailyGoals: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [newGoal, setNewGoal] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

   const ref=useRef(null)
  const inView=useInView(ref, {once:true})

  const addGoal = () => {
    if (newGoal.trim()) {
      dispatch({ type: 'ADD_DAILY_GOAL', payload: newGoal.trim() });
      setNewGoal('');
      setShowAddForm(false);
    }
  };

  const toggleGoal = (goal: string) => {
    if (state.completedGoals.includes(goal)) {
      dispatch({ type: 'UNDO_DAILY_GOAL', payload: goal });
    } else {
      dispatch({ type: 'COMPLETE_DAILY_GOAL', payload: goal });
    }
  };

  const containerVariant={
    hidden:{opacity:0, x:20},
    visible:{opacity:1, x:0},
    transition:{
     delay:0.2}
    

  }

  const childVariant={
    hidden:{opacity:0, y:-12},
    visible:{opacity:1, y:0},
    transition:{delay:0.5, ease:'easeOut'}
  }
  
  return (
    <motion.div 
     ref={ref}
     variants={containerVariant}
     initial='hidden'
     animate={inView? 'visible': 'hidden'}
    className={`rounded-2xl p-6 border transition-all duration-300 ease-in-out shadow-md ${state.darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} `}>
      <div className="flex items-center justify-between mb-6">
        <motion.h3 
        ref={ref}
        variants={childVariant}
        initial='hidden'
        animate={inView? 'visible':'hidden' }
        

        className={`text-2xl font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Daily Goals
        </motion.h3>
        <motion.button
         ref={ref}
         initial={{}}
         animate={inView? {transition:{staggerChildren:0.2,
           delayChildren:0.2}}:{}}
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <motion.span
           initial={{opacity:0, y:-12}}
           animate={{opacity:1, y:0}}
           transition={{delay:0.5, type:'spring', stiffness:200, damping:6}}

          className="text-sm hidden sm:inline">Add
          </motion.span>
      </motion.button>
      </div>

      {showAddForm && (
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter your goal..."
              className={`flex-1 px-4 py-2 rounded-lg border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                state.darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            />
            <button
              onClick={addGoal}
              className="px-4 py-2 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition--all duration-200"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {state.dailyGoals.length === 0 && state.completedGoals.length === 0 ? (
          <p className={`text-center py-8 italic  ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
                className=" w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center
            hover:bg-green-500 group transition-all duration-200"
              >
                <Check className="w-3 h-3 text-transparent group-hover:text-white transition-colors" />
              </button>
              <p className={`flex-1 text-base font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {goal}
              </p>
            </div>
          ))
        )}
      </div>

      {state.completedGoals.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                  className="w-5 h-6 rounded-full flex items-center justify-center bg-green-500 hover:bg-red-500 transition-colors duration-200"
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
    </motion.div>
  );
};

export default DailyGoals;
