"use client";

import { useState } from "react";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  RotateCcw 
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

export default function ProductInfo({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Black");
  const { addItem } = useCart();

  const price = Number(product.price) || Number(product.basePrice) || 0;

  const handleAddToCart = () => {
    const selectedVariant = product.variants?.find(
      (v: any) => v.size === selectedSize && v.color === selectedColor
    );

    addItem({
      id: selectedVariant ? selectedVariant.id : product.id.toString(),
      productId: product.id,
      variantId: selectedVariant ? selectedVariant.id : undefined,
      name: product.name,
      price: price,
      image: product.images?.[0] || "/images/product-placeholder.jpg",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {product.category?.name || "Premium Collection"}
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
          <span className="text-sm text-neutral-400">({product.reviews?.length || 0} reviews)</span>
        </div>
        <p className="text-3xl font-bold text-dark">${price.toFixed(2)}</p>
      </div>

      <p className="text-neutral-600 leading-relaxed">
        {product.description}
      </p>

      {/* Size Selection */}
      <div className="space-y-3">
        <label className="font-athletic font-bold uppercase tracking-widest text-sm text-dark">Select Size</label>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-lg border-2 font-bold text-sm transition-all ${
                selectedSize === size
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
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
        <label className="font-athletic font-bold uppercase tracking-widest text-sm text-dark">Select Color</label>
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
              <div className="w-full h-full rounded-full border border-neutral-100 shadow-sm" style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-4 hover:bg-neutral-100 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-4 hover:bg-neutral-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 w-full bg-primary text-white py-4 rounded-xl font-athletic font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-neutral-100">
        {[
          { icon: Truck, text: "Global Shipping" },
          { icon: ShieldCheck, text: "Quality Guarantee" },
          { icon: RotateCcw, text: "Easy Returns" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="p-2 bg-neutral-50 rounded-lg">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
