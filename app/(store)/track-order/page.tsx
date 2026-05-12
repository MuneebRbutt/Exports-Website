"use client";

import { useState } from "react";
import { Search, Truck, CheckCircle2, Package, Clock, ShieldCheck, Factory, MessageCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateWhatsAppUrl } from "@/lib/whatsapp/generateUrl";

const STATUS_STEPS = [
  { id: "PENDING", label: "Order Placed", icon: Clock },
  { id: "CONFIRMED", label: "Order Confirmed", icon: CheckCircle2 },
  { id: "IN_PRODUCTION", label: "In Production", icon: Factory },
  { id: "QUALITY_CHECK", label: "Quality Check", icon: ShieldCheck },
  { id: "SHIPPED", label: "Shipped", icon: Truck },
  { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Package },
  { id: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // Find order by number and email
      // We use a query param for simplicity in this example
      const res = await fetch(`/api/orders/track?orderNumber=${orderNumber}&email=${email}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order not found");
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStatusIndex = (status: string) => {
    return STATUS_STEPS.findIndex(step => step.id === status);
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-athletic italic font-bold uppercase tracking-tighter text-dark mb-4">
            Track Your Order
          </h1>
          <p className="text-neutral-500 font-medium uppercase tracking-widest text-xs">Enter your details below to see your order progress</p>
        </div>

        {/* SEARCH FORM */}
        <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 mb-12">
          <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-2">Order Number</label>
              <input 
                type="text" 
                placeholder="MHS-2025-XXXXX"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full bg-white border border-neutral-200 p-4 rounded-xl focus:outline-none focus:border-primary font-mono text-sm"
              />
            </div>
            <div className="md:col-span-1 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-neutral-200 p-4 rounded-xl focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-primary text-white p-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#d63a15] transition-all flex items-center justify-center gap-2 h-[54px] disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search size={16} />
                  Track Order
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        {/* RESULTS */}
        <AnimatePresence>
          {order && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* ORDER SUMMARY */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-neutral-100">
                <div>
                  <h2 className="text-2xl font-athletic italic font-bold uppercase text-dark">Order #{order.orderNumber}</h2>
                  <p className="text-neutral-500 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Payment Method</p>
                  <p className="font-bold text-dark">Cash on Delivery</p>
                </div>
              </div>

              {/* VISUAL TIMELINE */}
              <div className="relative py-12 px-4 md:px-0">
                <div className="absolute left-1/2 md:left-0 md:top-[60px] w-1 md:w-full h-full md:h-1 bg-neutral-100 -translate-x-1/2 md:translate-x-0"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8 relative">
                  {STATUS_STEPS.map((step, idx) => {
                    const statusIndex = getCurrentStatusIndex(order.status);
                    const isCompleted = idx <= statusIndex;
                    const isCurrent = idx === statusIndex;
                    const Icon = step.icon;

                    return (
                      <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-6 text-center group">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center transition-all z-10
                          ${isCompleted ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white border-2 border-neutral-100 text-neutral-300'}
                          ${isCurrent ? 'ring-4 ring-primary/20 scale-125' : ''}
                        `}>
                          <Icon size={20} />
                        </div>
                        <div className="text-left md:text-center">
                          <p className={`
                            text-[10px] font-bold uppercase tracking-tighter transition-colors leading-tight max-w-[80px]
                            ${isCompleted ? 'text-dark' : 'text-neutral-300'}
                            ${isCurrent ? 'text-primary scale-110' : ''}
                          `}>
                            {step.label}
                          </p>
                          {isCompleted && (
                            <p className="text-[8px] text-neutral-400 font-medium mt-1 uppercase">
                              {new Date(order.updatedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SHIPPING INFO IF SHIPPED */}
              {order.status === 'SHIPPED' && order.trackingNumber && (
                <div className="bg-dark text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-4 rounded-2xl text-primary">
                      <Truck size={32} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Your order has been shipped!</p>
                      <h3 className="text-2xl font-athletic italic font-bold uppercase">{order.courierName} Tracking</h3>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Tracking Number</p>
                    <p className="text-xl font-mono font-bold text-primary">{order.trackingNumber}</p>
                  </div>
                </div>
              )}

              {/* WHATSAPP CONTACT */}
              <div className="text-center pt-8 border-t border-neutral-100">
                <p className="text-neutral-500 text-sm mb-6">Need more details or want to change something?</p>
                <a 
                  href={generateWhatsAppUrl(`Hello Meharstare! I'd like to check the detailed status of my order #${order.orderNumber}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-dark px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  Chat with us on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
