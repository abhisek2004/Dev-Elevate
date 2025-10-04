import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  User,
  Camera,
  Save,
  X,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Edit,
} from "lucide-react";
import { baseUrl } from "../../config/routes";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    website?: string;
  };
}

const ProfileSettings: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    avatar: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      website: "",
    },
  });

  const [formData, setFormData] = useState(profile);

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/get-profile`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      const userProfile: UserProfile = {
        id: data._id || "",
        name: data.name || "",
        email: data.email || "",
        avatar: data.avatar || "",
        bio: data.bio || "",
        socialLinks: {
          linkedin: data.socialLinks?.linkedin || "",
          github: data.socialLinks?.github || "",
          twitter: data.socialLinks?.twitter || "",
          website: data.socialLinks?.website || "",
        },
      };

      setProfile(userProfile);
      setFormData(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const socialKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          socialLinks: formData.socialLinks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setProfile(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle avatar upload logic here
      toast.info("Avatar upload functionality will be implemented soon!");
    }
  };

  if (isLoading && !profile.id) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <Camera className="w-6 h-6" />
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                profile.name.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h4 className={`font-semibold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}>
              {profile.name || "User"}
            </h4>
            <p className={`text-sm ${
              globalState.darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Upload a new profile picture. Recommended size: 400x400px
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <User className="w-6 h-6" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2`}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                globalState.darkMode
                  ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100"
              }`}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className={`w-full px-4 py-3 border rounded-lg cursor-not-allowed ${
                globalState.darkMode
                  ? "border-gray-600 bg-gray-600 text-gray-400"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            />
            <p className={`text-xs mt-1 ${
              globalState.darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              Email cannot be changed
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium ${
            globalState.darkMode ? "text-gray-300" : "text-gray-700"
          } mb-2`}>
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            placeholder="Tell us about yourself..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ${
              globalState.darkMode
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className={`${
        globalState.darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className={`text-xl font-semibold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        } mb-6 flex items-center gap-2`}>
          <Globe className="w-6 h-6" />
          Social Links
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2`}>
              <Github className="w-4 h-4" />
              GitHub
            </label>
            <div className="relative">
              <Github className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                globalState.darkMode ? "text-gray-400" : "text-gray-400"
              }`} />
              <input
                type="url"
                name="socialLinks.github"
                value={formData.socialLinks.github}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://github.com/username"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  globalState.darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100"
                }`}
              />
            </div>
          </div>
          
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2`}>
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </label>
            <div className="relative">
              <Linkedin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                globalState.darkMode ? "text-gray-400" : "text-gray-400"
              }`} />
              <input
                type="url"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/username"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  globalState.darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100"
                }`}
              />
            </div>
          </div>
          
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2`}>
              <Twitter className="w-4 h-4" />
              Twitter
            </label>
            <div className="relative">
              <Twitter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                globalState.darkMode ? "text-gray-400" : "text-gray-400"
              }`} />
              <input
                type="url"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://twitter.com/username"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  globalState.darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100"
                }`}
              />
            </div>
          </div>
          
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2`}>
              <Globe className="w-4 h-4" />
              Website
            </label>
            <div className="relative">
              <Globe className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                globalState.darkMode ? "text-gray-400" : "text-gray-400"
              }`} />
              <input
                type="url"
                name="socialLinks.website"
                value={formData.socialLinks.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://yourwebsite.com"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  globalState.darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 disabled:bg-gray-800"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className={`px-6 py-3 border rounded-lg font-medium transition-all duration-200 ${
                globalState.darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              } disabled:opacity-50`}
            >
              <X className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-blue-400 disabled:to-cyan-400 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;