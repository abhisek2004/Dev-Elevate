import React, { useRef } from 'react';
import { BookOpen, Code, Brain, Database, ArrowRight } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import {motion, useInView} from 'framer-motion'

const ProgressWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate= useNavigate()

  const ref=useRef(null)
  const inView=useInView(ref, {once:true})


  const learningTracks = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      icon: Code,
      progress: 65,
      color: 'from-blue-500 to-cyan-500',
      modules: 12,
      completed: 8
    },
    {
      id: 'java',
      title: 'Java Programming',
      icon: BookOpen,
      progress: 78,
      color: 'from-orange-500 to-red-500',
      modules: 10,
      completed: 8
    },
    {
      id: 'mern',
      title: 'MERN Stack',
      icon: Database,
      progress: 45,
      color: 'from-green-500 to-teal-500',
      modules: 15,
      completed: 7
    },
    {
      id: 'aiml',
      title: 'AI/ML & Data Science',
      icon: Brain,
      progress: 32,
      color: 'from-purple-500 to-pink-500',
      modules: 18,
      completed: 6
    }
  ];
  const handleViewAllClick = () => {
    navigate("/learning")
  }

  const containerVariant={
    hidden:{},
    visible:{transition:{staggerChildren:0.2, delayChildren:0.2}}
  }

  const childVariant={
    hidden:{opacity:0, x:-20},
    visible:{opacity:1, x:0},
    transition:{type:'spring',
      damping:5, 
      stiffness:200
    }
    
  }

  return (
    <motion.div 
    ref={ref}
     initial={{opacity:0, x:-20}}
     animate={inView? {opacity:1, x:0}:{opacity:0, x:-20}}
     transition={{duration:0.5, delay:0.5}}
    className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <motion.h3 
        ref={ref}
        initial={{opacity:0, y:-12}}
      animate={inView? {opacity:1, y:0}:{opacity:0, y:-12}}
      transition={{delay:0.3,
        type:'spring',
        stiffness:100,
        damping:6}}
        className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Learning Progress
        </motion.h3>
<button
  className="flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors duration-150 hover:text-blue-600"
  onClick={handleViewAllClick}
>
  <motion.span
      ref={ref}
      initial={{opacity:0, y:-12}}
      animate={inView?{opacity:1, y:0}:{opacity:0, y:-12}}
      transition={{delay:0.5,
        type:'spring',
        stiffness:100,
        damping:5
      }} 
  >
    View All
  </motion.span>
  <ArrowRight className='w-4 h-4'/>
</button>
      </div>

      <motion.div
      ref={ref} 
      initial='hidden'
      animate={inView? 'visible':'hidden'}
      className="space-y-4">
        {learningTracks.map((track) => {
          const Icon = track.icon;
          return (
            <motion.div 
             variants={childVariant}
            key={track.id} className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${track.color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {track.title}
                  </h4>
                  <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {track.completed}/{track.modules} modules
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${track.color}`}
                    style={{ width: `${track.progress}%` }}
                  ></div>
                </div>
                <p className={`text-sm mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {track.progress}% Complete
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default ProgressWidget;