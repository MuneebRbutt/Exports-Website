"use client";

import Image from "next/image";
import { Minus, Plus, X, Package } from "lucide-react";
import { useCart, CartItem as ICartItem } from "@/hooks/useCart";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartItem({ item }: { item: ICartItem }) {
  const { updateQuantity, removeItem, isExportOrder, toggleExportOrder } = useCart();
  const price = isExportOrder && item.exportPrice ? item.exportPrice : item.price;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;

    updateQuantity(item.id, newQuantity);

    if (newQuantity === 50 && item.quantity < 50 && !isExportOrder) {
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="font-bold text-dark text-sm">
                Buying 50+ units? You qualify for export pricing!
              </span>
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toggleExportOrder();
              }}
              className="text-xs font-bold text-primary hover:underline self-start uppercase tracking-widest"
            >
              View bulk rates →
            </button>
          </div>
        ),
        { duration: 6000, style: { maxWidth: "360px" } }
      );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 md:gap-6 py-6 border-b border-neutral-100 last:border-0 group"
    >
      {/* Product Image */}
      <div className="relative w-20 h-24 md:w-24 md:h-32 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
            <Package className="h-8 w-8 text-neutral-400" />
          </div>
        )}
        {isExportOrder && item.exportPrice && (
          <div className="absolute top-1.5 left-1.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            Export
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-athletic font-bold uppercase tracking-tight text-base md:text-lg text-dark group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {item.name}
          </h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-neutral-300 hover:text-red-500 transition-colors flex-shrink-0 p-1"
            aria-label="Remove item"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 mb-4 uppercase tracking-widest">
          {item.size} | {item.color}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Quantity stepper */}
          <div className="flex items-center bg-neutral-50 rounded-lg p-1 border border-neutral-200">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className="p-1.5 md:p-2 hover:bg-white rounded-md transition-colors disabled:opacity-40"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 md:w-10 text-center font-bold text-sm">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="p-1.5 md:p-2 hover:bg-white rounded-md transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm md:text-base font-bold text-dark">
              ${(price * item.quantity).toFixed(2)}
            </p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-tighter">
              ${price.toFixed(2)} / unit
              {isExportOrder && item.exportPrice && (
                <span className="text-primary ml-1">(export)</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
