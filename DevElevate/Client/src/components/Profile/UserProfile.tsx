import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Lock, 
  Settings, 
  BookOpen, 
  Trophy, 
  Target,
  Github,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';

const UserProfile: React.FC = () => {
  const { state: authState, updateProfile, changePassword } = useAuth();
  const { state: globalState } = useGlobalState();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    name: authState.user?.name || '',
    bio: authState.user?.bio || '',
    socialLinks: {
      linkedin: authState.user?.socialLinks?.linkedin || '',
      github: authState.user?.socialLinks?.github || '',
      twitter: authState.user?.socialLinks?.twitter || ''
    }
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

   // for dyanmic page title
             useEffect(()=>{
               document.title='DevElevate-My Profile'
             },[])

  const handleCancelEdit = () => {
    // Reset form data to original user data
    setFormData({
      name: authState.user?.name || '',
      bio: authState.user?.bio || '',
      socialLinks: {
        linkedin: authState.user?.socialLinks?.linkedin || '',
        github: authState.user?.socialLinks?.github || '',
        twitter: authState.user?.socialLinks?.twitter || ''
      }
    });
    setIsEditing(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password changed successfully!');
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : 'Failed to change password');
    }
  };

  const handleCancelPasswordChange = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordError('');
    setShowPasswordForm(false);
  };

  if (!authState.user) {
    return <div>Please log in to view your profile.</div>;
  }

  const { user } = authState;

  return (
    <div className={`min-h-screen ${globalState.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            My Profile
          </h1>
          <p className={`text-lg ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff&size=128`}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className={`text-xl font-bold mt-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </h2>
                <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.role === 'admin' ? 'Administrator' : 'Student'}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {user.progress.level}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Member Since
                  </span>
                  <span className={`text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Points
                  </span>
                  <span className={`text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.progress.totalPoints}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Current Streak
                  </span>
                  <span className={`text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.progress.streak} days
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                    globalState.darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Profile Information
                </h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ) : (
                    <p className={`${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <p className={`${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.email}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className={`${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Social Links
                  </label>
                  <div className="space-y-3">
                    {['linkedin', 'github', 'twitter'].map((platform) => (
                      <div key={platform} className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {platform === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-600" />}
                          {platform === 'github' && <Github className="w-5 h-5 text-gray-800 dark:text-white" />}
                          {platform === 'twitter' && <Twitter className="w-5 h-5 text-blue-400" />}
                        </div>
                        {isEditing ? (
                          <input
                            type="url"
                            value={formData.socialLinks[platform as keyof typeof formData.socialLinks]}
                            onChange={(e) => setFormData({
                              ...formData,
                              socialLinks: {
                                ...formData.socialLinks,
                                [platform]: e.target.value
                              }
                            })}
                            className={`flex-1 px-3 py-2 rounded-lg border ${
                              globalState.darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder={`Your ${platform} profile URL`}
                          />
                        ) : (
                          <span className={`${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {user.socialLinks?.[platform as keyof typeof user.socialLinks] || 'Not added'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change Form */}
            {showPasswordForm && (
              <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
                <h3 className={`text-xl font-semibold mb-6 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Change Password
                </h3>
                
                {passwordError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-sm text-red-700 dark:text-red-400">{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelPasswordChange}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Progress Summary */}
            <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
              <h3 className={`text-xl font-semibold mb-6 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                Learning Progress
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h4 className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.progress.coursesEnrolled.length}
                  </h4>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Courses Enrolled
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8 text-green-600 dark:text-green-300" />
                  </div>
                  <h4 className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.progress.completedModules}
                  </h4>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Modules Completed
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                  </div>
                  <h4 className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.progress.totalPoints}
                  </h4>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Points
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
