"use client";

import { m } from "framer-motion";
import { Milestone, Flag, Cpu, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import { VIEWPORT } from "@/lib/motion";

const MILESTONES = [
  {
    year: "2025",
    title: "Genesis & Vision",
    desc: "Cybokrafts is incorporated with a singular vision: safeguarding India's power grid infrastructure by replacing imported diagnostic equipment with robust, indigenous smart-edge systems.",
    icon: Flag,
    color: "border-accent-blue text-accent-blue bg-accent-blue/5",
  },
  {
    year: "2025",
    title: "IIT Indore Academic Incubation",
    desc: "Operations establish inside the IIT Indore Incubation Center. This academic alliance grants deep laboratory research testing, high-voltage sensor calibration, and engineering validation capabilities.",
    icon: Cpu,
    color: "border-cyan-500 text-cyan-500 bg-cyan-500/5",
  },
  {
    year: "2025",
    title: "CYBO-VAJRA Patent Filing",
    desc: "Cybokrafts files the primary patent (Patent #202521117118) covering the custom edge hardware sensors and intelligent firmware logic of the CYBO-VAJRA grid monitoring device.",
    icon: FileText,
    color: "border-accent-amber text-accent-amber bg-accent-amber/5",
  },
  {
    year: "2025",
    title: "DPIIT Startup India Endorsement",
    desc: "The Department for Promotion of Industry and Internal Trade (DPIIT) officially recognizes Cybokrafts under the Startup India initiative for high-tech industrial innovations.",
    icon: ShieldAlert,
    color: "border-status-green text-status-green bg-status-green/5",
  },
  {
    year: "2026",
    title: "National Utility Deployments",
    desc: "Cybokrafts rolls out production-level installations across public and private transformer grids, bringing real-time predictive failure telemetry directly to control room dashboards.",
    icon: CheckCircle2,
    color: "border-accent-blue text-accent-blue bg-accent-blue/5",
  },
];

export default function Milestones() {
  return (
    <section className="relative py-24 bg-bg-base border-t border-bg-border/60 overflow-hidden">
      
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="milestone-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="none" stroke="var(--color-text-primary)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#milestone-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="font-mono text-xs text-accent-blue uppercase tracking-[0.25em] font-semibold mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-accent-blue/40" />
            THE JOURNEY
            <span className="w-6 h-px bg-accent-blue/40" />
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary uppercase tracking-tight leading-tight">
            Key Operational Milestones
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-4 font-light">
            Tracking our swift path from a localized engineering lab into a recognized energy infrastructure intelligence provider.
          </p>
        </m.div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Spine Line */}
          <div className="absolute left-[23px] sm:left-1/2 top-2 bottom-2 w-[2px] bg-bg-border/60 -translate-x-1/2" />
          
          <div className="space-y-12 sm:space-y-16">
            {MILESTONES.map((m_item, idx) => {
              const Icon = m_item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:items-center">
                  
                  {/* Timeline Dot with Glow */}
                  <div className="absolute left-[23px] sm:left-1/2 top-4 sm:top-auto -translate-x-1/2 z-10">
                    <m.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={VIEWPORT}
                      transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-bg-surface shadow-md ${m_item.color}`}
                    >
                      <Icon className="w-5 h-5 animate-pulse" />
                    </m.div>
                  </div>

                  {/* Spacer and Card Grid Layout */}
                  <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${isEven ? "sm:pr-12 sm:text-right sm:ml-0" : "sm:pl-12 sm:order-2 sm:mr-0 ml-auto"}`}>
                    <m.div
                      initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.15 }}
                      className="bg-bg-surface/80 backdrop-blur-md border border-bg-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-accent-blue/20 transition-all duration-300 relative group"
                    >
                      {/* Year Indicator Pill */}
                      <span className={`inline-block font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border mb-3 ${
                        idx === 4 ? "text-accent-blue bg-accent-blue-light border-accent-blue/15" : "text-text-muted bg-bg-muted border-bg-border/50"
                      }`}>
                        {m_item.year}
                      </span>
                      
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-text-primary uppercase tracking-wide leading-tight group-hover:text-accent-blue transition-colors duration-200">
                        {m_item.title}
                      </h3>
                      
                      <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mt-3 font-light">
                        {m_item.desc}
                      </p>
                      
                      {/* Custom indicator arrow on card edge */}
                      <div className={`absolute top-6 w-3 h-3 bg-bg-surface border-t border-l border-bg-border/60 rotate-45 hidden sm:block ${
                        isEven ? "right-[-7px] rotate-[135deg] border-t-0 border-l-0 border-r border-b" : "left-[-7px] rotate-[-45deg]"
                      }`} />
                    </m.div>
                  </div>

                  {/* empty space on the opposite side to balance timeline */}
                  <div className="hidden sm:block sm:w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
