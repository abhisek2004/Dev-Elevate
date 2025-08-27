// components/Hackathons/LeaderboardTable.tsx
import React, { useState } from 'react';
import { HackathonSubmission, Hackathon } from '../../types/hackathon';
import { Button } from '../ui/button';
import { hackathonApi, handleApiError } from '../../api/hackathonApi';
import { Heart, ExternalLink, Github, Trophy, Star, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface LeaderboardTableProps {
  submissions: HackathonSubmission[];
  hackathon: Hackathon;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ submissions, hackathon }) => {
  const [votingState, setVotingState] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (submissionId: string) => {
    try {
      setVotingState(prev => ({ ...prev, [submissionId]: true }));
      await hackathonApi.voteSubmission({ submissionId });
      // Refresh would be handled by parent component
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setVotingState(prev => ({ ...prev, [submissionId]: false }));
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Trophy className="h-5 w-5 text-orange-600" />;
      default:
        return <span className="text-gray-600 font-semibold">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  const getRepoName = (url: string) => {
    try {
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      return match ? `${match[1]}/${match[2]}` : url;
    } catch {
      return url;
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <Trophy className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Submissions Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to submit your amazing project!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Leaderboard ({submissions.length} submissions)
          </h3>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {submissions.map((submission, index) => {
            const rank = index + 1;
            const isVoting = votingState[submission._id];

            return (
              <div
                key={submission._id}
                className={`p-6 transition-all hover:shadow-sm ${getRankBg(rank)}`}
              >
                <div className="flex items-start justify-between">
                  {/* Left side - Project info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-4">
                        {getRankIcon(rank)}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {submission.projectTitle}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {submission.participationType === 'team' ? 'Team Submission' : 'Individual'}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {submission.projectDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {submission.techStack.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {submission.techStack.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                            +{submission.techStack.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mb-4">
                      <a
                        href={submission.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        {getRepoName(submission.repositoryUrl)}
                      </a>
                      {submission.liveDemoUrl && (
                        <a
                          href={submission.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                    </div>

                    {/* Repo Stats */}
                    {submission.repoStats && (
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {submission.repoStats.stars > 0 && (
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            {submission.repoStats.stars}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {submission.repoStats.contributors} contributors
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Submitted {format(new Date(submission.submittedAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right side - Voting and scores */}
                  <div className="ml-6 text-center">
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {submission.totalVotes}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {submission.totalVotes === 1 ? 'vote' : 'votes'}
                      </div>
                    </div>

                    {/* Judge Score */}
                    {submission.judgeScore !== undefined && (
                      <div className="mb-4">
                        <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                          {submission.judgeScore}/100
                        </div>
                        <div className="text-xs text-gray-500">Judge Score</div>
                      </div>
                    )}

                    {/* Vote Button */}
                    {hackathon.status === 'active' && (
                      <Button
                        onClick={() => handleVote(submission._id)}
                        disabled={isVoting}
                        size="sm"
                        className="flex items-center gap-1"
                        variant="outline"
                      >
                        <Heart className={`h-4 w-4 ${isVoting ? 'animate-pulse' : ''}`} />
                        {isVoting ? 'Voting...' : 'Vote'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer with voting info */}
      {hackathon.status === 'active' && (
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
            💡 <strong>Tip:</strong> Vote for your favorite projects! You can vote for multiple submissions, 
            but only once per project. Voting helps determine community favorites alongside judge scores.
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
