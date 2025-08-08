'use client';

import { useState } from "react";
import { Button, Dialog, TextArea } from "@radix-ui/themes";
import { useParams } from "next/navigation";

export default function PostReviewButton() {
  const { id } = useParams();
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false); // control Dialog visibility

  const handleSubmit = async () => {
    if (!reviewText.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: id,
          content: reviewText.trim(),
        }),
      });

      const result = await res.json();

      if (result.success) {
        setReviewText("");
        setOpen(false); // close the modal on success
      } else {
        console.error("Submission failed:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Review submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="outline">Post Review</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Post a Review</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Share your experience about this company or job.
        </Dialog.Description>

        <TextArea
          rows={5}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          className="w-full"
        />

        <div className="mt-4 flex justify-end gap-2">
          <Dialog.Close>
            <Button variant="soft" color="gray">Cancel</Button>
          </Dialog.Close>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !reviewText.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
