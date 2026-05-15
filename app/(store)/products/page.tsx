export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategoryBySlug, getSubcategoryUrl } from "@/lib/data/categories";
import ProductCatalogClient from "@/components/product/ProductCatalogClient";

export default async function ProductCatalog({ 
  params,
  searchParams 
}: { 
  params?: { category?: string };
  searchParams: { search?: string; category?: string; page?: string }
}) {
  const search = searchParams.search || "";
  const categorySlug = params?.category || searchParams.category || "";
  const page = parseInt(searchParams.page || "1");
  const pageSize = 24;

  // Build where clause
  const where: any = {
    isActive: true,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (categorySlug) {
    where.category = {
      slug: categorySlug
    };
  }

  // Fetch real products from database
  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const totalCount = await prisma.product.count({ where });

  const categoryTitle = categorySlug 
    ? `${categorySlug.replace(/-/g, ' ').toUpperCase()} COLLECTION`
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
                {categorySlug && (
                  <>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-primary">{categorySlug}</span>
                  </>
                )}
              </nav>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-athletic italic font-bold leading-none tracking-tighter">
                {categoryTitle}
              </h1>
            </div>
            <div className="text-neutral-400 font-medium">
              <span className="text-white text-2xl font-athletic">{totalCount}</span> Products Found
            </div>
          </div>
        </div>

        {/* Subcategory Filter Chips */}
        {categorySlug && (
          <div className="container mx-auto px-4 mt-8">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/products/${categorySlug}`}
                className="px-4 py-2 bg-white/10 hover:bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-full transition-colors"
              >
                All
              </Link>
              {getCategoryBySlug(categorySlug)?.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={getSubcategoryUrl(categorySlug, sub.slug)}
                  className="px-4 py-2 bg-white/5 hover:bg-primary text-white/80 hover:text-white text-sm font-bold uppercase tracking-wider rounded-full transition-colors"
                >
                  {sub.name}
                </Link>
              )) || null}
            </div>
          </div>
        )}
      </section>

      <ProductCatalogClient products={products} totalCount={totalCount} currentPage={page} />
    </div>
  );
}
