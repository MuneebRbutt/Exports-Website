"use client";

import { useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { X, ChevronDown, ChevronRight, Check } from "lucide-react";
import { categories } from "@/lib/data/categories";

export default function FilterSidebar({ isMobile = false, onClose = () => {} }: { isMobile?: boolean; onClose?: () => void }) {
  const filters = useFilters();
  const [expandedParents, setExpandedParents] = useState<string[]>([]);

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

  const toggleParent = (slug: string) => {
    setExpandedParents(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    filters.setCategories(next);
  };

  const isParentChecked = (parentSlug: string) => {
    const parent = categories.find(c => c.slug === parentSlug);
    if (!parent) return false;
    const subSlugs = parent.subcategories.map(s => s.slug);
    return subSlugs.every(s => filters.categories.includes(s));
  };

  const isParentIndeterminate = (parentSlug: string) => {
    const parent = categories.find(c => c.slug === parentSlug);
    if (!parent) return false;
    const subSlugs = parent.subcategories.map(s => s.slug);
    const checkedCount = subSlugs.filter(s => filters.categories.includes(s)).length;
    return checkedCount > 0 && checkedCount < subSlugs.length;
  };

  const toggleParentAll = (parentSlug: string) => {
    const parent = categories.find(c => c.slug === parentSlug);
    if (!parent) return;
    const subSlugs = parent.subcategories.map(s => s.slug);
    const allChecked = subSlugs.every(s => filters.categories.includes(s));
    
    if (allChecked) {
      // Uncheck all subcategories AND the parent
      filters.setCategories(filters.categories.filter(c => !subSlugs.includes(c) && c !== parentSlug));
    } else {
      // Check all - add subSlugs and parentSlug that aren't already in categories
      const toAdd = [...subSlugs, parentSlug].filter(s => !filters.categories.includes(s));
      filters.setCategories([...filters.categories, ...toAdd]);
    }
  };

  return (
    <div className={`flex flex-col space-y-10 ${isMobile ? 'p-6' : 'w-full'}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-athletic font-bold italic uppercase tracking-tighter">Filters</h2>
          <button onClick={onClose}><X className="h-6 w-6" /></button>
        </div>
      )}

      {/* Categories - Hierarchical Accordion */}
      <div className="space-y-4">
        <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2 flex justify-between items-center">
          Categories
        </h4>
        <div className="space-y-1">
          {categories.map((parent) => {
            const isExpanded = expandedParents.includes(parent.slug);
            const allChecked = isParentChecked(parent.slug);
            const indeterminate = isParentIndeterminate(parent.slug);

            return (
              <div key={parent.id} className="">
                {/* Parent header */}
                <div className="flex items-center space-x-2 py-2">
                  <button
                    onClick={() => toggleParentAll(parent.slug)}
                    className={`w-5 h-5 border-2 rounded transition-colors flex items-center justify-center ${
                      allChecked ? 'bg-primary border-primary' : indeterminate ? 'bg-primary/50 border-primary' : 'border-neutral-300 hover:border-primary'
                    }`}
                  >
                    {allChecked && <Check className="h-3 w-3 text-white" />}
                    {indeterminate && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </button>
                  <button
                    onClick={() => toggleParent(parent.slug)}
                    className="flex items-center flex-1 text-sm font-bold text-dark hover:text-primary transition-colors"
                  >
                    {parent.name}
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Subcategories */}
                {isExpanded && (
                  <div className="pl-7 space-y-1">
                    {parent.subcategories.map((sub) => (
                      <label key={sub.id} className="flex items-center space-x-3 cursor-pointer group py-1">
                        <div
                          className={`w-4 h-4 border-2 rounded transition-colors flex items-center justify-center ${
                            filters.categories.includes(sub.slug) ? 'bg-primary border-primary' : 'border-neutral-300 group-hover:border-primary'
                          }`}
                          onClick={() => toggleCategory(sub.slug)}
                        >
                          {filters.categories.includes(sub.slug) && <Check className="h-2.5 w-2.5 text-white" />}
                        </div>
                        <span className="text-sm text-neutral-600 group-hover:text-dark">{sub.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
