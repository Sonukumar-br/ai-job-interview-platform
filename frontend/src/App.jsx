import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InterviewPage from './pages/InterviewPage';
import InterviewHistoryPage from './pages/InterviewHistoryPage';
import InterviewDetailPage from './pages/InterviewDetailPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import JobMatcherPage from './pages/JobMatcherPage';

// Layout wrapper for authenticated pages
const AuthenticatedLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-layout">
        <Navbar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route path="/history" element={<InterviewHistoryPage />} />
              <Route path="/history/:id" element={<InterviewDetailPage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/job-matcher" element={<JobMatcherPage />} />
              <Route path="/resume" element={<Navigate to="/resume-analyzer" replace />} />
            </Route>
          </Route>

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
