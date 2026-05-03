"use client";

import { motion } from "framer-motion";
import { CreditCard, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaymentForm({ 
  onNext, 
  onBack,
  defaultMethod = "card"
}: { 
  onNext: (method: string) => void; 
  onBack: () => void;
  defaultMethod?: string;
}) {
  const [method, setMethod] = useState(defaultMethod);

  const handleContinue = () => {
    // In a real app, if Stripe is selected, we might want to validate the card here.
    // For now, we just pass the selected method to the next step.
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
          onClick={() => setMethod("card")}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${method === "card" ? 'bg-white shadow-lg text-dark' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <CreditCard className="h-4 w-4" />
          <span>Card</span>
        </button>
        <button 
          onClick={() => setMethod("paypal")}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${method === "paypal" ? 'bg-white shadow-lg text-dark' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <Globe className="h-4 w-4" />
          <span>PayPal</span>
        </button>
        <button 
          onClick={() => setMethod("bank")}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${method === "bank" ? 'bg-white shadow-lg text-dark' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Bank</span>
        </button>
      </div>

      {method === "card" && (
        <div className="space-y-6 p-8 border border-neutral-100 rounded-3xl bg-neutral-50/50">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Cardholder Name</label>
            <input type="text" className="w-full bg-white border border-neutral-200 p-4 rounded-xl focus:outline-none focus:border-dark" placeholder="JOHN DOE" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Card Details</label>
            <div className="w-full bg-white border border-neutral-200 p-4 rounded-xl focus-within:border-dark">
              {/* Note: In actual implementation, this component must be wrapped in <Elements> from stripe */}
              <CardElement options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1a1a1a',
                    '::placeholder': {
                      color: '#a3a3a3',
                    },
                  },
                },
              }} />
            </div>
          </div>
          <label className="flex items-center space-x-3 cursor-pointer group mt-4">
            <input type="checkbox" className="accent-primary h-4 w-4" defaultChecked />
            <span className="text-xs text-neutral-500 group-hover:text-dark transition-colors">Billing address same as shipping</span>
          </label>
        </div>
      )}

      {method === "paypal" && (
        <div className="p-12 text-center border-2 border-dashed border-neutral-200 rounded-3xl bg-blue-50/20">
          <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-sm text-neutral-600 max-w-xs mx-auto mb-6">You will be redirected to PayPal to complete your purchase securely.</p>
          <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test" }}>
            <PayPalButtons style={{ layout: "horizontal", color: "black" }} disabled={true} />
          </PayPalScriptProvider>
        </div>
      )}

      {method === "bank" && (
        <div className="p-8 border border-neutral-100 rounded-3xl bg-neutral-50 space-y-4">
          <h5 className="font-bold uppercase text-xs">Meharstare Bank Details</h5>
          <div className="text-sm space-y-2 font-mono text-neutral-600">
            <p>Bank: Standard Chartered PK</p>
            <p>Account: 0123-4567-8910</p>
            <p>IBAN: PK60 SCBL 0000 0012 3456 7890</p>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Payment Reference / PO Number</label>
            <input type="text" className="w-full bg-white border border-neutral-200 p-4 rounded-xl focus:outline-none focus:border-dark" placeholder="REF-12345" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Upload Payment Proof</label>
            <input type="file" className="w-full bg-white border border-neutral-200 p-3 rounded-xl text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-4 animate-pulse">Payment will be verified within 24hrs</p>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 bg-neutral-100 text-dark py-5 rounded-2xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-neutral-200 transition-all">
          Back
        </button>
        <button onClick={handleContinue} className="flex-[2] bg-dark text-white py-5 rounded-2xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-primary transition-all">
          Review Order
        </button>
      </div>
    </motion.div>
  );
}
