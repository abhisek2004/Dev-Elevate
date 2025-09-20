import React, { useState } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';

const PersonalInfoForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!value) newErrors.name = 'Full Name is required.';
        else delete newErrors.name;
        break;
      
      case 'email':
        if (!value) newErrors.email = 'Email is required.';
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
          newErrors.email = 'Please enter a correctly formatted email address.';
        }
        else delete newErrors.email;
        break;

      case 'phone':
        if (!value) newErrors.phone = 'Phone number is required.';
        else if (!/^[1-9][0-9]{9}$/.test(value)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number.';
        }
        else delete newErrors.phone;
        break;

      // --- CORRECTED LOGIC FOR URLS ---
      case 'linkedin':
        // Optional field: Now validates the domain and allows any valid path afterwards.
        if (value && !/^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/.test(value)) {
          newErrors.linkedin = 'Please enter a valid LinkedIn profile URL.';
        } else {
          delete newErrors.linkedin;
        }
        break;

      case 'github':
        // Optional field: Now validates the domain and allows any valid path afterwards.
        if (value && !/^(https?:\/\/)?(www\.)?github\.com\/.+$/.test(value)) {
          newErrors.github = 'Please enter a valid GitHub profile URL.';
        } else {
          delete newErrors.github;
        }
        break;
        
      default:
        break;
    }
    setErrors(newErrors);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    validateField(field, value); // Validate on change
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
      const updatedResume = { ...state.resume, summary: value };
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
        {/* Full Name */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Name *
          </label>
          <input
            type="text"
            required
            value={state.resume.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email Address *
          </label>
          <input
            type="email"
            required
            value={state.resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone Number *
          </label>
          <input
            type="tel"
            required
            maxLength={10} // Enforce 10 digits at browser level
            value={state.resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="9876543210"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Location */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Location
          </label>
          <input
            type="text"
            value={state.resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${ state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="Bengaluru, India"
          />
        </div>

        {/* LinkedIn Profile */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={state.resume.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 ${errors.linkedin ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="https://linkedin.com/in/johndoe"
          />
          {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
        </div>

        {/* GitHub Profile */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            GitHub Profile
          </label>
          <input
            type="url"
            value={state.resume.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 ${errors.github ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="https://github.com/johndoe"
          />
          {errors.github && <p className="text-red-500 text-xs mt-1">{errors.github}</p>}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mt-6">
        <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Professional Summary
        </label>
        <textarea
          value={state.resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${ state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          placeholder="Write a brief summary of your professional background and career objectives..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;