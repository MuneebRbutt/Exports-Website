"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock size={16} className="text-yellow-500" />;
      case "SHIPPED": return <Truck size={16} className="text-purple-500" />;
      case "DELIVERED": return <CheckCircle2 size={16} className="text-green-500" />;
      default: return <Package size={16} className="text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-athletic italic font-bold uppercase tracking-tighter text-dark">My Orders</h1>
            <p className="text-neutral-400 font-medium uppercase tracking-widest text-xs mt-2">View and track your elite gear</p>
          </div>
          <Link href="/products" className="bg-neutral-100 text-dark px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-neutral-200 transition-all flex items-center gap-2">
            <ShoppingBag size={16} />
            Shop More
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-neutral-50 rounded-3xl border border-neutral-100">
            <Package size={48} className="text-neutral-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-dark mb-4 uppercase italic font-athletic">No orders yet</h2>
            <p className="text-neutral-500 mb-8">Start your journey with Meharstare today.</p>
            <Link href="/products" className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d63a15] transition-all">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  href={`/order-confirmation/${order.id}`}
                  className="block bg-white border border-neutral-100 p-6 rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Package size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono font-bold text-dark text-lg">#{order.orderNumber}</span>
                          <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-0.5 rounded-full border border-neutral-100">
                            {getStatusIcon(order.status)}
                            <span className="text-[10px] font-bold uppercase text-neutral-600">{order.status}</span>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })} • {order.items.length} Items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-8">
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Total Amount</p>
                        <p className="text-xl font-athletic italic font-bold text-dark">${order.totalAmount.toFixed(2)}</p>
                      </div>
                      <ChevronRight className="text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" size={24} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
