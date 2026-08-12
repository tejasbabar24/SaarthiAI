import React from 'react';
import { CheckCircle, AlertCircle, Clock, FileText, ArrowRight } from 'lucide-react';

export default function DocumentCard({ doc, onUpload }) {
  const isVerified = doc.status === 'verified';
  const isMissing = doc.status === 'missing';
  const isPending = doc.status === 'pending';

  return (
    <div className={`bg-white border rounded-xl p-4 transition-all ${
      isVerified ? 'border-green-200' :
      isMissing ? 'border-orange/40' :
      'border-border'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
          isVerified ? 'bg-green-100' :
          isMissing ? 'bg-orange/10' :
          'bg-bg'
        }`}>
          <FileText className={`w-5 h-5 ${
            isVerified ? 'text-green-600' :
            isMissing ? 'text-orange' :
            'text-text-muted'
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-text-dark text-sm">{doc.name}</h4>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              isVerified ? 'bg-green-100 text-green-700' :
              isMissing ? 'bg-orange/10 text-orange' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {isVerified && <CheckCircle className="w-3 h-3" />}
              {isMissing && <AlertCircle className="w-3 h-3" />}
              {isPending && <Clock className="w-3 h-3" />}
              {isVerified ? 'Verified' : isMissing ? 'Missing' : 'Pending'}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{doc.description}</p>
          {doc.uploadedAt && (
            <p className="text-xs text-text-muted mt-1">Uploaded: {doc.uploadedAt}</p>
          )}
          {doc.expiryDate && (
            <p className="text-xs text-orange mt-0.5">Expires: {doc.expiryDate}</p>
          )}
          {isMissing && onUpload && (
            <button
              onClick={() => onUpload(doc)}
              className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-brand hover:text-blue-dark transition-colors"
            >
              How to get this document <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
