import AnalyticsDashboard from "./components/Admin/AnalyticsDashboard"; // ✅ import new component
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider, useGlobalState } from "./contexts/GlobalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AdminProvider } from "./contexts/AdminContext";
import { AppProvider } from "./contexts/AppContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/Layout/ScrollToTop";
import LearningHub from "./components/LearningHub/LearningHub";
import Chatbot from "./components/Chatbot/Chatbot";
import TechFeed from "./components/TechFeed/TechFeed";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import PlacementPrep from "./components/PlacementPrep/PlacementPrep";
import PlacementStats from "./pages/Placements/PlacementStats";
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
import CommunityForum from "./components/Community/CommunityForum";
import LandingPage from "./pages/Landing/LandingPage";
import TasksView from "./components/tasks/TasksView";
import NotesView from "./components/notes/NotesView";
import CalendarView from "./components/calendar/CalendarView";
import Coding from "./pages/Coding/Coding";
import InterviewPage from "./pages/Interview/InterviewPage";
import QuizPage from "./components/Quiz/QuizPage";



const AppContent = () => {
  const { state } = useGlobalState();
  
  return (
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
                <Route path="/" element={<LandingPage />} />
                <Route path="/placements" element={<PlacementStats />}/>
                        {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminProvider>
                        <AdminDashboard />
                      </AdminProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/logs"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminProvider>
                        <AdminSystemLogs />
                      </AdminProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminProvider>
                        <AnalyticsDashboard /> {/* ✅ NEW route */}
                      </AdminProvider>
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <AppProvider>
                        <Layout>
                          <div className={`flex-1 ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                            <main className="flex-1">
                              <Routes>
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="learning" element={<LearningHub />} />
                                <Route path="quiz" element={<QuizPage />} />
                                <Route path="coding/*" element={<Coding />} />
                                <Route path="interview" element={<InterviewPage />} />
                                <Route path="chatbot" element={<Chatbot />} />
                                <Route path="news" element={<TechFeed />} />
                                <Route
                                  path="community/*"
                                  element={<CommunityForum />}
                                />

                                <Route path="resume" element={<ResumeBuilder />} />
                                <Route
                                  path="placement"
                                  element={<PlacementPrep />}
                                />
                                <Route
                                  path="projects"
                                  element={<ProjectRecommender />}
                                />
                                <Route path="tasks" element={<TasksView />} />
                                <Route path="notes" element={<NotesView />} />
                                <Route path="calendar" element={<CalendarView />} />
                                <Route path="settings" element={<Settings />} />
                                <Route path="premium" element={<PremiumPage />} />
                                <Route path="payment" element={<PaymentPage />} />
                                <Route path="profile" element={<UserProfile />} />
                                <Route
                                  path="privacy"
                                  element={<PrivacyPolicy />}
                                />
                                <Route path="terms" element={<TermsOfService />} />
                                <Route path="creator" element={<CreatorPage />} />
                                <Route
                                  path="disclaimer"
                                  element={<Disclaimer />}
                                />
                                <Route
                                  path="*"
                                  element={<Navigate to="/dashboard" replace />}
                                />
                              </Routes>
                            </main>
                            <Footer /> 
                          </div>
                        </Layout>
                      </AppProvider>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminProvider>
                        <AdminDashboard />
                      </AdminProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/logs"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminProvider>
                        <AdminSystemLogs />
                      </AdminProvider>
                    </ProtectedRoute>
                  }
                />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
