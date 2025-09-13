import React, { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Search, Filter, X } from "lucide-react";
import AdminFeedback from "./AdminFeedback";

type FeedbackFilter = {
  email: string;
  status: string;
  dateFrom: string;
  dateTo: string;
};

const Feedback: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FeedbackFilter>({
    email: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  return (
    <div className="space-y-6">
      {/* Search & Actions */}
      <div className="flex flex-col gap-4 justify-between sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              globalState.darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className="flex">
          <button
            className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-40">
          <div
            className={`${
              globalState.darkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl p-6 w-full max-w-md mx-4`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-lg font-semibold ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Filter Feedback
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowFilter(false);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, status: e.target.value }))
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${
                    globalState.darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, dateTo: e.target.value }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      email: "",
                      status: "",
                      dateFrom: "",
                      dateTo: "",
                    })
                  }
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminFeedback />
    </div>
  );
};


export default Feedback;

