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
  const products = readProductsFromJSON();
  const product = products.find((p: any) => p.slug === slug);
  if (product) return product;

  try {
    return await prisma.product.findUnique({
      where: { slug: slug }
    });
  } catch (error) {
    return null;
  }
}

// Fetch products by category
export async function getProductsByCategory(category: string) {
  const products = readProductsFromJSON();
  const filtered = products.filter((p: any) => p.category.toLowerCase() === category.toLowerCase());
  if (filtered.length > 0) return filtered;

  try {
    return await prisma.product.findMany({
      where: { category: { slug: category } }
    });
  } catch (error) {
    return [];
  }
}

// Fetch all products
export async function getAllProducts() {
  const products = readProductsFromJSON();
  if (products.length > 0) return products;

  try {
    return await prisma.product.findMany();
  } catch (error) {
    return [];
  }
}

// Add or update a product (persistence)
export async function saveProduct(productData: any) {
  const products = readProductsFromJSON();
  const index = products.findIndex((p: any) => p.slug === productData.slug || p.id === productData.id);

  const formattedProduct = {
    ...productData,
    id: productData.id || (index !== -1 ? products[index].id : Math.random().toString(36).substr(2, 9)),
    image: productData.images?.[0] || productData.image || "/images/product-placeholder.jpg",
    price: Number(productData.retailPrice) || Number(productData.price) || 0
  };

  if (index !== -1) {
    // Update
    products[index] = { ...products[index], ...formattedProduct };
  } else {
    // Add
    products.push(formattedProduct);
  }

  return writeProductsToJSON(products);
}
