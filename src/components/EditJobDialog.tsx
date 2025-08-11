'use client';

import {
  Box,
  Flex,
  Text,
  TextField,
  TextArea,
  Select,
  Heading,
  Separator,
  Button,
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

    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
        <Button className="btn-primary inline-flex items-center gap-2">
          <Edit2Icon size={16} />
          Edit Job
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 z-50 fade-in">
          <div className="modern-card glass p-4 sm:p-6 lg:p-8 m-2">
            <Flex direction="column" gap="4 sm:gap-6">
              {/* Header */}
              <Box>
                <Heading size={{ initial: "4", sm: "5", lg: "6" }} className="gradient-text mb-2 font-bold">
                  Edit Job Posting
                </Heading>
                <Text size={{ initial: "1", sm: "2" }} className="text-[var(--foreground-muted)] py-2">
                  Update the details for this job posting
                </Text>
              </Box>

              <Separator className="bg-[var(--border)]" />

              {/* Form Content */}
              <form onSubmit={handleEdit}>
                <Flex direction="column" gap="8 sm:gap-12" className='mt-4'>
                  {/* Job Title */}
                  <Box>
                    <Text as="label" size="2" weight="bold" className="text-[var(--foreground)] mb-2 sm:mb-3 block">
                      Job Title *
                    </Text>
                    <input
                      type="text"
                      placeholder="e.g. Senior Frontend Developer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="modern-input w-full"
                    />
                  </Box>

                  {/* Job Description */}
                  <Box>
                    <Text as="label" size="2" weight="bold" className="text-[var(--foreground)] my-2 sm:my-3 block">
                      Job Description *
                    </Text>
                    <textarea
                      placeholder="Describe the role, responsibilities, and requirements..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={5}
                      className="modern-input w-full resize-vertical"
                    />
                  </Box>

                  {/* Location and Salary Row */}
                  <Flex gap="4 sm:gap-6" className="flex-col lg:flex-row mt-3">
                    <Box className="flex-1">
                      <Text as="label" size="2" weight="bold" className="text-[var(--foreground)] mb-2 sm:mb-3 block">
                        Location *
                      </Text>
                      <input
                        type="text"
                        placeholder="e.g. San Francisco, CA or Remote"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        className="modern-input w-full"
                      />
                    </Box>
                    
                    <Box className="flex-1">
                      <Text as="label" size="2" weight="bold" className="text-[var(--foreground)] mb-2 sm:mb-3 block">
                        Salary (USD) *
                      </Text>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 75000"
                          value={jobSalary}
                          onChange={(e) => setJobSalary(e.target.value)}
                          className="modern-input w-full pl-10"
                        />
                      </div>
                    </Box>
                  </Flex>

                  {/* Job Type and Employment Type Row */}
                  <Flex gap="4 sm:gap-6" className="flex-col lg:flex-row my-3">
                    <Box className="flex flex-col w-full lg:w-1/2">
                      <Text as="label" size="2" weight="bold" className="text-[var(--foreground)] mb-2 sm:mb-3 block">
                        Job Type *
                      </Text>
                      <Select.Root value={jobType} onValueChange={setJobType}>
                        <Select.Trigger className="modern-input" />
                        <Select.Content
                          position="popper"
                          className="z-[60] bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg"
                        >
                          <Select.Item value="full-time" className="hover:bg-[var(--card-hover)] cursor-pointer text-[var(--foreground)]">Full Time</Select.Item>
                          <Select.Item value="part-time" className="hover:bg-[var(--card-hover)] cursor-pointer text-[var(--foreground)]">Part Time</Select.Item>
                          <Select.Item value="internship" className="hover:bg-[var(--card-hover)] cursor-pointer text-[var(--foreground)]">Internship</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>
                    
                    <Box className="flex-1">
                      <Text as="label" size="2" weight="bold" className="text-[var(--foreground)] mb-2 sm:mb-3 block">
                        Employment Type *
                      </Text>
                      <Select.Root value={employmentType} onValueChange={setEmploymentType}>
                        <Select.Trigger className="modern-input w-full" />
                        <Select.Content
                          position="popper"
                          className="z-[60] bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg"
                        >
                          <Select.Item value="remote" className="hover:bg-[var(--card-hover)] cursor-pointer text-[var(--foreground)]">Remote</Select.Item>
                          <Select.Item value="onsite" className="hover:bg-[var(--card-hover)] cursor-pointer text-[var(--foreground)]">On-site</Select.Item>
                          <Select.Item value="hybrid" className="hover:bg-[var(--card-hover)] cursor-pointer text-[var(--foreground)]">Hybrid</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>
                  </Flex>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-[var(--border)]">
                    <button
                      type="button"
                      className="btn-secondary w-full sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                  </div>
                </Flex>
              </form>
            </Flex>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
