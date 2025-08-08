import DeleteButton from "@/components/DeleteButton";
import PostReviewButton from "@/components/PostReviewButton";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Job } from "@/lib/types";
import { Badge, Box, Button, Text } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"

export default async function CompanyDetailsPage({
  params
}: { params: { id: String } }) {
  const param = await params;
  const id = param.id;
  const user = await getCurrentUser();

  const res = await fetch(`http://localhost:3000/api/company/${id}`);
  const data = await res.json();
  const company = data?.data;
  console.log(data);

  const reviewResponse = await fetch(`http://localhost:3000/api/review/${id}`);
  const reviewData = await reviewResponse.json();
  const reviews = await reviewData.data;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">

      <div className="flex justify-between items-center">
        <Link
          href="/company"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={16} />
          <Text size="2">Back to Jobs</Text>
        </Link>
        <div className="space-x-2">
          {user?.id === company.ownerId && (
            <Link href={`/company/${company.id}/add-job`}>
              <Button variant="soft">
                Post Job
              </Button>
            </Link>
          )}

          {user?.id != company.ownerId && (
            <PostReviewButton/>
          )}

        </div>
      </div>


      <section className="shadow-lg p-6 rounded-lg bg-gray-800">
        <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
        <p className="text-gray-600">{company.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Owner: {company.owner?.name || "Unknown"}
        </p>
      </section>


      <section>
        <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
        {company?.jobs?.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {company?.jobs?.map((job: Job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <li
                  className="border p-4 rounded-md shadow-sm job-card-dark"
                >
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <p className="text-gray-500">{job.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </section>


      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews?.map((review) => (
              <li
                key={review.id}
                className="flex justify-between items-center border p-4 rounded-md shadow-sm"
              >
                <div className = "flex flex-col">
                 <p className="text-gray-400">{review.content}</p>
                 <span className="font-light text-sm text-gray-400">
                    By: {review.user?.name || "Anonymous"}
                  </span>
                </div>
                {user?.id === company.ownerId || user?.id === review.user?.id && (
                  <DeleteButton type = "review" id = {`${review.id}`} redirectTo = "" />
                )}
                
              </li>
            ))}
          </ul>
        )}
      </section>
      {user?.id === company.ownerId && (
        <section>
          <DeleteButton
          type="company"
          id={company.id}
          redirectTo="/company"
        />
        </section>
      )}
    </main>
  );
}