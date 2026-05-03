import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingData, paymentMethod, totalAmount, orderType, currency } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Verify user session/authentication (we use a generic ID or allow guest checkout)
    // 2. Validate prices against database to prevent tampering
    // 3. Create user if guest, or link to existing
    
    // For this MVP, we create a dummy user if not authenticated, or just use a generic flow.
    // Let's create a generic user for the order since we don't have auth context here.
    let user = await prisma.user.findFirst({ where: { email: shippingData.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: shippingData.email,
          name: shippingData.fullName,
          role: "CUSTOMER",
          phone: `${shippingData.phoneCode}${shippingData.phone}`,
        }
      });
    }

    // Create Order and nested items
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        currency: currency || "USD",
        orderType: orderType || "B2C",
        status: "PENDING",
        items: {
          create: items.map((item: { productId?: string; variantId?: string; quantity: number; price: number }) => ({
            productId: item.productId || "dummy-product-id", // Ensure these map to real products in prod
            variantId: item.variantId || "dummy-variant-id", // Ensure these map to real variants in prod
            quantity: item.quantity,
            price: item.price,
          }))
        },
        payment: {
          create: {
            provider: paymentMethod === "card" ? "STRIPE" : "PAYPAL",
            status: "PENDING",
            amount: totalAmount,
            currency: currency || "USD",
          }
        }
      },
      include: {
        items: true,
        payment: true
      }
    });

    return NextResponse.json({ success: true, orderId: order.id, order });
  } catch (error: unknown) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
