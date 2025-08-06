import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse;

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 8;
    const skip = (page - 1) * limit;

  
    const jobs = await prismaClient.job.findMany({
      skip,
      take: limit,
    });

    // total count and calculate total pages
    const totalJobs = await prismaClient.job.count();
    const totalPages = Math.ceil(totalJobs / limit);

    return res.json({
      success: true,
      data: jobs,
      meta: {
        page,
        totalPages,
        totalJobs,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return res.json({ success: false, error: "Failed to fetch jobs" });
  }
}


export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const product = await prismaClient.job.create({
      data: body,
    });
    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}