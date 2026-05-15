import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";
import { prisma } from "@/lib/db";

/**
 * Server-side guard to protect admin routes.
 * Usage: await protectAdmin(); in any admin page/layout (Server Components)
 */
export async function protectAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  // @ts-ignore
  if (session.user?.role !== 'ADMIN') {
    redirect("/");
  }

  return session;
}

/**
 * API route guard to protect admin endpoints.
 * Usage: const session = await requireAdmin(); in any admin API route
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Error("UNAUTHORIZED");
  }

  // Double check against DB for highest security
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (user?.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return session;
}

/**
 * Client-side guard check (optional helper)
 */
export function isAdmin(user: any) {
  return user?.role === 'ADMIN';
}
