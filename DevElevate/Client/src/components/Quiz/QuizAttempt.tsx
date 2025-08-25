import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import axiosInstance from '../../api/axiosinstance';
import { useGlobalState } from '../../contexts/GlobalContext';

interface Question {
  _id: string;
  questionText: string;
  options?: string[];
}

interface Quiz {
  _id: string;
  title: string;
  type: 'MCQ' | 'Code';
  difficulty: string;
}

interface QuizAttemptProps {
  quiz: Quiz;
  onComplete: (results: any) => void;
  onBack: () => void;
}

const QuizAttempt: React.FC<QuizAttemptProps> = ({ quiz, onComplete, onBack }) => {
  const { state } = useGlobalState();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft, questions.length]);

  const fetchQuizQuestions = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/quiz/${quiz._id}`);
      setQuestions(response.data.questions);
      setTimeLeft(response.data.questions.length * 120); // 2 minutes per question
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const formattedAnswers = Object.entries(answers).map(([questionId, userAnswer]) => ({
        questionId,
        userAnswer
      }));

      const response = await axiosInstance.post(`/api/v1/quiz/${quiz._id}/submit`, {
        answers: formattedAnswers,
        timeTaken
      });

      onComplete(response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`border-b ${state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">{quiz.title}</h1>
              <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className={`w-full bg-gray-200 rounded-full h-2 ${state.darkMode ? 'bg-gray-700' : ''}`}>
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className={`rounded-lg border p-6 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className="text-xl font-medium mb-6">{currentQ.questionText}</h2>

          {quiz.type === 'MCQ' && currentQ.options ? (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                    answers[currentQ._id] === option
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : state.darkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQ._id}
                    value={option}
                    checked={answers[currentQ._id] === option}
                    onChange={(e) => handleAnswerChange(currentQ._id, e.target.value)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[currentQ._id] || ''}
              onChange={(e) => handleAnswerChange(currentQ._id, e.target.value)}
              placeholder="Enter your code here..."
              className={`w-full h-64 p-4 border rounded-lg font-mono text-sm ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-300'
              }`}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[questions[index]._id]
                    ? 'bg-green-100 text-green-700'
                    : state.darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;