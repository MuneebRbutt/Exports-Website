export const dynamic = 'force-dynamic';
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
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
                variant: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(user?.cart || { items: [] });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId, variantId, quantity } = await req.json();

    if (!productId || !variantId || !quantity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check stock
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!variant || variant.stock < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let cart = user.cart;
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    // Check if item exists
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId,
      },
    });

    if (existingItem) {
      // Increment quantity
      const newQuantity = existingItem.quantity + quantity;
      if (variant.stock < newQuantity) {
        return NextResponse.json({ error: "Insufficient stock for update" }, { status: 400 });
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
