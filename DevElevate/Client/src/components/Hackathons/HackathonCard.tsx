// components/Hackathons/HackathonCard.tsx
import React from 'react';
import { Hackathon } from '../../types/hackathon';
import { Calendar, Users, Trophy, Clock, MapPin } from 'lucide-react';
import { format, isAfter, isBefore } from 'date-fns';

interface HackathonCardProps {
  hackathon: Hackathon;
  onClick: () => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon, onClick }) => {
  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      judging: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      ended: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    };
    return badges[status as keyof typeof badges] || badges.upcoming;
  };

  const formatDate = (date: Date | string) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const formatTime = (date: Date | string) => {
    return format(new Date(date), 'HH:mm');
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const start = new Date(hackathon.startDate);
    const end = new Date(hackathon.endDate);
    const regDeadline = new Date(hackathon.registrationDeadline);

    if (isBefore(now, regDeadline) && hackathon.status === 'upcoming') {
      const days = Math.ceil((regDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `${days} days to register`;
    } else if (isBefore(now, start) && hackathon.status === 'upcoming') {
      const days = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `Starts in ${days} days`;
    } else if (isBefore(now, end) && hackathon.status === 'active') {
      const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `${days} days left`;
    }
    return null;
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      {/* Banner/Header */}
      <div className="relative">
        {hackathon.bannerImage ? (
          <img
            src={hackathon.bannerImage}
            alt={hackathon.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
            <Trophy className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(hackathon.status)}`}>
            {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
          </span>
        </div>

        {/* Time Remaining */}
        {timeRemaining && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            <Clock className="h-3 w-3 inline mr-1" />
            {timeRemaining}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Theme */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {hackathon.title}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
            Theme: {hackathon.theme}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {hackathon.description}
          </p>
        </div>

        {/* Tags */}
        {hackathon.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {hackathon.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {hackathon.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                  +{hackathon.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2" />
            <span>{hackathon.totalParticipants} participants</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Trophy className="h-4 w-4 mr-2" />
            <span>{hackathon.prizes.length} prizes</span>
          </div>
        </div>

        {/* Dates */}
        <div className="border-t dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(hackathon.startDate)}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-500">Registration until</p>
              <p className="font-medium">{formatDate(hackathon.registrationDeadline)}</p>
            </div>
          </div>
        </div>

        {/* Team Size */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {hackathon.allowIndividualParticipation && hackathon.minTeamSize === 1 
            ? `Individual or team (max ${hackathon.maxTeamSize})`
            : `Team size: ${hackathon.minTeamSize}-${hackathon.maxTeamSize} members`
          }
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
