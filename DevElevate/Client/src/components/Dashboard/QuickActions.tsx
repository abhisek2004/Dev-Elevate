import React, { useRef } from 'react';
import { MessageSquare, FileText, Target, Code } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import {motion, useInView}from 'framer-motion'

const QuickActions: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

  const ref=useRef(null)
  const inView=useInView(ref, {once:true})
  

  const actions = [
    {
      title: 'Study Buddy',
      description: 'Get AI help with your queries',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/chatbot')
    },
    {
      title: 'Resume Builder',
      description: 'Create ATS-friendly resume',
      icon: FileText,
      color: 'from-green-500 to-teal-500',
      onClick: () => navigate('/resume')
    },
    {
      title: 'Practice DSA',
      description: 'Solve coding problems',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/learning?track=dsa')
    },
    {
      title: 'Mock Interview',
      description: 'Prepare for interviews',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      onClick: () => navigate('/placement')
    }
  ];

  const containerVariant={
    hidden:{},
    visible:{transition:{staggerChildren:0.2, delayChildren:0.2}}

  }

  const childVariants={
    hidden:{opacity:0, y:-20},
    visible:{opacity:1, y:0},
    transition:{type:'spring', damping:5, stiffness:200}
  }

  return (
    <motion.div 
    ref={ref}
    initial={{opacity:0, x:20}}
     animate={inView?{opacity:1, x:0}:{opacity:0, x:20}}
     transition={{duration:0.5, delay:0.5}}
    className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm transition-colors duration-300`}>
      <motion.h3
       ref={ref}
      initial={{opacity:0, y:-12}}
      animate={inView? {opacity:1, y:0}:{opacity:0, y:-12}}
      transition={{delay:0.2,
        type:'spring',
        stiffness:100,
        damping:6
      }} 
      className={`text-2xl font-semibold tracking-tight mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Quick Actions
      </motion.h3>
      <motion.div 
       ref={ref}
       variants={containerVariant}
       initial='hidden'
       animate={inView? 'visible':'hidden'}
      className="grid grid-cols-1 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              variants={childVariants}
              key={index}
              onClick={action.onClick}
              className={`p-4 rounded-xl border w-full text-left ${state.darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-all hover:shadow-md group`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <h4 className={`text-sm font-semibold leading-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {action.title}
                  </h4>
                  <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;