import { prisma } from "@/lib/prisma";
import ProductCatalogClient from "@/components/product/ProductCatalogClient";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategoryBySlug, getSubcategoryUrl } from "@/lib/data/categories";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: {
        slug: params.category
      }
    },
    include: { 
      variants: true, 
      category: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  const category = getCategoryBySlug(params.category);
  const categoryTitle = category?.name?.toUpperCase() || params.category.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="bg-white min-h-screen">
      {/* PAGE HEADER BANNER */}
      <section className="bg-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-neutral-500 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-white cursor-pointer">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/products" className="hover:text-white cursor-pointer">Products</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-primary">{params.category}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-athletic italic font-bold leading-none tracking-tighter">
                {categoryTitle} COLLECTION
              </h1>
            </div>
            <div className="text-neutral-400 font-medium">
              <span className="text-white text-2xl font-athletic">{products.length}</span> Products Found
            </div>
          </div>
        </div>

        {/* Subcategory Filter Chips */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/products/${params.category}`}
              className="px-4 py-2 bg-white/10 hover:bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-full transition-colors"
            >
              All
            </Link>
            {category?.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={getSubcategoryUrl(params.category, sub.slug)}
                className="px-4 py-2 bg-white/5 hover:bg-primary text-white/80 hover:text-white text-sm font-bold uppercase tracking-wider rounded-full transition-colors"
              >
                {sub.name}
              </Link>
            )) || null}
          </div>
        </div>
      </section>

      {products.length === 0 ? (
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">No products in this category yet</h2>
          <Link href="/products" className="text-primary font-bold hover:underline">
            Browse all products
          </Link>
        </div>
      ) : (
        <ProductCatalogClient products={products} totalCount={products.length} currentPage={1} />
      )}
    </div>
  );
}
