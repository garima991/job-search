'use client';

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  type: "job" | "company" | "review";
  id: string;
  redirectTo: string;
};

const DeleteButton = ({ type, id, redirectTo }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const endpoint = type === "job"
        ? `/api/jobs/${id}`
        : type === "review"
          ? `/api/review/${id}`
          : `/api/company/${id}`;


      const res = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete ${type}`);
      }

      alert(`${capitalize(type)} deleted successfully`);
      router.push(redirectTo);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}. Please try again.`);
    }
  };

  return (
    <Button
      variant="soft"
      color="red"
      className="hover:bg-red-900"
      onClick={handleDelete}
    >
      Delete {capitalize(type)}
    </Button>
  );
};


function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default DeleteButton;
