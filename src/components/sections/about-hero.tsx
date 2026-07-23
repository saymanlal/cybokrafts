"use client";

import { m } from "framer-motion";
import { VIEWPORT } from "@/lib/motion";
import { Sparkles, Award, Cpu, Shield } from "lucide-react";

const stats = [
  { value: "2025", label: "Founded", icon: Sparkles, color: "text-accent-blue bg-accent-blue/10 border-accent-blue/20" },
  { value: "IIT Indore", label: "Incubated", icon: Cpu, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
  { value: "4 Filed", label: "Patents", icon: Shield, color: "text-accent-amber bg-accent-amber/10 border-accent-amber/20" },
  { value: "DPIIT", label: "Recognised", icon: Award, color: "text-status-green bg-status-green/10 border-status-green/20" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-bg-border/60 bg-bg-base pt-32 pb-20 sm:pt-40 sm:pb-28">
      
      {/* ── Animated Smart Grid Nodes Background ── */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-text-primary)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="var(--color-accent-blue)" className="animate-pulse" />
              <circle cx="60" cy="0" r="1.5" fill="var(--color-accent-blue)" />
              <circle cx="0" cy="60" r="1.5" fill="var(--color-accent-blue)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>

        {/* Floating Glowing Pulse Particles (Simulating energy flows in a grid) */}
        <div className="absolute top-[30%] left-[20%] w-[12px] h-[12px] rounded-full bg-accent-blue blur-sm animate-[ping_4s_infinite]" />
        <div className="absolute top-[60%] left-[75%] w-[8px] h-[8px] rounded-full bg-accent-amber blur-[2px] animate-[ping_6s_infinite_1s]" />
        <div className="absolute top-[80%] left-[45%] w-[10px] h-[10px] rounded-full bg-status-green blur-sm animate-[ping_5s_infinite_3s]" />
      </div>

      {/* Subtle Radial Ambient Backlights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[160px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-accent-amber/5 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Subtitle tag */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/15 bg-accent-blue-light text-accent-blue font-mono text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
            Who We Are
          </span>
        </m.div>

        {/* Heading Statement */}
        <m.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] uppercase max-w-4xl text-text-primary"
        >
          Bridging Industrial Assets <br />
          <span className="text-accent-blue bg-gradient-to-r from-accent-blue via-cyan-500 to-accent-blue bg-clip-text text-transparent">
            With Modern Intelligence
          </span>
        </m.h1>

        {/* Core mission description paragraphs */}
        <div className="mt-8 grid md:grid-cols-12 gap-6 lg:gap-12 items-start">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 space-y-5"
          >
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans font-light">
              Cybokrafts Universal Innovations is an Indian infrastructure technology company
              building AI-powered monitoring systems for critical energy assets — operating at the
              intersection of hardware engineering and intelligent software.
            </p>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans font-light">
              Our mission is anchored in the <span className="text-accent-blue font-semibold">Atmanirbhar Bharat</span> vision —
              delivering indigenous, world-class technology that strengthens India&apos;s energy
              infrastructure and reduces dependence on imported systems.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5 p-6 rounded-2xl bg-bg-surface/60 border border-bg-border/40 backdrop-blur-md relative"
          >
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest font-bold mb-3">
              Incubation & Ecosystem Support
            </p>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              Incubated at the prestigious <span className="text-text-primary font-semibold">IIT Indore Incubation Center</span> and officially recognized by the Department for Promotion of Industry and Internal Trade (<span className="text-text-primary font-semibold">DPIIT</span>), we scale robust solutions designed for the heavy industrial demands of power distribution companies.
            </p>
            <div className="absolute right-4 bottom-4 w-12 h-12 border-r border-b border-accent-blue/20 rounded-br-xl pointer-events-none" />
          </m.div>
        </div>

        {/* Redesigned Stat Strips with micro-animations */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <m.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -5px rgba(28,95,209,0.1)" }}
                className="bg-bg-surface/80 backdrop-blur-md border border-bg-border/60 rounded-xl p-5 border-l-4 border-l-accent-blue flex flex-col justify-between transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-1.5 rounded-lg border ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest font-bold">
                    CYBO-STAT
                  </span>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl sm:text-2xl text-text-primary uppercase tracking-wide leading-none">
                    {s.value}
                  </div>
                  <div className="font-mono text-[9px] text-text-muted uppercase tracking-wider mt-2.5">
                    {s.label}
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
