"use client";

import { useEffect, useState } from "react";
import { 
  Package, Truck, CheckCircle2, Clock, Factory, ShieldCheck, 
  XCircle, ArrowLeft, MessageCircle, MapPin, User, Mail, Phone,
  Calendar, CreditCard, ChevronRight
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { id: "PENDING", label: "Pending", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "CONFIRMED", label: "Confirmed", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "IN_PRODUCTION", label: "In Production", color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "QUALITY_CHECK", label: "Quality Check", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { id: "SHIPPED", label: "Shipped", color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { id: "DELIVERED", label: "Delivered", color: "text-green-500", bg: "bg-green-500/10" },
  { id: "CANCELLED", label: "Cancelled", color: "text-red-500", bg: "bg-red-500/10" },
];

export default function AdminOrderDetailPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showShipModal, setShowShipModal] = useState(false);
  const [shipData, setShipData] = useState({ trackingNumber: "", courierName: "DHL", estimatedDelivery: "" });

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.orderId]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${params.orderId}`);
      const data = await res.json();
      setOrder(data);
    } catch (error) {
      toast.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string, extraData = {}) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${params.orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...extraData }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success(`Order marked as ${status.replace("_", " ")}`);
      fetchOrder();
      setShowShipModal(false);
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E84118]"></div>
      </div>
    );
  }

  if (!order) return <div>Order not found</div>;

  const currentStatus = STATUS_OPTIONS.find(s => s.id === order.status);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white font-mono">{order.orderNumber}</h1>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${currentStatus?.bg} ${currentStatus?.color}`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={`https://wa.me/${order.user.phone?.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-widest hover:bg-[#128C7E] transition-all"
          >
            <MessageCircle size={18} />
            WhatsApp Customer
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: MAIN INFO */}
        <div className="lg:col-span-2 space-y-8">
          {/* ITEMS */}
          <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="text-[#E84118]" size={20} />
                <h2 className="text-lg font-bold text-white">Order Items</h2>
              </div>
              <span className="text-gray-500 text-sm">{order.items.length} items</span>
            </div>
            <div className="divide-y divide-[#333]">
              {order.items.map((item: any) => (
                <div key={item.id} className="p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0F0F0F] rounded-xl overflow-hidden border border-[#333]">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-[#E84118] transition-colors">{item.product.name}</p>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{item.variant.size} • {item.variant.color}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">${item.price.toFixed(2)} x {item.quantity}</p>
                    <p className="text-xs text-gray-500 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-[#0F0F0F] flex justify-between items-center">
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Amount</p>
              <p className="text-2xl font-bold text-[#E84118]">${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* SHIPPING & PAYMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-[#E84118]">
                <MapPin size={20} />
                <h3 className="font-bold text-white">Shipping Address</h3>
              </div>
              <div className="text-gray-400 text-sm space-y-1">
                <p className="font-bold text-gray-200">{(order.shippingAddress as any).fullName}</p>
                <p>{(order.shippingAddress as any).addressLine1}</p>
                {(order.shippingAddress as any).addressLine2 && <p>{(order.shippingAddress as any).addressLine2}</p>}
                <p>{(order.shippingAddress as any).city}, {(order.shippingAddress as any).postalCode}</p>
                <p>{(order.shippingAddress as any).country}</p>
              </div>
            </div>
            <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-[#E84118]">
                <CreditCard size={20} />
                <h3 className="font-bold text-white">Payment Method</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[#0F0F0F] p-3 rounded-xl border border-[#333]">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Cash on Delivery</p>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                  Payment will be collected by the courier upon delivery of the goods.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS & STATUS */}
        <div className="space-y-8">
          <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl p-6 space-y-6">
            <h3 className="font-bold text-white flex items-center gap-3">
              <Clock size={18} className="text-[#E84118]" />
              Manage Status
            </h3>
            
            <div className="space-y-3">
              {order.status === "PENDING" && (
                <button 
                  onClick={() => updateStatus("CONFIRMED")}
                  disabled={updating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Confirm Order
                </button>
              )}
              {order.status === "CONFIRMED" && (
                <button 
                  onClick={() => updateStatus("IN_PRODUCTION")}
                  disabled={updating}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Mark In Production
                </button>
              )}
              {(order.status === "IN_PRODUCTION" || order.status === "QUALITY_CHECK") && (
                <button 
                  onClick={() => order.status === "IN_PRODUCTION" ? updateStatus("QUALITY_CHECK") : setShowShipModal(true)}
                  disabled={updating}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  {order.status === "IN_PRODUCTION" ? "Move to Quality Check" : "Mark Shipped"}
                </button>
              )}
              {order.status === "SHIPPED" && (
                <button 
                  onClick={() => updateStatus("OUT_FOR_DELIVERY")}
                  disabled={updating}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Out for Delivery
                </button>
              )}
              {order.status === "OUT_FOR_DELIVERY" && (
                <button 
                  onClick={() => updateStatus("DELIVERED")}
                  disabled={updating}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Mark Delivered
                </button>
              )}
              {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                <button 
                  onClick={() => {
                    const reason = prompt("Enter cancellation reason:");
                    if (reason) updateStatus("CANCELLED", { reason });
                  }}
                  disabled={updating}
                  className="w-full bg-red-600/10 text-red-600 border border-red-600/20 hover:bg-red-600 hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all mt-4"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>

          {/* CUSTOMER INFO */}
          <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl p-6 space-y-6">
            <h3 className="font-bold text-white flex items-center gap-3">
              <User size={18} className="text-[#E84118]" />
              Customer Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F0F0F] border border-[#333] flex items-center justify-center text-gray-500">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{order.user.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Customer since 2024</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#333]">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={14} />
                  <p className="text-xs">{order.user.email}</p>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={14} />
                  <p className="text-xs">{order.user.phone || "No phone provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHIPPED MODAL */}
      {showShipModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#333] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 uppercase italic font-athletic">
                <Truck className="text-[#E84118]" />
                Shipping Details
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Courier Name</label>
                  <select 
                    value={shipData.courierName}
                    onChange={(e) => setShipData({ ...shipData, courierName: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-[#E84118]"
                  >
                    <option value="DHL">DHL Express</option>
                    <option value="FedEx">FedEx</option>
                    <option value="TCS">TCS</option>
                    <option value="Leopards">Leopards Courier</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tracking Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter tracking ID"
                    value={shipData.trackingNumber}
                    onChange={(e) => setShipData({ ...shipData, trackingNumber: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-[#E84118] font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Estimated Delivery Date</label>
                  <input 
                    type="date" 
                    value={shipData.estimatedDelivery}
                    onChange={(e) => setShipData({ ...shipData, estimatedDelivery: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-[#E84118]"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowShipModal(false)}
                  className="flex-1 bg-[#333] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#444] transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => updateStatus("SHIPPED", shipData)}
                  disabled={!shipData.trackingNumber || updating}
                  className="flex-1 bg-[#E84118] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#d63a15] transition-all disabled:opacity-50"
                >
                  Confirm Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
