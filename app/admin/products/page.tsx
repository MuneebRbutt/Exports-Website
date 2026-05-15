export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export default async function ProductsPage() {
  // Fetch ALL products from database (including drafts)
  const products = await prisma.product.findMany({
    include: { 
      category: true,
      variants: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <AdminProductsClient initialProducts={products} />
    </div>
  );
}
