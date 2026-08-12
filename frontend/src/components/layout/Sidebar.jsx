import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, BookOpen, FileText, ClipboardList,
  MapPin, MessageSquare, Compass, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { to: '/for-citizens', tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/for-citizens/profile', tab: 'profile', label: 'My Profile', icon: User },
  { to: '/for-citizens/schemes', tab: 'schemes', label: 'Recommended Schemes', icon: BookOpen },
  { to: '/documents', tab: 'documents', label: 'Documents', icon: FileText },
  { to: '/for-citizens/applications', tab: 'applications', label: 'Applications', icon: ClipboardList },
  { to: '/for-citizens/nearby', tab: 'nearby', label: 'Nearby Services', icon: MapPin },
  { to: '/ai-assistant', tab: 'assistant', label: 'AI Assistant', icon: MessageSquare },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const { citizen } = useApp();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-border min-h-full flex flex-col">
      {/* Profile snippet */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm">
            {citizen.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-navy text-sm truncate">{citizen.name}</p>
            <p className="text-xs text-text-muted truncate">{citizen.id}</p>
          </div>
        </div>
        {/* Profile completion */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-text-muted">Profile completion</span>
            <span className="text-xs font-bold text-orange">{citizen.profileCompletion}%</span>
          </div>
          <div className="h-1.5 bg-bg rounded-full">
            <div
              className="h-full bg-orange rounded-full transition-all"
              style={{ width: `${citizen.profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ to, tab, label, icon: Icon }) => {
          const isActive = activeTab === tab;
          return (
            <NavLink
              key={tab}
              to={to}
              className={({ isActive: routeActive }) => {
                const active = onTabChange ? isActive : routeActive;
                return active ? 'sidebar-link-active' : 'sidebar-link';
              }}
              onClick={() => onTabChange && onTabChange(tab)}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-sm">{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Compass className="w-3.5 h-3.5 text-orange" />
          Sarthi AI v1.0
        </div>
      </div>
    </aside>
  );
}
