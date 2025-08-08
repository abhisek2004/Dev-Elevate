import React from 'react';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import {motion} from 'framer-motion';

const StatsCards: React.FC = () => {
  const { state } = useGlobalState();

  const stats = [
    {
      title: 'Total Points',
      value: state.user?.totalPoints || 0,
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Current Streak',
      value: state.user?.streak || 0,
      icon: Calendar,
      color: 'from-green-500 to-teal-500',
      textColor: 'text-green-600',
      suffix: ' days'
    },
    {
      title: 'Completed Goals',
      value: state.completedGoals.length,
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Learning Progress',
      value: Object.keys(state.learningProgress).length,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600',
      suffix: ' modules'
    }
  ];

  // animations
   const containerVariants={
    hidden:{},
    visible:{transition:{staggerChildren:0.2}}

  }

  const childVariants={
    hidden:{opacity:0, y:-10},
    visible:{opacity:1, y:0, },
    transition:{
      type: "inertia",
  velocity: 20,
  bounceStiffness: 200,
  bounceDamping: 20
      
    }
  }


  return (
    <motion.div 
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            variants={childVariants}
            key={index}
            className={`${
              state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 mb-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className={`text-2xl font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}{stat.suffix || ''}
                </p>
                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.title}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-300`}
                style={{ width: `${Math.min(100, (stat.value / 100) * 100)}%` }}
              ></div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsCards;