import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true, variants: true }
  });
  console.log("Total Products:", products.length);
  if (products.length > 0) {
     console.log("Sample product:", JSON.stringify(products[0], null, 2));
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
