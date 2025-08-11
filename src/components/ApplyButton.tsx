'use client';

import { Button } from "@radix-ui/themes";
import { Send } from "lucide-react";
import { useState } from "react";

interface ApplyButtonProps {
  jobId: string;
  onApply?: () => void;
}

export default function ApplyButton({ jobId, onApply }: ApplyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsApplied(true);
        onApply?.();
      } else {
        console.error("Failed to apply");
      }
    } catch (error) {
      console.error("Error applying:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isApplied) {
    return (
      <Button
        size="3"
        disabled
        className="bg-green-600 text-white flex items-center gap-2"
      >
        Applied ✓
      </Button>
    );
  }

  return (
    <Button
      size="3"
      onClick={handleApply}
      disabled={isLoading}
      className="bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black flex items-center gap-2 disabled:opacity-50"
    >
      {isLoading ? (
        "Applying..."
      ) : (
        <>
          <Send size={16} />
          Apply Now
        </>
      )}
    </Button>
  );
}
