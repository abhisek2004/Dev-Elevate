import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosinstance";
import { useNotificationContext, Notification } from '../../contexts/NotificationContext';

interface EmailLog {
    _id: string;
    subject: string;
    sentBy?: {
        email: string;
    };
    sentAt: string;
    recipients: string[];
    status: 'Sent' | 'Failed';
}

const mockLogs: EmailLog[] = [
  { _id: '1', subject: 'Weekly Update - Jan 1', status: 'Sent', sentBy: { email: 'admin@example.com' }, sentAt: '2023-01-01T10:00:00Z', recipients: ['user1@example.com', 'user2@example.com'] },
  { _id: '2', subject: 'Server Maintenance', status: 'Failed', sentBy: { email: 'admin@example.com' }, sentAt: '2023-01-05T12:30:00Z', recipients: ['user3@example.com'] },
  { _id: '3', subject: 'New Features Coming Soon', status: 'Sent', sentBy: { email: 'admin@example.com' }, sentAt: '2023-01-10T15:45:00Z', recipients: ['user4@example.com', 'user5@example.com', 'user6@example.com'] },
  { _id: '4', subject: 'Holiday Greetings', status: 'Sent', sentBy: { email: 'admin@example.com' }, sentAt: '2022-12-25T09:00:00Z', recipients: ['user7@example.com', 'user8@example.com'] },
  { _id: '5', subject: 'Q4 Performance Report', status: 'Failed', sentBy: { email: 'admin@example.com' }, sentAt: '2022-12-30T11:20:00Z', recipients: ['user9@example.com'] },
];

const NewsletterLogs: React.FC = () => {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<EmailLog[]>([]);
    const [filter, setFilter] = useState<'All' | 'Sent' | 'Failed'>('All');
    const [loading, setLoading] = useState(true);

    const { setNotifications } = useNotificationContext();
    const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
        const newNotification: Notification = {
            id: Date.now().toString(),
            type: type,
            title: type === 'success' ? 'Success' : 'Error',
            message: message,
            timestamp: new Date().toISOString(),
            read: false,
            priority: 'medium',
            category: 'system'
        };
        setNotifications(prevNotifications => [...prevNotifications, newNotification]);
    };

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                setLogs(mockLogs);
            } catch (err) {
                console.error("Failed to fetch logs", err);
                addNotification("Failed to fetch logs.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredLogs(logs);
        } else {
            setFilteredLogs(logs.filter(log => log.status === filter));
        }
    }, [filter, logs]);

    const getStatusColor = (status: 'Sent' | 'Failed') => {
        switch (status) {
            case 'Sent':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    };

    if (loading) {
        return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading logs...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">Newsletter Logs</h2>

            <div className="flex justify-center gap-4 mb-6">
                {['All', 'Sent', 'Failed'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status as 'All' | 'Sent' | 'Failed')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
                          ${filter === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`
                        }
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Sent By
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Recipients
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Sent At
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredLogs.length > 0 ? (
                            filteredLogs.map(log => (
                                <tr key={log._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {log.subject}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {log.sentBy?.email || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {log.recipients.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(log.status)}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(log.sentAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewsletterLogs;
