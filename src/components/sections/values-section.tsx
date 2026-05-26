"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, cellFadeUp, VIEWPORT, VIEWPORT_CLOSE } from "@/lib/motion";

interface CoreValue {
  number: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  gridSpan: string;
  isHero?: boolean;
  isGreen?: boolean;
  isFull?: boolean;
}

const values: CoreValue[] = [
  {
    number: "01",
    name: "Guru Grace",
    tagline: "Wisdom-led leadership",
    description: "We are guided by wisdom, humility, and reverence for knowledge in every decision we make.",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-8",
    isHero: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.5 12" /><path d="M12 2v10" />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Gratitude",
    tagline: "Humility at the core",
    description: "We appreciate every opportunity, every stakeholder, and every challenge that has shaped us.",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    number: "03",
    name: "Genius Development",
    tagline: "Nurturing innovation",
    description: "We invest in talent, foster creative thinking, and build systems that bring out engineering excellence.",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    number: "04",
    name: "Green Thinking",
    tagline: "Sustainability in every solution",
    description: "Every product we build is designed to reduce energy waste, support renewables, and protect the environment.",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-8",
    isGreen: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <path d="M12 22V12M12 12C12 7 17 3 22 3c0 5-4 9-10 9zM12 12C12 7 7 3 2 3c0 5 4 9 10 9z" />
      </svg>
    ),
  },
  {
    number: "05",
    name: "Global Vision",
    tagline: "Building for the world from India",
    description: "Our ambitions are not bounded by geography. We build indigenous solutions with global standards.",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: "06",
    name: "Grounded Leadership",
    tagline: "Ethics and integrity at the helm",
    description: "Leadership at Cybokrafts means leading with authenticity, accountability, and unwavering integrity.",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: "07",
    name: "Growth For All",
    tagline: "Shared and inclusive prosperity",
    description: "We create value not just for shareholders, but for communities, partners, and India at large.",
    gridSpan: "col-span-12",
    isFull: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  const [expandedNumber, setExpandedNumber] = useState<string | null>("01");

  return (
    <section
      id="values"
      className="py-28 bg-bg-surface border-t border-bg-border"
      aria-labelledby="values-heading"
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

        {/* ==================== DESKTOP BENTO GRID (LAPTOP VIEW - UNCHANGED) ==================== */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_CLOSE}
          className="hidden lg:grid grid-cols-12 gap-[1px] bg-bg-border border border-bg-border overflow-hidden rounded-[3px]"
        >
          {values.map((value) => (
            <m.div
              key={value.name}
              variants={cellFadeUp}
              whileHover={{ y: -2 }}
              className={`relative bg-bg-surface p-8 border-t-2 border-t-transparent ${
                value.isGreen
                  ? "hover:border-t-status-green hover:bg-status-green-bg/40"
                  : "hover:border-t-accent-blue hover:bg-accent-blue-light/50"
              } transition-all duration-200 ease-out cursor-default overflow-hidden flex flex-col justify-between ${value.gridSpan}`}
            >
              {/* Ghost Number Watermark */}
              <div className="absolute bottom-[-10px] right-2 font-heading font-bold text-[88px] text-accent-blue/5 select-none pointer-events-none leading-none">
                {value.number}
              </div>

              {/* Standard card contents when not growth-for-all */}
              {!value.isFull ? (
                <div className="relative z-10 w-full">
                  <div className="lg:flex lg:flex-row lg:justify-between lg:gap-8">
                    {/* Main content column */}
                    <div className="flex-1">
                      {/* Top Row */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={value.isGreen ? "text-status-green" : "text-accent-blue"}>
                          {value.icon}
                        </div>
                        <span className="font-mono text-xs font-semibold text-text-muted">{value.number}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`font-heading font-bold text-xl uppercase tracking-wide mb-1 ${
                        value.isGreen ? "text-status-green" : "text-accent-blue"
                      }`}>
                        {value.name}
                      </h3>

                      {/* Tagline */}
                      <p className="font-mono text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-3">
                        {value.tagline}
                      </p>

                      {/* Description */}
                      <p className="font-sans text-text-secondary text-[14px] leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                    {/* Guru Grace Hero manifesto sidebar */}
                    {value.isHero && (
                      <div className="hidden lg:flex flex-col justify-center border-l border-bg-border/60 pl-8 max-w-[260px] flex-shrink-0">
                        <span className="font-mono text-[9px] text-accent-blue font-bold tracking-widest uppercase mb-2">
                          PRATIPADA
                        </span>
                        <blockquote className="font-heading font-semibold text-text-primary text-[14px] leading-normal italic uppercase">
                          "Knowledge is the ultimate power grid. We lead by serving."
                        </blockquote>
                        <span className="font-sans text-[10px] text-text-muted mt-2">
                          — Cybokrafts Manifesto
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Green Thinking telemetry blocks */}
                  {value.isGreen && (
                    <div className="mt-6 pt-5 border-t border-bg-border/60 grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-mono text-[9px] text-status-green font-bold uppercase tracking-wider">
                          TARGET
                        </div>
                        <div className="font-heading font-bold text-text-primary text-base leading-none mt-1">
                          NET ZERO
                        </div>
                        <div className="font-sans text-[10px] text-text-secondary mt-0.5">
                          Optimized energy loss
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-status-green font-bold uppercase tracking-wider">
                          COMPLIANCE
                        </div>
                        <div className="font-heading font-bold text-text-primary text-base leading-none mt-1">
                          100% CLEAN
                        </div>
                        <div className="font-sans text-[10px] text-text-secondary mt-0.5">
                          Renewables integration
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Growth for All full-row dashboard card */
                <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: standard detail */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top Row */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="text-accent-blue">{value.icon}</div>
                        <span className="font-mono text-xs font-semibold text-text-muted">{value.number}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-xl text-accent-blue uppercase tracking-wide mb-1">
                        {value.name}
                      </h3>

                      {/* Tagline */}
                      <p className="font-mono text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-3">
                        {value.tagline}
                      </p>

                      {/* Description */}
                      <p className="font-sans text-text-secondary text-[14px] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Stakeholder prosperity schema checklist */}
                  <div className="lg:col-span-5 border-t border-bg-border/60 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:border-bg-border/60 lg:pl-8 flex flex-col justify-center">
                    <div className="font-mono text-[9px] text-accent-blue font-bold uppercase tracking-widest mb-4">
                      INCLUSIVE PROSPERITY SCHEMA
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-blue-light text-accent-blue flex items-center justify-center font-mono text-[10px] font-bold">
                          1
                        </span>
                        <div>
                          <h5 className="font-heading font-bold text-text-primary text-xs uppercase tracking-wider">
                            Stakeholder Alignment
                          </h5>
                          <p className="font-sans text-[11px] text-text-secondary">
                            Creating shared value loops across clients, partners & environments.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-blue-light text-accent-blue flex items-center justify-center font-mono text-[10px] font-bold">
                          2
                        </span>
                        <div>
                          <h5 className="font-heading font-bold text-text-primary text-xs uppercase tracking-wider">
                            Indigenous Engineering
                          </h5>
                          <p className="font-sans text-[11px] text-text-secondary">
                            Developing world-class tech solutions engineered locally in India.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-blue-light text-accent-blue flex items-center justify-center font-mono text-[10px] font-bold">
                          3
                        </span>
                        <div>
                          <h5 className="font-heading font-bold text-text-primary text-xs uppercase tracking-wider">
                            Future Domain Experts
                          </h5>
                          <p className="font-sans text-[11px] text-text-secondary">
                            Incubating next-gen power intelligence & analytical minds.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </m.div>
          ))}
        </m.div>

        {/* ==================== CREATIVE RESPONSIVE GRID (MOBILE & TABLET VIEW) ==================== */}
        <div className="lg:hidden flex flex-col gap-3">
          {values.map((value) => {
            const isExpanded = expandedNumber === value.number;
            return (
              <div
                key={value.name}
                className="bg-bg-surface border border-bg-border rounded-[3px] overflow-hidden transition-all duration-200"
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => setExpandedNumber(isExpanded ? null : value.number)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-semibold text-text-muted">{value.number}</span>
                    <div className={value.isGreen ? "text-status-green" : "text-accent-blue"}>
                      {value.icon}
                    </div>
                    <h3 className={`font-heading font-bold text-base uppercase tracking-wider ${
                      value.isGreen ? "text-status-green" : "text-[#1C5FD1]"
                    }`}>
                      {value.name}
                    </h3>
                  </div>

                  {/* Expand Caret Indicator */}
                  <div
                    className="text-text-muted transition-transform duration-200"
                    style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Accordion Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" as const }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 border-t border-bg-border/60 pt-4 relative">
                        {/* Ghost Number watermark for absolute tech vibe */}
                        <div className="absolute bottom-1 right-2 font-heading font-bold text-[64px] text-accent-blue/5 select-none pointer-events-none leading-none">
                          {value.number}
                        </div>

                        {/* Tagline */}
                        <p className="font-mono text-[9px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                          {value.tagline}
                        </p>
                        
                        {/* Description */}
                        <p className="font-sans text-text-secondary text-xs leading-relaxed mb-4">
                          {value.description}
                        </p>

                        {/* Custom Hero / Green / Full structures */}
                        {value.isHero && (
                          <div className="mt-4 border-l-2 border-[#1C5FD1] pl-4 py-1.5 bg-[#EBF1FC] max-w-sm rounded-[1px]">
                            <span className="font-mono text-[8px] text-[#1C5FD1] font-bold tracking-widest uppercase block mb-1">
                              // MANIFESTO BLOCK
                            </span>
                            <blockquote className="font-heading font-semibold text-[#0C1929] text-[12px] leading-snug italic uppercase">
                              "Knowledge is the ultimate power grid. We lead by serving."
                            </blockquote>
                          </div>
                        )}

                        {value.isGreen && (
                          <div className="mt-4 pt-4 border-t border-bg-border/60 grid grid-cols-2 gap-3">
                            <div className="bg-[#ECFDF5]/60 p-3 rounded-[2px] border border-[#ECFDF5]">
                              <div className="font-mono text-[8px] text-status-green font-bold uppercase tracking-wider">// TARGET</div>
                              <div className="font-heading font-bold text-text-primary text-sm mt-0.5">NET ZERO</div>
                            </div>
                            <div className="bg-[#ECFDF5]/60 p-3 rounded-[2px] border border-[#ECFDF5]">
                              <div className="font-mono text-[8px] text-status-green font-bold uppercase tracking-wider">// COMPLIANCE</div>
                              <div className="font-heading font-bold text-text-primary text-sm mt-0.5">100% CLEAN</div>
                            </div>
                          </div>
                        )}

                        {value.isFull && (
                          <div className="mt-4 pt-4 border-t border-bg-border/60">
                            <div className="font-mono text-[8px] text-accent-blue font-bold uppercase tracking-widest mb-3">
                              // INCLUSIVE PROSPERITY SCHEMA
                            </div>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2.5">
                                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-accent-blue-light text-accent-blue flex items-center justify-center font-mono text-[9px] font-bold">1</span>
                                <div>
                                  <h5 className="font-heading font-bold text-text-primary text-[11px] uppercase tracking-wider">Stakeholder Alignment</h5>
                                  <p className="font-sans text-[10px] text-text-secondary">Shared value loops across clients & environment.</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-accent-blue-light text-accent-blue flex items-center justify-center font-mono text-[9px] font-bold">2</span>
                                <div>
                                  <h5 className="font-heading font-bold text-text-primary text-[11px] uppercase tracking-wider">Indigenous Engineering</h5>
                                  <p className="font-sans text-[10px] text-text-secondary">Tech solutions engineered locally in India.</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-accent-blue-light text-accent-blue flex items-center justify-center font-mono text-[9px] font-bold">3</span>
                                <div>
                                  <h5 className="font-heading font-bold text-text-primary text-[11px] uppercase tracking-wider">Future Experts</h5>
                                  <p className="font-sans text-[10px] text-text-secondary">Incubating next-gen grid analytics intelligence.</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
