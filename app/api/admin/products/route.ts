import { NextResponse } from 'next/server';
import { getAllProducts, saveProduct } from '@/lib/db/products';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Persist to JSON database
    const success = await saveProduct(body);

    if (!success) {
      throw new Error('Failed to save product to storage');
    }
    
    console.log('Product saved successfully:', body.slug);
    
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
