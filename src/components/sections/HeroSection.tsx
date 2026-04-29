import React from 'react';
import HeroMicroAnimation from '../hero/HeroMicroAnimation';
import TrustBar from '../ui/TrustBar';
import '../../styles/hero-animation.css';

/**
 * HeroSection
 * The main fold of the landing page.
 * Contains the primary value prop, CTAs, and the CSS micro-animation.
 */
export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-surface">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-grid-texture bg-grid-48 opacity-[0.03] pointer-events-none"></div>
      
      {/* Radial Gradient for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side: Copy Content */}
          <div className="flex-[1.2] text-center lg:text-left space-y-8 animate-slide-in">
            {/* Speed Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-bold uppercase tracking-widest">
              <span>⚡</span>
              <span>9 sec invoice</span>
            </div>

            {/* Main Headline */}
            <h1 className="clamp-heading font-bold text-white leading-[1.1] tracking-tight">
              Create invoices <span className="text-amber-500">2x faster</span> than Tally.
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Built specifically for electronics retailers. Keyboard-first billing that keeps up with your busiest days. No loading screens, no lag.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all duration-200 shadow-xl shadow-amber-500/10 hover:scale-[1.02] active:scale-[0.98]">
                Start Free Trial
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-surface-card border border-surface-border hover:bg-surface-elevated text-white font-bold rounded-lg transition-all duration-200 hover:border-zinc-700 active:scale-[0.98]">
                Watch Demo
              </button>
            </div>
            
            {/* Trust Line replaced by TrustBar */}
          </div>

          {/* Right Side: Micro Animation */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <HeroMicroAnimation />
          </div>
        </div>
      </div>

      <div className="mt-16 relative z-10">
        <TrustBar />
      </div>
    </section>
  );
}
