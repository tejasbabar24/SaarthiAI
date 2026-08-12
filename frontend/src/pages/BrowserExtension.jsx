import React, { useState } from 'react';
import { Sparkles, CheckCircle, ArrowRight, Play, RefreshCw, Layers, ShieldCheck, Laptop } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useApp } from '../context/AppContext';

export default function BrowserExtension() {
  const { citizen, addToast } = useApp();
  const [isFilling, setIsFilling] = useState(false);
  const [formState, setFormState] = useState({
    applicantName: '',
    dob: '',
    category: '',
    aadhaar: '',
    income: '',
  });

  const handleSimulateAutoFill = () => {
    setIsFilling(true);
    addToast('Sarthi AI Extension detected supported government portal fields!', 'info');

    setTimeout(() => {
      setFormState({
        applicantName: citizen.name,
        dob: citizen.dob,
        category: citizen.category,
        aadhaar: citizen.aadhaar,
        income: citizen.annualIncome.toString(),
      });
      setIsFilling(false);
      addToast('Form fields successfully auto-filled from Sarthi Vault!', 'success');
    }, 1500);
  };

  const handleResetDemo = () => {
    setFormState({
      applicantName: '',
      dob: '',
      category: '',
      aadhaar: '',
      income: '',
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange/20 text-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" /> JANMITRA / SARTHI EXTENSION
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">AI-Assisted Form Filling</h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
            Never fill repetitive government application forms manually again. Our smart browser extension auto-detects form fields and fills them securely using your verified citizen vault.
          </p>
        </div>
      </section>

      {/* Steps Banner */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
            {[
              { step: '1', title: 'Open Portal', desc: 'Navigate to any supported govt website' },
              { step: '2', title: 'Detect Fields', desc: 'Extension maps form inputs automatically' },
              { step: '3', title: 'Review Info', desc: 'Citizen previews mapped data securely' },
              { step: '4', title: 'Auto Fill', desc: 'Sarthi AI fills all matching fields instantly' },
              { step: '5', title: 'Manual Submit', desc: 'Citizen reviews final form and submits' },
            ].map(item => (
              <div key={item.step} className="p-4 bg-bg rounded-xl border border-border">
                <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <p className="text-xs font-bold text-navy mb-1">{item.title}</p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">Try the Interactive Extension Demo</h2>
            <p className="section-subtitle">Experience how Sarthi AI fills complex government forms in real-time.</p>
          </div>

          <div className="bg-white border border-border rounded-2xl shadow-card-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Mock Portal */}
            <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-navy" />
                  <span className="text-xs font-bold text-navy uppercase tracking-wider">MahaDBT Portal (Simulated)</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">
                  Post-Matric Scholarship Form
                </span>
              </div>

              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1">Applicant Name</label>
                  <input
                    type="text"
                    readOnly
                    value={formState.applicantName}
                    placeholder="e.g. Tejas Patil"
                    className="input-field bg-bg"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Date of Birth</label>
                    <input
                      type="text"
                      readOnly
                      value={formState.dob}
                      placeholder="YYYY-MM-DD"
                      className="input-field bg-bg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Social Category</label>
                    <input
                      type="text"
                      readOnly
                      value={formState.category}
                      placeholder="e.g. SC / ST / OBC"
                      className="input-field bg-bg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Aadhaar Number</label>
                    <input
                      type="text"
                      readOnly
                      value={formState.aadhaar}
                      placeholder="XXXX-XXXX-XXXX"
                      className="input-field bg-bg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Annual Family Income (₹)</label>
                    <input
                      type="text"
                      readOnly
                      value={formState.income}
                      placeholder="e.g. 240000"
                      className="input-field bg-bg"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Right Side – Extension Floating Sidebar Mock */}
            <div className="lg:col-span-4 bg-navy p-6 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 bg-orange rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    S
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider">SARTHI ASSISTANT</p>
                    <p className="text-[10px] text-white/60">Browser Extension v1.2</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3.5 mb-6 space-y-2">
                  <p className="text-xs font-semibold text-orange flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> 5 Supported Fields Found
                  </p>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Sarthi AI matched this page with your profile vault: <strong className="text-white">{citizen.name}</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleSimulateAutoFill}
                    disabled={isFilling}
                    className="w-full btn-orange text-xs justify-center py-3 shadow-md"
                  >
                    {isFilling ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Auto-Filling...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Play className="w-4 h-4 fill-white" /> Try Demo (Auto-Fill)
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleResetDemo}
                    className="w-full text-xs text-white/60 hover:text-white py-2 transition-colors text-center block"
                  >
                    Clear Demo Form
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/50">
                <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                <span>Zero-knowledge client-side decryption. Your data stays in local vault.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
