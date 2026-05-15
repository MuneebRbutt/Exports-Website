export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { deleteProduct, saveProduct } from '@/lib/db/products';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/adminGuard';
import { prisma } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await req.json();
    
    // Add the ID from URL to the payload so saveProduct knows to update
    const productData = { ...body, id: params.id };
    
    // We can use saveProduct as it handles both creation and updates
    // if an ID is provided and exists
    const success = await saveProduct(productData);

    if (!success) {
      throw new Error('Failed to update product');
    }
    
    // Revalidate paths
    revalidatePath('/products');
    revalidatePath(`/products/${productData.category}/${productData.slug}`);
    revalidatePath('/admin/products');
    revalidatePath('/');
    
    return NextResponse.json({ 
      success: true,
      message: "Product updated successfully", 
      data: productData 
    }, { status: 200 });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    
    if (!params.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const success = await deleteProduct(params.id);

    if (!success) {
      throw new Error('Failed to delete product');
    }

    // Revalidate paths
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
