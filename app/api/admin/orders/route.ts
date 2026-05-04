import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Fetch orders success" });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "Order updated success", data: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
