import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Eye,
  Zap,
  Save,
  Check,
} from "lucide-react";
import { baseUrl } from "../../config/routes";
import { toast } from "sonner";

type ThemeMode = "light" | "dark" | "system";
type ColorScheme = "blue" | "purple" | "green" | "orange" | "pink";
type FontSize = "small" | "medium" | "large";

interface ThemePreferences {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  fontSize: FontSize;
  reducedMotion: boolean;
  highContrast: boolean;
  compactMode: boolean;
}

const ThemeSettings: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState<ThemePreferences>({
    mode: "system",
    colorScheme: "blue",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
    compactMode: false,
  });

  useEffect(() => {
    fetchThemePreferences();
    applyTheme();
  }, [preferences]);

  const fetchThemePreferences = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/theme-preferences`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.preferences) {
          setPreferences(data.preferences);
        }
      }
    } catch (error) {
      console.error("Error fetching theme preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyTheme = () => {
    const root = document.documentElement;
    
    // Apply theme mode
    if (preferences.mode === "dark") {
      root.classList.add("dark");
    } else if (preferences.mode === "light") {
      root.classList.remove("dark");
    } else {
      // System preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    // Apply color scheme
    root.setAttribute("data-color-scheme", preferences.colorScheme);
    
    // Apply font size
    root.setAttribute("data-font-size", preferences.fontSize);
    
    // Apply accessibility preferences
    if (preferences.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
    
    if (preferences.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    if (preferences.compactMode) {
      root.classList.add("compact-mode");
    } else {
      root.classList.remove("compact-mode");
    }
  };

  const handlePreferenceChange = (key: keyof ThemePreferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`${baseUrl}/api/v1/theme-preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ preferences }),
      });

      if (response.ok) {
        toast.success("Theme preferences saved successfully!");
      } else {
        throw new Error("Failed to save preferences");
      }
    } catch (error) {
      console.error("Error saving theme preferences:", error);
      toast.error("Failed to save theme preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun, description: "Light theme" },
    { value: "dark", label: "Dark", icon: Moon, description: "Dark theme" },
    { value: "system", label: "System", icon: Monitor, description: "Follow system preference" },
  ];

  const colorSchemes = [
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" },
  ];

  const fontSizes = [
    { value: "small", label: "Small", description: "Compact text size" },
    { value: "medium", label: "Medium", description: "Default text size" },
    { value: "large", label: "Large", description: "Larger text for better readability" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Palette className="w-6 h-6" />
          Theme Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePreferenceChange("mode", option.value)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                preferences.mode === option.value
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <option.icon className={`w-8 h-8 ${
                  preferences.mode === option.value ? "text-blue-600" : "text-gray-500"
                }`} />
                <div className="text-center">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {option.description}
                  </div>
                </div>
                {preferences.mode === option.value && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Appearance Settings
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Compact Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reduce spacing and padding for a more compact interface
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.compactMode}
                onChange={(e) =>
                  handlePreferenceChange("compactMode", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Reduce Motion</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Minimize animations and transitions for better accessibility
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.reducedMotion}
                onChange={(e) =>
                  handlePreferenceChange("reducedMotion", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">High Contrast</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Increase contrast for better visibility
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.highContrast}
                onChange={(e) =>
                  handlePreferenceChange("highContrast", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => handlePreferenceChange("fontSize", size.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    preferences.fontSize === size.value
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`font-medium text-gray-900 dark:text-white ${
                      size.value === "small" ? "text-sm" :
                      size.value === "large" ? "text-lg" : "text-base"
                    }`}>
                      Aa
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{size.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Color Customization
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.value}
              onClick={() => handlePreferenceChange("colorScheme", scheme.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                preferences.colorScheme === scheme.value
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-8 h-8 rounded-full shadow-sm ${scheme.color}`} />
                <div className="font-semibold text-gray-900 dark:text-white">
                  {scheme.label}
                </div>
                {preferences.colorScheme === scheme.value && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Preview
        </h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              Sample Content
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              This is how your content will look with the current theme settings.
              You can see the font size, colors, and overall appearance here.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-sm">
                Primary Button
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-blue-400 disabled:to-cyan-400 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Theme Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;