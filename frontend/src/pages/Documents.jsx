import React, { useState } from 'react';
import { CheckCircle, AlertCircle, MapPin, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { documents } from '../data/documents';
import { serviceLocations } from '../data/locations';
import DocumentCard from '../components/dashboard/DocumentCard';
import LocationCard from '../components/dashboard/LocationCard';
import Modal from '../components/ui/Modal';
import Footer from '../components/layout/Footer';

function HowToGetModal({ doc, onClose }) {
  if (!doc?.howToGet) return null;
  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted">{doc.howToGet.description}</p>
      <ol className="space-y-4">
        {doc.howToGet.steps.map(step => (
          <li key={step.step} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
              {step.step}
            </div>
            <div>
              <p className="font-semibold text-navy text-sm">{step.title}</p>
              <p className="text-sm text-text-muted mt-0.5">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <p className="text-sm font-semibold text-blue-800 mb-1">💡 Tip</p>
        <p className="text-sm text-blue-700">You can also request this document through Sarthi AI with the help of a Field Agent at a nearby Setu Kendra.</p>
      </div>
      <button
        onClick={onClose}
        className="btn-primary w-full justify-center"
      >
        Find Nearest Center <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Documents() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const verified = documents.filter(d => d.status === 'verified');
  const missing = documents.filter(d => d.status === 'missing');

  const handleMissingClick = (doc) => {
    setSelectedDoc(doc);
    setShowHowTo(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-2">Document Assistance</h1>
          <p className="text-white/70">Track your document status and get guidance on obtaining missing documents.</p>

          {/* Status bar */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">{verified.length} Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5">
              <AlertCircle className="w-5 h-5 text-orange" />
              <span className="text-white font-semibold">{missing.length} Missing</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Missing Documents – Priority */}
        {missing.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange" />
              <h2 className="text-base font-bold text-navy">Missing Documents ({missing.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {missing.map(doc => (
                <div key={doc.id}>
                  <DocumentCard doc={doc} onUpload={handleMissingClick} />

                  {/* How to get – inline expanded for missing */}
                  <div className="mt-3 bg-orange/5 border border-orange/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-navy mb-3">How to get: {doc.name}</p>
                    <ol className="space-y-2.5">
                      {doc.howToGet?.steps.map(step => (
                        <li key={step.step} className="flex gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold shrink-0">{step.step}</span>
                          <div>
                            <p className="text-sm font-medium text-navy">{step.title}</p>
                            <p className="text-xs text-text-muted">{step.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Documents */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-base font-bold text-navy">Verified Documents ({verified.length})</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {verified.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
          </div>
        </div>

        {/* Required For Summary */}
        <div className="card">
          <h2 className="text-base font-bold text-navy mb-4">Documents Required Per Scheme</h2>
          <div className="space-y-3">
            {[
              { scheme: 'Post Matric Scholarship', docs: ['Aadhaar Card ✓', 'Income Certificate ✓', 'Caste Certificate ⚠'], status: 'incomplete' },
              { scheme: 'PM Jan Dhan Yojana', docs: ['Aadhaar Card ✓', 'Passport Photo ✓'], status: 'complete' },
              { scheme: 'Ayushman Bharat PM-JAY', docs: ['Aadhaar Card ✓', 'Ration Card ⚠', 'Income Certificate ✓'], status: 'incomplete' },
            ].map(item => (
              <div key={item.scheme} className={`border rounded-xl p-3.5 ${item.status === 'complete' ? 'border-green-200 bg-green-50' : 'border-orange/30 bg-orange/5'}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-navy">{item.scheme}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.status === 'complete' ? 'bg-green-100 text-green-700' : 'bg-orange/10 text-orange'}`}>
                    {item.status === 'complete' ? 'Ready to Apply' : 'Documents Missing'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.docs.map(d => (
                    <span key={d} className={`text-xs px-2 py-0.5 rounded border ${d.includes('⚠') ? 'bg-orange/10 border-orange/30 text-orange' : 'bg-white border-green-200 text-green-700'}`}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Service Centers */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-navy" />
            <h2 className="text-base font-bold text-navy">Nearby Service Centers</h2>
          </div>
          <p className="text-sm text-text-muted mb-4">Visit these centers to obtain missing documents.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceLocations.slice(0, 4).map(loc => <LocationCard key={loc.id} location={loc} />)}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showHowTo && !!selectedDoc}
        onClose={() => { setShowHowTo(false); setSelectedDoc(null); }}
        title={`How to Get: ${selectedDoc?.name}`}
        size="md"
      >
        <HowToGetModal doc={selectedDoc} onClose={() => { setShowHowTo(false); setSelectedDoc(null); }} />
      </Modal>

      <Footer />
    </div>
  );
}
