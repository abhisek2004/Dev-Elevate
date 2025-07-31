import React from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';

const PersonalInfoForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();

  const updatePersonalInfo = (field: string, value: string) => {
    if (state.resume) {
      const updatedResume = {
        ...state.resume,
        personalInfo: {
          ...state.resume.personalInfo,
          [field]: value
        }
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const updateSummary = (value: string) => {
    if (state.resume) {
      const updatedResume = {
        ...state.resume,
        summary: value
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  if (!state.resume) return null;

  return (
    <div>
      <h2 className={`text-2xl font-bold tracking-wide mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Personal Information
      </h2>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 trransition-colors ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Name * <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.resume.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            className={`w-full px-3 py-2 rounded--xl border text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email Address *
          </label>
          <input
            type="email"
            value={state.resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className={`w-full px-3 py-2 rounded-text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone Number *
          </label>
          <input
            type="tel"
            value={state.resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className={`w-full px-3 py-2 rounded-text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode
                ? 'bg-gray-700 border-gray-600 text-white  placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Location
          </label>
          <input
            type="text"
            value={state.resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className={`w-full px-3 py-2 rounded-text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode
                ? 'bg-gray-700 border-gray-600 text-white  placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={state.resume.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className={`w-full px-3 py-2 rounded-text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            GitHub Profile
          </label>
          <input
            type="url"
            value={state.resume.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            className={`w-full px-3 py-2 rounded-text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900  placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Professional Summary
        </label>
        <textarea
          value={state.resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 rounded-text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            state.darkMode
              ? 'bg-gray-700 border-gray-600 text-white  placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Write a brief summary of your professional background and career objectives..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;