import React from 'react';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const NewsWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate= useNavigate()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'jobs':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'internships':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'events':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  const handleClick = () => {
      navigate('/news')
  }
  return (
    <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm transition-colors duration-200`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-2xl font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Latest Tech News & Updates
        </h3>
<button
  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-150"
  onClick={handleClick}
>
  <span>View All</span>
  <ArrowRight className='w-4 h-5'/>
</button>
      </div>

      <div className="space-y-4">
        {state.newsItems.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(item.publishDate), 'MMM dd')}</span>
              </div>
            </div>
            <h4 className={`text-base font-semibold leading-snug mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h4>
            <p className={`text-sm mb-3  leading-relaxed ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.summary}
            </p>
            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-150">
              <span>Read More</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;


