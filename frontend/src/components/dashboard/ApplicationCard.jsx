import React from 'react';
import { Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-3 h-3" /> },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3 h-3" /> },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-600', icon: <AlertCircle className="w-3 h-3" /> },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700', icon: <CheckCircle className="w-3 h-3" /> },
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600', icon: <Clock className="w-3 h-3" /> },
};

export default function ApplicationCard({ app }) {
  const navigate = useNavigate();
  const status = statusConfig[app.status] || statusConfig.pending;
  const progress = (app.steps.filter(s => s.done).length / app.steps.length) * 100;

  return (
    <div className="bg-white border border-border rounded-xl p-4 hover:shadow-card-md transition-all">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <h4 className="font-bold text-navy text-sm">{app.schemeName}</h4>
          <p className="text-xs text-text-muted mt-0.5">Ref: {app.referenceNumber}</p>
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-text-muted">Progress</span>
          <span className="text-xs font-semibold text-navy">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-brand rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps mini */}
      <div className="flex items-center gap-1 mb-3">
        {app.steps.map((step, i) => (
          <React.Fragment key={step.step}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step.done ? 'bg-blue-brand text-white' : 'bg-bg border border-border text-text-muted'}`}>
              {step.done ? <CheckCircle className="w-3.5 h-3.5" /> : step.step}
            </div>
            {i < app.steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${step.done ? 'bg-blue-brand' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">Applied: {app.appliedDate}</p>
          {app.amount && <p className="text-xs font-semibold text-green-700 mt-0.5">Benefit: {app.amount}</p>}
        </div>
        <button
          onClick={() => navigate(`/apply/${app.schemeId}`)}
          className="flex items-center gap-1 text-xs font-semibold text-blue-brand hover:text-blue-dark transition-colors"
        >
          Track <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
