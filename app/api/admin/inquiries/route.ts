import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Fetch inquiries success" });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "Inquiry status updated", data: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
