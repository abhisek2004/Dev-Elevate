// File: Client/src/components/Admin/AdminNewsletterSender.tsx
import React, { useState } from 'react';
import instance from '../../utils/axiosinstance';
import { useAuth } from '../../contexts/AuthContext';
import { useNotificationContext, Notification } from '../../contexts/NotificationContext';
// Import ReactQuill and its styles for the rich text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminNewsletterSender = () => {
    const [subject, setSubject] = useState('');
    // State for the rich text editor content
    const [content, setContent] = useState('');
    const [targetGroup, setTargetGroup] = useState('all');
    // New state to manage the sending status
    const [isSending, setIsSending] = useState(false);
    
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
        setIsSending(true); // Set sending state to true
        try {
            const response = await instance.post('/api/email/send', { 
                subject, 
                content,
                targetGroup
            });

            addNotification('Newsletter sent successfully!', 'success');
            console.log('Newsletter sent:', response.data);
            setSubject('');
            setContent(''); // Clears the rich text editor content
            setTargetGroup('all');
        } catch (error) {
            console.error('❌ Error sending newsletter', error);
            addNotification('Failed to send newsletter.', 'error');
        } finally {
            setIsSending(false); // Reset sending state regardless of outcome
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
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Body</label>
                    <div className="mt-1">
                        <ReactQuill 
                            theme="snow" 
                            value={content} 
                            onChange={setContent} 
                            className="bg-white dark:bg-gray-700 rounded-md"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="targetGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Group</label>
                    <select
                        id="targetGroup"
                        value={targetGroup}
                        onChange={(e) => setTargetGroup(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 focus:border-blue-500"
                    >
                        <option value="all">All Users</option>
                        <option value="newsletter_subscribers">Newsletter Subscribers</option>
                        <option value="admin_users">Admin Users</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSending} // Disable the button while sending
                >
                    {isSending ? 'Sending...' : 'Send Newsletter'}
                </button>
            </form>
        </div>
    );
};

export default AdminNewsletterSender;
