import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const param = await params;
  const id = param.id;
  try {
    const job = await prismaClient.job.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      },
    });

    if (job) {
      return NextResponse.json({
        success: true,
        data: job,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Job Found.",
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const param = await params;
    const jobId = param?.id;

    const res = await prismaClient.job.delete({
      where: {
        id: jobId,
      },
    });

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}

