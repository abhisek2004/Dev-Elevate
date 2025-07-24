import React from 'react';
import { MessageSquare, FileText, Target, BookOpen, Code, Brain } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

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
    },
    {
      title: 'course suggestions',
      description: 'Learn courses',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      onClick: () => navigate('/course-suggestions')
    }
  ];

  return (
    <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
      <h3 className={`text-xl font-semibold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`p-4 rounded-lg border ${state.darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-all hover:shadow-md group`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h4 className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {action.title}
                  </h4>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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