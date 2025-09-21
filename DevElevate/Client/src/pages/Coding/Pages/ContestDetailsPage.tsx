import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Lock,
  AlertCircle,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import axiosInstance from "../../../api/axiosinstance";
import { toast } from "sonner";
import Countdown, { CountdownRenderProps } from "react-countdown";
import ContestLeaderboard from "../Components/Leaderboard/ContestLeaderboard";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Contest {
  _id: string;
  title: string;
  description: string;
  rules: string[];
  startTime: string;
  endTime: string;
  duration: number;
  problems: Problem[];
  participants: string[];
  prizes: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  status: "upcoming" | "running" | "finished";
  isRegistered?: boolean;
}

interface ContestProblemsResponse {
  contestId: string;
  contestTitle: string;
  duration: number;
  endTime: string;
  problems: Problem[];
  startTime: string;
  timeRemaining: number;
}

interface Problem {
  _id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  points: number;
}

const ContestDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemsLoading, setProblemsLoading] = useState(false);

  useEffect(() => {
    fetchContestDetails();
  }, [id]);

  useEffect(() => {
    if (contest && contest.status === "running" && contest.isRegistered) {
      fetchContestProblems();
    }
  }, [contest]);

  const fetchContestDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse<Contest>>(
        `/api/v1/contests/${id}`
      );
      if (response.data.success) {
        setContest(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to load contest details");
      }
    } catch (error: any) {
      console.error("Error fetching contest details:", error);
      toast.error(
        error.response?.data?.message || "Failed to load contest details"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchContestProblems = async () => {
    if (!contest) return;

    setProblemsLoading(true);
    try {
      const response = await axiosInstance.get<
        ApiResponse<ContestProblemsResponse>
      >(`/api/v1/contests/${id}/problems`);
      if (response.data.success) {
        setProblems(response.data.data.problems);
      } else {
        toast.error(response.data.message || "Failed to load problems");
      }
    } catch (error: any) {
      console.error("Error fetching problems:", error);
      toast.error(error.response?.data?.message || "Failed to load problems");
    } finally {
      setProblemsLoading(false);
    }
  };

  const registerForContest = async () => {
    if (!contest) return;

    setRegistering(true);
    try {
      const response = await axiosInstance.post<ApiResponse<any>>(
        `/api/v1/contests/register/${id}`
      );
      if (response.data.success) {
        toast.success("Successfully registered for contest!");
        fetchContestDetails(); // Refresh to update registration status
      } else {
        toast.error(response.data.message || "Failed to register for contest");
      }
    } catch (error: any) {
      console.error("Error registering for contest:", error);
      toast.error(
        error.response?.data?.message || "Failed to register for contest"
      );
    } finally {
      setRegistering(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-400/20 text-green-400";
      case "Medium":
        return "bg-yellow-400/20 text-yellow-400";
      case "Hard":
        return "bg-red-400/20 text-red-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };

  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      if (contest?.status === "upcoming") {
        // If the countdown was for an upcoming contest and it completed, refresh
        fetchContestDetails();
      }

      return (
        <span>
          {contest?.status === "upcoming"
            ? "Contest has started!"
            : "Contest has ended!"}
        </span>
      );
    }

    return (
      <span>
        {days > 0 && `${days}d `}
        {hours}h {minutes}m {seconds}s
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-400"></div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Contest Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          The contest you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/coding/contests")}
          className="px-6 py-3 bg-electric-400 text-white rounded-lg font-medium hover:bg-electric-500 transition-colors"
        >
          Back to Contests
        </button>
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
            <span className="text-white">{contest.title}</span>
          </nav>
        </div>

        {/* Contest Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{contest.title}</h1>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                contest.difficulty
              )}`}
            >
              {contest.difficulty}
            </span>

            {contest.status === "upcoming" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/20 text-blue-400">
                Upcoming
              </span>
            )}

            {contest.status === "running" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-400/20 text-red-400 animate-pulse">
                Live
              </span>
            )}

            {contest.status === "finished" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-400/20 text-gray-400">
                Ended
              </span>
            )}
          </div>

          <p className="text-gray-300 text-lg">{contest.description}</p>
        </motion.div>

        {/* Contest Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contest Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Contest Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-electric-400" />
                  <div>
                    <div className="text-sm text-gray-400">Start Time</div>
                    <div className="text-white">
                      {format(new Date(contest.startTime), "MMM d, yyyy HH:mm")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-sm text-gray-400">End Time</div>
                    <div className="text-white">
                      {format(new Date(contest.endTime), "MMM d, yyyy HH:mm")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-white">
                      {formatDuration(contest.duration)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-sm text-gray-400">Participants</div>
                    <div className="text-white">
                      {contest.participants.length} registered
                    </div>
                  </div>
                </div>

                {contest.prizes.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Prizes</div>
                      <div className="text-white">
                        {contest.prizes.join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      contest.status === "upcoming"
                        ? "bg-blue-400"
                        : contest.status === "running"
                        ? "bg-red-400 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <div className="text-sm text-gray-400">Status</div>
                    <div className="text-white capitalize">
                      {contest.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            {contest.rules && contest.rules.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  Contest Rules
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {contest.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Contest Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            {contest.status === "upcoming" && (
              <>
                <h3 className="text-lg font-medium text-white mb-3">
                  Starts in
                </h3>
                <div className="text-2xl font-mono font-bold text-electric-400 mb-6">
                  <Countdown
                    date={new Date(contest.startTime)}
                    renderer={renderCountdown}
                  />
                </div>
              </>
            )}

            {contest.status === "running" && (
              <>
                <h3 className="text-lg font-medium text-white mb-3">Ends in</h3>
                <div className="text-2xl font-mono font-bold text-red-400 mb-6">
                  <Countdown
                    date={new Date(contest.endTime)}
                    renderer={renderCountdown}
                  />
                </div>
              </>
            )}

            {contest.status === "finished" && (
              <>
                <h3 className="text-lg font-medium text-white mb-3">
                  Contest Ended
                </h3>
                <div className="text-gray-400 mb-6">
                  This contest has ended. You can still view the problems and
                  solutions.
                </div>
              </>
            )}

            {/* Registration Status */}
            <div className="mb-6">
              {contest.isRegistered ? (
                <div className="flex items-center bg-green-400/20 text-green-400 p-3 rounded-lg">
                  <Check className="w-5 h-5 mr-2" />
                  <span>You are registered for this contest</span>
                </div>
              ) : contest.status === "upcoming" ? (
                <button
                  onClick={registerForContest}
                  disabled={registering}
                  className={`w-full py-3 ${
                    registering
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-electric-400 to-neon-500 hover:from-electric-500 hover:to-neon-600"
                  } text-white rounded-lg font-medium transition-all duration-200`}
                >
                  {registering ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      <span>Registering...</span>
                    </div>
                  ) : (
                    "Register for Contest"
                  )}
                </button>
              ) : (
                <div className="text-yellow-400 p-3 bg-yellow-400/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 inline-block mr-2" />
                  <span>Registration is closed</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Problems Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Contest Problems
          </h2>

          {contest.status === "upcoming" && !contest.isRegistered && (
            <div className="text-center py-8">
              <Lock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Register to see problems
              </h3>
              <p className="text-gray-400 mb-4">
                Problems will be available once you register for the contest.
              </p>
              <button
                onClick={registerForContest}
                disabled={registering}
                className={`px-6 py-3 ${
                  registering
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-electric-400 to-neon-500 hover:from-electric-500 hover:to-neon-600"
                } text-white rounded-lg font-medium transition-all duration-200`}
              >
                {registering ? "Registering..." : "Register Now"}
              </button>
            </div>
          )}

          {contest.status === "upcoming" && contest.isRegistered && (
            <div className="text-center py-8">
              <Lock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Problems are locked
              </h3>
              <p className="text-gray-400">
                Problems will be unlocked when the contest starts.
              </p>
            </div>
          )}

          {contest.status !== "upcoming" && (
            <>
              {problemsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric-400"></div>
                </div>
              ) : problems && problems.length > 0 ? (
                <div className="space-y-4">
                  {problems.map((problem) => (
                    <div
                      key={problem._id}
                      className="p-4 bg-gray-750 rounded-lg border border-gray-700 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-white">
                            {problem.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/coding/contests/${contest._id}/problems/${problem._id}`}
                        className="px-4 py-2 bg-electric-400 hover:bg-electric-500 text-white rounded-lg transition-colors"
                      >
                        Solve
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Problems Found
                  </h3>
                  <p className="text-gray-400">
                    No problems are available for this contest yet.
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
        {contest.status === "running" || contest.status === "finished" ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
            <ContestLeaderboard contestId={contest._id} className="mb-8" />
          </div>
        ) : (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
            <Trophy className="w-10 h-10 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              Leaderboard Locked
            </h3>
            <p className="text-gray-400">
              The leaderboard will be available once the contest starts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetailsPage;
