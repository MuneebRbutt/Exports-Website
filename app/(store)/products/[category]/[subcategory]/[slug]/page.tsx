"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  CheckCircle2
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { getCategoryUrl, getSubcategoryUrl } from "@/lib/utils/urls";
import { getCategoryBySlug, getSubcategoryBySlug } from "@/lib/data/categories";

export default function ProductDetailPage({
  params,
}: {
  params: { category: string; subcategory: string; slug: string };
}) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Black");
  const { addItem } = useCart();

  const category = getCategoryBySlug(params.category);
  const subcategory = getSubcategoryBySlug(params.category, params.subcategory);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/products');
        const result = await response.json();
        if (result.success) {
          const found = result.data.find((p: any) => p.slug === params.slug);
          setProduct(found || null);
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
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark mb-2">Product Not Found</h1>
          <p className="text-neutral-400 mb-4">The product you are looking for does not exist.</p>
          <Link href="/products" className="text-primary font-bold hover:underline">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const price = Number(product.price) || Number(product.retailPrice) || 0;

  const handleAddToCart = () => {
    // Find the correct variant based on selected size and color
    const selectedVariant = product.variants?.find(
      (v: any) => v.size === selectedSize && v.color === selectedColor
    );

    if (product.variants && !selectedVariant) {
      toast.error("Selected combination is not available");
      return;
    }

    addItem({
      id: selectedVariant ? selectedVariant.id : product.id.toString(),
      variantId: selectedVariant ? selectedVariant.id : undefined,
      productId: product.id,
      name: product.name,
      price: price,
      image: product.image || product.img || "/images/product-placeholder.jpg",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-xs text-neutral-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-dark cursor-pointer">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-dark cursor-pointer">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={getCategoryUrl(params.category)} className="hover:text-dark cursor-pointer">
              {category?.name || params.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={getSubcategoryUrl(params.category, params.subcategory)} className="hover:text-dark cursor-pointer">
              {subcategory?.name || params.subcategory}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-dark font-bold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
              <Image
                src={product.image || product.img || "/images/product-placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((img: string, i: number) => (
                  <div key={i} className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden cursor-pointer">
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {subcategory?.name || params.subcategory}
                </span>
                {product.isFeatured && (
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-athletic italic font-bold text-dark mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-orange-400 text-orange-400' : 'text-neutral-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-neutral-400">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-dark">${price.toFixed(2)}</p>
            </div>

            <p className="text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="font-athletic font-bold uppercase tracking-widest text-sm">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-bold text-sm transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-neutral-200 text-neutral-600 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="font-athletic font-bold uppercase tracking-widest text-sm">Select Color</label>
              <div className="flex gap-3">
                {[
                  { name: "Black", hex: "#000000" },
                  { name: "White", hex: "#FFFFFF" },
                  { name: "Red", hex: "#E84118" },
                  { name: "Navy", hex: "#000080" },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${
                      selectedColor === color.name ? 'border-primary' : 'border-transparent'
                    }`}
                    title={color.name}
                  >
                    <div className="w-full h-full rounded-full border border-neutral-200" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-neutral-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-4 rounded-xl font-athletic font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="p-4 border border-neutral-200 rounded-xl hover:border-primary transition-colors">
                <Heart className="h-5 w-5 text-neutral-400" />
              </button>
              <button className="p-4 border border-neutral-200 rounded-xl hover:border-primary transition-colors">
                <Share2 className="h-5 w-5 text-neutral-400" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs text-neutral-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-xs text-neutral-600">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-xs text-neutral-600">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
