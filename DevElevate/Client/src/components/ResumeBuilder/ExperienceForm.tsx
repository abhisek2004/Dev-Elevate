import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const ExperienceForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    description: ['']
  });

  const addExperience = () => {
    if (state.resume && formData.company && formData.position) {
      const updatedResume = {
        ...state.resume,
        experience: [...state.resume.experience, formData]
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setFormData({ company: '', position: '', duration: '', description: [''] });
    }
  };

  const updateExperience = (index: number) => {
    if (state.resume) {
      const updatedExperience = [...state.resume.experience];
      updatedExperience[index] = formData;
      const updatedResume = {
        ...state.resume,
        experience: updatedExperience
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setEditingIndex(null);
      setFormData({ company: '', position: '', duration: '', description: [''] });
    }
  };

  const deleteExperience = (index: number) => {
    if (state.resume) {
      const updatedExperience = state.resume.experience.filter((_, i) => i !== index);
      const updatedResume = {
        ...state.resume,
        experience: updatedExperience
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const startEdit = (index: number) => {
    if (state.resume) {
      setEditingIndex(index);
      setFormData(state.resume.experience[index]);
    }
  };

  const addDescriptionPoint = () => {
    setFormData({
      ...formData,
      description: [...formData.description, '']
    });
  };

  const updateDescriptionPoint = (index: number, value: string) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData({
      ...formData,
      description: newDescription
    });
  };

  const removeDescriptionPoint = (index: number) => {
    const newDescription = formData.description.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      description: newDescription
    });
  };

  if (!state.resume) return null;

  return (
    <div>
      <h2 className={`text-2xl font-bold tracking-wide mb-6 ${state.darkMode ? 'text-white drop-shadow-md' : 'text-gray-900 drop-shadow-sm'}`}>
        Work Experience
      </h2>

      {/* Experience Form */}
      <div className={`p-6 rounded-xl border shadow-sm transition-all duration-300 ${state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} mb-6`}>
        <h3 className={`text-lg font-semibold mb-4  tracking-wide ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {editingIndex !== null ? 'Edit Experience' : 'Add New Experience'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Company Name *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500  transition duration-200`}
              placeholder="Google"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border transition duration-200${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Software Engineer"
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Duration *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border transition duration-200 ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Jan 2022 - Present"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Job Description
          </label>
          {formData.description.map((desc, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={desc}
                onChange={(e) => updateDescriptionPoint(index, e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg border transition duration-200 ${
                  state.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="• Developed and maintained web applications using React and Node.js"
              />
              {formData.description.length > 1 && (
                <button
                  onClick={() => removeDescriptionPoint(index)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addDescriptionPoint}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Description Point</span>
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={editingIndex !== null ? () => updateExperience(editingIndex) : addExperience}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none text-white rounded-lg transition-all"
          >
            {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
          </button>
          {editingIndex !== null && (
            <button
              onClick={() => {
                setEditingIndex(null);
                setFormData({ company: '', position: '', duration: '', description: [''] });
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none text-white rounded-lg transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {state.resume.experience.map((exp, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-sm border transition duration-200 ${state.darkMode ? 'border-gray-700 bg-gray-800 hover:border-blue-500' : 'border-gray-200 bg-white hover:shadow-md'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-semibold text-lg mb-1 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {exp.position} <span className="font-normal">at</span> {exp.company}
                </h4>
                <p className={`text-sm italic ${state.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  {exp.duration}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className={`text-sm leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2 l-4 mt-1">
                <button
                  onClick={() => startEdit(index)}
                  className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                >
                  <Edit className="w-4 h-4 text-blue-500" />
                </button>
                <button
                  onClick={() => deleteExperience(index)}
                  className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;