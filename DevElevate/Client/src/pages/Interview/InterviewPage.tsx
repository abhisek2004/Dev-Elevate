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
  CheckCircle,
  BarChart2,
  AlertCircle,
  Star,
  Share2,
  X
} from 'lucide-react';

const ShareInterviewExperience = ({ onClose, isDarkMode }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    author: "",
    date: "",
    duration: "",
    rounds: 0,
    difficulty: "",
    outcome: "",
    tags: "",
    overallExperience: "",
    tips: "",
  });

  const [interviewRounds, setInterviewRounds] = useState([
    { id: 1, type: "", duration: "", questions: "", experience: "" },
  ]);

  const [message, setMessage] = useState({
    text: "",
    type: "",
    visible: false,
  });

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoundChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInterviewRounds((prevRounds) =>
      prevRounds.map((round) =>
        round.id === id ? { ...round, [name]: value } : round
      )
    );
  };

  const addRound = () => {
    const newId = interviewRounds.length + 1;
    setInterviewRounds((prevRounds) => [
      ...prevRounds,
      { id: newId, type: "", duration: "", questions: "", experience: "" },
    ]);
  };

  const showMessage = (text: string, type: string = "success") => {
    setMessage({ text, type, visible: true });
    setTimeout(() => {
      setMessage({ ...message, visible: false });
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const processedRounds = interviewRounds.map((round) => ({
      round: round.id,
      type: round.type,
      duration: parseInt(round.duration.toString()),
      questions: round.questions.split("\n").filter((q) => q.trim() !== ""),
      experience: round.experience,
    }));

    const finalData = {
      company: formData.company,
      position: formData.position,
      author: formData.author,
      date: formData.date,
      duration: parseInt(formData.duration.toString()),
      rounds: parseInt(formData.rounds.toString()),
      level: formData.difficulty.toLowerCase(),
      result: formData.outcome.toLowerCase(),
      likes: 0,
      comments: 0,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      preview: formData.overallExperience.substring(0, 100) + "...",
      interview: {
        rounds: processedRounds,
        overallExperience: formData.overallExperience,
        tips: formData.tips.split("\n").filter((tip) => tip.trim() !== ""),
        finalOutcome: formData.outcome.toLowerCase(),
      },
    };

    try {
      const res = await fetch("/api/interview-experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      if (result.success) {
        showMessage("Interview Experience shared successfully!", "success");
        setTimeout(onClose, 3000);
      } else {
        showMessage("Error sharing experience!", "error");
      }
    } catch (error) {
      showMessage("Something went wrong!", "error");
    }
  };

  return (
    <div className={`relative p-8 rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
      <button
        onClick={onClose}
        className="absolute text-gray-500 top-4 right-4 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <X className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-bold text-center text-transparent md:text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
        Share Your Interview Experience
      </h1>
      <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Provide feedback on your interview.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Interview Details Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="position"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="author"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Duration (in minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="rounds"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Number of Rounds
              </label>
              <input
                type="number"
                id="rounds"
                name="rounds"
                value={formData.rounds}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="difficulty"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
                required
              >
                <option value="">Select a difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="outcome"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Outcome
              </label>
              <select
                id="outcome"
                name="outcome"
                value={formData.outcome}
                onChange={handleFormChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
                required
              >
                <option value="">Select an outcome</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="tags"
              className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleFormChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
              placeholder="e.g., Arrays, System Design, Behavioral"
            />
          </div>
        </div>

        {/* Overall Experience & Tips */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="overallExperience"
              className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Overall Experience
            </label>
            <textarea
              id="overallExperience"
              name="overallExperience"
              rows={4}
              value={formData.overallExperience}
              onChange={handleFormChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
              required
            />
          </div>

          <div>
            <label
              htmlFor="tips"
              className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Tips for others (one tip per line)
            </label>
            <textarea
              id="tips"
              name="tips"
              rows={4}
              value={formData.tips}
              onChange={handleFormChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }`}
              required
            />
          </div>
        </div>

        {/* Dynamic Interview Rounds Section */}
        <div className="space-y-6">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Interview Rounds
          </h2>
          {interviewRounds.map((round) => (
            <div
              key={round.id}
              className={`round-block p-4 border-2 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                } space-y-4`}
            >
              <h3 className={`text-md font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Round {round.id}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`roundType-${round.id}`}
                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id={`roundType-${round.id}`}
                    name="type"
                    value={round.type}
                    onChange={(e) => handleRoundChange(round.id, e)}
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="e.g., Coding (DSA)"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={`roundDuration-${round.id}`}
                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    id={`roundDuration-${round.id}`}
                    name="duration"
                    value={round.duration}
                    onChange={(e) => handleRoundChange(round.id, e)}
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    placeholder="e.g., 60"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={`roundQuestions-${round.id}`}
                  className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Questions (one per line)
                </label>
                <textarea
                  id={`roundQuestions-${round.id}`}
                  name="questions"
                  rows={3}
                  value={round.questions}
                  onChange={(e) => handleRoundChange(round.id, e)}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  placeholder="e.g., Question 1\nQuestion 2"
                />
              </div>
              <div>
                <label
                  htmlFor={`roundExperience-${round.id}`}
                  className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Experience
                </label>
                <textarea
                  id={`roundExperience-${round.id}`}
                  name="experience"
                  rows={4}
                  value={round.experience}
                  onChange={(e) => handleRoundChange(round.id, e)}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRound}
          className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
        >
          + Add Another Round
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 mt-8 text-lg font-bold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </form>

      {/* Message Box */}
      {message.visible && (
        <div
          className={`mt-4 px-4 py-3 rounded-xl relative ${message.type === "success"
              ? "bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300"
              : "bg-red-100 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-300"
            }`}
          role="alert"
        >
          <span className="block sm:inline">{message.text}</span>
        </div>
      )}
    </div>
  );
};

const InterviewPage: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const { state: authState } = useAuth();
  const isDarkMode = globalState.darkMode;
  const currentUser = authState.user;

  // Mock function for adding interview results
  const addInterview = (interview: any) => {
    console.log('Interview completed:', interview);
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
  const [showResults, setShowResults] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [interviewResults, setInterviewResults] = useState<any>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const questions = {
    hr: {
      easy: [
        "Tell me about yourself.",
        "Why do you want to work for our company?",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "What is your greatest achievement?"
      ],
      medium: [
        "Describe a challenging situation you faced and how you handled it.",
        "How do you handle stress and pressure?",
        "Tell me about a time you had to work with a difficult team member.",
        "What motivates you in your work?",
        "How do you prioritize tasks?"
      ],
      hard: [
        "Describe a time when you had to make a difficult decision with limited information.",
        "How would you handle a situation where you disagree with your manager?",
        "Tell me about a project that didn't go as planned. What did you learn?",
        "How do you stay updated with industry trends?",
        "Describe your leadership style."
      ]
    },
    technical: {
      easy: [
        "What is the difference between HTML and HTML5?",
        "Explain what CSS is and its purpose.",
        "What is JavaScript and how is it different from Java?",
        "What is a database and why is it important?",
        "What is version control?"
      ],
      medium: [
        "Explain the concept of responsive design.",
        "What are the differences between SQL and NoSQL databases?",
        "Describe the MVC architecture pattern.",
        "What is REST API and how does it work?",
        "Explain asynchronous programming in JavaScript."
      ],
      hard: [
        "Explain the concept of microservices architecture.",
        "How would you optimize a slow-performing database query?",
        "Describe the differences between TCP and UDP protocols.",
        "Explain the concept of Big O notation with examples.",
        "What is containerization and how does Docker work?"
      ]
    },
    group: {
      easy: [
        "Should companies allow remote work permanently?",
        "Is social media beneficial or harmful to society?",
        "Should college education be free for everyone?",
        "Is artificial intelligence a threat to human jobs?",
        "Should voting be mandatory?"
      ],
      medium: [
        "How can companies balance profit with environmental responsibility?",
        "Should there be stricter regulations on data privacy?",
        "Is the gig economy good for workers?",
        "How can we bridge the digital divide in rural areas?",
        "Should social media platforms be regulated like utilities?"
      ],
      hard: [
        "How should companies handle ethical dilemmas in AI development?",
        "What role should government play in regulating cryptocurrency?",
        "How can we address the growing inequality in the tech industry?",
        "Should there be universal basic income in the age of automation?",
        "How to mitigate biases in machine learning models?"
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
        .catch(err => console.log('Error accessing camera:', err));
    }
  }, [isVideoOn]);

  useEffect(() => {
    // Initialize Speech Recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionClass = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognitionClass();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript((prev) => prev + currentTranscript);
      };
      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      setRecognition(rec);
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }
  }, []);

  const startInterview = () => {
    setInterviewStarted(true);
    setShowResults(false);
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
        improvementAreas: ['Reduce filler words', 'Provide more specific examples', 'Improve eye contact'],
        strengths: ['Clear communication', 'Good technical knowledge', 'Professional demeanor', 'Quick thinking']
      }
    };

    addInterview(newInterview);
    setInterviewResults(newInterview);
    setShowResults(true);
    setAiResponse("Congratulations! You've completed the interview. Your results are being processed...");
  };

  const resetInterview = () => {
    setShowResults(false);
    setInterviewStarted(false);
    setTranscript('');
    setAiResponse('');
    setTimeElapsed(0);
    setCurrentQuestion(0);
    setInterviewResults(null);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
    } else {
      recognition?.start();
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestions = questions[interviewType][difficulty];
  const currentQ = currentQuestions[currentQuestion];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className={`rounded-xl p-6 ${isDarkMode
          ? 'bg-gradient-to-r from-purple-900 to-blue-900'
          : 'bg-gradient-to-r from-purple-600 to-blue-600'
        } text-white`}>
        <h1 className="mb-2 text-3xl font-bold">AI Interview</h1>
        <p className="text-purple-100">
          Practice real interviews with our advanced AI interviewer and get instant feedback
        </p>
      </div>

      {!interviewStarted && !showResults ? (
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
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-600'
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
                          ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300 dark:border-green-600'
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
                      ? 'text-white bg-gray-700 border-gray-600 focus:ring-blue-500/50'
                      : 'text-gray-900 bg-white border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-transparent transition-all`}
                >
                  <option value="General HR Questions">General HR Questions</option>
                  <option value="JavaScript Development">JavaScript Development</option>
                  <option value="React.js">React.js</option>
                  <option value="Python Programming">Python Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="System Design">System Design</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Behavioral Questions">Behavioral Questions</option>
                  <option value="Ethical AI">Ethical AI</option>
                </select>
              </div>

              {/* Start Button */}
              <button
                onClick={startInterview}
                className="flex items-center justify-center w-full px-6 py-4 space-x-2 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
              <div className="relative overflow-hidden bg-gray-900 rounded-lg aspect-video">
                {isVideoOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <VideoOff className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-all hover:scale-105 ${isMuted
                      ? 'text-white bg-red-500'
                      : isDarkMode
                        ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                        : 'text-gray-700 bg-gray-200 hover:bg-gray-100'
                    }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-all hover:scale-105 ${!isVideoOn
                      ? 'text-white bg-red-500'
                      : isDarkMode
                        ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                        : 'text-gray-700 bg-gray-200 hover:bg-gray-100'
                    }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button className={`p-3 rounded-full transition-all hover:scale-105 ${isDarkMode
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-100'
                  }`}>
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : showResults ? (
        // Results Display
        <div className={`p-6 rounded-xl border ${isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          }`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Interview Results
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Overall Score */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
              <div className="flex items-center mb-4 space-x-3">
                <BarChart2 className="w-6 h-6 text-blue-600" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Overall Performance</h3>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-blue-600">{interviewResults.score}%</p>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Total Score</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Duration</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Type</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.type.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Difficulty</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.difficulty}</span>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'
              }`}>
              <div className="flex items-center mb-4 space-x-3">
                <Star className="w-6 h-6 text-green-600" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>AI Analysis</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Confidence</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.confidenceScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Grammar</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.grammarScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Clarity</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.clarityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Technical Accuracy</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.technicalAccuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Communication</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.communicationSkills}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Filler Words</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.fillerWords}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Speaking Pace</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.speakingPace}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Tone</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{interviewResults.aiAnalysis.toneAnalysis}</span>
                </div>
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <div className="flex items-center mb-3 space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Strengths</h4>
                </div>
                <ul className={`list-disc pl-5 space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {interviewResults.aiAnalysis.strengths.map((strength: string, index: number) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3 space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Improvement Areas</h4>
                </div>
                <ul className={`list-disc pl-5 space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {interviewResults.aiAnalysis.improvementAreas.map((area: string, index: number) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3 space-x-3">
                  <Star className="w-5 h-5 text-purple-500" />
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>General Feedback</h4>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{interviewResults.feedback}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={resetInterview}
              className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Restart Interview</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Your Experience</span>
            </button>
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="font-bold text-white">AI</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    AI Interviewer
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    Question {currentQuestion + 1} of {currentQuestions.length}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}>
                {formatTime(timeElapsed)}
              </div>
            </div>

            {/* Current Question */}
            <div className={`p-6 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
              <div className="flex items-start space-x-3">
                <Volume2 className="w-5 h-5 mt-1 text-blue-600 shrink-0" />
                <div className="flex-1">
                  <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {currentQ}
                  </p>
                  {aiResponse && (
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      {aiResponse}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Response Area */}
            <div className={`p-4 rounded-lg border-2 border-dashed mb-6 min-h-[200px] ${isRecording
                ? 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-600'
                : isDarkMode
                  ? 'border-gray-600'
                  : 'border-gray-300'
              }`}>
              <div className="mb-4 text-center">
                <Mic className={`h-12 w-12 mx-auto mb-3 ${isRecording ? 'text-red-500' : 'text-gray-400'
                  }`} />
                <p className={`text-sm font-medium mb-2 ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {isRecording ? 'Recording your response...' : 'Click to start recording your answer'}
                </p>
              </div>
              {transcript && (
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                  <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Live Transcript:</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{transcript}</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                onClick={toggleRecording}
                disabled={!recognition}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${isRecording
                    ? 'text-white bg-red-500 hover:bg-red-600'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </button>

              <button
                onClick={nextQuestion}
                className={`flex items-center px-6 py-3 space-x-2 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all ${currentQuestion >= currentQuestions.length - 1 ? '' : 'disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
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
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  <span>Questions</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{currentQuestion + 1} / {currentQuestions.length}</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                  <div
                    className="h-2 transition-all bg-blue-600 rounded-full"
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
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Use specific examples in your answers</li>
                <li>• Maintain good posture and eye contact</li>
                <li>• Take a moment to think before answering</li>
                <li>• Ask questions if you need clarification</li>
                <li>• Stay calm and be yourself</li>
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
              <div className="relative overflow-hidden bg-gray-900 rounded-lg aspect-video">
                {isVideoOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <VideoOff className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowShareModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ShareInterviewExperience onClose={() => setShowShareModal(false)} isDarkMode={isDarkMode} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;