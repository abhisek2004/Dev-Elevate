import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/Layout/ScrollToTop";
import LearningHub from "./components/LearningHub/LearningHub";
import Chatbot from "./components/Chatbot/Chatbot";
import TechFeed from "./components/TechFeed/TechFeed";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import PlacementPrep from "./components/PlacementPrep/PlacementPrep";
import UserProfile from "./components/Profile/UserProfile";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import TermsOfService from "./components/Legal/TermsOfService";
import CreatorPage from "./components/Legal/CreatorPage";
import Disclaimer from "./components/Legal/Disclaimer";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminSystemLogs from "./components/Admin/AdminSystemLogs";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginRegister from "./components/Auth/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";
import PremiumPage from "./components/premium/PremiumPage";
import PaymentPage from "./components/Payment/PaymentPage";
import ProjectRecommender from "./components/ProjectRecommender/ProjectRecommender";
import Layout from "./components/Layout/Layout";
import OtpForm from "./components/Auth/OtpForm"; // OTP component
import Post from "./components/NewsPost/Post";
import AddPost from "./components/NewsPost/AddPost";

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
                    <Layout>
                      <div className="flex-1 bg-white dark:bg-gray-900">
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
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

                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    </Layout>
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
