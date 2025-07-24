import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginRegister from "./components/Auth/LoginRegister";
import UserProfile from "./components/Profile/UserProfile";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import TermsOfService from "./components/Legal/TermsOfService";
import CreatorPage from "./components/Legal/CreatorPage";
import Disclaimer from "./components/Legal/Disclaimer";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import TechFeed from "./components/TechFeed/TechFeed";
import Chatbot from "./components/Chatbot/Chatbot";
import LearningHub from "./components/LearningHub/LearningHub";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Navbar from "./components/Layout/Navbar";
import PlacementPrep from "./components/PlacementPrep/PlacementPrep";
import Footer from "./components/Layout/Footer";
import CourseSuggestion from "./components/CourseSuggestion/CourseSuggestion";


function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>

          {/* <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col"> */}
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element = {
                  <ProtectedRoute requireAuth={false}>
                    <LoginRegister />
                  </ProtectedRoute>
                }
              />

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
                          <Route path="/course-suggestions" element={<CourseSuggestion />} />
                          <Route path="/chatbot" element={<Chatbot />} />
                          <Route path="/news" element={<TechFeed />} />
                          <Route path="/resume" element={<ResumeBuilder />} />
                          <Route
                            path="/placement"
                            element={<PlacementPrep />}
                          />
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
            </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
