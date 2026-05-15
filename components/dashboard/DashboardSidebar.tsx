"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  User,
  MapPin,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface Props {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "My Orders", href: "/dashboard/orders", icon: Package },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
];

export default function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#E84118] tracking-wider font-athletic italic">
            MEHARSTARE
          </h1>
        </Link>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
          My Account
        </p>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-[#E84118] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.name || "Customer"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                active
                  ? "bg-[#E84118] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon
                size={18}
                className={active ? "text-white" : "text-gray-400"}
              />
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 border-t border-gray-100 mt-4 space-y-1">
          <Link
            href="/products"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <ExternalLink size={18} className="text-gray-400" />
            Browse Products
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
