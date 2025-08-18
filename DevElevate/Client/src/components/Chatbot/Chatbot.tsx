import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Briefcase,
  CheckIcon,
  CopyIcon,
  MessageCircleQuestion,
} from "lucide-react";
import { useGlobalState } from "../../contexts/GlobalContext";
import axiosInstance from "../../api/axiosinstance.ts";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Chatbot: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "learning" | "career" | "general"
  >("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { id: "learning", label: "Learning Help", icon: BookOpen },
    { id: "career", label: "Career Advice", icon: Briefcase },
    { id: "quiz", label: "quiz", icon: MessageCircleQuestion },
    { id: "general", label: "General Chat", icon: Sparkles },
  ];

  const suggestedQuestions = {
    learning: [
      "Explain Big O notation",
      "How do I approach dynamic programming?",
      "What is the difference between React and Angular?",
      "How to prepare for coding interviews?",
    ],
    career: [
      "How to write a good resume?",
      "What questions to ask in an interview?",
      "How to negotiate salary?",
      "Tips for switching careers to tech?",
    ],
    quiz: [
      "Binary Search",
      "Operating System Basics",
      "JavaScript Array Methods",
      "Time and Space Complexity",
      "Graphs vs Trees",
    ],

    general: [
      "Motivate me to keep learning",
      "How to manage study time effectively?",
      "Latest tech trends to follow",
      "How to build a portfolio?",
    ],
  };

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: message,
      timestamp: new Date().toISOString(),
      category: selectedCategory,
    };

    dispatch({ type: "ADD_CHAT_MESSAGE", payload: userMessage });
    setMessage("");
    setIsTyping(true);

    let success = false;
    let aiReply = "";
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await axiosInstance.post("/api/v1/gemini", {
          message,
          category: selectedCategory,
        });
        aiReply = (res.data as { reply?: string }).reply || "No response 🤖";

        success = true;
        break;
      } catch (error) {
        if (attempt === 2) {
          toast.error("AI is not responding. Please try again later.");
        }
      }
    }
    const botMessage = {
      id: Date.now().toString() + (success ? "_bot" : "_bot_error"),
      type: "ai" as const,
      content: success ? aiReply.trim() : "No response due to an error",
      timestamp: new Date().toISOString(),
      category: selectedCategory,
    };
    dispatch({ type: "ADD_CHAT_MESSAGE", payload: botMessage });
    setIsTyping(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000); // 3 seconds
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${state.darkMode ? "bg-gray-900" : "bg-white"
        } transition-colors duration-200`}
    >
      {/* Header */}
      <header
        className={`px-4 py-3 border-b ${state.darkMode
            ? "border-gray-700 bg-gray-900"
            : "border-gray-200 bg-white"
          } flex items-center justify-center relative`}
      >
        <div className="flex items-center space-x-2">
          <Bot
            className={`w-6 h-6 ${state.darkMode ? "text-green-400" : "text-green-600"
              }`}
          />
          <h1
            className={`text-lg font-medium ${state.darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            Study Buddy
          </h1>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
          {state.chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${state.darkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
              >
                <Bot
                  className={`w-8 h-8 ${state.darkMode ? "text-green-400" : "text-green-600"
                    }`}
                />
              </div>
              <h2
                className={`text-2xl font-semibold mb-4 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                How can I help you today?
              </h2>

              {/* Suggested Questions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full mt-8">
                {suggestedQuestions[selectedCategory]
                  .slice(0, 4)
                  .map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className={`p-4 rounded-xl border text-left transition-all hover:bg-opacity-50 ${state.darkMode
                          ? "border-gray-700 hover:border-gray-600 text-gray-300 hover:bg-gray-800"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <div className="text-sm font-medium">{question}</div>
                    </button>
                  ))}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-8">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm transition-all ${selectedCategory === category.id
                          ? "bg-green-600 text-white border-green-600"
                          : state.darkMode
                            ? "border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300"
                            : "border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 space-y-6">
              {state.chatHistory.map((msg, index) => (
                <div key={msg.id} className="group">
                  {msg.type === "user" ? (
                    <div className="flex items-start space-x-4 ml-auto max-w-4xl">
                      <div className="flex-1 flex justify-end">
                        <div
                          className={`max-w-3xl px-4 py-3 rounded-2xl ${state.darkMode
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-4 max-w-4xl">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${state.darkMode ? "bg-green-600" : "bg-green-600"
                          }`}
                      >
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="relative group">
                          <div
                            className={`prose max-w-none ${state.darkMode ? "prose-invert" : ""
                              }`}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                          {/* Copy Button */}
                          <button
                            onClick={() => handleCopy(msg.content, index)}
                            className={`absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 px-2 py-1 rounded text-xs ${state.darkMode
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-600 hover:text-gray-900"
                              }`}
                          >
                            {copiedIndex === index ? (
                              <>
                                <CheckIcon className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <CopyIcon className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-start space-x-4 max-w-4xl">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full animate-bounce ${state.darkMode ? "bg-gray-500" : "bg-gray-400"
                          }`}
                      />
                      <div
                        className={`w-2 h-2 rounded-full animate-bounce ${state.darkMode ? "bg-gray-500" : "bg-gray-400"
                          }`}
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className={`w-2 h-2 rounded-full animate-bounce ${state.darkMode ? "bg-gray-500" : "bg-gray-400"
                          }`}
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div
          className={`px-4 py-4 border-t ${state.darkMode ? "border-gray-700" : "border-gray-200"
            }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Message Study Buddy..."
                className={`w-full px-4 py-3 pr-12 rounded-2xl border ${state.darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                  } focus:outline-none transition-colors resize-none`}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || isTyping}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${!message.trim() || isTyping
                    ? state.darkMode
                      ? "text-gray-600"
                      : "text-gray-400"
                    : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p
              className={`text-xs text-center mt-2 ${state.darkMode ? "text-gray-500" : "text-gray-500"
                }`}
            >
              Study Buddy can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
