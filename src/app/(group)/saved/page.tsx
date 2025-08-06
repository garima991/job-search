"use client";

import { JobContext} from "@/context/JobContextProvider";
import JobListItem from "@/components/JobListItem";
import { useContext } from "react";

export default function SavedJobsPage() {
  const { savedJobs } = useContext(JobContext);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
