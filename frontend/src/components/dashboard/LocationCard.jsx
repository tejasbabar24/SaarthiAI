import React from 'react';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';

const typeColors = {
  'Talathi': 'bg-blue-100 text-blue-700',
  'e-Seva Kendra': 'bg-green-100 text-green-700',
  'Gram Panchayat': 'bg-orange/10 text-orange',
  'Collectorate': 'bg-purple-100 text-purple-700',
  'CSC': 'bg-teal-100 text-teal-700',
};

export default function LocationCard({ location }) {
  const tagColor = typeColors[location.type] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white border border-border rounded-xl p-4 hover:shadow-card-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-navy" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h4 className="font-bold text-navy text-sm leading-tight">{location.name}</h4>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColor} shrink-0`}>
              {location.type}
            </span>
          </div>

          <p className="text-xs text-text-muted mt-1 flex items-start gap-1">
            <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
            {location.address}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Phone className="w-3 h-3" /> {location.phone}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="w-3 h-3" /> {location.timings}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-1">
              {location.services.slice(0, 3).map(s => (
                <span key={s} className="text-xs bg-bg px-2 py-0.5 rounded border border-border text-text-muted">{s}</span>
              ))}
              {location.services.length > 3 && (
                <span className="text-xs bg-bg px-2 py-0.5 rounded border border-border text-text-muted">+{location.services.length - 3}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-brand bg-blue-50 px-2 py-0.5 rounded-full">{location.distance}</span>
              <span className={`text-xs font-medium ${location.status === 'Open' ? 'text-green-600' : 'text-red-500'}`}>
                {location.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
