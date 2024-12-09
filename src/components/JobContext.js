import React, { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setJobs(prev => [...prev, newJob]);
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext); 