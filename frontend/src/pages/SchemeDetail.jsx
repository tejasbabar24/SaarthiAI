import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, XCircle, FileText, BookOpen, AlertCircle,
  ChevronRight, ExternalLink, Sparkles, Calendar, Building2, Award
} from 'lucide-react';
import { schemes } from '../data/schemes';
import { useApp } from '../context/AppContext';
import EligibilityBadge from '../components/schemes/EligibilityBadge';
import Footer from '../components/layout/Footer';

function EligibilityChecker({ scheme, citizen }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useApp();

  // Simple local eligibility logic
  const checks = [
    {
      label: 'Age requirement',
      passed: citizen.age >= (scheme.eligibility.minAge || 0) && citizen.age <= (scheme.eligibility.maxAge || 99),
      value: `Your age: ${citizen.age}`,
      required: `${scheme.eligibility.minAge || 0}–${scheme.eligibility.maxAge || 'Any'} years`,
    },
    {
      label: 'Gender requirement',
      passed: !scheme.eligibility.gender || scheme.eligibility.gender.includes(citizen.gender) || scheme.eligibility.gender.includes('Any'),
      value: `Your gender: ${citizen.gender}`,
      required: scheme.eligibility.gender?.join('/') || 'Any',
    },
    {
      label: 'Annual income',
      passed: !scheme.eligibility.maxIncome || citizen.annualIncome <= scheme.eligibility.maxIncome,
      value: `Your income: ₹${citizen.annualIncome.toLocaleString()}`,
      required: scheme.eligibility.maxIncome ? `≤ ₹${scheme.eligibility.maxIncome.toLocaleString()}` : 'No limit',
    },
    {
      label: 'Category',
      passed: !scheme.eligibility.category || scheme.eligibility.category.includes(citizen.category) || scheme.eligibility.category.includes('General'),
      value: `Your category: ${citizen.category}`,
      required: scheme.eligibility.category?.join(', ') || 'All',
    },
  ];

  const passed = checks.filter(c => c.passed).length;
  const total = checks.length;
  const pct = Math.round((passed / total) * 100);
  const isEligible = pct >= 75;

  const runCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChecked(true);
    }, 1200);
  };

  const handleApply = () => {
    addToast(`Starting application for ${scheme.name}`, 'success');
    navigate(`/apply/${scheme.id}`);
  };

  if (!checked) {
    return (
      <div className="text-center py-6">
        <Sparkles className="w-10 h-10 text-orange mx-auto mb-3" />
        <h3 className="font-bold text-navy mb-2">Check Your Eligibility</h3>
        <p className="text-sm text-text-muted mb-5">
          We'll analyze your profile against this scheme's criteria instantly.
        </p>
        <button onClick={runCheck} disabled={loading} className="btn-primary px-8 py-3">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            <><Sparkles className="w-4 h-4" /> Check My Eligibility</>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Result */}
      <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        {isEligible
          ? <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
          : <XCircle className="w-6 h-6 text-red-500 shrink-0" />
        }
        <div>
          <p className={`font-bold ${isEligible ? 'text-green-800' : 'text-red-700'}`}>
            {pct}% Match — {isEligible ? 'You may be eligible!' : 'Not currently eligible'}
          </p>
          <p className="text-sm text-text-muted">
            {isEligible
              ? 'Your profile meets the key criteria. Apply now!'
              : 'Your profile does not fully meet the criteria. See details below.'
            }
          </p>
        </div>
      </div>

      {/* Criteria breakdown */}
      <div className="space-y-2 mb-5">
        {checks.map((c, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${c.passed ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            {c.passed
              ? <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              : <XCircle className="w-4 h-4 text-red-500 shrink-0" />
            }
            <div className="flex-1">
              <span className="font-medium">{c.label}</span>
              <span className="text-text-muted ml-2">({c.value})</span>
            </div>
            <span className={`text-xs font-medium ${c.passed ? 'text-green-700' : 'text-red-600'}`}>
              Required: {c.required}
            </span>
          </div>
        ))}
      </div>

      {isEligible && (
        <button onClick={handleApply} className="btn-primary w-full justify-center py-3">
          <Sparkles className="w-4 h-4" /> Start Application
        </button>
      )}
      {!isEligible && (
        <button onClick={() => setChecked(false)} className="btn-secondary w-full justify-center py-3">
          Recheck
        </button>
      )}
    </div>
  );
}

export default function SchemeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { citizen } = useApp();

  const scheme = schemes.find(s => s.id === parseInt(id));

  if (!scheme) return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <AlertCircle className="w-12 h-12 text-border" />
      <p className="text-text-muted">Scheme not found.</p>
      <button onClick={() => navigate('/schemes')} className="btn-primary">Back to Schemes</button>
    </div>
  );

  const categoryColors = {
    'Education': 'bg-blue-50 border-blue-200',
    'Agriculture': 'bg-green-50 border-green-200',
    'Health': 'bg-red-50 border-red-200',
    'Housing': 'bg-purple-50 border-purple-200',
    'Employment': 'bg-orange/5 border-orange/30',
    'Women & Child': 'bg-pink-50 border-pink-200',
    'Social Welfare': 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/schemes')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Schemes
          </button>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold bg-white/10 text-white px-2.5 py-1 rounded-full">{scheme.category}</span>
                <span className="text-xs font-semibold bg-white/10 text-white px-2.5 py-1 rounded-full">{scheme.state}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{scheme.name}</h1>
              <p className="text-white/70 text-sm leading-relaxed">{scheme.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <Building2 className="w-4 h-4 text-white/50" />
                <span className="text-xs text-white/60">{scheme.ministry}</span>
              </div>
            </div>
            <div className="shrink-0">
              <EligibilityBadge percent={scheme.matchPercent} />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Benefits */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-orange" />
                <h2 className="text-base font-bold text-navy">Benefits</h2>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <p className="text-lg font-bold text-green-800">{scheme.benefit}</p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-brand" />
                <h2 className="text-base font-bold text-navy">Eligibility Criteria</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {scheme.eligibility.minAge !== undefined && (
                  <div className="bg-bg rounded-lg p-3">
                    <p className="text-xs text-text-muted mb-0.5">Age</p>
                    <p className="text-sm font-semibold text-text-dark">{scheme.eligibility.minAge}–{scheme.eligibility.maxAge || 'Any'} years</p>
                  </div>
                )}
                {scheme.eligibility.gender && (
                  <div className="bg-bg rounded-lg p-3">
                    <p className="text-xs text-text-muted mb-0.5">Gender</p>
                    <p className="text-sm font-semibold text-text-dark">{scheme.eligibility.gender.join(', ')}</p>
                  </div>
                )}
                {scheme.eligibility.maxIncome && (
                  <div className="bg-bg rounded-lg p-3">
                    <p className="text-xs text-text-muted mb-0.5">Annual Income</p>
                    <p className="text-sm font-semibold text-text-dark">≤ ₹{scheme.eligibility.maxIncome.toLocaleString()}</p>
                  </div>
                )}
                {scheme.eligibility.category && (
                  <div className="bg-bg rounded-lg p-3">
                    <p className="text-xs text-text-muted mb-0.5">Category</p>
                    <p className="text-sm font-semibold text-text-dark">{scheme.eligibility.category.join(', ')}</p>
                  </div>
                )}
                {scheme.eligibility.education && (
                  <div className="bg-bg rounded-lg p-3">
                    <p className="text-xs text-text-muted mb-0.5">Education</p>
                    <p className="text-sm font-semibold text-text-dark">{scheme.eligibility.education}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-base font-bold text-navy">Required Documents</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scheme.documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 bg-bg border border-border rounded-lg px-3 py-2">
                    <FileText className="w-3.5 h-3.5 text-text-muted shrink-0" />
                    <span className="text-sm text-text-dark">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight className="w-5 h-5 text-navy" />
                <h2 className="text-base font-bold text-navy">Application Process</h2>
              </div>
              <ol className="space-y-3">
                {scheme.applicationProcess.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-text-dark leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Important Info */}
            <div className={`border rounded-xl p-4 ${categoryColors[scheme.category] || 'bg-bg border-border'}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange" />
                <h3 className="text-sm font-bold text-navy">Important Information</h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-dark">
                <Calendar className="w-4 h-4 text-text-muted" />
                <span><strong>Deadline:</strong> {scheme.deadline}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Eligibility Checker */}
            <div className="card">
              <h3 className="text-base font-bold text-navy mb-4">Check My Eligibility</h3>
              <EligibilityChecker scheme={scheme} citizen={citizen} />
            </div>

            {/* Quick facts */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy mb-3">Quick Facts</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Category</span>
                  <span className="font-medium text-navy">{scheme.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">State</span>
                  <span className="font-medium text-navy">{scheme.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Match</span>
                  <EligibilityBadge percent={scheme.matchPercent} />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {scheme.tags.map(t => (
                  <span key={t} className="text-xs bg-bg border border-border px-2 py-1 rounded-md text-text-muted">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
