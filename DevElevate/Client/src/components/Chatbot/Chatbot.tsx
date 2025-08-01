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
  MessageCircleQuestion ,
} from "lucide-react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { generateChatbotResponse } from "../../utils/helperAI";
// import { toast } from "sonner";

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
    { id: "quiz", label: "quiz", icon: MessageCircleQuestion  },
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

  const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};


  useEffect(() => {
    // Only scroll to bottom if there are messages and we're not at the initial load
    if (state.chatHistory.length > 0) {
      scrollToBottom();
    }
  }, [state.chatHistory]); // 👈 This should match what you're rendering

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

    try {
      const aiReply = await generateChatbotResponse(message, selectedCategory);
      console.log("AI Response:", aiReply);

      const botMessage = {
        id: Date.now().toString() + "_bot",
        type: "ai" as const,
        content: aiReply?.trim() || "No response 🤖",
        timestamp: new Date().toISOString(),
        category: selectedCategory,
      };

      dispatch({ type: "ADD_CHAT_MESSAGE", payload: botMessage });
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch({
        type: "ADD_CHAT_MESSAGE",
        payload: {
          id: Date.now().toString() + "_bot_error",
          type: "ai" as const,
          content: "No response due to an error",
          timestamp: new Date().toISOString(),
          category: selectedCategory,
        },
      });
    } finally {
      setIsTyping(false);
    }
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
      className={`min-h-screen ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              state.darkMode ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Study Buddy AI
          </h1>
          <p
            className={`text-lg ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Your 24/7 AI mentor for learning and career guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Categories */}
          <div className="lg:col-span-1">
            <div
              className={`${
                state.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl p-6 border shadow-sm`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  state.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
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
                          ? "bg-blue-500 text-white border-blue-500"
                          : state.darkMode
                          ? "border-gray-700 hover:border-gray-600 text-gray-300"
                          : "border-gray-200 hover:border-gray-300 text-gray-900"
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
                <h4
                  className={`text-sm font-medium mb-3 ${
                    state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Suggested Questions
                </h4>
                <div className="space-y-2">
                  {suggestedQuestions[selectedCategory].map(
                    (question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className={`w-full p-2 text-left text-sm rounded-lg transition-colors ${
                          state.darkMode
                            ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {question}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div
              className={`${
                state.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl border shadow-sm flex flex-col h-[600px]`}
            >
              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {state.chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot
                      className={`w-12 h-12 mx-auto mb-4 ${
                        state.darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <h3
                      className={`text-lg font-medium mb-2 ${
                        state.darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Welcome to Study Buddy!
                    </h3>
                    <p
                      className={`${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Ask me anything about learning, career advice, or tech
                      topics.
                    </p>
                  </div>
                ) : (
                  state.chatHistory.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-xs lg:max-w-md flex-row ${
                          msg.type === "user"
                            ? "ml-auto justify-end space-x-2"
                            : "space-x-2"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <>
                            <div className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div
                              className={`${
                                state.darkMode
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-900"
                              } px-4 py-2 rounded-lg`}
                            >
                              <div
                                key={index}
                                className="relative bg-muted p-4 rounded-xl"
                              >
                                {/* Copy Button at Top Right */}
                                <button
                                  onClick={() => handleCopy(msg.content, index)}
                                  className="absolute top-1 right-1 text-xs text-blue-500 hover:underline flex items-center gap-1"
                                >
                                  {copiedIndex === index ? (
                                    <>
                                      <CheckIcon className="w-4 h-4 text-green-500" />
                                    </>
                                  ) : (
                                    <>
                                      <CopyIcon className="w-4 h-4" />
                                    </>
                                  )}
                                </button>

                                {/* Message content */}
                                <p className="whitespace-pre-wrap text-sm">
                                  {msg.content}
                                </p>
                              </div>

                              <div className="flex gap-3 mt-2 text-xs text-blue-500"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start mb-3">
                    <div className="flex items-start space-x-2">
                      {/* Bot Avatar */}
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>

                      {/* Typing Animation Bubble */}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          state.darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex space-x-3 sticky bottom-0 bg-inherit z-10">
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
                    placeholder="Ask me anything..."
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      state.darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
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
