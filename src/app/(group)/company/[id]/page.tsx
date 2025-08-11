import DeleteButton from "@/components/DeleteButton";
import PostReviewButton from "@/components/PostReviewButton";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Job } from "@/lib/types";
import { Badge, Box, Button, Text, Heading } from "@radix-ui/themes";
import { ArrowLeft, Building2, Briefcase, Star, Users } from "lucide-react";
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
    <div className="min-h-screen bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400 rounded-full blur-3xl"></div>
      </div>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 sm:space-y-10 relative z-10">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/company"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
            <Text size="2">Back to Companies</Text>
          </Link>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {user?.id === company.ownerId && (
              <Link href={`/company/${company.id}/add-job`}>
                <Button className="btn-primary w-full sm:w-auto">
                  Post Job
                </Button>
              </Link>
            )}

            {user?.id != company.ownerId && (
              <PostReviewButton/>
            )}
          </div>
        </div>

        <section className="modern-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-container">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <Heading size={{ initial: "5", sm: "6" }} className="text-white">{company.name}</Heading>
          </div>
          <p className="text-gray-300 mb-4">{company.description}</p>
          <p className="text-sm text-gray-400">
            Owner: {company.owner?.name || "Unknown"}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <Briefcase className="w-5 h-5 text-white" />
            <Heading size={{ initial: "3", sm: "4" }} className="text-white">Jobs</Heading>
          </div>
          {company?.jobs?.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-gray-400">No jobs posted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company?.jobs?.map((job: Job) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <div className="modern-card p-4 cursor-pointer">
                    <h3 className="text-base sm:text-lg font-medium text-white mb-2">{job.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{job.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <Star className="w-5 h-5 text-white" />
            <Heading size={{ initial: "3", sm: "4" }} className="text-white">Reviews</Heading>
          </div>
          {reviews?.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-gray-400">No reviews yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="modern-card p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1">
                      <p className="text-gray-300 mb-2">{review.content}</p>
                      <span className="font-light text-sm text-gray-400">
                        By: {review.user?.name || "Anonymous"}
                      </span>
                    </div>
                    {(user?.id === company.ownerId || user?.id === review.user?.id) && (
                      <DeleteButton type="review" id={`${review.id}`} redirectTo="" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {user?.id === company.ownerId && (
          <section className="text-center">
            <DeleteButton
              type="company"
              id={company.id}
              redirectTo="/company"
            />
          </section>
        )}
      </main>
    </div>
  );
}