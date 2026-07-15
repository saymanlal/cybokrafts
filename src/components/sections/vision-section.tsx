"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn, slideRight, VIEWPORT } from "@/lib/motion";

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

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Vision & Mission text */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="text-left"
          >
            <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
              VISION & MISSION
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
              className="font-heading font-semibold text-2xl md:text-[30px] leading-[1.25] text-text-primary mb-8 uppercase tracking-tight"
            >
              Cybokrafts is committed to building reliable, indigenous energy intelligence systems to support the{" "}
              <span className="text-accent-blue font-semibold">Atmanirbhar Bharat</span> vision with{" "}
              <span className="text-accent-blue font-semibold">zero foreign dependencies</span>  and set a{" "}
              <span className="text-accent-blue font-semibold">global benchmark</span> for what Indian engineering companies can achieve.
            </m.h2>

            {/* Divider */}
            <m.div
              variants={fadeIn}
              className="w-full max-w-[200px] h-[1px] bg-bg-border my-8"
              aria-hidden="true"
            />

            {/* Badges */}
            <m.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-text-muted uppercase tracking-[0.05em]"
            >
              <span>National AI Mission</span>
              <span className="text-bg-border">·</span>
              <span>MSME Certified</span>
            </m.div>
          </m.div>

          {/* Right: Inspired by — Sir Ratan Tata */}
          <m.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative group"
          >
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
              Inspired By
            </p>

            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-[420px] bg-gradient-to-r from-slate-900 to-slate-800">
                <Image
                  src="/images/ratan_tata.png"
                  alt="Sir Ratan Tata"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: "50% 25%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              <div className="absolute left-6 xs:left-8 bottom-6 max-w-[85%] text-left">
                <div className="text-6xl text-accent-amber/30 font-serif leading-none mb-1">"</div>
                <p className="font-serif text-white text-lg leading-relaxed font-medium">
                  Indian enterprise can and must lead global innovation.
                </p>
                <p className="font-mono text-[10px] text-accent-amber uppercase tracking-wider mt-3">
                  — Sir Ratan Tata
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-2">
              <div className="w-8 h-px bg-accent-amber/40" />
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                Industrial Visionary · Tata Group Chairman Emeritus
              </span>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
