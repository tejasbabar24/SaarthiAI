import React from 'react';

export default function EligibilityBadge({ percent }) {
  if (!percent) return null;

  const getStyle = (p) => {
    if (p >= 80) return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'High Match' };
    if (p >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'Medium Match' };
    return { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-400', label: 'Low Match' };
  };

  const style = getStyle(percent);

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.bg} ${style.text} shrink-0`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <span className="text-xs font-bold">{percent}%</span>
      <span className="text-xs font-medium hidden sm:inline">{style.label}</span>
    </div>
  );
}
