import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { shippingAddress, items } = await req.json();

    if (!shippingAddress) {
      return NextResponse.json({ error: "Shipping address is required" }, { status: 400 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate stock and calculate total
    let totalAmount = 0;
    const itemsToProcess = [];

    for (const item of items) {
      console.log("Processing item:", item.name, "ID:", item.id, "VariantID:", item.variantId, "ProductID:", item.productId);

      // 1. Try to find by explicit ID or variantId in ProductVariant table
      let variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId || item.id },
        include: { product: true }
      });

      // 2. Fallback: Try to find by Product ID + Size + Color
      if (!variant) {
        const pId = item.productId || (item.id.length > 20 ? item.id : null); // If id looks like a UUID, it might be productId
        
        if (pId) {
          variant = await prisma.productVariant.findFirst({
            where: {
              productId: pId,
              size: item.size || "L",
              color: item.color || "Black"
            },
            include: { product: true }
          });
        }
      }

      // 3. Last Resort: Try to find by Product Name + Size + Color
      if (!variant) {
        variant = await prisma.productVariant.findFirst({
          where: {
            product: {
              name: {
                contains: item.name,
                mode: 'insensitive'
              }
            },
            size: item.size || "L",
            color: item.color || "Black"
          },
          include: { product: true }
        });
      }

      if (!variant) {
        return NextResponse.json({ 
          error: `Product variant not found: ${item.name} (${item.size || 'L'}/${item.color || 'Black'})` 
        }, { status: 404 });
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.product.name}` },
          { status: 400 }
        );
      }

      totalAmount += variant.price * item.quantity;
      itemsToProcess.push({
        productId: variant.productId,
        variantId: variant.id,
        quantity: item.quantity,
        price: variant.price
      });
    }

    // Generate order number: MHS-[YEAR]-[5 digits]
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `MHS-${year}-${randomDigits}`;

    // Create order within a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          totalAmount,
          shippingAddress,
          status: "PENDING",
          paymentMethod: "CASH_ON_DELIVERY",
          paymentStatus: "PENDING",
        },
      });

      // 2. Create order items and deduct stock
      for (const item of itemsToProcess) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          },
        });

        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });

    return NextResponse.json({
      orderId: result.id,
      orderNumber: result.orderNumber,
    });
  } catch (error) {
    console.error("Order POST error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
