import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const EducationForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    duration: '',
    gpa: ''
  });

  const addEducation = () => {
    if (state.resume && formData.institution && formData.degree) {
      const updatedResume = {
        ...state.resume,
        education: [...state.resume.education, formData]
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setFormData({ institution: '', degree: '', duration: '', gpa: '' });
    }
  };

  const updateEducation = (index: number) => {
    if (state.resume) {
      const updatedEducation = [...state.resume.education];
      updatedEducation[index] = formData;
      const updatedResume = {
        ...state.resume,
        education: updatedEducation
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setEditingIndex(null);
      setFormData({ institution: '', degree: '', duration: '', gpa: '' });
    }
  };

  const deleteEducation = (index: number) => {
    if (state.resume) {
      const updatedEducation = state.resume.education.filter((_, i) => i !== index);
      const updatedResume = {
        ...state.resume,
        education: updatedEducation
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const startEdit = (index: number) => {
    if (state.resume && state.resume.education && state.resume.education[index]) {
      setEditingIndex(index);
      const educationItem = state.resume.education[index];
      setFormData({
        institution: educationItem.institution,
        degree: educationItem.degree,
        duration: educationItem.duration,
        gpa: educationItem.gpa || ''
      });
    }
  };

  if (!state.resume) return null;

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Education
      </h2>

      {/* Education Form */}
      <div className={`p-6 rounded-lg border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {editingIndex !== null ? 'Edit Education' : 'Add New Education'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Institution *
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="University of California, Berkeley"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Degree *
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Duration *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="2018 - 2022"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              GPA (Optional)
            </label>
            <input
              type="text"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="3.8/4.0"
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={editingIndex !== null ? () => updateEducation(editingIndex) : addEducation}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {editingIndex !== null ? 'Update Education' : 'Add Education'}
          </button>
          {editingIndex !== null && (
            <button
              onClick={() => {
                setEditingIndex(null);
                setFormData({ institution: '', degree: '', duration: '', gpa: '' });
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {state.resume.education.map((edu, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {edu.degree}
                </h4>
                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {edu.institution}
                </p>
                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {edu.duration}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(index)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteEducation(index)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;