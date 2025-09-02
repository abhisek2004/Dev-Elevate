import React, { useState } from 'react';
import { useGlobalState } from '../../../contexts/GlobalContext';
import { PlayCircle, FileText, CheckCircle, Clock, BookOpen, X } from 'lucide-react';
import TopicView from './TopicView';
import { mernModules } from './moduleContent';

interface Module {
  id: string;
  title: string;
  topics: string[];
  completed: boolean;
}

interface ModuleCardsProps {
  modules: Module[];
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  moduleTitle: string;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, moduleId, moduleTitle }) => {
  const { state } = useGlobalState();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/learning/mern/notes/${moduleId}`, {
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
        onClose();
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-2xl mx-4`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Notes for {moduleTitle}
          </h3>
          <button
            onClick={onClose}
            className={`${state.darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your MERN stack notes here..."
          className={`w-full h-64 p-3 rounded-lg border resize-none ${state.darkMode
            ? 'bg-gray-900 border-gray-600 text-gray-300 placeholder-gray-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          }`}
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border ${state.darkMode
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveNotes}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ModuleCards: React.FC<ModuleCardsProps> = ({ modules }) => {
  const { state } = useGlobalState();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [notesModal, setNotesModal] = useState<{isOpen: boolean, moduleId: string, moduleTitle: string}>({
    isOpen: false, moduleId: '', moduleTitle: ''
  });

  const handleStartLearning = (moduleId: string) => {
    setSelectedModule(moduleId);
    const moduleContent = mernModules[moduleId as keyof typeof mernModules];
    if (moduleContent && moduleContent.topics.length > 0) {
      setSelectedTopic(moduleContent.topics[0].id);
    }
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedTopic(null);
  };

  const handleOpenNotes = (moduleId: string, moduleTitle: string) => {
    setNotesModal({isOpen: true, moduleId, moduleTitle});
  };

  const handleCloseNotes = () => {
    setNotesModal({isOpen: false, moduleId: '', moduleTitle: ''});
  };

  if (selectedModule && selectedTopic) {
    return (
      <TopicView
        moduleId={selectedModule}
        topicId={selectedTopic}
        onBack={handleBackToModules}
        onTopicChange={setSelectedTopic}
      />
    );
  }

  return (
    <>
      <NotesModal 
        isOpen={notesModal.isOpen}
        onClose={handleCloseNotes}
        moduleId={notesModal.moduleId}
        moduleTitle={notesModal.moduleTitle}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => {
          const moduleContent = mernModules[module.id as keyof typeof mernModules];
          
          return (
            <div
              key={module.id}
              className={`p-6 rounded-lg border group transition-all duration-200 ${
                state.darkMode ? 'border-gray-700 bg-gray-800 hover:shadow-lg' : 'border-gray-200 bg-white hover:shadow-md'
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-sm ${
                    module.completed
                      ? 'bg-green-500 text-white'
                      : state.darkMode
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                      : 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                  }`}>
                    {module.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <div>
                    <h3 className={`font-semibold leading-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {module.title}
                    </h3>
                    <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {moduleContent?.topics?.length || module.topics.length} topics
                    </p>
                  </div>
                </div>
                {module.completed && (
                  <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                    Complete
                  </span>
                )}
              </div>

              {moduleContent && (
                <div className="mb-4">
                  <p className={`text-sm mb-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {moduleContent.description}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <h4 className={`text-sm font-semibold mb-3 tracking-wide ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Topics Covered:
                </h4>
                <ul className="space-y-1.5">
                  {module.topics.map((topic, topicIndex) => (
                    <li
                      key={topicIndex}
                      className={`text-sm flex items-center gap-2 ${
                        state.darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500`}
                      ></span>
                      <span className="leading-snug">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleStartLearning(module.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm ${
                    module.completed
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white'
                  }`}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Start Learning</span>
                </button>
                <button 
                  onClick={() => handleOpenNotes(module.id, module.title)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors shadow-sm ${
                    state.darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Notes</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ModuleCards;