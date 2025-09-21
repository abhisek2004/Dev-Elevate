import React, { useState, useEffect } from "react";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../../api/axiosinstance";
import { useGlobalState } from "../../../../contexts/GlobalContext";
import { useSocket } from "../../../../contexts/SocketContext";

// Define interfaces for type safety
interface LeaderboardEntry {
  userId: string;
  name: string;
  rank: number;
  score: number;
  penalty: number;
  problemsSolved: Array<number | { id: string | number }> | number; // Can be array of numbers/objects or just a count
  avatar?: string;
  previousRank?: number;
  change?: string;
}

interface LeaderboardResponse {
  success: boolean;
  data: {
    leaderboard: LeaderboardEntry[];
  };
  message?: string;
}

interface ContestLeaderboardProps {
  contestId: string;
  className?: string;
}

const ContestLeaderboard: React.FC<ContestLeaderboardProps> = ({
  contestId,
  className,
}) => {
  const { state } = useGlobalState();
  const { socket, connected, joinContestRoom, leaveContestRoom } = useSocket();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedUser, setHighlightedUser] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch of leaderboard data
    fetchLeaderboard();

    // Join the contest room
    joinContestRoom(contestId);

    // Listen for leaderboard updates
    if (socket) {
      socket.on(
        "leaderboard-update",
        (updatedLeaderboard: LeaderboardEntry[]) => {
          setLeaderboard((current) => {
            const changedUsers: string[] = [];

            const newLeaderboard = updatedLeaderboard.map((entry) => {
              const previousEntry = current.find(
                (e) => e.userId === entry.userId
              );
              const previousRank = previousEntry?.rank ?? entry.rank;

              if (previousEntry && previousEntry.rank !== entry.rank) {
                changedUsers.push(entry.userId);
              }

              return {
                ...entry,
                previousRank,
              };
            });

            // Highlight changed users
            if (changedUsers.length > 0) {
              changedUsers.forEach((userId, index) => {
                setHighlightedUser(userId);
                setTimeout(() => setHighlightedUser(null), 2000 + index * 500);
              });
            }

            return newLeaderboard;
          });
        }
      );
    }

    // Clean up on unmount
    return () => {
      leaveContestRoom(contestId);
      if (socket) {
        socket.off("leaderboard-update");
      }
    };
  }, [contestId, socket, connected]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<LeaderboardResponse>(
        `/api/v1/contests/${contestId}/leaderboard`
      );
      if (response.data.success) {
        setLeaderboard(response.data.data.leaderboard);
      } else {
        setError("Failed to load leaderboard data");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("An error occurred while fetching the leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    if (rank <= 10) return <Trophy className="w-5 h-5 text-electric-400" />;
    return <span className="font-mono text-gray-400">{rank}</span>;
  };

  const getRowClassName = (userId: string) => {
    if (userId === state.user?.id) {
      return "bg-electric-400/10 border border-electric-400/30";
    }
    if (userId === highlightedUser) {
      return "bg-yellow-500/20 border border-yellow-500/30";
    }
    return "hover:bg-gray-750";
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-10 ${className}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-electric-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-10 ${className}`}>
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={fetchLeaderboard}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className={`text-center py-10 ${className}`}>
        <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">
          No participants yet. Be the first to join!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Live Leaderboard</h2>
        <div className="flex items-center space-x-2">
          <div className="bg-electric-400/10 text-electric-400 text-xs py-1 px-2 rounded-full">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Live
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-750">
            <tr className="text-xs uppercase text-gray-400">
              <th className="px-4 py-3 font-medium">Rank</th>
              <th className="px-4 py-3 font-medium">Participant</th>
              <th className="px-4 py-3 font-medium text-center">Score</th>
              <th className="px-4 py-3 font-medium text-center">Penalty</th>
              <th className="px-4 py-3 font-medium text-center">Solved</th>
              <th className="px-4 py-3 font-medium text-center">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            <AnimatePresence>
              {leaderboard.map((entry) => (
                <motion.tr
                  key={entry.userId}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-gray-300 ${getRowClassName(entry.userId)}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium text-white">
                          {entry.name}
                          {entry.userId === state.user?.id && (
                            <span className="ml-2 text-xs text-electric-400">
                              (You)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-white">
                    {entry.score}
                  </td>
                  <td className="px-4 py-3 text-center text-red-400">
                    {entry.penalty > 0
                      ? `${Math.round(entry.penalty / 60000)} min`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-gray-400">
                        {typeof entry.problemsSolved === "number"
                          ? `${entry.problemsSolved} problems`
                          : "No problems solved yet"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs">{entry.change ?? "-"}</span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestLeaderboard;
