import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { startAIMockInterview, updateInterviewSession } from '../../api/placementApi';
import { Mic, MicOff, Play, Pause, Square, Send, Clock, Star } from 'lucide-react';

interface Question {
    question: string;
    type: string;
    difficulty: string;
    answer?: string;
    feedback?: string;
    score?: number;
}

interface AIMockInterviewProps {
    onClose: () => void;
    onComplete: (session: any) => void;
}

const AIMockInterview: React.FC<AIMockInterviewProps> = ({ onClose, onComplete }) => {
    const { state } = useGlobalState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    const [interviewConfig, setInterviewConfig] = useState({
        category: 'Technical',
        difficulty: 'Intermediate',
        duration: 30
    });

    const questions: Question[] = [
        {
            question: "Explain the concept of closures in JavaScript and provide a practical example.",
            type: "Technical",
            difficulty: "Intermediate"
        },
        {
            question: "How would you handle a situation where a team member is not meeting their deadlines?",
            type: "Behavioral",
            difficulty: "Intermediate"
        },
        {
            question: "Design a system for handling user authentication and authorization.",
            type: "System Design",
            difficulty: "Intermediate"
        }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(prev => prev + 1);
    }, [isRecording]);

    const startInterview = async () => {
        setIsLoading(true);
        try {
            // In a real implementation, this would call the AI service
            const mockSession = {
                _id: 'mock-session-1',
                type: 'AI Mock',
                category: interviewConfig.category,
                difficulty: interviewConfig.difficulty,
                duration: interviewConfig.duration,
                questions: questions.map(q => ({ ...q, answer: '', feedback: '', score: 0 })),
                status: 'In Progress',
                startedAt: new Date().toISOString()
            };

            setSession(mockSession);
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting interview:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        setIsPlaying(false);
    };

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    const handleAnswerSubmit = () => {
        if (!currentAnswer.trim()) return;

        // Update the current question with the answer
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].answer = currentAnswer;

        // Simulate AI feedback
        updatedQuestions[currentQuestionIndex].feedback = generateMockFeedback(
            updatedQuestions[currentQuestionIndex].question,
            currentAnswer,
            updatedQuestions[currentQuestionIndex].type
        );

        updatedQuestions[currentQuestionIndex].score = Math.floor(Math.random() * 4) + 6; // 6-10 score

        setCurrentAnswer('');

        // Move to next question or complete interview
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            completeInterview(updatedQuestions);
        }
    };

    const generateMockFeedback = (question: string, answer: string, type: string): string => {
        const feedbacks = {
            'Technical': [
                'Good technical understanding. Consider providing more specific examples.',
                'Excellent explanation with good examples. Well done!',
                'Good start, but try to elaborate more on the implementation details.'
            ],
            'Behavioral': [
                'Good use of STAR method. Provide more specific metrics if possible.',
                'Excellent behavioral response with clear examples.',
                'Good structure, but try to include more quantifiable results.'
            ],
            'System Design': [
                'Good high-level approach. Consider scalability and edge cases.',
                'Excellent system design thinking. Well-considered trade-offs.',
                'Good start, but think about failure scenarios and monitoring.'
            ]
        };

        const typeFeedbacks = feedbacks[type as keyof typeof feedbacks] || feedbacks['Technical'];
        return typeFeedbacks[Math.floor(Math.random() * typeFeedbacks.length)];
    };

    const completeInterview = (finalQuestions: Question[]) => {
        const overallScore = Math.round(
            finalQuestions.reduce((sum, q) => sum + (q.score || 0), 0) / finalQuestions.length
        );

        const completedSession = {
            ...session,
            questions: finalQuestions,
            status: 'Completed',
            endedAt: new Date().toISOString(),
            feedback: {
                overallScore,
                strengths: ['Good technical knowledge', 'Clear communication'],
                areasForImprovement: ['Provide more examples', 'Consider edge cases'],
                generalFeedback: 'Overall good performance. Keep practicing!',
                technicalSkills: overallScore,
                communicationSkills: overallScore - 1,
                problemSolving: overallScore
            }
        };

        setSession(completedSession);
        setShowFeedback(true);
        onComplete(completedSession);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!session) {
        return (
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
                <div className={`max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        AI Mock Interview Setup
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Interview Category
                            </label>
                            <select
                                value={interviewConfig.category}
                                onChange={(e) => setInterviewConfig(prev => ({ ...prev, category: e.target.value }))}
                                className={`w-full p-3 rounded-lg border ${state.darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="Technical">Technical</option>
                                <option value="HR">HR</option>
                                <option value="Behavioral">Behavioral</option>
                                <option value="System Design">System Design</option>
                            </select>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Difficulty Level
                            </label>
                            <select
                                value={interviewConfig.difficulty}
                                onChange={(e) => setInterviewConfig(prev => ({ ...prev, difficulty: e.target.value }))}
                                className={`w-full p-3 rounded-lg border ${state.darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Duration (minutes)
                            </label>
                            <select
                                value={interviewConfig.duration}
                                onChange={(e) => setInterviewConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                                className={`w-full p-3 rounded-lg border ${state.darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                                <option value={60}>60 minutes</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className={`flex-1 px-4 py-2 rounded-lg border ${state.darkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={startInterview}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Starting...' : 'Start Interview'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showFeedback) {
        return (
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
                <div className={`max-w-2xl w-full mx-4 p-6 rounded-2xl shadow-xl ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Interview Complete! 🎉
                    </h2>

                    <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            {session.feedback?.overallScore}/10
                        </div>
                        <div className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Overall Score
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className={`p-4 rounded-lg text-center ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="text-2xl font-bold text-green-600">{session.feedback?.technicalSkills}</div>
                            <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Technical Skills</div>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="text-2xl font-bold text-blue-600">{session.feedback?.communicationSkills}</div>
                            <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Communication</div>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="text-2xl font-bold text-purple-600">{session.feedback?.problemSolving}</div>
                            <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Problem Solving</div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <h4 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Strengths:</h4>
                            <ul className={`list-disc list-inside space-y-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {session.feedback?.strengths.map((strength: string, index: number) => (
                                    <li key={index}>{strength}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Areas for Improvement:</h4>
                            <ul className={`list-disc list-inside space-y-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {session.feedback?.areasForImprovement.map((area: string, index: number) => (
                                    <li key={index}>{area}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className={`max-w-4xl w-full mx-4 p-6 rounded-2xl shadow-xl ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            AI Mock Interview - {interviewConfig.category}
                        </h2>
                        <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                            <Clock className="w-4 h-4" />
                            <span className={`font-mono ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {formatTime(timeElapsed)}
                            </span>
                        </div>

                        <button
                            onClick={stopRecording}
                            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                            <Square className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Question */}
                <div className={`p-6 rounded-xl mb-6 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                            Q
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-lg font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {questions[currentQuestionIndex].question}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm">
                                <span className={`px-2 py-1 rounded-full ${state.darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    {questions[currentQuestionIndex].type}
                                </span>
                                <span className={`px-2 py-1 rounded-full ${state.darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    {questions[currentQuestionIndex].difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Answer Input */}
                <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Your Answer:
                    </label>
                    <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        rows={6}
                        className={`w-full p-4 rounded-lg border resize-none ${state.darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                    />
                </div>

                {/* Previous Feedback */}
                {questions[currentQuestionIndex].feedback && (
                    <div className={`p-4 rounded-xl mb-6 ${state.darkMode ? 'bg-gray-700' : 'bg-green-50'
                        }`}>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                                ✓
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-green-800'}`}>
                                    AI Feedback
                                </h4>
                                <p className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-green-700'}`}>
                                    {questions[currentQuestionIndex].feedback}
                                </p>
                                {questions[currentQuestionIndex].score && (
                                    <div className="flex items-center space-x-1 mt-2">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className={`text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-green-700'}`}>
                                            Score: {questions[currentQuestionIndex].score}/10
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`p-3 rounded-lg ${isRecording
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-gray-600 text-white hover:bg-gray-700'
                                }`}
                        >
                            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={togglePlayback}
                            className={`p-3 rounded-lg ${isPlaying
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-600 text-white hover:bg-gray-700'
                                }`}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                    </div>

                    <button
                        onClick={handleAnswerSubmit}
                        disabled={!currentAnswer.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                    >
                        <Send className="w-4 h-4" />
                        <span>
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIMockInterview;
