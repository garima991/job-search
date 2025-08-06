"use client";

import { JobContext } from "@/context/JobContextProvider";
import { use, useContext } from "react";

const SaveButton = ({job}) => {

   const { saveJob, unsaveJob, isSaved } = useContext(JobContext);
  const saved = isSaved(job);

  const handleSaveClick = () => {
    saved ? unsaveJob(job.id) : saveJob(job.id);
  };

  return (
    <button
      onClick={handleSaveClick}
      className={`text-sm px-4 py-1.5 rounded-md border font-medium transition ${
        saved
          ? "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
          : "bg-green-600 border-green-600 text-white hover:bg-green-700"
      }`}
    >
      {saved ? "Unsave" : "Save"}
    </button>
  );
};

export default SaveButton;
