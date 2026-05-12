"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, Factory, MessageSquare } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { motion } from "framer-motion";
import { generateWhatsAppUrl } from "@/lib/whatsapp/generateUrl";

export default function CartPage() {
  const { items } = useCart();
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const isExportEligible = totalItems >= 50;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-neutral-50 p-12 rounded-full mb-8"
        >
          <ShoppingBag className="h-16 w-16 text-neutral-300" />
        </motion.div>
        <h1 className="text-4xl font-athletic italic font-bold uppercase mb-4">Your cart is empty</h1>
        <p className="text-neutral-500 mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Elite sportswear is waiting for you.</p>
        <Link href="/products" className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d63a15] transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-athletic italic font-bold uppercase tracking-tighter text-dark">Your Shopping Cart</h1>
            <p className="text-neutral-400 font-medium uppercase tracking-widest text-xs mt-2">{items.length} Items in your bag</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center space-x-2 text-dark font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {isExportEligible && (
          <div className="bg-dark text-white p-6 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-primary">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Factory size={24} />
              </div>
              <div>
                <h3 className="font-athletic italic font-bold text-xl uppercase tracking-tight">This order qualifies for EXPORT PRICING</h3>
                <p className="text-gray-400 text-sm">Contact us for bulk rates and customized export inquiries.</p>
              </div>
            </div>
            <a 
              href={generateWhatsAppUrl("Hello Meharstare! My cart qualifies for export pricing. I'd like to discuss bulk rates.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 transition-all"
            >
              <MessageSquare size={16} />
              Chat on WhatsApp
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-12 md:hidden">
              <Link href="/products" className="flex items-center justify-center space-x-2 text-dark font-bold uppercase text-xs tracking-widest border border-neutral-200 py-4 rounded-xl">
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
