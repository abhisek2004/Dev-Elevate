import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Share2, BookOpen } from "lucide-react";
import type { Problem } from "../../Types";
import { motion } from "framer-motion";

interface ProblemDescriptionProps {
  problem: Problem;
  isContestProblem?: boolean; // prop to determine if we're in a contest context
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problem,
  isContestProblem,
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "editorial" | "solutions"
  >("description");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/20";
      case "Hard":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "editorial", label: "Editorial" },
    { id: "solutions", label: "Solutions" },
  ];

  return (
    <div className="overflow-hidden bg-gray-800 rounded-lg border border-gray-700">
      {/* Problem Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-wrap justify-between items-start mb-4 min-w-0 overflow-hidden">
          <div className="flex-1">
            <div className="flex items-center mb-2 space-x-3">
              <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>

            {/* Conditionally render statistics based on contest context */}
            {!isContestProblem ? (
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>
                  Acceptance Rate:{" "}
                  <span className="text-green-400">{problem.acceptance}%</span>
                </span>
                <span>Submissions: {problem.submissions.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>
                  Contest Acceptance Rate:{" "}
                  <span className="text-green-400">
                    {problem.contestAcceptance || 0}%
                  </span>
                </span>
                <span>
                  Contest Submissions: {problem.contestSubmissions || 0}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-yellow-400 rounded-lg transition-colors hover:bg-gray-700"
            >
              <Star className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 rounded-lg transition-colors hover:text-green-400 hover:bg-gray-700"
            >
              <ThumbsUp className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 rounded-lg transition-colors hover:text-red-400 hover:bg-gray-700"
            >
              <ThumbsDown className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 rounded-lg transition-colors hover:text-blue-400 hover:bg-gray-700"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-electric-400/20 text-electric-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-electric-400 border-b-2 border-electric-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "description" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="max-w-none prose prose-invert">
              <div className="leading-relaxed text-gray-300 whitespace-pre-wrap">
                {problem.description}
              </div>
            </div>

            {problem.examples.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Examples
                </h3>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-lg">
                      <div className="mb-3">
                        <div className="mb-1 text-sm font-medium text-gray-400">
                          Input:
                        </div>
                        <code className="px-2 py-1 text-green-400 bg-gray-800 rounded">
                          {example.input}
                        </code>
                      </div>
                      <div className="mb-3">
                        <div className="mb-1 text-sm font-medium text-gray-400">
                          Output:
                        </div>
                        <code className="px-2 py-1 text-blue-400 bg-gray-800 rounded">
                          {example.output}
                        </code>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="mb-1 text-sm font-medium text-gray-400">
                            Explanation:
                          </div>
                          <div className="text-sm text-gray-300">
                            {example.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {problem.constraints.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Constraints
                </h3>
                <ul className="space-y-2">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm text-gray-300">
                      • {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "editorial" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <BookOpen className="mx-auto mb-4 w-16 h-16 text-gray-600" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              Editorial Coming Soon
            </h3>
            <p className="text-gray-400">
              Detailed solution explanation will be available after submission.
            </p>
          </motion.div>
        )}

        {activeTab === "solutions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-r rounded-full from-electric-400 to-neon-500">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Community Solutions
            </h3>
            <p className="text-gray-400">
              Browse solutions shared by the community.
            </p>
            <div className="mt-6 space-y-4">
              <div className="p-4 text-left bg-gray-900 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-white">
                    Python Solution - O(n)
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>234</span>
                  </div>
                </div>
                <div className="mb-3 text-sm text-gray-400">
                  by @pythonmaster
                </div>
                <pre className="overflow-x-auto p-3 text-sm bg-gray-800 rounded">
                  <code className="text-green-400">
                    {`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;
