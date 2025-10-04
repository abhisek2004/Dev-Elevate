import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
} from "react-icons/fi";
import {
  Lightbulb,
  Code2,
  GitBranch,
  BookOpen,
  Users,
  CheckCircle,
  Home,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// ---------- Types ----------
interface Command {
  id: string;
  title: string;
  cmd: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContributionType {
  title: string;
  description: string;
  example: string;
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

interface WideCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  gradientFrom: string;
  gradientTo: string;
  hoverFrom: string;
  hoverTo: string;
}

// ---------- Small & Wide Cards ----------
const SmallCard: React.FC<CardProps> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center p-6 text-center bg-white border shadow-md rounded-2xl dark:bg-gray-700/50 dark:border-gray-700"
  >
    {icon}
    <h3 className="mt-2 text-lg font-semibold text-indigo-600 dark:text-indigo-400">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

const WideCard: React.FC<WideCardProps> = ({
  icon,
  title,
  items,
  gradientFrom,
  gradientTo,
  hoverFrom,
  hoverTo,
}) => (
  <div
    className={`p-8 bg-gradient-to-r rounded-2xl border shadow-md transition-colors duration-300 ${gradientFrom} ${gradientTo} dark:from-gray-700 dark:to-gray-800 dark:border-gray-700`}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100`}>{title}</h3>
    </div>
    <ul className="pl-6 space-y-2 text-gray-700 list-disc dark:text-gray-300">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

// ---------- Main Component ----------
const ContributorGuide: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Git Commands
  const commands: Command[] = [
    { id: "clone", title: "Clone Repository", cmd: "git clone https://github.com/abhisek2004/Dev-Elevate.git" },
    { id: "branch", title: "Create Branch", cmd: "git checkout -b feature/your-feature" },
    { id: "add", title: "Stage Changes", cmd: "git add ." },
    { id: "commit", title: "Commit Changes", cmd: 'git commit -m "Describe your changes"' },
    { id: "push", title: "Push Branch", cmd: "git push origin feature/your-feature" },
  ];

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  // FAQs
  const faqs: FAQ[] = [
    { question: "What is a fork?", answer: "A fork is your personal copy of the Dev-Elevate repository where you can safely make changes." },
    { question: "What is a pull request?", answer: "A pull request is a request to merge your changes from your branch/fork into the main Dev-Elevate repository." },
    { question: "How should I name branches?", answer: "Use descriptive names like 'feature/login' or 'fix/navbar-bug' to indicate purpose clearly." },
    { question: "Can I contribute without coding?", answer: "Yes! You can contribute to documentation, UI/UX design, testing, or issue triaging." },
  ];

  // Contribution Types
  const contributionTypes: ContributionType[] = [
    { title: "Bug Fixes", description: "Identify bugs from issues tagged 'bug' and submit a PR with a clear explanation and test cases if possible.", example: "Example: Fix responsive header alignment issue." },
    { title: "Features", description: "Add a new feature or improve an existing one. Follow existing patterns and code structure.", example: "Example: Add dark mode toggle with smooth animation and theme persistence." },
    { title: "Documentation", description: "Improve README, add examples, or clarify instructions for contributors.", example: "Example: Add step-by-step setup instructions with screenshots for Dev-Elevate." },
    { title: "Testing", description: "Write unit or integration tests for existing code to ensure stability and prevent regressions.", example: "Example: Add Jest tests for login and registration components." },
    { title: "Design & UI", description: "Improve the user interface, accessibility, or design consistency across the project.", example: "Example: Update button styles, color schemes, and hover effects." },
    { title: "Code Refactoring", description: "Improve existing code structure without changing functionality to make it cleaner, readable, and maintainable.", example: "Example: Split large components into smaller reusable components." },
  ];

  return (
    <div className="min-h-screen px-4 py-12 mx-auto space-y-16 max-w-7xl bg-gray-50 dark:bg-black sm:px-6 lg:px-12">
      {/* ---------- Top GSSoC Section ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-10 border border-gray-200 shadow-lg bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 dark:border-gray-700"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400">🌟 About Dev-Elevate</h2>
        <p className="mb-12 text-lg leading-relaxed text-center text-gray-700 dark:text-gray-300">
          Dev-Elevate is an open-source platform for developers to contribute, learn, and grow by collaborating on real-world projects. Perfect for first-time contributors!
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <SmallCard icon={<Lightbulb className="w-10 h-10 mb-3 text-yellow-500" />} title="Explore Issues" description={<><span className="font-medium">Beginner-friendly tasks</span> to get familiar with the project.</>} />
          <SmallCard icon={<Code2 className="w-10 h-10 mb-3 text-green-500" />} title="Clean Contributions" description="Keep your PRs neat, tested, and documented." />
          <SmallCard icon={<GitBranch className="w-10 h-10 mb-3 text-purple-500" />} title="Collaborate Actively" description="Discuss ideas, review code, and learn with other contributors." />
          <SmallCard icon={<BookOpen className="w-10 h-10 mb-3 text-blue-500" />} title="Follow Docs" description="Always read the project documentation before contributing." />
        </div>
      </motion.div>

      {/* ---------- Wide Cards Section ---------- */}
      <div className="grid gap-8 mt-12 md:grid-cols-2">
        <WideCard icon={<Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />} title="Getting Started" items={["Sign up on Dev-Elevate platform", "Choose a project that excites you", "Engage with mentors and contributors", "Kickstart with beginner issues"]} gradientFrom="from-blue-50" gradientTo="to-indigo-50" hoverFrom="blue-400" hoverTo="blue-500" />
        <WideCard icon={<CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />} title="Best Practices" items={["Be respectful & inclusive in discussions", "Follow contribution standards", "Test your code before pushing", "Seek help when needed, collaborate openly"]} gradientFrom="from-purple-50" gradientTo="to-pink-50" hoverFrom="purple-400" hoverTo="purple-500" />
      </div>

      {/* ---------- Buttons Section ---------- */}
      <div className="flex justify-center gap-6 mt-12">
        <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" onClick={() => navigate("/contributorguide")}>
          Contributor’s Guide
        </motion.button>

        <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600" onClick={() => window.open("https://github.com/abhisek2004/Dev-Elevate", "_blank")}>
          Start Contributing
        </motion.button>
      </div>

      {/* ---------- Contribution Steps ---------- */}
      <div className="p-8 bg-white shadow-md rounded-xl dark:bg-gray-800">
        <h2 className="mt-8 mb-8 text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Step-by-Step Contribution Journey</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {contributionTypes.map((type, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="p-4 bg-gray-200 border-l-4 border-indigo-500 rounded shadow-sm dark:border-indigo-400 dark:bg-gray-700">
              <div className="flex items-center mb-2"><FiInfo className="mr-2 text-indigo-500 dark:text-indigo-400" /><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{type.title}</h3></div>
              <p className="mb-2 text-gray-700 dark:text-gray-300">{type.description}</p>
              <p className="italic text-gray-600 dark:text-gray-400">💡 {type.example}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- Git Commands ---------- */}
      <div className="p-8 bg-white shadow-md rounded-xl dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Essential Git Commands</h2>
        <div className="space-y-4">
          {commands.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700/50 dark:border-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{c.title}</h3>
                <pre className="p-2 mt-1 overflow-x-auto text-sm text-blue-600 bg-gray-200 rounded dark:bg-gray-900/50 dark:text-blue-400">{c.cmd}</pre>
              </div>
              <button onClick={() => copyCommand(c.cmd, c.id)} className="flex items-center gap-2 px-3 py-1 text-gray-700 transition bg-gray-200 rounded dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500">
                {copied === c.id ? <FiCheck /> : <FiCopy />}
                <span>{copied === c.id ? "Copied" : "Copy"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- FAQ Section ---------- */}
      <div className="p-8 bg-white shadow-md rounded-xl dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFAQ === idx;
            return (
              <div key={idx} className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                <button onClick={() => setExpandedFAQ(isOpen ? null : idx)} className="flex items-center justify-between w-full p-4 transition bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="text-gray-900 dark:text-gray-100">{faq.question}</span>
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="p-4 text-gray-700 bg-gray-50 dark:text-gray-300 dark:bg-gray-700/50">
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
  );
};

export default ContributorGuide;