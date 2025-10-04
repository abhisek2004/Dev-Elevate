import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  BookOpen,
  MessageCircle,
  FileText,
  BarChart3,
  Users,
  AlertCircle,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

const endpoints = [
  {
    icon: <Lock className="text-indigo-400 w-7 h-7" />,
    title: "User Signup",
    desc: "Register a new user with role-based access.",
    method: "POST",
    url: "/api/v1/auth/signup",
    example: `fetch("/api/v1/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "securepass",
    role: "user"
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
  },
  {
    icon: <Lock className="text-indigo-400 w-7 h-7" />,
    title: "User Login",
    desc: "Authenticate user and return JWT token.",
    method: "POST",
    url: "/api/v1/auth/login",
    example: `fetch("/api/v1/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "john@example.com",
    password: "securepass"
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
  },
  {
    icon: <User className="text-blue-400 w-7 h-7" />,
    title: "User Streak",
    desc: "Get user's current streak information.",
    method: "GET",
    url: "/api/v1/user/streak",
    example: `fetch("/api/v1/user/streak", {
  headers: { Authorization: "Bearer <token>" }
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `{
  "success": true,
  "data": {
    "currentStreak": 7,
    "longestStreak": 14,
    "streakStartDate": "2025-09-10"
  }
}`,
  },
  {
    icon: <BookOpen className="text-green-400 w-7 h-7" />,
    title: "Latest News",
    desc: "Fetch latest tech news updates.",
    method: "GET",
    url: "/api/v1/latest-news",
    example: `fetch("/api/v1/latest-news")
  .then(res => res.json())
  .then(data => console.log(data));`,
    response: `[
  {
    "id": 1,
    "title": "Latest AI Breakthroughs",
    "description": "Summary of recent news...",
    "url": "https://news.example.com/article1",
    "date": "2025-09-17"
  }
]`,
  },
  {
    icon: <MessageCircle className="text-purple-400 w-7 h-7" />,
    title: "Submit Feedback",
    desc: "Submit user feedback to the platform.",
    method: "POST",
    url: "/api/v1/feedback",
    example: `fetch("/api/v1/feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    rating: 5,
    comment: "Great platform!"
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `{
  "success": true,
  "message": "Feedback submitted successfully"
}`,
  },
  {
    icon: <FileText className="text-orange-400 w-7 h-7" />,
    title: "ATS Resume Scan",
    desc: "Analyze resume for ATS compatibility and keywords.",
    method: "POST",
    url: "/api/v1/ats/scan",
    example: `fetch("/api/v1/ats/scan", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    resumeText: "John Doe... Full resume content",
    jobDescription: "Required skills: React, Node.js..."
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `{
  "success": true,
  "data": {
    "matchPercentage": 85,
    "keywords": ["React", "Node.js", "MongoDB"],
    "suggestions": ["Add more quantifiable achievements"]
  }
}`,
  },
  {
    icon: <BarChart3 className="text-teal-400 w-7 h-7" />,
    title: "Admin Courses",
    desc: "Manage courses (GET list, POST create).",
    method: "GET/POST",
    url: "/api/v1/admin/courses",
    example: `// GET all courses
fetch("/api/v1/admin/courses", {
  headers: { Authorization: "Bearer <admin-token>" }
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `[
  {
    "id": "course1",
    "title": "DSA Fundamentals",
    "description": "Learn Data Structures and Algorithms",
    "topics": ["Arrays", "Linked Lists"]
  }
]`,
  },
  {
    icon: <Users className="text-pink-400 w-7 h-7" />,
    title: "Notifications",
    desc: "Get user notifications.",
    method: "GET",
    url: "/api/v1/notifications",
    example: `fetch("/api/v1/notifications", {
  headers: { Authorization: "Bearer <token>" }
})
.then(res => res.json())
.then(data => console.log(data));`,
    response: `[
  {
    "id": 1,
    "title": "New Assignment Available",
    "message": "Complete DSA Quiz",
    "read": false,
    "date": "2025-09-17"
  }
]`,
  },
];

const ApiDocs = () => {
  return (
    <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute bg-purple-500 rounded-full w-60 h-60 opacity-20 blur-3xl animate-blob animation-delay-2000 top-1/2 right-20"></div>
        <div className="absolute w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/3"></div>
      </div>

      <div className="relative z-10 px-6 mx-auto text-gray-100 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-12 text-center sm:mb-16">
          <motion.h1
            className="mb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            API Documentation
          </motion.h1>
          <p className="max-w-3xl mx-auto text-base leading-relaxed text-gray-300 sm:text-lg">
            Comprehensive RESTful APIs for authentication, user management,
            community features, ATS scanning, admin controls, and notifications
            in the DevElevate platform.
          </p>
        </section>

        {/* Endpoints Table */}
        <section className="mx-auto mb-12">
          <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Available Endpoints
          </h2>
          <div className="overflow-x-auto border shadow-2xl rounded-2xl border-gray-700/50 backdrop-blur-md bg-white/10">
            <table className="w-full border-collapse">
              <thead className="bg-indigo-900/30">
                <tr>
                  <th className="p-4 font-semibold text-left">API</th>
                  <th className="p-4 font-semibold text-left">Method</th>
                  <th className="p-4 font-semibold text-left">Endpoint</th>
                  <th className="p-4 font-semibold text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors border-t border-gray-700/50 hover:bg-indigo-800/20"
                  >
                    <td className="flex items-center gap-3 p-4">
                      {ep.icon}
                      <span>{ep.title}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-800 dark:text-indigo-300">
                        {ep.method}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm text-gray-300">
                      {ep.url}
                    </td>
                    <td className="p-4 text-gray-300">{ep.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Endpoint Examples */}
        <section className="mx-auto mb-12">
          <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Examples & Responses
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
            {endpoints.map((ep, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-6 border shadow-2xl rounded-2xl border-gray-700/50 backdrop-blur-md bg-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  {ep.icon}
                  <h3 className="text-lg font-semibold text-white">
                    {ep.title}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-gray-300">{ep.desc}</p>

                <h4 className="mb-2 font-semibold text-indigo-400">
                  Example Request
                </h4>
                <pre className="p-3 overflow-x-auto font-mono text-xs text-indigo-200 rounded-lg bg-gray-800/50">
                  <code>{ep.example}</code>
                </pre>

                <h4 className="mt-4 mb-2 font-semibold text-indigo-400">
                  Example Response
                </h4>
                <pre className="p-3 overflow-x-auto font-mono text-xs text-indigo-200 rounded-lg bg-gray-800/50">
                  <code>{ep.response}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Error Codes */}
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Error Codes
          </h2>
          <div className="p-6 border shadow-2xl rounded-2xl border-gray-700/50 backdrop-blur-md bg-white/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-white">
                Common Errors
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-red-900/30">
                  <tr>
                    <th className="p-3 font-semibold text-left text-red-400">
                      Code
                    </th>
                    <th className="p-3 font-semibold text-left text-red-400">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      code: 400,
                      desc: "Bad Request - Invalid input data or missing parameters",
                    },
                    {
                      code: 401,
                      desc: "Unauthorized - Authentication required or invalid token",
                    },
                    {
                      code: 403,
                      desc: "Forbidden - Insufficient permissions for the action",
                    },
                    {
                      code: 404,
                      desc: "Not Found - Resource or endpoint not available",
                    },
                    {
                      code: 500,
                      desc: "Internal Server Error - Unexpected server-side issue",
                    },
                  ].map((err, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors border-t border-red-800/50 hover:bg-red-900/20"
                    >
                      <td className="p-3 font-bold text-red-400">{err.code}</td>
                      <td className="p-3 text-gray-300">{err.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="pt-6 mt-8 text-center text-gray-400 border-t border-gray-700/50">
          <p className="text-sm">
            All requests require proper authentication. Base URL:{" "}
            <code className="px-2 py-1 font-mono text-indigo-200 rounded bg-gray-800/50">
              /api/v1/auth/
            </code>
          </p>
        </footer>

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

export default ApiDocs;