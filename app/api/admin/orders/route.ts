import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        items: true
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Admin Orders GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
