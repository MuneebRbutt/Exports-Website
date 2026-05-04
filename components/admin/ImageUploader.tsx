'use client';

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, RotateCcw } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  is360?: boolean;
}

const ImageUploader = ({ images, onChange, maxImages = 8, label = "Product Images", is360 = false }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{label}</label>
        <span className="text-xs text-gray-500">{images.length} / {maxImages}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative aspect-square bg-[#0F0F0F] border border-[#333] rounded-xl overflow-hidden group">
            <img src={src} alt={`Upload ${index}`} className="w-full h-full object-cover" />
            <button 
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
            {index === 0 && !is360 && (
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#E84118] text-white text-[10px] font-bold rounded">
                MAIN
              </div>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <label className={`
            aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
            ${isDragging ? 'border-[#E84118] bg-[#E84118]/5' : 'border-[#333] hover:border-[#E84118]/50 hover:bg-[#1A1A1A]'}
          `}>
            {is360 ? <RotateCcw size={24} className="text-gray-500" /> : <Upload size={24} className="text-gray-500" />}
            <span className="text-xs font-medium text-gray-400">
              {is360 ? 'Add 360° View' : 'Upload Image'}
            </span>
            <input 
              type="file" 
              className="hidden" 
              multiple 
              accept="image/*"
              onChange={(e) => {
                // Mock upload for now
                const files = Array.from(e.target.files || []);
                const mockUrls = files.map(f => URL.createObjectURL(f));
                onChange([...images, ...mockUrls].slice(0, maxImages));
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
