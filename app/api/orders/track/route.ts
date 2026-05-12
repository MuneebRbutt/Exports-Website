import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber");
    const email = searchParams.get("email");

    if (!orderNumber || !email) {
      return NextResponse.json({ error: "Order number and email are required" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: orderNumber,
        user: {
          email: email
        }
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Tracking GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
