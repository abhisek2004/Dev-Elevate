import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface GitHubStatus {
  isConnected: boolean;
  username?: string;
  lastSynced?: string;
  repositoryCount?: number;
  topLanguages?: Array<{ name: string }>;
}

const GitHubCard: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [status, setStatus] = useState<GitHubStatus | null>(null);

  useEffect(() => {
    fetchGitHubStatus();
  }, []);

  const fetchGitHubStatus = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:5000/api/integrations/github/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setConnected(response.data.success && response.data.data.isConnected);
      setStatus(response.data.data);
    } catch (error: any) {
      console.error('Failed to fetch GitHub status:', error);
      if (error.response?.status === 401) {
        console.log('GitHub status: Authentication required');
      } else if (error.code === 'ECONNREFUSED') {
        console.log('GitHub status: Backend server not running');
      }
    }
  };

  const handleConnect = async (): Promise<void> => {
    console.log('🔗 Starting GitHub connection...');
    const token = localStorage.getItem('token');
    console.log('🔑 Auth token exists:', !!token);
    
    if (!token) {
      alert('Please log in first to connect GitHub');
      return;
    }
    
    try {
      console.log('📡 Requesting GitHub auth URL...');
      const response = await axios.get('http://localhost:5000/api/integrations/github/auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ GitHub auth response:', response.data);
      
      if (response.data.success) {
        console.log('🚀 Redirecting to GitHub OAuth...');
        window.location.href = response.data.authUrl;
      } else {
        console.error('❌ GitHub auth failed:', response.data.message);
        alert('Failed to get GitHub auth URL: ' + response.data.message);
      }
    } catch (error: any) {
      console.error('❌ GitHub connection error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        code: error.code
      });
      
      let errorMessage = 'Failed to connect to GitHub';
      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Make sure the backend is running.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      alert(errorMessage);
    }
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      await axios.delete('http://localhost:5000/api/integrations/github/disconnect', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setConnected(false);
      setStatus(null);
      alert('GitHub integration disconnected successfully');
    } catch (error: any) {
      console.error('Failed to disconnect GitHub integration:', error);
      alert('Failed to disconnect GitHub integration: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">GitHub Integration</h3>
      {!connected ? (
        <button
          onClick={handleConnect}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Connect GitHub
        </button>
      ) : (
        <div>
          <p>Connected as: {status?.username}</p>
          <p>Last Synced: {status?.lastSynced ? new Date(status.lastSynced).toLocaleString() : 'Never'}</p>
          <p>Repositories: {status?.repositoryCount || 0}</p>
          <p>Top Languages: {status?.topLanguages?.map(lang => lang.name).join(', ') || 'None'}</p>
          <button
            onClick={handleDisconnect}
            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubCard;