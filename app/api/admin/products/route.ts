import { NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db/products';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/adminGuard';

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category') || undefined;
    const subcategorySlug = searchParams.get('subcategory') || undefined;

    const products = await getProducts(categorySlug, subcategorySlug);
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    
    // Persist to Prisma database
    const success = await saveProduct(body);

    if (!success) {
      throw new Error('Failed to save product to storage');
    }
    
    // Revalidate paths
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
    
    return NextResponse.json({ 
      success: true,
      message: "Product published successfully", 
      data: body 
    }, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to publish product" }, { status: 500 });
  }
}
