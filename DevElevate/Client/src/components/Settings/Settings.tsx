import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { 
  Settings as SettingsIcon,
  User, 
  Lock, 
  Bell, 
  Moon, 
  Sun, 
  Globe,
  Camera,
  Save,
  LogOut,
  Shield,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Upload
} from 'lucide-react';
import Toast from '../Layout/Toast';

const Settings: React.FC = () => {
  const { state: authState, updateProfile, changePassword, logout } = useAuth();
  const { state: globalState, dispatch: globalDispatch } = useGlobalState();
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: authState.user?.name || '',
    email: authState.user?.email || '',
    bio: authState.user?.bio || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [preferences, setPreferences] = useState({
    theme: authState.user?.preferences?.theme || 'light',
    notifications: authState.user?.preferences?.notifications || true,
    language: authState.user?.preferences?.language || 'en',
    emailUpdates: authState.user?.preferences?.emailUpdates ?? true
  });
  
  // UI states
  const [activeSection, setActiveSection] = useState('account');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const sections = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'security', label: 'Password & Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      if (!profileData.name.trim()) {
        setErrors({ name: 'Name is required' });
        return;
      }
      
      if (!profileData.email.trim() || !/\S+@\S+\.\S+/.test(profileData.email)) {
        setErrors({ email: 'Valid email is required' });
        return;
      }
      
      await updateProfile(profileData);
      setToastMessage('Profile updated successfully!');
    } catch (error) {
      setToastMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      if (passwordData.newPassword.length < 6) {
        setErrors({ newPassword: 'Password must be at least 6 characters' });
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return;
      }
      
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setToastMessage('Password changed successfully!');
    } catch (error) {
      setToastMessage('Failed to change password. Please check your current password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({ preferences });
      
      // Update dark mode in global state
      if ((preferences.theme === 'dark') !== globalState.darkMode) {
        globalDispatch({ type: 'TOGGLE_DARK_MODE' });
      }
      
      setToastMessage('Preferences updated successfully!');
    } catch (error) {
      setToastMessage('Failed to update preferences.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setToastMessage('Logged out successfully!');
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfile({ avatar: e.target?.result as string });
        setToastMessage('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const renderAccountSettings = () => (
    <div className={`space-y-6 ${globalState.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-neutral-800 border border-gray-200'} p-6 rounded-lg`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {authState.user?.avatar ? (
              <img 
                src={authState.user.avatar} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              authState.user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
            <Camera className="w-4 h-4" />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfileImageUpload}
              className="hidden" 
            />
          </label>
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Picture</h3>
          <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-neutral-600'}`}>Upload a new avatar for your account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-neutral-800'} mb-2`}>
            Full Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-neutral-800 border-gray-300'} ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className={`block text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-neutral-800'} mb-2`}>
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-neutral-800 border-gray-300'} ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-neutral-800'} mb-2`}>
          Bio
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-neutral-800 border-gray-300'}`}
          placeholder="Tell us about yourself..."
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        disabled={isLoading}
        className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
      </button>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className={`space-y-6 ${globalState.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-neutral-800 border border-gray-200'} p-6 rounded-lg`}>
      <div>
        <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'} mb-2`}>
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300 text-gray-900'} pr-12`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'} mb-2`}>
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300 text-gray-900'} pr-12 ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'} mb-2`}>
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300 text-gray-900'} pr-12 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <Shield className="w-4 h-4" />
            <span>{isLoading ? 'Changing...' : 'Change Password'}</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'} mb-4`}>Account Security</h3>
        <div className={`p-4 rounded-lg border ${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className={`text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'} mb-2`}>Security Tips</p>
              <ul className={`mt-2 text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-neutral-600'} space-y-1`}>
                <li>• Use a strong, unique password</li>
                <li>• Enable notifications for account changes</li>
                <li>• Regularly review your account activity</li>
                <li>• Keep your contact information up to date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className={`space-y-6 ${globalState.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-neutral-800 border border-gray-200'} p-6 rounded-lg`}>
      <div>
        <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'} mb-4`}>Email Preferences</h3>
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 ${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${globalState.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div>
              <p className={`font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'}`}>Email Updates</p>
              <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Receive updates about new features and courses</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.emailUpdates}
                onChange={(e) => setPreferences({ ...preferences, emailUpdates: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 ${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
            </label>
          </div>

          <div className={`flex items-center justify-between p-4 ${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${globalState.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div>
              <p className={`font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-neutral-800'}`}>Push Notifications</p>
              <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Get notified about important activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={() => setPreferences({ ...preferences, notifications: true })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 ${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handlePreferencesUpdate}
        disabled={isLoading}
        className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
      </button>
    </div>
  );

  const renderPreferences = () => (
    <div className={`space-y-6 ${globalState.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-neutral-800 border border-gray-200'} p-6 rounded-lg`}>
        <div className={`${globalState.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-neutral-800'}`}> 
          <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Appearance</h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 ${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${globalState.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                {preferences.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <p className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-neutral-800'}`}>Theme</p>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Choose your preferred theme</p>
                </div>
              </div>
              <select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' })}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-neutral-800'}`}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className={`flex items-center justify-between p-4 ${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${globalState.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5" />
                <div>
                  <p className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-neutral-800'}`}>Language</p>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Select your preferred language</p>
                </div>
              </div>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value as 'en' | 'hi' })}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${globalState.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-neutral-800'}`}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handlePreferencesUpdate}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
        </button>

        <div className={`border-t border-gray-200 dark:border-gray-700 pt-6`}>
          <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Danger Zone</h3>
          <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg`}>
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors`}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            <p className={`mt-2 text-sm ${globalState.darkMode ? 'text-red-400' : 'text-red-600'}`}>
              This will sign you out of your account on this device.
            </p>
          </div>
        </div>
      </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'preferences':
        return renderPreferences();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className={`min-h-screen ${globalState.darkMode ? 'bg-gray-900 text-white' : 'bg-white'} transition-colors duration-200`}>
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')} 
          darkMode={globalState.darkMode} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            Settings
          </h1>

          <p className={`mt-2 ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : `${globalState.darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`${globalState.darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-neutral-800 border-gray-200'} rounded-lg shadow-sm border p-0`}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
