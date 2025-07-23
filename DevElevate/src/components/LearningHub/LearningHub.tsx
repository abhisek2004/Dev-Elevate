import React, { useState } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { BookOpen, Code, Database, Brain, PlayCircle, FileText, CheckCircle } from 'lucide-react';

const LearningHub: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [selectedTrack, setSelectedTrack] = useState('dsa');

  const learningTracks = {
    dsa: {
      title: 'Data Structures & Algorithms',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      modules: [
        { id: 'arrays', title: 'Arrays', topics: ['Array Basics', 'Two Pointers', 'Sliding Window'], completed: true },
        { id: 'strings', title: 'Strings', topics: ['String Manipulation', 'Pattern Matching', 'KMP Algorithm'], completed: true },
        { id: 'linkedlist', title: 'Linked Lists', topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List'], completed: false },
        { id: 'trees', title: 'Trees', topics: ['Binary Trees', 'BST', 'Tree Traversals', 'AVL Trees'], completed: false },
        { id: 'graphs', title: 'Graphs', topics: ['Graph Representation', 'DFS', 'BFS', 'Shortest Path'], completed: false },
        { id: 'dp', title: 'Dynamic Programming', topics: ['Memoization', 'Tabulation', 'Classic DP Problems'], completed: false }
      ]
    },
    java: {
      title: 'Java Programming',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      modules: [
        { id: 'basics', title: 'Java Basics', topics: ['Syntax', 'Variables', 'Data Types', 'Operators'], completed: true },
        { id: 'oop', title: 'Object-Oriented Programming', topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'], completed: true },
        { id: 'collections', title: 'Collections Framework', topics: ['List', 'Set', 'Map', 'Queue'], completed: false },
        { id: 'threads', title: 'Multithreading', topics: ['Thread Basics', 'Synchronization', 'Executor Framework'], completed: false },
        { id: 'java8', title: 'Java 8+ Features', topics: ['Lambda Expressions', 'Streams', 'Optional', 'Method References'], completed: false }
      ]
    },
    mern: {
      title: 'MERN Stack',
      icon: Database,
      color: 'from-green-500 to-teal-500',
      modules: [
        { id: 'html', title: 'HTML5', topics: ['Semantic HTML', 'Forms', 'Accessibility', 'SEO'], completed: true },
        { id: 'css', title: 'CSS3', topics: ['Flexbox', 'Grid', 'Animations', 'Responsive Design'], completed: false },
        { id: 'javascript', title: 'JavaScript ES6+', topics: ['Modern JS', 'Async/Await', 'Modules', 'DOM'], completed: false },
        { id: 'react', title: 'React.js', topics: ['Components', 'Hooks', 'State Management', 'Router'], completed: false },
        { id: 'nodejs', title: 'Node.js', topics: ['Express.js', 'Middleware', 'REST APIs', 'Authentication'], completed: false },
        { id: 'mongodb', title: 'MongoDB', topics: ['NoSQL Basics', 'Mongoose', 'Aggregation', 'Indexing'], completed: false }
      ]
    },
    aiml: {
      title: 'AI/ML & Data Science',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      modules: [
        { id: 'python', title: 'Python for Data Science', topics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'], completed: false },
        { id: 'statistics', title: 'Statistics & Probability', topics: ['Descriptive Stats', 'Inferential Stats', 'Probability'], completed: false },
        { id: 'ml', title: 'Machine Learning', topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'], completed: false },
        { id: 'dl', title: 'Deep Learning', topics: ['Neural Networks', 'CNN', 'RNN', 'Transformers'], completed: false },
        { id: 'nlp', title: 'Natural Language Processing', topics: ['Text Processing', 'Sentiment Analysis', 'Language Models'], completed: false }
      ]
    }
  };

  const currentTrack = learningTracks[selectedTrack as keyof typeof learningTracks];

  const startModule = (moduleId: string) => {
    dispatch({
      type: 'UPDATE_LEARNING_PROGRESS',
      payload: { topic: selectedTrack, moduleId, progress: 10 }
    });
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200 pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Learning Hub
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master the skills you need for your tech career
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Track Selection */}
          <div className="lg:col-span-1">
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                Learning Tracks
              </h3>
              <div className="space-y-3">
                {Object.entries(learningTracks).map(([key, track]) => {
                  const Icon = track.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedTrack(key)}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selectedTrack === key
                          ? `bg-gradient-to-r ${track.color} text-white border-transparent`
                          : state.darkMode
                          ? 'border-gray-700 hover:border-gray-600 text-gray-300'
                          : 'border-gray-200 hover:border-gray-300 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <div>
                          <h4 className="font-medium">{track.title}</h4>
                          <p className={`text-sm ${selectedTrack === key ? 'text-white/80' : state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {track.modules.length} modules
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-3">
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${currentTrack.color}`}>
                  <currentTrack.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentTrack.title}
                  </h2>
                  <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentTrack.modules.length} modules • Interactive learning
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentTrack.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-6 rounded-lg border ${
                      state.darkMode ? 'border-gray-700' : 'border-gray-200'
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          module.completed
                            ? 'bg-green-500 text-white'
                            : state.darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {module.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {module.title}
                          </h3>
                          <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {module.topics.length} topics
                          </p>
                        </div>
                      </div>
                      {module.completed && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Complete
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Topics Covered:
                      </h4>
                      <ul className="space-y-1">
                        {module.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className={`text-sm flex items-center space-x-2 ${
                              state.darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => startModule(module.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          module.completed
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>{module.completed ? 'Review' : 'Start Learning'}</span>
                      </button>
                      <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
                        state.darkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}>
                        <FileText className="w-4 h-4" />
                        <span>Notes</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;