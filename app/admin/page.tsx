'use client';

import React from 'react';
import { 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp,
  Clock
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const revenueData = [
  { name: '1 May', value: 400 },
  { name: '5 May', value: 3000 },
  { name: '10 May', value: 2000 },
  { name: '15 May', value: 2780 },
  { name: '20 May', value: 1890 },
  { name: '25 May', value: 2390 },
  { name: '30 May', value: 3490 },
];

const categoryData = [
  { name: 'Sportswear', value: 40 },
  { name: 'Casual Wear', value: 30 },
  { name: 'Gloves', value: 20 },
  { name: 'Accessories', value: 10 },
];

const COLORS = ['#E84118', '#F97316', '#FF6B35', '#333333'];

const recentOrders = [
  { id: 'ORD-7721', customer: 'John Doe', country: 'USA', items: 3, total: '$240.00', status: 'DELIVERED', date: '2 mins ago' },
  { id: 'ORD-7722', customer: 'Sarah Smith', country: 'UK', items: 1, total: '$85.00', status: 'PROCESSING', date: '15 mins ago' },
  { id: 'ORD-7723', customer: 'Michael Chen', country: 'Canada', items: 5, total: '$420.00', status: 'PENDING', date: '1 hour ago' },
  { id: 'ORD-7724', customer: 'Emma Wilson', country: 'Germany', items: 2, total: '$150.00', status: 'SHIPPED', date: '3 hours ago' },
  { id: 'ORD-7725', customer: 'Ahmed Raza', country: 'UAE', items: 4, total: '$310.00', status: 'CANCELLED', date: '5 hours ago' },
];

const statusColors: Record<string, string> = {
  'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'PROCESSING': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'SHIPPED': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'DELIVERED': 'bg-green-500/10 text-green-500 border-green-500/20',
  'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition-colors">
          <Clock size={16} />
          Last 30 Days
        </button>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$24,580" 
          icon={DollarSign} 
          change={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Total Orders" 
          value="342" 
          icon={Package} 
          change={{ value: 8, isPositive: true }} 
        />
        <StatCard 
          title="New Customers" 
          value="89" 
          icon={Users} 
          change={{ value: 5, isPositive: true }} 
        />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-white">Revenue Growth</h2>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Last 30 Days</p>
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">
              <TrendingUp size={16} />
              +24%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#E84118' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#E84118" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#E84118', strokeWidth: 2, stroke: '#0F0F0F' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-8">Orders by Category</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Orders */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#333] flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <button className="text-[#E84118] text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0F0F0F] text-xs font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order #</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#222] transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-white">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{order.customer}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{order.country}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white text-right">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
