import React, { useState } from 'react';
import instance from '../../utils/axiosinstance';
import { useAuth } from '../../contexts/AuthContext';
import { useNotificationContext, Notification } from '../../contexts/NotificationContext';

const AdminNewsletterSender = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [targetGroup, setTargetGroup] = useState('all');

    const { state: { user } } = useAuth();
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

    if (user?.role !== 'admin') {
        return <div className="text-center p-8 text-red-500">Access Denied. You must be an administrator to view this page.</div>;
    }

    const sendNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await instance.post('/api/email/send', {
                subject,
                content: body,
                targetGroup
            });

            addNotification('Newsletter sent successfully!', 'success');
            console.log('Newsletter sent:', response.data);
            setSubject('');
            setBody('');
            setTargetGroup('all');
        } catch (error) {
            console.error('Error sending newsletter', error);
            addNotification('Failed to send newsletter.', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Send Newsletter to all Users</h2>
            <form onSubmit={sendNewsletter}>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Group</label>
                    <select
                        id="group"
                        value={targetGroup}
                        onChange={(e) => setTargetGroup(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 focus:border-blue-500"
                    >
                        <option value="all">All Users</option>
                        <option value="newsletter_subscribers">Newsletter Subscribers</option>
                        <option value="admin_users">Admin Users</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Body</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={10}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Send Newsletter
                </button>
            </form>
        </div>
    );
};

export default AdminNewsletterSender;
