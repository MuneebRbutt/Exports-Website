export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/adminGuard';

export async function GET() {
  try {
    await requireAdmin();

    const inquiries = await prisma.exportInquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    console.error("Failed to fetch inquiries:", error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
