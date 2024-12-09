import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { JobProvider } from './contexts/JobContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import DisplayJobsPage from './components/DisplayJobsPage';
import LoginPage from './components/LoginPage';
import JobsPage from './components/JobsPage';
import HirePage from './components/HirePage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">
          Job Hub
        </Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/jobs" className="nav-link">
              My Jobs
            </Link>
            <Link to="/hire" className="post-job-button">
              Post a Job
            </Link>
          </>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <div className="app-container">
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/display-jobs" />} />
              <Route path="/display-jobs" element={<DisplayJobsPage />} />
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
        </JobProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;