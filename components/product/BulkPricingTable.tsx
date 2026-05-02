"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

export default function BulkPricingTable() {
  const [isOpen, setIsOpen] = useState(false);

  const tiers = [
    { qty: "50-99 units", price: "$24.99/unit" },
    { qty: "100-499 units", price: "$19.99/unit" },
    { qty: "500+ units", price: "$15.99/unit" },
    { qty: "1000+ units", price: "Contact for quote" },
  ];

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Info className="h-4 w-4 text-primary" />
          <span className="font-athletic font-bold uppercase tracking-widest text-sm text-dark">Bulk Export Pricing</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="px-5 pb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-widest text-neutral-400">
                <th className="text-left py-3 font-bold">MOQ Tiers</th>
                <th className="text-right py-3 font-bold">Price per Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {tiers.map((tier, i) => (
                <tr key={i} className="hover:bg-white/50 transition-colors">
                  <td className="py-3 text-neutral-600 font-medium">{tier.qty}</td>
                  <td className="py-3 text-right font-bold text-dark">{tier.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="w-full mt-4 py-3 bg-dark text-white font-athletic font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-primary transition-colors">
            Request Custom Quote
          </button>
        </div>
      )}
    </div>
  );
}
