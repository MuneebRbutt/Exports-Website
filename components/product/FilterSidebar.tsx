"use client";

import { useFilters } from "@/hooks/useFilters";
import { X, ChevronDown, Check } from "lucide-react";

export default function FilterSidebar({ isMobile = false, onClose = () => {} }: { isMobile?: boolean; onClose?: () => void }) {
  const filters = useFilters();

  const categories = ["Sportswear", "Casual Wear", "Gloves", "Accessories"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#E84118" },
    { name: "Orange", hex: "#F97316" },
    { name: "Navy", hex: "#000080" },
    { name: "Green", hex: "#008000" },
    { name: "Grey", hex: "#808080" },
  ];
  const materials = ["Cotton", "Polyester", "Fleece", "Leather"];

  const toggleCategory = (cat: string) => {
    const slug = cat.toLowerCase().replace(/\s+/g, '-');
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    filters.setCategories(next);
  };

  return (
    <div className={`flex flex-col space-y-10 ${isMobile ? 'p-6' : 'w-full'}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-athletic font-bold italic uppercase tracking-tighter">Filters</h2>
          <button onClick={onClose}><X className="h-6 w-6" /></button>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2 flex justify-between items-center cursor-pointer">
          Categories <ChevronDown className="h-4 w-4" />
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, '-');
            return (
              <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                <div 
                  className={`w-5 h-5 border-2 rounded transition-colors flex items-center justify-center ${
                    filters.categories.includes(slug) ? 'bg-primary border-primary' : 'border-neutral-300 group-hover:border-primary'
                  }`}
                  onClick={() => toggleCategory(cat)}
                >
                  {filters.categories.includes(slug) && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="text-sm text-neutral-600 group-hover:text-dark">{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2">Size</h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                const next = filters.sizes.includes(size)
                  ? filters.sizes.filter((s) => s !== size)
                  : [...filters.sizes, size];
                filters.setSizes(next);
              }}
              className={`py-2 text-xs font-bold border transition-all rounded ${
                filters.sizes.includes(size) ? 'bg-dark text-white border-dark' : 'border-neutral-200 text-neutral-500 hover:border-dark'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                const next = filters.colors.includes(color.name)
                  ? filters.colors.filter((c) => c !== color.name)
                  : [...filters.colors, color.name];
                filters.setColors(next);
              }}
              className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                filters.colors.includes(color.name) ? 'border-primary' : 'border-transparent'
              }`}
              title={color.name}
            >
              <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2">Price Range</h4>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="500" 
            value={filters.priceRange[1]}
            onChange={(e) => filters.setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <span className="text-[10px] text-neutral-400 uppercase">Min</span>
              <div className="border border-neutral-200 px-3 py-2 text-sm">$0</div>
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-neutral-400 uppercase">Max</span>
              <div className="border border-neutral-200 px-3 py-2 text-sm">${filters.priceRange[1]}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Type */}
      <div className="space-y-4">
        <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2">Business Type</h4>
        <div className="flex flex-col space-y-2">
          {['ALL', 'RETAIL', 'EXPORT'].map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <div 
                className={`w-5 h-5 border-2 rounded-full transition-colors flex items-center justify-center ${
                  filters.productType === type ? 'bg-primary border-primary' : 'border-neutral-300 group-hover:border-primary'
                }`}
                onClick={() => filters.setProductType(type as any)}
              >
                {filters.productType === type && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm text-neutral-600 group-hover:text-dark">
                {type === 'ALL' ? 'All Products' : type === 'RETAIL' ? 'Retail (B2C)' : 'Export / Bulk (B2B)'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 space-y-3">
        {isMobile && (
          <button 
            onClick={onClose}
            className="w-full bg-primary text-white py-4 rounded-xl font-athletic font-bold uppercase tracking-widest shadow-lg"
          >
            Apply Filters
          </button>
        )}
        <button 
          onClick={filters.clearFilters}
          className="w-full text-primary font-bold uppercase text-xs tracking-widest hover:underline"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
