import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const SkillsForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addTechnicalSkill = () => {
    if (
      state.resume &&
      newTechnicalSkill.trim() &&
      !state.resume.skills.technical.includes(newTechnicalSkill.trim())
    ) {
      const updatedResume = {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          technical: [...state.resume.skills.technical, newTechnicalSkill.trim()],
        },
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    if (state.resume) {
      const updatedResume = {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          technical: state.resume.skills.technical.filter((s) => s !== skill),
        },
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const addSoftSkill = () => {
    if (
      state.resume &&
      newSoftSkill.trim() &&
      !state.resume.skills.soft.includes(newSoftSkill.trim())
    ) {
      const updatedResume = {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          soft: [...state.resume.skills.soft, newSoftSkill.trim()],
        },
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (skill: string) => {
    if (state.resume) {
      const updatedResume = {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          soft: state.resume.skills.soft.filter((s) => s !== skill),
        },
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const technicalSkillSuggestions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL',
    'HTML5', 'CSS3', 'TypeScript', 'Angular', 'Vue.js', 'Docker', 'AWS', 'Git', 'RESTful APIs',
    'GraphQL', 'Machine Learning', 'Data Analysis', 'SQL', 'NoSQL', 'Kubernetes', 'Jenkins',
  ];

  const softSkillSuggestions = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management',
    'Critical Thinking', 'Adaptability', 'Creativity', 'Project Management', 'Mentoring',
    'Conflict Resolution', 'Analytical Thinking', 'Attention to Detail', 'Presentation Skills',
  ];

  if (!state.resume) return null;

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Skills
      </h2>

      <div className="space-y-8">
        {/* Technical Skills */}
        <div className={`p-6 rounded-lg border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technical Skills
          </h3>

          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTechnicalSkill();
                }
              }}
              className={`flex-1 px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter a technical skill..."
            />
            <button
              onClick={addTechnicalSkill}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <p className={`text-sm mb-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Popular technical skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {technicalSkillSuggestions.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!state.resume.skills.technical.includes(skill)) {
                      const updatedResume = {
                        ...state.resume,
                        skills: {
                          ...state.resume.skills,
                          technical: [...state.resume.skills.technical, skill],
                        },
                      };
                      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
                    }
                    setNewTechnicalSkill('');
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    state.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {state.resume.skills.technical.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                  state.darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeTechnicalSkill(skill)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className={`p-6 rounded-lg border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Soft Skills
          </h3>

          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSoftSkill();
                }
              }}
              className={`flex-1 px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter a soft skill..."
            />
            <button
              onClick={addSoftSkill}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <p className={`text-sm mb-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Popular soft skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {softSkillSuggestions.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!state.resume.skills.soft.includes(skill)) {
                      const updatedResume = {
                        ...state.resume,
                        skills: {
                          ...state.resume.skills,
                          soft: [...state.resume.skills.soft, skill],
                        },
                      };
                      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
                    }
                    setNewSoftSkill('');
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    state.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {state.resume.skills.soft.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                  state.darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                }`}
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSoftSkill(skill)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
