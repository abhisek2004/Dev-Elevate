import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Users, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../../api/axiosinstance";
import { toast } from "sonner";
import { format } from "date-fns";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ContestResult {
  contestId: string;
  title: string;
  startTime: string;
  endTime: string;
  participants: number;
  problems: {
    id: string;
    title: string;
    difficulty: string;
    acceptance: number;
    submissions: number;
  }[];
  leaderboard: {
    rank: number;
    userId: string;
    name: string;
    score: number;
    problemsSolved: number[] | { id: string | number }[] | number;
    penalty: number;
    timeTaken?: string;
  }[];
}

const ContestResultsPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ContestResult | null>(null);

  useEffect(() => {
    fetchContestResults();
  }, [contestId]);

  const fetchContestResults = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse<ContestResult>>(
        `/api/v1/contests/${contestId}/results`
      );

      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to load contest results");
      }
    } catch (error: any) {
      console.error("Error fetching contest results:", error);
      toast.error(
        error.response?.data?.message || "Failed to load contest results"
      );
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-gray-400 text-sm">
            <Link
              to="/coding/contests"
              className="hover:text-white transition-colors"
            >
              Contests
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/coding/contests/${contestId}`}
              className="hover:text-white transition-colors"
            >
              {results?.title || "Contest"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Results</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Contest Results
            </h1>
            <p className="text-gray-400">
              Final rankings and statistics for {results?.title}
            </p>
          </div>
          <Link
            to={`/coding/contests/${contestId}`}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Contest</span>
          </Link>
        </div>

        {results ? (
          <div className="space-y-8">
            {/* Contest Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Contest Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-electric-400" />
                  <div>
                    <div className="text-sm text-gray-400">Date</div>
                    <div className="text-white">
                      {format(new Date(results.startTime), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-neon-400" />
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-white">
                      {format(new Date(results.startTime), "HH:mm")} -{" "}
                      {format(new Date(results.endTime), "HH:mm")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-sm text-gray-400">Participants</div>
                    <div className="text-white">{results.participants}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-sm text-gray-400">Problems</div>
                    <div className="text-white">{results.problems.length}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Final Standings
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Problems Solved
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Penalty
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {results.leaderboard.map((entry) => (
                      <tr key={entry.userId} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700">
                            {entry.rank <= 3 ? (
                              <Trophy
                                className={`w-4 h-4 ${
                                  entry.rank === 1
                                    ? "text-yellow-400"
                                    : entry.rank === 2
                                    ? "text-gray-300"
                                    : "text-orange-400"
                                }`}
                              />
                            ) : (
                              <span className="text-gray-300">
                                {entry.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {entry.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm font-bold text-electric-400">
                            {entry.score}
                          </div>
                        </td>
                        {/* Problems Solved Section - Fixed Version */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-1">
                            {Array.isArray(entry.problemsSolved) ? (
                              entry.problemsSolved.map((problem, idx) => {
                                // Create safe display text
                                let display: React.ReactNode;
                                let title = "Unknown Problem";

                                if (
                                  typeof problem === "object" &&
                                  problem !== null
                                ) {
                                  // Object case - safely check existence of properties
                                  const problemObj = problem as {
                                    id?: string | number;
                                    letter?: string;
                                    position?: number;
                                  };

                                  // Find matching problem title if possible
                                  if (problemObj.id) {
                                    const matchingProblem =
                                      results.problems.find(
                                        (p) => p.id === String(problemObj.id)
                                      );
                                    if (matchingProblem) {
                                      title = matchingProblem.title;
                                    }
                                  }

                                  // Determine display text with fallbacks
                                  display =
                                    problemObj.letter ||
                                    (problemObj.position !== undefined
                                      ? problemObj.position
                                      : "") ||
                                    problemObj.id ||
                                    "?";
                                } else {
                                  // Number/primitive case
                                  display = problem;

                                  // Try to find problem by index for title
                                  if (idx < results.problems.length) {
                                    title = results.problems[idx].title;
                                  }
                                }

                                return (
                                  <span
                                    key={idx}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs"
                                    title={title}
                                  >
                                    {display}
                                  </span>
                                );
                              })
                            ) : (
                              <span className="text-gray-400">
                                {typeof entry.problemsSolved === "number"
                                  ? `${entry.problemsSolved} problems`
                                  : "No problems solved yet"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-red-400">
                          {entry.penalty > 0
                            ? `${Math.round(entry.penalty / 60000)} min`
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-300">
                          {entry.timeTaken || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Problem Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Problem Statistics
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Problem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Acceptance Rate
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Submissions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {results.problems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {problem.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-green-400">
                            {problem.acceptance}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-gray-300">
                            {problem.submissions}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="py-16 text-center bg-gray-800 rounded-lg border border-gray-700">
            <Trophy className="mx-auto mb-4 w-16 h-16 text-gray-600" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              No Results Available
            </h3>
            <p className="text-gray-400">
              Results for this contest haven't been published yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestResultsPage;
