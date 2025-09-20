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
} from "lucide-react";

const endpoints = [
  {
    icon: <Lock className="w-7 h-7 text-indigo-400" />,
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
    icon: <Lock className="w-7 h-7 text-indigo-400" />,
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
    icon: <User className="w-7 h-7 text-blue-400" />,
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
    icon: <BookOpen className="w-7 h-7 text-green-400" />,
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
    icon: <MessageCircle className="w-7 h-7 text-purple-400" />,
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
    icon: <FileText className="w-7 h-7 text-orange-400" />,
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
    icon: <BarChart3 className="w-7 h-7 text-teal-400" />,
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
    icon: <Users className="w-7 h-7 text-pink-400" />,
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
    <div className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/2 right-20"></div>
        <div className="absolute w-32 h-32 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/3"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10 text-gray-100">
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
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Comprehensive RESTful APIs for authentication, user management,
            community features, ATS scanning, admin controls, and notifications
            in the DevElevate platform.
          </p>
        </section>

        {/* Endpoints Table */}
        <section className="mx-auto mb-12">
          <h2 className="mb-8 text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Available Endpoints
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-md bg-white/10">
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
                    className="border-t border-gray-700/50 hover:bg-indigo-800/20 transition-colors"
                  >
                    <td className="flex gap-3 items-center p-4">
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
          <h2 className="mb-8 text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Examples & Responses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {endpoints.map((ep, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-md bg-white/10"
              >
                <div className="flex gap-3 items-center mb-4">
                  {ep.icon}
                  <h3 className="text-lg font-semibold text-white">
                    {ep.title}
                  </h3>
                </div>
                <p className="mb-4 text-gray-300 text-sm">{ep.desc}</p>

                <h4 className="mb-2 font-semibold text-indigo-400">
                  Example Request
                </h4>
                <pre className="overflow-x-auto p-3 font-mono text-xs text-indigo-200 bg-gray-800/50 rounded-lg">
                  <code>{ep.example}</code>
                </pre>

                <h4 className="mt-4 mb-2 font-semibold text-indigo-400">
                  Example Response
                </h4>
                <pre className="overflow-x-auto p-3 font-mono text-xs text-indigo-200 bg-gray-800/50 rounded-lg">
                  <code>{ep.response}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Error Codes */}
        <section className="mx-auto mb-12 max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Error Codes
          </h2>
          <div className="p-6 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-md bg-white/10">
            <div className="flex gap-2 items-center mb-4">
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
                      className="border-t border-red-800/50 hover:bg-red-900/20 transition-colors"
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
            <code className="px-2 py-1 font-mono text-indigo-200 bg-gray-800/50 rounded">
              https://dev-elevate-backend.onrender.com
            </code>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ApiDocs;
