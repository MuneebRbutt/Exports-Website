"use client";

import { useState } from "react";
import { 
  Grid3X3, 
  LayoutGrid, 
  List, 
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import { useFilters } from "@/hooks/useFilters";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductCatalogClientProps {
  products: any[];
  totalCount: number;
  currentPage: number;
}

export default function ProductCatalogClient({ products, totalCount, currentPage }: ProductCatalogClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = useFilters();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalCount / 24);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* FILTER SIDEBAR (Desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-grow">
          {/* SORT & VIEW CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-100 gap-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 bg-neutral-100 px-4 py-2 rounded-lg text-sm font-bold"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <div className="flex items-center space-x-2 bg-neutral-100 p-1 rounded-lg">
                <button 
                  onClick={() => filters.setViewMode('GRID4')}
                  className={`p-2 rounded-md ${filters.viewMode === 'GRID4' ? 'bg-white shadow-sm' : 'text-neutral-400'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => filters.setViewMode('GRID2')}
                  className={`p-2 rounded-md ${filters.viewMode === 'GRID2' ? 'bg-white shadow-sm' : 'text-neutral-400'}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => filters.setViewMode('LIST')}
                  className={`p-2 rounded-md ${filters.viewMode === 'LIST' ? 'bg-white shadow-sm' : 'text-neutral-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select 
                className="bg-transparent text-sm font-bold uppercase tracking-widest focus:outline-none cursor-pointer"
                value={filters.sortBy}
                onChange={(e) => filters.setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="low-high">Price: Low-High</option>
                <option value="high-low">Price: High-Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className={`grid gap-6 ${
            filters.viewMode === 'GRID4' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' :
            filters.viewMode === 'GRID2' ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1'
          }`}>
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard product={product} viewMode={filters.viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
            {products.length === 0 && (
               <div className="col-span-full py-20 text-center">
                  <p className="text-neutral-500 text-lg">No products found matching your search.</p>
               </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
              <p className="text-sm text-neutral-500">
                Showing {(currentPage - 1) * 24 + 1}-{Math.min(currentPage * 24, totalCount)} of {totalCount} products
              </p>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 border rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold border transition-colors ${
                      currentPage === i + 1 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'hover:border-dark'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  className="p-2 border rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] lg:hidden overflow-y-auto"
            >
              <FilterSidebar isMobile onClose={() => setIsFilterOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
