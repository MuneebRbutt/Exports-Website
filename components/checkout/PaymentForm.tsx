"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function PaymentForm({ 
  onNext, 
  onBack,
  defaultMethod = "cod"
}: { 
  onNext: (method: string) => void; 
  onBack: () => void;
  defaultMethod?: string;
}) {
  const [method, setMethod] = useState(defaultMethod);

  const handleContinue = () => {
    onNext(method);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex bg-neutral-100 p-1 rounded-2xl">
        <button 
          onClick={() => setMethod("cod")}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${method === "cod" ? 'bg-white shadow-lg text-dark' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <Truck className="h-4 w-4" />
          <span>Cash on Delivery</span>
        </button>
      </div>

      {method === "cod" && (
        <div className="p-8 border border-neutral-100 rounded-3xl bg-neutral-50/50 space-y-4">
          <div className="flex items-center space-x-4 text-primary">
            <Truck className="h-8 w-8" />
            <h4 className="font-athletic italic font-bold text-lg">CASH ON DELIVERY</h4>
          </div>
          <p className="text-sm text-neutral-600">
            Pay with cash upon delivery of your order. Our delivery partner will collect the payment at your doorstep.
          </p>
          <div className="bg-white p-4 rounded-xl border border-neutral-100 flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-500">
              Your order will be processed immediately. Please ensure someone is available at the shipping address to receive the package and provide payment.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-8">
        <button
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-dark transition-colors"
        >
          Back to Shipping
        </button>
        <button
          onClick={handleContinue}
          className="bg-dark text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg hover:shadow-primary/30"
        >
          Review Order
        </button>
      </div>
    </motion.div>
  );
}
