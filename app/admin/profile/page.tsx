'use client';

import React from 'react';
import { User, Mail, Shield, Lock, Bell, Camera, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-[64px] bg-[#0F0F0F]/80 backdrop-blur-md py-4 z-30 border-b border-[#1A1A1A] -mx-8 px-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-sm text-gray-500">Manage your personal information and security settings.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-[#E84118] text-white rounded-lg hover:bg-[#ff5a36] transition-colors text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#E84118]/20"
        >
          <Save size={18} />
          Save Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Stats */}
        <div className="space-y-6">
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-8 flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full bg-[#0F0F0F] border-2 border-[#333] flex items-center justify-center text-4xl font-bold text-[#E84118] overflow-hidden">
                AD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#E84118] text-white rounded-full border-4 border-[#1A1A1A] hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">Admin User</h2>
            <p className="text-sm text-gray-500 mb-6">Super Administrator</p>
            
            <div className="w-full grid grid-cols-2 gap-4 border-t border-[#333] pt-6">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Last Login</p>
                <p className="text-xs text-white">Today, 10:45 AM</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Status</p>
                <p className="text-xs text-green-500 font-bold">ACTIVE</p>
              </div>
            </div>
          </section>

          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-[#E84118]" size={18} />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Role Permissions</h3>
            </div>
            <div className="space-y-2">
              {['Manage Products', 'Process Orders', 'View Analytics', 'System Settings'].map((perm) => (
                <div key={perm} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-1 h-1 bg-[#E84118] rounded-full"></div>
                  {perm}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Personal Details & Password */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4">
              <User className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin User"
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
                <input 
                  type="text" 
                  defaultValue="admin_meharstare"
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="email" 
                    defaultValue="admin@meharstare.com"
                    className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4">
              <Lock className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Security & Password</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E84118]"
                  />
                </div>
              </div>
              <button className="text-xs font-bold text-[#E84118] hover:underline">Forgot your password?</button>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#333] pb-4">
              <Bell className="text-[#E84118]" size={20} />
              <h2 className="font-bold text-white uppercase tracking-wider text-sm">Notification Preferences</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Email for new orders', desc: 'Receive a copy of every new order confirmation' },
                { label: 'Stock alerts', desc: 'Get notified when products reach low stock levels' },
                { label: 'Export inquiries', desc: 'Instant notification for new B2B export leads' }
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0F0F0F] border border-[#333] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-300">{pref.label}</p>
                    <p className="text-[10px] text-gray-500">{pref.desc}</p>
                  </div>
                  <div className="w-10 h-5 bg-[#E84118] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
