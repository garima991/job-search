"use client";

import { JobContext} from "@/context/JobContextProvider";
import JobListItem from "@/components/JobListItem";
import { useContext } from "react";
import { Bookmark, Heart } from "lucide-react";

export default function SavedJobsPage() {
  const { savedJobs } = useContext(JobContext);

  return (
    <div className="min-h-screen bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative z-10">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-container">
              <Bookmark className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Saved Jobs</h1>
          </div>
          <p className="text-gray-400">Your favorite job opportunities</p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="icon-container w-fit mx-auto mb-4">
              <Heart className="w-12 h-12 text-black" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">No saved jobs yet</h2>
            <p className="text-gray-400 mb-6">Start exploring and save jobs you're interested in</p>
            <a href="/jobs" className="btn-primary">
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {savedJobs.map((job) => (
              <JobListItem key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
