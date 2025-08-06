import { Button, Card, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Badge } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewJobApplications() {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        async function getApplications() {
            const res = await fetch("/api/applicants" + job.id);
            const data = await res.json();

            if (data.success) {
                setApplicants(data?.data)
            }
        }
        getApplications();

    }, [])

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

                {
                    applicants.map((applicant) => {
                        return (
                            <Card key = {applicant.id}>
                                <Badge>{applicant.user.email}</Badge>
                            </Card>
                        )
                    })
                }

               
            </Dialog.Content>
        </Dialog.Root>

    )
}