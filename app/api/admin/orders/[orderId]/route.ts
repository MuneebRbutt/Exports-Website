import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { sendMail, orderShippedTemplate } from "@/lib/mail";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
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
    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
      include: {
        user: true,
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
    console.error("Admin OrderDetail GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
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
    const body = await req.json();
    const { status, trackingNumber, courierName, estimatedDelivery } = body;

    const updateData: any = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (courierName) updateData.courierName = courierName;
    if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery);

    const updatedOrder = await prisma.order.update({
      where: { id: params.orderId },
      data: updateData,
      include: { user: true }
    });

    // Send shipping email if status is SHIPPED
    if (status === "SHIPPED") {
      try {
        const emailText = orderShippedTemplate(
          updatedOrder.user.name || "Customer",
          updatedOrder.orderNumber,
          updatedOrder.trackingNumber || "[Not Provided]",
          updatedOrder.courierName || "Courier Service"
        );
        await sendMail(updatedOrder.user.email, `Your Order is On The Way! 🚚`, emailText);
      } catch (emailError) {
        console.error("Failed to send shipping email:", emailError);
      }
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Admin OrderDetail PATCH error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
