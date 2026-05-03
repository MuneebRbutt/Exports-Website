"use client";

import { motion } from "framer-motion";
import { CreditCard, Globe, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { ShippingFormData } from "./ShippingForm";

export default function OrderReview({ 
  onNext, 
  onBack,
  shippingData,
  paymentMethod,
  isPlacingOrder
}: { 
  onNext: () => void; 
  onBack: () => void;
  shippingData: ShippingFormData | null;
  paymentMethod: string;
  isPlacingOrder: boolean;
}) {
  const [agreed, setAgreed] = useState(false);
  const { items, isExportOrder } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="p-8 border border-neutral-100 rounded-3xl bg-neutral-50/50 divide-y divide-neutral-100">
        <div className="pb-6">
          <h5 className="font-bold uppercase text-[10px] tracking-widest text-neutral-400 mb-4">Shipping To</h5>
          <p className="text-sm text-dark font-medium">{shippingData?.fullName || "John Doe"}</p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            {shippingData?.addressLine1 || "123 Export Avenue"}, {shippingData?.city || "Sialkot"}, {shippingData?.country || "PK"}
          </p>
        </div>
        <div className="py-6">
          <h5 className="font-bold uppercase text-[10px] tracking-widest text-neutral-400 mb-4">Payment Method</h5>
          <div className="flex items-center space-x-3">
            {paymentMethod === "card" && <CreditCard className="h-5 w-5 text-dark" />}
            {paymentMethod === "paypal" && <Globe className="h-5 w-5 text-dark" />}
            {paymentMethod === "bank" && <ShieldCheck className="h-5 w-5 text-dark" />}
            <span className="text-sm text-dark font-medium uppercase tracking-widest">
              {paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "paypal" ? "PayPal" : "Bank Transfer"}
            </span>
          </div>
        </div>
        <div className="pt-6">
          <h5 className="font-bold uppercase text-[10px] tracking-widest text-neutral-400 mb-4">Order Items</h5>
          <div className="space-y-2">
            {items.map(item => {
              const price = (isExportOrder && item.exportPrice) ? item.exportPrice : item.price;
              return (
                <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                  <span className="font-medium text-neutral-600">{item.quantity} x {item.name} ({item.size})</span>
                  <span>${(price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <label className="flex items-start space-x-3 cursor-pointer group">
        <input 
          type="checkbox" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-primary h-4 w-4" 
        />
        <span className="text-xs text-neutral-500 leading-relaxed group-hover:text-dark transition-colors">I agree to the Terms & Conditions and acknowledge that international shipments may be subject to customs duties.</span>
      </label>

      <div className="flex gap-4">
        <button onClick={onBack} disabled={isPlacingOrder} className="flex-1 bg-neutral-100 text-dark py-5 rounded-2xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-neutral-200 transition-all disabled:opacity-50">
          Back
        </button>
        <motion.button 
          whileHover={agreed && !isPlacingOrder ? { scale: 1.02 } : {}}
          whileTap={agreed && !isPlacingOrder ? { scale: 0.98 } : {}}
          animate={agreed && !isPlacingOrder ? {
            boxShadow: ["0px 0px 0px rgba(232, 65, 24, 0)", "0px 0px 20px rgba(232, 65, 24, 0.4)", "0px 0px 0px rgba(232, 65, 24, 0)"],
          } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={onNext} 
          disabled={!agreed || isPlacingOrder}
          className="flex-[2] bg-primary text-white py-5 rounded-2xl font-athletic font-bold uppercase tracking-widest text-xl hover:bg-[#d63a15] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlacingOrder ? "Processing..." : "Place Order"}
        </motion.button>
      </div>
    </motion.div>
  );
}
