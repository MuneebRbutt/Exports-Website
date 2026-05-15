import { NextResponse } from 'next/server';
import { getProducts, saveProduct, deleteProduct } from '@/lib/db/products';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category') || undefined;
    const subcategorySlug = searchParams.get('subcategory') || undefined;

    const products = await getProducts(categorySlug, subcategorySlug);
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Failed to publish product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const success = await deleteProduct(id);

    if (!success) {
      throw new Error('Failed to delete product');
    }

    // Revalidate paths
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
