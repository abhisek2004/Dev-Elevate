import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "../../api/axiosinstance";
import { useGlobalState } from "../../contexts/GlobalContext";
import { baseUrl } from "../../config/routes";
import { MessageCircle, Trash2 } from "lucide-react"; // ✅ make sure to import your icons

type Feedback = {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const { state: globalState } = useGlobalState();

  // ✅ fetch function
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/api/v1/admin/faq-get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch feedback");
      }

      const result: {
        success: boolean;
        count: number;
        data: Feedback[];
      } = await res.json();

      if (Array.isArray(result.data)) {
        setFeedbacks(result.data);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch feedback");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ delete function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(`/admin/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });

      const updated = feedbacks.filter((fb) => fb._id !== id);
      setFeedbacks(updated);
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  // ✅ Hook at top-level
  useEffect(() => {
    fetchFeedbacks();
  }, []);

return (
  <div className="p-6 space-y-6">
    {/* Feedback Summary Cards */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div
        className={`${
          globalState.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } p-4 rounded-lg border shadow-sm transition`}
      >
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-yellow-500" />
          <span
            className={`text-sm font-medium ${
              globalState.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Total Submissions
          </span>
        </div>
        <p
          className={`text-2xl font-bold mt-2 ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {feedbacks.length}
        </p>
      </div>
    </div>

    {/* Contact Form Submissions Table */}
    <div>
      <h1
        className={`mb-4 text-2xl font-bold ${
          globalState.darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Contact Form Submissions
      </h1>

      {loading ? (
        <div className="text-gray-600 dark:text-gray-400">
          Loading contact submissions...
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No contact submissions available
        </div>
      ) : (
        <div
          className={`overflow-x-auto rounded-xl border shadow-sm ${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <table className="w-full min-w-[700px] text-sm">
            <thead
              className={`${
                globalState.darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <tr>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 dark:text-gray-300 uppercase">
                  Your Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 dark:text-gray-300 uppercase">
                  Email Address
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 dark:text-gray-300 uppercase">
                  Message
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                globalState.darkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              {feedbacks.map((fb) => (
                <tr
                  key={fb._id}
                  className={`transition ${
                    globalState.darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {fb.name || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-gray-300">
                      {fb.email || "No email provided"}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs text-sm text-gray-900 dark:text-gray-300">
                    <div className="break-words">{fb.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(fb._id)}
                        title="Delete Submission"
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

};

export default AdminFeedback;
