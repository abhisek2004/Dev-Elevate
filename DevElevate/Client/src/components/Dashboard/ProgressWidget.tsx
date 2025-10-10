import React, { useEffect, useState } from 'react';
import { BookOpen, Code, Brain, Database, ArrowRight } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

interface LearningTrack {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  modules: number;
  completed: number;
}

const ProgressWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();
  const [learningTracks, setLearningTracks] = useState<LearningTrack[]>([
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      modules: 12,
      completed: 0 // Initialize as 0 for new users
    },
    {
      id: 'java',
      title: 'Java Programming',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      modules: 10,
      completed: 0
    },
    {
      id: 'mern',
      title: 'MERN Stack',
      icon: Database,
      color: 'from-green-500 to-teal-500',
      modules: 15,
      completed: 0
    },
    {
      id: 'aiml',
      title: 'AI/ML & Data Science',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      modules: 18,
      completed: 0
    }
  ]);

  // Simulate fetching user progress from an API or local storage
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        // Simulated API call to fetch user-specific progress
        const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        const updatedTracks = learningTracks.map(track => ({
          ...track,
          completed: userProgress[track.id]?.completed || 0
        }));
        setLearningTracks(updatedTracks);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };
    fetchUserProgress();
  }, []);

  // Function to update progress (e.g., when a module is completed)
  const updateProgress = (trackId: string, completed: number) => {
    const updatedTracks = learningTracks.map(track =>
      track.id === trackId ? { ...track, completed } : track
    );
    setLearningTracks(updatedTracks);

    // Save updated progress to local storage (or send to API)
    const userProgress = updatedTracks.reduce((acc, track) => ({
      ...acc,
      [track.id]: { completed: track.completed }
    }), {});
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  };

  const handleViewAllClick = () => {
    navigate("/learning");
  };

  return (
    <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Learning Progress
        </h3>
        <button
          className="flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors duration-150 hover:text-blue-600"
          onClick={handleViewAllClick}
        >
          <span>View All</span>
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>

      <div className="space-y-4">
        {learningTracks.map((track) => {
          const Icon = track.icon;
          const progress = Math.round((track.completed / track.modules) * 100);
          return (
            <div key={track.id} className="flex items-center space-x-4">
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
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className={`text-sm mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {progress}% Complete
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressWidget;