import React from "react";
import {
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  AlertTriangle,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../contexts/GlobalContext";

const PrivacyPolicy: React.FC = () => {
  const { state } = useGlobalState();

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, profile details)",
        "Learning progress and activity data to track your educational journey",
        "Resume and career information you input into our builders",
        "Chat history with our AI Study Buddy for improving responses",
        "Usage analytics to enhance platform performance and user experience",
        "Device and browser information for security and optimization purposes",
      ],
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "Provide personalized learning experiences and track your progress",
        "Generate AI-powered recommendations for courses and career paths",
        "Improve our Study Buddy AI responses based on common queries",
        "Send relevant updates about new features, courses, and opportunities",
        "Analyze platform usage to enhance functionality and user experience",
        "Ensure platform security and prevent unauthorized access",
      ],
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      content: [
        "All data is encrypted in transit and at rest using industry-standard protocols",
        "We implement multi-factor authentication and secure access controls",
        "Regular security audits and vulnerability assessments are conducted",
        "Data is stored in secure, compliant cloud infrastructure",
        "Access to personal data is restricted to authorized personnel only",
        "We maintain detailed logs of data access for security monitoring",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights & Controls",
      content: [
        "Access and download all your personal data at any time",
        "Modify or update your profile information and preferences",
        "Delete your account and associated data permanently",
        "Opt-out of non-essential communications and marketing emails",
        "Control visibility of your profile and learning progress",
        "Request data portability to transfer information to other platforms",
      ],
    },
    {
      icon: Shield,
      title: "Third-Party Services",
      content: [
        "We integrate with educational platforms (YouTube, GitHub) for enhanced learning",
        "Analytics services help us understand user behavior and improve the platform",
        "Payment processors handle subscription and premium feature transactions",
        "AI services power our Study Buddy and recommendation systems",
        "All third-party integrations comply with strict privacy standards",
        "We never sell your personal data to third parties",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Important Notices",
      content: [
        "This platform is designed for educational and career development purposes",
        "We may update this privacy policy to reflect changes in our practices",
        "Users will be notified of significant policy changes via email",
        "Continued use of the platform constitutes acceptance of updated policies",
        "For questions or concerns, contact our privacy team directly",
        "This policy is effective as of the date of your account creation",
      ],
    },
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute bg-purple-500 rounded-full w-60 h-60 opacity-20 blur-3xl animate-blob animation-delay-2000 top-1/2 right-20"></div>
        <div className="absolute w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/3"></div>
      </div>

      <div className="relative z-10 max-w-5xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="text-blue-400 w-14 h-14 animate-bounce" />
          </div>
          <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Your privacy is our top priority. Learn how we protect your
            information on DevElevate.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-3xl p-10 shadow-2xl mb-10 transform hover:scale-[1.02] transition-transform">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            At DevElevate, we protect your data with care. This Privacy Policy
            explains how we collect, use, and secure your information while
            providing you with AI-powered education and career tools.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-2xl transform hover:-translate-y-1 hover:scale-[1.03] transition-all"
              >
                <div className="flex items-center mb-6 space-x-4">
                  <div className="flex items-center justify-center p-4 bg-gradient-to-tr from-purple-400 via-pink-500 to-blue-400 rounded-xl">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start space-x-3 text-gray-300"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-tr from-purple-400 via-pink-500 to-blue-400"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-3xl p-8 mt-12 shadow-2xl transform hover:scale-[1.02] transition-transform">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Questions About This Policy?
          </h3>
          <p className="mb-4 text-gray-300">
            If you have questions about this Privacy Policy, reach out to us:
          </p>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Email:</strong> officialdevelevate@gmail.com
            </p>
            <p>
              <strong>Creator:</strong> Abhisek Panda
            </p>
            <p>
              <strong>Response Time:</strong> Within 12 hours
            </p>
          </div>
        </div>

        {/* Return Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-transform shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            <Home className="w-5 h-5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;