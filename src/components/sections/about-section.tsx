"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { staggerContainer, slideLeft, slideRight, fadeUp, cellFadeUp, VIEWPORT } from "@/lib/motion";

const parentLayer = {
  label: "CYBO-VAJRA",
  desc: "Patented Edge Hardware Node",
  border: "border-l-[3px] border-l-status-green hover:border-l-[5px] hover:border-l-status-green",
  patent: "Patent 202521117118",
};

const subLayers = [
  {
    label: "Edge Gateway",
    desc: "Secure Data Aggregation",
    border: "border-l-[2px] border-l-accent-blue hover:border-l-[4px] hover:border-l-accent-blue",
  },
  {
    label: "Cloud Platform",
    desc: "Real-time Data Processing",
    border: "border-l-[2px] border-l-accent-blue hover:border-l-[4px] hover:border-l-accent-blue",
  },
  {
    label: "AIpowerOS",
    desc: "Analytics & Intelligence Layer",
    border: "border-l-[2px] border-l-accent-amber hover:border-l-[4px] hover:border-l-accent-amber",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 bg-bg-muted border-t border-bg-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left: Architecture Layers — slide in from left with stagger */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative"
        >
          <m.div variants={slideLeft} className="bg-bg-surface border border-bg-border rounded-[3px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
              SYSTEM ARCHITECTURE
            </p>
            
            <div className="flex flex-col relative">
              
              {/* Parent Core Hardware Node (CYBO-VAJRA) */}
              <m.div
                variants={cellFadeUp}
                className={`bg-bg-surface border border-bg-border rounded-[4px] p-5 flex flex-col justify-between hover:border-status-green/50 hover:shadow-md transition-all duration-200 group relative ${parentLayer.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] font-bold text-status-green uppercase tracking-wider bg-status-green-bg px-2 py-0.5 rounded-sm border border-status-green/10">
                    // PATENTED CORE HARDWARE
                  </span>
                  <span className="font-mono text-[9px] font-bold text-text-muted">
                    {parentLayer.patent}
                  </span>
                </div>
                
                <h4 className="font-heading font-bold text-lg group-hover:text-status-green transition-colors text-text-primary uppercase tracking-wide leading-tight mb-1">
                  {parentLayer.label}
                </h4>
                <p className="font-sans text-[13px] text-text-secondary leading-relaxed pr-24">
                  {parentLayer.desc}
                </p>

                {/* Pulsing Core Tag */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-mono text-[8px] text-status-green font-bold uppercase tracking-widest bg-status-green-bg px-2 py-1 rounded-sm border border-status-green/20">
                  <span className="w-1.5 h-1.5 bg-status-green rounded-full animate-ping" />
                  <span>CORE NODE</span>
                </div>
              </m.div>

              {/* Tree Connection Line and Indented Sub-layers Container */}
              <div className="relative pl-10 mt-4 flex flex-col gap-4">
                
                {/* Vertical Bus Line linking parent to all sub-layers */}
                <div className="absolute left-[16px] top-[-16px] bottom-[30px] w-[2px] bg-bg-border-strong/45" />

                {subLayers.map((layer, i) => (
                  <div key={i} className="relative">
                    
                    {/* Horizontal Branch Link */}
                    <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-[24px] h-[2px] bg-bg-border-strong/45" />
                    
                    {/* Connection Node Indicator */}
                    <div className="absolute left-[-27px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-bg-border-strong bg-white z-10 flex items-center justify-center">
                      <div className={`w-1 h-1 rounded-full ${
                        layer.label === "AIpowerOS" ? "bg-accent-amber" : "bg-accent-blue"
                      }`} />
                    </div>

                    {/* Sub-layer Card */}
                    <m.div
                      variants={cellFadeUp}
                      className={`bg-bg-surface border border-bg-border rounded-[4px] p-4 flex flex-col justify-between hover:border-text-muted hover:shadow-md transition-all duration-200 group relative ${layer.border}`}
                    >
                      <div>
                        <h5 className="font-heading font-bold text-[15px] group-hover:text-accent-blue transition-colors text-text-primary uppercase tracking-wide leading-tight mb-1">
                          {layer.label}
                        </h5>
                        <p className="font-sans text-[12px] text-text-secondary leading-relaxed">
                          {layer.desc}
                        </p>
                      </div>

                      {/* Small technical locator marker */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[8px] text-text-muted font-bold tracking-widest uppercase">
                        // {layer.label.split(" ")[0]}
                      </div>
                    </m.div>
                  </div>
                ))}
              </div>

            </div>
          </m.div>
        </m.div>

        {/* Right: Company story — slide in from right */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-5">
            WHO WE ARE
          </m.p>

          <m.h2
            id="about-heading"
            variants={slideRight}
            className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] text-text-primary mb-6 uppercase tracking-tight"
          >
            Bridging Industrial Assets with Modern Intelligence
          </m.h2>

          <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed mb-5">
            Cybokrafts Universal Innovations is an Indian infrastructure technology company building AI-powered monitoring systems for critical energy assets. We operate at the intersection of hardware engineering and intelligent software.
          </m.p>

          <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed mb-8">
            Our mission is anchored in the Atmanirbhar Bharat vision — delivering indigenous, world-class technology solutions that strengthen India's energy infrastructure and reduce dependence on imported systems.
          </m.p>

          {/* Architects of Inspiration Panel */}
          <m.div variants={fadeUp} className="mb-10">
            <p className="font-mono text-[9px] text-text-muted font-bold tracking-widest uppercase mb-4">// ARCHITECTS OF INSPIRATION</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Ratan Tata Card */}
              <div className="flex gap-4 p-4 border border-bg-border/60 bg-white/70 backdrop-blur-md rounded-md shadow-[0_2px_12px_rgba(12,25,41,0.01)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent-amber/40" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent-amber/40" />
                
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-bg-border/80 bg-bg-muted flex-shrink-0">
                  <Image
                    src="/images/ratan_tata.png?v=2"
                    alt="Sir Ratan Tata Portrait"
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-heading font-bold text-[13px] text-text-primary uppercase tracking-wider">
                    Sir Ratan Tata
                  </h4>
                  <p className="font-mono text-[8px] text-accent-amber font-semibold uppercase tracking-wider mb-2">
                    Industrial Pioneer
                  </p>
                  <blockquote className="font-sans text-[11px] text-text-secondary leading-snug italic">
                    "Indian enterprise can and must lead global innovation."
                  </blockquote>
                </div>
              </div>

              {/* Nikola Tesla Card */}
              <div className="flex gap-4 p-4 border border-bg-border/60 bg-white/70 backdrop-blur-md rounded-md shadow-[0_2px_12px_rgba(12,25,41,0.01)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent-blue/40" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent-blue/40" />
                
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-bg-border/80 bg-bg-muted flex-shrink-0">
                  <Image
                    src="/images/nikola_tesla.png?v=2"
                    alt="Nikola Tesla Portrait"
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-heading font-bold text-[13px] text-text-primary uppercase tracking-wider">
                    Nikola Tesla
                  </h4>
                  <p className="font-mono text-[8px] text-accent-blue font-semibold uppercase tracking-wider mb-2">
                    AC Power Pioneer
                  </p>
                  <blockquote className="font-sans text-[11px] text-text-secondary leading-snug italic">
                    "Think in terms of energy, frequency and vibration."
                  </blockquote>
                </div>
              </div>

            </div>
          </m.div>

          <m.div variants={fadeUp} className="flex flex-wrap gap-3">
            {["DPIIT Startup India", "IIT Indore Incubation", "Tata Tele Business"].map((partner, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-bg-surface border border-bg-border rounded-[3px] font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider"
              >
                {partner}
              </span>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}