import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const total = await prisma.product.count();
  const featured = await prisma.product.count({ where: { isFeatured: true } });
  const active = await prisma.product.count({ where: { isActive: true } });
  console.log('Total products:', total);
  console.log('Featured products:', featured);
  console.log('Active products:', active);

  // Check product with variants
  const products = await prisma.product.findMany({
    take: 3,
    include: { category: true, variants: true }
  });
  for (const p of products) {
    console.log(`\nProduct: ${p.name}`);
    console.log(`  Category: ${p.category.name}`);
    console.log(`  Variants: ${p.variants.length}`);
    console.log(`  Images: ${p.images.length}`);
    console.log(`  isFeatured: ${p.isFeatured}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
