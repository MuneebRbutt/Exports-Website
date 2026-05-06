import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/authOptions";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const address = await prisma.shippingAddress.findUnique({ where: { id: params.id } });
    if (!address || address.userId !== userId) {
      return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    // Unset all defaults for this user, then set the target
    await prisma.$transaction([
      prisma.shippingAddress.updateMany({
        where: { userId },
        data: { isDefault: false },
      }),
      prisma.shippingAddress.update({
        where: { id: params.id },
        data: { isDefault: true },
      }),
    ]);

    return NextResponse.json({ success: true, message: "Default address updated" });
  } catch (error) {
    console.error("Set default address error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
