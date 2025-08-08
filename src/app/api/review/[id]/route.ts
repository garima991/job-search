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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
){
  const { id } = await params;
  try {
    await prismaClient.review.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Review deleted successfully.",
    });
  }
  catch(error){
    console.log(error);
  }
}