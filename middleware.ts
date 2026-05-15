import { withAuth } from "next-auth/middleware" 
import { NextResponse } from "next/server" 
 
export default withAuth( 
  function middleware(req) { 
    const token = req.nextauth.token 
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") 
    
    if (isAdminRoute && token?.role !== "ADMIN") { 
      return NextResponse.redirect( 
        new URL("/login", req.url) 
      ) 
    } 
    return NextResponse.next() 
  }, 
  { 
    callbacks: { 
      authorized: ({ token, req }) => { 
        const protectedRoutes = [ 
          "/dashboard", 
          "/checkout", 
          "/admin" 
        ] 
        const isProtected = protectedRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        ) 
        if (isProtected) return !!token 
        return true 
      } 
    } 
  } 
) 
 
export const config = { 
  matcher: [ 
    "/dashboard/:path*", 
    "/admin/:path*", 
    "/checkout/:path*" 
  ] 
} 
