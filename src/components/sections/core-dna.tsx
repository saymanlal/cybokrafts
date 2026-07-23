"use client";

import { m } from "framer-motion";
import { Shield, Zap, Cpu, ArrowUpRight } from "lucide-react";
import { VIEWPORT } from "@/lib/motion";

const PILLARS = [
  {
    title: "Atmanirbhar Engineering",
    tag: "Self-Reliance",
    desc: "100% indigenous hardware design and software architectures built entirely within India. Strengthening local energy grids while eliminating dependency on foreign imports.",
    icon: Shield,
    color: "blue",
    glow: "bg-accent-blue/10 border-accent-blue/20 text-accent-blue",
    badge: "bg-accent-blue-light text-accent-blue border-accent-blue/15",
  },
  {
    title: "Predictive Intelligence",
    tag: "Zero-Downtime",
    desc: "Harnessing real-time machine learning telemetry to anticipate equipment faults weeks before they happen, transforming emergency grid repair into planned operations.",
    icon: Zap,
    color: "amber",
    glow: "bg-accent-amber/10 border-accent-amber/20 text-accent-amber",
    badge: "bg-accent-amber-bg text-accent-amber border-accent-amber/15",
  },
  {
    title: "Industrial-Grade Reliability",
    tag: "Hardware IP",
    desc: "Embedded hardware (CYBO-VAJRA) designed to endure harsh substation environments, grid harmonics, and continuous extreme thermal cycles.",
    icon: Cpu,
    color: "cyan",
    glow: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
    badge: "bg-cyan-500/5 text-cyan-600 border-cyan-500/15",
  },
];

export default function CoreDNA() {
  return (
    <section className="relative py-24 bg-bg-base border-t border-bg-border/60 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" fill="none" stroke="var(--color-text-primary)" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-accent-blue uppercase tracking-[0.25em] font-semibold mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-accent-blue/40" />
            OUR GUIDING DNA
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary uppercase tracking-tight leading-tight">
            Designed for National Resilience
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-4 font-light">
            We build with structural integrity, advanced software logic, and an unyielding commitment to securing critical national power assets.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <m.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative bg-bg-surface/90 backdrop-blur-xl border border-bg-border/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg hover:border-accent-blue/20"
              >
                <div>
                  {/* Top Row: Icon and Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl border ${pillar.glow}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent-blue -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </div>

                  {/* Badges and titles */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pillar.badge}`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary uppercase tracking-wide leading-tight group-hover:text-accent-blue transition-colors duration-200">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mt-4 font-light">
                    {pillar.desc}
                  </p>
                </div>

                {/* Subtle role gradient glow inside card bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl transition-all duration-300 ${
                  pillar.color === 'blue' ? 'bg-accent-blue/50' :
                  pillar.color === 'amber' ? 'bg-accent-amber/50' :
                  'bg-cyan-500/50'
                } scale-x-0 group-hover:scale-x-100`} />
              </m.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
