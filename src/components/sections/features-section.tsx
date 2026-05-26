"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, cellFadeUp, scaleIn, VIEWPORT, VIEWPORT_CLOSE } from "@/lib/motion";

interface Feature {
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  diagram: React.ReactNode;
  metrics: string[];
  gridSpan: string;
  borderHoverClass: string;
}

const features: Feature[] = [
  {
    num: "01",
    title: "Real-Time Monitoring",
    tagline: "GRID INTEGRITY & INGRESS TELEMETRY",
    description:
      "Continuous telemetry sampling from connected assets — updated at 10-second intervals. Field operators receive direct, unembellished transmission metrics for instant situational grid awareness.",
    gridSpan: "col-span-12 lg:col-span-6",
    borderHoverClass: "hover:border-t-accent-blue hover:bg-accent-blue-light/30",
    metrics: ["SAMPLE RATE: 10s", "FREQ DEVIATION: ±0.02Hz", "DELAY INDEX: < 80ms", "BUS PROTOCOL: MODBUS"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    diagram: (
      <div className="relative w-full aspect-[2/1] bg-white border border-[#D1D9E4] rounded-[3px] p-4 overflow-hidden flex flex-col justify-between select-none">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] z-10">
          <span>// INGRESS WAVEFORM</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#1C5FD1] animate-ping" />
            SWEEP: ACTIVE
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            <line x1="10" y1="30" x2="310" y2="30" stroke="#A8B5C8" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <m.path
              d="M 10,90 Q 60,10 110,100 T 210,20 T 310,70"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="2.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" as const }}
            />
            <circle cx="310" cy="70" r="3.5" fill="#1C5FD1" className="animate-pulse" />
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>FREQ: 50.02 Hz</span>
          <span>SPEED: &lt; 80ms</span>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Predictive Intelligence",
    tagline: "ANOMALY DETECTION & THERMAL BASING",
    description:
      "Algorithmic anomaly detection flags current imbalances and thermal deviations from established historical baselines, alerting teams to preventative actions before physical trip incidents occur.",
    gridSpan: "col-span-12 lg:col-span-6",
    borderHoverClass: "hover:border-t-status-green hover:bg-[#ECFDF5]/40",
    metrics: ["ACCURACY RATE: 94.2%", "FORECAST INDEX: 72 hrs", "MODEL VELOCITY: 480 tps", "SPIKE TOLERANCE: ±5%"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    diagram: (
      <div className="relative w-full aspect-[2/1] bg-white border border-[#D1D9E4] rounded-[3px] p-4 overflow-hidden flex flex-col justify-between select-none">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7px] text-status-green z-10">
          <span>// TRANSIENT SPIKE ALERT</span>
          <span className="flex items-center gap-1 font-bold">
            <span className="w-1 h-1 rounded-full bg-status-green animate-ping" />
            SENSING: HOT
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            <line x1="10" y1="80" x2="310" y2="80" stroke="#DC2626" strokeWidth="1.25" strokeDasharray="3,3" opacity="0.6" />
            <m.path
              d="M 10,100 H 110 C 130,100 145,20 160,20 C 175,20 190,100 310,100"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" as const }}
            />
            <circle cx="160" cy="20" r="3.5" fill="#DC2626" />
            <circle cx="160" cy="20" r="7" fill="none" stroke="#DC2626" strokeWidth="1" className="animate-ping" />
            <text x="175" y="24" fill="#DC2626" className="font-mono text-[7px] font-bold">PREVENTATIVE_TRIP_OK</text>
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>SENSITIVITY: 94.2%</span>
          <span>RISK INDEX: LOW</span>
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Indigenous Platform",
    tagline: "SOVEREIGN BLUEPRINT & DATA RESIDENCY",
    description:
      "Designed, engineered, and assembled locally in Raipur, Chhattisgarh. Data pipelines reside securely within domestic Indian cloud boundaries, complying with sovereign grid safety benchmarks.",
    gridSpan: "col-span-12 lg:col-span-5",
    borderHoverClass: "hover:border-t-accent-blue hover:bg-accent-blue-light/30",
    metrics: ["ASSEMBLY: Raipur, IN", "CLOUD BOUNDS: Domestic", "COMPLIANCE: DPIIT Cert", "OWNERS: 100% India"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    diagram: (
      <div className="relative w-full aspect-[2/1] bg-white border border-[#D1D9E4] rounded-[3px] p-4 overflow-hidden flex flex-col justify-between select-none">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7px] text-[#1C5FD1] z-10">
          <span>// SOVEREIGN SECURITY RADAR</span>
          <span className="font-bold">CORE: SOVEREIGN</span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            <circle cx="160" cy="60" r="45" fill="none" stroke="#D1D9E4" strokeWidth="1" />
            <circle cx="160" cy="60" r="25" fill="none" stroke="#D1D9E4" strokeWidth="1" strokeDasharray="3,3" />
            
            <m.path
              d="M 160,40 L 175,50 L 175,70 L 160,80 L 145,70 L 145,50 Z"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="1.75"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            />
            <m.line
              x1="160"
              y1="60"
              x2="205"
              y2="60"
              stroke="#1C5FD1"
              strokeWidth="1.25"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              style={{ transformOrigin: "160px 60px" }}
            />
            <circle cx="145" cy="50" r="2.5" fill="#1C5FD1" />
            <circle cx="175" cy="70" r="2.5" fill="#1C5FD1" />
            <circle cx="160" cy="40" r="2.5" fill="#1C5FD1" />
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>IP RESIDENCY: Chhattisgarh</span>
          <span>BENCHMARK: PASS</span>
        </div>
      </div>
    ),
  },
  {
    num: "04",
    title: "Retrofit-Ready Hardware",
    tagline: "CYBO-VAJRA EXTERNAL CLAMP RETROFIT",
    description:
      "CYBO-VAJRA edge units mount externally onto legacy transformers using split-core CT sensors and oil indicators. Retrofitted in under 45 minutes without grid shutdowns or asset replacements.",
    gridSpan: "col-span-12 lg:col-span-7",
    borderHoverClass: "hover:border-t-accent-blue hover:bg-accent-blue-light/30",
    metrics: ["MOUNT TIME: < 45 min", "GRID STATUS: Hot Line", "SENSOR CLAMP: Split-core", "INPUT RATING: 230V AC"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" />
      </svg>
    ),
    diagram: (
      <div className="relative w-full aspect-[2/1] bg-white border border-[#D1D9E4] rounded-[3px] p-4 overflow-hidden flex flex-col justify-between select-none">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7px] text-[#1C5FD1] z-10">
          <span>// CYBO-VAJRA CLAMP LINK</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 bg-[#059669] rounded-full animate-pulse" />
            CLAMP: CONNECTED
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            {/* Legacy transformer */}
            <rect x="30" y="35" width="55" height="55" fill="none" stroke="#A8B5C8" strokeWidth="1.25" rx="3" />
            <line x1="58" y1="35" x2="58" y2="20" stroke="#A8B5C8" strokeWidth="1.25" />
            <circle cx="58" cy="16" r="3" fill="none" stroke="#A8B5C8" strokeWidth="1.25" />
            <text x="35" y="65" fill="#7A93AD" className="font-mono text-[6px] font-bold">LEGACY_TX</text>

            {/* Clamp linkage */}
            <m.path
              d="M 85,62 H 210"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="1.25"
              strokeDasharray="4,4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />

            {/* CYBO-VAJRA Node */}
            <rect x="210" y="42" width="60" height="40" fill="none" stroke="#1C5FD1" strokeWidth="1.75" rx="2" />
            <circle cx="240" cy="62" r="3" fill="#059669" className="animate-pulse" />
            <text x="215" y="55" fill="#1C5FD1" className="font-mono text-[6px] font-bold">CYBO-VAJRA</text>
            <text x="215" y="74" fill="#059669" className="font-mono text-[5px] font-bold">RETROFIT: OK</text>
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>INSTALL TIME: &lt; 45m</span>
          <span>ASSET STATUS: LIVE</span>
        </div>
      </div>
    ),
  },
];

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeFeature = features[activeIndex];

  return (
    <section
      id="platform"
      className="py-28 bg-[#EEF1F6] border-t border-[#D1D9E4]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-2xl mb-16"
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
            WHY CYBOKRAFTS
          </m.p>
          <m.h2
            id="features-heading"
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] text-text-primary uppercase tracking-tight mb-4"
          >
            Engineered for the Demands of Critical Infrastructure
          </m.h2>
          <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed">
            Every capability we offer has been built around the realities of heavy industrial environments, not adapted from consumer software.
          </m.p>
        </m.div>

        {/* ==================== DESKTOP CRITICAL INFRASTRUCTURE BENTO GRID (LAPTOP VIEW) ==================== */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_CLOSE}
          className="hidden lg:grid grid-cols-12 gap-8 items-stretch"
        >
          {features.map((feature) => (
            <m.div
              key={feature.title}
              variants={cellFadeUp}
              whileHover={{ y: -2 }}
              className={`bg-white border border-[#D1D9E4] p-8 rounded-[3px] flex flex-col justify-between min-h-[480px] border-t-2 border-t-transparent ${feature.borderHoverClass} transition-all duration-200 cursor-default shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${feature.gridSpan}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-text-muted">{feature.num}</span>
                  <div className="text-accent-blue">{feature.icon}</div>
                </div>

                {/* Subsystem tags */}
                <div className="font-mono text-[9px] font-bold text-[#1C5FD1] tracking-wider uppercase mb-1">
                  // {feature.tagline}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-text-primary uppercase tracking-wide mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-text-secondary text-[13px] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Centered Graphic Telemetry Diagram */}
              <div className="my-5 w-full">
                {feature.diagram}
              </div>

              {/* Bottom metrics tag blocks & reliability light */}
              <div className="border-t border-[#D1D9E4]/60 pt-5 mt-auto">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {feature.metrics.map((metric, i) => (
                    <div key={i} className="bg-[#EEF1F6]/50 border border-[#D1D9E4]/50 p-2.5 rounded-[2px] flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                      <span className="text-[#1C5FD1] font-bold font-mono text-[9px]">›</span>
                      <span className="font-mono text-[8.5px] text-text-secondary uppercase tracking-wider">{metric}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between font-mono text-[8px] text-[#7A93AD] pt-1">
                  <span>STABILITY STATUS: CERTIFIED</span>
                  <span className="text-[#1C5FD1] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                    TELEMETRY ONLINE
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* ==================== CREATIVE RESPONSIVE GRID (MOBILE & TABLET VIEW) ==================== */}
        <div className="lg:hidden flex flex-col">
          {/* Mobile Grid Switcher Tabs (01 - 04) */}
          <div className="grid grid-cols-4 gap-2 mb-6 bg-white/70 p-1 border border-[#D1D9E4] rounded-[3px]">
            {features.map((feature, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={feature.num}
                  onClick={() => setActiveIndex(idx)}
                  className={`py-3 px-1.5 font-mono text-xs font-bold transition-all duration-200 rounded-[2px] cursor-pointer flex flex-col items-center justify-center gap-1 border-t-2 ${
                    isActive
                      ? "bg-white text-[#0C1929] border-t-[#1C5FD1] border-b border-x border-[#D1D9E4] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                      : "border-t-transparent text-[#7A93AD] hover:text-[#0C1929] hover:bg-white/40"
                  }`}
                >
                  <span>{feature.num}</span>
                  <span className="text-[7.5px] uppercase tracking-widest hidden sm:inline">{feature.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Expanded Mobile Terminal Card */}
          <div className="min-h-[440px] relative">
            <AnimatePresence mode="wait">
              <m.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className={`bg-white border border-[#D1D9E4] p-6 rounded-[3px] flex flex-col justify-between min-h-[440px] border-t-2 border-t-transparent ${activeFeature.borderHoverClass}`}
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold text-[#1C5FD1] tracking-wider uppercase">
                      // {activeFeature.tagline}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-text-muted">
                      [{activeFeature.num}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-text-primary uppercase tracking-wide leading-none mb-3">
                    {activeFeature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-text-secondary text-[12.5px] leading-relaxed mb-6">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Animated diagnostic SVG (Centered naturally in mobile card) */}
                <div className="my-5 w-full">
                  {activeFeature.diagram}
                </div>

                {/* Metrics */}
                <div className="border-t border-[#D1D9E4]/60 pt-5 mt-auto">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {activeFeature.metrics.map((metric, i) => (
                      <div key={i} className="bg-[#EEF1F6]/50 border border-[#D1D9E4]/50 p-2.5 rounded-[2px] flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="text-[#1C5FD1] font-bold font-mono text-[9px]">›</span>
                        <span className="font-mono text-[8.5px] text-text-secondary uppercase tracking-wider">{metric}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between font-mono text-[8px] text-[#7A93AD] pt-1">
                    <span>STABILITY STATUS: CERTIFIED</span>
                    <span className="text-[#1C5FD1] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                      TELEMETRY ONLINE
                    </span>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
