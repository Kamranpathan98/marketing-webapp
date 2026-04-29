import React from 'react';
import SignupForm from '@/components/signup/SignupForm';

/**
 * SignupPage
 * The dedicated page for user registration.
 */
export default function SignupPage() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center py-20 px-6">
      <div className="w-full max-w-md space-y-12">
        
        {/* Branding/Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
            Founder's Access
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Create your account.
          </h1>
          <p className="text-zinc-500 font-medium">
            Join 40+ electronics shops already using MyERP.
          </p>
        </div>

        <SignupForm />

        <div className="text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-amber-500 hover:underline font-bold">
              Sign in
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}
