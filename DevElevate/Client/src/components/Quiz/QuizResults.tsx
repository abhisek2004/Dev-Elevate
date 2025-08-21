import React from 'react';
import { ArrowLeft, Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

interface QuizResultsProps {
  results: {
    score: number;
    totalQuestions: number;
    percentage: number;
    timeTaken: number;
  };
  onBack: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onBack }) => {
  const { state } = useGlobalState();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 75) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 60) return { level: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const performance = getPerformanceLevel(results.percentage);

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`border-b ${state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">Quiz Results</h1>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className={`rounded-lg border p-8 text-center ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Score Circle */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={state.darkMode ? '#374151' : '#e5e7eb'}
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={results.percentage >= 75 ? '#10b981' : results.percentage >= 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(results.percentage / 100) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{results.percentage}%</div>
                <div className="text-sm text-gray-500">Score</div>
              </div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${performance.bgColor} ${performance.color}`}>
            <Trophy className="h-4 w-4 mr-2" />
            {performance.level}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{results.score}</div>
              <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Correct Answers</div>
            </div>

            <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-center mb-2">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600">{results.totalQuestions - results.score}</div>
              <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Incorrect Answers</div>
            </div>

            <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{formatTime(results.timeTaken)}</div>
              <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Taken</div>
            </div>
          </div>

          {/* Feedback Message */}
          <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
            <h3 className="font-semibold mb-2">Feedback</h3>
            <p className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {results.percentage >= 90 && "Outstanding performance! You have excellent knowledge in this area."}
              {results.percentage >= 75 && results.percentage < 90 && "Great job! You have a solid understanding of the material."}
              {results.percentage >= 60 && results.percentage < 75 && "Good effort! Consider reviewing the topics you missed."}
              {results.percentage < 60 && "Keep practicing! Review the material and try again to improve your score."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                state.darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;