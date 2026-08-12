import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, ChevronDown, Menu, X, Globe, LogIn, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/how-it-works', label: 'HOW IT WORKS' },
  { to: '/schemes', label: 'SCHEMES' },
  { to: '/for-citizens', label: 'FOR CITIZENS' },
  { to: '/for-agents', label: 'FOR AGENTS' },
  { to: '/about', label: 'ABOUT' },
];

export default function Navbar() {
  const { isLoggedIn, logout, language, setLanguage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  const langOptions = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  ];

  const currentLang = langOptions.find(l => l.code === language) || langOptions[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-navy font-bold text-lg tracking-tight">Sarthi AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-wider transition-colors duration-150 pb-1 ${
                    isActive
                      ? 'text-navy border-b-2 border-navy'
                      : 'text-text-muted hover:text-navy'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-navy border border-border rounded-lg px-3 py-2 hover:border-navy transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                {currentLang.code.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-card-md py-1 min-w-[130px] z-50">
                  {langOptions.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setLanguage(opt.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-bg flex items-center gap-2 ${language === opt.code ? 'text-navy font-semibold' : 'text-text-dark'}`}
                    >
                      <span>{opt.flag}</span> {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/for-citizens')}
                  className="text-sm font-medium text-text-dark hover:text-navy transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-text-muted hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1.5 text-sm font-semibold text-text-dark hover:text-navy transition-colors">
                  <LogIn className="w-4 h-4" />
                  LOGIN
                </Link>
                <Link
                  to="/get-started"
                  className="flex items-center gap-1.5 btn-navy text-xs tracking-wide"
                >
                  <Zap className="w-3.5 h-3.5" />
                  GET STARTED
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-bg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-navy" /> : <Menu className="w-5 h-5 text-navy" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-4 py-4 space-y-1 animate-fade-in-up">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide ${
                  isActive ? 'bg-navy text-white' : 'text-text-dark hover:bg-bg hover:text-navy'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-border flex gap-2">
            {isLoggedIn ? (
              <>
                <button onClick={() => { navigate('/for-citizens'); setMobileOpen(false); }} className="btn-secondary flex-1 justify-center">Dashboard</button>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="btn-secondary flex-1 justify-center">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 justify-center">LOGIN</Link>
                <Link to="/get-started" onClick={() => setMobileOpen(false)} className="btn-navy flex-1 justify-center">GET STARTED</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
