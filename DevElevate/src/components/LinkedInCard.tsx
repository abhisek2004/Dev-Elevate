import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState } from '../contexts/GlobalContext';

interface LinkedInProfile {
  name?: string;
  headline?: string;
  profilePicture?: string;
}

interface LinkedInStatus {
  isConnected: boolean;
  profileUrl?: string;
  profile?: LinkedInProfile;
  experienceCount?: number;
  educationCount?: number;
  skillsCount?: number;
  lastSynced?: string;
}

const LinkedInCard: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [connected, setConnected] = useState<boolean>(false);
  const [status, setStatus] = useState<LinkedInStatus | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchLinkedInStatus();
  }, []);

  const fetchLinkedInStatus = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:5000/api/integrations/linkedin/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setConnected(response.data.success && response.data.data.isConnected);
      setStatus(response.data.data);
      if (response.data.data.profileUrl) {
        setProfileUrl(response.data.data.profileUrl);
      }
    } catch (error: any) {
      console.error('Failed to fetch LinkedIn status:', error);
      if (error.response?.status === 401) {
        setError('Please log in to use LinkedIn integration');
      } else if (error.code === 'ECONNREFUSED') {
        setError('Backend server is not running. Please start the backend server.');
      }
    }
  };

  const handleSync = async (): Promise<void> => {
    console.log('🔄 LinkedIn sync started...');
    
    if (!profileUrl) {
      setError('Please enter your LinkedIn profile URL');
      return;
    }

    if (!profileUrl.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)');
      return;
    }

    const token = localStorage.getItem('token');
    console.log('🔑 Auth token exists:', !!token);
    console.log('🔗 Profile URL:', profileUrl);

    setLoading(true);
    setError('');

    try {
      console.log('📡 Sending request to backend...');
      
      // Use simple test endpoint to verify connectivity
      const response = await axios.post('http://localhost:5000/api/linkedin-test', 
        { profileUrl },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Backend response:', response.data);

      if (response.data.success) {
        setConnected(true);
        setStatus(response.data.data);
        console.log('✅ LinkedIn data synced successfully!');
        alert('LinkedIn data synced successfully!');
        await fetchLinkedInStatus();
      } else {
        console.error('❌ Sync failed - backend returned success: false');
        setError('Sync failed: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('❌ LinkedIn sync error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        code: error.code
      });
      
      let errorMessage = 'Failed to sync LinkedIn data';
      
      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid request. Check your LinkedIn URL.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. The LinkedIn profile might not be accessible or the server is having issues.';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Make sure the backend is running on port 5000.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('🏁 LinkedIn sync completed');
    }
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      await axios.delete('http://localhost:5000/api/integrations/linkedin/disconnect', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setConnected(false);
      setStatus(null);
      setProfileUrl('');
      alert('LinkedIn integration disconnected successfully');
    } catch (error) {
      console.error('Failed to disconnect LinkedIn integration:', error);
    }
  };

  const handleImportToResume = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:5000/api/integrations/linkedin/import-to-resume', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        // Store the imported data in localStorage for the resume builder
        localStorage.setItem('linkedinResumeData', JSON.stringify(response.data.data));
        alert('LinkedIn data prepared for resume import! Go to Resume Builder to use it.');
      }
    } catch (error) {
      console.error('Failed to import LinkedIn data to resume:', error);
      alert('Failed to import LinkedIn data to resume');
    }
  };

  return (
    <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          LinkedIn Integration
        </h3>
        <div className="flex items-center">
          <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          {connected && <span className="text-green-500 text-sm font-medium">Connected</span>}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
        </div>
      )}

      {!connected ? (
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourname"
              className={`w-full px-3 py-2 rounded-lg border ${
                globalState.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-sm mt-1 ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Make sure your LinkedIn profile is public for data extraction
            </p>
          </div>
          <button
            onClick={handleSync}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors ${
              loading ? 'cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Syncing...</span>
              </>
            ) : (
              <span>Sync LinkedIn Data</span>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-3 mb-3">
              {status?.profile?.profilePicture && (
                <img
                  src={status.profile.profilePicture}
                  alt="LinkedIn Profile"
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
              )}
              <div>
                <h4 className={`font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {status?.profile?.name}
                </h4>
                <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {status?.profile?.headline}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className={`font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Experience: 
                </span>
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {status?.experienceCount || 0} entries
                </span>
              </div>
              <div>
                <span className={`font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Education: 
                </span>
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {status?.educationCount || 0} entries
                </span>
              </div>
              <div>
                <span className={`font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Skills: 
                </span>
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {status?.skillsCount || 0} skills
                </span>
              </div>
              <div>
                <span className={`font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Synced: 
                </span>
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {status?.lastSynced ? new Date(status.lastSynced).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSync}
              disabled={loading}
              className={`flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors ${
                loading ? 'cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Syncing...' : 'Re-sync Data'}
            </button>
            <button
              onClick={handleImportToResume}
              className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                globalState.darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Import to Resume
            </button>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInCard;