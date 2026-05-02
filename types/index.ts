export type Role = 'CUSTOMER' | 'ADMIN' | 'EXPORT_BUYER';

export interface User {
  id: string;
  name?: string | null;
  email: string;
  role: Role;
  company?: string | null;
  country?: string | null;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  exportPrice?: number | null;
  images: string[];
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  material: string;
  sku: string;
  stock: number;
  price: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  currency: string;
  orderType: 'B2B' | 'B2C';
  trackingNumber?: string | null;
  createdAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface ExportInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  productInterest?: string | null;
  estimatedQuantity?: number | null;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED';
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
