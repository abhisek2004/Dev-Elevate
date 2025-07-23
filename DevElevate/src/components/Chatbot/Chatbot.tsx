import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, Briefcase } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const Chatbot: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'learning' | 'career' | 'general'>('learning');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'learning', label: 'Learning Help', icon: BookOpen },
    { id: 'career', label: 'Career Advice', icon: Briefcase },
    { id: 'general', label: 'General Chat', icon: Sparkles }
  ];

  const suggestedQuestions = {
    learning: [
      'Explain Big O notation',
      'How do I approach dynamic programming?',
      'What is the difference between React and Angular?',
      'How to prepare for coding interviews?'
    ],
    career: [
      'How to write a good resume?',
      'What questions to ask in an interview?',
      'How to negotiate salary?',
      'Tips for switching careers to tech?'
    ],
    general: [
      'Motivate me to keep learning',
      'How to manage study time effectively?',
      'Latest tech trends to follow',
      'How to build a portfolio?'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      learning: {
        'big o': 'Big O notation describes the time complexity of algorithms. It helps you understand how the runtime scales with input size. O(1) is constant time, O(n) is linear, O(n²) is quadratic, etc.',
        'dynamic programming': 'Dynamic Programming is about breaking down problems into overlapping subproblems. Start with recursion, identify repeated calculations, then use memoization or tabulation to optimize.',
        'react': 'React is a JavaScript library for building user interfaces, while Angular is a full framework. React is more flexible and has a larger ecosystem, while Angular provides more structure out of the box.',
        'interview': 'For coding interviews: 1) Practice on LeetCode/HackerRank, 2) Study system design, 3) Know your data structures, 4) Practice explaining your thought process, 5) Mock interviews help!'
      },
      career: {
        'resume': 'A good resume should be: 1) ATS-friendly, 2) Quantify achievements, 3) Use action verbs, 4) Tailor to each job, 5) Keep it 1-2 pages, 6) Include relevant projects and skills.',
        'interview questions': 'Good questions to ask: "What does a typical day look like?", "What are the biggest challenges?", "How do you measure success?", "What growth opportunities exist?"',
        'salary': 'Salary negotiation tips: 1) Research market rates, 2) Consider total compensation, 3) Be prepared to justify your ask, 4) Be flexible on non-salary items, 5) Practice your pitch.',
        'career switch': 'Tips for switching to tech: 1) Learn in-demand skills, 2) Build a portfolio, 3) Network with professionals, 4) Consider bootcamps or online courses, 5) Start with internships or entry-level roles.'
      },
      general: {
        'motivate': '🚀 Remember: Every expert was once a beginner! Your current struggles are building your future strengths. Keep going, you\'re closer than you think!',
        'time management': 'Effective study tips: 1) Use Pomodoro technique, 2) Set specific goals, 3) Eliminate distractions, 4) Take regular breaks, 5) Track your progress.',
        'trends': 'Hot tech trends: AI/ML, Cloud Computing, Cybersecurity, Blockchain, IoT, DevOps, Mobile Development, and Data Science. Focus on what aligns with your interests!',
        'portfolio': 'Build a portfolio with: 1) Personal projects, 2) Clean code on GitHub, 3) Live demos, 4) Good documentation, 5) Variety of technologies, 6) Problem-solving examples.'
      }
    };

    const categoryResponses = responses[selectedCategory];
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(categoryResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return `I understand you're asking about "${userMessage}". As your Study Buddy, I'm here to help with learning, career advice, and general tech questions. Could you be more specific about what you'd like to know?`;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date().toISOString(),
      category: selectedCategory
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: simulateAIResponse(message),
        timestamp: new Date().toISOString(),
        category: selectedCategory
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200 pt-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Study Buddy AI
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your 24/7 AI mentor for learning and career guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Categories */}
          <div className="lg:col-span-1">
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                Chat Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as any)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white border-blue-500'
                          : state.darkMode
                          ? 'border-gray-700 hover:border-gray-600 text-gray-300'
                          : 'border-gray-200 hover:border-gray-300 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <h4 className={`text-sm font-medium mb-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Suggested Questions
                </h4>
                <div className="space-y-2">
                  {suggestedQuestions[selectedCategory].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className={`w-full p-2 text-left text-sm rounded-lg transition-colors ${
                        state.darkMode
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm flex flex-col h-[600px]`}>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {state.chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className={`w-12 h-12 mx-auto mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <h3 className={`text-lg font-medium mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome to Study Buddy!
                    </h3>
                    <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ask me anything about learning, career advice, or tech topics.
                    </p>
                  </div>
                ) : (
                  state.chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`px-4 py-2 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : state.darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask me anything..."
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      state.darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim() || isTyping}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;