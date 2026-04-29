import React from 'react';

/**
 * PainPointsSection
 * Displays 5 common Tally pain points in a first-person perspective.
 * Designed to resonate with frustrated Tally users.
 */
export default function PainPointsSection() {
  const painPoints = [
    {
      id: 1,
      quote: "I open Tally, navigate to billing, and it's already taking 30 seconds before I've typed a thing."
    },
    {
      id: 2,
      quote: "Entering a product name takes forever — I'm typing the full name every time."
    },
    {
      id: 3,
      quote: "IMEI tracking is manual. I keep a separate spreadsheet."
    },
    {
      id: 4,
      quote: "My accountant needs GST reports monthly and exporting from Tally is a full-day job."
    },
    {
      id: 5,
      quote: "Training new staff on Tally takes a week. Half of them still make mistakes."
    }
  ];

  return (
    <section className="py-24 bg-surface-card border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-texture bg-grid-48 opacity-[0.01] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            You already know these problems.
          </h2>
          <p className="text-zinc-500 text-lg font-medium">
            Tally was built for accountants in 1986. You need something built for retail in 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {painPoints.map((point) => (
            <div 
              key={point.id}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/20 transition-all group"
            >
              <div className="flex gap-6">
                <span className="text-amber-500/20 text-5xl font-black italic group-hover:text-amber-500/40 transition-colors select-none">
                  “
                </span>
                <p className="text-zinc-300 text-lg font-medium italic leading-relaxed pt-4">
                  {point.quote}
                </p>
              </div>
            </div>
          ))}
          
          <div className="p-8 rounded-2xl bg-amber-500/5 border border-dashed border-amber-500/20 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <span className="text-2xl">💡</span>
            </div>
            <p className="text-amber-500/80 font-bold italic">
              "It's not your staff. It's the software."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
