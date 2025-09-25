// ✅ All imports at the top
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider, useGlobalState } from "./contexts/GlobalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AdminProvider } from "./contexts/AdminContext";
import { AppProvider } from "./contexts/AppContext";
import Leaderboard from "./pages/Leaderboard/Leaderboard";import { SocketProvider } from "./contexts/SocketContext";

import Footer from "./components/Layout/Footer";
import { useEffect, useState } from "react";
import SplashScreen from "./components/Layout/SplashScreen";
import LearningHub from "./components/LearningHub/LearningHub";
import Chatbot from "./components/Chatbot/Chatbot";
import TechFeed from "./components/TechFeed/TechFeed";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import PlacementPrep from "./components/PlacementPrep/PlacementPrep";
import UserProfile from "./components/Profile/UserProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Overview from "./components/Admin/Overview";
import UserManagement from "./components/Admin/UserManagement";
import ContentManagement from "./components/Admin/ContentManagement";
import Community from "./components/Admin/Community";
import NewsUpdates from "./components/Admin/NewsUpdates";
import QuizManagement from "./components/Admin/QuizManagement";
import Analytics from "./components/Admin/Analytics";
import SystemLogs from "./components/Admin/SystemLogs";
import SystemSettings from "./components/Admin/SystemSettings";
import Feedback from "./components/Admin/Feedback";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginRegister from "./components/Auth/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import PremiumPage from "./components/premium/PremiumPage";
import PaymentPage from "./components/Payment/PaymentPage";
import ProjectRecommender from "./components/ProjectRecommender/ProjectRecommender";
import Layout from "./components/Layout/Layout";
import CommunityForum from "./components/Community/CommunityForum";
import NotesPage from "./pages/Notes/NotesPage";
import CalendarView from "./components/calendar/CalendarView";
import Coding from "./pages/Coding/Coding";
import InterviewPage from "./pages/Interview/InterviewPage";
import QuizPage from "./components/Quiz/QuizPage";
import BackToTopButton from "./components/Layout/BackToTopButton";
import HelpCenter from "./components/HelpCenter/HelpCenter";
import LandingPage from "./pages/Landing/LandingPage";
import PrivacyPolicy from "./pages/Landing/components/PrivacyPolicy";
import CookiePolicy from "./components/Legal/CookiePolicy";
import TermsOfService from "./pages/Landing/components/TermsOfService";
import Disclaimer from "./pages/Landing/components/Disclaimer";
import ApiDocs from "./pages/Landing/components/ApiDocs";
import DocumentationPage from "./pages/Landing/components/DocumentationPage";
import ContributorGuide from "./pages/Leaderboard/ContributorGuide";
import CreatorPage from "./pages/Landing/components/CreatorPage";
import JavaScriptFundamentals from "./pages/Notes/JavaScriptFundamentals/JavaScriptFundamentals"
import PythonNotes from "./pages/Notes/PythonBasics/PythonNotes.jsx"
import GitNotes from "./pages/Notes/GitVersionControl/GitNotes.jsx"
import FallBackNotes from "./pages/Notes/FallBackNotes.jsx"
import ReactPattern from "./pages/Notes/ReactPatterns/ReactPattern.jsx"
import Roadmap from "./pages/RoadmapPage/Roadmap"
import UserVideoPage from "./pages/videoPages/VideoPage.js";



// ✅ AppContent
const AppContent = () => {
  const { state } = useGlobalState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-creator" element={<CreatorPage />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/contributor-guide" element={<ContributorGuide />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginRegister />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminProvider>
                <AdminDashboard />
              </AdminProvider>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Overview
                courses={[]}
                newsArticles={[]}
                feedback={[]}
                onAddCourse={() => console.log("add course")}
                onAddNews={() => console.log("add news")}
                onExportData={() => console.log("export data")}
              />
            }
          />
          <Route path="users" element={<UserManagement />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="community" element={<Community />} />
          <Route path="news" element={<NewsUpdates />} />
          <Route path="quiz" element={<QuizManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="logs" element={<SystemLogs />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        {/* Protected Routes - Require Authentication */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppProvider>
                <Layout>
                  <div
                    className={`flex-1 ${
                      state.darkMode ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <main className="flex-1">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="learning" element={<LearningHub />} />
                        <Route path="quiz" element={<QuizPage />} />
                        <Route path="coding/*" element={<Coding />} />
                        <Route path="interview" element={<InterviewPage />} />
                        <Route path="chatbot" element={<Chatbot />} />
                        <Route path="news" element={<TechFeed />} />
                        <Route path="course" element={<UserVideoPage />} />

                        <Route
                          path="community/*"
                          element={<CommunityForum />}
                        />
                        <Route path="resume" element={<ResumeBuilder />} />
                        <Route path="placement" element={<PlacementPrep />} />
                        <Route
                          path="projects"
                          element={<ProjectRecommender />}
                        />
                        <Route path="roadmap" element={<Roadmap />} />
                        <Route path="calendar" element={<CalendarView />} />
                        <Route path="premium" element={<PremiumPage />} />
                        <Route path="payment" element={<PaymentPage />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="help-center" element={<HelpCenter />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                        <Route
                          path="*"
                          element={<Navigate to="/dashboard" replace />}
                        />
                        //All note related routes
                        <Route path="notes" element={<NotesPage />} />
                        <Route
                          path="/notes/javascript/*"
                          element={<JavaScriptFundamentals />}
                        />
                        <Route path="/notes/python" element={<PythonNotes />} />
                        <Route path="/notes/git" element={<GitNotes />} />
                        <Route path="/notes/react" element={<ReactPattern />} />
                        <Route
                          path="/notes/:topic"
                          element={<FallBackNotes />}
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
      </Routes>
      <BackToTopButton />
    </Router>
  );
};

// ✅ App root
function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    let timeoutId: number | undefined;
    const hide = () => setShowSplash(false);
    // Hide when window finished loading, with a safety timeout fallback
    if (document.readyState === "complete") {
      timeoutId = window.setTimeout(hide, 400);
    } else {
      window.addEventListener("load", hide, { once: true });
      timeoutId = window.setTimeout(hide, 1500);
    }
    return () => {
      window.removeEventListener("load", hide as EventListener);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AuthProvider>
      <GlobalProvider>
        <SocketProvider>
          <NotificationProvider>
            {showSplash ? (
              <SplashScreen
                fullPage
                title="DevElevate"
                subtitle="Preparing awesomeness..."
              />
            ) : (
              <AppContent />
            )}
          </NotificationProvider>
        </SocketProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
