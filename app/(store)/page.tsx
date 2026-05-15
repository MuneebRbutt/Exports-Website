import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Truck, 
  Factory, 
  ChevronRight, 
  Package, 
  CheckCircle2 
} from "lucide-react";
import { getCategoryUrl, getSubcategoryUrl } from "@/lib/utils/urls";
import { prisma } from "@/lib/prisma";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HomeHero from "@/components/home/HomeHero";
import CategoryGrid from "@/components/home/CategoryGrid";

export default async function Home() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: { 
      isActive: true, 
      isFeatured: true 
    },
    take: 6,
    include: { category: true }
  });

  // Fetch categories with product count
  const categoriesWithCount = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      _count: { select: { products: true } },
      subcategories: true
    }
  });

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <HomeHero />

      {/* 2. CATEGORY GRID */}
      <CategoryGrid categories={categoriesWithCount} />

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

          <FeaturedProducts products={featuredProducts} />
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
                <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-dark flex items-center justify-center">
                  <span className="text-primary font-athletic italic text-4xl opacity-20">EST. 2014 | SIALKOT, PK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER */}
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
