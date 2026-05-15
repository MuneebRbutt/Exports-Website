import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { slug: 'sportswear', image: '/images/categories/sportswear.png' },
    { slug: 'casual-wear', image: '/images/categories/casual-wear.png' },
    { slug: 'gloves', image: '/images/categories/gloves.png' },
    { slug: 'accessories', image: '/images/categories/accessories.png' }
  ];

  for (const update of updates) {
    await prisma.category.updateMany({
      where: { slug: update.slug },
      data: { image: update.image }
    });
  }
  
  console.log("Updated category images successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
