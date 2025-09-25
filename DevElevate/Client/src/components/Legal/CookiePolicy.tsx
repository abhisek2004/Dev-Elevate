import React from "react";
import {
  Cookie,
  Settings,
  Eye,
  Shield,
  Database,
  Clock,
  Home,
} from "lucide-react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";

const CookiePolicy: React.FC = () => {
  const { state } = useGlobalState();

  const sections = [
    {
      icon: Cookie,
      title: "What Are Cookies?",
      content: [
        "Cookies are small text files stored on your device when you visit our website",
        "They help us remember your preferences and improve your browsing experience",
        "Cookies do not contain personally identifiable information on their own",
        "They are widely used by websites to make them work more efficiently",
        "You can control and manage cookies through your browser settings",
      ],
    },
    {
      icon: Database,
      title: "Types of Cookies We Use",
      content: [
        "Essential Cookies: Required for basic website functionality and security",
        "Preference Cookies: Remember your settings like theme (dark/light mode) and language",
        "Analytics Cookies: Help us understand how you use our platform to improve it",
        "Performance Cookies: Collect information about website performance and loading times",
        "Functional Cookies: Enable enhanced features like chat history and progress tracking",
      ],
    },
    {
      icon: Settings,
      title: "How We Use Cookies",
      content: [
        "Remember your login status and keep you signed in securely",
        "Save your preferred theme (dark or light mode) and other customizations",
        "Track your learning progress and course completions",
        "Analyze website usage patterns to improve user experience",
        "Provide personalized content and feature recommendations",
        "Ensure website security and prevent unauthorized access",
      ],
    },
    {
      icon: Clock,
      title: "Cookie Duration",
      content: [
        "Session Cookies: Deleted when you close your browser",
        "Persistent Cookies: Remain on your device until they expire or are manually deleted",
        "Essential cookies may persist for up to 1 year",
        "Analytics cookies typically expire after 2 years",
        "Preference cookies are stored for up to 1 year to remember your settings",
      ],
    },
    {
      icon: Eye,
      title: "Third-Party Cookies",
      content: [
        "We may use cookies from trusted third-party services like Google Analytics",
        "These help us understand website performance and user behavior",
        "Third-party cookies are governed by their respective privacy policies",
        "We do not share personal information with third parties without consent",
        "You can opt out of third-party cookies through your browser settings",
      ],
    },
    {
      icon: Shield,
      title: "Managing Your Cookie Preferences",
      content: [
        "You can accept or reject cookies through our privacy banner when you first visit",
        "Browser settings allow you to block, delete, or manage cookies",
        "Disabling certain cookies may affect website functionality",
        "You can change your cookie preferences at any time",
        "Contact us if you need help managing your cookie settings",
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center mb-4">
            <Cookie className="w-12 h-12 text-blue-500" />
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Cookie Policy
          </h1>
          <p
            className={`text-lg ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Learn how we use cookies to enhance your experience on DevElevate
            and how you can manage your preferences.
          </p>
          <div
            className={`mt-4 text-sm ${
              state.darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Introduction */}
        <div
          className={`${
            state.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-8 border shadow-sm mb-8`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Our Commitment to Transparency
          </h2>
          <p
            className={`text-lg leading-relaxed ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            At DevElevate, we believe in being transparent about how we use
            cookies and similar technologies. This Cookie Policy explains what
            cookies are, how we use them, and how you can control them to ensure
            your privacy preferences are respected while enjoying the best
            possible experience on our platform.
          </p>
        </div>

        {/* Cookie Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className={`${
                  state.darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border shadow-sm`}
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 text-blue-500 mr-3" />
                  <h3
                    className={`text-xl font-semibold ${
                      state.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-start ${
                        state.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div
          className={`${
            state.darkMode
              ? "bg-gradient-to-r from-blue-900 to-purple-900"
              : "bg-gradient-to-r from-blue-50 to-purple-50"
          } rounded-xl p-8 mt-12`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Questions About Our Cookie Policy?
          </h3>
          <p
            className={`mb-6 ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            If you have any questions about how we use cookies or need help
            managing your preferences, we're here to help.
          </p>
          <div
            className={`space-y-2 ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p>
              <strong>Email:</strong> privacy@develevate.com
            </p>
            <p>
              <strong>Support:</strong> Available 24/7 through our help center
            </p>
            <p
              className={`${
                state.darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Response Time:</strong> We aim to respond within 48 hours
            </p>
          </div>
        </div>

        {/* Return to Dashboard Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/dashboard"
            className="flex gap-2 items-center px-6 py-3 font-medium text-white bg-purple-600 rounded-xl shadow-lg transition hover:bg-purple-700"
          >
            <Home className="w-5 h-5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;