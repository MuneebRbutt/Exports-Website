import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
  };
  badge?: string | number;
}

const StatCard = ({ title, value, icon: Icon, change, badge }: StatCardProps) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#333] p-6 rounded-xl hover:border-[#E84118]/50 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#0F0F0F] rounded-lg group-hover:bg-[#E84118]/10 transition-colors">
          <Icon className="text-gray-400 group-hover:text-[#E84118] transition-colors" size={24} />
        </div>
        {badge !== undefined && (
          <span className="bg-[#E84118] text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
            {badge}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {change && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              change.isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {change.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {change.value}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
