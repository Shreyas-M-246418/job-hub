import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navigation.css';

const Navigation = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">JobHub</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/jobs" className="nav-link">Dashboard</Link>
            <button onClick={onLogout} className="login-button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 