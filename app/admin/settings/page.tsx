'use client';

import React from 'react';
import { Save, Globe, CreditCard, Truck, Bell, Shield, Info, MessageCircle, Banknote } from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-[64px] bg-[#0F0F0F]/80 backdrop-blur-md py-4 z-30 border-b border-[#1A1A1A] -mx-8 px-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Settings</h1>
          <p className="text-sm text-gray-500">Configure your store configuration and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-[#E84118] text-white rounded-lg hover:bg-[#ff5a36] transition-colors text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#E84118]/20"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* General Store Info */}
        <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#333] pb-4">
            <Info className="text-[#E84118]" size={20} />
            <h2 className="font-bold text-white uppercase tracking-wider text-sm">General Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Store Name</label>
              <input 
                type="text" 
                defaultValue="Meharstare"
                className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@meharstare.com"
                className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Store Address</label>
              <textarea 
                rows={3}
                defaultValue="123 Export Zone, Industrial Area, Sialkot, Pakistan"
                className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] resize-none"
              />
            </div>
          </div>
        </section>

        {/* Regional & Currency */}
        <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#333] pb-4">
            <Globe className="text-[#E84118]" size={20} />
            <h2 className="font-bold text-white uppercase tracking-wider text-sm">Regional & Currency</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Store Currency</label>
              <select className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] appearance-none">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Timezone</label>
              <select className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118] appearance-none">
                <option value="GMT+5">(GMT+05:00) Islamabad, Karachi</option>
                <option value="UTC">UTC (Universal Coordinated Time)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Manual Payment Methods */}
        <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#333] pb-4">
            <CreditCard className="text-[#E84118]" size={20} />
            <h2 className="font-bold text-white uppercase tracking-wider text-sm">Payment Methods (Zero Fees)</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0F0F0F] border border-[#333] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center text-green-500">
                  <Banknote size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Cash on Delivery (COD)</p>
                  <p className="text-[10px] text-gray-500">Manual payment upon delivery. Zero transaction fees.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">ENABLED</span>
                <div className="w-10 h-5 bg-[#E84118] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0F0F0F] border border-[#333] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">WhatsApp Verification</p>
                  <p className="text-[10px] text-gray-500">Manual order confirmation via WhatsApp. No payment processing fees.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">ENABLED</span>
                <div className="w-10 h-5 bg-[#E84118] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0F0F0F] border border-[#333] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E84118]/10 rounded-lg flex items-center justify-center text-[#E84118]">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Direct Bank Transfer</p>
                  <p className="text-[10px] text-gray-500">Manual verification after bank transfer receipt.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-500 bg-gray-500/10 px-2 py-0.5 rounded border border-gray-500/20">DISABLED</span>
                <div className="w-10 h-5 bg-gray-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping & Tax */}
        <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#333] pb-4">
            <Truck className="text-[#E84118]" size={20} />
            <h2 className="font-bold text-white uppercase tracking-wider text-sm">Shipping & Tax</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#0F0F0F] border border-[#333] rounded-lg">
              <span className="text-sm font-medium text-gray-300">Standard Shipping Rate</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">$</span>
                <input type="number" defaultValue="15" className="w-20 bg-transparent text-sm font-bold text-white text-right focus:outline-none" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0F0F0F] border border-[#333] rounded-lg">
              <span className="text-sm font-medium text-gray-300">Free Shipping Threshold</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">$</span>
                <input type="number" defaultValue="200" className="w-20 bg-transparent text-sm font-bold text-white text-right focus:outline-none" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
