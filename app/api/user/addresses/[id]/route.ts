import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/authOptions";

const addressSchema = z.object({
  fullName: z.string().min(1).optional(),
  addressLine1: z.string().min(1).optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  isDefault: z.boolean().optional(),
});

async function getAddressAndVerifyOwner(id: string, userId: string) {
  const address = await prisma.shippingAddress.findUnique({ where: { id } });
  if (!address || address.userId !== userId) return null;
  return address;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const address = await getAddressAndVerifyOwner(params.id, userId);
    if (!address) {
      return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    const body = await request.json();
    const result = addressSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { isDefault, ...rest } = result.data;

    if (isDefault) {
      await prisma.shippingAddress.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    const updated = await prisma.shippingAddress.update({
      where: { id: params.id },
      data: { ...rest, ...(isDefault !== undefined ? { isDefault } : {}) },
    });

    return NextResponse.json({ success: true, address: updated });
  } catch (error) {
    console.error("Update address error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const address = await getAddressAndVerifyOwner(params.id, userId);
    if (!address) {
      return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    await prisma.shippingAddress.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: "Address deleted" });
  } catch (error) {
    console.error("Delete address error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
