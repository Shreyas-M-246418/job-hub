import React, { createContext, useContext, useState, useEffect } from 'react';
import jobsData from '../data/jobs.json';
import fs from 'fs';
import path from 'path';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(jobsData.jobs);

  const saveJobsToFile = (updatedJobs) => {
    try {
      const filePath = path.join(__dirname, '../data/jobs.json');
      fs.writeFileSync(filePath, JSON.stringify({ jobs: updatedJobs }, null, 2));
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
    saveJobsToFile(updatedJobs);
  };

  const updateJob = (jobId, updatedData) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, ...updatedData } : job
    );
    setJobs(updatedJobs);
    saveJobsToFile(updatedJobs);
  };

  const deleteJob = (jobId) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    saveJobsToFile(updatedJobs);
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