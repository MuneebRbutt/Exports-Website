"use client";

import React, { useEffect, useState } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { mockProducts } from '@/lib/db/products';
import { notFound } from 'next/navigation';

export default function EditProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          const found = result.data.find((p: any) => p.slug === params.slug);
          setProduct(found);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params.slug]);

  if (isLoading) {
    return <div className="flex justify-center py-20 text-white">Loading product...</div>;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ProductForm initialData={product} />
    </div>
  );
}
