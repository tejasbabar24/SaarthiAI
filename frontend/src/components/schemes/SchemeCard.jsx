import React, { useState } from 'react';
import { ArrowRight, CheckCircle, FileText, ChevronDown, ChevronUp, Tag, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EligibilityBadge from './EligibilityBadge';

const categoryColors = {
  'Education': 'bg-blue-50 text-blue-700 border-blue-200',
  'Agriculture': 'bg-green-50 text-green-700 border-green-200',
  'Health': 'bg-red-50 text-red-700 border-red-200',
  'Housing': 'bg-purple-50 text-purple-700 border-purple-200',
  'Employment': 'bg-orange-50 text-orange-700 border-orange-200',
  'Women & Child': 'bg-pink-50 text-pink-700 border-pink-200',
  'Social Welfare': 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

export default function SchemeCard({ scheme, onCheckEligibility }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const catColor = categoryColors[scheme.category] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <div className="bg-white border border-border rounded-xl shadow-card hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
      <div className="p-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${catColor}`}>
                {scheme.category}
              </span>
              {scheme.state !== 'All India' && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border bg-navy/5 text-navy border-navy/20">
                  {scheme.state}
                </span>
              )}
            </div>
            <h3 className="font-bold text-navy text-base leading-tight">{scheme.name}</h3>
          </div>
          <EligibilityBadge percent={scheme.matchPercent} />
        </div>

        <p className="text-sm text-text-muted leading-relaxed mb-3">{scheme.shortDesc}</p>

        {/* Benefit */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-3">
          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          <span className="text-sm font-semibold text-green-800">{scheme.benefit}</span>
        </div>

        {/* Expandable Details */}
        {expanded && (
          <div className="space-y-3 mt-3 animate-fade-in-up">
            <div>
              <p className="text-xs font-semibold text-text-dark uppercase tracking-wide mb-1.5">Key Documents Required</p>
              <div className="flex flex-wrap gap-1.5">
                {scheme.documents.slice(0, 4).map(doc => (
                  <span key={doc} className="flex items-center gap-1 text-xs bg-bg px-2 py-1 rounded-md border border-border text-text-muted">
                    <FileText className="w-3 h-3" /> {doc}
                  </span>
                ))}
                {scheme.documents.length > 4 && (
                  <span className="text-xs bg-bg px-2 py-1 rounded-md border border-border text-text-muted">
                    +{scheme.documents.length - 4} more
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-dark uppercase tracking-wide mb-1">Ministry</p>
              <p className="text-xs text-text-muted">{scheme.ministry}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-dark uppercase tracking-wide mb-1">Deadline</p>
              <p className="text-xs text-orange font-medium">{scheme.deadline}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-xs text-text-muted hover:text-navy transition-colors"
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'Show less' : 'Show more details'}
        </button>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 border-t border-border flex gap-2">
        <button
          onClick={() => navigate(`/schemes/${scheme.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-navy border border-border rounded-lg py-2 hover:border-navy hover:bg-navy/5 transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          View Details
        </button>
        <button
          onClick={() => onCheckEligibility ? onCheckEligibility(scheme) : navigate(`/schemes/${scheme.id}`)}
          className="flex-1 btn-primary justify-center text-xs py-2"
        >
          Check Eligibility
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
