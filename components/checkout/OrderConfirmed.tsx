"use client";

import { motion } from "framer-motion";
import { Check, Package, Mail, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderConfirmedProps {
  email?: string;
  orderNumber?: string;
}

export default function OrderConfirmed({ email, orderNumber }: OrderConfirmedProps) {
  const [displayOrderNumber, setDisplayOrderNumber] = useState(orderNumber || "");

  useEffect(() => {
    if (!orderNumber) {
      setDisplayOrderNumber(`MHS-2024-${Math.floor(10000 + Math.random() * 90000)}`);
    }
  }, [orderNumber]);

  // Calculate estimated delivery (14 business days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 14);
  const deliveryStr = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-center py-16 px-4 max-w-2xl mx-auto"
    >
      {/* Animated Checkmark */}
      <div className="relative w-28 h-28 mx-auto mb-10">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute inset-0 bg-green-400 rounded-full"
        />
        <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Check className="h-14 w-14 text-white stroke-[3px]" />
          </motion.div>
        </div>
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl md:text-6xl font-athletic italic font-bold uppercase tracking-tighter text-dark mb-3">
          Order Confirmed!
        </h1>
        <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em] mb-8">
          #{displayOrderNumber}
        </p>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4 mb-10"
      >
        {/* Email Confirmation */}
        {email && (
          <div className="flex items-center space-x-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100 text-left">
            <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Confirmation Email</p>
              <p className="text-sm font-bold text-dark">
                A confirmation has been sent to{" "}
                <span className="text-primary">{email}</span>
              </p>
            </div>
          </div>
        )}

        {/* Delivery Estimate */}
        <div className="flex items-center space-x-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100 text-left">
          <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Estimated Delivery</p>
            <p className="text-sm font-bold text-dark">{deliveryStr}</p>
          </div>
        </div>

        {/* Dispatch Info */}
        <div className="flex items-center space-x-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100 text-left">
          <div className="bg-orange-50 p-3 rounded-xl flex-shrink-0">
            <Package className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Dispatch From</p>
            <p className="text-sm font-bold text-dark">Meharstare Factory — Sialkot, Pakistan</p>
            <p className="text-[11px] text-neutral-400">We&apos;ll notify you with tracking info once dispatched</p>
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="/dashboard/orders"
          className="w-full sm:w-auto bg-dark text-white px-10 py-5 rounded-xl font-athletic font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center space-x-2"
        >
          <span>Track Your Order</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/products"
          className="w-full sm:w-auto border-2 border-neutral-200 text-neutral-500 px-10 py-5 rounded-xl font-athletic font-bold uppercase tracking-widest hover:border-dark hover:text-dark transition-all"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
}
