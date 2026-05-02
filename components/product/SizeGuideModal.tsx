"use client";

import { X, Ruler } from "lucide-react";
import { useState } from "react";

export default function SizeGuideModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  if (!isOpen) return null;

  const topsSizes = [
    { size: "XS", chest: "34", waist: "28", length: "26", sleeve: "24" },
    { size: "S", chest: "36", waist: "30", length: "27", sleeve: "25" },
    { size: "M", chest: "38", waist: "32", length: "28", sleeve: "26" },
    { size: "L", chest: "40", waist: "34", length: "29", sleeve: "27" },
    { size: "XL", chest: "42", waist: "36", length: "30", sleeve: "28" },
    { size: "XXL", chest: "44", waist: "38", length: "31", sleeve: "29" },
    { size: "XXXL", chest: "46", waist: "40", length: "32", sleeve: "30" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden relative z-10 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-dark text-white">
          <div className="flex items-center space-x-3">
            <Ruler className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-athletic font-bold italic uppercase tracking-tighter">Size Guide</h2>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform"><X className="h-6 w-6" /></button>
        </div>

        <div className="overflow-y-auto p-8">
          {/* Unit Toggle */}
          <div className="flex justify-end mb-8">
            <div className="flex bg-neutral-100 p-1 rounded-lg">
              <button 
                onClick={() => setUnit("inches")}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${unit === "inches" ? 'bg-white shadow-sm text-dark' : 'text-neutral-400'}`}
              >
                INCHES
              </button>
              <button 
                onClick={() => setUnit("cm")}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${unit === "cm" ? 'bg-white shadow-sm text-dark' : 'text-neutral-400'}`}
              >
                CM
              </button>
            </div>
          </div>

          <h3 className="text-xl font-athletic font-bold italic uppercase mb-4 border-l-4 border-primary pl-4">Tops Size Chart</h3>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-400 font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="py-4 px-4 text-left">Size</th>
                  <th className="py-4 px-4 text-left">Chest</th>
                  <th className="py-4 px-4 text-left">Waist</th>
                  <th className="py-4 px-4 text-left">Length</th>
                  <th className="py-4 px-4 text-left">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {topsSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-dark">{row.size}</td>
                    <td className="py-4 px-4">{unit === "inches" ? row.chest + '"' : (parseInt(row.chest) * 2.54).toFixed(1)}</td>
                    <td className="py-4 px-4">{unit === "inches" ? row.waist + '"' : (parseInt(row.waist) * 2.54).toFixed(1)}</td>
                    <td className="py-4 px-4">{unit === "inches" ? row.length + '"' : (parseInt(row.length) * 2.54).toFixed(1)}</td>
                    <td className="py-4 px-4">{unit === "inches" ? row.sleeve + '"' : (parseInt(row.sleeve) * 2.54).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-athletic font-bold italic uppercase mb-6 border-l-4 border-primary pl-4">How to Measure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
              <h4 className="font-bold mb-2 uppercase text-xs text-primary">1. Chest</h4>
              <p className="text-neutral-600 leading-relaxed">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
              <h4 className="font-bold mb-2 uppercase text-xs text-primary">2. Waist</h4>
              <p className="text-neutral-600 leading-relaxed">Measure around the narrowest part (typically where your body bends side to side).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
