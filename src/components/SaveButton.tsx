'use client';

import { useContext } from "react";
import { Button } from "@radix-ui/themes";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { JobContext } from "@/context/JobContextProvider";

type SaveButtonProps = {
  jobId: string;
  title: string;
  companyName: string;
};

const SaveButton = ({ jobId, title, companyName }: SaveButtonProps) => {
  const context = useContext(JobContext);

  if (!context) {
    return (
      <Button
        variant="soft"
      >
        <Bookmark/>
        Save
      </Button>
    );
  }

  const { saveJob, unsaveJob, isSaved } = context;
  const saved = isSaved(jobId);

  const handleSaveClick = () => {
    if (saved) {
      unsaveJob(jobId);
    } else {
      saveJob({ id: jobId, title, company: { name: companyName } });
    }
  };

  return (
    <Button
      onClick={handleSaveClick}
      variant="soft"
      className={`flex items-center gap-2 transition ${
        saved
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "Saved" : "Save"}
    </Button>
  );
};

export default SaveButton;
