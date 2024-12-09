import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/JobsPage.css';

const JobsPage = () => {
  const { jobs } = useJobs();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/display-jobs');
  };

  const handleCreateJob = () => {
    navigate('/hire');
  };

  const myJobs = jobs.filter(job => job.createdBy === user?.email);

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="user-info">
          <h2>Welcome, {user?.name || 'User'}</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <button onClick={handleCreateJob} className="create-job-button">
          Create New Job
        </button>
      </div>

      <div className="my-jobs-section">
        <h3>My Job Postings</h3>
        {myJobs.length === 0 ? (
          <div className="no-jobs">
            <p>You haven't posted any jobs yet.</p>
            <button onClick={handleCreateJob} className="create-first-job">
              Create Your First Job Posting
            </button>
          </div>
        ) : (
          <div className="jobs-grid">
            {myJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <h4>{job.title}</h4>
                  <span className="company-name">{job.companyName}</span>
                </div>
                <div className="job-card-body">
                  <p>{job.description}</p>
                  <div className="job-meta">
                    <span>{job.location}</span>
                    <span>{job.employmentType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;