"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Grid3X3, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  X, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import { useFilters } from "@/hooks/useFilters";

export default function ProductCatalog({ params }: { params?: { category?: string } }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const filters = useFilters();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          const activeCategory = params?.category?.toLowerCase();
          const filtered = activeCategory 
            ? result.data.filter((p: any) => p.category.toLowerCase() === activeCategory)
            : result.data;
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [params?.category]);

  const activeCategory = params?.category?.toLowerCase();
  const categoryTitle = activeCategory 
    ? `${activeCategory.replace('-', ' ').toUpperCase()} COLLECTION`
    : "ALL MEHARSTARE PRODUCTS";

  return (
    <div className="bg-white min-h-screen">
      {/* 1. PAGE HEADER BANNER */}
      <section className="bg-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-neutral-500 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-white cursor-pointer">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/products" className="hover:text-white cursor-pointer">Products</Link>
                {activeCategory && (
                  <>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-primary">{activeCategory}</span>
                  </>
                )}
              </nav>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-athletic italic font-bold leading-none tracking-tighter">
                {categoryTitle}
              </h1>
            </div>
            <div className="text-neutral-400 font-medium">
              <span className="text-white text-2xl font-athletic">{products.length}</span> Products Found
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 2. FILTER SIDEBAR (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-grow">
            {/* 3. SORT & VIEW CONTROLS */}
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

            {/* Active Filter Tags */}
            {(filters.categories.length > 0 || filters.sizes.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-8">
                {filters.categories.map(cat => (
                  <span key={cat} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {cat} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => filters.setCategories(filters.categories.filter(c => c !== cat))} />
                  </span>
                ))}
                {filters.sizes.map(size => (
                  <span key={size} className="flex items-center space-x-2 bg-dark/10 text-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {size} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => filters.setSizes(filters.sizes.filter(s => s !== size))} />
                  </span>
                ))}
              </div>
            )}

            {/* 4. PRODUCT GRID */}
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
            </div>

            {/* 5. PAGINATION */}
            <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
              <p className="text-sm text-neutral-500">Showing 1-12 of 128 products</p>
              <div className="flex items-center space-x-2">
                <button className="p-2 border rounded-lg hover:bg-neutral-50 disabled:opacity-50" disabled>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {[1, 2, 3, '...', 11].map((page, i) => (
                  <button 
                    key={i}
                    className={`w-10 h-10 rounded-lg text-sm font-bold border transition-colors ${
                      page === 1 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'hover:border-dark'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 border rounded-lg hover:bg-neutral-50">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. CATEGORY QUICK LINKS */}
      <section className="py-20 border-t bg-neutral-50">
        <div className="container mx-auto px-4">
          <h4 className="font-athletic italic font-bold uppercase tracking-widest text-dark mb-8">Browse by Category</h4>
          <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
            {[
              { name: "Sportswear", count: 48, href: "/products/sportswear" },
              { name: "Casual Wear", count: 32, href: "/products/casual-wear" },
              { name: "Gloves", count: 24, href: "/products/gloves" },
              { name: "Accessories", count: 24, href: "/products/accessories" }
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="flex-shrink-0 bg-white border border-neutral-100 p-6 rounded-2xl w-64 group hover:border-primary transition-colors"
              >
                <h5 className="text-xl font-athletic italic font-bold uppercase group-hover:text-primary transition-colors">{link.name}</h5>
                <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">{link.count} Products Available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
