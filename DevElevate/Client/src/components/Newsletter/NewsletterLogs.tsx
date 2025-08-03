// File: Client/src/components/Admin/NewsletterLogs.tsx
import React, { useState, useEffect } from 'react';
import instance from '../../utils/axiosinstance';
import { useAuth } from '../../contexts/AuthContext';
import { FaSpinner } from 'react-icons/fa';

// Define the interface for the log data from the backend
interface EmailLog {
    _id: string;
    subject: string;
    recipients: string[];
    content: string;
    sentAt: string;
    sentBy: {
        name: string;
        email: string;
    };
}

const NewsletterLogs = () => {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { state: { user } } = useAuth();

    // Fetch the logs from the backend on component mount
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // Corrected URL to include the '/api' prefix
                // The URL now matches the route defined in your backend
                const response = await instance.get('/api/admin/email/logs');
                
                // --- FIX FOR THE 'logs.filter is not a function' ERROR ---
                // The backend sends back an object { success: true, logs: [...] }
                // We need to extract the actual logs array from the 'logs' property.
                if (response.data && response.data.logs) {
                    setLogs(response.data.logs);
                } else {
                    setError('Received invalid data from the server.');
                }
            } catch (err: any) {
                console.error('Failed to fetch logs', err);
                setError('Failed to fetch logs. Please check the network and server.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'admin') {
            fetchLogs();
        }
    }, [user]);

    if (user?.role !== 'admin') {
        return <div className="text-center p-8 text-red-500">Access Denied. You must be an administrator to view this page.</div>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Newsletter Logs</h2>
            {logs.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No newsletter logs found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sent By</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Recipients</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sent At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {logs.map((log) => (
                                <tr key={log._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{log.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{log.sentBy.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{log.recipients.length}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(log.sentAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NewsletterLogs;
