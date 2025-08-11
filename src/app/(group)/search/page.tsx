import JobListItem from "@/components/JobListItem";
import { Sidebar } from "@/components/Sidebar";
import { Job } from "@/lib/types";
import { Box, Container, Flex, Text, Heading } from "@radix-ui/themes";
import { Search, MapPin, Building2, Sparkles } from "lucide-react";

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
    <Box className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:sticky lg:top-0 h-fit w-full lg:w-auto">
          <Sidebar />
        </div>

        <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
          {/* Search Results Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container">
                <Search className="w-5 h-5 text-black" />
              </div>
              <Heading size={{ initial: "4", sm: "5" }} className="text-white">
                Search Results
              </Heading>
              {filteredJobs.length > 0 && (
                <span className="modern-badge">
                  {filteredJobs.length} jobs found
                </span>
              )}
            </div>
            {input && (
              <p className="text-foreground-secondary">
                Showing results for: <span className="text-white font-medium">"{input}"</span>
              </p>
            )}
          </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job: Job, index: number) => (
                <div key={job.id || job.job_id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <JobListItem job={job} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 sm:py-20">
                <Box className="max-w-md mx-auto px-4">
                  <Heading size={{ initial: "3", sm: "4" }} className="text-white mb-4 sm:mb-6">
                    No Jobs Found
                  </Heading>
                  <Text size={{ initial: "2", sm: "3" }} className="text-foreground-secondary mb-6 sm:mb-8 leading-relaxed">
                    {input
                      ? `We couldn't find any jobs matching "${input}". Try adjusting your search terms or filters.`
                      : "Start by entering a search term to find relevant jobs."}
                  </Text>
                  <div className="space-y-4">
                    <Text size="2" className="text-foreground-muted">
                      Popular searches:
                    </Text>
                    <Flex gap="3" justify="center" wrap="wrap">
                      {["Developer", "Backend Engineer", "Python Developer"].map((term) => (
                        <span 
                          key={term}
                          className="px-2 py-2 bg-background-secondary hover:bg-background-tertiary rounded-lg text-white text-sm font-medium cursor-pointer transition-all duration-300"
                        >
                          {term}
                        </span>
                      ))}
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
