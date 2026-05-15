"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { LogOut, ShoppingBag, List, MessageSquare, LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.push("/admin")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E84118]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">
            Welcome, {session?.user?.name || "User"}!
          </h1>
          <div className="flex gap-4">
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-2 bg-[#E84118]/10 text-[#E84118] hover:bg-[#E84118] hover:text-white px-4 py-2 rounded-lg transition-all border border-[#E84118]/20"
              >
                <LayoutDashboard size={18} />
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/products" 
            className="bg-[#242424] p-8 rounded-xl border border-gray-800 hover:border-[#E84118] transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Browse Products</h2>
            <p className="text-gray-400 text-sm">Explore our latest export collection.</p>
          </Link>

          <Link 
            href="/dashboard/orders" 
            className="bg-[#242424] p-8 rounded-xl border border-gray-800 hover:border-[#E84118] transition-all group"
          >
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <List size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">My Orders</h2>
            <p className="text-gray-400 text-sm">Track and view your order history.</p>
          </Link>

          <Link 
            href="/inquiry" 
            className="bg-[#242424] p-8 rounded-xl border border-gray-800 hover:border-[#E84118] transition-all group"
          >
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Export Inquiry</h2>
            <p className="text-gray-400 text-sm">Send us your custom requirements.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
