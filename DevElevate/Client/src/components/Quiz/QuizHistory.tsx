import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Calendar } from 'lucide-react';
import axiosInstance from '../../api/axiosinstance';
import { useGlobalState } from '../../contexts/GlobalContext';

interface QuizAttempt {
  _id: string;
  quizId: {
    title: string;
    topic?: string;
    difficulty: string;
    type: string;
  };
  score: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt: string;
}

const QuizHistory: React.FC = () => {
  const { state } = useGlobalState();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizAttempts();
  }, []);

  const fetchQuizAttempts = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/quiz/attempts');
      setAttempts(response.data.slice(0, 2));
    } catch (error) {
      console.error('Error fetching quiz attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div data-aos="fade-up" data-aos-delay="100" className={`rounded-lg border p-6 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-4">Recent Quiz Attempts</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-16 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-aos="fade-up" data-aos-delay="120" className={`rounded-lg border p-6 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className="text-lg font-semibold mb-4">Recent Quiz Attempts</h3>
      
      {attempts.length === 0 ? (
        <div className={`text-center py-8 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No quiz attempts yet</p>
          <p className="text-sm">Take your first quiz to see results here!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map((attempt, index) => {
            const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
            return (
              <div
                key={attempt._id}
                data-aos="fade-up"
                data-aos-delay={`${index * 120}`}
                className={`p-4 rounded-lg border ${state.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{attempt.quizId.title}</h4>
                    <div className="flex items-center space-x-4 text-sm mt-1">
                      <span className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {attempt.quizId.topic || attempt.quizId.type}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(attempt.timeTaken)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${getScoreColor(percentage)}`}>
                      {percentage}%
                    </div>
                    <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {attempt.score}/{attempt.totalQuestions}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
