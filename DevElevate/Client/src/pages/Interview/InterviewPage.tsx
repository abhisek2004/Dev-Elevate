import React, { useState, useRef, useEffect } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  Play,
  Square,
  Volume2,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

const InterviewPage: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const { state: authState } = useAuth();
  const isDarkMode = globalState.darkMode;
  const currentUser = authState.user;

  // Mock function for adding interview results
  const addInterview = (interview: any) => {
    // In a real app, this would save to a database
  };
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [interviewType, setInterviewType] = useState<'hr' | 'technical' | 'group'>('hr');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [topic, setTopic] = useState('General HR Questions');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const questions = {
    hr: {
      easy: [
        "Tell me about yourself.",
        "Why do you want to work for our company?",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?"
      ],
      medium: [
        "Describe a challenging situation you faced and how you handled it.",
        "How do you handle stress and pressure?",
        "Tell me about a time you had to work with a difficult team member.",
        "What motivates you in your work?"
      ],
      hard: [
        "Describe a time when you had to make a difficult decision with limited information.",
        "How would you handle a situation where you disagree with your manager?",
        "Tell me about a project that didn't go as planned. What did you learn?",
        "How do you stay updated with industry trends?"
      ]
    },
    technical: {
      easy: [
        "What is the difference between HTML and HTML5?",
        "Explain what CSS is and its purpose.",
        "What is JavaScript and how is it different from Java?",
        "What is a database and why is it important?"
      ],
      medium: [
        "Explain the concept of responsive design.",
        "What are the differences between SQL and NoSQL databases?",
        "Describe the MVC architecture pattern.",
        "What is REST API and how does it work?"
      ],
      hard: [
        "Explain the concept of microservices architecture.",
        "How would you optimize a slow-performing database query?",
        "Describe the differences between TCP and UDP protocols.",
        "Explain the concept of Big O notation with examples."
      ]
    },
    group: {
      easy: [
        "Should companies allow remote work permanently?",
        "Is social media beneficial or harmful to society?",
        "Should college education be free for everyone?",
        "Is artificial intelligence a threat to human jobs?"
      ],
      medium: [
        "How can companies balance profit with environmental responsibility?",
        "Should there be stricter regulations on data privacy?",
        "Is the gig economy good for workers?",
        "How can we bridge the digital divide in rural areas?"
      ],
      hard: [
        "How should companies handle ethical dilemmas in AI development?",
        "What role should government play in regulating cryptocurrency?",
        "How can we address the growing inequality in the tech industry?",
        "Should there be universal basic income in the age of automation?"
      ]
    }
  };

  useEffect(() => {
    if (interviewStarted && timerRef.current === undefined) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [interviewStarted]);

  useEffect(() => {
    // Get user media for video preview
    if (isVideoOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          // Silent error handling for camera access
        });
    }
  }, [isVideoOn]);

  const startInterview = () => {
    setInterviewStarted(true);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setTranscript('');

    // Simulate AI welcome message
    setAiResponse("Hello! I'm your AI interviewer today. Let's begin with our first question. Take your time to think and answer clearly.");
  };

  const nextQuestion = () => {
    const totalQuestions = questions[interviewType][difficulty].length;
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      // Simulate AI response
      setAiResponse("Thank you for your answer. Let me ask you the next question.");
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    setInterviewStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    // Calculate mock score and create interview record
    const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100 range

    const newInterview = {
      id: `int_${Date.now()}`,
      candidateId: currentUser!.id,
      type: interviewType,
      difficulty,
      topic,
      duration: Math.floor(timeElapsed / 60),
      score: mockScore,
      feedback: 'Good communication skills. Consider improving on technical depth.',
      transcript: transcript || 'Interview transcript would be captured here...',
      createdAt: new Date().toISOString(),
      aiAnalysis: {
        confidenceScore: Math.floor(Math.random() * 20) + 80,
        grammarScore: Math.floor(Math.random() * 15) + 85,
        clarityScore: Math.floor(Math.random() * 20) + 80,
        technicalAccuracy: Math.floor(Math.random() * 25) + 75,
        communicationSkills: Math.floor(Math.random() * 20) + 80,
        fillerWords: Math.floor(Math.random() * 20) + 5,
        speakingPace: 'optimal',
        toneAnalysis: 'confident and professional',
        improvementAreas: ['Reduce filler words', 'Provide more specific examples'],
        strengths: ['Clear communication', 'Good technical knowledge', 'Professional demeanor']
      }
    };

    addInterview(newInterview);
    setAiResponse("Congratulations! You've completed the interview. Your results are being processed...");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestions = questions[interviewType][difficulty];
  const currentQ = currentQuestions[currentQuestion];

  return (
    <div className="mx-auto space-y-6 max-w-6xl">
      <div className={`rounded-xl p-6 ${isDarkMode
          ? 'bg-gradient-to-r from-purple-900 to-blue-900'
          : 'bg-gradient-to-r from-purple-600 to-blue-600'
        } text-white`}>
        <h1 className="mb-2 text-3xl font-bold">DevElevate AI Interview Simulator</h1>
        <p className="text-purple-100">
          Practice real interviews with our advanced AI interviewer and get instant feedback
        </p>
      </div>

      {!interviewStarted ? (
        // Interview Setup
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Configuration Panel */}
          <div className={`p-6 rounded-xl border ${isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Interview Configuration
            </h2>

            <div className="space-y-6">
              {/* Interview Type */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Interview Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['hr', 'technical', 'group'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInterviewType(type)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${interviewType === type
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${difficulty === level
                          ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Focus Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${isDarkMode
                      ? 'text-white bg-gray-700 border-gray-600'
                      : 'text-gray-900 bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="General HR Questions">General HR Questions</option>
                  <option value="JavaScript Development">JavaScript Development</option>
                  <option value="React.js">React.js</option>
                  <option value="Python Programming">Python Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="System Design">System Design</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>

              {/* Start Button */}
              <button
                onClick={startInterview}
                className="flex justify-center items-center px-6 py-4 space-x-2 w-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all hover:from-blue-700 hover:to-purple-700"
              >
                <Play className="w-5 h-5" />
                <span>Start Interview</span>
              </button>
            </div>
          </div>

          {/* Camera Preview */}
          <div className={`p-6 rounded-xl border ${isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Camera & Audio Setup
            </h2>

            <div className="space-y-4">
              {/* Video Preview */}
              <div className="overflow-hidden relative bg-gray-900 rounded-lg aspect-video">
                {isVideoOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <VideoOff className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full ${isMuted
                      ? 'text-white bg-red-500'
                      : 'text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    } hover:scale-105 transition-all`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full ${!isVideoOn
                      ? 'text-white bg-red-500'
                      : 'text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    } hover:scale-105 transition-all`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button className="p-3 text-gray-700 bg-gray-200 rounded-full transition-all dark:bg-gray-700 dark:text-gray-300 hover:scale-105">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Interview Session
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* AI Interviewer */}
          <div className={`lg:col-span-2 p-6 rounded-xl border ${isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                  <span className="font-bold text-white">AI</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    AI Interviewer
                  </h3>
                  <p className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {currentQuestions.length}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                <span className="font-mono text-sm">{formatTime(timeElapsed)}</span>
              </div>
            </div>

            {/* Current Question */}
            <div className={`p-6 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
              <div className="flex items-start space-x-3">
                <Volume2 className="mt-1 w-5 h-5 text-blue-600" />
                <div>
                  <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {currentQ}
                  </p>
                  {aiResponse && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {aiResponse}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Response Area */}
            <div className={`p-4 rounded-lg border-2 border-dashed ${isRecording
                ? 'bg-red-50 border-red-500 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600'
              }`}>
              <div className="text-center">
                <Mic className={`h-12 w-12 mx-auto mb-3 ${isRecording ? 'text-red-500' : 'text-gray-400'
                  }`} />
                <p className={`text-sm ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-gray-500'
                  }`}>
                  {isRecording ? 'Recording your response...' : 'Click to start recording your answer'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${isRecording
                    ? 'text-white bg-red-500 hover:bg-red-600'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  } flex items-center space-x-2`}
              >
                {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentQuestion >= currentQuestions.length - 1}
                className="flex items-center px-6 py-3 space-x-2 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion >= currentQuestions.length - 1 ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Finish Interview</span>
                  </>
                ) : (
                  <span>Next Question</span>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className={`p-4 rounded-xl border ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              }`}>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Progress
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Questions</span>
                  <span>{currentQuestion + 1} / {currentQuestions.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className={`p-4 rounded-xl border ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              }`}>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Interview Tips
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Use specific examples in your answers</li>
                <li>• Maintain good posture and eye contact</li>
                <li>• Take a moment to think before answering</li>
                <li>• Ask questions if you need clarification</li>
              </ul>
            </div>

            {/* Your Video */}
            <div className={`p-4 rounded-xl border ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
              }`}>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Your Video
              </h4>
              <div className="overflow-hidden relative bg-gray-900 rounded-lg aspect-video">
                {isVideoOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <VideoOff className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;