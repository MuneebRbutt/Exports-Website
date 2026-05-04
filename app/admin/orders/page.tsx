'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Printer } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';

const mockOrders = [
  { id: 'ORD-7721', customer: 'John Doe', email: 'john@example.com', country: 'USA', items: 3, total: '$240.00', status: 'DELIVERED', date: 'May 04, 2026' },
  { id: 'ORD-7722', customer: 'Sarah Smith', email: 'sarah@fitgear.com', country: 'UK', items: 1, total: '$85.00', status: 'PROCESSING', date: 'May 04, 2026' },
  { id: 'ORD-7723', customer: 'Michael Chen', email: 'm.chen@global.ca', country: 'Canada', items: 150, total: '$4,200.00', status: 'PENDING', date: 'May 03, 2026' },
  { id: 'ORD-7724', customer: 'Emma Wilson', email: 'emma.w@gmail.com', country: 'Germany', items: 2, total: '$150.00', status: 'SHIPPED', date: 'May 03, 2026' },
  { id: 'ORD-7725', customer: 'Ahmed Raza', email: 'ahmed@sports.ae', country: 'UAE', items: 500, total: '$12,500.00', status: 'CANCELLED', date: 'May 02, 2026' },
];

const statusColors: Record<string, string> = {
  'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'PROCESSING': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'SHIPPED': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'DELIVERED': 'bg-green-500/10 text-green-500 border-green-500/20',
  'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const columns = [
    { 
      header: 'Order ID', 
      accessor: (item: any) => <span className="font-bold text-white">{item.id}</span>
    },
    { 
      header: 'Customer', 
      accessor: (item: any) => (
        <div>
          <div className="font-medium text-gray-300">{item.customer}</div>
          <div className="text-[10px] text-gray-500">{item.email}</div>
        </div>
      )
    },
    { header: 'Country', accessor: 'country' },
    { header: 'Items', accessor: (item: any) => `${item.items} items` },
    { header: 'Total', accessor: (item: any) => <span className="font-bold text-white">{item.total}</span> },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[item.status]}`}>
          {item.status}
        </span>
      )
    },
    { header: 'Date', accessor: 'date' },
  ];

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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
            Export Orders
          </button>
          <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition-colors text-gray-400">
            <Printer size={18} />
            Bulk Print
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
            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E84118] transition-all"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={mockOrders}
        onEdit={(item) => console.log('View Order', item)}
      />
    </div>
  );
};

export default OrdersPage;
