import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const query = searchParams.get("q") || '';
    const jobTypes = searchParams.getAll("jt");
    const employmentType = searchParams.get("et");
    const maxSalary = parseInt(searchParams.get("ms") || "0");

    const filters: any = {
      AND: [],
    };


    if (query.trim()) {
      filters.AND.push({
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    if (jobTypes.length > 0) {
      filters.AND.push({
        job_type: {
          in: jobTypes,
        },
      });
    }

    if (employmentType && employmentType !== "all") {
      filters.AND.push({
        employment_type: employmentType,
      });
    }

  
    if (maxSalary) {
      filters.AND.push({
        salary: {
          lte: maxSalary,
        },
      });
    }

    const jobs = await prismaClient.job.findMany({
      where: filters.AND.length > 0 ? filters : undefined,
    });

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
