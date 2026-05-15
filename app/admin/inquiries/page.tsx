'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Mail, MoreVertical, Globe, CheckCircle, Clock, Send, Phone, User as UserIcon } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const statusStyles: Record<string, string> = {
  'NEW': 'bg-[#E84118]/10 text-[#E84118] border-[#E84118]/20',
  'CONTACTED': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'QUOTED': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'CLOSED': 'bg-green-500/10 text-green-500 border-green-500/20',
};

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (error) {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success(`Status updated to ${status}`);
        fetchInquiries();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const columns = [
    { 
      header: 'Contact Detail', 
      accessor: (item: any) => (
        <div>
          <div className="font-bold text-white flex items-center gap-2">
            <UserIcon size={14} className="text-primary" />
            {item.name}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Mail size={12} /> <span className="lowercase">{item.email}</span>
            {item.phone && <> • <Phone size={12} /> {item.phone}</>}
          </div>
        </div>
      )
    },
    { 
      header: 'Subject', 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">{item.subject}</span>
        </div>
      )
    },
    { 
      header: 'Message Snippet', 
      accessor: (item: any) => (
        <div className="max-w-xs truncate text-xs text-gray-400 italic">
          "{item.message}"
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: (item: any) => (
        <select 
          value={item.status} 
          onChange={(e) => updateStatus(item.id, e.target.value)}
          className={`text-[10px] font-bold px-2 py-1 rounded-full border bg-transparent ${statusStyles[item.status]} focus:outline-none cursor-pointer`}
        >
          <option value="NEW">NEW</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="QUOTED">QUOTED</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      )
    },
    { 
      header: 'Received', 
      accessor: (item: any) => (
        <div className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <a 
            href={`mailto:${item.email}?subject=Re: ${item.subject}`}
            className="p-2 bg-[#0F0F0F] border border-[#333] rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors" 
            title="Reply via Email"
          >
            <Mail size={16} />
          </a>
          {item.phone && (
            <a 
              href={`https://wa.me/${item.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#0F0F0F] border border-[#333] rounded-lg text-green-500 hover:bg-green-500/10 transition-colors" 
              title="Reply via WhatsApp"
            >
              <Phone size={16} />
            </a>
          )}
        </div>
      )
    }
  ];

  const stats = [
    { label: 'New', count: inquiries.filter(i => i.status === 'NEW').length, icon: Clock, color: 'text-[#E84118]' },
    { label: 'Contacted', count: inquiries.filter(i => i.status === 'CONTACTED').length, icon: Send, color: 'text-blue-500' },
    { label: 'Quoted', count: inquiries.filter(i => i.status === 'QUOTED').length, icon: Mail, color: 'text-purple-500' },
    { label: 'Closed', count: inquiries.filter(i => i.status === 'CLOSED').length, icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Contact Inquiries</h1>
          <p className="text-gray-500 text-sm font-body">Manage customer queries and export requests directly from your website.</p>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((step) => (
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
      <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl overflow-hidden">
        <DataTable 
          columns={columns} 
          data={inquiries}
          isLoading={loading}
          onEdit={(item) => alert(`Full Message:\n\n${item.message}`)}
        />
      </div>
    </div>
  );
};

export default InquiriesPage;
