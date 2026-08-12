import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Sparkles, UserCheck } from 'lucide-react';
import FormInput from '../components/ui/FormInput';
import { useApp } from '../context/AppContext';
import Footer from '../components/layout/Footer';

export default function GetStarted() {
  const navigate = useNavigate();
  const { login, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: 'Tejas Patil',
    mobile: '9876543210',
    age: 22,
    gender: 'Male',
    state: 'Maharashtra',
    district: 'Pune',
    annualIncome: 240000,
    occupation: 'Student',
    category: 'SC',
  });

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = formData.name.split(' ')[0] || formData.name;
    login({ ...formData, firstName, profileCompletion: 90 });
    addToast('Profile created successfully! Discovering schemes...', 'success');
    navigate('/for-citizens');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-between bg-bg">
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="bg-white border border-border rounded-2xl shadow-card-lg p-6 sm:p-8 max-w-xl w-full animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-orange rounded-xl flex items-center justify-center mx-auto mb-3">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy">Get Started with Sarthi AI</h1>
            <p className="text-xs text-text-muted mt-1">Create your citizen profile to discover government schemes you qualify for</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Full Name" id="name" value={formData.name} onChange={e => update('name', e.target.value)} required />
              <FormInput label="Mobile Number" id="mobile" type="tel" value={formData.mobile} onChange={e => update('mobile', e.target.value)} required />
              <FormInput label="Age" id="age" type="number" value={formData.age} onChange={e => update('age', e.target.value)} required />
              <FormInput label="Gender" id="gender" type="select" value={formData.gender} onChange={e => update('gender', e.target.value)}>
                <option>Male</option><option>Female</option><option>Other</option>
              </FormInput>
              <FormInput label="State" id="state" value={formData.state} onChange={e => update('state', e.target.value)} required />
              <FormInput label="District" id="district" value={formData.district} onChange={e => update('district', e.target.value)} required />
              <FormInput label="Annual Income (₹)" id="annualIncome" type="number" value={formData.annualIncome} onChange={e => update('annualIncome', e.target.value)} required />
              <FormInput label="Social Category" id="category" type="select" value={formData.category} onChange={e => update('category', e.target.value)}>
                <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
              </FormInput>
            </div>

            <button type="submit" className="btn-navy w-full justify-center py-3 text-sm mt-4">
              <Sparkles className="w-4 h-4" /> CREATE PROFILE & CHECK SCHEMES
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center text-xs text-text-muted">
            Already registered?{' '}
            <Link to="/login" className="text-navy font-bold hover:underline">
              Log In Here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
