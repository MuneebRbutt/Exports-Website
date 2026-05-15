"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { getProductUrl } from "@/lib/utils/urls";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FeaturedProducts({ products }: { products: any[] }) {
  const { addItem } = useCart();

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-400">No featured products found.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {products.map((product) => {
        const productUrl = getProductUrl(product);
        const price = Number(product.basePrice) || 0;
        const image = product.images?.[0] || "/images/product-placeholder.jpg";

        return (
          <motion.div 
            key={product.id}
            variants={fadeIn}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-80 bg-neutral-100 overflow-hidden">
              <Link href={productUrl} className="absolute inset-0 z-0">
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addItem({
                    id: product.id,
                    productId: product.id,
                    name: product.name,
                    price: price,
                    image: image,
                    size: "L",
                    color: "Black",
                    quantity: 1
                  });
                  toast.success(`${product.name} added to cart`);
                }}
                className="absolute bottom-4 right-4 bg-white text-dark p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-10"
              >
                <Package className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <Link href={productUrl}>
                  <h4 className="text-xl font-bold text-dark hover:text-primary transition-colors">{product.name}</h4>
                </Link>
                <span className="text-primary font-bold tracking-tighter">
                  ${price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-6">
                {product.category?.name || "Meharstare Original"}
              </p>
              <button 
                onClick={() => {
                  addItem({
                    id: product.id,
                    productId: product.id,
                    name: product.name,
                    price: price,
                    image: image,
                    size: "L",
                    color: "Black",
                    quantity: 1
                  });
                  toast.success(`${product.name} added to cart`);
                }}
                className="w-full py-3 bg-neutral-900 text-white font-athletic uppercase tracking-widest text-sm hover:bg-primary transition-colors rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
