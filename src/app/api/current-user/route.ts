
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  console.log(user);

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not found",
    });
  }
  return NextResponse.json({
    success: true,
    data: user,
  });
}