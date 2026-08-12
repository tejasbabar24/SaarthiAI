import React from 'react';
import { Compass, Eye, ShieldCheck, Heart, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange/20 text-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Compass className="w-3.5 h-3.5" /> ABOUT SARTHI AI
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Empowering Every Indian Citizen</h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
            Sarthi AI is a digital citizen assistant designed to simplify access to government schemes and services, bridging the gap between welfare policies and the citizens who need them most.
          </p>
        </div>
      </section>

      {/* 3 Core Principles */}
      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Core Principles</h2>
            <p className="section-subtitle">Designed to make government welfare accessible, transparent, and hassle-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-8 hover:shadow-card-md transition-all">
              <div className="w-14 h-14 bg-blue-50 text-blue-brand rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">ACCESS</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Make government benefits easier to discover. Overcoming awareness barriers through intelligent profile-matching.
              </p>
            </div>

            <div className="card text-center p-8 hover:shadow-card-md transition-all">
              <div className="w-14 h-14 bg-orange/10 text-orange rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">CLARITY</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Explain eligibility and documentation in simple language. Eliminating complex legal jargon with multilingual AI guidance.
              </p>
            </div>

            <div className="card text-center p-8 hover:shadow-card-md transition-all">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">ASSISTANCE</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Guide citizens from discovery to application. Offering end-to-end support with document checklists and auto-fill assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-navy mb-4">
            "Built for citizens. Designed for accessibility. Powered by AI."
          </h2>
          <p className="text-text-muted text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Millions of rupees in government welfare funds remain unclaimed every year simply because citizens are unaware of their eligibility or struggle with complex documentation. Sarthi AI changes that by putting an intelligent assistant in every citizen's hands.
          </p>

          <div className="flex justify-center gap-4">
            <button onClick={() => navigate('/get-started')} className="btn-navy py-3 px-6">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
