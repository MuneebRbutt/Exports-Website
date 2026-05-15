import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Feature the first 6 products
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  for (const p of products) {
    await prisma.product.update({
      where: { id: p.id },
      data: { isFeatured: true }
    });
  }
  
  console.log(`Featured ${products.length} products.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
