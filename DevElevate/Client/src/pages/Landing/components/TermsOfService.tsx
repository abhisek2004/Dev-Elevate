import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useGlobalState } from "../../contexts/GlobalContext";

const TermsOfService: React.FC = () => {
  const { state } = useGlobalState();

  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using DevElevate, you accept and agree to be bound by these Terms of Service",
        "These terms apply to all users, including students, educators, and career professionals",
        "If you disagree with any part of these terms, you may not access the service",
        "We reserve the right to update these terms at any time with notice to users",
        "Continued use after changes constitutes acceptance of new terms",
      ],
    },
    {
      icon: Users,
      title: "User Accounts & Responsibilities",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account credentials",
        "You must be at least 13 years old to create an account (with parental consent if under 18)",
        "One person may not maintain multiple accounts for the same services",
        "You are responsible for all activities that occur under your account",
        "Notify us immediately of any unauthorized use of your account",
      ],
    },
    {
      icon: Shield,
      title: "Acceptable Use Policy",
      content: [
        "Use the platform only for lawful educational and career development purposes",
        "Do not upload, share, or distribute harmful, offensive, or inappropriate content",
        "Respect intellectual property rights of all content creators and contributors",
        "Do not attempt to hack, disrupt, or compromise platform security",
        "Do not spam, harass, or abuse other users or our AI systems",
        "Commercial use requires explicit written permission from DevElevate",
      ],
    },
    {
      icon: FileText,
      title: "Content & Intellectual Property",
      content: [
        "You retain ownership of content you create and upload to the platform",
        "By uploading content, you grant us a license to use it for platform operations",
        "We respect intellectual property rights and respond to valid DMCA notices",
        "Our AI-generated content and platform features are proprietary to DevElevate",
        "You may not reverse engineer, copy, or redistribute our proprietary technology",
        "Educational content is provided for personal learning and development only",
      ],
    },
    {
      icon: AlertCircle,
      title: "Service Availability & Limitations",
      content: [
        "We strive for 99.9% uptime but cannot guarantee uninterrupted service availability",
        "Scheduled maintenance will be announced in advance when possible",
        "We are not liable for temporary service interruptions or technical issues",
        "Some features may be limited based on your subscription tier or account type",
        "We reserve the right to modify or discontinue features with reasonable notice",
        "Third-party integrations may have their own availability limitations",
      ],
    },
    {
      icon: XCircle,
      title: "Prohibited Activities",
      content: [
        "Creating fake accounts or impersonating others",
        "Sharing account credentials with unauthorized users",
        "Attempting to access restricted areas or other users' private data",
        "Using automated tools to scrape or download platform content",
        "Distributing malware, viruses, or other harmful software",
        "Engaging in any activity that violates applicable laws or regulations",
      ],
    },
  ];

  const terminationReasons = [
    "Violation of these Terms of Service or our Community Guidelines",
    "Fraudulent activity or misuse of platform features",
    "Harassment or abuse of other users or staff members",
    "Repeated violations after warnings and temporary suspensions",
    "Legal requirements or court orders",
    "User request for account deletion",
  ];

  return (
    <div
      className={`min-h-screen ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center mb-4">
            <FileText className="w-12 h-12 text-blue-500" />
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Terms of Service
          </h1>
          <p
            className={`text-lg ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Please read these terms carefully before using DevElevate. They
            govern your use of our platform and services.
          </p>
          <div
            className={`mt-4 text-sm ${
              state.darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Effective Date: {new Date().toLocaleDateString()} | Version 1.0
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
            Welcome to DevElevate
          </h2>
          <p
            className={`text-lg leading-relaxed ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            These Terms of Service ("Terms") govern your use of DevElevate, an
            AI-powered education and career advancement platform. By creating an
            account or using our services, you agree to comply with these terms.
            DevElevate is designed to help students, developers, and
            professionals advance their careers through structured learning, AI
            assistance, and comprehensive career tools.
          </p>
        </div>

        {/* Main Sections */}
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
                } rounded-xl p-8 border shadow-sm`}
              >
                <div className="flex items-center mb-6 space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
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
                      className={`flex items-start space-x-3 ${
                        state.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Account Termination */}
        <div
          className={`${
            state.darkMode
              ? "bg-red-900/20 border-red-800"
              : "bg-red-50 border-red-200"
          } rounded-xl p-8 border mt-8`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Account Termination
          </h3>
          <p
            className={`mb-4 ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            We reserve the right to suspend or terminate accounts for the
            following reasons:
          </p>
          <ul className="space-y-2">
            {terminationReasons.map((reason, index) => (
              <li
                key={index}
                className={`flex items-start space-x-3 ${
                  state.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitation of Liability */}
        <div
          className={`${
            state.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-yellow-50 border-yellow-200"
          } rounded-xl p-8 border mt-8`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Limitation of Liability
          </h3>
          <div
            className={`space-y-4 ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p>
              DevElevate is provided "as is" without warranties of any kind. We
              do not guarantee that the platform will meet your specific
              requirements or that it will be error-free, secure, or
              continuously available.
            </p>
            <p>
              To the maximum extent permitted by law, DevElevate shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, or use.
            </p>
            <p>
              Our total liability for any claims arising from your use of the
              platform shall not exceed the amount you paid for the service in
              the 12 months preceding the claim.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className={`${
            state.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-blue-50 border-blue-200"
          } rounded-xl p-8 border mt-12`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Questions or Concerns?
          </h3>
          <p
            className={`mb-4 ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            If you have questions about these Terms of Service or need
            clarification on any policies:
          </p>
          <div className="space-y-2">
            <p
              className={`${
                state.darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Email:</strong> legal@develevate.com
            </p>
            <p
              className={`${
                state.darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Creator:</strong> Abhisek Panda
            </p>
            <p
              className={`${
                state.darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>GitHub:</strong>{" "}
              https://github.com/abhisek2004/Dev-Elevate.git
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

export default TermsOfService;
