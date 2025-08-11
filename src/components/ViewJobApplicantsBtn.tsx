'use client';

import { useEffect, useState } from "react";
import { Button, Card, Dialog, Text, Spinner } from "@radix-ui/themes";
import { useParams } from "next/navigation";

export default function ViewJobApplicantsBtn() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await fetch(`http://localhost:3000/api/applicants/${id}`);
        const data = await res.json();
        setApplicants(data?.data || []);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setApplicants([]);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchApplicants();
  }, [id]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2" variant="soft" className="w-full sm:w-auto">View Applicants</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="420px" className="rounded-lg w-[95vw] max-w-[420px]">
        <Dialog.Title className="mb-1">Job Applicants</Dialog.Title>
        <Dialog.Description size="2" className="mb-4 text-[var(--foreground-muted)]">
          People who have applied for this role.
        </Dialog.Description>

        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner size="3" />
          </div>
        ) : applicants.length === 0 ? (
          <Text size="2" color="gray">No applicants yet.</Text>
        ) : (
          <div className="space-y-2">
            {applicants.map((applicant) => (
              <Card
                key={applicant.id}
                className="p-3 rounded-md border text-sm"
                style={{
                  background: "var(--background-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <Text weight="medium">
                  {applicant.user?.name || "Unknown Applicant"}
                </Text>
                <Text as="p" size="1" color="gray">
                  {applicant.user?.email || "No email provided"}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
