"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Globe, Phone, Building2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

function getPasswordStrength(password: string): { label: string; color: string; width: number } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Too Short", color: "bg-neutral-600", width: 0 },
    { label: "Weak", color: "bg-red-500", width: 25 },
    { label: "Fair", color: "bg-orange-400", width: 50 },
    { label: "Strong", color: "bg-yellow-400", width: 75 },
    { label: "Very Strong", color: "bg-green-500", width: 100 },
  ];
  return levels[score];
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    country: "",
    phone: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        if (!value) return "Full name is required";
        if (value.length < 2) return "Must be at least 2 characters";
        if (value.length > 50) return "Must be at most 50 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        return "";
      case "country":
        if (!value) return "Country is required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Must be at least 8 characters";
        if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter";
        if (!/[0-9]/.test(value)) return "Must contain a number";
        if (!/[^A-Za-z0-9]/.test(value)) return "Must contain a special character";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== form.password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, (form as any)[name]) }));
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all
    const allTouched: Record<string, boolean> = {};
    const allErrors: Record<string, string> = {};
    ["fullName", "email", "country", "password", "confirmPassword"].forEach((field) => {
      allTouched[field] = true;
      allErrors[field] = validateField(field, (form as any)[field]);
    });
    setTouched(allTouched);
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) return;
    if (!agreed) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        toast.success("Account created successfully!");
      } else {
        toast.error(data.message || "Registration failed");
        if (data.errors) {
          const apiErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            apiErrors[err.field] = err.message;
          });
          setErrors(apiErrors);
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-[#0F0F0F] border border-[#333] rounded-2xl p-8 space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-athletic italic font-bold text-white uppercase">Account Created!</h2>
            <p className="text-neutral-400">
              Your account has been created successfully. You can now sign in.
            </p>
            <Link
              href="/auth/login"
              className="inline-block w-full bg-[#E84118] hover:bg-[#d13a15] text-white py-3.5 rounded-lg font-athletic font-bold uppercase tracking-widest transition-all"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-athletic italic font-bold text-white tracking-tighter">
              MEHARSTARE
            </h1>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mt-1">
              Premium Sporting Goods
            </p>
          </Link>
        </div>

        <div className="bg-[#0F0F0F] border border-[#333] rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-athletic italic font-bold text-white uppercase tracking-tight">
              Create Your Account
            </h2>
            <p className="text-neutral-500 text-sm">
              Join Meharstare for premium sporting goods
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  placeholder="John Doe"
                  className={`w-full bg-[#1A1A1A] border ${errors.fullName ? "border-red-500" : "border-[#333]"} rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E84118] transition-colors`}
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="you@example.com"
                  className={`w-full bg-[#1A1A1A] border ${errors.email ? "border-red-500" : "border-[#333]"} rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E84118] transition-colors`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Country *</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <select
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                  className={`w-full bg-[#1A1A1A] border ${errors.country ? "border-red-500" : "border-[#333]"} rounded-lg pl-10 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-[#E84118] transition-colors ${!form.country ? "text-neutral-600" : ""}`}
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && <p className="text-red-400 text-xs">{errors.country}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E84118] transition-colors"
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Company Name <span className="text-neutral-600 normal-case">(for B2B/export buyers)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="Acme Corp (optional)"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E84118] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special"
                  className={`w-full bg-[#1A1A1A] border ${errors.password ? "border-red-500" : "border-[#333]"} rounded-lg pl-10 pr-12 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E84118] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {form.password && (
                <div className="space-y-1">
                  <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.width}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    Strength: <span className="text-white font-medium">{strength.label}</span>
                  </p>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="Repeat your password"
                  className={`w-full bg-[#1A1A1A] border ${errors.confirmPassword ? "border-red-500" : "border-[#333]"} rounded-lg pl-10 pr-12 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E84118] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-[#333] bg-[#1A1A1A] text-[#E84118] focus:ring-[#E84118]"
              />
              <span className="text-xs text-neutral-500 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#E84118] hover:underline">Terms &amp; Conditions</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#E84118] hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E84118] hover:bg-[#d13a15] text-white py-3.5 rounded-lg font-athletic font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#333]" />
            <span className="text-xs text-neutral-600 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#333]" />
          </div>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#E84118] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
