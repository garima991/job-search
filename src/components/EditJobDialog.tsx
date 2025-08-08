'use client';

import {
  Box,
  Button,
  Card,
  Flex,
  Text,
  TextField,
  TextArea,
  Select,
  Heading,
  Separator,
} from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Job } from '@/lib/types';
import { Edit2Icon } from 'lucide-react';

export default function EditJobDialog({ 
  job, 
  companyId, 
  onJobUpdated 
}: {
  job: Job;
  companyId: string;
  onJobUpdated?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const [jobTitle, setJobTitle] = useState(job.title);
  const [jobDescription, setJobDescription] = useState(job.description);
  const [jobLocation, setJobLocation] = useState(job.location);
  const [jobSalary, setJobSalary] = useState(job.salary.toString());
  const [jobType, setJobType] = useState(job.job_type);
  const [employmentType, setEmploymentType] = useState(job.employment_type);

  // Validation function
  const validateForm = () => {
    if (!jobTitle.trim()) return false;
    if (!jobDescription.trim()) return false;
    if (!jobLocation.trim()) return false;
    if (!jobSalary || isNaN(parseFloat(jobSalary)) || parseFloat(jobSalary) <= 0) return false;
    if (!jobType) return false;
    if (!employmentType) return false;
    return true;
  };

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const data = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      employment_type: employmentType,
      salary: parseFloat(jobSalary),
      job_type: jobType,
      company_id: companyId,
    };

    const res = await fetch(`http://localhost:3000/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.success) {
      alert('Job updated successfully!');
      setOpen(false);
      onJobUpdated?.();
    } else {
      alert('Failed to update job.');
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button 
          variant="solid" >
          <Edit2Icon size={16} className="mr-2" />
          Edit Job
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 z-50">
          <Card size="4" className="bg-gray-800 border border-gray-700">
            <Flex direction="column" gap="6">
              <Box>
                <Heading size="6" className="text-white mb-2">
                  Edit Job
                </Heading>
                <Text size="3" className="text-gray-400">
                  Update the details for this job posting
                </Text>
              </Box>

              <Separator className="bg-gray-700" />

              <form onSubmit={handleEdit}>
                <Flex direction="column" gap="4">
                  {/* Job Title */}
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

                  {/* Job Description */}
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

                  {/* Location */}
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

                  {/* Salary & Job Type */}
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

                  {/* Employment Type */}
                  <Box>
                    <Text as="label" size="2" weight="bold" className="text-white mb-2 block">
                      Employment Type
                    </Text>
                    <Select.Root value={employmentType} onValueChange={setEmploymentType}>
                      <Select.Trigger placeholder="Select Employment Type" className="w-full" />
                      <Select.Content>
                        <Select.Item value="remote">Remote</Select.Item>
                        <Select.Item value="onsite">On-site</Select.Item>
                        <Select.Item value="hybrid">Hybrid</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Box>

                  <Separator className="bg-gray-700" />

                  {/* Actions */}
                  <Flex gap="3" justify="end">
                    <Dialog.Close asChild>
                      <Button variant="soft" color="gray" size="3">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button
                      type="submit"
                      variant="solid"
                      size="3"
                      className="px-6 bg-blue-600 hover:bg-blue-700"
                    >
                      Update Job
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Flex>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
