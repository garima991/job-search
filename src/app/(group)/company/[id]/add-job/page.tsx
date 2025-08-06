"use client"

import { UserContext } from "@/app/(group)/layout";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Text,
    TextField,
    TextArea,
    Select,
    Heading,
    Separator
} from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useContext, useState } from "react"

export default function AddJobPage() {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const {id} = useParams();

   async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedSalary = Number.parseFloat(jobSalary);
    const data = {
      title: jobTitle,
      description: jobDescription,
      location:jobLocation,
      employment_type: employmentType,
      salary: parsedSalary,
      job_type: jobType,
      company_id: id
    };
    const res = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.success) {
      alert("Product added in DB!");
    }
    console.log("Submitted:", form);
  }

    return (
        <Box className="min-h-screen bg-gray-900 p-8">
            <Container size="2" className="max-w-2xl mx-auto">
                <Card size="4" className="bg-gray-800 border border-gray-700">
                    <Flex direction="column" gap="6">
                        <Box>
                            <Heading size="6" className="text-white mb-2">
                                Post a New Job
                            </Heading>
                            <Text size="3" className="text-gray-400">
                                Fill out the details below to create a new job listing
                            </Text>
                        </Box>

                        <Separator className="bg-gray-700" />

                        <Flex direction="column" gap="4">
                           
                            <Box>
                                <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                                    Job Title
                                </Text>
                                <TextField.Root
                                    placeholder="e.g. Senior Frontend Developer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    size="3"
                                    className="w-full"
                                />
                            </Box>

                            
                            <Box>
                                <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                                    Job Description
                                </Text>
                                <TextArea
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    rows={4}
                                    className="w-full"
                                />
                            </Box>

                           
                            <Box>
                                <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                                    Location
                                </Text>
                                <TextField.Root
                                    placeholder="e.g. San Francisco, CA or Remote"
                                    value={jobLocation}
                                    onChange={(e) => setJobLocation(e.target.value)}
                                    size="3"
                                    className="w-full"
                                />
                            </Box>

                            
                            <Flex gap="4" className="flex-col sm:flex-row">
                                <Box className="flex-1">
                                    <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                                        Salary
                                    </Text>
                                    <TextField.Root
                                        placeholder="e.g. $300"
                                        value={jobSalary}
                                        onChange={(e) => setJobSalary(e.target.value)}
                                        size="3"
                                        className="w-full"
                                    />
                                </Box>

                                <Box className="flex-1">
                                    <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                                        Job Type
                                    </Text>
                                    <Select.Root value={jobType} onValueChange={setJobType}>
                                        <Select.Trigger placeholder="Select job type" className="w-full" />
                                        <Select.Content>
                                            <Select.Item value="full-time">Full Time</Select.Item>
                                            <Select.Item value="part-time">Part Time</Select.Item>
                                            <Select.Item value="internship">Internship</Select.Item>
                                        </Select.Content>
                                    </Select.Root>
                                </Box>
                            </Flex>


                            
                            <Box>
                                <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                                    Employement Type
                                </Text>
                                <Select.Root value={employmentType} onValueChange={setEmploymentType}>
                                    <Select.Trigger placeholder="Select Employement Type" className="w-full" />
                                    <Select.Content>
                                        <Select.Item value="remote">Remote</Select.Item>
                                        <Select.Item value="onsite">On-site</Select.Item>
                                        <Select.Item value="hybrid">Hybrid</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Box>



                            <Separator className="bg-gray-700" />

                           
                            <Button
                                variant="solid"
                                size="3"
                                className="px-6 bg-blue-600 hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                Post Job
                            </Button>

                        </Flex>
                    </Flex>
                </Card>
            </Container>
        </Box>
    )
} 