import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  User,
  Bell,
  Palette,
  Shield,
  Settings as SettingsIcon,
} from "lucide-react";
import ProfileSettings from "./ProfileSettings";
import NotificationSettings from "./NotificationSettings";
import ThemeSettings from "./ThemeSettings";
import AccountSettings from "./AccountSettings";

const UserSettings: React.FC = () => {
  const { state } = useGlobalState();
  const location = useLocation();

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/settings/profile",
      component: ProfileSettings,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      path: "/settings/notifications",
      component: NotificationSettings,
    },
    {
      id: "theme",
      label: "Theme",
      icon: Palette,
      path: "/settings/theme",
      component: ThemeSettings,
    },
    {
      id: "account",
      label: "Account",
      icon: Shield,
      path: "/settings/account",
      component: AccountSettings,
    },
  ];

  const currentTab = tabs.find((tab) => location.pathname.includes(tab.id)) || tabs[0];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon
              className={`w-8 h-8 ${
                state.darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h1
              className={`text-4xl font-extrabold tracking-tight ${
                state.darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </h1>
          </div>
          <p
            className={`text-lg sm:text-xl font-medium leading-relaxed ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your account preferences and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`${
                state.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = location.pathname.includes(tab.id);
                  return (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm"
                          : state.darkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="notifications" element={<NotificationSettings />} />
              <Route path="theme" element={<ThemeSettings />} />
              <Route path="account" element={<AccountSettings />} />
              <Route path="*" element={<ProfileSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;