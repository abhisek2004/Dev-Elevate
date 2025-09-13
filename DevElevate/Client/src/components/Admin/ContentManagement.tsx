import React from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  FileText,
  Upload,
  Plus,
  Globe,
  Database,
  Edit,
  Trash2,
} from "lucide-react";

const ContentManagement: React.FC = () => {
  const { state: globalState } = useGlobalState();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Content Management
        </h3>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600">
            <Upload className="w-4 h-4" />
            <span>Upload Content</span>
          </button>
          <button className="flex items-center px-4 py-2 space-x-2 text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600">
            <Plus className="w-4 h-4" />
            <span>Create Resource</span>
          </button>
        </div>
      </div>

      {/* Content Categories */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center mb-4 space-x-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <h4
              className={`text-lg font-semibold ${
                globalState.darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Documents
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                PDFs
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                24
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Notes
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                156
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Guides
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                32
              </span>
            </div>
          </div>
          <button className="px-4 py-2 mt-4 w-full text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600">
            Manage Documents
          </button>
        </div>

        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center mb-4 space-x-3">
            <Globe className="w-6 h-6 text-green-500" />
            <h4
              className={`text-lg font-semibold ${
                globalState.darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Media
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Videos
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                89
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Images
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                245
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Audio
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                12
              </span>
            </div>
          </div>
          <button className="px-4 py-2 mt-4 w-full text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600">
            Manage Media
          </button>
        </div>

        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center mb-4 space-x-3">
            <Database className="w-6 h-6 text-purple-500" />
            <h4
              className={`text-lg font-semibold ${
                globalState.darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Resources
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Templates
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                18
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Cheatsheets
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                67
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }
              >
                Tools
              </span>
              <span
                className={
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }
              >
                23
              </span>
            </div>
          </div>
          <button className="px-4 py-2 mt-4 w-full text-white bg-purple-500 rounded-lg transition-colors hover:bg-purple-600">
            Manage Resources
          </button>
        </div>
      </div>

      {/* Recent Uploads */}
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
          Recent Uploads
        </h4>
        <div className="space-y-3">
          {[
            {
              name: "DSA Complete Guide.pdf",
              type: "PDF",
              size: "2.4 MB",
              date: "2 hours ago",
            },
            {
              name: "React Hooks Tutorial.mp4",
              type: "Video",
              size: "45.2 MB",
              date: "5 hours ago",
            },
            {
              name: "Java Cheatsheet.png",
              type: "Image",
              size: "1.2 MB",
              date: "1 day ago",
            },
            {
              name: "System Design Notes.md",
              type: "Document",
              size: "156 KB",
              date: "2 days ago",
            },
          ].map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p
                    className={`font-medium ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {file.name}
                  </p>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    globalState.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {file.date}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;