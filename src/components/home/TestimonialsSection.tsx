"use client";

import { useState, useEffect } from "react";
import type { Testimonial } from "@prisma/client";

type Props = {
  headline: string;
  testimonials: Testimonial[];
};

export function TestimonialsSection({ headline, testimonials }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="bg-white py-28 px-8 md:px-16" id="testimonials">
      <div className="max-w-4xl mx-auto">
        <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
          Testimonials
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.1] text-[#1a2840] mb-16">
          In their <em className="italic text-[#5a8f94]">own words</em>
        </h2>

        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-8xl leading-none text-[#b89a6a] mb-2">&ldquo;</div>
          <p className="font-[family-name:var(--font-cormorant)] italic text-[1.15rem] font-light leading-[1.8] text-[#1a2840] mb-8 max-w-3xl mx-auto">
            {t.quote}
          </p>
          <cite className="font-[family-name:var(--font-jost)] text-[0.7rem] tracking-[0.2em] uppercase text-[#b89a6a] not-italic">
            {t.event ?? t.author}
          </cite>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 border border-[#8fb8bc] text-[#1a2840] hover:bg-[#1a2840] hover:text-white hover:border-[#1a2840] transition-colors flex items-center justify-center text-base"
            >
              ←
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`rounded-full transition-all border-none p-0 cursor-pointer ${i === current ? "w-[9px] h-[9px] bg-[#b89a6a] scale-110" : "w-[7px] h-[7px] bg-[#d4e9eb]"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 border border-[#8fb8bc] text-[#1a2840] hover:bg-[#1a2840] hover:text-white hover:border-[#1a2840] transition-colors flex items-center justify-center text-base"
            >
              →
            </button>
          </div>
          <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.15em] text-[#6b7585] mt-3">
            {current + 1} of {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}
