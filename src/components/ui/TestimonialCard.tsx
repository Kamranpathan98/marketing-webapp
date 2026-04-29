import React from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  shopName: string;
  location: string;
  quote: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * TestimonialCard
 * A premium glassmorphism card for customer reviews.
 */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[400px] p-6 md:p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20 group h-full">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-amber-500 text-sm">★</span>
          ))}
        </div>

        {/* Quote */}
        <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center text-zinc-500 font-bold">
          {testimonial.name.charAt(0)}
        </div>
        
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">{testimonial.name}</span>
          <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest leading-none mt-1">
            {testimonial.shopName} · {testimonial.location}
          </span>
        </div>
      </div>
    </div>
  );
}
