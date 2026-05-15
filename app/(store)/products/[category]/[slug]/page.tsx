import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategoryUrl } from "@/lib/utils/urls";
import ImageViewer from "@/components/product/ImageViewer";
import ProductInfo from "@/components/product/ProductInfo";
import BulkPricingTable from "@/components/product/BulkPricingTable";
import ReviewsList from "@/components/product/ReviewsList";

export default async function ProductDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  // Fetch single product by slug
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      variants: true,
      category: true,
      reviews: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-xs text-neutral-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-dark cursor-pointer">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-dark cursor-pointer">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={getCategoryUrl(params.category)} className="hover:text-dark cursor-pointer">
              {product.category?.name || params.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-dark font-bold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Product Images */}
          <ImageViewer images={product.images} />

          {/* Product Info & Actions */}
          <div className="space-y-10">
            <ProductInfo product={product} />
            
            {/* Bulk Pricing Section */}
            <BulkPricingTable tiers={(product as any).moqTiers} />
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsList reviews={product.reviews} />
      </div>
    </div>
  );
}
