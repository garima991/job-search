import { getCurrentUser } from "@/lib/getCurrentUser";
import { Card, Heading, Separator, Text, Badge } from "@radix-ui/themes";
import { Briefcase, Globe, MapPin, Wallet, ArrowLeft, Clock, Building } from "lucide-react";
import Link from "next/link";
import ViewJobApplicantsBtn from "@/components/ViewJobApplicantsBtn";
import ApplyButton from "@/components/ApplyButton";
import SaveButton from "@/components/SaveButton";
import { Metadata } from "next";
import DeleteButton from "@/components/DeleteButton";
import EditJobDialog from "@/components/EditJobDialog";

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
  } catch {
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
  } catch {
    return (
      <div className="min-h-screen px-4 py-8" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <Text color="red" size="4">Failed to load job data.</Text>
        </div>
      </div>
    );
  }

  return (
<div className="min-h-screen px-4 py-6" style={{ background: "var(--background)" }}>
  <div className="max-w-4xl mx-auto fade-in">

    {/* Back Navigation */}
    <Link
      href="/jobs"
      className="inline-flex items-center gap-2 mb-6 group text-sm"
      style={{ color: "var(--foreground-muted)" }}
    >
      <div
        className="rounded-md p-1.5 border transition-colors group-hover:bg-[var(--background-hover)]"
        style={{
          background: "var(--background-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <ArrowLeft size={14} />
      </div>
      <span className="group-hover:underline">Back to Jobs</span>
    </Link>

    {/* Main Card */}
    <Card size="3" className="modern-card p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-5 mb-6">
        <div className="flex-1">
          <Heading size={{ initial: "5", sm: "6" }} className="mb-2 leading-snug" style={{ color: "var(--foreground)" }}>
            {job?.title}
          </Heading>


          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {[job?.employment_type, job?.job_type].map((badge, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-[var(--background-secondary)]"
                style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Candidate Buttons */}
        {isCandidate && (
          <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
            <ApplyButton jobId={job.id} />
            <SaveButton jobId={job.id} title={job.title} companyName={job.company.name} />
          </div>
        )}
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
        {[
          { icon: MapPin, label: "Location", value: job?.location },
          job?.salary && { icon: Wallet, label: "Salary", value: `$${job.salary.toLocaleString()} / year` },
          { icon: Clock, label: "Employment Type", value: job?.employment_type },
          { icon: Globe, label: "Job Type", value: job?.job_type },
        ]
          .filter(Boolean)
          .map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-md border"
              style={{
                background: "var(--background-secondary)",
                borderColor: "var(--border)",
              }}
            >
              <item.icon size={16} className="text-[var(--foreground-muted)]" />
              <div>
                <Text size="1" className="text-[var(--foreground-muted)]">{item.label}</Text>
                <Text size="2" className="font-medium" style={{ color: "var(--foreground)" }}>
                  {item.value}
                </Text>
              </div>
            </div>
          ))}
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <Heading size={{ initial: "3", sm: "4" }} className="mb-2 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
          <Briefcase size={18} /> About this role
        </Heading>
        <Text as="p" size="2" className="leading-relaxed whitespace-pre-wrap" style={{ color: "var(--foreground-secondary)" }}>
          {job?.description}
        </Text>
      </div>

      {/* About Company */}
      <div className="mb-6 p-4 rounded-md border" style={{ background: "var(--background-secondary)", borderColor: "var(--border)" }}>
        <Heading size={{ initial: "3", sm: "4" }} className="mb-2" style={{ color: "var(--foreground)" }}>
          About {job?.company.name}
        </Heading>
        <Link
          href={`/company/${job?.company.id}`}
          className="inline-flex items-center gap-1 text-sm hover:underline"
          style={{ color: "var(--foreground-muted)" }}
        >
          <Globe size={14} /> View company profile
        </Link>
      </div>

      {/* Company Actions */}
      {!isCandidate && (
        <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <EditJobDialog job={job} companyId={job.companyId} />
          <DeleteButton type="job" id={job.id} redirectTo={`/company/${job.company.id}`} />
          <ViewJobApplicantsBtn />
        </div>
      )}
    </Card>
  </div>
</div>


  );
}
