import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from '../../api/axiosinstance';


import { useGlobalState } from '../../contexts/GlobalContext';
import { 
  Trash2,
 
  CheckCircle,
  Check,
  Clock,
  MessageCircle,
 
} from 'lucide-react';

type FeedbackStatus = "Pending" | "Reviewed";
type Feedback = {
  _id: string;
  userId?: {
    email?: string;
    avatar?: string;
  };
  message: string;
  status: FeedbackStatus ;
  submittedAt: string;
};

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
    const { state: globalState, dispatch } = useGlobalState();
    
    
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ data: Feedback[] }>('admin/feedback/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (Array.isArray(res.data.data)) {
        setFeedbacks(res.data.data);
        localStorage.setItem('devElevateFeedbacks', JSON.stringify(res.data.data));
      } else {
        toast.error('Unexpected response format');
      }
    } catch {
      toast.error('Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };


 useEffect(() => {
  const load = async () => {
    const cached = localStorage.getItem('devElevateFeedbacks');
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

  const handleMarkReviewed = async (id: string) => {
    try {
      await axios.patch(`/admin/feedback/${id}/reviewed`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

     const updated = feedbacks.map(fb =>
  fb._id === id ? { ...fb, status: 'Reviewed' as FeedbackStatus } : fb
);

      setFeedbacks(updated);
      localStorage.setItem('devElevateFeedbacks', JSON.stringify(updated));
      toast.success('Marked as Reviewed');
    } catch {
      toast.error('Failed to mark as reviewed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await axios.delete(`/admin/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updated = feedbacks.filter(fb => fb._id !== id);
      setFeedbacks(updated);
      localStorage.setItem('devElevateFeedbacks', JSON.stringify(updated));
      toast.success('Deleted successfully');
    } catch {
      toast.error('Failed to delete');
    }
  };


  return (
    
  <div className="p-6 space-y-6">
  {/* Feedback Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {/* Total Feedback */}
    <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-yellow-500" />
        <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Feedback</span>
      </div>
      <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
        {feedbacks.length}
      </p>
    </div>

    {/* Pending Feedback */}
    <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-blue-500" />
        <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending Feedback</span>
      </div>
      <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
        {feedbacks.filter(f => f.status === 'Pending').length}
      </p>
    </div>

    {/* Reviewed Feedback */}
    <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
      <div className="flex items-center space-x-2">
        <Check className="w-5 h-5 text-green-500" />
        <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reviewed Feedback</span>
      </div>
      <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
        {feedbacks.filter(f => f.status === 'Reviewed').length}
      </p>
    </div>
  </div>

  {/* Feedback Moderation Table */}
  <div>
    <h1 className="text-2xl font-bold mb-4">Feedback Moderation</h1>

    {loading ? (
      <div className="text-gray-500 dark:text-gray-400">Loading feedback...</div>
    ) : feedbacks.length === 0 ? (
      <div className="text-gray-500 dark:text-gray-400 text-center">No feedback available</div>
    ) : (
      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm overflow-x-auto`}>
        <table className="w-full min-w-[700px]">
          <thead className={`${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${globalState.darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {feedbacks.map((fb) => (
              <tr key={fb._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={
                        fb.userId?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(fb.userId?.email || 'User')}&background=3b82f6&color=fff`
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{fb.userId?.email || 'Unknown'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-sm truncate">{fb.message}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    fb.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {fb.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(fb.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {fb.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkReviewed(fb._id)}
                        title="Mark as Reviewed"
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(fb._id)}
                      title="Delete Feedback"
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
