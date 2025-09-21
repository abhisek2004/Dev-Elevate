import React from "react";
import { Calendar, Clock, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Countdown, { CountdownRenderProps } from "react-countdown";

interface ContestCardProps {
  contest: {
    _id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    duration: number;
    participants: string[] | number;
    prizes: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    status: "upcoming" | "running" | "finished";
    isRegistered?: boolean;
  };
  index: number;
  onRegister: (contestId: string) => void;
  isRegistering: string | null;
}

const ContestCard: React.FC<ContestCardProps> = ({
  contest,
  index,
  onRegister,
  isRegistering,
}) => {
  const navigate = useNavigate();

  // Format duration (minutes to hours and minutes)
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;
  };

  // Get color based on difficulty
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

  // Determine participants count
  const participantsCount =
    typeof contest.participants === "number"
      ? contest.participants
      : contest.participants.length;

  // Handle view details button click
  const handleViewDetails = () => {
    navigate(`/coding/contests/${contest._id}`);
  };

  // Handle register button click
  const handleRegister = () => {
    onRegister(contest._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{contest.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
              contest.difficulty
            )}`}
          >
            {contest.difficulty}
          </span>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{contest.description}</p>

        {/* Contest Info */}
        <div className="space-y-3 mb-6">
          {/* Start Time */}
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="w-4 h-4 text-electric-400" />
            <span>
              {format(new Date(contest.startTime), "MMM d, yyyy HH:mm")}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="w-4 h-4 text-neon-400" />
            <span>{formatDuration(contest.duration)}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center space-x-2 text-gray-300">
            <Users className="w-4 h-4 text-green-400" />
            <span>{participantsCount} participants</span>
          </div>

          {/* Prizes (if any) */}
          {contest.prizes && contest.prizes.length > 0 && (
            <div className="flex items-center space-x-2 text-gray-300">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{contest.prizes.join(", ")}</span>
            </div>
          )}
        </div>

        {/* Countdown for upcoming contests */}
        {contest.status === "upcoming" && (
          <div className="bg-gray-700/50 rounded-lg p-3 mb-6">
            <div className="text-sm text-gray-300 mb-1">Starts in</div>
            <div className="text-xl font-mono font-bold text-electric-400">
              <Countdown
                date={new Date(contest.startTime)}
                renderer={({
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
                }}
              />
            </div>
          </div>
        )}

        {/* "Live Now" badge for running contests */}
        {contest.status === "running" && (
          <div className="bg-red-900/30 rounded-lg p-3 mb-6 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <div className="text-red-400 font-medium">LIVE NOW</div>
          </div>
        )}

        {/* Action Buttons - Two button layout with Register prominently displayed */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* View Details Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200"
          >
            View Details
          </motion.button>

          {/* Register Button - Only show for upcoming non-registered contests */}
          {contest.status === "upcoming" && !contest.isRegistered && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isRegistering === contest._id}
              onClick={handleRegister}
              className={`flex-1 py-3 ${
                isRegistering === contest._id
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-electric-400 to-neon-500 hover:from-electric-500 hover:to-neon-600 text-white"
              } rounded-lg font-medium transition-all duration-200`}
            >
              {isRegistering === contest._id ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </motion.button>
          )}

          {/* Already Registered Badge */}
          {contest.isRegistered && (
            <div className="flex items-center justify-center px-4 py-2 bg-green-600/30 text-green-400 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Registered
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContestCard;
