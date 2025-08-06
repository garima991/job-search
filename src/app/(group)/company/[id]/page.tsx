import { Badge, Box, Button} from "@radix-ui/themes";
import Link from "next/link"



export default async function Company({
    params
} : {params : {id : String}}) {
    const param = await params;
    const id = param.id;

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
        <Link href="/company">
        <Button variant="soft">
          Go Back
        </Button>
        </Link>
        <div className="space-x-2">
            <Link href={`/company/${company.id}/add-job`}>
          <Button variant="soft">
            Post Job
          </Button>
          </Link>
          <Link href={`/company/${company.id}/post-review`}>
          <Button variant="outline">
            Post Review
          </Button>
          </Link>
        </div>
      </div>

      
      <section>
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
          <ul className="space-y-4">
            {company?.jobs?.map((job: Job) => (
              <li
                key={job.id}
                className="border p-4 rounded-md shadow-sm job-card-dark"
              >
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-gray-500">{job.description}</p>
              </li>
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
                className="border p-4 rounded-md shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {review.user?.name || "Anonymous"}
                  </span>
                </div>
                <p className="text-gray-400">{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}