export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/adminGuard";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const inquiry = await prisma.exportInquiry.findUnique({
      where: { id: params.id },
      include: { user: true }
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error: any) {
    console.error("Admin Inquiry GET error:", error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { status } = body;
    // We would update notes here if `notes` existed on the ExportInquiry model. 
    // Since it doesn't currently exist in schema.prisma, we will only update the status.

    const updatedInquiry = await prisma.exportInquiry.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(updatedInquiry);
  } catch (error: any) {
    console.error("Admin Inquiry PATCH error:", error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
