import React from 'react';

export default function DashboardCard({ icon, label, value, sub, color = 'navy', onClick }) {
  const colors = {
    navy: 'bg-navy text-white',
    blue: 'bg-blue-brand text-white',
    orange: 'bg-orange text-white',
    green: 'bg-green-600 text-white',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-600 text-white',
  };

  const iconBg = {
    navy: 'bg-white/20',
    blue: 'bg-white/20',
    orange: 'bg-white/20',
    green: 'bg-white/20',
    red: 'bg-white/20',
    purple: 'bg-white/20',
  };

  return (
    <div
      className={`${colors[color]} rounded-xl p-5 shadow-card cursor-pointer hover:-translate-y-0.5 hover:shadow-card-md transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg[color]} flex items-center justify-center`}>
          {icon}
        </div>
        {sub && <span className="text-xs font-medium opacity-70">{sub}</span>}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-80 font-medium">{label}</div>
    </div>
  );
}
