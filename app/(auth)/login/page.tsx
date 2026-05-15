"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl
      })

      if (res?.error) {
        setError("Invalid email or password")
      } else {
        // Fetch session to check role
        const sessionRes = await fetch("/api/auth/session")
        const session = await sessionRes.json()
        
        const targetUrl = session?.user?.role === "ADMIN" ? "/admin" : callbackUrl
        router.push(targetUrl)
        router.refresh()
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-[#242424] p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1 text-sm">Email Address</label>
          <input
            type="email"
            required
            className="w-full bg-[#1A1A1A] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#E84118]"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-gray-400 text-sm">Password</label>
            <Link href="/forgot-password" virtual-link="true" className="text-[#E84118] hover:underline text-xs">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#E84118]"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E84118] hover:bg-[#c23616] text-white font-bold py-3 rounded mt-4 transition duration-200 disabled:opacity-50"
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-[#E84118] hover:underline font-medium">
          Create Account
        </Link>
      </div>
    </div>
  )
}
