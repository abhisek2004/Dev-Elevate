import React from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Database } from "lucide-react";

const SystemLogs: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          System Logs
        </h3>
        <button
          onClick={() => navigate("/admin/logs")}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
        >
          <Database className="inline mr-2 w-4 h-4" />
          View Detailed Logs
        </button>
      </div>

      <div
        className={`${
          globalState.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } rounded-xl p-6 border shadow-sm`}
      >
        <p
          className={`text-center py-12 ${
            globalState.darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Database className="mx-auto mb-4 w-12 h-12 opacity-50" />
          Click "View Detailed Logs" to access the full system logs interface
          with filtering, search, and pagination capabilities.
        </p>
      </div>
    </div>
  );
};

export default SystemLogs;