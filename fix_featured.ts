import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Mark all active products as featured (up to 6)
  const activeProducts = await prisma.product.findMany({
    where: { isActive: true },
    take: 6
  });
  
  for (const p of activeProducts) {
    await prisma.product.update({
      where: { id: p.id },
      data: { isFeatured: true }
    });
  }
  
  // Also make sure all products are active
  await prisma.product.updateMany({
    data: { isActive: true }
  });

  console.log(`Marked ${activeProducts.length} products as featured.`);
  
  const featured = await prisma.product.count({ where: { isFeatured: true } });
  console.log('Total featured now:', featured);
}

main().catch(console.error).finally(() => prisma.$disconnect());
