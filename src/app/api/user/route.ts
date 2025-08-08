
import { getCurrentUser } from "@/lib/getCurrentUser";
import prismaClient from "@/services/prisma";
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

  console.log(user);
  return NextResponse.json({
    success: true,
    data: user,
  });
}


export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' });
    }

    const { role } = await req.json();

    if (!role) {
      return NextResponse.json({ success: false, message: 'Role is required' });
    }

    await prismaClient.user.update({
      where: { email: user?.email },
      data: { role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' });
  }
}