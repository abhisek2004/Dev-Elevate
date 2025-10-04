import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  Bell,
  Mail,
  Smartphone,
  Monitor,
  Save,
  Volume2,
  VolumeX,
} from "lucide-react";
import { baseUrl } from "../../config/routes";
import { toast } from "sonner";

interface NotificationPreferences {
  email: {
    courseUpdates: boolean;
    quizReminders: boolean;
    achievementNotifications: boolean;
    weeklyProgress: boolean;
    communityActivity: boolean;
    systemUpdates: boolean;
  };
  push: {
    enabled: boolean;
    dailyReminders: boolean;
    streakReminders: boolean;
    newMessages: boolean;
    courseDeadlines: boolean;
  };
  inApp: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
    achievements: boolean;
    mentions: boolean;
    directMessages: boolean;
  };
}

const NotificationSettings: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      courseUpdates: true,
      quizReminders: true,
      achievementNotifications: true,
      weeklyProgress: false,
      communityActivity: false,
      systemUpdates: true,
    },
    push: {
      enabled: true,
      dailyReminders: true,
      streakReminders: true,
      newMessages: true,
      courseDeadlines: true,
    },
    inApp: {
      enabled: true,
      sound: true,
      desktop: true,
      achievements: true,
      mentions: true,
      directMessages: true,
    },
  });

  useEffect(() => {
    fetchNotificationPreferences();
  }, []);

  const fetchNotificationPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/notification-preferences`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.preferences) {
          setPreferences(data.preferences);
        }
      }
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (category: keyof NotificationPreferences, key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]],
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`${baseUrl}/api/v1/notification-preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ preferences }),
      });

      if (response.ok) {
        toast.success("Notification preferences updated successfully!");
      } else {
        throw new Error("Failed to update preferences");
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast.error("Failed to update notification preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast.success("Browser notifications enabled!");
      } else {
        toast.error("Browser notifications denied");
      }
    } else {
      toast.error("Browser notifications not supported");
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
        checked
          ? "bg-blue-600"
          : "bg-gray-200 dark:bg-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <Mail className="w-6 h-6" />
          Email Notifications
        </h3>
        <div className="space-y-6">
          {[
            { key: "courseUpdates", label: "Course updates and announcements", description: "Get notified about new content and course changes" },
            { key: "quizReminders", label: "Quiz and assignment reminders", description: "Reminders for upcoming quizzes and deadlines" },
            { key: "achievementNotifications", label: "Achievement notifications", description: "Celebrate your milestones and achievements" },
            { key: "weeklyProgress", label: "Weekly progress reports", description: "Summary of your learning progress each week" },
            { key: "communityActivity", label: "Community activity", description: "Updates from forums and community discussions" },
            { key: "systemUpdates", label: "System updates", description: "Important platform updates and maintenance notices" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`font-semibold ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {item.label}
                </div>
                <div className={`text-sm ${
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {item.description}
                </div>
              </div>
              <ToggleSwitch
                checked={preferences.email[item.key as keyof typeof preferences.email]}
                onChange={() => handleToggle("email", item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <Smartphone className="w-6 h-6" />
          Push Notifications
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`font-semibold ${
                globalState.darkMode ? "text-white" : "text-gray-900"
              }`}>
                Enable push notifications
              </div>
              <div className={`text-sm ${
                globalState.darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Allow browser notifications for real-time updates
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={requestNotificationPermission}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Request Permission
              </button>
              <ToggleSwitch
                checked={preferences.push.enabled}
                onChange={() => handleToggle("push", "enabled")}
              />
            </div>
          </div>
          
          {[
            { key: "dailyReminders", label: "Daily learning reminders", description: "Gentle reminders to maintain your learning streak" },
            { key: "streakReminders", label: "Streak reminders", description: "Don't break your learning streak!" },
            { key: "newMessages", label: "New messages", description: "Notifications for new community messages" },
            { key: "courseDeadlines", label: "Course deadlines", description: "Reminders for upcoming assignment deadlines" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`font-semibold ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {item.label}
                </div>
                <div className={`text-sm ${
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {item.description}
                </div>
              </div>
              <ToggleSwitch
                checked={preferences.push[item.key as keyof typeof preferences.push]}
                onChange={() => handleToggle("push", item.key)}
                disabled={!preferences.push.enabled}
              />
            </div>
          ))}
        </div>
      </div>

      {/* In-App Notifications */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <Monitor className="w-6 h-6" />
          In-App Notifications
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`font-semibold ${
                globalState.darkMode ? "text-white" : "text-gray-900"
              }`}>
                Enable in-app notifications
              </div>
              <div className={`text-sm ${
                globalState.darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Show notifications within the application
              </div>
            </div>
            <ToggleSwitch
              checked={preferences.inApp.enabled}
              onChange={() => handleToggle("inApp", "enabled")}
            />
          </div>
          
          {[
            { key: "sound", label: "Notification sounds", description: "Play sound for notifications", icon: preferences.inApp.sound ? Volume2 : VolumeX },
            { key: "desktop", label: "Desktop notifications", description: "Show notifications on desktop", icon: Monitor },
            { key: "achievements", label: "Achievement notifications", description: "Celebrate your accomplishments", icon: Bell },
            { key: "mentions", label: "Mentions and replies", description: "When someone mentions you in discussions", icon: Bell },
            { key: "directMessages", label: "Direct messages", description: "Private messages from other users", icon: Mail },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <item.icon className="w-4 h-4 text-gray-500" />
                <div>
                  <div className={`font-semibold ${
                    globalState.darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-sm ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {item.description}
                  </div>
                </div>
              </div>
              <ToggleSwitch
                checked={preferences.inApp[item.key as keyof typeof preferences.inApp]}
                onChange={() => handleToggle("inApp", item.key)}
                disabled={!preferences.inApp.enabled}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-blue-400 disabled:to-cyan-400 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;