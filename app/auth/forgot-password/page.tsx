"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      // We show success even if the email doesn't exist for security reasons
      setSubmitted(true)
    } catch (err: any) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md bg-[#242424] p-8 rounded-lg shadow-xl text-center">
        <div className="w-16 h-16 bg-[#E84118]/20 text-[#E84118] rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Check your email</h1>
        <p className="text-gray-400 mb-8">
          We've sent a password reset link to <span className="text-white font-medium">{email}</span>.
        </p>
        <Link 
          href="/auth/login" 
          className="inline-flex items-center text-[#E84118] hover:underline font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md bg-[#242424] p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">Forgot Password?</h1>
      <p className="text-gray-400 text-center mb-8">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E84118] hover:bg-[#c23616] text-white font-bold py-3 rounded mt-4 transition duration-200 disabled:opacity-50"
        >
          {loading ? "SENDING..." : "SEND RESET LINK"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link 
          href="/auth/login" 
          className="inline-flex items-center text-gray-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>
      </div>
    </div>
  )
}
