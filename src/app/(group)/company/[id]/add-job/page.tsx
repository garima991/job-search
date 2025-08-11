"use client"
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
import { useRouter } from "next/navigation";
import { useState } from "react"
import { ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AddJobPage() {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const {id} = useParams();
    const router = useRouter();

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
      alert("Job added successfully !");
      router.push(`/company/${id}`);
      
    }
  }

    return (
        <div className="min-h-screen bg-black">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400 rounded-full blur-3xl"></div>
            </div>

            <main className="max-w-2xl mx-auto p-4 sm:p-6 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <Link
                        href={`/company/${id}`}
                        className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <Text size="2">Back to Company</Text>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="modern-card p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="icon-container">
                            <Briefcase className="w-6 h-6 text-black" />
                        </div>
                        <Heading size={{ initial: "5", sm: "6" }} className="text-white">
                            Post a New Job
                        </Heading>
                    </div>
                    
                    <Text size="3" className="text-foreground-secondary mb-6 sm:mb-8">
                        Fill out the details below to create a new job listing
                    </Text>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Job Title */}
                        <div>
                            <Text as="label" size="2" weight="bold" className="text-white mb-2 sm:mb-3 block">
                                Job Title
                            </Text>
                            <TextField.Root
                                placeholder="e.g. Senior Frontend Developer"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                size="3"
                                className="modern-input w-full"
                                required
                            />
                        </div>

                        {/* Job Description */}
                        <div>
                            <Text as="label" size="2" weight="bold" className="text-white mb-2 sm:mb-3 block">
                                Job Description
                            </Text>
                            <TextArea
                                placeholder="Describe the role, responsibilities, and requirements..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows={4}
                                className="modern-input w-full"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Text as="label" size="2" weight="bold" className="text-white mb-2 sm:mb-3 block">
                                Location
                            </Text>
                            <TextField.Root
                                placeholder="e.g. San Francisco, CA or Remote"
                                value={jobLocation}
                                onChange={(e) => setJobLocation(e.target.value)}
                                size="3"
                                className="modern-input w-full"
                                required
                            />
                        </div>

                        {/* Salary and Job Type Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <Text as="label" size="2" weight="bold" className="text-white mb-2 sm:mb-3 block">
                                    Salary
                                </Text>
                                <TextField.Root
                                    placeholder="e.g. $3000"
                                    value={jobSalary}
                                    onChange={(e) => setJobSalary(e.target.value)}
                                    size="3"
                                    className="modern-input w-full"
                                    required
                                />
                            </div>

                            <div>
                                <Text as="label" size="2" weight="bold" className="text-white mb-2 sm:mb-3 block">
                                    Job Type
                                </Text>
                                <Select.Root value={jobType} onValueChange={setJobType} required>
                                    <Select.Trigger placeholder="Select job type" className="modern-input w-full" />
                                    <Select.Content>
                                        <Select.Item value="remote">Remote</Select.Item>
                                        <Select.Item value="on-site">On-site</Select.Item>
                                        <Select.Item value="hybrid">Hybrid</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </div>
                        </div>

                        {/* Employment Type */}
                        <div>
                            <Text as="label" size="2" weight="bold" className="text-white mb-2 sm:mb-3 block">
                                Employment Type
                            </Text>
                            <Select.Root value={employmentType} onValueChange={setEmploymentType} required>
                                <Select.Trigger placeholder="Select Employment Type" className="modern-input w-full" />
                                <Select.Content>
                                    <Select.Item value="fulltime">Full Time</Select.Item>
                                    <Select.Item value="parttime">Part Time</Select.Item>
                                    <Select.Item value="internship">Internship</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="btn-primary w-full"
                                size="3"
                            >
                                Post Job
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
} 