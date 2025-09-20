import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Play,
  Award,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosinstance";
import { toast } from "sonner";
import { format } from "date-fns";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useGlobalState } from "../../../contexts/GlobalContext";
import ContestCard from "../Components/ContestCard";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ContestsData {
  contests: Contest[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface UserStatsData {
  contestsJoined: number;
  top10Finishes: number;
  bestRank: number;
  totalScore: number;
}

interface Contest {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number;
  problems: string[];
  participants: string[];
  prizes: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  status: "upcoming" | "running" | "finished";
  isRegistered?: boolean;
}

interface UserStats {
  contestsJoined: number;
  top10Finishes: number;
  bestRank: number;
  totalScore: number;
}

const ContestsPage: React.FC = () => {
  const navigate = useNavigate();
  const {} = useGlobalState();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [contests, setContests] = useState<{
    upcoming: Contest[];
    running: Contest[];
    past: Contest[];
  }>({
    upcoming: [],
    running: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    contestsJoined: 0,
    top10Finishes: 0,
    bestRank: 0,
    totalScore: 0,
  });
  const [registering, setRegistering] = useState<string | null>(null);

  useEffect(() => {
    fetchContests();
    fetchUserStats();
  }, []);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const upcomingRes = await axiosInstance.get<ApiResponse<ContestsData>>(
        "/api/v1/contests?status=upcoming"
      );
      const runningRes = await axiosInstance.get<ApiResponse<ContestsData>>(
        "/api/v1/contests?status=running"
      );
      const pastRes = await axiosInstance.get<ApiResponse<ContestsData>>(
        "/api/v1/contests?status=past"
      );

      setContests({
        upcoming: upcomingRes.data.data.contests || [],
        running: runningRes.data.data.contests || [],
        past: pastRes.data.data.contests || [],
      });
    } catch (error) {
      console.error("Error fetching contests:", error);
      toast.error("Failed to load contests");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<UserStatsData>>(
        "/api/v1/contests/user-stats"
      );
      if (response.data.success) {
        setUserStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const registerForContest = async (contestId: string) => {
    setRegistering(contestId);
    try {
      const response = await axiosInstance.post<ApiResponse<any>>(
        `/api/v1/contests/register/${contestId}`
      );
      if (response.data.success) {
        toast.success("Successfully registered for contest!");
        fetchContests(); // Refresh contests to update registration status
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to register for contest"
      );
    } finally {
      setRegistering(null);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;
  };

  // Generic countdown renderer that can be used in multiple places
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return <span>Contest has started!</span>;
    }

    return (
      <span>
        {days > 0 && `${days}d `}
        {hours}h {minutes}m {seconds}s
      </span>
    );
  };

  const CountdownDisplay: React.FC<{
    startTime: string;
    title: string;
  }> = ({ startTime, title }) => {
    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-300">Next Contest</h3>
            <p className="text-xl font-bold text-white mt-1">{title}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <Countdown
              date={new Date(startTime)}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return (
                    <span className="text-green-400 font-bold">
                      Contest has started!
                    </span>
                  );
                }

                return (
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="bg-gray-700 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {days}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">Days</span>
                    </div>

                    <div className="text-center">
                      <div className="bg-gray-700 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {hours}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">Hours</span>
                    </div>

                    <div className="text-center">
                      <div className="bg-gray-700 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {minutes}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        Minutes
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="bg-gray-700 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {seconds}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        Seconds
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: contests.upcoming.length },
    { id: "running", label: "Running", count: contests.running.length },
    { id: "past", label: "Past", count: contests.past.length },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Contests</h1>
          <p className="text-xl text-gray-400">
            Compete with developers worldwide and win amazing prizes
          </p>
        </motion.div>

        {/* Featured Contest Banner (only show if there's an upcoming contest) */}
        {contests.upcoming.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-electric-400/20 via-neon-500/20 to-cyber-400/20 rounded-2xl p-8 mb-8 border border-electric-400/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-electric-400/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  FEATURED CONTEST
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {contests.upcoming[0].title}
              </h2>
              <p className="text-gray-300 mb-6">
                {contests.upcoming[0].description}
              </p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(
                      new Date(contests.upcoming[0].startTime),
                      "MMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(contests.upcoming[0].duration)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>
                    {contests.upcoming[0].participants.length} registered
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={
                  registering === contests.upcoming[0]._id ||
                  contests.upcoming[0].isRegistered
                }
                onClick={() =>
                  contests.upcoming[0].isRegistered
                    ? navigate(`/coding/contests/${contests.upcoming[0]._id}`)
                    : registerForContest(contests.upcoming[0]._id)
                }
                className={`px-6 py-3 bg-gradient-to-r ${
                  contests.upcoming[0].isRegistered
                    ? "from-green-500 to-green-600"
                    : "from-electric-400 to-neon-500 hover:from-electric-500 hover:to-neon-600"
                } text-white rounded-lg font-semibold transition-all duration-200`}
              >
                {registering === contests.upcoming[0]._id
                  ? "Registering..."
                  : contests.upcoming[0].isRegistered
                  ? "View Details"
                  : "Register Now"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  {userStats.contestsJoined}
                </div>
                <div className="text-gray-400">Contests Joined</div>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  {userStats.top10Finishes}
                </div>
                <div className="text-gray-400">Top 10 Finishes</div>
              </div>
              <Award className="w-8 h-8 text-electric-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  #{userStats.bestRank || "-"}
                </div>
                <div className="text-gray-400">Best Rank</div>
              </div>
              <Calendar className="w-8 h-8 text-neon-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  {userStats.totalScore}
                </div>
                <div className="text-gray-400">Total Score</div>
              </div>
              <Award className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-lg mb-8 border border-gray-700">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-electric-400 border-b-2 border-electric-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? "bg-electric-400 text-black"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contest Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-400"></div>
            </div>
          ) : (
            <>
              {/* Upcoming Contests */}
              {activeTab === "upcoming" && (
                <div>
                  {contests.upcoming.length > 0 ? (
                    <>
                      {/* Prominent countdown for the next contest */}
                      <CountdownDisplay
                        startTime={contests.upcoming[0].startTime}
                        title={contests.upcoming[0].title}
                      />

                      {/* Contest cards */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {contests.upcoming.map((contest, index) => (
                          <ContestCard
                            key={contest._id}
                            contest={contest}
                            index={index}
                            onRegister={registerForContest}
                            isRegistering={registering}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 text-center py-16">
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No Upcoming Contests
                      </h3>
                      <p className="text-gray-400">
                        Check back later for new contests!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Running Contests */}
              {activeTab === "running" && (
                <div className="space-y-6">
                  {contests.running.length > 0 ? (
                    contests.running.map((contest) => (
                      <motion.div
                        key={contest._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 rounded-lg border-2 border-red-500/50 p-8"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-red-400 font-medium uppercase tracking-wide">
                                Live Contest
                              </span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                              {contest.title}
                            </h2>
                            <p className="text-gray-400">
                              {contest.description}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(`/coding/contests/${contest._id}`)
                            }
                            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            <span>
                              {contest.isRegistered ? "Continue" : "View"}
                            </span>
                          </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400 mb-1">
                              <Countdown
                                date={new Date(contest.endTime)}
                                renderer={renderCountdown}
                              />
                            </div>
                            <div className="text-gray-400">Time Remaining</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                              {contest.participants.length}
                            </div>
                            <div className="text-gray-400">Participants</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-electric-400 mb-1">
                              {contest.problems.length}
                            </div>
                            <div className="text-gray-400">Problems</div>
                          </div>
                          {contest.isRegistered && (
                            <div className="text-center">
                              <div className="bg-green-600/30 text-green-400 py-1 px-3 rounded-full inline-block">
                                {contest.isRegistered
                                  ? "Registered"
                                  : "Not Registered"}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No Running Contests
                      </h3>
                      <p className="text-gray-400">
                        Check back later for live competitions!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Past Contests */}
              {activeTab === "past" && (
                <div className="bg-gray-800 rounded-lg border border-gray-700">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">
                      Contest History
                    </h2>
                    {contests.past.length > 0 ? (
                      <div className="space-y-4">
                        {contests.past.map((contest, index) => (
                          <motion.div
                            key={contest._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">
                                  {contest.title}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <span>
                                    {format(
                                      new Date(contest.startTime),
                                      "MMM d, yyyy"
                                    )}
                                  </span>
                                  <span>
                                    {contest.participants.length} participants
                                  </span>
                                  {contest.isRegistered && (
                                    <span className="text-green-400">
                                      Participated
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Link
                              to={`/coding/contests/${contest._id}/results`}
                              className="text-electric-400 hover:text-electric-300 flex items-center space-x-1"
                            >
                              <span>Results</span>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-400">No past contests found.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContestsPage;
