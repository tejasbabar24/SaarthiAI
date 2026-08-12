import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import FormInput from '../components/ui/FormInput';
import { useApp } from '../context/AppContext';
import Footer from '../components/layout/Footer';

export default function Login() {
  const navigate = useNavigate();
  const { login, addToast } = useApp();
  const [identifier, setIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ mobile: identifier });
    addToast('Successfully logged in!', 'success');
    navigate('/for-citizens');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-between bg-bg">
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="bg-white border border-border rounded-2xl shadow-card-lg p-6 sm:p-8 max-w-md w-full animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-orange rounded-xl flex items-center justify-center mx-auto mb-3">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy">Welcome Back</h1>
            <p className="text-xs text-text-muted mt-1">Log in to access your Sarthi AI dashboard and applications</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Mobile Number or Email"
              id="identifier"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
            />
            <FormInput
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn-navy w-full justify-center py-3 text-sm">
              <LogIn className="w-4 h-4" /> LOGIN
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center text-xs text-text-muted">
            Don't have a profile yet?{' '}
            <Link to="/get-started" className="text-navy font-bold hover:underline">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
