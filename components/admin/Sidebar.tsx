'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Box, 
  Package, 
  Users, 
  Warehouse, 
  Settings, 
  User, 
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
      ]
    },
    {
      title: 'STORE',
      items: [
        { name: 'Products', icon: Box, href: '/admin/products' },
        { name: 'Orders', icon: Package, href: '/admin/orders' },
        { name: 'Customers', icon: Users, href: '/admin/customers' },
        { name: 'Inventory', icon: Warehouse, href: '/admin/inventory' },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'Store Settings', icon: Settings, href: '/admin/settings' },
        { name: 'My Profile', icon: User, href: '/admin/profile' },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#0F0F0F] border-r border-[#1A1A1A] flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-[#1A1A1A]">
        <h1 className="text-xl font-bold text-[#E84118] tracking-wider">
          MEHARSTARE ADMIN
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-[10px] font-bold text-gray-500 tracking-[0.1em] mb-3 px-3">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                      isActive 
                        ? 'bg-[#E84118] text-white' 
                        : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    { (item as any).badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-[#E84118]' : 'bg-[#E84118] text-white'
                      }`}>
                        {(item as any).badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#1A1A1A] space-y-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-xs font-bold text-white">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@meharstare.com</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
