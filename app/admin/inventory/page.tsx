'use client';

import React from 'react';
import { Search, Warehouse, AlertTriangle, RefreshCw, Filter } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';

const mockInventory = [
  { id: '1', product: 'Pro Leather Boxing Gloves', sku: 'GLV-001', variant: 'Red / XL', stock: 45, incoming: 100, location: 'Warehouse A', status: 'IN STOCK' },
  { id: '2', product: 'Elite Training Hoodie', sku: 'HUD-022', variant: 'Black / L', stock: 5, incoming: 50, location: 'Warehouse B', status: 'LOW STOCK' },
  { id: '3', product: 'Performance Tracksuit', sku: 'TRK-009', variant: 'Navy / M', stock: 0, incoming: 200, location: 'Warehouse A', status: 'OUT OF STOCK' },
  { id: '4', product: 'Gear Duffle Bag', sku: 'BAG-005', variant: 'Grey / OS', stock: 15, incoming: 0, location: 'Warehouse C', status: 'IN STOCK' },
];

const InventoryPage = () => {
  const columns = [
    { 
      header: 'Product & SKU', 
      accessor: (item: any) => (
        <div>
          <div className="font-bold text-white">{item.product}</div>
          <div className="text-[10px] text-gray-500 uppercase">{item.sku} • {item.variant}</div>
        </div>
      )
    },
    { 
      header: 'Stock Level', 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            item.stock > 10 ? 'bg-green-500' : 
            item.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span className={`font-bold ${item.stock === 0 ? 'text-red-500' : 'text-white'}`}>
            {item.stock}
          </span>
        </div>
      )
    },
    { header: 'Incoming', accessor: (item: any) => `${item.incoming} units` },
    { header: 'Location', accessor: 'location' },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
          item.status === 'IN STOCK' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          item.status === 'LOW STOCK' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
          'bg-red-500/10 text-red-500 border-red-500/20'
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
          <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
          <p className="text-gray-500 text-sm">Track stock levels and warehouse locations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition-colors">
            <RefreshCw size={18} />
            Sync Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Warehouse className="text-gray-400" size={20} />
            <span className="text-sm font-medium text-gray-400">Total Items</span>
          </div>
          <div className="text-2xl font-bold text-white">1,248</div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <span className="text-sm font-medium text-gray-400">Low Stock Alert</span>
          </div>
          <div className="text-2xl font-bold text-white">14 Items</div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl border-l-4 border-l-red-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-500" size={20} />
            <span className="text-sm font-medium text-gray-400">Out of Stock</span>
          </div>
          <div className="text-2xl font-bold text-white">3 Items</div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E84118] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by product, SKU, location..." 
            className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:flex-none bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] appearance-none cursor-pointer">
            <option value="">All Locations</option>
            <option value="A">Warehouse A</option>
            <option value="B">Warehouse B</option>
          </select>
          <button className="p-2 bg-[#0F0F0F] border border-[#333] rounded-lg text-gray-400 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={mockInventory}
        onEdit={(item) => console.log('Adjust Stock', item)}
      />
    </div>
  );
};

export default InventoryPage;
