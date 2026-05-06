"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Search, PackageX } from "lucide-react";
import Link from "next/link";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          const filtered = result.data.filter((product: any) => 
            product.name.toLowerCase().includes(query) || 
            product.description?.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
          );
          setResults(filtered);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-neutral-400 mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Search</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-athletic italic font-bold tracking-tighter uppercase">
            Results for: <span className="text-primary">"{query}"</span>
          </h1>
          <p className="mt-4 text-neutral-400">
            Found {results.length} products matching your search
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
            <PackageX className="h-16 w-16 text-neutral-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-dark mb-2 uppercase">No Products Found</h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try checking your spelling or using more general keywords.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
