import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Recent Products ---')
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: { name: true, slug: true, isFeatured: true, images: true, createdAt: true }
  })
  console.log(JSON.stringify(products, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
