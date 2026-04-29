import React from 'react';
import SpeedBarsAnimator from '../speed/SpeedBarsAnimator';

/**
 * SpeedComparisonSection
 * A static section that highlights the performance gap between legacy Tally and MyERP.
 * Positioned above the interactive demo as a primary "Why" section.
 */
export default function SpeedComparisonSection() {
  const benchmarks = [
    { action: 'Open billing module', tally: '45 sec', myerp: '0 sec (always open)' },
    { action: 'Find/type customer', tally: '30 sec', myerp: '3 keystrokes' },
    { action: 'Add items + IMEI', tally: '60 sec', myerp: 'Enter × items' },
    { action: 'Save + print', tally: '30 sec', myerp: 'Ctrl + S' },
  ];

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Most Tally users take <span className="text-red-500">2–3 minutes</span> per invoice.
              </h2>
              <p className="text-zinc-400 text-lg font-medium">
                In a busy store, that delay means lost customers and frustrated staff. Here's why that adds up fast.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-4 text-[10px] uppercase font-black tracking-widest text-zinc-500">Action</th>
                    <th className="pb-4 text-[10px] uppercase font-black tracking-widest text-zinc-500">Tally Prime</th>
                    <th className="pb-4 text-[10px] uppercase font-black tracking-widest text-zinc-500">MyERP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {benchmarks.map((row, i) => (
                    <tr key={i} className="group">
                      <td className="py-4 text-sm text-zinc-300 font-medium">{row.action}</td>
                      <td className="py-4 text-sm text-red-500/70 font-mono">{row.tally}</td>
                      <td className="py-4 text-sm text-amber-500 font-mono font-bold">{row.myerp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-zinc-500 text-sm font-bold uppercase tracking-tighter">
              Total: ~3 minutes vs <span className="text-amber-500">9 seconds</span> on average.
            </p>
          </div>

          {/* Visual Animator */}
          <div className="bg-zinc-900/40 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl">
            <SpeedBarsAnimator />
            
            <div className="mt-12 p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10">
              <p className="text-xs text-amber-500/80 leading-relaxed font-medium italic text-center">
                "We benchmarked real users in mobile shops. MyERP is consistently 20x faster than Tally Prime for the same invoice data."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
