"use client";

import { X, Factory, Upload, Send } from "lucide-react";

export default function OEMRequestModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden relative z-10 shadow-2xl flex flex-col">
        <div className="p-6 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Factory className="h-6 w-6" />
            <h2 className="text-2xl font-athletic font-bold italic uppercase tracking-tighter">OEM / Custom Branding Request</h2>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform"><X className="h-6 w-6" /></button>
        </div>

        <form className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Company Name</label>
              <input type="text" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors" placeholder="Your Business Ltd." required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Country</label>
              <input type="text" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors" placeholder="United Kingdom" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Contact Email</label>
              <input type="email" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors" placeholder="buyer@company.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Required Quantity</label>
              <input type="number" min="50" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors" placeholder="Min 50 units" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Custom Requirements</label>
            <textarea className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg h-32 focus:outline-none focus:border-primary transition-colors" placeholder="Describe your branding needs (Logos, custom colors, woven labels, etc.)"></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Upload Logo (Vector preferred)</label>
            <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary cursor-pointer transition-all">
              <Upload className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">Drop your file here or <span className="text-primary font-bold">browse</span></p>
            </div>
          </div>

          <button type="submit" className="w-full bg-dark text-white py-5 rounded-xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-primary transition-all flex items-center justify-center space-x-3 shadow-xl">
            <Send className="h-5 w-5" />
            <span>Submit OEM Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}
