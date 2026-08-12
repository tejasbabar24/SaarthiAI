import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const icons = {
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
  error: <AlertCircle className="w-4 h-4 text-red-500" />,
  info: <Info className="w-4 h-4 text-blue-brand" />,
  warning: <AlertTriangle className="w-4 h-4 text-orange" />,
};

const colors = {
  success: 'border-l-green-500',
  error: 'border-l-red-500',
  info: 'border-l-blue-brand',
  warning: 'border-l-orange',
};

function Toast({ toast }) {
  const { removeToast } = useApp();
  return (
    <div
      className={`flex items-start gap-3 bg-white border border-border border-l-4 ${colors[toast.type] || colors.info} rounded-xl shadow-card-md px-4 py-3 min-w-[260px] max-w-sm animate-fade-in-up`}
    >
      {icons[toast.type] || icons.info}
      <p className="text-sm text-text-dark flex-1">{toast.message}</p>
      <button onClick={() => removeToast(toast.id)} className="text-text-muted hover:text-text-dark">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => <Toast key={t.id} toast={t} />)}
    </div>
  );
}
