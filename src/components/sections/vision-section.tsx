"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn, VIEWPORT } from "@/lib/motion";

export default function VisionSection() {
  return (
    <section
      className="relative py-28 bg-bg-surface border-t border-bg-border overflow-hidden"
      aria-labelledby="vision-heading"
    >
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vision-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="var(--color-grid-line)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vision-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
            // VISION & MISSION
          </m.p>

          {/* Large quote mark — fades in */}
          <m.div
            variants={fadeIn}
            className="font-heading font-bold text-[100px] text-accent-blue opacity-20 leading-none -mb-6 select-none"
          >
            "
          </m.div>

          {/* Mission statement */}
          <m.h2
            id="vision-heading"
            variants={fadeUp}
            className="font-heading font-semibold text-2xl md:text-[30px] leading-[1.25] text-text-primary max-w-3xl mx-auto mb-8 uppercase tracking-tight"
          >
            Cybokrafts is committed to building reliable, indigenous energy intelligence systems to support the{" "}
            <span className="text-accent-blue font-semibold">Atmanirbhar</span> vision with{" "}
            <span className="text-accent-blue font-semibold">zero foreign dependencies</span> — and set a{" "}
            <span className="text-accent-blue font-semibold">global benchmark</span> for what Indian engineering companies can achieve.
          </m.h2>

          {/* Divider */}
          <m.div
            variants={fadeIn}
            className="w-full max-w-[200px] mx-auto h-[1px] bg-bg-border my-8"
            aria-hidden="true"
          />

          {/* Badges */}
          <m.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-text-muted uppercase tracking-[0.05em]"
          >
            <span>National AI Mission</span>
            <span className="text-bg-border">·</span>
            <span>MSME Certified</span>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}