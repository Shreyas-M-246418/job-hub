import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    try {
      const savedJobs = localStorage.getItem('jobs');
      return savedJobs ? JSON.parse(savedJobs) : [];
    } catch (error) {
      console.error('Error loading jobs:', error);
      return [];
    }
  });

  const saveJobs = (updatedJobs) => {
    try {
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    } catch (error) {
      console.error('Error saving jobs:', error);
    }
  };

  const addJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updatedJobs = [...jobs, jobWithId];
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
  };

  const updateJob = (jobId, updatedData) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, ...updatedData } : job
    );
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
  };

  const deleteJob = (jobId) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
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

export default JobContext;