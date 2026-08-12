import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Sparkles, AlertCircle, Send } from 'lucide-react';
import { schemes } from '../data/schemes';
import { useApp } from '../context/AppContext';
import FormInput from '../components/ui/FormInput';
import Footer from '../components/layout/Footer';

const STEPS = [
  { id: 1, label: 'Profile', icon: '👤' },
  { id: 2, label: 'Documents', icon: '📄' },
  { id: 3, label: 'Application', icon: '📝' },
  { id: 4, label: 'Review', icon: '🔍' },
  { id: 5, label: 'Submit', icon: '✅' },
];

export default function ApplicationForm() {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { citizen, addToast } = useApp();

  const scheme = schemes.find(s => s.id === parseInt(schemeId)) || schemes[1];
  const [currentStep, setCurrentStep] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: citizen.name,
    dob: citizen.dob,
    gender: citizen.gender,
    mobile: citizen.mobile,
    email: citizen.email,
    address: citizen.address,
    district: citizen.district,
    state: citizen.state,
    pincode: citizen.pincode,
    annualIncome: citizen.annualIncome,
    category: citizen.category,
    education: citizen.education,
    college: citizen.college,
    bankAccount: citizen.bankAccount,
    ifsc: citizen.ifsc,
    aadhaar: citizen.aadhaar,
    declaration: false,
  });

  const [errors, setErrors] = useState({});

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.mobile || form.mobile.length !== 10) errs.mobile = 'Valid 10-digit mobile required';
    if (!form.aadhaar.trim()) errs.aadhaar = 'Aadhaar number is required';
    if (!form.declaration) errs.declaration = 'You must accept the declaration';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    addToast('Application submitted successfully! Reference: NSP/2024/MH/00' + Math.floor(Math.random() * 99999), 'success');
  };

  if (submitted) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-navy mb-2">Application Submitted!</h2>
        <p className="text-text-muted mb-1">Your application for <strong>{scheme.name}</strong> has been submitted.</p>
        <p className="text-sm text-text-muted mb-6">Reference: <strong className="text-navy">NSP/2024/MH/00{Math.floor(Math.random() * 99999)}</strong></p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-8 max-w-sm">
          <p className="text-sm text-blue-800">You'll receive updates on your registered mobile <strong>{citizen.mobile}</strong></p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/for-citizens')} className="btn-navy">Go to Dashboard</button>
          <button onClick={() => navigate('/schemes')} className="btn-secondary">Browse More Schemes</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/60 text-sm mb-1">Application for</p>
          <h1 className="text-2xl font-extrabold text-white mb-1">{scheme.name}</h1>
          <p className="text-white/60 text-sm">{scheme.ministry}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((step, i) => {
            const isDone = step.id < currentStep;
            const isActive = step.id === currentStep;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    isDone ? 'bg-blue-brand border-blue-brand text-white' :
                    isActive ? 'bg-white border-navy text-navy' :
                    'bg-bg border-border text-text-muted'
                  }`}>
                    {isDone ? <CheckCircle className="w-4 h-4" /> : step.icon}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-navy' : 'text-text-muted'}`}>{step.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${isDone ? 'bg-blue-brand' : 'bg-border'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* AI assistance note */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
          <Sparkles className="w-4 h-4 text-blue-brand shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>AI-assisted form preparation</strong> – Your profile data has been pre-filled. Review and make any necessary changes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 3: Application Form */}
          {currentStep === 3 && (
            <div className="card space-y-5">
              <h2 className="text-base font-bold text-navy pb-3 border-b border-border">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Full Name" id="fullName" value={form.fullName} onChange={e => update('fullName', e.target.value)} error={errors.fullName} required />
                <FormInput label="Date of Birth" id="dob" type="date" value={form.dob} onChange={e => update('dob', e.target.value)} />
                <FormInput label="Gender" id="gender" type="select" value={form.gender} onChange={e => update('gender', e.target.value)}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </FormInput>
                <FormInput label="Mobile Number" id="mobile" type="tel" value={form.mobile} onChange={e => update('mobile', e.target.value)} error={errors.mobile} required />
                <FormInput label="Email Address" id="email" type="email" value={form.email} onChange={e => update('email', e.target.value)} className="sm:col-span-2" />
              </div>

              <h2 className="text-base font-bold text-navy pb-3 border-b border-border pt-2">Address Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Full Address" id="address" type="textarea" value={form.address} onChange={e => update('address', e.target.value)} className="sm:col-span-2" />
                <FormInput label="District" id="district" value={form.district} onChange={e => update('district', e.target.value)} />
                <FormInput label="State" id="state" value={form.state} onChange={e => update('state', e.target.value)} />
                <FormInput label="Pincode" id="pincode" value={form.pincode} onChange={e => update('pincode', e.target.value)} />
              </div>

              <h2 className="text-base font-bold text-navy pb-3 border-b border-border pt-2">Financial & Category Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Annual Family Income (₹)" id="annualIncome" type="number" value={form.annualIncome} onChange={e => update('annualIncome', e.target.value)} />
                <FormInput label="Category" id="category" type="select" value={form.category} onChange={e => update('category', e.target.value)}>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option>
                </FormInput>
              </div>

              <h2 className="text-base font-bold text-navy pb-3 border-b border-border pt-2">Education Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Current Education" id="education" value={form.education} onChange={e => update('education', e.target.value)} className="sm:col-span-2" />
                <FormInput label="College/Institution" id="college" value={form.college} onChange={e => update('college', e.target.value)} className="sm:col-span-2" />
              </div>

              <h2 className="text-base font-bold text-navy pb-3 border-b border-border pt-2">Bank & ID Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Aadhaar Number" id="aadhaar" value={form.aadhaar} onChange={e => update('aadhaar', e.target.value)} error={errors.aadhaar} required />
                <FormInput label="Bank Account" id="bankAccount" value={form.bankAccount} onChange={e => update('bankAccount', e.target.value)} />
                <FormInput label="IFSC Code" id="ifsc" value={form.ifsc} onChange={e => update('ifsc', e.target.value)} />
              </div>

              <button type="button" onClick={() => setCurrentStep(4)} className="btn-primary w-full justify-center py-3">
                Save & Continue to Review <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="card space-y-4">
              <h2 className="text-base font-bold text-navy pb-3 border-b border-border">Review Your Application</h2>

              {[
                { label: 'Full Name', value: form.fullName },
                { label: 'Date of Birth', value: form.dob },
                { label: 'Gender', value: form.gender },
                { label: 'Mobile', value: form.mobile },
                { label: 'District', value: form.district },
                { label: 'State', value: form.state },
                { label: 'Annual Income', value: `₹${parseInt(form.annualIncome).toLocaleString()}` },
                { label: 'Category', value: form.category },
                { label: 'Education', value: form.education },
                { label: 'Aadhaar', value: form.aadhaar },
                { label: 'Bank Account', value: form.bankAccount },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-text-muted">{row.label}</span>
                  <span className="text-sm font-medium text-text-dark">{row.value}</span>
                </div>
              ))}

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    This is a <strong>demonstration frontend only</strong>. No actual submission will be made to government servers.
                  </p>
                </div>
              </div>

              {/* Declaration */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.declaration}
                  onChange={e => update('declaration', e.target.checked)}
                  className="mt-1 rounded"
                />
                <span className="text-xs text-text-muted">
                  I declare that the information provided is true to the best of my knowledge. I understand that any false information may lead to rejection of the application.
                </span>
              </label>
              {errors.declaration && <p className="text-xs text-red-500">{errors.declaration}</p>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setCurrentStep(3)} className="btn-secondary flex-1 justify-center">Back to Edit</button>
                <button type="button" onClick={() => setCurrentStep(5)} className="btn-primary flex-1 justify-center">
                  Proceed to Submit <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Submit */}
          {currentStep === 5 && (
            <div className="card text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-blue-brand" />
              </div>
              <h2 className="text-xl font-bold text-navy">Ready to Submit</h2>
              <p className="text-text-muted text-sm max-w-sm mx-auto">
                Your application for <strong>{scheme.name}</strong> is ready. Click submit to complete your application.
              </p>
              <div className="flex gap-3 justify-center">
                <button type="button" onClick={() => setCurrentStep(4)} className="btn-secondary">Back</button>
                <button type="submit" className="btn-primary px-8">
                  <Sparkles className="w-4 h-4" /> Submit Application
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}
