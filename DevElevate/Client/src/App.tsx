import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { GlobalProvider } from './contexts/GlobalContext';
import { NotificationProvider } from './contexts/NotificationContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Layout/ScrollToTop';
import LearningHub from './components/LearningHub/LearningHub';
import Chatbot from './components/Chatbot/Chatbot';
import TechFeed from './components/TechFeed/TechFeed';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import PlacementPrep from './components/PlacementPrep/PlacementPrep';
import UserProfile from './components/Profile/UserProfile';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';
import CreatorPage from './components/Legal/CreatorPage';
import Disclaimer from './components/Legal/Disclaimer';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminSystemLogs from './components/Admin/AdminSystemLogs';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginRegister from './components/Auth/LoginRegister';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import PremiumPage from './components/premium/PremiumPage';
import PaymentPage from './components/Payment/PaymentPage';
import ProjectRecommender from './components/ProjectRecommender/ProjectRecommender';
import Layout from "./components/Layout/Layout";
import Post from "./components/NewsPost/Post";
import AddPost from "./components/NewsPost/AddPost";
import AdminNewsletterSender from './components/Newsletter/AdminNewsletterSender';
import NewsletterLogs from "./components/Newsletter/NewsletterLogs";

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar toggleSidebar={toggleSidebar} />
      <div 
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 z-50`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="block p-2 rounded-md hover:bg-gray-700">Link 1</a></li>
            <li><a href="#" className="block p-2 rounded-md hover:bg-gray-700">Link 2</a></li>
          </ul>
        </div>
      </div>
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar} 
          className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
      <div className="flex-1">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/news" element={<TechFeed />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/placement" element={<PlacementPrep />} />
            <Route path="/projects" element={<ProjectRecommender />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/creator" element={<CreatorPage />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/news/:newsId" element={<Post />} />
            <Route path="news/add-post" element={<AddPost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <NotificationProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<LoginRegister />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <ProtectedLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/logs" element={<AdminSystemLogs />} />
                      <Route path="/newsletter/send" element={<AdminNewsletterSender />} />
                      <Route path="/newsletter/logs" element={<NewsletterLogs />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </NotificationProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
