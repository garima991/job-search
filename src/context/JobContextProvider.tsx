"use client";

import { createContext, useEffect, useState } from "react";

export const JobContext = createContext(null);

export default function JobContextProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState([]);

  // onload get all saved jobs
  useEffect(() => {
    const stored = localStorage.getItem("saved_Jobs");
    if (stored) {
      setSavedJobs(JSON.parse(stored));
    }
  }, []);

  // save jobs when new job is added
  useEffect(() => {
    localStorage.setItem("saved_Jobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  // save job
  const saveJob = (job) => {
    // if (!isSaved(job.job_id)) {
      setSavedJobs((prev) => [...prev, job]);
    // }
  };

  // unsave job
  const unsaveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const isSaved = (jobId) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  return (
    <JobContext.Provider value={{ saveJob, unsaveJob, isSaved, savedJobs }}>
      {children}
    </JobContext.Provider>
  );
}
