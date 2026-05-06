import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAdmin = token?.role === "ADMIN";

  // Public auth routes
  if (pathname.startsWith("/auth/")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // API auth routes are public
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Protected: Admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login?returnUrl=" + pathname, request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protected: Dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login?returnUrl=" + pathname, request.url));
    }
    return NextResponse.next();
  }

  // Protected: Checkout
  if (pathname === "/checkout" || pathname.startsWith("/checkout/")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login?returnUrl=" + pathname, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/checkout/:path*",
    "/auth/:path*",
  ],
};
