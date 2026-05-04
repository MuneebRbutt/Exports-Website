import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #333',
          },
        }}
      />
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-[260px]">
        <Topbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
