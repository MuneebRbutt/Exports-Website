"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Sportswear", href: "/products/sportswear" },
    { name: "Casual Wear", href: "/products/casual-wear" },
    { name: "Gloves", href: "/products/gloves" },
    { name: "Accessories", href: "/products/accessories" },
    { name: "B2B Export", href: "/export-inquiry" },
  ];

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

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-athletic uppercase text-sm tracking-widest hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-neutral-800 text-sm px-4 py-2 rounded-full w-48 focus:w-64 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-neutral-400" />
            </div>
            
            <Link href="/cart" className="relative hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                0
              </span>
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
      {isMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-t border-neutral-800 p-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-athletic uppercase text-lg tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
