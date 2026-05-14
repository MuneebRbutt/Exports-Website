import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const inquiries = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ message: "Inquiry status updated", data: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
