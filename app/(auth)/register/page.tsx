"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      router.push("/login")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-[#242424] p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1 text-sm">Full Name</label>
          <input
            type="text"
            required
            className="w-full bg-[#1A1A1A] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#E84118]"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

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
          <label className="block text-gray-400 mb-1 text-sm">Password</label>
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

        <div>
          <label className="block text-gray-400 mb-1 text-sm">Confirm Password</label>
          <input
            type="password"
            required
            className="w-full bg-[#1A1A1A] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#E84118]"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E84118] hover:bg-[#c23616] text-white font-bold py-3 rounded mt-4 transition duration-200 disabled:opacity-50"
        >
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-[#E84118] hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </div>
  )
}
