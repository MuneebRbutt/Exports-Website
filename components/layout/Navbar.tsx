"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { getCategoryUrl, getSubcategoryUrl } from "@/lib/utils/urls";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const { items } = useCart();
  const router = useRouter();
  
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-athletic font-bold italic tracking-tighter">
              MEHAR<span className="text-primary">STARE</span>
            </span>
          </Link>

          {/* Desktop Nav with Mega Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="font-athletic uppercase text-sm tracking-widest hover:text-primary transition-colors">
              Home
            </Link>
            
            {/* Products Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button 
                className="font-athletic uppercase text-sm tracking-widest hover:text-primary transition-colors flex items-center gap-1"
                onClick={() => router.push('/products')}
              >
                Products <ChevronDown className="h-3 w-3" />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-[#1A1A1A] border border-[#333] rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="grid grid-cols-4 gap-8">
                        {categories.map((category) => (
                          <div key={category.id} className="space-y-4">
                            <h3 className="font-athletic text-primary font-bold uppercase tracking-widest text-sm border-b border-[#333] pb-2">
                              {category.name}
                            </h3>
                            <ul className="space-y-2">
                              {category.subcategories.map((sub) => (
                                <li key={sub.id}>
                                  <Link
                                    href={getSubcategoryUrl(category.slug, sub.slug)}
                                    className="text-white/80 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                                  >
                                    <span className="group-hover:translate-x-1 transition-transform">{sub.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={getCategoryUrl(category.slug)}
                              className="inline-flex items-center text-xs text-primary font-bold uppercase tracking-wider hover:underline mt-2"
                            >
                              View All {category.name} <ChevronRight className="h-3 w-3 ml-1" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="font-athletic uppercase text-sm tracking-widest hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-athletic uppercase text-sm tracking-widest hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-800 text-sm px-4 py-2 rounded-full w-48 focus:w-64 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-neutral-400 hover:text-primary transition-colors" />
              </button>
            </form>
            
            <Link href="/cart" className="relative hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link href="/login" className="hover:text-primary transition-colors">
              <User className="h-6 w-6" />
            </Link>

            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-neutral-900 border-t border-neutral-800"
          >
            <div className="p-4 space-y-2">
              <Link
                href="/"
                className="block font-athletic uppercase text-lg tracking-widest py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block font-athletic uppercase text-lg tracking-widest py-3 text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              
              {/* Mobile Accordion Categories */}
              {categories.map((category) => (
                <div key={category.id} className="border-b border-neutral-800">
                  <button
                    className="w-full flex items-center justify-between py-3 font-athletic uppercase text-lg tracking-widest"
                    onClick={() => setMobileExpandedCategory(
                      mobileExpandedCategory === category.slug ? null : category.slug
                    )}
                  >
                    {category.name}
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform ${mobileExpandedCategory === category.slug ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpandedCategory === category.slug && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-3 space-y-2">
                          <Link
                            href={getCategoryUrl(category.slug)}
                            className="block text-sm text-primary font-bold py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            All {category.name}
                          </Link>
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={getSubcategoryUrl(category.slug, sub.slug)}
                              className="block text-sm text-neutral-400 hover:text-white py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <Link
                href="/about"
                className="block font-athletic uppercase text-lg tracking-widest py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block font-athletic uppercase text-lg tracking-widest py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
