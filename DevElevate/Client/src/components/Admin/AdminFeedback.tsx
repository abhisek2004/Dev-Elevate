import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "../../api/axiosinstance";

import { useGlobalState } from "../../contexts/GlobalContext";
import { Trash2, MessageCircle } from "lucide-react";

type Feedback = {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      _id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      message:
        "I'm interested in learning more about your premium features. Can you provide more details about the advanced coding challenges?",
      submittedAt: "2024-01-15T10:30:00Z",
    },
    {
      _id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      message:
        "I'm having trouble accessing the MERN stack course materials. The videos seem to be loading slowly. Is there a technical issue?",
      submittedAt: "2024-01-14T15:45:00Z",
    },
    {
      _id: "3",
      name: "Mike Chen",
      email: "mike.chen@tech.com",
      message:
        "Great platform! I've been using it for 2 months and my coding skills have improved significantly. Thank you for creating such a comprehensive learning resource.",
      submittedAt: "2024-01-13T09:20:00Z",
    },
    {
      _id: "4",
      name: "Emily Davis",
      email: "emily.davis@student.edu",
      message:
        "I'm a computer science student and would love to contribute to your open source projects. How can I get involved?",
      submittedAt: "2024-01-12T14:15:00Z",
    },
    {
      _id: "5",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@dev.com",
      message:
        "The AI-powered code review feature is amazing! It helped me catch several bugs in my JavaScript projects. Keep up the great work!",
      submittedAt: "2024-01-11T11:30:00Z",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { state: globalState } = useGlobalState();

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ data: Feedback[] }>("admin/feedback/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (Array.isArray(res.data.data)) {
        setFeedbacks(res.data.data);
        localStorage.setItem(
          "devElevateFeedbacks",
          JSON.stringify(res.data.data)
        );
      } else {
        toast.error("Unexpected response format");
      }
    } catch {
      toast.error("Failed to fetch feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      const cached = localStorage.getItem("devElevateFeedbacks");
      if (!cached) return fetchFeedbacks();

      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setFeedbacks(parsed);
          setLoading(false);
        } else {
          fetchFeedbacks();
        }
      } catch {
        fetchFeedbacks();
      }
    };

    load(); // call the inner async function
  }, []);

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
      localStorage.setItem("devElevateFeedbacks", JSON.stringify(updated));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Feedback Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Total Feedback */}
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-yellow-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Total Submissions
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {feedbacks.length}
          </p>
        </div>
      </div>

      {/* Contact Form Submissions Table */}
      <div>
        <h1 className="mb-4 text-2xl font-bold">Contact Form Submissions</h1>

        {loading ? (
          <div className="text-gray-500 dark:text-gray-400">
            Loading contact submissions...
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No contact submissions available
          </div>
        ) : (
          <div
            className={`${
              globalState.darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-xl border shadow-sm overflow-x-auto`}
          >
            <table className="w-full min-w-[700px]">
              <thead
                className={`${
                  globalState.darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Your Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Email Address
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                    Type your Message
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
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
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {fb.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {fb.email || "No email provided"}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm text-sm text-gray-700 dark:text-gray-300">
                      <div className="break-words">{fb.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(fb._id)}
                          title="Delete Submission"
                          className="text-red-600 hover:text-red-800"
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
