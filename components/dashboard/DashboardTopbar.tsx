"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, ChevronRight } from "lucide-react";

interface Props {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/orders": "My Orders",
  "/dashboard/profile": "Profile",
  "/dashboard/addresses": "Addresses",
};

export default function DashboardTopbar({ user }: Props) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40">
      {/* Title / breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400 hidden sm:block">Dashboard</span>
        <ChevronRight size={14} className="text-gray-300 hidden sm:block" />
        <span className="font-semibold text-gray-900">{title}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E84118] flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.name?.split(" ")[0] || "Customer"}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
          title="Sign out"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
