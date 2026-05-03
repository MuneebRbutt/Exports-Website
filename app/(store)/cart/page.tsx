"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, Globe, Factory } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, isExportOrder, toggleExportOrder } = useCart();
  const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
  const qualifiesForExport = totalQty >= 50;

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
        <Link href="/products" className="btn-primary px-10 py-4 rounded-xl">
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
            <h1 className="text-4xl md:text-6xl font-athletic italic font-bold uppercase tracking-tighter">Your Shopping Cart</h1>
            <p className="text-neutral-400 font-medium uppercase tracking-widest text-xs mt-2">{items.length} Items in your bag</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center space-x-2 text-dark font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {qualifiesForExport && !isExportOrder && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-primary/5 border border-primary/20 p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary p-3 rounded-xl shadow-lg shadow-primary/20">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark uppercase tracking-tight">EXPORT PRICING UNLOCKED</h4>
                      <p className="text-xs text-neutral-500">Your order of {totalQty} units qualifies for bulk manufacturing rates.</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleExportOrder}
                    className="whitespace-nowrap bg-dark text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
                  >
                    Switch to Export Order
                  </button>
                </motion.div>
              )}

              {isExportOrder && (
                <motion.div 
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-dark text-white p-6 rounded-2xl mb-10 flex items-center justify-between shadow-2xl"
                >
                  <div className="flex items-center space-x-4">
                    <Factory className="h-6 w-6 text-primary" />
                    <span className="font-athletic font-bold uppercase tracking-widest">🏭 CURRENTLY VIEWING EXPORT PRICING</span>
                  </div>
                  <button onClick={toggleExportOrder} className="text-[10px] underline uppercase tracking-widest opacity-60 hover:opacity-100">Switch back to retail</button>
                </motion.div>
              )}
            </AnimatePresence>

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
