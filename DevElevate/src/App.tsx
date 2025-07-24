

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GlobalProvider } from './contexts/GlobalContext';

// CORE LAYOUT & AUTH
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// PAGE COMPONENTS
import LoginRegister from './components/Auth/LoginRegister';
import Dashboard from './components/Dashboard/Dashboard';
import LearningHub from './components/LearningHub/LearningHub';
import Chatbot from './components/Chatbot/Chatbot';
import TechFeed from './components/TechFeed/TechFeed';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import PlacementPrep from './components/PlacementPrep/PlacementPrep';
import UserProfile from './components/Profile/UserProfile';
// ... import any other page components you have


import DiscussionList from './components/Community/DiscussionList';
import DiscussionDetail from './components/Community/DiscussionDetail';


const ProtectedLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main className="flex-1">
      {/* Page content will be injected here */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Routes>
            {/* Public route for login */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginRegister />
                </ProtectedRoute>
              }
            />

            {/* All protected routes will use the ProtectedLayout */}
            <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
              
              {/* Existing Pages */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/learning" element={<LearningHub />} />
              <Route path="/study-buddy" element={<Chatbot />} />
              <Route path="/tech-feed" element={<TechFeed />} />
              <Route path="/resume" element={<ResumeBuilder />} />
              <Route path="/placement-prep" element={<PlacementPrep />} />
              <Route path="/profile" element={<UserProfile />} />

              {/* --- NEW DISCUSSION ROUTES --- */}
              <Route
                path="/discussions"
                element={
                  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Discussions</h1>
                    <DiscussionList />
                  </div>
                }
              />
              <Route
                path="/discussions/:id"
                element={
                  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <DiscussionDetail />
                  </div>
                }
              />
              {/* --- END NEW ROUTES --- */}

            </Route>
            
            {/* You can add Admin or other special routes here */}

          </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;