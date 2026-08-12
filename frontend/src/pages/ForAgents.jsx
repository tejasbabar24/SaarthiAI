import React, { useState } from 'react';
import {
  Users, FileClock, AlertCircle, CheckCircle2, Search, Filter,
  UserCheck, MapPin, Phone, ArrowUpRight, ShieldCheck, ChevronRight
} from 'lucide-react';
import { agentData } from '../data/citizens';
import { agentRequests } from '../data/applications';
import DashboardCard from '../components/dashboard/DashboardCard';
import Footer from '../components/layout/Footer';
import { useApp } from '../context/AppContext';

export default function ForAgents() {
  const { addToast } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [requests, setRequests] = useState(agentRequests);

  const handleResolve = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'completed' } : r));
    addToast('Request marked as resolved and notification sent to citizen.', 'success');
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.citizenName.toLowerCase().includes(search.toLowerCase()) ||
                          r.scheme.toLowerCase().includes(search.toLowerCase()) ||
                          r.citizenId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus.toLowerCase().replace(' ', '_');
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-10 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-orange font-semibold tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4" /> Agent Assistance Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Agent Dashboard</h1>
            <p className="text-white/70 text-sm mt-1">
              Field Agent: <strong>{agentData.name}</strong> ({agentData.id}) · Zone: <strong>{agentData.zone}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Agent Active
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Agent Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            icon={<Users className="w-5 h-5 text-white" />}
            label="Citizens Assisted"
            value={agentData.stats.citizensAssisted}
            color="navy"
          />
          <DashboardCard
            icon={<FileClock className="w-5 h-5 text-white" />}
            label="Pending Applications"
            value={agentData.stats.pendingApplications}
            color="orange"
          />
          <DashboardCard
            icon={<AlertCircle className="w-5 h-5 text-white" />}
            label="Documents Pending"
            value={agentData.stats.documentsPending}
            color="red"
          />
          <DashboardCard
            icon={<CheckCircle2 className="w-5 h-5 text-white" />}
            label="Completed Applications"
            value={agentData.stats.completedApplications}
            color="green"
          />
        </div>

        {/* Requests & Assistance Section */}
        <div className="card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-bold text-navy">Field Assistance Requests</h2>
              <p className="text-xs text-text-muted">Citizens in your zone who requested agent assistance for document verification or submission.</p>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search citizen or scheme..."
                  className="input-field text-xs pl-9 py-1.5 w-48"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="input-field text-xs py-1.5 w-32"
              >
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Table / List of requests */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg text-text-muted text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="py-3 px-4">Citizen</th>
                  <th className="py-3 px-4">Target Scheme</th>
                  <th className="py-3 px-4">Issue / Support Need</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-bg/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">
                      <div>{req.citizenName}</div>
                      <div className="text-xs text-text-muted font-normal">{req.citizenId}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-text-dark">{req.scheme}</td>
                    <td className="py-3.5 px-4 text-xs text-text-muted max-w-xs leading-relaxed">{req.issue}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                        req.priority === 'high' ? 'bg-red-100 text-red-700' :
                        req.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                        req.status === 'completed' ? 'bg-green-100 text-green-700' :
                        req.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange/10 text-orange'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {req.status !== 'completed' ? (
                        <button
                          onClick={() => handleResolve(req.id)}
                          className="btn-navy text-xs py-1 px-3"
                        >
                          Resolve
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
