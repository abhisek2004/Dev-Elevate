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
    AlertCircle
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
        <div className="px-4 py-8 min-h-screen text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 sm:px-6 sm:py-16">
            {/* Hero Section */}
            <section className="mb-12 text-center sm:mb-16">
                <motion.h1
                    className="mb-4 text-3xl font-bold text-indigo-800 sm:text-4xl md:text-5xl dark:text-indigo-200"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    API Documentation
                </motion.h1>
                <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
                    Comprehensive RESTful APIs for authentication, user management, community features, ATS scanning, admin controls, and notifications in the DevElevate platform.
                </p>
            </section>

            {/* Endpoints Section */}
            <section className="mx-auto mb-12 max-w-7xl sm:mb-20">
                <h2 className="mb-8 text-2xl font-semibold text-center text-indigo-800 sm:text-3xl dark:text-indigo-200">
                    Available Endpoints
                </h2>
                <div className="overflow-x-auto rounded-xl border shadow-lg border-gray-200/50 dark:border-gray-700/50">
                    <table className="w-full border-collapse">
                        <thead className="bg-indigo-50 dark:bg-indigo-900/50">
                            <tr>
                                <th className="p-4 font-semibold text-left text-indigo-700 dark:text-indigo-300">API</th>
                                <th className="p-4 font-semibold text-left text-indigo-700 dark:text-indigo-300">Method</th>
                                <th className="p-4 font-semibold text-left text-indigo-700 dark:text-indigo-300">Endpoint</th>
                                <th className="p-4 font-semibold text-left text-indigo-700 dark:text-indigo-300">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {endpoints.map((ep, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t transition-colors border-gray-200/50 dark:border-gray-700/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20"
                                >
                                    <td className="flex gap-3 items-center p-4">
                                        {ep.icon}
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{ep.title}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-800 dark:text-indigo-300">
                                            {ep.method}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-sm text-gray-600 dark:text-gray-300">
                                        {ep.url}
                                    </td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{ep.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Endpoint Details with Examples */}
            <section className="mx-auto mb-12 max-w-7xl sm:mb-20">
                <h2 className="mb-8 text-2xl font-semibold text-center text-indigo-800 sm:text-3xl dark:text-indigo-200">
                    Examples & Responses
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
                    {endpoints.map((ep, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl border shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50"
                        >
                            <div className="flex gap-3 items-center mb-4">
                                {ep.icon}
                                <h3 className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">{ep.title}</h3>
                            </div>
                            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{ep.desc}</p>

                            <h4 className="mb-2 font-semibold text-indigo-700 dark:text-indigo-300">Example Request</h4>
                            <pre className="overflow-x-auto p-3 font-mono text-xs text-indigo-900 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-indigo-300">
                                <code>{ep.example}</code>
                            </pre>

                            <h4 className="mt-4 mb-2 font-semibold text-indigo-700 dark:text-indigo-300">Example Response</h4>
                            <pre className="overflow-x-auto p-3 font-mono text-xs text-indigo-900 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-indigo-300">
                                <code>{ep.response}</code>
                            </pre>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Error Codes */}
            <section className="mx-auto mb-12 max-w-5xl sm:mb-16">
                <h2 className="mb-8 text-2xl font-semibold text-center text-indigo-800 sm:text-3xl dark:text-indigo-200">Error Codes</h2>
                <div className="p-6 rounded-xl border shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center mb-4">
                        <AlertCircle className="flex-shrink-0 w-6 h-6 text-red-500" />
                        <h3 className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Common Errors</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-red-50 dark:bg-red-900/20">
                                <tr>
                                    <th className="p-3 font-semibold text-left text-red-700 dark:text-red-300">Code</th>
                                    <th className="p-3 font-semibold text-left text-red-700 dark:text-red-300">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-red-200/50 dark:border-red-800/50">
                                    <td className="p-3 font-bold text-red-600 dark:text-red-400">400</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        Bad Request - Invalid input data or missing parameters
                                    </td>
                                </tr>
                                <tr className="border-t border-red-200/50 dark:border-red-800/50">
                                    <td className="p-3 font-bold text-red-600 dark:text-red-400">401</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        Unauthorized - Authentication required or invalid token
                                    </td>
                                </tr>
                                <tr className="border-t border-red-200/50 dark:border-red-800/50">
                                    <td className="p-3 font-bold text-red-600 dark:text-red-400">403</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        Forbidden - Insufficient permissions for the action
                                    </td>
                                </tr>
                                <tr className="border-t border-red-200/50 dark:border-red-800/50">
                                    <td className="p-3 font-bold text-red-600 dark:text-red-400">404</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        Not Found - Resource or endpoint not available
                                    </td>
                                </tr>
                                <tr className="border-t border-red-200/50 dark:border-red-800/50">
                                    <td className="p-3 font-bold text-red-600 dark:text-red-400">500</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        Internal Server Error - Unexpected server-side issue
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <footer className="pt-6 mt-8 text-center text-gray-600 border-t dark:text-gray-400 border-gray-200/50 dark:border-gray-700/50">
                <p className="text-sm">
                    All requests require proper authentication where specified. Base URL: <code className="px-2 py-1 font-mono text-indigo-900 bg-gray-100 rounded dark:bg-gray-800 dark:text-indigo-300">https://dev-elevate-backend.onrender.com</code>
                </p>
            </footer>
        </div>
    );
};

export default ApiDocs;