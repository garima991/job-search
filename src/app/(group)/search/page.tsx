import JobListItem from "@/components/JobListItem";
import { Sidebar } from "@/components/Sidebar";
import { Job } from "@/lib/types";
import { Box, Container, Flex, Text, Heading } from "@radix-ui/themes";

interface SearchParams {
  q?: string;
  ms?: string;
  jt?: string | string[];
  wt?: string;
}

export default async function JobSearchPage({ searchParams }: { searchParams: SearchParams }) {
  const input = searchParams.q || "";
  const minSalary = searchParams.ms ? Number.parseInt(searchParams.ms) : 0;
  const jobTypes = Array.isArray(searchParams.jt)
    ? searchParams.jt
    : searchParams.jt
    ? [searchParams.jt]
    : [];
  const workType = searchParams.wt || "";

  let filteredJobs: Job[] = [];

  try {
    const params = new URLSearchParams();
    if (input) params.set("q", input);
    if (minSalary) params.set("ms", minSalary.toString());
    if (workType) params.set("wt", workType);
jobTypes.forEach((jt) => params.append("jt", jt));

    const res = await fetch(`http://localhost:3000/api/search?${params.toString()}`);
    const data = await res.json();
    filteredJobs = data.data || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <Box className="min-h-screen bg-gray-900 w-full">
      <div className="flex">
        <div className="sticky top-0">
          <Sidebar />
        </div>

        <main className="flex-1 px-6 py-8 overflow-y-auto bg-gray-900">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job: Job) => (
                <JobListItem key={job.id || job.job_id} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Box className="max-w-md mx-auto">
                  <Heading size="4" className="text-gray-400 mb-4">
                    No Jobs Found
                  </Heading>
                  <Text size="3" className="text-gray-500 mb-6">
                    {input
                      ? `We couldn't find any jobs matching "${input}". Try adjusting your search terms or filters.`
                      : "Start by entering a search term to find relevant jobs."}
                  </Text>
                  <div className="space-y-2">
                    <Text size="2" className="text-gray-600">
                      Try searching for:
                    </Text>
                    <Flex gap="2" justify="center" wrap="wrap">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-blue-400 text-sm">
                        Developer
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-blue-400 text-sm">
                        Backend Engineer
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-blue-400 text-sm">
                        Full Stack
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-blue-400 text-sm">
                        Python Developer
                      </span>
                    </Flex>
                  </div>
                </Box>
              </div>
            )}
          </div>
        </main>
      </div>
    </Box>
  );
}
