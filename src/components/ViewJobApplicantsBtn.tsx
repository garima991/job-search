'use client';

import { useEffect, useState } from "react";
import { Button, Card, Dialog, Text } from "@radix-ui/themes";
import { useParams } from "next/navigation";

export default function ViewJobApplicantsBtn() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
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

    if (id) {
      fetchApplicants();
    }
  }, [id]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Applicants</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Job Applicants</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Check people who have applied for the job.
        </Dialog.Description>

        {loading ? (
          <Text>Loading...</Text>
        ) : applicants.length === 0 ? (
          <Text>No applicants yet.</Text>
        ) : (
          applicants.map((applicant: any) => (
            <Card key={applicant.id} className="mb-2">
              <Text>{applicant.user?.email || "Unknown applicant"}</Text>
            </Card>
          ))
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
