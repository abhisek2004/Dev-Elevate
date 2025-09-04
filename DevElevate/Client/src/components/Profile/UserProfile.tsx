import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { FaRegEyeSlash } from "react-icons/fa";

import {
  User as UserIcon,
  Edit,
  Save,
  X,
  Camera,
  Lock,
  BookOpen,
  Trophy,
  Target,
  Github,
  Linkedin,
  Twitter,
  Flame,
} from "lucide-react";
import { baseUrl } from "../../config/routes";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  bio: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  joinDate: string;
  lastLogin: string;
  isActive: boolean;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: "en" | "hi";
    emailUpdates: boolean;
  };
  progress: {
    coursesEnrolled: string[];
    completedModules: number;
    totalPoints: number;
    streak: number;
    longestStreak: number;
    level: string;
    currentStreak: 0;
    streakStartDate?: string;
    streakEndDate?: string;
  };
}
const defaultUser: User = {
  id: "0",
  name: "Guest User",
  email: "guest@example.com",
  avatar: "",
  role: "user",
  bio: "",
  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
  },
  joinDate: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: false,
  preferences: {
    theme: "light",
    notifications: true,
    language: "en",
    emailUpdates: true,
  },
  progress: {
    coursesEnrolled: [],
    completedModules: 0,
    totalPoints: 0,
    streak: 0,
    longestStreak: 0,
    currentStreak: 0,
    level: "Beginner",
  },
};

const UserProfile: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    socialLinks: { linkedin: "", github: "", twitter: "" },
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/v1/get-profile`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        // Merge with defaults
        const mergedUser: User = {
          ...defaultUser,
          id: data._id || defaultUser.id,
          name: data.name || defaultUser.name,
          email: data.email || defaultUser.email,
          role: data.role || defaultUser.role,
          bio: data.bio || defaultUser.bio,
          socialLinks: {
            ...defaultUser.socialLinks,
            ...data.socialLinks,
          },
          joinDate: data.createdAt || defaultUser.joinDate,
          lastLogin: data.updatedAt || defaultUser.lastLogin,
          progress: {
            ...defaultUser.progress,
            streak: data.currentStreak || defaultUser.progress.streak,
            longestStreak:
              data.longestStreak || defaultUser.progress.longestStreak,
            currentStreak:
              data.currentStreak || defaultUser.progress.currentStreak,
          },
        };

        setUser(mergedUser);

        setFormData({
          name: mergedUser.name,
          bio: mergedUser.bio,
          socialLinks: { ...mergedUser.socialLinks },
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const payload = {
        ...user, // existing data
        name: formData.name,
        bio: formData.bio,
        socialLinks: {
          ...user.socialLinks,
          ...formData.socialLinks,
        },
      };

      const res = await fetch(`${baseUrl}/api/v1/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();

      // Merge with defaults to prevent undefined errors
      const mergedUser = {
        ...defaultUser,
        ...data,
        socialLinks: { ...defaultUser.socialLinks, ...data.socialLinks },
        progress: { ...defaultUser.progress, ...data.progress },
      };
      setUser(mergedUser);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to save profile");
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        socialLinks: {
          linkedin: user.socialLinks?.linkedin || "",
          github: user.socialLinks?.github || "",
          twitter: user.socialLinks?.twitter || "",
        },
      });
    }
    setIsEditing(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(passwordData);

    setPasswordError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to change password");
      }
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : "Failed to change password"
      );
    }
  };

  const handleCancelPasswordChange = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setShowPasswordForm(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  const streakValue = user?.progress?.streak ?? 0;
  const streakPercentage = Math.min(100, (streakValue / 30) * 100);
  const streakMessage =
    streakValue >= 7
      ? "🔥 Keep it up!"
      : streakValue >= 3
      ? "You're on a roll!"
      : "Complete daily goals to build your streak!";

  return (
    <div
      className={`min-h-screen ${
        globalState.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            My Profile
          </h1>
          <p
            className={`text-lg ${
              globalState.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div
              className={`${
                globalState.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl p-6 border shadow-sm`}
            >
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}&background=3b82f6&color=fff&size=128`
                    }
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                  />
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2
                  className={`text-xl font-bold mt-4 ${
                    globalState.darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.name}
                </h2>
                <p
                  className={`text-sm ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {user.role === "admin" ? "Administrator" : "Student"}
                </p>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  }`}
                >
                  {user.progress.level}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Member Since
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Total Points
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.progress.totalPoints}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Current Streak
                  </span>
                  <div className="flex items-center">
                    <Flame className="w-4 h-4 text-orange-500 mr-1" />
                    <span
                      className={`text-sm font-medium ${
                        globalState.darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user.progress.streak} days
                    </span>
                  </div>
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
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
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
            <div
              className={`${
                globalState.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl p-6 border shadow-sm`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-xl font-semibold ${
                    globalState.darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
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
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ) : (
                    <p
                      className={`${
                        globalState.darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <p
                    className={`${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.email}
                  </p>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p
                      className={`${
                        globalState.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {user.bio || "No bio added yet."}
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Social Links
                  </label>
                  <div className="space-y-3">
                    {["linkedin", "github", "twitter"].map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          {platform === "linkedin" && (
                            <Linkedin className="w-5 h-5 text-blue-600" />
                          )}
                          {platform === "github" && (
                            <Github className="w-5 h-5 text-gray-800 dark:text-white" />
                          )}
                          {platform === "twitter" && (
                            <Twitter className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                        {isEditing ? (
                          <input
                            type="url"
                            value={
                              formData.socialLinks[
                                platform as keyof typeof formData.socialLinks
                              ]
                            }
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                socialLinks: {
                                  ...formData.socialLinks,
                                  [platform]: e.target.value,
                                },
                              })
                            }
                            className={`flex-1 px-3 py-2 rounded-lg border ${
                              globalState.darkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder={`Your ${platform} profile URL`}
                          />
                        ) : (
                          <span
                            className={`${
                              globalState.darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            {user.socialLinks?.[
                              platform as keyof typeof user.socialLinks
                            ] || "Not added"}
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
              <div
                className={`${
                  globalState.darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border shadow-sm`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    globalState.darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Change Password
                </h3>

                {passwordError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-sm text-red-700 dark:text-red-400">
                      {passwordError}
                    </span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        globalState.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className={`w-full px-3 py-2 rounded-lg border ${
                          globalState.darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />

                   {
                    showPassword?  <FaRegEyeSlash size={20} className="absolute right-3 top-3 text-gray-900 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}/>
                    : <FaRegEyeSlash size={20} className="absolute right-3 top-3 text-gray-900 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}/>
                   }   
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        globalState.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      New Password
                    </label>
                    <input
                       type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        globalState.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Confirm New Password
                    </label>
                    <input
                       type={showPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        globalState.darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
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
            <div
              className={`${
                globalState.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl p-6 border shadow-sm`}
            >
              <h3
                className={`text-xl font-semibold mb-6 ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Learning Progress
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h4
                    className={`text-2xl font-bold ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.progress.coursesEnrolled.length}
                  </h4>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Courses Enrolled
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8 text-green-600 dark:text-green-300" />
                  </div>
                  <h4
                    className={`text-2xl font-bold ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.progress.completedModules}
                  </h4>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Modules Completed
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                  </div>
                  <h4
                    className={`text-2xl font-bold ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.progress.totalPoints}
                  </h4>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Total Points
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-8 h-8 text-orange-600 dark:text-orange-300" />
                  </div>
                  <h4
                    className={`text-2xl font-bold ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.progress.streak}
                  </h4>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Day Streak
                  </p>
                </div>
              </div>

              {/* Streak Progress Visualization */}
              <div
                className={`mt-6 p-4 rounded-lg ${
                  globalState.darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h4
                  className={`text-lg font-semibold mb-3 ${
                    globalState.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Streak Progress
                </h4>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-full h-4">
                    <div
                      className="bg-orange-500 h-4 rounded-full"
                      style={{ width: `${streakPercentage}%` }}
                    ></div>
                  </div>
                  <span
                    className={`ml-3 text-sm ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {user.progress.streak}/30 days
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {streakMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
