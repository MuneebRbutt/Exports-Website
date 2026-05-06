import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";

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
 * Client-side guard check (optional helper)
 */
export function isAdmin(user: any) {
  return user?.role === 'ADMIN';
}
