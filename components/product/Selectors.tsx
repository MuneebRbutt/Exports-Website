"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export function ColorSelector({ colors }: { colors: { name: string, hex: string, inStock: boolean }[] }) {
  const [selected, setSelected] = useState(colors[0].name);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Color: <span className="text-dark">{selected}</span></span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => color.inStock && setSelected(color.name)}
            className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
              selected === color.name ? 'border-primary scale-110 shadow-lg' : 'border-neutral-100 hover:border-neutral-300'
            } ${!color.inStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="w-full h-full rounded-full border border-white" style={{ backgroundColor: color.hex }} />
            {!color.inStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-[2px] bg-neutral-400 rotate-45" />
              </div>
            )}
            {selected === color.name && <Check className="absolute h-4 w-4 text-white drop-shadow-md" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SizeSelector({ sizes, onOpenSizeGuide }: { sizes: { name: string, inStock: boolean }[], onOpenSizeGuide: () => void }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Size: <span className="text-dark">{selected || "Select Size"}</span></span>
        <button 
          onClick={onOpenSizeGuide}
          className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
        >
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {sizes.map((size) => (
          <button
            key={size.name}
            disabled={!size.inStock}
            onClick={() => setSelected(size.name)}
            className={`h-12 border-2 font-athletic font-bold uppercase tracking-widest transition-all rounded-lg ${
              selected === size.name 
                ? 'bg-dark border-dark text-white shadow-xl scale-105' 
                : size.inStock 
                  ? 'border-neutral-100 text-dark hover:border-dark' 
                  : 'border-neutral-100 text-neutral-300 line-through cursor-not-allowed bg-neutral-50'
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
}
