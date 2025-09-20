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
import { useGlobalState } from "../../../contexts/GlobalContext";
import { motion } from "framer-motion";

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
    <div className="overflow-hidden relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Optional floating neon blobs for futuristic effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/3 right-20"></div>
        <div className="absolute w-32 h-32 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/4"></div>
      </div>

      <div className="relative px-4 py-24 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center mb-4">
            <FileText className="w-12 h-12 text-indigo-400 animate-bounce" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-white text-center">
            Terms of Service
          </h1>
          <p className="text-lg mb-2 text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using DevElevate. They
            govern your use of our platform and services.
          </p>
          <div className="mt-2 text-sm text-gray-400">
            Effective Date: {new Date().toLocaleDateString()} | Version 1.0
          </div>
        </div>

        {/* Introduction */}
        <div className="rounded-2xl p-8 mb-8 border backdrop-blur-md shadow-lg bg-white/10 border-gray-700/40">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Welcome to DevElevate
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            These Terms of Service ("Terms") govern your use of DevElevate, an
            AI-powered education and career advancement platform. By creating an
            account or using our services, you agree to comply with these terms.
            DevElevate helps students, developers, and professionals advance
            their careers through structured learning, AI assistance, and career
            tools.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="rounded-2xl p-8 border backdrop-blur-md shadow-lg bg-white/10 border-gray-700/40 hover:scale-105 transition-transform"
              >
                <div className="flex items-center mb-6 space-x-3">
                  <div className="p-3 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-3 text-gray-300"
                    >
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Account Termination */}
        <div className="rounded-2xl p-8 mt-8 border backdrop-blur-md shadow-lg bg-red-900/20 border-red-800 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-4 text-white">
            Account Termination
          </h3>
          <p className="mb-4 text-gray-300">
            We reserve the right to suspend or terminate accounts for the
            following reasons:
          </p>
          <ul className="space-y-2 text-gray-300">
            {terminationReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="rounded-2xl p-8 mt-12 border backdrop-blur-md shadow-lg bg-white/10 border-gray-700/40 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-4 text-white">
            Questions or Concerns?
          </h3>
          <p className="mb-4 text-gray-300">
            If you have questions about these Terms of Service or need
            clarification:
          </p>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Email:</strong> legal@develevate.com
            </p>
            <p>
              <strong>Creator:</strong> Abhisek Panda
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              https://github.com/abhisek2004/Dev-Elevate.git
            </p>
          </div>
        </div>

        {/* Return Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/dashboard"
            className="flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform"
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
