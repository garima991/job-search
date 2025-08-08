import  data  from "@/constant/data";
import prismaClient from "@/services/prisma";

export default function page() {

  async function main() {
    'use server'
  // 1. Create users
  const employer = await prismaClient.user.create({
    data: {
      name: "Alice Employer",
      email: "alice@company.com",
      password: "hashedpassword",
      role: "EMPLOYEER",
    },
  });

  const candidate = await prismaClient.user.create({
    data: {
      name: "Bob Candidate",
      email: "bob@user.com",
      password: "hashedpassword",
      role: "CANDIDATE",
    },
  });

  // 2. Create company owned by employer
  const company = await prismaClient.company.create({
    data: {
      name: "OpenAI Inc.",
      description: "We build powerful AI tools.",
      ownerId: employer.id,
    },
  });

  // 3. Create jobs for the company
  const job1 = await prismaClient.job.create({
    data: {
      title: "Frontend Developer",
      description: "Work with React and Tailwind.",
      location: "San Francisco",
      salary: 120000,
      employment_type: "fulltime",
      job_type: "on-site",
      company_id: company.id,
    },
  });

  const job2 = await prismaClient.job.create({
    data: {
      title: "Backend Developer",
      description: "Build robust APIs with Node.js.",
      location: "Remote",
      salary: 110000,
      employment_type: "fulltime",
      job_type: "remote",
      company_id: company.id,
    },
  });

  // 4. Candidate applies to job1
  const application = await prismaClient.application.create({
    data: {
      user_id: candidate.id,
      job_id: job1.id,
    },
  });

  // 5. Candidate writes a review
  const review = await prismaClient.review.create({
    data: {
      content: "Great company to work at!",
      user_id: candidate.id,
      company_id: company.id,
    },
  });

  console.log("🌱 Seed complete!");
}


  return (
    <form action={main}>
       <button className="text-white">Add</button>
    </form>
  );
}