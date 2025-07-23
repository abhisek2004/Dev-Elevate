import React, { useState } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Download, Save, Edit, Plus, Trash2, Eye } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import ResumePreview from './ResumePreview';

const ResumeBuilder: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: Edit },
    { id: 'experience', label: 'Experience', icon: Edit },
    { id: 'education', label: 'Education', icon: Edit },
    { id: 'projects', label: 'Projects', icon: Edit },
    { id: 'skills', label: 'Skills', icon: Edit }
  ];

  const initializeResume = () => {
    if (!state.resume) {
      const defaultResume = {
        id: '1',
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: ''
        },
        summary: '',
        experience: [],
        education: [],
        projects: [],
        skills: {
          technical: [],
          soft: []
        }
      };
      dispatch({ type: 'UPDATE_RESUME', payload: defaultResume });
    }
  };

  React.useEffect(() => {
    initializeResume();
  }, []);

  const renderActiveSection = () => {
    if (!state.resume) return null;

    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const downloadResume = () => {
    // This would integrate with a PDF generation library
    alert('Resume download feature would be implemented with PDF generation');
  };

  const saveResume = () => {
    // Resume is automatically saved to global state and localStorage
    alert('Resume saved successfully!');
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200 pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Resume Builder
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Create an ATS-friendly resume that gets you noticed
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Hide Preview' : 'Preview Resume'}</span>
          </button>
          <button
            onClick={saveResume}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Resume</span>
          </button>
          <button
            onClick={downloadResume}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

        {showPreview ? (
          <ResumePreview />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Section Navigation */}
            <div className="lg:col-span-1">
              <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Resume Sections
                </h3>
                <div className="space-y-2">
                  {sections.map(section => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          activeSection === section.id
                            ? 'bg-blue-500 text-white border-blue-500'
                            : state.darkMode
                            ? 'border-gray-700 hover:border-gray-600 text-gray-300'
                            : 'border-gray-200 hover:border-gray-300 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{section.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                {renderActiveSection()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;