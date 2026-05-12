"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck, MessageCircle, ArrowRight, ShoppingBag, Copy } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { generateWhatsAppUrl } from "@/lib/whatsapp/generateUrl";

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${params.orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [params.orderId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Order number copied!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Link href="/products" className="text-primary hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* SECTION 1 — SUCCESS HEADER */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-8"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-athletic italic font-bold uppercase tracking-tighter text-dark mb-4">
            Order Placed Successfully!
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Order Number:</span>
            <div 
              onClick={() => copyToClipboard(order.orderNumber)}
              className="bg-neutral-100 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-neutral-200 transition-colors group"
            >
              <span className="font-mono font-bold text-dark">{order.orderNumber}</span>
              <Copy size={14} className="text-neutral-400 group-hover:text-primary" />
            </div>
          </div>
          <p className="text-neutral-500 text-lg">Thank you for your order! We've received your request.</p>
        </div>

        {/* SECTION 2 — ORDER DETAILS CARD */}
        <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-primary" size={24} />
            <h2 className="text-xl font-athletic italic font-bold uppercase tracking-tight text-dark">Order Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Payment Method</p>
                <p className="font-bold text-dark">Cash on Delivery</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Current Status</p>
                <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  {order.status}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Estimated Delivery</p>
                <p className="font-bold text-dark">3-7 Business Days</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Total Amount</p>
                <p className="text-2xl font-athletic italic font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — WHAT HAPPENS NEXT */}
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-dark mb-6 text-center">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1️⃣", text: "We prepare your order" },
              { step: "2️⃣", text: "We ship it to your address" },
              { step: "3️⃣", text: "You pay when it arrives" },
              { step: "4️⃣", text: "Enjoy your products!" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-100 p-4 rounded-2xl text-center">
                <span className="text-2xl mb-2 block">{item.step}</span>
                <p className="text-xs font-bold text-neutral-600 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4 — NEED HELP? WHATSAPP BUTTON */}
        <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-3xl p-8 text-center mb-12">
          <MessageCircle className="text-[#25D366] mx-auto mb-4" size={40} />
          <h3 className="text-xl font-athletic italic font-bold uppercase tracking-tight text-dark mb-2">Need help with your order?</h3>
          <p className="text-neutral-500 text-sm mb-6">Our team is available to assist you with any questions.</p>
          <a 
            href={generateWhatsAppUrl(`Hello Meharstare! I have a question about my order #${order.orderNumber}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={18} />
            Chat with us on WhatsApp
          </a>
          <p className="text-[10px] text-neutral-400 mt-4 font-bold uppercase tracking-widest">We respond within a few hours</p>
        </div>

        {/* SECTION 5 — ORDER ITEMS */}
        <div className="border-t border-neutral-100 pt-12 mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-dark mb-8">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.images?.[0] && (
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark uppercase tracking-tight">{item.product.name}</p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{item.variant.size} | Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center p-4 border-t border-neutral-200 mt-4 pt-6">
              <span className="text-lg font-athletic italic font-bold uppercase text-dark">Total Paid at Delivery</span>
              <span className="text-2xl font-athletic italic font-bold text-primary">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* SECTION 6 — ACTION BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/track-order" 
            className="flex items-center justify-center gap-2 border-2 border-dark text-dark px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-dark hover:text-white transition-all"
          >
            <Truck size={18} />
            Track My Order
          </Link>
          <Link 
            href="/products" 
            className="flex items-center justify-center gap-2 bg-dark text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-lg"
          >
            <ShoppingBag size={18} />
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
