"use client"

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import JobListItem from "@/components/JobListItem";
import { ChevronLeft, ChevronRight, Briefcase, Loader2 } from "lucide-react";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs`);
        const data = await res.json();
        setJobs(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Client fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen w-full text-white">
      <main className="px-4 sm:px-6 py-8 sm:py-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="icon-container">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Available Jobs
            </h1>
          </div>
          <p className="text-foreground-secondary text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover opportunities from top companies worldwide
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <span className="text-foreground-muted">Loading jobs...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {jobs.map((job) => (
                <div key={job.id} className="fade-in">
                  <JobListItem job={job} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-medium text-foreground-secondary">
                    Page
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {page}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-foreground-secondary">
                    of
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {totalPages}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
