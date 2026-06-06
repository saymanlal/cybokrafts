"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

interface TelemetryMetric {
  label: string;
  value: string;
  type: "progress" | "badge" | "status";
  progressValue?: number;
  statusColor?: string;
}

interface CoreValue {
  number: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  isGreen?: boolean;
  manifesto?: string;
  telemetry: TelemetryMetric[];
}

const values: CoreValue[] = [
  {
    number: "01",
    name: "Guru Grace",
    tagline: "Wisdom-led leadership",
    description: "We are guided by wisdom, humility, and reverence for knowledge in every decision we make.",
    manifesto: "Knowledge is the ultimate power grid. We lead by serving.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.5 12" /><path d="M12 2v10" />
      </svg>
    ),
    telemetry: [
      { label: "GUIDANCE INDEX", value: "99.8%", type: "badge" },
      { label: "ETHICAL RATING", value: "OPTIMAL", type: "status", statusColor: "blue" },
      { label: "DECISION MATRIX", value: "WISDOM-BASED", type: "badge" },
      { label: "SERVICE LEVEL", value: "MAX LEVEL", type: "badge" },
    ],
  },
  {
    number: "02",
    name: "Gratitude",
    tagline: "Humility at the core",
    description: "We appreciate every opportunity, every stakeholder, and every challenge that has shaped us.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    telemetry: [
      { label: "COLLABORATION FEEDBACK", value: "98% POSITIVE", type: "badge" },
      { label: "FEEDBACK LOOP", value: "ACTIVE", type: "status", statusColor: "blue" },
      { label: "STAKEHOLDER SYNC", value: "100% ALIGNED", type: "progress", progressValue: 100 },
      { label: "HUMILITY COMPLIANCE", value: "OPTIMAL", type: "badge" },
    ],
  },
  {
    number: "03",
    name: "Genius Development",
    tagline: "Nurturing innovation",
    description: "We invest in talent, foster creative thinking, and build systems that bring out engineering excellence.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    telemetry: [
      { label: "R&D RE-INVESTMENT", value: "15% REV", type: "badge" },
      { label: "INNOVATION INDEX", value: "94%", type: "progress", progressValue: 94 },
      { label: "ACTIVE PATENTS", value: "4 FILED", type: "badge" },
      { label: "DEV RATE", value: "EXCELLENT", type: "status", statusColor: "blue" },
    ],
  },
  {
    number: "04",
    name: "Green Thinking",
    tagline: "Sustainability in every solution",
    description: "Every product we build is designed to reduce energy waste, support renewables, and protect the environment.",
    isGreen: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22V12M12 12C12 7 17 3 22 3c0 5-4 9-10 9zM12 12C12 7 7 3 2 3c0 5 4 9 10 9z" />
      </svg>
    ),
    telemetry: [
      { label: "CARBON REDUCTION", value: "92%", type: "progress", progressValue: 92 },
      { label: "DESIGN TARGET", value: "NET ZERO LOSS", type: "badge" },
      { label: "ECO COMPLIANCE", value: "100% CLEAN", type: "badge" },
      { label: "GRID INDEX", value: "STABLE", type: "status", statusColor: "green" },
    ],
  },
  {
    number: "05",
    name: "Global Vision",
    tagline: "Building for the world from India",
    description: "Our ambitions are not bounded by geography. We build indigenous solutions with global standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    telemetry: [
      { label: "GRID COMPATIBILITY", value: "IEEE & IEC", type: "badge" },
      { label: "CLOUD BOUNDARY", value: "DOMESTIC", type: "badge" },
      { label: "GLOBAL EXPORTS", value: "READY", type: "status", statusColor: "blue" },
      { label: "REGULATORY COMPLIANCE", value: "100%", type: "progress", progressValue: 100 },
    ],
  },
  {
    number: "06",
    name: "Grounded Leadership",
    tagline: "Ethics and integrity at the helm",
    description: "Leadership at Cybokrafts means leading with authenticity, accountability, and unwavering integrity.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    telemetry: [
      { label: "AUDIT TRAIL", value: "IMMUTABLE LEDGER", type: "badge" },
      { label: "COMPLIANCE check", value: "100% SOURCED", type: "badge" },
      { label: "INTEGRITY RATIO", value: "EXCELLENT", type: "status", statusColor: "blue" },
      { label: "TRANSPARENCY INDEX", value: "98.5%", type: "progress", progressValue: 98.5 },
    ],
  },
  {
    number: "07",
    name: "Growth For All",
    tagline: "Shared and inclusive prosperity",
    description: "We create value not just for shareholders, but for communities, partners, and India at large.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    telemetry: [
      { label: "LOCAL EMPLOYMENT", value: "EXCELLENT", type: "status", statusColor: "blue" },
      { label: "STAKEHOLDER LOOPS", value: "100% ALIGNED", type: "badge" },
      { label: "REGIONAL GROWTH", value: "95%", type: "progress", progressValue: 95 },
      { label: "PROSPERITY RATIO", value: "OPTIMAL", type: "badge" },
    ],
  },
];

export default function ValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % values.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + values.length) % values.length);
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  // Math for capsule positioning on a 540x540 canvas with a 210px radius
  const R = 210;
  const activeAngle = (activeIndex * 360 / 7) - 90;
  const activeRad = activeAngle * Math.PI / 180;
  const activeX = 270 + Math.cos(activeRad) * R;
  const activeY = 270 + Math.sin(activeRad) * R;

  return (
    <section
      id="values"
      className="py-28 bg-[#FFFFFF] border-t border-bg-border relative overflow-hidden"
      aria-labelledby="values-heading"
    >
      {/* Background Technical Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-line)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-2xl mb-16"
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
            FOUNDATIONAL PRINCIPLES
          </m.p>
          <m.h2
            id="values-heading"
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] text-text-primary uppercase tracking-tight mb-4"
          >
            Our 7G Core Values
          </m.h2>
          <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed">
            The principles that guide every solution we build, every partnership we form, and every engineer we develop.
          </m.p>
        </m.div>

        {/* ==================== DESKTOP HOLOGRAPHIC SYSTEMS CONTROL PORTAL ==================== */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center w-full relative">
          
          {/* Left Column: Cybernetic Status & Analysis Deck */}
          <div className="col-span-5 relative flex flex-col justify-center min-h-[480px]">
            {/* Outline watermark index number */}
            <div className="absolute top-[-30px] left-[-20px] font-heading font-extrabold text-[150px] text-accent-blue/[0.03] leading-none pointer-events-none select-none">
              {values[activeIndex].number}
            </div>

            {/* Futuristic Tech Console Container */}
            <div className="relative border border-bg-border/60 bg-white/70 backdrop-blur-md rounded-md p-8 shadow-[0_4px_24px_rgba(12,25,41,0.02)] overflow-hidden">
              {/* Decorative Tech Corners */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-accent-blue/30" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-accent-blue/30" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-accent-blue/30" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-accent-blue/30" />

              {/* Status Header */}
              <div className="flex items-center justify-between gap-2 mb-6 font-mono text-[9px] text-text-muted uppercase tracking-[0.15em] font-semibold border-b border-bg-border/40 pb-4">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${values[activeIndex].isGreen ? "bg-status-green" : "bg-accent-blue"} animate-pulse`} />
                  <span>CORE_NODE_{values[activeIndex].number}: ONLINE</span>
                </div>
                <span>SYS_INTEGRITY: OPTIMAL</span>
              </div>

              {/* Title Reveal */}
              <div className="overflow-hidden relative h-[38px] mb-1">
                <AnimatePresence mode="wait">
                  <m.h3
                    key={activeIndex}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`font-heading font-bold text-3xl leading-none uppercase tracking-wide ${
                      values[activeIndex].isGreen ? "text-status-green" : "text-accent-blue"
                    }`}
                  >
                    {values[activeIndex].name}
                  </m.h3>
                </AnimatePresence>
              </div>

              {/* Tagline Reveal */}
              <div className="overflow-hidden relative h-[18px] mb-5 border-l-2 border-bg-border-strong/40 pl-3">
                <AnimatePresence mode="wait">
                  <m.p
                    key={activeIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[10px] font-semibold text-text-secondary uppercase tracking-[0.12em]"
                  >
                    {values[activeIndex].tagline}
                  </m.p>
                </AnimatePresence>
              </div>

              {/* Description */}
              <div className="min-h-[70px]">
                <AnimatePresence mode="wait">
                  <m.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="font-sans text-text-secondary text-[14px] leading-relaxed mb-6"
                  >
                    {values[activeIndex].description}
                  </m.p>
                </AnimatePresence>
              </div>

              {/* Technical Telemetry Dashboard */}
              <div className="border-t border-bg-border/40 pt-6">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {values[activeIndex].telemetry.map((t, idx) => (
                      <div key={idx} className="bg-bg-muted/40 border border-bg-border/40 p-3.5 rounded-sm flex flex-col justify-between min-h-[62px]">
                        <span className="font-mono text-[8px] text-text-muted uppercase tracking-wider block">
                          {t.label}
                        </span>
                        {t.type === "progress" ? (
                          <div className="mt-2">
                            <div className="w-full bg-bg-border/30 h-1.5 rounded-full overflow-hidden">
                              <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${t.progressValue}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`h-full ${values[activeIndex].isGreen ? "bg-status-green" : "bg-accent-blue"}`}
                              />
                            </div>
                          </div>
                        ) : t.type === "status" ? (
                          <div className="flex items-center gap-1.5 mt-1 font-heading font-bold text-xs text-text-primary uppercase">
                            <span className={`w-1.5 h-1.5 rounded-full ${t.statusColor === "green" ? "bg-status-green animate-pulse" : "bg-accent-blue animate-pulse"}`} />
                            {t.value}
                          </div>
                        ) : (
                          <span className="font-heading font-bold text-xs text-text-primary mt-1 uppercase block">
                            {t.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Manifesto Quote if applicable */}
              <AnimatePresence mode="wait">
                {values[activeIndex].manifesto && (
                  <m.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 border-l-2 border-accent-blue pl-4 py-2 bg-accent-blue-light/30 rounded-sm"
                  >
                    <span className="font-mono text-[8px] text-accent-blue font-bold tracking-widest uppercase block mb-1">
                      CORE MANIFESTO
                    </span>
                    <blockquote className="font-heading font-semibold text-text-primary text-[12px] leading-snug italic uppercase">
                      "{values[activeIndex].manifesto}"
                    </blockquote>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Controls Panel */}
            <div className="flex items-center justify-between w-full mt-6 px-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-bg-border bg-white/80 hover:border-bg-border-strong hover:bg-bg-muted transition-all text-text-secondary cursor-pointer outline-none flex items-center justify-center shadow-xs"
                  aria-label="Previous Slide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-bg-border bg-white/80 hover:border-bg-border-strong hover:bg-bg-muted transition-all text-text-secondary cursor-pointer outline-none flex items-center justify-center shadow-xs"
                  aria-label="Next Slide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Progress dot matrix indicators */}
              <div className="flex items-center gap-2">
                {values.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx 
                        ? "w-5 bg-accent-blue" 
                        : "w-1.5 bg-bg-border hover:bg-bg-border-strong"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Web3 Interactive Holographic Core Engine */}
          <div className="col-span-7 flex items-center justify-center relative min-h-[580px] overflow-visible select-none outline-none">
            
            {/* 540x540 Orbital Node Deck Area */}
            <div className="relative w-[540px] h-[540px] flex items-center justify-center overflow-visible">
              
              {/* Concentric helper grids and Laser connecting line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 540">
                {/* Visual orbital tracks */}
                <circle cx="270" cy="270" r="210" fill="none" stroke="var(--color-bg-border)" strokeWidth="0.75" strokeDasharray="4 8" className="opacity-40" />
                <circle cx="270" cy="270" r="130" fill="none" stroke="var(--color-bg-border)" strokeWidth="0.5" strokeDasharray="2 6" className="opacity-25" />
                
                {/* Speeding electron particle on active connector track */}
                <m.circle
                  r="3.5"
                  fill={values[activeIndex].isGreen ? "var(--color-status-green)" : "var(--color-accent-blue)"}
                  animate={{
                    cx: [270, activeX],
                    cy: [270, activeY],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                  className="opacity-80"
                />

                {/* Ambient radar ping scan */}
                <m.circle
                  cx="270"
                  cy="270"
                  r="130"
                  fill="none"
                  stroke={values[activeIndex].isGreen ? "var(--color-status-green)" : "var(--color-accent-blue)"}
                  strokeWidth="0.75"
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{ scale: 1.62, opacity: [0, 0.35, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeOut" }}
                />
              </svg>

              {/* Center Concentric Spinning Rings Container */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex items-center justify-center z-10">
                
                {/* Concentric Ring 1: Outer Slow Technical Dash */}
                <m.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-bg-border-strong/70 rounded-full"
                />
                
                {/* Concentric Ring 2: Inner Fast Tech Ticks */}
                <m.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                  className="absolute inset-3.5 border border-dotted border-accent-blue/35 rounded-full"
                />

                {/* Concentric Ring 3: Concentrated Scanner Arc */}
                <m.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-7 border border-accent-blue/10 rounded-full"
                  style={{
                    borderTopColor: values[activeIndex].isGreen ? "var(--color-status-green)" : "var(--color-accent-blue)",
                    borderRightColor: "transparent",
                    borderBottomColor: "transparent",
                    borderLeftColor: "transparent",
                    borderWidth: "2px",
                  }}
                />

                {/* Center Core HUD Console */}
                <div className={`relative w-[114px] h-[114px] rounded-full bg-white border flex flex-col items-center justify-center transition-all duration-500 shadow-md ${
                  values[activeIndex].isGreen
                    ? "border-status-green/30 shadow-[0_0_35px_rgba(5,150,105,0.14)]"
                    : "border-accent-blue/30 shadow-[0_0_35px_rgba(28,95,209,0.14)]"
                }`}>
                  {/* Outer active circle frame glow */}
                  <div className={`absolute inset-0 rounded-full border border-dashed animate-spin ${
                    values[activeIndex].isGreen ? "border-status-green/10" : "border-accent-blue/10"
                  }`} style={{ animationDuration: "12s" }} />

                  {/* Core Telemetry Tag */}
                  <div className="absolute top-3.5 font-mono text-[7px] text-text-muted tracking-widest uppercase font-semibold">
                    SYS_ND_{values[activeIndex].number}
                  </div>
                  
                  {/* Dynamic Active Icon */}
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.82 }}
                      className={values[activeIndex].isGreen ? "text-status-green" : "text-accent-blue"}
                    >
                      {values[activeIndex].icon}
                    </m.div>
                  </AnimatePresence>

                  {/* Pulse Indicator */}
                  <div className="absolute bottom-3.5 flex items-center gap-1">
                    <span className={`w-1 h-1 rounded-full animate-ping ${
                      values[activeIndex].isGreen ? "bg-status-green" : "bg-accent-blue"
                    }`} />
                    <span className="font-mono text-[6px] text-text-secondary uppercase tracking-widest font-bold">LNK</span>
                  </div>
                </div>
              </div>

              {/* Orbital Glassmorphic Capsule Nodes */}
              {values.map((val, idx) => {
                const isActive = idx === activeIndex;
                const angle = (idx * 360 / 7) - 90;
                const rad = angle * Math.PI / 180;
                const x = 270 + Math.cos(rad) * R;
                const y = 270 + Math.sin(rad) * R;
                
                return (
                  <m.button
                    key={val.name}
                    onClick={() => handleSelect(idx)}
                    className={`absolute px-4 py-2 border rounded-full font-mono text-[10px] tracking-wider transition-all duration-300 cursor-pointer select-none outline-none flex items-center gap-2 ${
                      isActive
                        ? val.isGreen
                          ? "bg-status-green-bg border-status-green text-status-green shadow-[0_0_20px_rgba(5,150,105,0.15)] font-bold scale-105"
                          : "bg-accent-blue-light border-accent-blue text-accent-blue shadow-[0_0_20px_rgba(28,95,209,0.15)] font-bold scale-105"
                        : "bg-white/80 backdrop-blur-xs border-bg-border text-text-secondary hover:border-bg-border-strong hover:text-text-primary hover:shadow-xs"
                    }`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isActive ? 30 : 20,
                    }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? val.isGreen ? "bg-status-green animate-pulse" : "bg-accent-blue animate-pulse" : "bg-text-muted/50"
                    }`} />
                    <span>{val.number} // {val.name.toUpperCase()}</span>
                  </m.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== TABLET & MOBILE CONTROL SPEC SWITCHER DECK ==================== */}
        <div className="lg:hidden flex flex-col gap-4">
          
          {/* Scrollable Tabs Controller */}
          <div className="flex gap-2.5 pb-3 overflow-x-auto scrollbar-none snap-x snap-mandatory">
            {values.map((val, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={val.number}
                  onClick={() => handleSelect(idx)}
                  className={`flex-shrink-0 snap-start px-4.5 py-3 rounded-sm border font-mono text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? val.isGreen
                        ? "bg-[#ECFDF5] border-status-green text-status-green font-bold shadow-xs"
                        : "bg-accent-blue-light border-accent-blue text-accent-blue font-bold shadow-xs"
                      : "bg-white border-bg-border text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {val.number} {val.name.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Active specs Console Card */}
          <div className="relative border border-bg-border/60 bg-white/95 backdrop-blur-md rounded-md p-6 overflow-hidden mt-1 shadow-xs">
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-blue/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-blue/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-blue/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-blue/30" />

            {/* Card Header Status */}
            <div className="flex items-center justify-between mb-5 border-b border-bg-border/30 pb-4">
              <div className="flex items-center gap-1.5 font-mono text-[8px] text-text-muted tracking-widest uppercase">
                <span className={`h-1.5 w-1.5 rounded-full ${values[activeIndex].isGreen ? "bg-status-green animate-pulse" : "bg-accent-blue animate-pulse"}`} />
                <span>NODE_{values[activeIndex].number}: ACTIVE</span>
              </div>
              <div className={values[activeIndex].isGreen ? "text-status-green" : "text-accent-blue"}>
                {values[activeIndex].icon}
              </div>
            </div>

            {/* Core Titles */}
            <h3 className={`font-heading font-bold text-2xl uppercase tracking-wide leading-none mb-1.5 ${
              values[activeIndex].isGreen ? "text-status-green" : "text-text-primary"
            }`}>
              {values[activeIndex].name}
            </h3>
            <p className="font-mono text-[9px] font-semibold text-text-secondary uppercase tracking-[0.12em] mb-4">
              {values[activeIndex].tagline}
            </p>

            {/* Description */}
            <p className="font-sans text-text-secondary text-sm leading-relaxed mb-6">
              {values[activeIndex].description}
            </p>

            {/* Manifesto Block */}
            {values[activeIndex].manifesto && (
              <div className="mb-6 border-l-2 border-accent-blue pl-3 py-2 bg-accent-blue-light/35 rounded-sm">
                <blockquote className="font-heading font-semibold text-text-primary text-[11px] leading-snug italic uppercase">
                  "{values[activeIndex].manifesto}"
                </blockquote>
              </div>
            )}

            {/* Diagnostics Stats */}
            <div className="border-t border-bg-border/30 pt-5 grid grid-cols-2 gap-3">
              {values[activeIndex].telemetry.map((t, idx) => (
                <div key={idx} className="bg-bg-muted/40 border border-bg-border/30 p-3 rounded-sm flex flex-col justify-between min-h-[58px]">
                  <span className="font-mono text-[7.5px] text-text-muted uppercase tracking-wider block">// {t.label}</span>
                  {t.type === "progress" ? (
                    <div className="mt-2">
                      <div className="w-full bg-bg-border/30 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${values[activeIndex].isGreen ? "bg-status-green" : "bg-accent-blue"}`}
                          style={{ width: `${t.progressValue}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="font-heading font-bold text-[10px] text-text-primary mt-1.5 uppercase block">{t.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
