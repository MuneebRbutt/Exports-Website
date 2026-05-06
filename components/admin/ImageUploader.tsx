'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, RotateCcw, Loader2, CheckCircle } from 'lucide-react';

interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  is360?: boolean;
  category?: string;
}

const ImageUploader = ({ 
  images, 
  onChange, 
  maxImages = 8, 
  label = "Product Images", 
  is360 = false,
  category = 'sportswear'
}: ImageUploaderProps) => {
  // Use a default category if none provided or empty
  const uploadCategory = category && category !== '' ? category : 'sportswear';
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToUpload = fileArray.slice(0, remainingSlots);

    console.log('Starting upload:', { fileCount: filesToUpload.length, category: uploadCategory, is360 });

    if (filesToUpload.length === 0) return;

    setUploading(true);
    const newUploadProgress: { [key: string]: number } = {};

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        console.log('Uploading file:', file.name, file.type, file.size);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', is360 ? '360' : uploadCategory);

        console.log('Sending request to /api/upload with category:', is360 ? '360' : uploadCategory);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        console.log('Response status:', response.status);
        
        const result = await response.json();
        console.log('Response data:', result);

        if (!response.ok) {
          console.error('Upload failed with error:', result);
          throw new Error(result.error || result.details || 'Upload failed');
        }

        return result;
      });

      const results = await Promise.all(uploadPromises);
      
      const newUrls = results.map(r => r.url);
      setUploadedImages(prev => [...prev, ...results]);
      onChange([...images, ...newUrls]);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const handleRemove = async (index: number) => {
    const newImages = [...images];
    const removedUrl = newImages[index];
    newImages.splice(index, 1);
    onChange(newImages);

    // Try to delete from Cloudinary if we have the publicId
    const uploadedImage = uploadedImages.find(img => img.url === removedUrl);
    if (uploadedImage) {
      try {
        await fetch('/api/upload/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: uploadedImage.publicId }),
        });
        setUploadedImages(prev => prev.filter(img => img.url !== removedUrl));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
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
            
            {/* Delete button */}
            <button 
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
            
            {/* Main badge for first image */}
            {index === 0 && !is360 && (
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#E84118] text-white text-[10px] font-bold rounded">
                MAIN
              </div>
            )}
            
            {/* Sequence number for 360 images */}
            {is360 && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#E84118] text-white text-[10px] font-bold rounded">
                #{index + 1}
              </div>
            )}
          </div>
        ))}

        {/* Upload skeleton when uploading */}
        {uploading && (
          <div className="aspect-square bg-[#0F0F0F] border border-[#333] rounded-xl flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-[#E84118] animate-spin" />
            <span className="text-xs text-gray-400">Uploading...</span>
          </div>
        )}

        {/* Upload button */}
        {images.length < maxImages && !uploading && (
          <label className="aspect-square border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:border-[#E84118]/50 hover:bg-[#1A1A1A]">
            {is360 ? <RotateCcw size={24} className="text-gray-500" /> : <Upload size={24} className="text-gray-500" />}
            <span className="text-xs font-medium text-gray-400">
              {is360 ? 'Add 360° View' : 'Upload Image'}
            </span>
            <input 
              type="file" 
              className="hidden" 
              multiple 
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={(e) => {
                if (e.target.files) {
                  handleUpload(e.target.files);
                }
              }}
            />
          </label>
        )}
      </div>

      {/* Show uploaded Cloudinary URLs */}
      {uploadedImages.length > 0 && (
        <div className="mt-4 p-3 bg-[#0F0F0F] border border-[#333] rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-xs font-medium text-gray-400">Uploaded to Cloudinary</span>
          </div>
          <div className="space-y-1">
            {uploadedImages.map((img, idx) => (
              <div key={idx} className="text-[10px] text-gray-500 break-all font-mono">
                {img.url}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
