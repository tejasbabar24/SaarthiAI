import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Twitter, Linkedin, Github, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Sarthi AI</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Find the Benefits You're Eligible For. We Help You Get Them.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {[
                ['Scheme Discovery', '/schemes'],
                ['Eligibility Check', '/schemes'],
                ['Document Assistance', '/documents'],
                ['Application Help', '/apply'],
                ['AI Assistant', '/ai-assistant'],
                ['Browser Extension', '/browser-extension'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-white/60 text-sm hover:text-orange transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                ['Home', '/'],
                ['How It Works', '/how-it-works'],
                ['For Citizens', '/for-citizens'],
                ['For Agents', '/for-agents'],
                ['About Us', '/about'],
                ['Get Started', '/get-started'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-white/60 text-sm hover:text-orange transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                support@sarthi.ai
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                1800-XXX-XXXX (Toll Free)
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/50">Government Partnership</p>
              <p className="text-sm font-medium mt-0.5">Ministry of Electronics & IT</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2024 Sarthi AI. Hackathon Project. All data is simulated for demonstration.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Terms of Use</a>
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
