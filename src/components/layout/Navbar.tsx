'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navbar
 * Responsive navigation with a mobile hamburger menu.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Demo', href: '/#demo' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Switch from Tally', href: '/switch-from-tally' },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-[200] transition-all duration-300
      ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}
    `}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-zinc-950 text-xl transform group-hover:rotate-6 transition-transform">
            M
          </div>
          <span className="text-white font-bold text-xl tracking-tight">MyERP</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-zinc-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/signup"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-amber-500/20"
          >
            Start Trial
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-zinc-950 z-40 transition-all duration-500 md:hidden
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                text-3xl font-black text-white uppercase tracking-tighter transition-all duration-500 transform
                ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/signup"
            onClick={() => setIsMenuOpen(false)}
            className={`
              mt-4 px-12 py-5 bg-amber-500 text-zinc-950 text-sm font-black uppercase tracking-widest rounded-xl transition-all
              ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </div>
    </nav>
  );
}
