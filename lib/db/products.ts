import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const JSON_DB_PATH = path.join(process.cwd(), 'lib/db/products.json');

// Helper to read from JSON
function readProductsFromJSON() {
  try {
    const data = fs.readFileSync(JSON_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products JSON:", error);
    return [];
  }
}

// Helper to write to JSON
function writeProductsToJSON(products: any[]) {
  try {
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error writing products JSON:", error);
    return false;
  }
}

// Initial products from JSON
export const mockProducts = readProductsFromJSON();

// Fetch single product by slug
export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: {
        category: {
          include: {
            parent: true
          }
        },
        variants: true
      }
    });

    if (!product) return null;

    // Transform for frontend
    return {
      ...product,
      category: product.category.parent ? product.category.parent.slug : product.category.slug,
      subcategory: product.category.parent ? product.category.slug : null,
      image: product.images?.[0] || "/images/product-placeholder.jpg",
      price: product.basePrice
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getProducts(categorySlug?: string, subcategorySlug?: string) {
  try {
    const where: any = {};

    if (subcategorySlug) {
      where.category = { slug: subcategorySlug };
    } else if (categorySlug) {
      where.category = {
        OR: [
          { slug: categorySlug },
          { parent: { slug: categorySlug } }
        ]
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          include: {
            parent: true
          }
        },
        variants: true
      }
    });

    return products.map(p => ({
      ...p,
      category: p.category.parent ? p.category.parent.slug : p.category.slug,
      subcategory: p.category.parent ? p.category.slug : null,
      image: p.images?.[0] || "/images/product-placeholder.jpg",
      price: p.basePrice
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Add or update a product (persistence)
export async function saveProduct(productData: any) {
  try {
    const { 
      id, name, slug, description, category, subcategory, 
      costPrice, images, variants, isFeatured
    } = productData;

    // Find category ID
    const catSlug = subcategory || category;
    const categoryRecord = await prisma.category.findUnique({
      where: { slug: catSlug }
    });

    if (!categoryRecord) throw new Error(`Category ${catSlug} not found`);

    const data = {
      name,
      slug,
      description,
      basePrice: Number(costPrice),
      categoryId: categoryRecord.id,
      images: images || [],
      isActive: productData.status === 'active',
      isFeatured: !!isFeatured,
    };

    let savedProduct;
    if (id && id.length > 20) { // Check if it's a UUID
      savedProduct = await prisma.product.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date()
        }
      });
    } else {
      savedProduct = await prisma.product.create({
        data: {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Handle variants if provided
    if (variants && variants.length > 0) {
      // For simplicity, we'll delete old variants and create new ones
      await prisma.productVariant.deleteMany({
        where: { productId: savedProduct.id }
      });

      for (const v of variants) {
        await prisma.productVariant.create({
          data: {
            productId: savedProduct.id,
            size: v.size,
            color: v.color,
            material: v.material || 'Standard',
            sku: v.sku || `SKU-${Math.random().toString(36).substr(2, 9)}`,
            stock: Number(v.stock),
            price: Number(v.price) || Number(costPrice),
          }
        });
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving product:", error);
    return false;
  }
}

// Delete product
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}
