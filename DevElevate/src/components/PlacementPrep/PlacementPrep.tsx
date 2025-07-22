import React, { useState } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { FileText, Download, Users, Calendar, Target, BookOpen, ExternalLink } from 'lucide-react';

const PlacementPrep: React.FC = () => {
  const { state } = useGlobalState();
  const [selectedTab, setSelectedTab] = useState('opportunities');

  const tabs = [
    { id: 'opportunities', label: 'Job Opportunities', icon: Users },
    { id: 'interviews', label: 'Interview Prep', icon: Target },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'mock', label: 'Mock Interviews', icon: Calendar }
  ];

  const jobOpportunities = [
    {
      company: 'Google',
      position: 'Software Engineer',
      location: 'Mountain View, CA',
      type: 'Full-time',
      deadline: '2024-03-15',
      description: 'Join our team to build products that help create opportunities for everyone.',
      requirements: ['BS/MS in Computer Science', '3+ years experience', 'Strong coding skills'],
      salary: '$120,000 - $180,000',
      category: 'Product Based'
    },
    {
      company: 'Microsoft',
      position: 'AI Engineer',
      location: 'Seattle, WA',
      type: 'Full-time',
      deadline: '2024-03-20',
      description: 'Work on cutting-edge AI technologies and machine learning systems.',
      requirements: ['MS in AI/ML', 'Experience with Python/TensorFlow', 'Research background'],
      salary: '$130,000 - $200,000',
      category: 'Product Based'
    },
    {
      company: 'Amazon',
      position: 'SDE Intern',
      location: 'Multiple Locations',
      type: 'Internship',
      deadline: '2024-02-28',
      description: 'Summer internship program for software development engineers.',
      requirements: ['Currently pursuing CS degree', 'Strong programming skills', 'Problem-solving ability'],
      salary: '$8,000/month',
      category: 'Internship'
    },
    {
      company: 'TCS',
      position: 'Software Developer',
      location: 'Bangalore, India',
      type: 'Full-time',
      deadline: '2024-04-01',
      description: 'Join our digital transformation initiatives across various industries.',
      requirements: ['BE/BTech in any stream', 'Good communication skills', 'Aptitude for programming'],
      salary: '₹3.5 - 7 LPA',
      category: 'Mass Recruiter'
    }
  ];

  const interviewQuestions = [
    {
      category: 'Technical',
      questions: [
        'Explain the difference between == and === in JavaScript',
        'What is time complexity and how do you calculate it?',
        'Implement a binary search algorithm',
        'Explain the concept of closures in JavaScript',
        'What are the different types of joins in SQL?'
      ]
    },
    {
      category: 'HR',
      questions: [
        'Tell me about yourself',
        'Why do you want to work here?',
        'What are your strengths and weaknesses?',
        'Where do you see yourself in 5 years?',
        'Why are you leaving your current job?'
      ]
    },
    {
      category: 'Behavioral',
      questions: [
        'Describe a challenging project you worked on',
        'How do you handle tight deadlines?',
        'Tell me about a time you had to work with a difficult team member',
        'Describe a situation where you had to learn something new quickly',
        'How do you prioritize tasks when everything seems urgent?'
      ]
    }
  ];

  const resources = [
    {
      title: 'Complete Interview Preparation Guide',
      description: 'Comprehensive guide covering technical and HR interview preparation',
      type: 'PDF',
      size: '2.5 MB',
      downloads: 1250
    },
    {
      title: 'System Design Interview Handbook',
      description: 'Learn how to design scalable systems for tech interviews',
      type: 'PDF',
      size: '3.8 MB',
      downloads: 980
    },
    {
      title: 'DSA Cheat Sheet',
      description: 'Quick reference for data structures and algorithms',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 2100
    },
    {
      title: 'Behavioral Interview Questions Bank',
      description: 'Common behavioral questions with sample answers',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 750
    }
  ];

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
          Latest Job Opportunities
        </h3>
        <select className={`px-4 py-2 rounded-lg border shadow-sm ${
          state.darkMode
            ? 'bg-gray-800 border-gray-700 text-white'
            : 'bg-white border-gray-300 text-gray-800'
        }`}>
          <option>All Categories</option>
          <option>Product Based</option>
          <option>Mass Recruiter</option>
          <option>Internship</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobOpportunities.map((job, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border shadow-sm transition hover:shadow-md ${
              state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {job.position}
                </h4>
                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {job.company} • {job.location}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                job.type === 'Internship'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              }`}>
                {job.type}
              </span>
            </div>

            <p className={`text-sm mb-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {job.description}
            </p>

            <div className="mb-3">
              <h5 className={`text-sm font-semibold mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Requirements:
              </h5>
              <ul className="text-sm space-y-1">
                {job.requirements.map((req, reqIndex) => (
                  <li key={reqIndex} className={`flex items-center gap-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className={`text-sm font-medium ${state.darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {job.salary}
                </span>
                <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Deadline: {job.deadline}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
                <ExternalLink className="w-4 h-4" />
                <span>Apply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInterviews = () => (
    <div className="space-y-6">
      <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
        Interview Question Bank
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interviewQuestions.map((category, index) => (
          <div key={index} className={`p-6 rounded-xl border shadow-sm ${
            state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h4 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.category} Questions
            </h4>
            <div className="space-y-3">
              {category.questions.map((question, qIndex) => (
                <div key={qIndex} className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {question}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors">
              View All {category.category} Questions
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
        Download Resources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className={`p-6 rounded-xl border shadow-sm ${
            state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {resource.title}
                </h4>
                <p className={`text-sm mb-3 ${state.darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  {resource.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500 dark:text-gray-400">
                    {resource.type} • {resource.size} • {resource.downloads} downloads
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMockInterviews = () => (
    <div className="space-y-6">
      <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
        Mock Interview Practice
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Same as before */}
        {/* ... */}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'opportunities':
        return renderOpportunities();
      case 'interviews':
        return renderInterviews();
      case 'resources':
        return renderResources();
      case 'mock':
        return renderMockInterviews();
      default:
        return renderOpportunities();
    }
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Placement Preparation Arena
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Everything you need to ace your job interviews and land your dream job
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : state.darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;
