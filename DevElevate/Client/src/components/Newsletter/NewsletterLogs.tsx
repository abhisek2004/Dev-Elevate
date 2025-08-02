import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosinstance";
interface EmailLog {
  _id: string;
  subject: string;
  sentBy?: {
    email: string;
  };
  sentAt: string;
  recipients: string[];
}

const NewsletterLogs: React.FC = () => {
  const [logs, setLogs] = useState<EmailLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get<{ logs: EmailLog[] }>("/api/email/logs");
        setLogs(res.data.logs);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Email Logs</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log._id} className="border p-2 rounded">
            <p><strong>Subject:</strong> {log.subject}</p>
            <p><strong>Sent by:</strong> {log.sentBy?.email || "N/A"}</p>
            <p><strong>Time:</strong> {new Date(log.sentAt).toLocaleString()}</p>
            <p><strong>Recipients:</strong> {log.recipients.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsletterLogs;
