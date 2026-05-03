"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Tag } from "lucide-react";

const COUPONS: Record<string, { discount: number; type: "percent" | "fixed"; label: string }> = {
  "MEHAR20": { discount: 20, type: "percent", label: "20% OFF" },
  "EXPORT10": { discount: 10, type: "percent", label: "10% OFF" },
  "FIRST50": { discount: 50, type: "fixed", label: "$50 OFF" },
  "BULK15": { discount: 15, type: "percent", label: "15% OFF" },
};

interface CouponInputProps {
  onDiscount?: (amount: number) => void;
  subtotal?: number;
}

export default function CouponInput({ onDiscount, subtotal = 0 }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [appliedLabel, setAppliedLabel] = useState("");
  const [appliedCode, setAppliedCode] = useState("");

  const handleApply = () => {
    const coupon = COUPONS[code.toUpperCase().trim()];
    if (coupon) {
      const discountAmount =
        coupon.type === "percent"
          ? (subtotal * coupon.discount) / 100
          : coupon.discount;
      setStatus("success");
      setAppliedLabel(coupon.label);
      setAppliedCode(code.toUpperCase().trim());
      onDiscount?.(discountAmount);
    } else {
      setStatus("error");
      onDiscount?.(0);
    }
  };

  const handleRemove = () => {
    setCode("");
    setStatus("idle");
    setAppliedLabel("");
    setAppliedCode("");
    onDiscount?.(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center space-x-1">
        <Tag className="h-3 w-3" />
        <span>Coupon Code</span>
      </label>

      {status === "success" ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 px-4 py-3 rounded-xl">
          <div className="flex items-center space-x-2 text-green-700">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide">{appliedCode}</p>
              <p className="text-[10px] text-green-600">{appliedLabel} applied!</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-green-400 hover:text-green-700 transition-colors"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setStatus("idle");
            }}
            onKeyDown={handleKeyDown}
            placeholder="ENTER CODE"
            className={`flex-grow bg-white border px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
              status === "error"
                ? "border-red-400 focus:border-red-500"
                : "border-neutral-200 focus:border-dark"
            }`}
          />
          <button
            onClick={handleApply}
            className="bg-dark text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-colors whitespace-nowrap"
          >
            Apply
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center space-x-2 text-red-500">
          <XCircle className="h-4 w-4" />
          <p className="text-xs font-bold">Invalid coupon code. Try MEHAR20</p>
        </div>
      )}
    </div>
  );
}
