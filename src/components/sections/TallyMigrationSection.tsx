import React from 'react';

/**
 * TallyMigrationSection
 * A purely static Server Component designed to build trust and remove migration anxiety.
 * Focuses on the "how" of switching from Tally with specific time estimates.
 */
export default function TallyMigrationSection() {
  const steps = [
    {
      number: '01',
      title: 'Export',
      time: '5 minutes',
      description: "Export your masters from Tally: customers, products, ledgers. Standard Tally export — you've done this before."
    },
    {
      number: '02',
      title: 'Import',
      time: '15 minutes',
      description: "Upload the export file to MyERP. The import wizard maps your Tally fields automatically. You review and confirm."
    },
    {
      number: '03',
      title: 'Verify',
      time: '10 minutes',
      description: "Check 5 customer records and 5 products. If anything looks off, the wizard shows you exactly what to fix."
    }
  ];

  return (
    <section className="py-24 bg-surface border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Your Tally data comes with you.
          </h2>
          <p className="text-zinc-500 text-lg font-medium">
            Switching software is a real decision. Here's exactly what the process looks like.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-16">
          {steps.map((step, i) => (
            <div key={i} className="relative space-y-6">
              {/* Large Step Number */}
              <div className="text-6xl md:text-7xl font-black text-white/5 select-none absolute -top-8 -left-4 pointer-events-none">
                {step.number}
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">Step {i + 1} — {step.title}</h3>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 border border-white/5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    {step.time}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Reassurance */}
        <div className="pt-12 border-t border-white/5 space-y-6">
          <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-2xl">
            Total migration time: about <span className="text-white">30 minutes</span>. Your billing history stays in Tally for reference — you don't lose it.
          </p>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <span className="text-amber-500 text-sm">⚡</span>
            <p className="text-amber-500/80 text-sm font-bold">
              We've migrated 40+ electronics shops from Tally. None of them lost data.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
