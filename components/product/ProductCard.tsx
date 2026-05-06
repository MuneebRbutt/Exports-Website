"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { getProductUrl } from "@/lib/utils/urls";

interface ProductCardProps {
  product: any; // Using any temporarily for mock data, will use Product type in production
  viewMode?: 'GRID4' | 'GRID2' | 'LIST';
}

export default function ProductCard({ product, viewMode = 'GRID4' }: ProductCardProps) {
  const isList = viewMode === 'LIST';
  const { addItem } = useCart();
  const productUrl = getProductUrl(product);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 ${
        isList ? 'flex' : 'flex flex-col'
      }`}
    >
      {/* Image Area */}
      <div className={`relative bg-neutral-100 overflow-hidden ${isList ? 'w-1/3' : 'w-full aspect-[4/5]'}`}>
        <Link href={productUrl} className="absolute inset-0 z-0">
          <Image
            src={product.image || product.img || "/images/product-placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2 pointer-events-none">
          <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 pointer-events-none">
          <Link href={productUrl} className="bg-white text-dark p-3 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 pointer-events-auto">
            <Eye className="h-5 w-5" />
          </Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              const price = Number(product.price) || Number(product.retailPrice) || 0;
              addItem({
                id: product.id.toString(),
                name: product.name,
                price: price,
                image: product.image || product.img || "/images/product-placeholder.jpg",
                size: "L", // Default mock size
                color: "Black", // Default mock color
                quantity: 1
              });
              toast.success(`${product.name} added to cart`);
            }}
            className="bg-white text-dark p-3 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 pointer-events-auto"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="bg-white text-dark p-3 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 pointer-events-auto">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={`p-5 flex flex-col ${isList ? 'w-2/3 justify-center' : 'flex-grow'}`}>
        <div className="flex justify-between items-start mb-2">
          <Link href={productUrl}>
            <h3 className="text-lg font-athletic font-bold italic tracking-tight text-dark uppercase group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-orange-400 text-orange-400' : 'text-neutral-300'}`} />
          ))}
          <span className="text-[10px] text-neutral-400 ml-1">(24)</span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center space-x-2 mb-4">
          {['bg-black', 'bg-red-600', 'bg-orange-500', 'bg-blue-900'].map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${color} ring-1 ring-offset-1 ring-neutral-200 cursor-pointer`} />
          ))}
          <span className="text-[10px] text-neutral-400">+2 more</span>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-4 border-t border-neutral-50">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-dark">
              ${(Number(product.price) || Number(product.retailPrice) || 0).toFixed(2)}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">Retail</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
