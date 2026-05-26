"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp, slideRight, VIEWPORT } from "@/lib/motion";

/** Each word of the headline blurs in with stagger */
const wordBlur = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const HEADLINE_LINES = [
  ["India's", "Intelligent"],
  ["Energy", "Infrastructure"],
  ["Platform"],
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-bg-base"
      aria-labelledby="hero-heading"
    >
      {/* SVG grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="var(--color-grid-line)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Radial top-right tint */}
      <div
        className="absolute top-0 right-0 w-[650px] h-[500px] opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, var(--color-accent-blue), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Horizontal Divider below Navbar */}
      <div className="absolute top-[80px] left-0 right-0 h-[1px] bg-bg-border" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[58fr_42fr] gap-16 items-center w-full">

        {/* LEFT: Copy & CTAs */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <m.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-blue-light border border-[#BFCFEF] text-accent-blue rounded-[3px] font-mono text-[11px] font-semibold uppercase tracking-wider mb-6">
              <span className="text-xs">⬡</span>
              DPIIT RECOGNIZED · IIT INDORE INCUBATED
            </div>
          </m.div>

          {/* Headline — word-by-word stagger */}
          <h1
            id="hero-heading"
            className="font-heading font-bold text-text-primary tracking-tight leading-[0.92] mb-6"
            style={{ fontSize: "clamp(52px, 6vw, 84px)" }}
          >
            <m.span
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col"
              aria-label="India's Intelligent Energy Infrastructure Platform"
            >
              {HEADLINE_LINES.map((line, li) => (
                <span key={li} className="flex flex-wrap gap-x-[0.25em]">
                  {line.map((word, wi) => (
                    <m.span
                      key={wi}
                      variants={wordBlur}
                      className={
                        (li === 0 && wi === 1) || (li === 1 && wi === 0)
                          ? "text-accent-blue"
                          : ""
                      }
                    >
                      {word}
                    </m.span>
                  ))}
                </span>
              ))}
            </m.span>
          </h1>

          {/* Description */}
          <m.p
            variants={fadeUp}
            className="font-sans text-[17px] font-normal text-text-secondary leading-relaxed max-w-[440px] mb-10"
          >
                        AI-Powered Monitoring Systems for Modern Energy Networks

          </m.p>

          {/* CTA row */}
          <m.div variants={fadeUp} className="flex flex-wrap items-center gap-[12px] mb-12">
            <a
              href="#solutions"
              className="px-7 py-3.5 bg-accent-blue text-white text-sm font-sans font-semibold rounded-[3px] hover:bg-accent-blue-hover transition-colors shadow-none tracking-[0.04em]"
            >
              Explore Platform
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 bg-transparent border-[1.5px] border-accent-blue text-accent-blue text-sm font-sans font-semibold rounded-[3px] hover:bg-accent-blue-light transition-colors shadow-none tracking-[0.04em]"
            >
              Request Demo
            </a>
          </m.div>

          {/* Trust strip */}
          <m.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 pt-8 border-t border-bg-border"
          >
            <span className="font-mono text-[11px] text-text-muted">Make in India</span>
            <div className="w-[1px] h-3 bg-bg-border" aria-hidden="true" />
            <span className="font-mono text-[11px] text-text-muted">Patent No. 202521117118</span>
            <div className="w-[1px] h-3 bg-bg-border" aria-hidden="true" />
            <span className="font-mono text-[11px] text-text-muted">MSME Certified</span>
          </m.div>
        </m.div>

        {/* RIGHT: CYBO-VAJRA Schematic Panel */}
        <m.div
          variants={slideRight}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center lg:justify-end"
        >
          <div className="bg-bg-surface border-[1.5px] border-bg-border rounded-[3px] p-6 w-full max-w-[460px] aspect-square flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-bg-border pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-status-green"></span>
                </span>
                <span className="font-mono text-xs font-semibold text-text-secondary">● LIVE</span>
              </div>
              <span className="font-mono text-xs font-semibold text-text-secondary">CYBO-VAJRA NODE v2.1</span>
            </div>

            {/* Central SVG */}
            <div className="flex-grow flex items-center justify-center py-4 bg-white border border-bg-border rounded-[2px]">
              <svg viewBox="0 0 400 400" className="w-full max-w-[280px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Hexagon */}
                <path d="M320 200L260 304H140L80 200L140 96H260L320 200Z" stroke="var(--color-bg-border-strong)" strokeWidth="1" />

                {/* Static circuit lines */}
                <line x1="200" y1="200" x2="260" y2="304" stroke="var(--color-bg-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="200" y1="200" x2="140" y2="304" stroke="var(--color-bg-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="200" y1="200" x2="80" y2="200" stroke="var(--color-bg-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="200" y1="200" x2="260" y2="96" stroke="var(--color-bg-border-strong)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Active animated paths */}
                <line x1="200" y1="200" x2="320" y2="200" stroke="var(--color-accent-blue)" strokeWidth="1.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="200" y1="200" x2="140" y2="96" stroke="var(--color-accent-blue)" strokeWidth="1.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" values="0;40" dur="2s" repeatCount="indefinite" />
                </line>

                {/* Node circles */}
                <circle cx="320" cy="200" r="8" fill="var(--color-bg-muted)" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
                <circle cx="260" cy="304" r="8" fill="var(--color-bg-muted)" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
                <circle cx="140" cy="304" r="8" fill="var(--color-bg-muted)" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
                <circle cx="80" cy="200" r="8" fill="var(--color-bg-muted)" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
                <circle cx="140" cy="96" r="8" fill="var(--color-bg-muted)" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
                <circle cx="260" cy="96" r="8" fill="var(--color-bg-muted)" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />

                {/* Central Node */}
                <circle cx="200" cy="200" r="20" fill="var(--color-accent-blue)" />
                <circle cx="200" cy="200" r="7" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="200" cy="200" r="2" fill="white" />
              </svg>
            </div>

            {/* Bottom Telemetry */}
            <div className="flex items-center justify-between border-t border-bg-border pt-3 mt-4">
              <span className="font-mono text-[11px] text-text-muted">TELEMETRY ACTIVE</span>
              <span className="font-mono text-[11px] text-text-muted animate-pulse">█</span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}