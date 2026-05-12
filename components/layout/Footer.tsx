import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone as WhatsApp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-athletic font-bold italic tracking-tighter text-white">
                MEHAR<span className="text-primary">STARE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Excellence in athletic performance gear. From Sialkot, Pakistan to the global stage, we deliver premium sportswear and equipment.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-athletic uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/products/sportswear" className="hover:text-white transition-colors">Sportswear</Link></li>
              <li><Link href="/products/casual-wear" className="hover:text-white transition-colors">Casual Wear</Link></li>
              <li><Link href="/products/gloves" className="hover:text-white transition-colors">Gloves</Link></li>
              <li><Link href="/products/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-white font-athletic uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Meharstare</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="text-white font-athletic uppercase tracking-widest mb-6">Global Contact</h4>
            <p className="text-sm mb-4">Sialkot Industrial Zone, Pakistan</p>
            <p className="text-sm mb-6 font-bold text-white">+92 321 6146452</p>
            <a 
              href="https://wa.me/923216146452" 
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors"
            >
              <WhatsApp className="h-5 w-5" />
              <span className="font-bold">Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Meharstare. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 italic">
            <span>ISO 9001 Certified</span>
            <span>CE Certified</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
