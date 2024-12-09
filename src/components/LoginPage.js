import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGithub } from 'react-icons/fa';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    const success = await login();
    if (success) {
      navigate('/jobs');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to JobHub</h1>
        <p className="login-subtitle">Sign in to access your account</p>
        
        <button onClick={handleGithubLogin} className="github-login-btn">
          <FaGithub className="github-icon" />
          Continue with GitHub
        </button>

        <div className="login-info">
          <p>Access your personalized job dashboard</p>
          <p>Create and manage job postings</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;