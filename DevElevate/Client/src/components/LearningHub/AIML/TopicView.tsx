import React, { useState } from 'react';
import { useGlobalState } from '../../../contexts/GlobalContext';
import { ArrowLeft, BookOpen, Code, ExternalLink, CheckCircle, Star, Copy, Download } from 'lucide-react';
import { aimlModules } from './moduleContent';
import MarkdownRenderer from '../Java/MarkdownRenderer';

interface TopicViewProps {
  moduleId: string;
  topicId: string;
  onBack: () => void;
  onTopicChange: (topicId: string) => void;
}

const TopicView: React.FC<TopicViewProps> = ({ moduleId, topicId, onBack, onTopicChange }) => {
  const { state } = useGlobalState();
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [progress, setProgress] = useState(0);

  const moduleContent = aimlModules[moduleId as keyof typeof aimlModules];
  const currentTopic = moduleContent?.topics.find(topic => topic.id === topicId);

  if (!moduleContent || !currentTopic) {
    return <div>Topic not found</div>;
  }

  const handleSaveNotes = async () => {
    try {
      const response = await fetch(`/api/v1/learning/aiml/notes/${topicId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          notes,
          moduleId
        })
      });
      
      if (response.ok) {
        console.log('Notes saved successfully');
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    try {
      const response = await fetch(`/api/v1/learning/aiml/reviews/${topicId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating: newRating,
          comment: '',
          moduleId
        })
      });
      
      if (response.ok) {
        console.log('Rating saved successfully');
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const handleProgressUpdate = async () => {
    const newProgress = Math.min(progress + 25, 100);
    setProgress(newProgress);
    
    try {
      const response = await fetch(`/api/v1/learning/aiml/progress/${topicId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          status: newProgress === 100 ? 'completed' : 'in_progress',
          moduleId,
          completionPercentage: newProgress
        })
      });
      
      if (response.ok) {
        console.log('Progress updated successfully');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                state.darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </button>
            
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${
                progress === 100 
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : progress > 50
                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}>
                🤖 Progress: {progress}%
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Learning Progress
              </span>
              <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {progress}% Complete
              </span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              state.darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Topic Navigation */}
          <div className="lg:col-span-4">
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto`}>
              <h3 className={`font-bold text-lg mb-6 flex items-center gap-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                {moduleContent.title}
              </h3>
              <div className="space-y-3">
                {moduleContent.topics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => onTopicChange(topic.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                      topic.id === topicId
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white border-transparent shadow-lg transform scale-105'
                        : state.darkMode
                        ? 'text-gray-300 hover:bg-gray-700 border-gray-600 hover:border-gray-500'
                        : 'text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        topic.id === topicId
                          ? 'bg-white text-purple-600'
                          : state.darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block text-sm leading-tight">{topic.title}</span>
                        <span className={`text-xs mt-1 block ${
                          topic.id === topicId
                            ? 'text-purple-100'
                            : state.darkMode
                            ? 'text-gray-500'
                            : 'text-gray-500'
                        }`}>
                          Click to learn
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
              <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border mb-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className={`text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                      {currentTopic.title}
                    </h1>
                    <p className={`text-lg ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Master AI/ML concepts step by step
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleProgressUpdate}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Complete
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Rate this topic:
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className={`p-1 rounded transition-all duration-200 hover:scale-110 ${
                            star <= rating ? 'text-yellow-400' : state.darkMode ? 'text-gray-600' : 'text-gray-300'
                          } hover:text-yellow-400`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <span className={`text-sm ml-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ({rating}/5 stars)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-12">
                <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-8 border`}>
                  <MarkdownRenderer content={currentTopic.content} />
                </div>
              </div>

              {/* Code Example */}
              {currentTopic.codeExample && (
                <div className="mb-12">
                  <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
                    <div className={`flex items-center justify-between px-4 py-3 ${state.darkMode ? 'bg-gray-900 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'}`}>
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-purple-500" />
                        <span className={`text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Interactive Python Code Example
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => navigator.clipboard.writeText(currentTopic.codeExample)}
                          className={`p-1.5 rounded hover:bg-opacity-80 transition-colors ${state.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
                          title="Copy code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            const blob = new Blob([currentTopic.codeExample], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${currentTopic.title.replace(/\s+/g, '_')}.py`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className={`p-1.5 rounded hover:bg-opacity-80 transition-colors ${state.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
                          title="Download code"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className={`${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 overflow-x-auto`}>
                      <pre className={`text-sm leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        <code className="language-python">{currentTopic.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Practice Links */}
              {currentTopic.practiceLinks && currentTopic.practiceLinks.length > 0 && (
                <div className="mb-12">
                  <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
                    <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <BookOpen className="w-5 h-5 text-green-500" />
                      Practice Resources
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentTopic.practiceLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                            state.darkMode
                              ? 'border-gray-600 bg-gray-700 hover:border-purple-500 hover:bg-gray-600'
                              : 'border-gray-200 bg-gray-50 hover:border-purple-500 hover:bg-purple-50'
                          }`}
                        >
                          <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className={`font-medium group-hover:text-purple-600 transition-colors ${
                              state.darkMode ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {link.name}
                            </span>
                            <p className={`text-sm mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              External resource
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Your AI/ML Notes
                </h3>
                <div className="space-y-4">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="🤖 Take notes on AI/ML concepts... Write down algorithms, formulas, or insights!"
                    className={`w-full h-40 p-4 rounded-lg border-2 resize-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      state.darkMode
                        ? 'bg-gray-900 border-gray-600 text-gray-300 placeholder-gray-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      💡 Tip: Notes are automatically saved to your account
                    </p>
                    <button
                      onClick={handleSaveNotes}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      💾 Save Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicView;