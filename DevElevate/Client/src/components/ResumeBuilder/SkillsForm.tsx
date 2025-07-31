import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const SkillsForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addTechnicalSkill = () => {
    if (state.resume && newTechnicalSkill.trim() && !state.resume.skills.technical.includes(newTechnicalSkill.trim())) {
      const updatedResume = {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          technical: [...state.resume.skills.technical, newTechnicalSkill.trim()]
        }
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
          technical: state.resume.skills.technical.filter(s => s !== skill)
        }
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const addSoftSkill = () => {
    if (state.resume && newSoftSkill.trim() && !state.resume.skills.soft.includes(newSoftSkill.trim())) {
      const updatedResume = {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          soft: [...state.resume.skills.soft, newSoftSkill.trim()]
        }
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
          soft: state.resume.skills.soft.filter(s => s !== skill)
        }
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const technicalSkillSuggestions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL',
    'HTML5', 'CSS3', 'TypeScript', 'Angular', 'Vue.js', 'Docker', 'AWS', 'Git', 'RESTful APIs',
    'GraphQL', 'Machine Learning', 'Data Analysis', 'SQL', 'NoSQL', 'Kubernetes', 'Jenkins'
  ];

  const softSkillSuggestions = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management',
    'Critical Thinking', 'Adaptability', 'Creativity', 'Project Management', 'Mentoring',
    'Conflict Resolution', 'Analytical Thinking', 'Attention to Detail', 'Presentation Skills'
  ];

  if (!state.resume) return null;

  return (
    <div>
      <h2 className={`text-2xl font--semibold mb-6 tracking-wide flex items-center gap-2${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Skills
      </h2>

      <div className="space-y-8">
        {/* Technical Skills */}
        <div className={`p-6 rounded-xl border shadow-sm transition-all  ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-4 tracking-wide flex items-center gap-2  ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technical Skills
          </h3>
          
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
              className={`flex-1 px-4 py-2 rounded-xl border shadow-sm text-sm transition-all duration-200 ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter a technical skill..."
            />
            <button
              onClick={addTechnicalSkill}
              className="p-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition duration-200 shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className={`text-sm mb-3 font-medium ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Popular technical skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {technicalSkillSuggestions.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => setNewTechnicalSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200  ${
                    state.darkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white'
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
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm transition-all duration-200  ${
                  state.darkMode
                    ? 'bg-blue-900 text-blue-200 hover:bg-blue-800'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <span  className="truncate">{skill}</span>
                <button
                  onClick={() => removeTechnicalSkill(skill)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className={`p-6 rounded-lg border shadow-sm transition-all ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-4 tracking-wide flex items-center gap-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Soft Skills
          </h3>
          
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
              className={`flex-1 px-4 py-2 rounded-xl border  shadow-sm text-sm transition-all duration-200 ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white  placeholder-gray-400 focus:ring-green-500 focus:border-green-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-500 focus:border-green-500'
              } focus:outline-none focus:ring-2 `}
              placeholder="Enter a soft skill..."
            />
            <button
              onClick={addSoftSkill}
              className="p-2 rounded-xl bg-green-500 hover:bg-green-600 text-white transition duration-200 shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className={`text-sm mb-3 font-medium ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Popular soft skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {softSkillSuggestions.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => setNewSoftSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    state.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
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
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm transition-all duration-200 ${
                  state.darkMode
                    ? 'bg-green-900 text-green-200 hover:bg-green-800'
                    : 'bg-green-100 text-green-700  hover:bg-green-200'
                }`}
              >
                 <span className="truncate">{skill}</span>
                <button
                  onClick={() => removeSoftSkill(skill)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
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