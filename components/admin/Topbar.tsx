'use client';

import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Topbar = () => {
  const pathname = usePathname();
  
  // Simple breadcrumb generator
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    return { label, href, isLast };
  });

  return (
    <header className="h-16 border-b border-[#1A1A1A] bg-[#0F0F0F] flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <span className={crumb.isLast ? 'text-white font-medium' : 'text-gray-500'}>
              {crumb.label}
            </span>
            {!crumb.isLast && <span className="text-gray-700">/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E84118] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#E84118] w-64 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E84118] rounded-full border-2 border-[#0F0F0F]"></span>
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-gray-400 group-hover:border-[#E84118] transition-all overflow-hidden">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
