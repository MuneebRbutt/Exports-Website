'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, MoreVertical, Globe, CheckCircle, Clock, Send, Phone } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';

const mockInquiries = [
  { id: '1', company: 'Global Sports Ltd', contact: 'Mark Thompson', email: 'mark@globalsports.com', country: 'UK', products: 'Custom Team Jerseys', qty: '500 pcs', status: 'NEW', date: '2 hours ago' },
  { id: '2', company: 'EuroFit Gear', contact: 'Elena Rodriguez', email: 'elena@eurofit.es', country: 'Spain', products: 'Boxing Gloves (Leather)', qty: '200 pairs', status: 'CONTACTED', date: '5 hours ago' },
  { id: '3', company: 'US Pro Athletics', contact: 'David Miller', email: 'd.miller@uspro.com', country: 'USA', products: 'Duffle Bags, Hoodies', qty: '1000 pcs total', status: 'QUOTED', date: '1 day ago' },
  { id: '4', company: 'Melbourne Gym Supplies', contact: 'James Cook', email: 'james@melbournegym.au', country: 'Australia', products: 'Weightlifting Belts', qty: '150 pcs', status: 'CLOSED', date: '3 days ago' },
];

const statusStyles: Record<string, string> = {
  'NEW': 'bg-[#E84118]/10 text-[#E84118] border-[#E84118]/20',
  'CONTACTED': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'QUOTED': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'CLOSED': 'bg-green-500/10 text-green-500 border-green-500/20',
};

const InquiriesPage = () => {
  const columns = [
    { 
      header: 'Company & Contact', 
      accessor: (item: any) => (
        <div>
          <div className="font-bold text-white">{item.company}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            {item.contact} • <span className="lowercase">{item.email}</span>
          </div>
        </div>
      )
    },
    { 
      header: 'Country', 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-gray-500" />
          <span>{item.country}</span>
        </div>
      )
    },
    { 
      header: 'Requirements', 
      accessor: (item: any) => (
        <div>
          <div className="text-sm text-gray-300">{item.products}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">{item.qty}</div>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusStyles[item.status]}`}>
          {item.status}
        </span>
      )
    },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Quick Actions',
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <button className="p-2 bg-[#0F0F0F] border border-[#333] rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors" title="Email">
            <Mail size={16} />
          </button>
          <button className="p-2 bg-[#0F0F0F] border border-[#333] rounded-lg text-green-500 hover:bg-green-500/10 transition-colors" title="WhatsApp">
            <Phone size={16} />
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
          <h1 className="text-2xl font-bold text-white">Export Inquiries</h1>
          <p className="text-gray-500 text-sm">Manage B2B export leads and wholesale requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#1A1A1A] border border-[#333] px-4 py-2 rounded-lg flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Conversion Rate</span>
              <span className="text-sm font-bold text-white">24.8%</span>
            </div>
            <div className="w-px h-8 bg-[#333]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Avg. Response</span>
              <span className="text-sm font-bold text-white">1.2 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'New', count: 14, icon: Clock, color: 'text-[#E84118]' },
          { label: 'Contacted', count: 8, icon: Send, color: 'text-blue-500' },
          { label: 'Quoted', count: 5, icon: Mail, color: 'text-purple-500' },
          { label: 'Closed', count: 32, icon: CheckCircle, color: 'text-green-500' },
        ].map((step) => (
          <div key={step.label} className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-[#0F0F0F] ${step.color}`}>
                <step.icon size={20} />
              </div>
              <span className="text-sm font-medium text-gray-400">{step.label}</span>
            </div>
            <span className="text-xl font-bold text-white">{step.count}</span>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={mockInquiries}
        onEdit={(item) => console.log('View Inquiry Detail', item)}
      />
    </div>
  );
};

export default InquiriesPage;
