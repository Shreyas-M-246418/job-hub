import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import Navigation from './components/Navigation';
import LoginPage from './components/LoginPage';
import JobsPage from './components/JobsPage';
import HirePage from './components/HirePage';
import DisplayJobsPage from './components/DisplayJobsPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

// Separate component to use hooks
const AppContent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="app-container">
      <Navigation onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<DisplayJobsPage />} />
        <Route path="/display-jobs" element={<Navigate to="/" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/hire"
          element={
            <PrivateRoute>
              <HirePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

// Main App component with providers
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <AppContent />
        </JobProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;