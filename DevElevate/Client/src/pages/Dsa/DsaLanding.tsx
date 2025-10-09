import { Link } from "react-router-dom";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Building2, Code } from "lucide-react";

export default function DsaLanding() {
  const { state } = useGlobalState();

  return (
    <div className={`min-h-screen ${state.darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="px-4 py-12 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${state.darkMode ? "text-white" : "text-gray-900"}`}>Placement Preparation Arena</h1>
          <p className={`${state.darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Everything you need to ace your job interviews and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/placement/dsa/company" className={`${state.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-2xl p-6 hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-semibold ${state.darkMode ? "text-white" : "text-gray-900"}`}>Company-wise Questions</h2>
            </div>
            <p className={`${state.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Practice curated DSA questions asked by top tech companies.
            </p>
          </Link>

          <Link to="/placement/dsa/practice" className={`${state.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-2xl p-6 hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-semibold ${state.darkMode ? "text-white" : "text-gray-900"}`}>DSA Practice Problems</h2>
            </div>
            <p className={`${state.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Solve topic-wise problems to master data structures and algorithms.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}


