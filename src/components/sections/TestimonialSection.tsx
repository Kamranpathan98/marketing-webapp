'use client';

import React, { useRef } from 'react';
import TestimonialCard, { Testimonial } from '../ui/TestimonialCard';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Suresh Raina',
    role: 'Owner',
    shopName: 'Raina Electronics',
    location: 'Lucknow',
    quote: "I used to stay in the shop until 10 PM just to finish my Tally billing. With MyERP, I'm home by 8:30. The keyboard shortcuts are a lifesaver.",
    rating: 5,
  },
  {
    id: '2',
    name: 'Anjali Gupta',
    role: 'Manager',
    shopName: 'Global Mobile Hub',
    location: 'Delhi',
    quote: "IMEI tracking was a nightmare in our old software. Now we just scan the barcode and it's done. Fastest GST billing we've ever used.",
    rating: 5,
  },
  {
    id: '3',
    name: 'Vikram Singh',
    role: 'Proprietor',
    shopName: 'Singh & Sons',
    location: 'Chandigarh',
    quote: "Migrating our 10 years of Tally data took less than an hour. The support team is incredible. Highly recommended for any serious retailer.",
    rating: 5,
  },
  {
    id: '4',
    name: 'Karthik Raja',
    role: 'Owner',
    shopName: 'Raja Mobiles',
    location: 'Chennai',
    quote: "The mobile app is surprisingly fast. I can check my stock levels even when I'm at the distributor's warehouse. No more guessing.",
    rating: 5,
  }
];

/**
 * TestimonialSection
 * A full-width horizontal scrolling testimonial section.
 */
export default function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Trusted by <span className="text-amber-500">500+ retailers</span> across India.
            </h2>
            <p className="text-zinc-500 text-lg">
              Don&apos;t just take our word for it. Here is what shop owners say about switching to MyERP.
            </p>
          </div>

          {/* Nav Buttons */}
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 -mx-6 px-6"
        >
          {testimonials.map((t) => (
            <div key={t.id} className="snap-start flex-shrink-0 first:ml-0">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
