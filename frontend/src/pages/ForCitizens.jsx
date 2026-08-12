import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LayoutDashboard, User, BookOpen, FileText, ClipboardList,
  MapPin, MessageSquare, Sun, Edit3, CheckCircle, AlertCircle,
  ArrowRight, Bell, Menu, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { schemes } from '../data/schemes';
import { documents } from '../data/documents';
import { applications } from '../data/applications';
import DashboardCard from '../components/dashboard/DashboardCard';
import SchemeCard from '../components/schemes/SchemeCard';
import DocumentCard from '../components/dashboard/DocumentCard';
import ApplicationCard from '../components/dashboard/ApplicationCard';
import LocationCard from '../components/dashboard/LocationCard';
import { serviceLocations } from '../data/locations';
import Sidebar from '../components/layout/Sidebar';

const navItems = [
  { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { tab: 'profile', label: 'My Profile', icon: User },
  { tab: 'schemes', label: 'Recommended Schemes', icon: BookOpen },
  { tab: 'documents', label: 'Documents', icon: FileText },
  { tab: 'applications', label: 'Applications', icon: ClipboardList },
  { tab: 'nearby', label: 'Nearby Services', icon: MapPin },
];

function DashboardHome({ citizen, navigate }) {
  const recommended = schemes.filter(s => s.matchPercent >= 75).slice(0, 4);
  const verified = documents.filter(d => d.status === 'verified');
  const missing = documents.filter(d => d.status === 'missing');

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
            <Sun className="w-4 h-4 text-orange" />
            Good Evening
          </div>
          <h1 className="text-2xl font-extrabold text-navy">Good Evening, {citizen.firstName} 👋</h1>
          <p className="text-sm text-text-muted mt-1">Here's your benefit discovery status</p>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-bg border border-border">
          <Bell className="w-5 h-5 text-text-muted" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full text-white text-xs flex items-center justify-center font-bold">2</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          icon={<BookOpen className="w-5 h-5 text-white" />}
          label="Recommended Schemes"
          value={recommended.length}
          color="blue"
          onClick={() => navigate('/for-citizens/schemes')}
        />
        <DashboardCard
          icon={<ClipboardList className="w-5 h-5 text-white" />}
          label="Applications"
          value={applications.length}
          color="navy"
          onClick={() => navigate('/for-citizens/applications')}
        />
        <DashboardCard
          icon={<CheckCircle className="w-5 h-5 text-white" />}
          label="Documents Verified"
          value={verified.length}
          color="green"
          onClick={() => navigate('/documents')}
        />
        <DashboardCard
          icon={<AlertCircle className="w-5 h-5 text-white" />}
          label="Missing Documents"
          value={missing.length}
          color="orange"
          onClick={() => navigate('/documents')}
        />
      </div>

      {/* Profile completion alert */}
      {citizen.profileCompletion < 100 && (
        <div className="bg-orange/5 border border-orange/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange">Complete your profile to get better matches</p>
            <p className="text-xs text-text-muted">Your profile is {citizen.profileCompletion}% complete. Add missing info to unlock more schemes.</p>
          </div>
          <button
            onClick={() => navigate('/for-citizens/profile')}
            className="btn-orange text-xs py-1.5 px-3 whitespace-nowrap"
          >
            Complete Profile
          </button>
        </div>
      )}

      {/* Recommended Schemes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-navy">Recommended Schemes</h2>
          <button onClick={() => navigate('/for-citizens/schemes')} className="text-sm text-blue-brand font-medium flex items-center gap-1 hover:text-blue-dark">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommended.slice(0, 2).map(s => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-navy">Recent Applications</h2>
          <button onClick={() => navigate('/for-citizens/applications')} className="text-sm text-blue-brand font-medium flex items-center gap-1 hover:text-blue-dark">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map(app => <ApplicationCard key={app.id} app={app} />)}
        </div>
      </div>

      {/* Document Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-navy">Document Status</h2>
          <button onClick={() => navigate('/documents')} className="text-sm text-blue-brand font-medium flex items-center gap-1 hover:text-blue-dark">
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {documents.slice(0, 4).map(doc => <DocumentCard key={doc.id} doc={doc} />)}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ citizen, updateCitizen, addToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(citizen);

  const handleSave = () => {
    updateCitizen(form);
    setEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const field = (label, key, type = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-text-dark uppercase tracking-wide mb-1">{label}</label>
      {editing ? (
        <input
          type={type}
          value={form[key] || ''}
          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          className="input-field"
        />
      ) : (
        <p className="text-sm text-text-dark bg-bg px-3 py-2.5 rounded-lg border border-border">{citizen[key] || '–'}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy">My Profile</h2>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="btn-secondary flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setEditing(false); setForm(citizen); }} className="btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn-primary">Save Changes</button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border">
          <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center text-white font-bold text-xl">
            {citizen.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="font-bold text-navy text-xl">{citizen.name}</h3>
            <p className="text-sm text-text-muted">{citizen.id}</p>
            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
              <CheckCircle className="w-3 h-3" /> Verified Citizen
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Full Name', 'name')}
          {field('Date of Birth', 'dob', 'date')}
          {field('Gender', 'gender')}
          {field('Mobile', 'mobile', 'tel')}
          {field('Email', 'email', 'email')}
          {field('State', 'state')}
          {field('District', 'district')}
          {field('Category', 'category')}
          {field('Annual Income (₹)', 'annualIncome', 'number')}
          {field('Occupation', 'occupation')}
          {field('Education', 'education')}
          {field('Aadhaar', 'aadhaar')}
        </div>
      </div>
    </div>
  );
}

export default function ForCitizens() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { citizen, updateCitizen, addToast } = useApp();
  const [activeTab, setActiveTab] = useState(tab || 'dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const recommended = schemes.filter(s => s.matchPercent >= 70);

  const handleTabChange = (t) => {
    setActiveTab(t);
    setMobileSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome citizen={citizen} navigate={navigate} />;
      case 'profile': return <ProfileTab citizen={citizen} updateCitizen={updateCitizen} addToast={addToast} />;
      case 'schemes': return (
        <div>
          <h2 className="text-lg font-bold text-navy mb-5">Recommended Schemes ({recommended.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommended.map(s => <SchemeCard key={s.id} scheme={s} />)}
          </div>
        </div>
      );
      case 'documents': navigate('/documents'); return null;
      case 'applications': return (
        <div>
          <h2 className="text-lg font-bold text-navy mb-5">My Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map(app => <ApplicationCard key={app.id} app={app} />)}
          </div>
        </div>
      );
      case 'nearby': return (
        <div>
          <h2 className="text-lg font-bold text-navy mb-5">Nearby Service Centers</h2>
          <div className="space-y-4">
            {serviceLocations.map(loc => <LocationCard key={loc.id} location={loc} />)}
          </div>
        </div>
      );
      default: return <DashboardHome citizen={citizen} navigate={navigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-navy/40 z-30 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed left-0 top-16 bottom-0 z-40 lg:hidden transition-transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-16 h-[calc(100vh-64px)]">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-border">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 hover:bg-bg rounded-lg">
            <Menu className="w-5 h-5 text-navy" />
          </button>
          <span className="font-semibold text-navy capitalize">{activeTab === 'dashboard' ? 'Dashboard' : activeTab}</span>
        </div>

        <div className="p-5 lg:p-8 max-w-5xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
