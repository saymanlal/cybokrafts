"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { staggerContainer, slideLeft, slideRight, fadeUp, cellFadeUp, VIEWPORT } from "@/lib/motion";

const parentLayer = {
  label: "AIpowerOS",
  desc: "Patent Filed Cloud Intelligence Platform for Real-time Infrastructure Monitoring",
  border: "border-l-4 border-l-status-green",
  patent: "Patent #202521117118",
};

const subLayers = [
  {
    id: "edge",
    label: "Edge Gateway",
    desc: "Secure Multi-protocol Data Aggregation & Local Edge Analytics",
    border: "border-l-4 border-l-accent-blue",
    color: "accent-blue",
    tag: "Edge Node",
  },
  {
    id: "cloud",
    label: "Cloud Platform",
    desc: "Scalable Telemetry Processing & Predictive Anomaly Engine",
    border: "border-l-4 border-l-accent-blue",
    color: "accent-blue",
    tag: "Cloud Core",
  },
  {
    id: "hardware",
    label: "CYBO-VAJRA",
    desc: "Hardware Edge Computing Unit with Patented Sensors",
    border: "border-l-4 border-l-accent-amber",
    color: "accent-amber",
    tag: "Hardware IP",
  },
];

const PARTNERS = [
  { name: "DPIIT Startup India", tag: "Government Recognized" },
  { name: "IIT Indore Incubation", tag: "Academic Partner" },
  { name: "Tata Tele Business", tag: "Enterprise Connectivity" },
];

export default function AboutSection() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section
      id="about-architecture"
      className="py-24 lg:py-32 bg-bg-base border-t border-bg-border/60 relative overflow-hidden"
      aria-labelledby="about-architecture-heading"
    >
      {/* Background Decorative Ambient Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-accent-blue/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -left-20 w-[550px] h-[550px] bg-accent-amber/10 rounded-full blur-[140px]" />
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="var(--color-grid-line)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="font-mono text-xs text-accent-blue uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-accent-blue/40" />
            SYSTEM ARCHITECTURE & INNOVATION
            <span className="w-8 h-px bg-accent-blue/40" />
          </p>
          <h2
            id="about-architecture-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary uppercase tracking-tight leading-tight"
          >
            Engineering Indigenous Technology
          </h2>
          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mt-4">
            Our multi-tier tech stack combines hardware edge processing with cloud intelligence to deliver zero-downtime asset protection.
          </p>
        </m.div>

        {/* Top Row: System Architecture (Left) + Sir Ratan Tata Quote (Right) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left: Architecture Interactive Stack */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative"
          >
            <m.div variants={slideLeft} className="bg-bg-surface/80 backdrop-blur-md border border-bg-border/60 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-bg-border/50">
                <p className="font-mono text-xs text-accent-blue uppercase tracking-wider font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                  TECHNOLOGY STACK HIERARCHY
                </p>
                <span className="font-mono text-[10px] text-text-muted uppercase">
                  Patent Protected
                </span>
              </div>
              
              <div className="flex flex-col relative gap-4">
                
                {/* Core Software Platform Node */}
                <m.div
                  variants={cellFadeUp}
                  onMouseEnter={() => setActiveLayer(parentLayer.label)}
                  onMouseLeave={() => setActiveLayer(null)}
                  className={`bg-bg-surface border rounded-xl p-5 sm:p-6 transition-all duration-300 group cursor-pointer ${
                    parentLayer.border
                  } ${
                    activeLayer === parentLayer.label
                      ? "border-status-green shadow-[0_10px_25px_-5px_rgba(5,150,105,0.15)] -translate-y-1"
                      : "border-bg-border/60 shadow-sm hover:border-status-green/50"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[9px] font-bold text-status-green uppercase tracking-wider bg-status-green-bg px-2.5 py-0.5 rounded-full border border-status-green/20">
                      CORE OS PLATFORM
                    </span>
                    <span className="font-mono text-[10px] font-bold text-text-muted bg-bg-muted px-2 py-0.5 rounded">
                      {parentLayer.patent}
                    </span>
                  </div>
                  
                  <h4 className="font-heading font-bold text-xl sm:text-2xl group-hover:text-status-green transition-colors text-text-primary uppercase tracking-wide leading-tight mb-1">
                    {parentLayer.label}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {parentLayer.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-2 font-mono text-[9px] text-status-green font-semibold uppercase tracking-widest">
                    <span className="w-2 h-2 bg-status-green rounded-full animate-ping" />
                    <span>Real-time Active Engine</span>
                  </div>
                </m.div>

                {/* Connected Sub-Layers */}
                <div className="relative pl-6 sm:pl-8 flex flex-col gap-3 mt-1">
                  {/* Vertical Spine Line */}
                  <div className="absolute left-[12px] sm:left-[16px] top-[-8px] bottom-[28px] w-[2px] bg-accent-blue/30" />

                  {subLayers.map((layer) => {
                    const isHovered = activeLayer === layer.id;
                    const accentColorClass = layer.id === "hardware" ? "text-accent-amber" : "text-accent-blue";
                    const hoverBorder = layer.id === "hardware" ? "hover:border-accent-amber/60" : "hover:border-accent-blue/60";

                    return (
                      <div key={layer.id} className="relative">
                        {/* Horizontal Connector Arm */}
                        <div className="absolute left-[-16px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-[16px] sm:w-[20px] h-[2px] bg-accent-blue/30" />
                        <div className="absolute left-[-19px] sm:left-[-23px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-bg-surface bg-accent-blue z-10" />

                        <m.div
                          variants={cellFadeUp}
                          onMouseEnter={() => setActiveLayer(layer.id)}
                          onMouseLeave={() => setActiveLayer(null)}
                          className={`bg-bg-surface/90 border rounded-xl p-4 sm:p-5 transition-all duration-300 group cursor-pointer ${
                            layer.border
                          } ${hoverBorder} ${
                            isHovered
                              ? "shadow-md -translate-y-0.5 border-accent-blue"
                              : "border-bg-border/60 shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${accentColorClass}`}>
                                  {layer.tag}
                                </span>
                              </div>
                              <h5 className={`font-heading font-bold text-lg group-hover:${accentColorClass} transition-colors text-text-primary uppercase tracking-wide leading-tight`}>
                                {layer.label}
                              </h5>
                              <p className="font-sans text-xs text-text-secondary leading-relaxed mt-1">
                                {layer.desc}
                              </p>
                            </div>
                          </div>
                        </m.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </m.div>
          </m.div>

          {/* Right: Sir Ratan Tata Banner */}
          <m.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative group"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-bg-border/60 bg-bg-surface">
              <div className="relative w-full h-[360px] sm:h-[400px]">
                <Image
                  src="/images/ratan_tata.png"
                  alt="Sir Ratan Tata"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ objectPosition: "50% 25%" }}
                />
                {/* Gradient Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-left">
                <div className="text-5xl text-accent-amber/40 font-serif leading-none mb-2">“</div>
                <p className="font-serif text-white text-lg sm:text-xl leading-relaxed font-medium">
                  Indian enterprise can and must lead global innovation.
                </p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/15">
                  <div>
                    <p className="font-mono text-xs text-accent-amber font-semibold uppercase tracking-wider">
                      Sir Ratan Tata
                    </p>
                    <p className="font-sans text-[11px] text-white/70">
                      Industrial Visionary · Tata Group Chairman Emeritus
                    </p>
                  </div>
                  <div className="w-8 h-px bg-accent-amber/60" />
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Bottom Row: Accreditations (Left) + Nikola Tesla Banner (Right) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Accreditations & Partners */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="space-y-6"
          >
            <div>
              <p className="font-mono text-xs text-accent-blue uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-accent-blue/50" />
                ACCREDITATIONS & PARTNERS
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-text-primary uppercase tracking-tight">
                Backed by Leading Ecosystem Pioneers
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2">
                Cybokrafts collaborates with prestigious academic institutions and government startup programs to scale reliable infrastructure solutions.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {PARTNERS.map((partner, i) => (
                <m.div
                  key={partner.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-xl bg-bg-surface/80 backdrop-blur-md border border-bg-border/60 shadow-sm hover:border-accent-blue/40 hover:shadow-md transition-all duration-300 group"
                >
                  <p className="font-mono text-[9px] text-accent-blue font-semibold uppercase tracking-wider mb-1">
                    {partner.tag}
                  </p>
                  <p className="font-heading font-bold text-sm text-text-primary uppercase tracking-wide group-hover:text-accent-blue transition-colors">
                    {partner.name}
                  </p>
                </m.div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-accent-blue-light/50 border border-accent-blue/15 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                <span className="w-3 h-3 rounded-full bg-accent-blue animate-ping" />
              </div>
              <div>
                <p className="font-sans text-xs text-text-primary font-semibold">
                  Atmanirbhar Bharat Initiative
                </p>
                <p className="font-sans text-xs text-text-secondary">
                  Designing 100% indigenous hardware & software for power grids.
                </p>
              </div>
            </div>
          </m.div>

          {/* Right: Nikola Tesla Banner */}
          <m.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative group"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-bg-border/60 bg-bg-surface">
              <div className="relative w-full h-[360px] sm:h-[400px]">
                <Image
                  src="/images/nikola_tesla.png"
                  alt="Nikola Tesla"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ objectPosition: "50% 25%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-left">
                <div className="text-5xl text-accent-blue/40 font-serif leading-none mb-2">“</div>
                <p className="font-serif text-white text-lg sm:text-xl leading-relaxed font-medium">
                  If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.
                </p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/15">
                  <div>
                    <p className="font-mono text-xs text-accent-blue font-semibold uppercase tracking-wider">
                      Nikola Tesla
                    </p>
                    <p className="font-sans text-[11px] text-white/70">
                      AC Power Pioneer · Inventor of Modern Energy Infrastructure
                    </p>
                  </div>
                  <div className="w-8 h-px bg-accent-blue/60" />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}