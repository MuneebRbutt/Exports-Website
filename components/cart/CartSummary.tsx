"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import CouponInput from "./CouponInput";
import Link from "next/link";
import { Truck, Zap, Package2, ShieldCheck, Lock } from "lucide-react";

type ShippingMethod = {
  id: string;
  label: string;
  desc: string;
  cost: number | "free" | "quote";
  icon: React.ComponentType<{ className?: string }>;
};

const shippingMethods: ShippingMethod[] = [
  { id: "standard", label: "Standard Shipping", desc: "7-14 business days", cost: "free", icon: Package2 },
  { id: "express", label: "Express Shipping", desc: "3-5 business days", cost: 35, icon: Zap },
  { id: "export_freight", label: "DHL Export Freight", desc: "Bulk shipping — custom quote", cost: "quote", icon: Truck },
];

interface CartSummaryProps {
  discount?: number;
}

export default function CartSummary({ discount = 0 }: CartSummaryProps) {
  const { getSubtotal, isExportOrder } = useCart();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [internalDiscount, setInternalDiscount] = useState(0);

  const subtotal = getSubtotal();

  const getShippingCost = () => {
    if (isExportOrder) return 0;
    const method = shippingMethods.find((m) => m.id === selectedShipping);
    if (!method) return 0;
    if (method.cost === "free") return subtotal > 200 ? 0 : 15;
    if (method.cost === "quote") return 0;
    return method.cost as number;
  };

  const shippingCost = getShippingCost();
  const selectedMethod = shippingMethods.find((m) => m.id === selectedShipping);
  const totalDiscount = discount + internalDiscount;
  const total = subtotal - totalDiscount + shippingCost;

  return (
    <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 sticky top-24 space-y-6">
      <h2 className="text-2xl font-athletic font-bold italic uppercase border-l-4 border-primary pl-4 tracking-tighter">
        Order Summary
      </h2>

      {/* Shipping Method Selection */}
      {!isExportOrder && (
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Shipping Method
          </label>
          <div className="space-y-2">
            {shippingMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedShipping === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedShipping(method.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-neutral-100 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? "bg-primary text-white" : "bg-neutral-100 text-neutral-400"}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-tight ${isSelected ? "text-dark" : "text-neutral-500"}`}>
                        {method.label}
                      </p>
                      <p className="text-[10px] text-neutral-400">{method.desc}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? "text-primary" : "text-neutral-400"}`}>
                    {method.cost === "free"
                      ? subtotal > 200
                        ? "FREE"
                        : "$15.00"
                      : method.cost === "quote"
                      ? "Custom"
                      : `$${(method.cost as number).toFixed(2)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-bold text-dark">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Shipping</span>
          <span className="font-bold text-dark">
            {isExportOrder
              ? "Custom Quote"
              : selectedMethod?.cost === "quote"
              ? "Custom Quote"
              : shippingCost === 0
              ? "FREE"
              : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-bold">-${totalDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-4 border-t border-neutral-200 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total</span>
            <span className="text-3xl font-athletic font-bold italic text-primary leading-none">
              ${total.toFixed(2)}
            </span>
          </div>
          <span className="text-[10px] text-neutral-400 font-medium">Prices in USD</span>
        </div>
      </div>

      {/* Coupon */}
      <CouponInput onDiscount={setInternalDiscount} subtotal={subtotal} />

      {/* CTA */}
      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block text-center w-full bg-dark text-white py-5 rounded-2xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-primary transition-all shadow-xl shadow-dark/10"
        >
          Checkout Now
        </Link>
        <div className="flex items-center justify-center space-x-3 pt-1">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <Lock className="h-3 w-3 text-neutral-400" />
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
            Secure 256-bit encrypted checkout
          </span>
        </div>
      </div>
    </div>
  );
}
