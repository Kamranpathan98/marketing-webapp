import React from 'react';

/**
 * DemoInvoiceSkeleton
 * Static placeholder for the DemoInvoice component to prevent layout shifts
 * while the heavy client-side component is lazy-loading.
 */
export default function DemoInvoiceSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-surface-card border border-surface-border rounded-xl shadow-2xl overflow-hidden font-sans min-h-[600px] animate-pulse">
      {/* Skeleton Header */}
      <div className="p-4 border-b border-surface-border-muted bg-surface-elevated/50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-5 bg-zinc-800 rounded"></div>
          <div className="w-32 h-4 bg-zinc-900 rounded"></div>
        </div>
        <div className="w-20 h-6 bg-zinc-800 rounded"></div>
      </div>

      <div className="p-6 space-y-8">
        {/* Skeleton Customer & Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="w-24 h-3 bg-zinc-900 rounded"></div>
            <div className="w-full h-11 bg-zinc-800 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-3 bg-zinc-900 rounded"></div>
            <div className="w-full h-11 bg-zinc-800 rounded-lg"></div>
          </div>
        </div>

        {/* Skeleton Table */}
        <div className="space-y-4 pt-4">
          <div className="w-full h-12 bg-zinc-800/50 rounded"></div>
          <div className="w-full h-12 bg-zinc-800/30 rounded"></div>
          <div className="w-full h-12 bg-zinc-800/10 rounded"></div>
        </div>

        {/* Skeleton Footer */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-8">
          <div className="w-full md:w-40 h-11 bg-zinc-800 rounded-lg"></div>
          <div className="space-y-2 w-full md:w-64">
            <div className="w-full h-4 bg-zinc-900 rounded"></div>
            <div className="w-3/4 h-6 bg-zinc-800 rounded ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
