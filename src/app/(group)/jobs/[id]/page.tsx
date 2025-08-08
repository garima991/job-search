import { getCurrentUser } from "@/lib/getCurrentUser";
import { Box, Button, Card, Flex, Heading, Separator, Text, Badge } from "@radix-ui/themes";
import { Briefcase, Globe, MapPin, Save, SaveIcon, Wallet, ArrowLeft, Clock, Building } from "lucide-react";
import Link from "next/link";
import ViewJobApplicantsBtn from "@/components/ViewJobApplicantsBtn";
import ApplyButton from "@/components/ApplyButton";
import SaveButton from "@/components/SaveButton";
import { Metadata } from "next";
import DeleteButton from "@/components/DeleteButton";
import EditJobDialog from "@/components/EditJobDialog"


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
    if (!response.ok) throw new Error("Failed to fetch job data");
    const data = await response.json();
    const job = data.data;

    return {
      title: `${job.title} at ${job.company.name} | JobSearch`,
      description: `${job.title} position at ${job.company.name} in ${job.location}. ${job.description.substring(0, 150)}...`,
    };
  } catch (error) {
    return {
      title: "Job Details | JobSearch",
      description: "View detailed information about this job opportunity",
    };
  }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const isCandidate = user?.role === "CANDIDATE";

  let job;
  try {
    const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
    if (!response.ok) throw new Error("Failed to fetch job data");
    const data = await response.json();
    job = data.data;
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-screen bg-gray-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Text color="red" size="4">Failed to load job data.</Text>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900 px-4 py-6 sm:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 lg:mb-8"
        >
          <ArrowLeft size={16} />
          <Text size="2">Back to Jobs</Text>
        </Link>

        <Card size="3" className="bg-gray-800 border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <Heading size="6" className="text-white mb-3 leading-tight lg:text-4xl">
                {job?.title}
              </Heading>
              <Link href={`/company/${job?.company.id}`}>
                <Text size="4" color="blue" className="hover:underline flex items-center gap-2 mb-4">
                  <Building size={18} />
                  {job?.company.name}
                </Text>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="soft" color="green" className="px-3 py-1">
                  {job?.employment_type}
                </Badge>
                <Badge variant="soft" color="blue" className="px-3 py-1">
                  {job?.job_type}
                </Badge>
              </div>


            </div>

            {isCandidate && (
              <div className="flex flex-col sm:flex-row gap-3 lg:min-w-fit lg:flex-col xl:flex-row">
                <ApplyButton jobId={job.id} />
                <SaveButton jobId={job.id} title={job.title} companyName={job.company.name} />
              </div>

            )}
          </div>

          <Separator className="my-6 border-gray-600" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={18} className="text-blue-400" />
                <Text size="3">{job?.location}</Text>
              </div>

              {job?.salary && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Wallet size={18} className="text-green-400" />
                  <Text size="3" weight="medium" className="text-green-400">
                    ${job?.salary.toLocaleString()} / year
                  </Text>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Briefcase size={18} className="text-purple-400" />
                <Text size="3">{job?.employment_type}</Text>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Globe size={18} className="text-indigo-400" />
                <Text size="3">{job?.job_type}</Text>
              </div>
            </div>
          </div>

          <Separator className="my-6 border-gray-600" />


          <div className="mb-8">
            <Heading size="4" className="text-white mb-4 flex items-center gap-2">
              <Briefcase size={20} />
              About this role
            </Heading>
            <div className="prose prose-invert max-w-none">
              <Text as="p" size="3" className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {job?.description}
              </Text>
            </div>
          </div>


          <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <Heading size="4" className="text-white mb-3">About {job?.company.name}</Heading>
            <Link
              href={`/company/${job?.company.id}`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Globe size={16} />
              View company profile
            </Link>
          </div>


          {!isCandidate && (
            <div className="flex flex-col items-center sm:flex-row gap-4 pt-6 border-t border-gray-600">
              <div className="flex flex-wrap gap-4">
                <EditJobDialog job={job} companyId={job.companyId} />
                <DeleteButton
                  type="job"
                  id={job.id}
                  redirectTo={`/company/${job.company.id}`}
                />
                <ViewJobApplicantsBtn/>
              </div>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
}
