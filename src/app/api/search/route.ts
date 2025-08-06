import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const maximumSalary = searchParams.get('ms') ? Number.parseInt(searchParams.get('ms')) : 20000;

    const jobTypes = searchParams.getAll("jt"); // can be multiple
    const workType = searchParams.get("wt"); // optional

    const data = await prismaClient.job.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive",
            },
            salary: {
                lte: maximumSalary,
            },
            ...(jobTypes.length > 0 && {
                employment_type: {
                    in: jobTypes,
                },
            }),
            ...(workType && workType !== "all" && {
                job_type: workType,
            }),
        },
    });

    console.log(data);


    return NextResponse.json({
        success: true,
        data: data
    })
};