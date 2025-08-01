import { AuthProvider } from './contexts/AuthContext';
import { GlobalProvider } from './contexts/GlobalContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import OtpForm from "./components/Auth/OtpForm"; // if App.tsx is in src/


function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <NotificationProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <LoginRegister />
                  </ProtectedRoute>
                }
              />

              {/* OTP Form Route */}
              <Route path="/otp" element={<OtpForm />} />

              {/* Protected Routes */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <div className="flex-1 bg-white dark:bg-gray-900">
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
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/logs"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminSystemLogs />
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
