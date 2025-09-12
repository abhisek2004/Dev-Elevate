import React, { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Save } from "lucide-react";

const SystemSettings: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [systemSettings, setSystemSettings] = useState({
    siteName: "DevElevate",
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    maxUsersPerCourse: 1000,
    sessionTimeout: 30,
  });

  return (
    <div className="space-y-6">
      <h3
        className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        System Settings
      </h3>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <h4
            className={`text-lg font-semibold mb-4 ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            General Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Site Name
              </label>
              <input
                type="text"
                value={systemSettings.siteName}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    siteName: e.target.value,
                  })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label
                  className={`text-sm font-medium ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Maintenance Mode
                </label>
                <p
                  className={`text-xs ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Enable to show maintenance page to users
                </p>
              </div>
              <button
                onClick={() =>
                  setSystemSettings({
                    ...systemSettings,
                    maintenanceMode: !systemSettings.maintenanceMode,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemSettings.maintenanceMode
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemSettings.maintenanceMode
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label
                  className={`text-sm font-medium ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  User Registration
                </label>
                <p
                  className={`text-xs ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Allow new users to register
                </p>
              </div>
              <button
                onClick={() =>
                  setSystemSettings({
                    ...systemSettings,
                    registrationEnabled: !systemSettings.registrationEnabled,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemSettings.registrationEnabled
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemSettings.registrationEnabled
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <h4
            className={`text-lg font-semibold mb-4 ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Security Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    sessionTimeout: parseInt(e.target.value),
                  })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Max Users Per Course
              </label>
              <input
                type="number"
                value={systemSettings.maxUsersPerCourse}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    maxUsersPerCourse: parseInt(e.target.value),
                  })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label
                  className={`text-sm font-medium ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Notifications
                </label>
                <p
                  className={`text-xs ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Send system notifications via email
                </p>
              </div>
              <button
                onClick={() =>
                  setSystemSettings({
                    ...systemSettings,
                    emailNotifications: !systemSettings.emailNotifications,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemSettings.emailNotifications
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemSettings.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button className="flex items-center px-6 py-2 space-x-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
