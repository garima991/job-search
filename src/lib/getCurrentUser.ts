import { cookies } from "next/headers";
import prismaClient from "@/services/prisma";
import { verifyToken } from "@/lib/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("job-user-token")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload?.email) return null;

  const user = await prismaClient.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      companys: true,
    },
  });

  console.log(user);

  return user;
}
