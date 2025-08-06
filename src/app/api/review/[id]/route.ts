import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const reviews = await prismaClient.review.findMany({
      where: {
        company_id: id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Something went Wrong.",
    });
  }
}