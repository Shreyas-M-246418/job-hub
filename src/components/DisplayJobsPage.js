import React, { useState } from 'react';
import { useJobs } from '../contexts/JobContext';
import JobDetails from './JobDetails';
import '../styles/DisplayJobsPage.css';

const DisplayJobsPage = () => {
  const { jobs } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    userType: [],
    domain: [],
    employmentType: [],
    workType: []
  });

  const domains = [
    'Frontend',
    'Backend',
    'Full Stack',
    'DevOps',
    'Mobile',
    'UI/UX',
    'Data Science',
    'Machine Learning'
  ];

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setSelectedJob(null);
    setShowFullScreen(false);
  };

  const handleFilterChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value
    });
  };

  const handleUserTypeChange = (e) => {
    setFilters({
      ...filters,
      userType: [e.target.value]
    });
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      domain: e.target.checked 
        ? [...prev.domain, value]
        : prev.domain.filter(item => item !== value)
    }));
  };

  const handleClearFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: []
    }));
  };

  const clearFilters = () => {
    setFilters({
      title: '',
      location: '',
      userType: [],
      domain: [],
      employmentType: [],
      workType: []
    });

    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
      input.checked = false;
    });

    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
    checkboxInputs.forEach(input => {
      input.checked = false;
    });
  };

  const handleEmploymentTypeChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      employmentType: e.target.checked 
        ? [...prev.employmentType, value]
        : prev.employmentType.filter(item => item !== value)
    }));
  };

  const handleWorkTypeChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      workType: e.target.checked 
        ? [...prev.workType, value]
        : prev.workType.filter(item => item !== value)
    }));
  };

  const filteredJobs = jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(filters.title.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(filters.title.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(filters.location.toLowerCase());
    const userTypeMatch = filters.userType.length === 0 || 
      filters.userType.includes(job.userType?.toLowerCase());
    const domainMatch = filters.domain.length === 0 ||
      filters.domain.includes(job.domain);
    const employmentTypeMatch = filters.employmentType.length === 0 ||
      filters.employmentType.includes(job.employmentType?.toLowerCase());
    const workTypeMatch = filters.workType.length === 0 ||
      filters.workType.includes(job.workType?.toLowerCase());

    return titleMatch && locationMatch && userTypeMatch && 
           domainMatch && employmentTypeMatch && workTypeMatch;
  });

  return (
    <div className="page-container">
      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, skill, or company"
            value={filters.title}
            onChange={(e) => handleFilterChange(e, 'title')}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => handleFilterChange(e, 'location')}
            className="search-input"
          />
          <div className="filter-group">
            <div className="filter-buttons">
              {['Fresher', 'Professional', 'Student'].map(type => (
                <button
                  key={type}
                  className={`filter-chip ${filters.userType.includes(type.toLowerCase()) ? 'active' : ''}`}
                  onClick={() => handleUserTypeChange({ target: { value: type.toLowerCase() } })}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="domain-filters">
          <h3>Domain</h3>
          <div className="filter-chips">
            {domains.map(domain => (
              <button
                key={domain}
                className={`filter-chip ${filters.domain.includes(domain) ? 'active' : ''}`}
                onClick={() => handleDomainChange({ 
                  target: { 
                    value: domain,
                    checked: !filters.domain.includes(domain)
                  }
                })}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="main-content">
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Employment Type</h3>
            {['Full time', 'Internship', 'Part time'].map(type => (
              <label key={type} className="filter-option">
                <input
                  type="checkbox"
                  value={type.toLowerCase()}
                  checked={filters.employmentType.includes(type.toLowerCase())}
                  onChange={handleEmploymentTypeChange}
                />
                <span className="checkmark"></span>
                <span>{type}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Work Type</h3>
            {['Remote', 'On site', 'Hybrid'].map(type => (
              <label key={type} className="filter-option">
                <input
                  type="checkbox"
                  value={type.toLowerCase()}
                  checked={filters.workType.includes(type.toLowerCase())}
                  onChange={handleWorkTypeChange}
                />
                <span className="checkmark"></span>
                <span>{type}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="jobs-container">
          <div className="jobs-header">
            <div>
              <h1>Available Jobs</h1>
              <p className="results-count">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
              </p>
            </div>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear all filters
            </button>
          </div>

          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="job-card"
                onClick={() => handleJobClick(job)}
              >
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className={`badge ${job.employmentType?.toLowerCase()}`}>
                    {job.employmentType}
                  </span>
                </div>
                <div className="company-info">
                  <span className="company-name">{job.companyName}</span>
                  <span className="location">{job.location}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-tags">
                  <span className="tag work-type">{job.workType}</span>
                  <span className="tag domain">{job.domain}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      {showFullScreen && selectedJob && (
        <JobDetails job={selectedJob} onClose={handleCloseFullScreen} />
      )}
    </div>
  );
};

export default DisplayJobsPage;