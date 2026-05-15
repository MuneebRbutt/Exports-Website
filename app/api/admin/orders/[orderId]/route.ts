export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/adminGuard";
import { sendMail, orderShippedTemplate } from "@/lib/mail";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    await requireAdmin();

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
  } catch (error: any) {
    console.error("Admin OrderDetail GET error:", error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    await requireAdmin();
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
  } catch (error: any) {
    console.error("Admin OrderDetail PATCH error:", error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
