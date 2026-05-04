'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Send, ChevronRight, Globe, Info, DollarSign, Tag, Image as ImageIcon, Search, Loader2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import VariantBuilder from './VariantBuilder';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description is too short'),
  category: z.string().min(1, 'Category is required'),
  retailPrice: z.number().min(0),
  costPrice: z.number().min(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  status: z.enum(['active', 'draft', 'archived']),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [view360, setView360] = useState<string[]>(initialData?.view360 || []);
  const [variants, setVariants] = useState<any[]>(initialData?.variants || []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      status: 'draft',
      retailPrice: 0,
      costPrice: 0,
    }
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading('Publishing product...');
    
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, images, view360, variants }),
      });

      if (!response.ok) throw new Error('Failed to publish product');

      toast.success('Product published successfully!', { id: loadingToast });
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const name = watch('name');
  React.useEffect(() => {
    if (name && !initialData) {
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setValue('slug', slug);
    }
  }, [name, setValue, initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      <div className="flex items-center justify-between sticky top-[64px] bg-[#0F0F0F]/80 backdrop-blur-md py-4 z-30 border-b border-[#1A1A1A] -mx-8 px-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-sm text-gray-500">
            {initialData ? `Editing ${initialData.name}` : 'Fill in the details to create a new product'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#1A1A1A] border border-[#333] text-white rounded-lg hover:bg-[#222] transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            Save Draft
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#E84118] text-white rounded-lg hover:bg-[#ff5a36] transition-colors text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#E84118]/20 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info & Pricing */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4 mb-6">
              <Info className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                <input 
                  {...register('name')}
                  placeholder="e.g. Premium Leather Gloves"
                  className={`w-full bg-[#0F0F0F] border ${errors.name ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] transition-colors`}
                />
                {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Slug (Auto-generated)</label>
                <input 
                  {...register('slug')}
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-gray-400 focus:outline-none"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
              <textarea 
                {...register('description')}
                rows={5}
                placeholder="Describe your product in detail..."
                className={`w-full bg-[#0F0F0F] border ${errors.description ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] transition-colors resize-none`}
              />
              {errors.description && <p className="text-red-500 text-[10px]">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
              <select 
                {...register('category')}
                className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] transition-colors appearance-none"
              >
                <option value="">Select Category</option>
                <option value="sportswear">Sportswear</option>
                <option value="casual-wear">Casual Wear</option>
                <option value="gloves">Gloves</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4 mb-6">
              <DollarSign className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Pricing & Cost</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Retail Price ($)</label>
                <input 
                  type="number"
                  step="0.01"
                  {...register('retailPrice', { valueAsNumber: true })}
                  className={`w-full bg-[#0F0F0F] border ${errors.retailPrice ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] transition-colors`}
                />
                {errors.retailPrice && <p className="text-red-500 text-[10px]">{errors.retailPrice.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Cost Price ($)</label>
                <input 
                  type="number"
                  step="0.01"
                  {...register('costPrice', { valueAsNumber: true })}
                  className={`w-full bg-[#0F0F0F] border ${errors.costPrice ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] transition-colors`}
                />
                {errors.costPrice && <p className="text-red-500 text-[10px]">{errors.costPrice.message}</p>}
              </div>
            </div>
          </section>

          {/* Variants */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
            <VariantBuilder variants={variants} onChange={setVariants} />
          </section>
        </div>

        {/* Right Column: Images, SEO, Status */}
        <div className="space-y-8">
          {/* Status */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4 mb-6">
              <Tag className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Status & Visibility</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#0F0F0F] border border-[#333] rounded-lg">
                <span className="text-sm font-medium text-gray-300">Product Status</span>
                <select 
                  {...register('status')}
                  className="bg-transparent text-sm font-bold text-[#E84118] focus:outline-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-8">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4 mb-2">
              <ImageIcon className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Media Assets</h2>
            </div>
            
            <ImageUploader images={images} onChange={setImages} />
            <div className="pt-4 border-t border-[#333]">
              <ImageUploader 
                images={view360} 
                onChange={setView360} 
                label="360° Images" 
                maxImages={36} 
                is360={true}
              />
            </div>
          </section>

          {/* SEO */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4 mb-6">
              <Search className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">SEO Configuration</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Meta Title</label>
                <input 
                  {...register('metaTitle')}
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E84118]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Meta Description</label>
                <textarea 
                  {...register('metaDescription')}
                  rows={3}
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E84118] resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Keywords</label>
                <input 
                  {...register('keywords')}
                  placeholder="comma, separated, values"
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E84118]"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;

// Helper icons for the form that were missing
function Trash2({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  );
}
