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
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import { useFilters } from "@/hooks/useFilters";
import { getCategoryBySlug, getSubcategoryBySlug } from "@/lib/data/categories";
import { getCategoryUrl } from "@/lib/utils/urls";

export default function SubcategoryPage({ params }: { params: { category: string; subcategory: string } }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const filters = useFilters();

  const category = getCategoryBySlug(params.category);
  const subcategory = getSubcategoryBySlug(params.category, params.subcategory);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          // Filter by subcategory (currently using category field as proxy since data may not have subcategory yet)
          const filtered = result.data.filter((p: any) => {
            const catMatch = p.category?.toLowerCase() === params.category.toLowerCase();
            // If product has subcategory, check it; otherwise show all in parent category
            if (p.subcategory) {
              return catMatch && p.subcategory?.toLowerCase() === params.subcategory.toLowerCase();
            }
            return catMatch;
          });
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [params.category, params.subcategory]);

  const categoryTitle = subcategory?.name?.toUpperCase() || params.subcategory.replace(/-/g, ' ').toUpperCase();
  const parentTitle = category?.name || params.category.replace(/-/g, ' ');

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header Banner */}
      <section className="bg-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-xs text-neutral-500 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-white cursor-pointer">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/products" className="hover:text-white cursor-pointer">Products</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href={getCategoryUrl(params.category)} className="hover:text-white cursor-pointer">
                  {parentTitle}
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-primary">{subcategory?.name || params.subcategory}</span>
              </nav>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-athletic italic font-bold leading-none tracking-tighter">
                {categoryTitle}
              </h1>
              <p className="text-neutral-400 mt-4 text-lg">
                Premium {subcategory?.name || params.subcategory} from Meharstare
              </p>
              <Link
                href={getCategoryUrl(params.category)}
                className="inline-flex items-center text-sm text-primary font-bold uppercase tracking-wider hover:underline mt-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> All {parentTitle}
              </Link>
            </div>
            <div className="text-neutral-400 font-medium">
              <span className="text-white text-2xl font-athletic">{products.length}</span> Products Found
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Sort & View Controls */}
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

            {/* Product Grid */}
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

            {products.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-neutral-400 text-lg">No products found in this subcategory.</p>
                <Link href={getCategoryUrl(params.category)} className="text-primary font-bold mt-4 inline-block hover:underline">
                  View all {parentTitle}
                </Link>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
              <p className="text-sm text-neutral-500">Showing {products.length} products</p>
            </div>
          </div>
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
