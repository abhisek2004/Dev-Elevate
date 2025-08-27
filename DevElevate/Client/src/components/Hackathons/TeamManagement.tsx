// components/Hackathons/TeamManagement.tsx
import React, { useState } from 'react';
import { Hackathon } from '../../types/hackathon';
import { Button } from '../ui/button';
import { hackathonApi, handleApiError } from '../../api/hackathonApi';
import { Users, Plus, Copy, Check, UserPlus } from 'lucide-react';

interface TeamManagementProps {
  hackathon: Hackathon;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ hackathon }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [createdTeam, setCreatedTeam] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await hackathonApi.createTeam(hackathon._id, { teamName: teamName.trim() });
      if (response.success && response.data) {
        setCreatedTeam(response.data);
        setSuccess('Team created successfully!');
        setTeamName('');
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await hackathonApi.joinTeam(hackathon._id, { inviteCode: inviteCode.trim().toUpperCase() });
      if (response.success) {
        setSuccess('Successfully joined the team!');
        setInviteCode('');
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const copyInviteCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy invite code:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-100 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Team Info */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Team Requirements</h3>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p>• Team size: {hackathon.minTeamSize}-{hackathon.maxTeamSize} members</p>
          <p>• {hackathon.allowIndividualParticipation ? 'Individual participation is allowed' : 'Team participation only'}</p>
          <p>• Share your invite code with teammates to let them join</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'create'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Create Team
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'join'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <UserPlus className="h-4 w-4 inline mr-2" />
            Join Team
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'create' ? (
            <div>
              <h4 className="text-lg font-semibold mb-4">Create Your Team</h4>
              
              {!createdTeam ? (
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Team Name
                    </label>
                    <input
                      type="text"
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter your team name..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <Button type="submit" loading={loading} className="w-full" variant="primary">
                    Create Team
                  </Button>
                </form>
              ) : (
                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Team "{createdTeam.teamName}" Created!
                  </h5>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                    Share this invite code with your teammates:
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-600 rounded-lg px-3 py-2">
                      <code className="text-lg font-mono font-bold text-green-800 dark:text-green-200">
                        {createdTeam.inviteCode}
                      </code>
                    </div>
                    <Button
                      onClick={() => copyInviteCode(createdTeam.inviteCode)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-lg font-semibold mb-4">Join a Team</h4>
              
              <form onSubmit={handleJoinTeam} className="space-y-4">
                <div>
                  <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Invite Code
                  </label>
                  <input
                    type="text"
                    id="inviteCode"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="Enter the 6-character invite code..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg tracking-wider"
                    maxLength={6}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
                
                <Button type="submit" loading={loading} className="w-full" variant="primary">
                  Join Team
                </Button>
              </form>

              <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                <p>💡 <strong>Tip:</strong> Ask your team leader for the 6-character invite code to join their team.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Teams */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Teams in this Hackathon ({hackathon.totalTeams})
        </h4>
        
        {hackathon.teams && hackathon.teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackathon.teams.map((team) => (
              <div key={team._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {team.teamName}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No teams created yet. Be the first to form a team!
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
