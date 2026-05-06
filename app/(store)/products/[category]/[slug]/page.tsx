"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { 
  ChevronRight, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Minus,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

import ImageViewer360 from "@/components/product/ImageViewer360";
import { ColorSelector, SizeSelector } from "@/components/product/Selectors";
import ProductTabs from "@/components/product/ProductTabs";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { category: string, slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          const found = result.data.find((p: any) => p.slug === params.slug);
          if (found) {
            setProduct(found);
          } else {
            setProduct(null);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params.slug]);

  // Sync with top of page on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-dark font-athletic text-2xl italic">Loading...</div>;
  }

  if (!product) {
    notFound();
  }

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

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
        <Link href="/" className="hover:text-dark">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-dark">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/products/${params.category}`} className="hover:text-dark">{params.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-dark">{product.name}</span>
      </nav>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
          
          {/* LEFT COLUMN: IMAGE VIEWER */}
          <div className="space-y-8">
            <ImageViewer360 
              productImages={product.images || [product.image]} 
              view360={product.view360}
            />
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                  {params.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-athletic italic font-bold leading-tight tracking-tighter text-dark uppercase">
                {product.name}
              </h1>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                  <button className="text-neutral-400 ml-2 hover:text-dark transition-colors border-b border-transparent hover:border-dark font-medium">24 Reviews</button>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-medium uppercase tracking-widest text-[10px]">SKU: {product.sku}</span>
              </div>
            </div>

            {/* PRICING BLOCK */}
            <div className="bg-neutral-50 p-8 rounded-3xl space-y-6 border border-neutral-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform" />
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-athletic font-bold text-dark italic">
                  ${(Number(product.price) || Number(product.retailPrice) || 0).toFixed(2)}
                </span>
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest">Retail Price (USD)</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Quality Guaranteed • Premium Material</span>
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
                    const price = Number(product.price) || Number(product.retailPrice) || 0;
                    useCart.getState().addItem({
                      id: product.id.toString(),
                      name: product.name,
                      price: price,
                      image: product.image || "",
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
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-neutral-100">
              {[
                { icon: Truck, label: "Global Shipping" },
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
                  price: 24.99 + i * 10
                }} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
