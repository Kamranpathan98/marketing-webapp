import React from 'react';

/**
 * OnboardingPage
 * A placeholder page for newly registered users.
 */
export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center py-20 px-6">
      <div className="w-full max-w-lg text-center space-y-12">
        
        {/* Animated Icon Placeholder */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-amber-500/20 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full" />
            <span className="text-4xl relative z-10">🎉</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Welcome to MyERP.
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-md mx-auto">
            Your account is ready. We'll set up your shop next.
          </p>
        </div>

        <div className="space-y-6">
          <button className="w-full max-w-xs h-14 bg-amber-500 text-zinc-950 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.2)] transition-all">
            Set up my shop
          </button>
          
          <p className="text-zinc-600 text-xs font-medium">
            Takes about 2 minutes to get your basic inventory ready.
          </p>
        </div>

      </div>
    </main>
  );
}
