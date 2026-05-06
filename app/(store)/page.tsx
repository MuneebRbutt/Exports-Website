"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Truck, 
  Factory, 
  ChevronRight, 
  Package, 
  CreditCard, 
  CheckCircle2 
} from "lucide-react";
import { getProductUrl, getCategoryUrl } from "@/lib/utils/urls";
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

export default function Home() {
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          // Just take the first 6 as featured
          setFeaturedProducts(result.data.slice(0, 6).map((p: any) => ({
            ...p,
            img: p.image // Map image to img for homepage card compatibility
          })));
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-dark overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bg.png" 
            alt="Meharstare Hero" 
            fill 
            className="object-cover opacity-60 grayscale-[50%] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/40 to-dark" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/30 px-4 py-2 rounded-full mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary font-athletic uppercase text-xs tracking-widest font-bold">
                ISO Certified | 10+ Years Export Experience
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl lg:text-8xl text-white font-athletic italic font-bold leading-[1.1] tracking-tighter mb-8"
            >
              EXPORT QUALITY <br />
              <span className="text-primary">SPORTSWEAR</span> <br />
              FROM PAKISTAN
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-neutral-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Jerseys, Tracksuits, Gloves & Casual Wear — Trusted by buyers across Middle East, Europe & USA. Engineered for dominance, delivered worldwide.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link href="/products" className="btn-primary w-full sm:w-auto flex items-center justify-center px-10 py-5 text-lg">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-primary rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Sportswear", slug: "sportswear", img: "bg-neutral-800" },
              { name: "Casual Wear", slug: "casual-wear", img: "bg-neutral-700" },
              { name: "Gloves", slug: "gloves", img: "bg-neutral-600" },
              { name: "Accessories", slug: "accessories", img: "bg-neutral-500" }
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-96 overflow-hidden rounded-xl cursor-pointer"
              >
                <div className={`absolute inset-0 ${cat.img} group-hover:scale-110 transition-transform duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-60" />
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary transition-all duration-300 rounded-xl" />
                
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-athletic italic text-white mb-2">{cat.name}</h3>
                  <Link href={getCategoryUrl(cat.slug)} className="flex items-center text-primary font-bold uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform">
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-24 bg-neutral-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="mb-6 md:mb-0">
              <span className="text-primary font-athletic font-bold uppercase tracking-[0.3em] text-sm">Our Portfolio</span>
              <h2 className="text-5xl md:text-6xl text-dark italic leading-none mt-2">BESTSELLING ITEMS</h2>
            </div>
            <Link href="/products" className="text-dark font-bold border-b-2 border-primary hover:text-primary transition-colors pb-1">
              View All Collection
            </Link>
          </div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {featuredProducts.map((product) => {
              const productUrl = getProductUrl(product);
              return (
                <motion.div 
                  key={product.id}
                  variants={fadeIn}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-80 bg-neutral-100 overflow-hidden">
                    <Link href={productUrl} className="absolute inset-0 z-0">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const price = Number(product.price) || Number(product.retailPrice) || 0;
                        addItem({
                          id: product.id.toString(),
                          name: product.name,
                          price: price,
                          image: product.img || product.image || "/images/product-placeholder.jpg",
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
                        ${(Number(product.price) || Number(product.retailPrice) || 0).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mb-6">Meharstare Original</p>
                    <button 
                      onClick={() => {
                        const price = Number(product.price) || Number(product.retailPrice) || 0;
                        addItem({
                          id: product.id.toString(),
                          name: product.name,
                          price: price,
                          image: product.img || product.image || "/images/product-placeholder.jpg",
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
        </div>
      </section>

      {/* 4. WHY MEHARSTARE SECTION */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-athletic font-bold uppercase tracking-[0.3em] text-sm mb-4 block">The Meharstare Advantage</span>
              <h2 className="text-5xl md:text-7xl italic font-bold mb-8 leading-[0.9]">CRAFTED IN PAKISTAN, <br />DELIVERED TO THE <span className="text-primary">WORLD</span></h2>
              <p className="text-neutral-400 mb-12 text-lg font-light leading-relaxed">
                Combining decades of craftsmanship with modern athletic technology. We operate our own state-of-the-art facilities in Sialkot, ensuring uncompromised quality for every stitch.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Factory, title: "Direct Factory Pricing", desc: "No middlemen, maximum value for our customers." },
                  { icon: Package, title: "Premium Materials", desc: "Sourced from the finest local and international suppliers." },
                  { icon: Globe, title: "Global Shipping", desc: "Reliable logistics via DHL, FedEx, and sea freight." },
                  { icon: CheckCircle2, title: "Quality Guaranteed", desc: "Every product undergoes rigorous quality control checks." }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg h-fit">
                      <item.icon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-neutral-500 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square">
              <div className="absolute inset-0 border-2 border-primary/30 translate-x-6 translate-y-6 rounded-2xl" />
              <div className="absolute inset-0 bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for Factory/Manufacturing Image */}
                <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-dark flex items-center justify-center">
                  <span className="text-primary font-athletic italic text-4xl opacity-20">EST. 2014 | SIALKOT, PK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl text-white font-athletic italic font-bold mb-6">JOIN THE MEHARSTARE CLUB</h2>
            <p className="text-neutral-400 mb-10 text-lg">Receive exclusive updates on new collections, limited drops, and community events.</p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button className="bg-primary text-white px-10 py-4 rounded-xl font-athletic font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-lg">
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-neutral-600 mt-6 uppercase tracking-widest">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
