import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-border border-t-blue-brand animate-spin" />
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}

export function InlineLoader({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-text-muted text-sm ${className}`}>
      <Loader2 className="w-4 h-4 animate-spin text-blue-brand" />
      <span className="animate-pulse-soft">Analyzing profile...</span>
    </div>
  );
}
