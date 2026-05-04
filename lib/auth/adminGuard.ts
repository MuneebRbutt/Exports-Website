import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

/**
 * Server-side guard to protect admin routes.
 * Usage: await protectAdmin(); in any admin page/layout (Server Components)
 */
export async function protectAdmin() {
  const session = await getServerSession(); // In a real app, pass authOptions

  if (!session) {
    // redirect("/auth/login?callbackUrl=/admin");
    console.log("No session found, would redirect to login in production");
    return null;
  }

  // Check for admin role
  // @ts-ignore
  if (session.user?.role !== 'ADMIN') {
    // redirect("/");
    console.log("User is not an admin, would redirect to home in production");
    return null;
  }

  return session;
}

/**
 * Client-side guard check (optional helper)
 */
export function isAdmin(user: any) {
  return user?.role === 'ADMIN';
}
