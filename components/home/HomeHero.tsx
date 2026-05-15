"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default function HomeHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-dark overflow-hidden pt-20">
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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
