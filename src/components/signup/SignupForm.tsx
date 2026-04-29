'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * SignupForm
 * A minimalist, high-conversion signup form.
 * Features inline validation and focused user experience.
 */
export default function SignupForm() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Auto-focus email on mount
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!email.includes('@') || !email.includes('.')) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (pass: string) => {
    if (!pass) return 'Password is required';
    if (pass.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleBlur = (field: 'email' | 'password') => {
    const error = field === 'email' ? validateEmail(formData.email) : validatePassword(formData.password);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);
    
    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr, general: '' });
      return;
    }

    setStatus('submitting');
    setErrors({ email: '', password: '', general: '' });

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        setStatus('success');
        router.push('/onboarding');
      } else if (res.status === 409) {
        setErrors(prev => ({ 
          ...prev, 
          email: 'An account with this email already exists. Sign in instead.' 
        }));
        setStatus('idle');
      } else {
        setErrors(prev => ({ 
          ...prev, 
          general: data.error || 'Something went wrong. Please try again.' 
        }));
        setStatus('idle');
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, general: 'Something went wrong. Please try again.' }));
      setStatus('idle');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-zinc-500">
            Email Address
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            onBlur={() => handleBlur('email')}
            placeholder="name@company.com"
            className={`
              w-full h-12 px-4 bg-zinc-900 border rounded-xl text-white placeholder:text-zinc-700 focus:outline-none transition-all
              ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-amber-500/50'}
            `}
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
              {errors.email.includes('exists') ? (
                <span>
                  {errors.email.split('Sign in instead.')[0]}
                  <button 
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-amber-500 hover:underline ml-1"
                  >
                    Sign in instead.
                  </button>
                </span>
              ) : errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-zinc-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            onBlur={() => handleBlur('password')}
            placeholder="••••••••"
            className={`
              w-full h-12 px-4 bg-zinc-900 border rounded-xl text-white placeholder:text-zinc-700 focus:outline-none transition-all
              ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-amber-500/50'}
            `}
            disabled={status === 'submitting'}
          />
          {errors.password && (
            <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-xs font-medium text-center">
              {errors.general}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`
            w-full h-14 rounded-xl font-black text-sm uppercase tracking-widest transition-all
            ${status === 'submitting' 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.2)]'}
          `}
        >
          {status === 'submitting' ? 'Creating account...' : 'Start free trial'}
        </button>

        <p className="text-center text-zinc-500 text-[10px] font-medium leading-relaxed">
          By clicking "Start free trial", you agree to our Terms of Service and Privacy Policy.
        </p>

      </form>
    </div>
  );
}
