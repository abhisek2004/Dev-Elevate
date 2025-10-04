import React from "react";
import {
  FiBookOpen,
  FiLayers,
  FiCpu,
  FiCode,
  FiPlay,
  FiGitBranch,
  FiUsers,
} from "react-icons/fi";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DocumentationPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Code block styles for dark mode compatibility
  const codeBlockClass =
    "bg-indigo-50 dark:bg-gray-900 p-6 rounded-xl overflow-x-auto shadow text-indigo-900 dark:text-indigo-300 text-sm font-mono leading-relaxed";

  return (
    <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          // Header text colors for contrast
          className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-800 sm:text-5xl dark:text-indigo-200"
        >
          DevElevate Documentation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg leading-relaxed text-indigo-600 dark:text-indigo-400 sm:text-xl"
        >
          Full-Stack AI-Powered Smart Education and Career Advancement Platform
          for Students, Developers, and Job Seekers
        </motion.p>
      </header>

      {/* Features Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiBookOpen className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">Features</h2>
        </div>
        <div className="grid gap-6 text-gray-700 md:grid-cols-2 dark:text-gray-300">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
              Core Features
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside sm:text-base">
              <li>
                🧑‍💻 User/Admin Unified Login & Registration with role-based
                access (JWT, Google Auth)
              </li>
              <li>
                👤 Personalized User Profile & Settings with progress tracking
                and preferences
              </li>
              <li>
                🧠 Smart User Dashboard: Courses, Analytics, Bookmarks, Resume
                Tools, AI Chat Access
              </li>
              <li>
                🛡️ Admin Panel: Manage Users, Courses, Quizzes, Content,
                Announcements, Analytics
              </li>
              <li>
                📚 Learning Hub: Structured paths for DSA, Java, MERN, AI/ML,
                Data Science with Roadmaps, Quizzes, Progress Tracking
              </li>
              <li>
                🤖 Study Buddy AI Chatbot: GPT-4 powered doubt solving, resource
                suggestions, career advice
              </li>
              <li>
                📰 Tech Feed: Latest news (NewsAPI), Internship Calendar,
                Hackathons, YouTube Integration
              </li>
              <li>
                📂 Resume & Cover Letter Builder: ATS-compliant, GPT
                suggestions, PDF Export
              </li>
              <li>
                🎯 Placement Prep: Job Listings, Mock Interviews, Coding
                Challenges, HR Q&A
              </li>
              <li>
                🖥️ Personalized Dashboard: Daily Planner, Streaks, Graphs, Tools
                Integration
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
              Platform Features
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside sm:text-base">
              <li>
                📱 Tasks Management: Create/Edit/Delete, Status/Priority/Due
                Dates, Kanban/List Views
              </li>
              <li>
                📝 Notes Management: Rich Text, AI Tags/Summarization,
                Categorization, Export
              </li>
              <li>
                📅 Calendar View: Monthly/Weekly/Daily, Task Integration, Visual
                Navigation
              </li>
              <li>
                💰 Budget & Expense Tracking: Categories, Charts, AI
                Optimization, Analysis
              </li>
              <li>
                👥 Community Forum: Q&A, Moderation, Best Answers, Real-time
                Updates
              </li>
              <li>
                🧪 Quiz & Assignment System: MCQs, Coding Problems, Auto/Manual
                Grading
              </li>
              <li>
                📊 Analytics: User Progress, Quiz Stats, Course Popularity,
                Assignment Rates
              </li>
              <li>
                📧 Newsletter & Email: Weekly Digests, Verification, Open Rates
                Tracking
              </li>
              <li>
                🎮 Gamification (Phase 2/3): XP, Badges, Leaderboards,
                Flashcards
              </li>
              <li>
                🔗 Integrations: LinkedIn/GitHub Sync, YouTube API, Google
                Sheets, News API
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiCpu className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">Tech Stack</h2>
        </div>
        <div className="grid gap-6 text-sm text-gray-700 md:grid-cols-2 dark:text-gray-300 sm:text-base">
          <div className="space-y-4">
            <h3 className="mb-3 text-xl font-semibold text-indigo-800 dark:text-indigo-200">
              Backend
            </h3>
            <ul className="space-y-2 leading-relaxed list-disc list-inside">
              <li>Node.js + Express.js (ES6 modules)</li>
              <li>MongoDB Atlas with Mongoose ODM</li>
              <li>JWT Authentication with bcryptjs hashing</li>
              <li>Nodemailer for Email (Gmail SMTP)</li>
              <li>PDFKit for Dynamic PDF Generation</li>
              <li>Zod for Request Validation</li>
              <li>Multer for File Uploads</li>
              <li>CORS enabled for cross-origin requests</li>
              <li>Environment: Dotenv for config management</li>
              <li>APIs: YouTube, Google Sheets, News API, GPT-4</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="mb-3 text-xl font-semibold text-indigo-800 dark:text-indigo-200">
              Frontend
            </h3>
            <ul className="space-y-2 leading-relaxed list-disc list-inside">
              <li>React 18.3.1 with TypeScript 5.5.3</li>
              <li>Vite 4.5.0 for Build Tool</li>
              <li>Tailwind CSS 3.4.1 + Shadcn UI Components</li>
              <li>State: React Context API + Redux Toolkit 2.8.2</li>
              <li>Routing: React Router DOM 7.7.0</li>
              <li>Icons: Lucide React 0.344.0 + React Icons 5.5.0</li>
              <li>Animations: Framer Motion 12.23.0</li>
              <li>Charts: Recharts 3.0.2</li>
              <li>Notifications: Sonner 2.0.6</li>
              <li>HTTP: Axios with Interceptors</li>
              <li>Other: ESLint 9.9.1, Prettier, Markdown Support</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Architecture Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiLayers className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">
            Architecture & Project Structure
          </h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          DevElevate follows a modular monorepo structure with separate frontend
          and backend directories. Below is the combined architecture overview.
        </p>
        <pre className={codeBlockClass}>
          {`DevElevate/
├── README.md                  # Main project documentation
├── client/                    # Frontend (React + TypeScript)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── api/               # API config & endpoints
│   │   ├── app/               # Redux store
│   │   ├── components/        # UI Components (Admin, Auth, Dashboard, Layout, ui)
│   │   ├── contexts/          # React Contexts (Auth, Global, Notification)
│   │   ├── features/          # Redux slices
│   │   ├── pages/             # Page-level components (Dashboard, ResumeBuilder, etc.)
│   │   ├── services/          # External integrations (Groq AI, Firebase, Stripe)
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utilities
│   │   ├── App.tsx            # Main App
│   │   └── main.tsx           # Entry point
│   ├── package.json           # Frontend deps
│   ├── vite.config.ts         # Vite config
│   ├── tailwind.config.js     # Tailwind config
│   └── tsconfig.json          # TS config
├── server/                    # Backend (Node.js + Express)
│   ├── config/                # DB config
│   ├── controller/            # API handlers
│   ├── middleware/            # Auth, Role middleware
│   ├── model/                 # Mongoose schemas (User, Course, Quiz, etc.)
│   ├── routes/                # API routes (auth, community, ats, admin)
│   ├── utils/                 # Helpers (PDF, Email)
│   ├── index.js               # Server entry
│   ├── pdfServer.js           # PDF service
│   └── package.json           # Backend deps
├── docs/                      # Full Documentation (Google Docs link)
└── .env.example               # Env template`}
        </pre>
      </motion.section>

      {/* Quick Start Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiPlay className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">Quick Start</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          <strong>Prerequisites:</strong> Node.js 16+, MongoDB Atlas, npm/yarn,
          Git. Set up .env files for both client/server.
        </p>
        <div className="space-y-4">
          <pre className={codeBlockClass}>
            {`# Clone & Install Backend
git clone https://github.com/abhisek2004/Dev-Elevate.git
cd server
npm install
npm run dev  # Runs on http://localhost:4000`}
          </pre>
          <pre className={codeBlockClass}>
            {`# Install Frontend (in root or client dir)
cd ../client
npm install
npm run dev   # Runs on http://localhost:5173`}
          </pre>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Connect frontend to backend via VITE_API_URL in client/.env. Test
            auth flows first.
          </p>
        </div>
      </motion.section>

      {/* Deployment Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiGitBranch className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">Deployment</h2>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed text-gray-700 list-disc list-inside dark:text-gray-300 sm:text-base">
          <li>Frontend: Deployed on Vercel (vite.config.ts optimized)</li>
          <li>Backend: Deployed on Render (Node.js + MongoDB Atlas)</li>
          <li>Database: MongoDB Atlas (Cloud-hosted)</li>
          <li>Auth: Google OAuth live and functional</li>
          <li>CI/CD: GitHub Actions for automated builds/tests</li>
          <li>
            Env Vars: Securely manage API keys (JWT_SECRET, MAIL_USER, etc.)
          </li>
          <li>Production: npm run build (frontend) & npm start (backend)</li>
        </ul>
      </motion.section>

      {/* License Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiCode className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">License</h2>
        </div>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
          This project is licensed under the ISC License. See the LICENSE file
          in the backend repository for full details. Contributions follow
          strict guidelines to maintain stability.
        </p>
      </motion.section>

      {/* Contributing Section */}
      <motion.section
        className="max-w-6xl p-6 mx-auto border shadow-lg rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 sm:p-8 border-gray-200/50 dark:border-gray-700/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center mb-6 text-indigo-700 dark:text-indigo-300">
          <FiUsers className="flex-shrink-0 mr-3 text-3xl" />
          <h2 className="text-2xl font-bold sm:text-3xl">Contributing</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          DevElevate welcomes contributions via GSSoC 2025! Follow strict
          guidelines: No changes to core backend/routes/auth. Always pull latest
          main, add PR comments with files edited/testing steps/screenshots.
        </p>
        <ol className="space-y-3 text-sm leading-relaxed text-gray-700 list-decimal list-inside dark:text-gray-300 sm:text-base">
          <li>
            Fork the repository and create a feature branch:{" "}
            <code className="px-2 py-1 text-indigo-900 bg-indigo-100 rounded dark:bg-gray-700 dark:text-indigo-300">
              git checkout -b feature/your-feature
            </code>
          </li>
          <li>
            Pull latest:{" "}
            <code className="px-2 py-1 text-indigo-900 bg-indigo-100 rounded dark:bg-gray-700 dark:text-indigo-300">
              git pull origin main
            </code>{" "}
            (resolve conflicts)
          </li>
          <li>
            Implement changes related to your assigned issue only (no .env
            pushes, no core modifications)
          </li>
          <li>
            Commit:{" "}
            <code className="px-2 py-1 text-indigo-900 bg-indigo-100 rounded dark:bg-gray-700 dark:text-indigo-300">
              git commit -m "feat: add your-feature"
            </code>
          </li>
          <li>
            Push and open PR: Include files edited, testing instructions,
            screenshots/video
          </li>
          <li>
            PR Review: Mentors (Abhisek, Jay, Avansh, Amisha) will review for
            conflicts/security
          </li>
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          <strong>Strict Rules:</strong> Do not modify auth/login/Google system,
          existing routes, or unrelated code. Violations lead to PR
          rejection/removal.
        </p>
      </motion.section>

      {/* Footer with improved contrast */}
      <footer className="pt-6 pb-8 mt-12 text-center text-indigo-600 border-t dark:text-indigo-400 border-indigo-200/50 dark:border-gray-700/50">
        <p className="mb-2 text-base font-medium text-indigo-800 dark:text-indigo-200">
          Built with <span className="text-red-500">❤️</span> for GSSoC 2025 by
          Abhisek Panda & Team.
        </p>
        <p className="text-sm text-indigo-600 dark:text-indigo-400">
          Explore Full Docs:{" "}
          <a
            href="https://docs.google.com/document/d/1oHgo5GmPDQu6eV9ND3VrYcpi0Dwvb-wWZi-lMgjFAH8/edit?usp=sharing"
            className="font-semibold text-indigo-800 underline transition-colors dark:text-indigo-200 hover:text-indigo-700 dark:hover:text-indigo-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Docs Guide
          </a>{" "}
          | Live:{" "}
          <a
            href="https://develevate-ai.vercel.app"
            className="font-semibold text-indigo-800 underline transition-colors dark:text-indigo-200 hover:text-indigo-700 dark:hover:text-indigo-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo
          </a>
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
  );
}