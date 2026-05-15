"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageViewer({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0] || "/images/product-placeholder.jpg");

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden shadow-inner">
        <Image
          src={mainImage}
          alt="Product Image"
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                mainImage === img ? 'border-primary' : 'border-transparent hover:border-neutral-300'
              }`}
              onClick={() => setMainImage(img)}
            >
              <Image src={img} alt={`Product thumbnail ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
