import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Send, Mic, Shield, Search, ClipboardCheck,
  ShieldCheck, FileEdit, Send as SendIcon, BarChart3, Users, Star, ChevronRight
} from 'lucide-react';
import { InlineLoader } from '../components/ui/LoadingState';
import { getResponse } from '../data/chatResponses';
import { schemes } from '../data/schemes';

// ─── Hero Chat Widget ─────────────────────────────────────────────────────────
function HeroChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: 'user',
      text: 'माझ्या मुलीसाठी कोणत्या scholarship उपलब्ध आहेत?',
    },
    {
      role: 'assistant',
      type: 'schemes',
      text: 'I found 4 schemes that may match your profile.',
      schemes: [
        { id: 1, name: 'Savitribai Phule...', match: 92 },
        { id: 2, name: 'Post Matric Sch...', match: 88 },
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);

    setTimeout(() => {
      const resp = getResponse(q);
      setMessages(prev => [...prev, { role: 'assistant', ...resp }]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="bg-white border border-border rounded-2xl shadow-card-lg overflow-hidden" style={{maxWidth: '480px', width: '100%'}}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-orange" />
          </div>
          <div>
            <p className="text-xs font-bold text-navy tracking-wide">SARTHI AI ASSISTANT</p>
            <p className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Secure & Private
            </p>
          </div>
        </div>
        <Shield className="w-4 h-4 text-text-muted" />
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3 chat-scroll">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'user' ? (
              <div className="bg-navy text-white text-sm px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
                {msg.text}
              </div>
            ) : (
              <div className="max-w-[90%] space-y-2">
                <div className="bg-bg border border-border text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-text-dark">
                  {msg.text}
                </div>
                {msg.type === 'schemes' && msg.schemes && (
                  <div className="grid grid-cols-2 gap-2">
                    {msg.schemes.map(s => (
                      <button
                        key={s.id}
                        onClick={() => navigate(`/schemes/${s.id}`)}
                        className="bg-white border border-border rounded-lg p-2.5 text-left hover:border-blue-brand hover:shadow-sm transition-all"
                      >
                        <p className="text-xs font-semibold text-navy leading-tight">{s.name}</p>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          High Match
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => navigate('/schemes')}
                      className="col-span-1 bg-navy/5 border border-navy/20 rounded-lg p-2.5 text-xs font-medium text-navy hover:bg-navy hover:text-white transition-all"
                    >
                      View Details
                    </button>
                    <button
                      className="col-span-1 bg-navy/5 border border-navy/20 rounded-lg p-2.5 text-xs font-medium text-navy hover:bg-navy hover:text-white transition-all"
                    >
                      Translate ↔
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-bg border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5">
              <InlineLoader />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about schemes, eligibility..."
          className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-brand transition-colors text-text-dark placeholder-text-muted"
        />
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg transition-colors text-text-muted">
          <Mic className="w-4 h-4" />
        </button>
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-lg bg-blue-brand flex items-center justify-center hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

// ─── How It Works Steps ────────────────────────────────────────────────────────
const steps = [
  { num: '01', icon: Search, label: 'DISCOVER', desc: 'AI scans hundreds of schemes for you.' },
  { num: '02', icon: ClipboardCheck, label: 'CHECK', desc: 'Instant eligibility verification.' },
  { num: '03', icon: ShieldCheck, label: 'VERIFY', desc: 'Secure document validation.' },
  { num: '04', icon: FileEdit, label: 'PREPARE', desc: 'AI assists in drafting forms.' },
  { num: '05', icon: SendIcon, label: 'APPLY', desc: 'One-click submission.' },
  { num: '06', icon: BarChart3, label: 'TRACK', desc: 'Real-time status updates.' },
];

// ─── Stat pill ─────────────────────────────────────────────────────────────────
function StatAvatars() {
  const initials = ['TP', 'SR', 'MK'];
  const colors = ['bg-blue-brand', 'bg-orange', 'bg-green-600'];
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {initials.map((init, i) => (
          <div key={i} className={`w-8 h-8 rounded-full ${colors[i]} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
            {init}
          </div>
        ))}
      </div>
      <p className="text-sm text-text-muted">
        <strong className="text-navy">100,000+</strong> Citizens assisted this month.
      </p>
    </div>
  );
}

// ─── Featured Schemes ─────────────────────────────────────────────────────────
function FeaturedSchemes() {
  const navigate = useNavigate();
  const featured = schemes.filter(s => s.featured).slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-heading">Popular Government Schemes</h2>
          <p className="section-subtitle">Top schemes our citizens are applying for right now.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map(s => (
            <div key={s.id} className="card-hover group cursor-pointer" onClick={() => navigate(`/schemes/${s.id}`)}>
              <div className="flex items-start justify-between mb-3">
                <span className="badge-category">{s.category}</span>
                <span className="text-xs font-bold text-green-600">{s.matchPercent}% Match</span>
              </div>
              <h3 className="font-bold text-navy mb-1.5">{s.name}</h3>
              <p className="text-sm text-text-muted mb-3">{s.shortDesc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-orange">{s.benefit}</span>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-navy group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => navigate('/schemes')} className="btn-primary">
            Explore All Schemes <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Priya Deshmukh", location: "Pune, Maharashtra", text: "Sarthi AI helped me find the Post Matric Scholarship I never knew existed. Got ₹11,000 in my account!", stars: 5 },
  { name: "Ramesh Yadav", location: "Nashik, Maharashtra", text: "The document guidance was very clear. I got my Caste Certificate within 15 days following the steps.", stars: 5 },
  { name: "Sunita Bai", location: "Nagpur, Maharashtra", text: "I couldn't read English forms but Sarthi explained everything in Marathi. Very helpful!", stars: 5 },
];

// ─── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-bg pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left */}
            <div className="flex-1 max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-brand/10 border border-blue-brand/20 text-blue-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                AI-POWERED CITIZEN ASSISTANT
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight mb-3">
                Find the Benefits You're<br />Eligible For.
              </h1>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-orange leading-tight mb-6">
                We Help You Get Them.
              </h2>

              <p className="text-text-muted text-base leading-relaxed mb-8 max-w-lg">
                Sarthi AI simplifies access to government schemes. Our intelligent assistant analyzes your profile to match you with eligible programs, guiding you step-by-step from discovery to successful application.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => navigate('/get-started')}
                  className="btn-primary text-sm px-6 py-3"
                >
                  <Sparkles className="w-4 h-4" />
                  CHECK MY ELIGIBILITY
                </button>
                <button
                  onClick={() => navigate('/schemes')}
                  className="btn-secondary text-sm px-6 py-3"
                >
                  EXPLORE SCHEMES
                </button>
              </div>

              {/* Social proof */}
              <StatAvatars />
            </div>

            {/* Right – Chat widget */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <HeroChatWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 bg-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-2">How Sarthi AI Works</h2>
          <p className="section-subtitle mb-12">
            Our transparent, AI-driven process ensures you never miss a benefit you deserve.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center text-center group">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center shadow-card group-hover:border-blue-brand group-hover:shadow-card-md transition-all duration-200">
                      <Icon className="w-6 h-6 text-navy group-hover:text-blue-brand transition-colors" />
                    </div>
                    <span className="step-number">{idx + 1}</span>
                  </div>
                  <p className="text-xs font-bold text-navy tracking-wider mb-1">{step.label}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate('/how-it-works')} className="btn-secondary">
              Learn How It Works <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured Schemes ── */}
      <FeaturedSchemes />

      {/* ── Stats Banner ── */}
      <section className="py-12 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1,200+', label: 'Government Schemes' },
              { value: '1,00,000+', label: 'Citizens Assisted' },
              { value: '28', label: 'States Covered' },
              { value: '3', label: 'Languages Supported' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-orange mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-2">Citizens Love Sarthi AI</h2>
          <p className="section-subtitle mb-10">Real stories from citizens who discovered their benefits.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-orange fill-orange" />
                  ))}
                </div>
                <p className="text-sm text-text-dark leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-navy mb-4">
            Ready to Find Your Benefits?
          </h2>
          <p className="text-text-muted mb-8">
            Join over 1 lakh citizens who have already discovered schemes they were eligible for.
            It takes less than 2 minutes to get started.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate('/get-started')} className="btn-navy px-8 py-3 text-sm">
              <Users className="w-4 h-4" />
              GET STARTED FREE
            </button>
            <button onClick={() => navigate('/ai-assistant')} className="btn-secondary px-8 py-3 text-sm">
              <Sparkles className="w-4 h-4" />
              TRY AI ASSISTANT
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Inline Footer import to avoid circular — use the layout Footer
import Footer from '../components/layout/Footer';
