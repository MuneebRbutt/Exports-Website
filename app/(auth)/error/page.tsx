"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-[#0F0F0F] border border-[#333] rounded-2xl p-8 space-y-6">
          <AlertTriangle className="h-16 w-16 text-[#E84118] mx-auto" />
          <h2 className="text-2xl font-athletic italic font-bold text-white uppercase">
            Authentication Error
          </h2>
          <p className="text-neutral-400">
            Something went wrong during authentication. Please try again.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#E84118] hover:bg-[#d13a15] text-white py-3.5 rounded-lg font-athletic font-bold uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
