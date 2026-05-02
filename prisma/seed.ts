import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Meharstare Database...')

  // 1. Create Categories
  const categoriesData = [
    { name: 'SPORTSWEAR', slug: 'sportswear', description: 'High-performance athletic apparel for optimal movement.' },
    { name: 'CASUAL_WEAR', slug: 'casual-wear', description: 'Comfortable everyday wear with an athletic edge.' },
    { name: 'GLOVES', slug: 'gloves', description: 'Premium sports, boxing, and winter gloves.' },
    { name: 'ACCESSORIES', slug: 'accessories', description: 'Caps, socks, bags, and more essential gear.' }
  ]

  const categories = await Promise.all(
    categoriesData.map(c => prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    }))
  )

  const sportswear = categories.find(c => c.slug === 'sportswear')!
  const casual = categories.find(c => c.slug === 'casual-wear')!
  const gloves = categories.find(c => c.slug === 'gloves')!
  const accessories = categories.find(c => c.slug === 'accessories')!

  // 2. Create Products
  const products = [
    {
      name: 'Pro Elite Football Jersey',
      slug: 'pro-elite-football-jersey',
      description: 'Breathable, moisture-wicking football jersey designed for peak performance.',
      basePrice: 29.99,
      exportPrice: 15.00,
      images: ['/images/products/jersey-front.jpg', '/images/products/jersey-back.jpg'],
      categoryId: sportswear.id,
      isFeatured: true,
      variants: {
        create: [
          { size: 'M', color: 'Red', material: 'Polyester', sku: 'MS-JER-RED-M', stock: 100, price: 29.99 },
          { size: 'L', color: 'Red', material: 'Polyester', sku: 'MS-JER-RED-L', stock: 120, price: 29.99 },
          { size: 'M', color: 'Blue', material: 'Polyester', sku: 'MS-JER-BLU-M', stock: 80, price: 29.99 }
        ]
      }
    },
    {
      name: 'Urban Tech Hoodie',
      slug: 'urban-tech-hoodie',
      description: 'A sleek, versatile hoodie perfect for workouts or casual outings.',
      basePrice: 45.00,
      exportPrice: 22.50,
      images: ['/images/products/hoodie.jpg'],
      categoryId: casual.id,
      isFeatured: true,
      variants: {
        create: [
          { size: 'L', color: 'Black', material: 'Cotton Blend', sku: 'MS-HOO-BLK-L', stock: 50, price: 45.00 },
          { size: 'XL', color: 'Black', material: 'Cotton Blend', sku: 'MS-HOO-BLK-XL', stock: 30, price: 45.00 }
        ]
      }
    },
    {
      name: 'Heavyweight Boxing Gloves',
      slug: 'heavyweight-boxing-gloves',
      description: 'Professional grade boxing gloves with multi-layer foam protection.',
      basePrice: 65.00,
      exportPrice: 35.00,
      images: ['/images/products/gloves-red.jpg'],
      categoryId: gloves.id,
      isFeatured: false,
      variants: {
        create: [
          { size: '12oz', color: 'Red', material: 'Synthetic Leather', sku: 'MS-BG-RED-12', stock: 40, price: 65.00 },
          { size: '14oz', color: 'Red', material: 'Synthetic Leather', sku: 'MS-BG-RED-14', stock: 40, price: 65.00 },
          { size: '16oz', color: 'Black', material: 'Genuine Leather', sku: 'MS-BG-BLK-16', stock: 25, price: 85.00 }
        ]
      }
    },
    {
      name: 'Athletic Duffle Bag',
      slug: 'athletic-duffle-bag',
      description: 'Spacious gym bag with separate shoe compartment and waterproof zippers.',
      basePrice: 35.00,
      exportPrice: 18.00,
      images: ['/images/products/duffle-bag.jpg'],
      categoryId: accessories.id,
      isFeatured: true,
      variants: {
        create: [
          { size: 'One Size', color: 'Black/Orange', material: 'Nylon', sku: 'MS-BAG-BLK-OS', stock: 200, price: 35.00 }
        ]
      }
    }
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
