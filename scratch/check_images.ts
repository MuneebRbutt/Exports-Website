import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Categories ---')
  const categories = await prisma.category.findMany({
    take: 5,
    select: { name: true, image: true }
  })
  console.log(JSON.stringify(categories, null, 2))

  console.log('\n--- Products ---')
  const products = await prisma.product.findMany({
    take: 5,
    select: { name: true, images: true }
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
