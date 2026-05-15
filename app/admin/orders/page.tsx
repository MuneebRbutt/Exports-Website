'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, Printer, MessageCircle, Truck } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import Link from 'next/link';
import toast from 'react-hot-toast';

const statusColors: Record<string, string> = {
  'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'CONFIRMED': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'IN_PRODUCTION': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'QUALITY_CHECK': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'SHIPPED': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'OUT_FOR_DELIVERY': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  'DELIVERED': 'bg-green-500/10 text-green-500 border-green-500/20',
  'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'All' || order.status === activeTab.toUpperCase().replace(' ', '_');
    const matchesSearch = order.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
                         order.user.name?.toLowerCase().includes(search.toLowerCase()) ||
                         order.user.email.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    { 
      header: 'Order #', 
      accessor: (item: any) => <span className="font-bold text-white font-mono">{item.orderNumber}</span>
    },
    { 
      header: 'Customer', 
      accessor: (item: any) => (
        <div>
          <div className="font-medium text-gray-300">{item.user.name}</div>
          <div className="text-[10px] text-gray-500">{item.user.email}</div>
        </div>
      )
    },
    { header: 'City', accessor: (item: any) => (item.shippingAddress as any).city },
    { header: 'Items', accessor: (item: any) => `${item.items.length} items` },
    { header: 'Total', accessor: (item: any) => <span className="font-bold text-white">${item.totalAmount.toFixed(2)}</span> },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[item.status]}`}>
          {item.status}
        </span>
      )
    },
    { 
      header: 'Date', 
      accessor: (item: any) => new Date(item.createdAt).toLocaleDateString() 
    },
    {
      header: 'Actions',
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/orders/${item.id}`}>
            <button className="p-2 hover:bg-[#1A1A1A] rounded-lg text-gray-400 hover:text-white transition-colors" title="View Details">
              <Eye size={16} />
            </button>
          </Link>
          <a 
            href={`https://wa.me/${item.user.phone?.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-[#25D366]/10 rounded-lg text-gray-400 hover:text-[#25D366] transition-colors"
            title="WhatsApp Contact"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      )
    }
  ];

  const tabs = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-gray-500 text-sm">Monitor and process customer orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition-colors">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center bg-[#1A1A1A] p-1 rounded-xl border border-[#333] w-full md:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-[#E84118] text-white shadow-lg shadow-[#E84118]/20' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E84118] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Order #, Customer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E84118] transition-all"
          />
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl p-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E84118]"></div>
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={filteredOrders}
        />
      )}
    </div>
  );
};

export default OrdersPage;
