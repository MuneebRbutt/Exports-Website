import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  const featuredCategories = [
    { name: "Sportswear", img: "/images/cat-sportswear.jpg", href: "/products/sportswear" },
    { name: "Casual Wear", img: "/images/cat-casual.jpg", href: "/products/casual-wear" },
    { name: "Gloves", img: "/images/cat-gloves.jpg", href: "/products/gloves" },
    { name: "Accessories", img: "/images/cat-accessories.jpg", href: "/products/accessories" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-dark flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 opacity-70" />
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl text-white mb-6 leading-none tracking-tighter italic">
              ENGINEERED FOR <span className="text-primary">DOMINANCE</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 font-light">
              Premium Sportswear & Equipment. From the heart of manufacturing in Pakistan to elite athletes worldwide.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products" className="btn-primary flex items-center justify-center">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/export-inquiry" className="btn-secondary flex items-center justify-center">
                B2B Bulk Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-neutral-100 py-12 border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-sm"><Globe className="text-primary h-6 w-6" /></div>
              <div>
                <h4 className="font-bold text-dark uppercase text-sm">Global Export</h4>
                <p className="text-xs text-neutral-600">Middle East, UK, USA & Europe</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-sm"><ShieldCheck className="text-primary h-6 w-6" /></div>
              <div>
                <h4 className="font-bold text-dark uppercase text-sm">Certified Quality</h4>
                <p className="text-xs text-neutral-600">ISO 9001 & CE Standard Products</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-sm"><Truck className="text-primary h-6 w-6" /></div>
              <div>
                <h4 className="font-bold text-dark uppercase text-sm">Factory Direct</h4>
                <p className="text-xs text-neutral-600">Pakistan's Premium Manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-dark mb-4">Elite Categories</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((cat) => (
              <Link 
                key={cat.name} 
                href={cat.href}
                className="group relative h-96 overflow-hidden rounded-lg bg-neutral-200"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all z-10" />
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-2xl text-white italic tracking-tighter">{cat.name}</h3>
                  <span className="text-primary text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6 italic tracking-tighter">Stay Ahead of the Game</h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto">Subscribe for exclusive export offers, bulk discount alerts, and new collection launches.</p>
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-6 py-4 rounded-l-md focus:outline-none"
            />
            <button className="bg-dark text-white px-8 py-4 rounded-r-md font-bold uppercase hover:bg-neutral-900 transition-colors">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
