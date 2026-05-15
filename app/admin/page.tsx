'use client';

import React, { useEffect, useState } from 'react';
import { 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp,
  Clock,
  AlertTriangle,
  MessageSquare
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

const COLORS = ['#E84118', '#F97316', '#FF6B35', '#333333'];

const statusColors: Record<string, string> = {
  'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'CONFIRMED': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'IN_PRODUCTION': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'SHIPPED': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'DELIVERED': 'bg-green-500/10 text-green-500 border-green-500/20',
  'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/orders')
        ]);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData.data);
        }
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.slice(0, 5)); // only recent 5
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin. Here's what's happening this month.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition-colors">
          <Clock size={16} />
          Last 30 Days
        </button>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Monthly Revenue" 
          value={loading ? '...' : `$${(stats?.revenueThisMonth || 0).toFixed(2)}`} 
          icon={DollarSign} 
          change={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Orders This Month" 
          value={loading ? '...' : String(stats?.ordersThisMonth || 0)} 
          icon={Package} 
          change={{ value: 8, isPositive: true }} 
        />
        <StatCard 
          title="New Customers" 
          value={loading ? '...' : String(stats?.newCustomers || 0)} 
          icon={Users} 
          change={{ value: 5, isPositive: true }} 
        />
        <StatCard 
          title="Pending Inquiries" 
          value={loading ? '...' : String(stats?.pendingInquiries || 0)} 
          icon={MessageSquare} 
          change={{ value: 0, isPositive: true }} 
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
              Live Data
            </div>
          </div>
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.revenueChart?.length ? stats.revenueChart : [{ date: 'Today', revenue: 0 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#666" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => v.slice(5)} // show MM-DD
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
                    dataKey="revenue" 
                    stroke="#E84118" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#E84118', strokeWidth: 2, stroke: '#0F0F0F' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-8">Orders by Category</h2>
          <div className="h-[250px] w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.ordersByCategory?.length ? stats.ordersByCategory : [{ name: 'No Data', value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(stats?.ordersByCategory || [{ name: 'No Data', value: 1 }]).map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="space-y-3 mt-4">
            {(stats?.ordersByCategory || []).slice(0, 4).map((item: any, index: number) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.value}</span>
              </div>
            ))}
            {(!stats?.ordersByCategory?.length) && (
              <p className="text-gray-500 text-xs text-center">No orders yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Low Stock Alert */}
      {stats?.lowStockProducts?.length > 0 && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h2 className="text-lg font-bold text-yellow-500">Low Stock Alert</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.lowStockProducts.map((item: any) => (
              <div key={item.id} className="bg-[#1A1A1A] border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm font-bold text-white">{item.name}</p>
                <p className="text-xs text-gray-400">{item.variant}</p>
                <p className="text-yellow-500 font-bold mt-1">{item.stock} left</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Row 4: Recent Orders */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#333] flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <a href="/admin/orders" className="text-[#E84118] text-sm font-bold hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No orders yet</div>
            ) : (
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
                  {orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-[#222] transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-white">{order.orderNumber}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{order.user?.name || 'Unknown'}</div>
                        <div className="text-[10px] text-gray-500 uppercase">{order.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[order.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-white text-right">${order.totalAmount?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
