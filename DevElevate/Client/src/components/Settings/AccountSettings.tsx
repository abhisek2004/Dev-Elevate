import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  Shield,
  Lock,
  Trash2,
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  Key,
  Save,
  LogOut,
  UserX,
} from "lucide-react";
import { baseUrl } from "../../config/routes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  allowMultipleSessions: boolean;
}

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { state: globalState } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30,
    allowMultipleSessions: true,
  });

  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/security-settings`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          setSecuritySettings(data.settings);
        }
      }
    } catch (error) {
      console.error("Error fetching security settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordForm(false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySettingChange = async (key: keyof SecuritySettings, value: any) => {
    try {
      const updatedSettings = { ...securitySettings, [key]: value };
      setSecuritySettings(updatedSettings);

      const response = await fetch(`${baseUrl}/api/v1/security-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ settings: updatedSettings }),
      });

      if (response.ok) {
        toast.success("Security settings updated");
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating security settings:", error);
      toast.error("Failed to update security settings");
      // Revert the change
      fetchSecuritySettings();
    }
  };

  const handleDataExport = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/export-data`, {
        credentials: "include",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-data-export.json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Data exported successfully!");
      } else {
        throw new Error("Failed to export data");
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (deleteConfirmText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/delete-account`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Account deleted successfully");
        navigate("/");
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/logout-all-sessions`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out from all sessions");
        navigate("/login");
      } else {
        throw new Error("Failed to logout from all sessions");
      }
    } catch (error) {
      console.error("Error logging out from all sessions:", error);
      toast.error("Failed to logout from all sessions");
    } finally {
      setIsLoading(false);
    }
  };

  const ToggleSwitch: React.FC<{
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
  }> = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  if (isLoading && !securitySettings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <Lock className="w-6 h-6" />
          Password & Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Change Password
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Update your account password
              </div>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Security Settings
          </h3>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "twoFactorEnabled",
              label: "Two-Factor Authentication",
              description: "Add an extra layer of security to your account",
            },
            {
              key: "loginNotifications",
              label: "Login Notifications",
              description: "Get notified when someone logs into your account",
            },
            {
              key: "allowMultipleSessions",
              label: "Allow Multiple Sessions",
              description: "Allow logging in from multiple devices simultaneously",
            },
          ].map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {setting.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {setting.description}
                </div>
              </div>
              <ToggleSwitch
                checked={securitySettings[setting.key as keyof SecuritySettings] as boolean}
                onChange={() =>
                  handleSecuritySettingChange(
                    setting.key as keyof SecuritySettings,
                    !securitySettings[setting.key as keyof SecuritySettings]
                  )
                }
              />
            </div>
          ))}

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                Session Timeout
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Automatically log out after inactivity
              </div>
            </div>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) =>
                handleSecuritySettingChange("sessionTimeout", parseInt(e.target.value))
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Data Management
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Export Your Data
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Download a copy of all your data
              </div>
            </div>
            <button
              onClick={handleDataExport}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Logout All Sessions
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Sign out from all devices and browsers
              </div>
            </div>
            <button
              onClick={handleLogoutAllSessions}
              disabled={isLoading}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout All
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Danger Zone
          </h3>
        </div>

        <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-red-900 dark:text-red-100">
                Delete Account
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Permanently delete your account and all associated data
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>

          {showDeleteConfirm && (
            <div className="mt-4 p-4 border border-red-300 dark:border-red-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600">
                  <UserX className="w-5 h-5" />
                  <span className="font-medium">Confirm Account Deletion</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This action cannot be undone. This will permanently delete your account
                  and remove all your data from our servers.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type "DELETE" to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="DELETE"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAccountDeletion}
                    disabled={isLoading || deleteConfirmText !== "DELETE"}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete Account
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText("");
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;