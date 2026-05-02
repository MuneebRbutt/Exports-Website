"use client";

import { useState } from "react";
import { Star, Truck, ShieldCheck, Factory, Globe, MessageSquare } from "lucide-react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description", icon: Factory },
    { id: "specs", label: "Specifications", icon: ShieldCheck },
    { id: "shipping", label: "Export & Shipping", icon: Truck },
    { id: "reviews", label: "Reviews (24)", icon: MessageSquare },
  ];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-8 py-6 text-sm font-athletic font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-neutral-400 hover:text-dark'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 md:p-12">
        {activeTab === "description" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn">
            <div>
              <h3 className="text-2xl font-athletic font-bold italic uppercase mb-6 border-l-4 border-primary pl-4">Master Craftsmanship</h3>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Engineered for elite performance, our Pro Series Jersey combines advanced moisture-wicking technology with a compression fit that moves with you. Crafted in Sialkot, Pakistan, the world's hub for premium sportswear manufacturing.
              </p>
              <ul className="space-y-3">
                {[
                  "Dry-Fit Moisture Wicking Technology",
                  "4-Way Stretch Compression Fabric",
                  "Reinforced Flatlock Stitching",
                  "Anti-Microbial Treatment",
                  "Lightweight & Breathable Mesh Panels"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-neutral-500">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-neutral-50 p-6 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-dark mb-4">Material Composition</h4>
                <p className="text-sm text-neutral-500">85% Polyester, 15% Elastane (Spandex). Heavy-duty yet lightweight construction.</p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-dark mb-4">Care Instructions</h4>
                <p className="text-sm text-neutral-500 italic">Machine wash cold with like colors. Do not bleach. Tumble dry low. Do not iron directly on graphics.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold mb-2">Global Reach</h4>
                <p className="text-xs text-neutral-500">Middle East, Europe, USA & Canada</p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold mb-2">DHL / FedEx</h4>
                <p className="text-xs text-neutral-500">Fast-tracked air freight for bulk</p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold mb-2">Lead Times</h4>
                <p className="text-xs text-neutral-500">7-14 Days Production Cycle</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-neutral-600">
              <h4 className="text-dark font-bold mb-4 uppercase tracking-widest">Bulk Export Terms</h4>
              <p>For orders exceeding 500 units, sea freight options are available at significantly lower rates. All export shipments include full documentation: Bill of Lading, Certificate of Origin, and Commercial Invoice. We support LC, Bank Transfer, and Secure Online Payments.</p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-12 mb-12">
              <div className="md:w-1/3 text-center bg-neutral-50 p-10 rounded-3xl border border-neutral-100">
                <h4 className="text-6xl font-athletic font-bold text-dark italic leading-none mb-2">4.9</h4>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
                </div>
                <p className="text-sm text-neutral-400 uppercase tracking-widest">Based on 24 Reviews</p>
              </div>
              <div className="flex-grow space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <span className="text-xs font-bold w-4">{rating}</span>
                    <Star className="h-3 w-3 text-neutral-300" />
                    <div className="flex-grow h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary ${rating === 5 ? 'w-[90%]' : rating === 4 ? 'w-[8%]' : 'w-[2%]'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
