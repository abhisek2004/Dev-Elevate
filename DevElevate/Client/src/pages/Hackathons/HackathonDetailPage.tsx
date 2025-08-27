// pages/Hackathons/HackathonDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { hackathonApi, handleApiError } from '../../api/hackathonApi';
import { Hackathon, HackathonSubmission } from '../../types/hackathon';
import HackathonTimer from '../../components/Hackathons/HackathonTimer';
import TeamManagement from '../../components/Hackathons/TeamManagement';
import SubmissionForm from '../../components/Hackathons/SubmissionForm';
import LeaderboardTable from '../../components/Hackathons/LeaderboardTable';
import { 
  Calendar, Users, Trophy, Clock, ArrowLeft, 
  FileText, Target, Award, MapPin, Tag 
} from 'lucide-react';
import { format } from 'date-fns';

const HackathonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [submissions, setSubmissions] = useState<HackathonSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistered, setIsRegistered] = useState(false);
  const [userTeam, setUserTeam] = useState(null);

  useEffect(() => {
    if (id) {
      loadHackathon();
      loadLeaderboard();
    }
  }, [id]);

  const loadHackathon = async () => {
    try {
      setLoading(true);
      const response = await hackathonApi.getHackathon(id!);
      if (response.success && response.data) {
        setHackathon(response.data);
        // TODO: Check if user is registered
        setError(null);
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const response = await hackathonApi.getLeaderboard(id!);
      if (response.success && response.data) {
        setSubmissions(response.data);
      }
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  };

  const handleRegistration = async (participationType: 'individual' | 'team') => {
    try {
      const response = await hackathonApi.registerToHackathon(id!, { participationType });
      if (response.success) {
        setIsRegistered(true);
        loadHackathon(); // Refresh data
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      judging: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      ended: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    };
    return badges[status as keyof typeof badges] || badges.upcoming;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading hackathon...</p>
        </div>
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Hackathon not found'}</p>
          <Button onClick={() => navigate('/hackathons')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hackathons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative">
        {hackathon.bannerImage ? (
          <div 
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${hackathon.bannerImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ) : (
          <div className="h-64 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        )}

        {/* Header Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <Button
              onClick={() => navigate('/hackathons')}
              variant="ghost"
              className="text-white hover:bg-white hover:bg-opacity-20 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hackathons
            </Button>

            <div className="flex items-start justify-between">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">{hackathon.title}</h1>
                <p className="text-xl opacity-90 mb-4">{hackathon.theme}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(hackathon.status)}`}>
                    {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {hackathon.totalParticipants} participants
                  </span>
                  <span className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    {hackathon.prizes.length} prizes
                  </span>
                </div>
              </div>

              <div className="text-right text-white">
                <HackathonTimer hackathon={hackathon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Rules & Criteria</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="submit">Submit</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    About This Hackathon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {hackathon.description}
                  </p>
                </div>

                {/* Tags */}
                {hackathon.tags.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Tag className="h-5 w-5 mr-2" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prizes */}
                {hackathon.prizes.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Prizes
                    </h3>
                    <div className="space-y-4">
                      {hackathon.prizes.map((prize, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-lg">{prize.position} Place</h4>
                              <p className="text-gray-600 dark:text-gray-400">{prize.title}</p>
                              {prize.description && (
                                <p className="text-sm text-gray-500 mt-1">{prize.description}</p>
                              )}
                            </div>
                            {prize.value && (
                              <div className="text-right">
                                <p className="font-bold text-green-600 dark:text-green-400">{prize.value}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration */}
                {hackathon.status === 'upcoming' && !isRegistered && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Register Now</h3>
                    <div className="space-y-3">
                      {hackathon.allowIndividualParticipation && (
                        <Button
                          className="w-full"
                          onClick={() => handleRegistration('individual')}
                          variant="primary"
                        >
                          Register as Individual
                        </Button>
                      )}
                      <Button
                        className="w-full"
                        onClick={() => handleRegistration('team')}
                        variant="outline"
                      >
                        Register with Team
                      </Button>
                    </div>
                  </div>
                )}

                {/* Event Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Starts</span>
                      <span className="font-medium">{format(new Date(hackathon.startDate), 'PPp')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Ends</span>
                      <span className="font-medium">{format(new Date(hackathon.endDate), 'PPp')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Registration until</span>
                      <span className="font-medium">{format(new Date(hackathon.registrationDeadline), 'PPp')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Team size</span>
                      <span className="font-medium">
                        {hackathon.minTeamSize === hackathon.maxTeamSize
                          ? hackathon.maxTeamSize
                          : `${hackathon.minTeamSize}-${hackathon.maxTeamSize}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Participants</span>
                      <span className="font-bold text-2xl text-blue-600">{hackathon.totalParticipants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Teams</span>
                      <span className="font-bold text-2xl text-purple-600">{hackathon.totalTeams}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Submissions</span>
                      <span className="font-bold text-2xl text-green-600">{submissions.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Rules
                </h3>
                <ul className="space-y-2">
                  {hackathon.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">{index + 1}.</span>
                      <span className="text-gray-600 dark:text-gray-400">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Judging Criteria
                </h3>
                <ul className="space-y-2">
                  {hackathon.judgingCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-400">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <TeamManagement hackathon={hackathon} />
          </TabsContent>

          {/* Submit Tab */}
          <TabsContent value="submit">
            <SubmissionForm hackathon={hackathon} />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <LeaderboardTable submissions={submissions} hackathon={hackathon} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
