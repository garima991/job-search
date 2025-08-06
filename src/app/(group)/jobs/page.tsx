"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import JobListItem from "@/components/JobListItem";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`/api/jobs?page=${page}`);
        const data = await res.json();
        setJobs(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Client fetch error:", error);
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
    <div className="min-h-screen bg-gray-900 w-full text-white">
   

      <main className="px-6 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-5 py-2 bg-gray-700 rounded-md transition hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-lg font-medium">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-5 py-2 bg-gray-700 rounded-md transition hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
