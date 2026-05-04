'use client';

import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
  sku: string;
  price?: number;
}

interface VariantBuilderProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

const VariantBuilder = ({ variants, onChange }: VariantBuilderProps) => {
  const addVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      size: '',
      color: '',
      stock: 0,
      sku: '',
    };
    onChange([...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    onChange(variants.filter(v => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Variant, value: any) => {
    onChange(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Product Variants</label>
        <button 
          type="button"
          onClick={addVariant}
          className="flex items-center gap-2 text-xs font-bold text-[#E84118] hover:text-[#ff5a36] transition-colors"
        >
          <Plus size={14} />
          ADD VARIANT
        </button>
      </div>

      <div className="bg-[#0F0F0F] border border-[#333] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1A1A1A] border-b border-[#333]">
            <tr>
              <th className="w-10"></th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Size</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Color</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Stock</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">SKU</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {variants.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500 italic">
                  No variants added yet.
                </td>
              </tr>
            ) : (
              variants.map((variant) => (
                <tr key={variant.id} className="group">
                  <td className="pl-4">
                    <GripVertical size={14} className="text-gray-700 group-hover:text-gray-500 cursor-move" />
                  </td>
                  <td className="px-2 py-3">
                    <input 
                      type="text" 
                      value={variant.size}
                      onChange={(e) => updateVariant(variant.id, 'size', e.target.value)}
                      placeholder="e.g. XL"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#E84118]"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <input 
                      type="text" 
                      value={variant.color}
                      onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                      placeholder="e.g. Red"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#E84118]"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <input 
                      type="number" 
                      value={variant.stock}
                      onChange={(e) => updateVariant(variant.id, 'stock', parseInt(e.target.value))}
                      placeholder="0"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#E84118]"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <input 
                      type="text" 
                      value={variant.sku}
                      onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                      placeholder="SKU-123"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#E84118]"
                    />
                  </td>
                  <td className="pr-4">
                    <button 
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="p-1.5 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantBuilder;
