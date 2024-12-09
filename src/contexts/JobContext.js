import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const addJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setJobs(prevJobs => {
      const updatedJobs = [...prevJobs, jobWithId];
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      return updatedJobs;
    });
  };

  const updateJob = (jobId, updatedData) => {
    setJobs(prevJobs => {
      const updatedJobs = prevJobs.map(job => 
        job.id === jobId ? { ...job, ...updatedData } : job
      );
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      return updatedJobs;
    });
  };

  const deleteJob = (jobId) => {
    setJobs(prevJobs => {
      const updatedJobs = prevJobs.filter(job => job.id !== jobId);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      return updatedJobs;
    });
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};