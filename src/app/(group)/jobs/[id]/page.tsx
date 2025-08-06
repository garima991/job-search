import { getCurrentUser } from "@/lib/getCurrentUser";
import { Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import { Box, Briefcase, Globe, Heading, Link, MapPin, Wallet } from "lucide-react";

export default async function JobDetailPage({params} : {params: {id : string}}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const isCandidate = user?.role === "CANDIDATE";

    const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
    const data = await response.json();
    const job = data.data;

    console.log(job);

  return (
    <Box>
      <Card size="3" variant="surface">

        <Flex align="center" justify="between" mb="4">
          <Flex align="center" gap="3">
            <Box>
              <Heading size="4">{job.title}</Heading>
              <Link href={`/company/${job.company.id}`}>
                <Text size="2" color="blue">
                  {job.company.name}
                </Text>
              </Link>
            </Box>
          </Flex>

          {isCandidate && (
            <Button size="2" variant="solid">
              Apply Now
            </Button>
          )}
        </Flex>

        <Separator mb="4" />


        <Flex direction="column" gap="3" mb="4">
          <Flex gap="2" align="center">
            <MapPin size={16} />
            <Text>{job.location}</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Wallet size={16} />
            <Text>$ {job.salary.toLocaleString()} / year</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Briefcase size={16} />
            <Text>{job.employment_type}</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Globe size={16} />
            <Text>{job.job_type}</Text>
          </Flex>
        </Flex>

        <Separator mb="4" />


        <Box>
          <Heading size="3" className="mb-3">Job Description</Heading>
          <Text as="p" size="2" color="gray">
            {job.description}
          </Text>
        </Box>



        {isCandidate && (
          <Box className="mt-6">
            <Button size="3" variant="solid" >
              Apply for this job
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}