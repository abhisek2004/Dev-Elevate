import React from 'react';
import { MessageSquare, FileText, Target, Code, Brain } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      onClick: () => navigate('/quiz')
    },
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
    }
  ];

  return (
    <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm transition-colors duration-300`}>
      <h3 className={`text-2xl font-semibold tracking-tight mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
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
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;