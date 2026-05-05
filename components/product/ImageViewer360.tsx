"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Rotate3d, Maximize, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageViewer360Props {
  productImages?: string[];
}

export default function ImageViewer360({ productImages = [] }: ImageViewer360Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [is360, setIs360] = useState(false);
  const [rotation, setRotation] = useState(0);

  const images = productImages.length > 0 ? productImages : [
    "/images/product-placeholder.jpg",
    "/images/product-placeholder-2.jpg",
    "/images/product-placeholder-3.jpg",
    "/images/product-placeholder-4.jpg",
    "/images/product-placeholder-5.jpg",
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Main Display */}
      <div className="relative aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden group border border-neutral-100">
        {!is360 ? (
          <motion.div 
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative"
          >
            <Image 
              src={images[activeImage]} 
              alt="Product" 
              fill 
              className="object-cover"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden">
            <motion.div 
              style={{ rotateY: rotation, perspective: 1000 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={(_, info) => setRotation(prev => prev + info.delta.x)}
              className="relative w-80 h-96 shadow-2xl rounded-2xl overflow-hidden bg-white"
            >
              <Image 
                src={images[0]} 
                alt="360 Product" 
                fill 
                className="object-contain p-4"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none" />
            </motion.div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-primary animate-pulse">Drag horizontally to rotate 360°</p>
          </div>
        )}

        {/* Floating Controls */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
          <button 
            onClick={() => setIs360(!is360)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-xl transition-all ${
              is360 ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-neutral-100'
            }`}
          >
            <Rotate3d className="h-4 w-4" />
            <span>360° View</span>
          </button>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
            <ZoomIn className="h-5 w-5" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
            <Maximize className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between md:hidden pointer-events-none">
          <button className="bg-white/50 backdrop-blur-sm p-2 rounded-full pointer-events-auto"><ChevronLeft className="h-6 w-6" /></button>
          <button className="bg-white/50 backdrop-blur-sm p-2 rounded-full pointer-events-auto"><ChevronRight className="h-6 w-6" /></button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setActiveImage(i); setIs360(false); }}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative ${
              activeImage === i && !is360 ? 'border-primary scale-105 shadow-lg' : 'border-neutral-100 hover:border-neutral-300'
            }`}
          >
            <div className="absolute inset-0 bg-neutral-100" />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">
              {i + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
