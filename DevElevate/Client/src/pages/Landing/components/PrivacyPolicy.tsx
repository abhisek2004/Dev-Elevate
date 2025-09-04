import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const PrivacyPolicy: React.FC = () => {
  const { state } = useGlobalState();

  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, profile details)',
        'Learning progress and activity data to track your educational journey',
        'Resume and career information you input into our builders',
        'Chat history with our AI Study Buddy for improving responses',
        'Usage analytics to enhance platform performance and user experience',
        'Device and browser information for security and optimization purposes'
      ]
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      content: [
        'Provide personalized learning experiences and track your progress',
        'Generate AI-powered recommendations for courses and career paths',
        'Improve our Study Buddy AI responses based on common queries',
        'Send relevant updates about new features, courses, and opportunities',
        'Analyze platform usage to enhance functionality and user experience',
        'Ensure platform security and prevent unauthorized access'
      ]
    },
    {
      icon: Lock,
      title: 'Data Protection & Security',
      content: [
        'All data is encrypted in transit and at rest using industry-standard protocols',
        'We implement multi-factor authentication and secure access controls',
        'Regular security audits and vulnerability assessments are conducted',
        'Data is stored in secure, compliant cloud infrastructure',
        'Access to personal data is restricted to authorized personnel only',
        'We maintain detailed logs of data access for security monitoring'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights & Controls',
      content: [
        'Access and download all your personal data at any time',
        'Modify or update your profile information and preferences',
        'Delete your account and associated data permanently',
        'Opt-out of non-essential communications and marketing emails',
        'Control visibility of your profile and learning progress',
        'Request data portability to transfer information to other platforms'
      ]
    },
    {
      icon: Shield,
      title: 'Third-Party Services',
      content: [
        'We integrate with educational platforms (YouTube, GitHub) for enhanced learning',
        'Analytics services help us understand user behavior and improve the platform',
        'Payment processors handle subscription and premium feature transactions',
        'AI services power our Study Buddy and recommendation systems',
        'All third-party integrations comply with strict privacy standards',
        'We never sell your personal data to third parties'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Important Notices',
      content: [
        'This platform is designed for educational and career development purposes',
        'We may update this privacy policy to reflect changes in our practices',
        'Users will be notified of significant policy changes via email',
        'Continued use of the platform constitutes acceptance of updated policies',
        'For questions or concerns, contact our privacy team directly',
        'This policy is effective as of the date of your account creation'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Privacy Policy
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className={`mt-4 text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Introduction */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm mb-8`}>
          <h2 className={`text-2xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Commitment to Your Privacy
          </h2>
          <p className={`text-lg leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            At DevElevate, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy outlines how we collect, use, store, and protect your data when you use our AI-powered 
            education and career advancement platform. We believe in transparency and want you to understand exactly how 
            your information is handled.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-start space-x-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} rounded-xl p-8 border mt-12`}>
          <h3 className={`text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Questions About This Policy?
          </h3>
          <p className={`mb-4 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us:
          </p>
          <div className="space-y-2">
            <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Email:</strong> privacy@develevate.com
            </p>
            <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Creator:</strong> Abhisek Panda
            </p>
            <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Response Time:</strong> We aim to respond within 48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;