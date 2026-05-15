import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash("Admin@1234", 12)
  await prisma.user.upsert({
    where: { email: "admin@meharstare.com" },
    update: {},
    create: {
      name: "Meharstare Admin",
      email: "admin@meharstare.com",
      password: adminPassword,
      role: "ADMIN",
    },
  })
  console.log("Admin user created.")

  // 2. Categories & Subcategories
  const categoriesData = [
    {
      name: "Sportswear",
      slug: "sportswear",
      subcategories: [
        { name: "Soccer", slug: "soccer" },
        { name: "American Football", slug: "american-football" },
        { name: "Basketball Uniform", slug: "basketball-uniform" },
        { name: "Baseball Uniform", slug: "baseball-uniform" },
        { name: "Padel Tennis", slug: "padel-tennis" },
      ],
    },
    {
      name: "Casual Wear",
      slug: "casual-wear",
      subcategories: [
        { name: "Hoodies", slug: "hoodies" },
        { name: "T-Shirts", slug: "t-shirts" },
        { name: "Polo", slug: "polo" },
        { name: "Sweatshirts", slug: "sweatshirts" },
        { name: "Tracksuits", slug: "tracksuits" },
        { name: "Joggers", slug: "joggers" },
      ],
    },
    {
      name: "Gloves",
      slug: "gloves",
      subcategories: [
        { name: "Soccer Gloves", slug: "soccer-gloves" },
        { name: "Boxing Gloves", slug: "boxing-gloves" },
        { name: "Working Gloves", slug: "working-gloves" },
      ],
    },
    {
      name: "Accessories",
      slug: "accessories",
      subcategories: [
        { name: "Caps & Hats", slug: "caps-hats" },
        { name: "Socks", slug: "socks" },
        { name: "Bags & Backpacks", slug: "bags-backpacks" },
        { name: "Wristbands", slug: "wristbands" },
      ],
    },
  ]

  const categoryMap: Record<string, string> = {}

  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        image: `/images/categories/${cat.slug}.png`
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        image: `/images/categories/${cat.slug}.png`
      },
    })
    categoryMap[cat.slug] = createdCat.id

    for (const sub of cat.subcategories) {
      const createdSub = await prisma.category.upsert({
        where: { slug: sub.slug },
        update: {},
        create: {
          name: sub.name,
          slug: sub.slug,
          parentId: createdCat.id,
        },
      })
      categoryMap[sub.slug] = createdSub.id
    }
  }
  console.log("Categories and subcategories created.")

  // 3. Products
  const productsData = [
    // SPORTSWEAR
    {
      name: "Professional Soccer Jersey",
      slug: "professional-soccer-jersey",
      description: "High quality soccer jersey for professional matches. Lightweight, breathable fabric. Available in custom colors.",
      basePrice: 29.99,
      exportPrice: 19.99,
      categorySlug: "soccer",
      isFeatured: true,
      imageText: "Soccer+Jersey",
    },
    {
      name: "American Football Uniform Set",
      slug: "american-football-uniform-set",
      description: "Complete American football uniform including jersey and pants. Durable padding included.",
      basePrice: 79.99,
      exportPrice: 54.99,
      categorySlug: "american-football",
      isFeatured: true,
      imageText: "Football+Uniform",
    },
    {
      name: "Basketball Team Uniform",
      slug: "basketball-team-uniform",
      description: "Professional basketball uniform set. Moisture wicking fabric. Custom team name and number available.",
      basePrice: 45.99,
      exportPrice: 32.99,
      categorySlug: "basketball-uniform",
      isFeatured: false,
      imageText: "Basketball+Uniform",
    },
    {
      name: "Baseball Uniform Complete Set",
      slug: "baseball-uniform-complete-set",
      description: "Full baseball uniform with jersey, pants and cap. Premium quality for professional teams.",
      basePrice: 65.99,
      exportPrice: 45.99,
      categorySlug: "baseball-uniform",
      isFeatured: false,
      imageText: "Baseball+Uniform",
    },
    // CASUAL WEAR
    {
      name: "Premium Pullover Hoodie",
      slug: "premium-pullover-hoodie",
      description: "Soft fleece pullover hoodie. Perfect for casual and athletic wear. Custom logo available.",
      basePrice: 35.99,
      exportPrice: 24.99,
      categorySlug: "hoodies",
      isFeatured: true,
      imageText: "Premium+Hoodie",
    },
    {
      name: "Classic Cotton T-Shirt",
      slug: "classic-cotton-t-shirt",
      description: "100% premium cotton t-shirt. Comfortable fit for everyday wear. Available in 20+ colors.",
      basePrice: 15.99,
      exportPrice: 9.99,
      categorySlug: "t-shirts",
      isFeatured: true,
      imageText: "Cotton+T-Shirt",
    },
    {
      name: "Sports Polo Shirt",
      slug: "sports-polo-shirt",
      description: "Professional polo shirt with moisture wicking technology. Perfect for corporate and sports teams.",
      basePrice: 25.99,
      exportPrice: 17.99,
      categorySlug: "polo",
      isFeatured: false,
      imageText: "Sports+Polo",
    },
    {
      name: "Fleece Tracksuit Set",
      slug: "fleece-tracksuit-set",
      description: "Complete tracksuit set with jacket and pants. Warm fleece lining. Custom embroidery available.",
      basePrice: 55.99,
      exportPrice: 38.99,
      categorySlug: "tracksuits",
      isFeatured: true,
      imageText: "Fleece+Tracksuit",
    },
    // GLOVES
    {
      name: "Professional Boxing Gloves",
      slug: "professional-boxing-gloves",
      description: "Premium leather boxing gloves. Superior wrist support. Available in 8oz, 10oz, 12oz, 14oz, 16oz.",
      basePrice: 45.99,
      exportPrice: 32.99,
      categorySlug: "boxing-gloves",
      isFeatured: true,
      imageText: "Boxing+Gloves",
    },
    {
      name: "Goalkeeper Soccer Gloves",
      slug: "goalkeeper-soccer-gloves",
      description: "Professional goalkeeper gloves with superior grip. Latex palm for maximum ball control.",
      basePrice: 35.99,
      exportPrice: 24.99,
      categorySlug: "soccer-gloves",
      isFeatured: false,
      imageText: "Goalkeeper+Gloves",
    },
    {
      name: "Heavy Duty Working Gloves",
      slug: "heavy-duty-working-gloves",
      description: "Industrial grade working gloves. Cut resistant material. Ideal for construction and heavy work.",
      basePrice: 19.99,
      exportPrice: 12.99,
      categorySlug: "working-gloves",
      isFeatured: false,
      imageText: "Working+Gloves",
    },
    {
      name: "Winter Sports Gloves",
      slug: "winter-sports-gloves",
      description: "Insulated winter gloves for outdoor sports. Touchscreen compatible fingertips.",
      basePrice: 28.99,
      exportPrice: 19.99,
      categorySlug: "soccer-gloves",
      isFeatured: false,
      imageText: "Winter+Gloves",
    },
    // ACCESSORIES
    {
      name: "Sports Cap Classic",
      slug: "sports-cap-classic",
      description: "Classic sports cap with adjustable strap. Custom logo embroidery available. One size fits all.",
      basePrice: 12.99,
      exportPrice: 7.99,
      categorySlug: "caps-hats",
      isFeatured: false,
      imageText: "Sports+Cap",
    },
    {
      name: "Athletic Performance Socks",
      slug: "athletic-performance-socks",
      description: "Cushioned athletic socks with arch support. Moisture wicking. Pack of 6 pairs.",
      basePrice: 18.99,
      exportPrice: 11.99,
      categorySlug: "socks",
      isFeatured: false,
      imageText: "Athletic+Socks",
    },
    {
      name: "Sports Gym Bag",
      slug: "sports-gym-bag",
      description: "Large capacity gym bag with separate shoe compartment. Water resistant material. Custom branding available.",
      basePrice: 38.99,
      exportPrice: 26.99,
      categorySlug: "bags-backpacks",
      isFeatured: true,
      imageText: "Gym+Bag",
    },
    {
      name: "Sports Wristband Set",
      slug: "sports-wristband-set",
      description: "Comfortable terry cloth wristbands. Pack of 2. Custom colors and logo available.",
      basePrice: 8.99,
      exportPrice: 5.99,
      categorySlug: "wristbands",
      isFeatured: false,
      imageText: "Wristband+Set",
    },
  ]

  const sizes = ["S", "M", "L", "XL", "XXL"]
  const colors = ["Black", "White", "Red", "Navy", "Orange"]

  for (const prod of productsData) {
    const initials = prod.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()

    let productImages = [`https://placehold.co/800x800/1a1a1a/e84118?text=${prod.imageText}`];
    
    if (prod.slug === 'professional-soccer-jersey') productImages = ['/images/products/jersey-front.jpg', '/images/products/jersey-back.jpg'];
    if (prod.slug === 'premium-pullover-hoodie') productImages = ['/images/products/hoodie.jpg'];
    if (prod.slug === 'fleece-tracksuit-set') productImages = ['/images/products/tracksuit.jpg'];
    if (prod.slug === 'sports-gym-bag') productImages = ['/images/products/duffle-bag.jpg'];
    if (prod.slug === 'professional-boxing-gloves') productImages = ['/images/products/gloves-red.jpg'];

    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        images: productImages
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        basePrice: prod.basePrice,
        exportPrice: prod.exportPrice,
        categoryId: categoryMap[prod.categorySlug],
        isFeatured: prod.isFeatured,
        isActive: true,
        images: productImages,
      },
    })

    // Create variants
    for (const size of sizes) {
      for (const color of colors) {
        const sku = `MHS-${initials}-${size}-${color.substring(0, 3).toUpperCase()}`
        await prisma.productVariant.upsert({
          where: { sku },
          update: {},
          create: {
            productId: createdProduct.id,
            size,
            color,
            material: "Standard",
            sku,
            stock: 100,
            price: prod.basePrice,
          },
        })
      }
    }
  }

  console.log("Products and variants created.")
  console.log("Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
