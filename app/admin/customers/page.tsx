'use client';

import React from 'react';
import { Search, Mail, Phone, MapPin, Download } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', country: 'USA', orders: 5, spent: '$1,240.00', status: 'ACTIVE' },
  { id: '2', name: 'Sarah Smith', email: 'sarah@fitgear.com', phone: '+44 7700 900000', country: 'UK', orders: 2, spent: '$310.00', status: 'ACTIVE' },
  { id: '3', name: 'Michael Chen', email: 'm.chen@global.ca', phone: '+1 416 555 0123', country: 'Canada', orders: 12, spent: '$5,800.00', status: 'VIP' },
  { id: '4', name: 'Emma Wilson', email: 'emma.w@gmail.com', phone: '+49 151 23456789', country: 'Germany', orders: 1, spent: '$85.00', status: 'INACTIVE' },
];

const CustomersPage = () => {
  const columns = [
    { 
      header: 'Customer', 
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E84118]/10 flex items-center justify-center text-[#E84118] font-bold text-xs">
            {item.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-white">{item.name}</div>
            <div className="text-[10px] text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Contact', 
      accessor: (item: any) => (
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-1"><Phone size={12} /> {item.phone}</div>
          <div className="flex items-center gap-1"><MapPin size={12} /> {item.country}</div>
        </div>
      )
    },
    { header: 'Orders', accessor: (item: any) => `${item.orders} Orders` },
    { header: 'Total Spent', accessor: (item: any) => <span className="font-bold text-white">{item.spent}</span> },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
          item.status === 'VIP' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
          item.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          'bg-gray-500/10 text-gray-500 border-gray-500/20'
        }`}>
          {item.status}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-gray-500 text-sm">Manage your customer database and purchase history.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition-colors">
          <Download size={18} />
          Export Customers
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E84118] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, phone..." 
            className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] transition-all"
          />
        </div>
        <select className="w-full md:w-auto bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] appearance-none cursor-pointer">
          <option value="">All Status</option>
          <option value="vip">VIP</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <DataTable 
        columns={columns} 
        data={mockCustomers}
        onEdit={(item) => console.log('Edit Customer', item)}
      />
    </div>
  );
};

export default CustomersPage;
