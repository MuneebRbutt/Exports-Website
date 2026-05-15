import { prisma } from "./lib/prisma.js";

async function main() {
  const productCount = await prisma.product.count();
  const featuredCount = await prisma.product.count({ where: { isFeatured: true } });
  const categoryCount = await prisma.category.count();
  const topCategoryCount = await prisma.category.count({ where: { parentId: null } });

  console.log({
    productCount,
    featuredCount,
    categoryCount,
    topCategoryCount
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
