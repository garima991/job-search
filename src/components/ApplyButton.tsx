'use client';

import { SendIcon } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/(group)/layout';

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const [isApplied, setIsApplied] = useState(false);
  const { user } = useContext(UserContext);


  useEffect(() => {
    if (user && user.applications) {
      console.log(user.applications)
      const hasApplied = user.applications.some((application) => application.job_id === jobId)
      setIsApplied(hasApplied);
    }
  }, [user, jobId]);

  const handleSubmit = async () => {
    if (isApplied) return;

    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        alert("Applied Successfully");
        setIsApplied(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting application.");
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isApplied}
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-50"
    >
      <SendIcon size={16} />
      {isApplied ? "Applied" : "Apply Now"}
    </Button>
  );
};

export default ApplyButton;
