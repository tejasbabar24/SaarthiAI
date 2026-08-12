import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ClipboardCheck, ShieldCheck, FileEdit, Send, BarChart3,
  ArrowRight, CheckCircle, Lightbulb, Users
} from 'lucide-react';
import Footer from '../components/layout/Footer';

const steps = [
  {
    num: '01',
    icon: Search,
    label: 'Discover',
    color: 'text-blue-brand',
    bg: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-brand',
    title: 'AI-Powered Scheme Discovery',
    description: 'Sarthi AI automatically scans over 1,200 government schemes across all ministries and states to find the ones that match your profile.',
    example: 'Example: A 22-year-old SC student in Maharashtra gets matched with 8 relevant scholarship schemes instantly.',
    features: [
      'Scans Central & State government schemes',
      'Filters by your demographic profile',
      'Shows match percentage for each scheme',
      'Updates when new schemes launch',
    ],
  },
  {
    num: '02',
    icon: ClipboardCheck,
    label: 'Check Eligibility',
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-600',
    title: 'Instant Eligibility Verification',
    description: 'Our AI analyzes your profile data against each scheme\'s criteria and provides an instant eligibility assessment with a confidence score.',
    example: 'Example: "You meet 4/5 criteria for the Post Matric Scholarship. Missing: Caste Certificate upload."',
    features: [
      'Real-time eligibility scoring',
      'Criterion-by-criterion breakdown',
      'Clear explanation of what's missing',
      'Suggests profile improvements',
    ],
  },
  {
    num: '03',
    icon: ShieldCheck,
    label: 'Verify Documents',
    color: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-600',
    title: 'Secure Document Validation',
    description: 'Sarthi AI checks which documents you have, which are expired, and which are missing for your selected schemes.',
    example: 'Example: "Your Income Certificate expires in March. Renew before applying for scholarships."',
    features: [
      'Document checklist per scheme',
      'Expiry date alerts',
      'Step-by-step guide to get missing documents',
      'Links to nearest service centers',
    ],
  },
  {
    num: '04',
    icon: FileEdit,
    label: 'Prepare Application',
    color: 'text-orange',
    bg: 'bg-orange/5 border-orange/30',
    iconBg: 'bg-orange',
    title: 'AI-Assisted Form Preparation',
    description: 'Sarthi AI pre-fills application forms using your profile data, reducing errors and saving time on repetitive data entry.',
    example: 'Example: Your name, DOB, Aadhaar, bank details are automatically filled in the scholarship application.',
    features: [
      'Auto-fills from your saved profile',
      'Validates field formats',
      'Supports Marathi, Hindi, English',
      'Browser extension for government portals',
    ],
  },
  {
    num: '05',
    icon: Send,
    label: 'Apply',
    color: 'text-navy',
    bg: 'bg-navy/5 border-navy/20',
    iconBg: 'bg-navy',
    title: 'Guided Application Submission',
    description: 'Sarthi AI guides you through the final submission process, ensuring all fields are complete and documents are attached correctly.',
    example: 'Example: "All required fields are filled. Attach your Aadhaar and click Submit. Here's the link."',
    features: [
      'Pre-submission review checklist',
      'Direct links to government portals',
      'Step-by-step submission walkthrough',
      'Agent assistance if needed',
    ],
  },
  {
    num: '06',
    icon: BarChart3,
    label: 'Track',
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-teal-600',
    title: 'Real-Time Application Tracking',
    description: 'After submission, track your application status in one place. Get notified about updates, approvals, and disbursements.',
    example: 'Example: "Your Post Matric Scholarship is Under Review. Expected decision: 30 days."',
    features: [
      'Unified application dashboard',
      'Status notifications',
      'Estimated decision timelines',
      'Support if application is delayed',
    ],
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange/20 text-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            TRANSPARENT PROCESS
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">How Sarthi AI Works</h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
            Our transparent, AI-driven 6-step process ensures you never miss a benefit you deserve.
            From discovery to disbursement — we're with you every step.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick visual */}
          <div className="flex items-center justify-center gap-2 mb-16 flex-wrap">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center shadow-card`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-navy">{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-border hidden sm:block mt-[-12px]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Detailed steps */}
          <div className="space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="card animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Icon + number */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3">
                      <div className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center shrink-0 shadow-card`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-4xl font-black text-border">{step.num}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold tracking-wider ${step.color} uppercase`}>{step.label}</span>
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-3">{step.description}</p>

                      {/* Example box */}
                      <div className={`border rounded-lg px-3.5 py-2.5 mb-4 text-sm ${step.bg}`}>
                        <span className="font-semibold">💡 </span>{step.example}
                      </div>

                      {/* Features */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {step.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-text-dark">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-border text-center px-4">
        <h2 className="text-2xl font-extrabold text-navy mb-3">Ready to Get Started?</h2>
        <p className="text-text-muted mb-6 max-w-md mx-auto">Create your free profile and let Sarthi AI find the schemes you deserve.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => navigate('/get-started')} className="btn-navy px-8 py-3">
            <Users className="w-4 h-4" /> Create Profile
          </button>
          <button onClick={() => navigate('/schemes')} className="btn-secondary px-8 py-3">
            Browse Schemes <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
