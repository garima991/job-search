"use client";

import { createContext, useEffect, useState } from "react";

interface JobContextType {
  saveJob: (job: any) => void;
  unsaveJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  savedJobs: any[];
}

export const JobContext = createContext<JobContextType | null>(null);

export default function JobContextProvider({ children }: { children: React.ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

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
  const saveJob = (job: any) => {
    // if (!isSaved(job.job_id)) {
      setSavedJobs((prev) => [...prev, job]);
    // }
  };

  // unsave job
  const unsaveJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const isSaved = (jobId: string) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  return (
    <JobContext.Provider value={{ saveJob, unsaveJob, isSaved, savedJobs }}>
      {children}
    </JobContext.Provider>
  );
}
