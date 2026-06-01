"use client";

import { m } from "framer-motion";
import { staggerContainer, slideLeft, slideRight, fadeUp, cellFadeUp, VIEWPORT } from "@/lib/motion";

const parentLayer = {
  number: "01",
  label: "CYBO-VAJRA",
  desc: "Patented Edge Hardware Node",
  border: "border-l-[3px] border-l-status-green hover:border-l-[5px] hover:border-l-status-green",
  live: true,
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
          <m.div variants={slideLeft} className="bg-bg-surface border border-bg-border rounded-[4px] p-6 shadow-sm overflow-hidden relative">
            {/* Ambient background glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-status-green/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

            {/* High-tech Title Bar */}
            <div className="flex items-center justify-between border-b border-bg-border pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-status-green animate-pulse" />
                <span className="font-heading font-black text-xl text-text-primary uppercase tracking-wider">
                  CYBO-VAJRA SYSTEM
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest bg-bg-muted px-2 py-0.5 rounded-[2px]">
                CORE ARCHITECTURE
              </span>
            </div>

            {/* CYBO-VAJRA Core Parent Device Card */}
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-accent-blue/15 rounded-[4px] p-5 shadow-sm relative overflow-hidden mb-6">
              {/* Decorative grid pattern in background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1c5fd1_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 bg-status-green/10 border border-status-green/20 rounded-[3px] font-mono text-[9px] font-bold text-status-green tracking-wider uppercase">
                      ROOT HARDWARE
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">Patent 202521117118</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-text-primary tracking-wide mb-1">
                    CYBO-VAJRA EDGE NODE
                  </h3>
                  <p className="font-sans text-[13px] text-text-secondary max-w-[340px] leading-relaxed">
                    Patented hardware device deployed on-site for real-time electrical grid asset telemetry ingestion.
                  </p>
                </div>
                
                {/* Active telemetry signal visualization */}
                <div className="flex items-center gap-2.5 bg-white/85 backdrop-blur-sm border border-bg-border rounded-[3px] px-3 py-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-status-green"></span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-status-green uppercase tracking-wider">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Beautiful SVG branching path lines */}
            <div className="hidden md:block relative h-10 w-full mb-2" aria-hidden="true">
              <svg className="w-full h-full" viewBox="0 0 500 40" fill="none">
                {/* Main vertical stem from parent card */}
                <path d="M 250 0 L 250 15" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Horizontal branch divider */}
                <path d="M 80 15 L 420 15" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Vertical stems down to each sublayer */}
                <path d="M 80 15 L 80 40" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 250 15 L 250 40" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 420 15 L 420 40" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Animated data pulses moving along branches */}
                <circle r="3.5" fill="var(--color-accent-blue)">
                  <animateMotion 
                    path="M 250 0 L 250 15 L 80 15 L 80 40" 
                    dur="3s" 
                    repeatCount="indefinite" 
                  />
                </circle>
                <circle r="3.5" fill="var(--color-accent-blue)">
                  <animateMotion 
                    path="M 250 0 L 250 40" 
                    dur="2.2s" 
                    repeatCount="indefinite" 
                  />
                </circle>
                <circle r="3.5" fill="var(--color-accent-amber)">
                  <animateMotion 
                    path="M 250 0 L 250 15 L 420 15 L 420 40" 
                    dur="3.5s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </svg>
            </div>

            {/* Sub-branches columns (stacks on mobile, side-by-side on desktop) */}
            <div className="grid md:grid-cols-3 gap-4">
              {subLayers.map((layer, i) => (
                <m.div
                  key={i}
                  variants={cellFadeUp}
                  className={`bg-bg-surface border border-bg-border rounded-[4px] p-4 flex flex-col justify-between hover:border-text-muted hover:shadow-md transition-all duration-200 group relative ${layer.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-heading font-bold text-[16px] group-hover:text-accent-blue transition-colors text-text-primary uppercase tracking-wide leading-tight mb-2">
                      {layer.label}
                    </h4>
                    <p className="font-sans text-[12px] text-text-secondary leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                  
                  {/* Decorative high-tech bottom accent line */}
                  <div className="h-[1.5px] w-full bg-bg-border group-hover:bg-accent-blue transition-colors mt-4" />
                </m.div>
              ))}
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
            // WHO WE ARE
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

          {/* Ratan Tata quote */}
          <m.div variants={fadeUp} className="border-l-2 border-accent-amber pl-5 py-1 mb-8">
            <p className="text-text-secondary italic leading-relaxed text-[15px] font-sans">
              "We are inspired by the lifelong commitment of Sir Ratan Naval Tata Ji to nation-building — the belief that Indian enterprise can and must lead global innovation."
            </p>
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