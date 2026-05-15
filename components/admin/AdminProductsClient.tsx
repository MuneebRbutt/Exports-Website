'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, Download } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdminProductsClient = ({ initialProducts }: { initialProducts: any[] }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dbProducts, setDbProducts] = useState<any[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    let filtered = dbProducts.map(p => ({
      ...p,
      stock: p.variants?.reduce((acc: number, v: any) => acc + v.stock, 0) || 0,
      retailPrice: `$${(Number(p.basePrice) || 0).toFixed(2)}`,
      status: p.isActive ? 'ACTIVE' : 'DRAFT',
      categoryName: p.category?.name || 'Uncategorized'
    }));

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.categoryName.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(p => p.category?.slug === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [search, categoryFilter, dbProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const loadingToast = toast.loading('Deleting product...');
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      toast.success('Product deleted successfully!', { id: loadingToast });
      setDbProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product', { id: loadingToast });
    }
  };

  const columns = [
    { 
      header: 'Product', 
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#0F0F0F] border border-[#333] overflow-hidden">
            <img src={item.images?.[0] || "/images/product-placeholder.jpg"} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-white">{item.name}</div>
            <div className="text-[10px] text-gray-500 uppercase">{item.slug}</div>
          </div>
        </div>
      )
    },
    { header: 'Category', accessor: 'categoryName' },
    { 
      header: 'Stock', 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${item.stock > 10 ? 'bg-green-500' : item.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
          <span className={item.stock === 0 ? 'text-red-500 font-bold' : ''}>
            {item.stock} units
          </span>
        </div>
      )
    },
    { header: 'Price', accessor: 'retailPrice' },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
          item.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
        }`}>
          {item.isActive ? 'ACTIVE' : 'DRAFT'}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/products/${item.slug}`}>
            <button className="p-2 hover:bg-[#1A1A1A] rounded-lg text-gray-400 hover:text-white transition-colors">
              <Edit size={16} />
            </button>
          </Link>
          <button 
            onClick={() => handleDelete(item.id)}
            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products Management</h1>
          <p className="text-gray-500 text-sm">Manage your store products and inventory from the database.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/products/new"
            className="flex items-center gap-2 bg-[#E84118] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#ff5a36] transition-colors shadow-lg shadow-[#E84118]/20"
          >
            <Plus size={18} />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl flex flex-col md:flex-row gap-4">
        <div className="relative group flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E84118] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] transition-all"
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="sportswear">Sportswear</option>
          <option value="casual-wear">Casual Wear</option>
          <option value="gloves">Gloves</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={filteredProducts}
      />
    </div>
  );
};

export default AdminProductsClient;
