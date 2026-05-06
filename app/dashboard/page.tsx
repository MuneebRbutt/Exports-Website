import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import {
  Package,
  Clock,
  DollarSign,
  ArrowRight,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
  SHIPPED: "bg-orange-100 text-orange-700 border-orange-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const userId = (session.user as any).id;

  // Fetch orders for this user
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      items: {
        include: { product: { select: { name: true } } },
      },
    },
  });

  const allOrders = await prisma.order.findMany({
    where: { userId },
    select: { status: true, totalAmount: true },
  });

  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(
    (o) => o.status === "PENDING" || o.status === "PROCESSING"
  ).length;
  const totalSpent = allOrders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const firstName = session.user.name?.split(" ")[0] || "there";
  const isExportBuyer = (session.user as any).role === "EXPORT_BUYER";

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s a summary of your account activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Package}
          label="Total Orders"
          value={totalOrders.toString()}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={Clock}
          label="Pending Orders"
          value={pendingOrders.toString()}
          color="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          icon={DollarSign}
          label="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-[#E84118] font-medium hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Package size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No orders yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Start shopping to see your orders here.
            </p>
            <Link
              href="/products"
              className="inline-block mt-4 bg-[#E84118] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d13a15] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Order</th>
                  <th className="px-6 py-3 text-left">Items</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Total</th>
                  <th className="px-6 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-700">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          statusColors[order.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink
          href="/products"
          icon={ShoppingBag}
          title="Browse Products"
          description="Explore our full catalog of premium sportswear"
          color="bg-[#E84118]"
        />
        {isExportBuyer ? (
          <QuickLink
            href="/products"
            icon={MessageSquare}
            title="Export Inquiry"
            description="Request a custom quote for bulk orders"
            color="bg-gray-800"
          />
        ) : (
          <QuickLink
            href="/dashboard/profile"
            icon={MessageSquare}
            title="Complete Profile"
            description="Add your company info to unlock B2B pricing"
            color="bg-gray-800"
          />
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:border-[#E84118] hover:shadow-sm transition-all"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white flex-shrink-0`}
      >
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 group-hover:text-[#E84118] transition-colors">
          {title}
        </p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <ArrowRight
        size={18}
        className="text-gray-300 group-hover:text-[#E84118] transition-colors flex-shrink-0"
      />
    </Link>
  );
}
