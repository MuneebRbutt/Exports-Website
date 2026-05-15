export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });

    if (!user) {
      // Redirect to login with error
      return NextResponse.redirect(
        new URL("/login?verified=false", process.env.NEXTAUTH_URL || "http://localhost:3000")
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    });

    return NextResponse.redirect(
      new URL("/login?verified=true", process.env.NEXTAUTH_URL || "http://localhost:3000")
    );
  } catch (error: any) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(
      new URL("/login?verified=false", process.env.NEXTAUTH_URL || "http://localhost:3000")
    );
  }
}
