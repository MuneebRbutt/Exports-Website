export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/adminGuard";

export async function GET() {
  try {
    await requireAdmin();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLast30Days = new Date();
    startOfLast30Days.setDate(startOfLast30Days.getDate() - 30);

    // 1. Total revenue this month
    const revenueThisMonth = await prisma.order.aggregate({
      where: {
        createdAt: { gte: startOfMonth },
        status: { notIn: ["CANCELLED"] }
      },
      _sum: { totalAmount: true }
    });

    // 2. Total orders this month
    const ordersThisMonth = await prisma.order.count({
      where: { createdAt: { gte: startOfMonth } }
    });

    // 3. New customers this month
    const newCustomers = await prisma.user.count({
      where: { 
        createdAt: { gte: startOfMonth },
        role: "CUSTOMER"
      }
    });

    // 4. Pending inquiries count
    const pendingInquiries = await prisma.exportInquiry.count({
      where: { status: "NEW" }
    });

    // 5. Revenue last 30 days (for chart)
    const ordersLast30Days = await prisma.order.findMany({
      where: {
        createdAt: { gte: startOfLast30Days },
        status: { notIn: ["CANCELLED"] }
      },
      select: { totalAmount: true, createdAt: true }
    });

    // Aggregate revenue by date
    const revenueByDate = ordersLast30Days.reduce((acc: any, order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {});
    
    const revenueChart = Object.keys(revenueByDate).map(date => ({
      date,
      revenue: revenueByDate[date]
    })).sort((a, b) => a.date.localeCompare(b.date));

    // 6. Orders by category (for pie chart)
    // We get order items and group by product category
    const orderItems = await prisma.orderItem.findMany({
      include: {
        product: {
          include: { category: true }
        }
      }
    });

    const categoryCounts = orderItems.reduce((acc: any, item) => {
      const catName = item.product.category.name;
      acc[catName] = (acc[catName] || 0) + item.quantity;
      return acc;
    }, {});

    const ordersByCategory = Object.keys(categoryCounts).map(name => ({
      name,
      value: categoryCounts[name]
    }));

    // 7. Low stock products (stock < 10)
    const lowStockProducts = await prisma.productVariant.findMany({
      where: { stock: { lt: 10 } },
      include: { product: true },
      take: 10
    });

    // 8. Top 5 selling products
    const productSales = orderItems.reduce((acc: any, item) => {
      const pid = item.productId;
      if (!acc[pid]) {
        acc[pid] = {
          id: pid,
          name: item.product.name,
          totalSold: 0,
          revenue: 0
        };
      }
      acc[pid].totalSold += item.quantity;
      acc[pid].revenue += (item.quantity * item.price);
      return acc;
    }, {});

    const topProducts = Object.values(productSales)
      .sort((a: any, b: any) => b.totalSold - a.totalSold)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        revenueThisMonth: revenueThisMonth._sum.totalAmount || 0,
        ordersThisMonth,
        newCustomers,
        pendingInquiries,
        revenueChart,
        ordersByCategory,
        lowStockProducts: lowStockProducts.map(v => ({
          id: v.id,
          productId: v.productId,
          name: v.product.name,
          variant: `${v.color} - ${v.size}`,
          stock: v.stock
        })),
        topProducts
      }
    });

  } catch (error: any) {
    console.error("Stats API Error:", error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
