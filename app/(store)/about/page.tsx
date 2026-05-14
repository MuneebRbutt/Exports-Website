"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "30+", label: "Countries Exported" },
  { value: "500+", label: "Products Available" },
  { value: "100%", label: "Quality Checked" },
];

const offerings = [
  {
    icon: "👕",
    title: "SPORTSWEAR",
    text: "Soccer, American Football, Basketball, Baseball uniforms and Padel Tennis wear. Custom team kits available.",
  },
  {
    icon: "👔",
    title: "CASUAL WEAR",
    text: "Hoodies, T-Shirts, Polo shirts, Sweatshirts, Tracksuits and Joggers. Perfect for retail and bulk orders.",
  },
  {
    icon: "🥊",
    title: "GLOVES",
    text: "Boxing gloves, Soccer goalkeeper gloves and Working gloves. Professional grade quality.",
  },
  {
    icon: "🎒",
    title: "ACCESSORIES",
    text: "Caps, Socks, Bags and Wristbands. Complete your sportswear collection.",
  },
];

const reasons = [
  {
    title: "Direct Factory Pricing",
    text: "No middlemen — get the best price directly from manufacturer",
  },
  {
    title: "Low Minimum Order Quantity",
    text: "Start with as low as 50 units. Perfect for small businesses",
  },
  {
    title: "Custom OEM & Private Label",
    text: "Your logo, your colors, your brand. We handle everything",
  },
  {
    title: "Global Shipping",
    text: "DHL and FedEx delivery to 30+ countries worldwide",
  },
  {
    title: "Quality Inspection",
    text: "Every order inspected before dispatch. 100% quality guaranteed",
  },
  {
    title: "Fast Production",
    text: "7-14 days production time. On-time delivery guaranteed",
  },
];

const values = [
  {
    title: "QUALITY FIRST",
    text: "We never compromise on quality. Every product meets international export standards.",
  },
  {
    title: "CUSTOMER TRUST",
    text: "Building long-term relationships with our global buyers through transparency and reliability.",
  },
  {
    title: "INNOVATION",
    text: "Constantly updating our designs and manufacturing processes to stay ahead of market trends.",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen">
      {/* SECTION 1 — HERO BANNER */}
      <section className="relative py-20 bg-neutral-900 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center space-x-2 text-sm text-neutral-400 mb-6 font-body">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">About</span>
          </nav>
          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-7xl font-athletic font-bold italic tracking-tighter mb-4"
          >
            ABOUT <span className="text-primary">MEHARSTARE</span>
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 font-body max-w-2xl"
          >
            Premium Sportswear & Casualwear Manufacturer from Pakistan
          </motion.p>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary opacity-5 skew-x-12 translate-x-1/2" />
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-athletic font-bold mb-8 tracking-tight">OUR STORY</h2>
            <div className="space-y-6 text-neutral-300 font-body leading-relaxed">
              <p>
                Meharstare is a Pakistan-based manufacturer and exporter of premium quality 
                sportswear, casualwear, gloves and accessories. With years of experience 
                in the industry, we have built a reputation for delivering export-quality 
                products to buyers across the Middle East, Europe, USA and Canada.
              </p>
              <p>
                We work directly with brands, teams, clubs and wholesale buyers worldwide, 
                offering competitive factory pricing, low minimum order quantities and 
                full OEM/custom branding services.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#242424] p-8 rounded-xl text-center border border-neutral-800 hover:border-primary/50 transition-colors group"
              >
                <div className="text-4xl font-athletic font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm font-athletic uppercase tracking-widest text-neutral-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT WE OFFER */}
      <section className="py-24 bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            {...fadeIn}
            className="text-4xl font-athletic font-bold text-center mb-16 tracking-tight"
          >
            WHAT WE OFFER
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#242424] p-8 rounded-2xl border border-neutral-800 hover:border-primary transition-all group"
              >
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-athletic font-bold mb-4 tracking-wide group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 font-body text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY CHOOSE US */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <motion.h2 
            {...fadeIn}
            className="text-4xl font-athletic font-bold text-center mb-16 tracking-tight"
          >
            WHY CHOOSE MEHARSTARE?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white/20 p-2 rounded-lg mt-1">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-athletic font-bold mb-1">{reason.title}</h3>
                  <p className="text-white/80 font-body text-sm">{reason.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — OUR VALUES */}
      <section className="py-24 container mx-auto px-4">
        <motion.h2 
          {...fadeIn}
          className="text-4xl font-athletic font-bold text-center mb-16 tracking-tight"
        >
          OUR VALUES
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              {...fadeIn}
              transition={{ delay: index * 0.1 }}
              className="bg-[#242424] p-10 rounded-3xl border border-neutral-800 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
              <h3 className="text-2xl font-athletic font-bold mb-6 text-primary">{value.title}</h3>
              <p className="text-neutral-300 font-body leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — CTA BANNER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            {...fadeIn}
            className="text-4xl md:text-5xl font-athletic font-bold mb-6 italic"
          >
            READY TO START EXPORTING?
          </motion.h2>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-xl mb-10 text-white/90 font-body"
          >
            Contact us today for a free quote and product samples
          </motion.p>
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              href="/contact" 
              className="bg-white text-primary px-10 py-4 rounded-full font-athletic font-bold uppercase tracking-widest hover:bg-neutral-100 transition-all text-lg"
            >
              GET EXPORT QUOTE
            </Link>
            <Link 
              href="/products" 
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-athletic font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-lg"
            >
              BROWSE PRODUCTS
            </Link>
          </motion.div>
        </div>
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-20" />
        </div>
      </section>
    </div>
  );
}
