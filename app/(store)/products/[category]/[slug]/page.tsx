"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { 
  ChevronRight, 
  Star, 
  Globe, 
  ShoppingCart, 
  Factory, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Minus,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

import ImageViewer360 from "@/components/product/ImageViewer360";
import { ColorSelector, SizeSelector } from "@/components/product/Selectors";
import BulkPricingTable from "@/components/product/BulkPricingTable";
import ProductTabs from "@/components/product/ProductTabs";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import OEMRequestModal from "@/components/product/OEMRequestModal";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage({ params }: { params: { category: string, slug: string } }) {
  const [qty, setQty] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isOEMModalOpen, setIsOEMModalOpen] = useState(false);

  const colors = [
    { name: "Black", hex: "#000000", inStock: true },
    { name: "White", hex: "#FFFFFF", inStock: true },
    { name: "Red", hex: "#E84118", inStock: true },
    { name: "Orange", hex: "#F97316", inStock: false },
  ];

  const sizes = [
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Modals */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <OEMRequestModal isOpen={isOEMModalOpen} onClose={() => setIsOEMModalOpen(false)} />

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
        <Link href="/" className="hover:text-dark">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-dark">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/products/${params.category}`} className="hover:text-dark">{params.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-dark">Elite Pro Jersey</span>
      </nav>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
          
          {/* LEFT COLUMN: IMAGE VIEWER */}
          <div className="space-y-8">
            <ImageViewer360 />
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                  {params.category}
                </span>
                <span className="bg-dark text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center">
                  <Globe className="h-3 w-3 mr-1 text-primary" /> Export Ready
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-athletic italic font-bold leading-tight tracking-tighter text-dark uppercase">
                Elite Pro Series <br />
                <span className="text-primary">Athletic Jersey</span>
              </h1>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                  <button className="text-neutral-400 ml-2 hover:text-dark transition-colors border-b border-transparent hover:border-dark font-medium">24 Reviews</button>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-medium uppercase tracking-widest text-[10px]">SKU: MS-JSY-001</span>
              </div>
            </div>

            {/* PRICING BLOCK */}
            <div className="bg-neutral-50 p-8 rounded-3xl space-y-6 border border-neutral-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform" />
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-athletic font-bold text-dark italic">$29.99</span>
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest">Retail Price (USD)</span>
              </div>
              <BulkPricingTable />
              <div className="flex items-center space-x-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Quality Guaranteed • Direct Factory Price</span>
              </div>
            </div>

            {/* SELECTORS */}
            <div className="space-y-8">
              <ColorSelector colors={colors} />
              <SizeSelector sizes={sizes} onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />
            </div>

            {/* QUANTITY & ACTIONS */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center bg-neutral-100 rounded-xl p-1 border border-neutral-200">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-4 hover:bg-white rounded-lg transition-colors"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center font-bold font-athletic text-xl">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-4 hover:bg-white rounded-lg transition-colors"><Plus className="h-4 w-4" /></button>
                </div>
                <button 
                  onClick={() => {
                    useCart.getState().addItem({
                      id: `prod-${params.slug || '1'}`,
                      name: "Elite Pro Series Athletic Jersey",
                      price: 29.99,
                      exportPrice: 15.00,
                      image: "",
                      size: "M", // Hardcoded for demo
                      color: "Black", // Hardcoded for demo
                      quantity: qty
                    });
                    toast.success("Added to cart!");
                  }}
                  className="flex-grow bg-primary text-white py-4 rounded-xl font-athletic font-bold uppercase tracking-widest text-xl hover:bg-dark transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 flex items-center justify-center space-x-3"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <button 
                onClick={() => setIsOEMModalOpen(true)}
                className="w-full bg-white border-2 border-dark text-dark py-4 rounded-xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-dark hover:text-white transition-all flex items-center justify-center group"
              >
                <span>Request OEM / Custom Branding</span>
                <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {qty >= 50 && (
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Factory className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold text-dark">BULK ORDER DETECTED</span>
                  </div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest animate-pulse">Export Pricing Applied</span>
                </div>
              )}
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-neutral-100">
              {[
                { icon: Truck, label: "Global Shipping" },
                { icon: Factory, label: "Direct Factory" },
                { icon: ShieldCheck, label: "Quality Certified" },
                { icon: RefreshCcw, label: "Easy Returns" }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center space-y-2 text-center">
                  <badge.icon className="h-5 w-5 text-neutral-400 group-hover:text-primary transition-colors" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-24">
          <ProductTabs />
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-athletic font-bold italic uppercase tracking-tighter">You May Also Like</h2>
            <Link href={`/products/${params.category}`} className="text-primary font-bold uppercase text-xs tracking-widest hover:underline flex items-center">
              View All {params.category} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard 
                key={i} 
                product={{ 
                  id: i, 
                  name: `Pro Series Item ${i+1}`, 
                  category: params.category.toUpperCase(), 
                  price: 24.99 + i * 10, 
                  isExportReady: true 
                }} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
