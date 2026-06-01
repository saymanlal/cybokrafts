"use client";

import { m, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, slideRight, VIEWPORT } from "@/lib/motion";
import { useState, useEffect } from "react";

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
  ["AI-Powered", "Energy"],
  ["Infrastructure", "Monitoring"],
];

const SECTORS = [
  {
    id: "aipower",
    label: "AIPOWEROS PLATFORM",
    title: "Grid Core Analytics",
    desc: "Real-time electrical grid telemetry analytics and predictive asset failure prevention.",
    badge: "GRID CORE",
    accentColor: "#1C5FD1",
    indicatorBg: "bg-accent-blue/15 border-accent-blue/30 text-accent-blue",
    dotActiveColor: "bg-accent-blue",
    svg: (
      <svg viewBox="0 0 400 400" className="w-full max-w-[240px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    )
  },
  {
    id: "solar",
    label: "SOLAR INTEL",
    title: "Solar Yield Optimization",
    desc: "High-frequency solar yield tracking, photovoltaic module health checks, and inverter telemetry.",
    badge: "SOLAR PV",
    accentColor: "#D97706",
    indicatorBg: "bg-accent-amber-bg border-accent-amber/30 text-accent-amber",
    dotActiveColor: "bg-accent-amber",
    svg: (
      <svg viewBox="0 0 400 400" className="w-full max-w-[240px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized Solar Panel Array grid */}
        <rect x="90" y="140" width="220" height="120" rx="4" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" fill="var(--color-bg-muted)" />
        <line x1="90" y1="200" x2="310" y2="200" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
        <line x1="145" y1="140" x2="145" y2="260" stroke="var(--color-bg-border-strong)" strokeWidth="1" />
        <line x1="200" y1="140" x2="200" y2="260" stroke="var(--color-bg-border-strong)" strokeWidth="1.5" />
        <line x1="255" y1="140" x2="255" y2="260" stroke="var(--color-bg-border-strong)" strokeWidth="1" />

        {/* Sun rays glowing/pulsing */}
        <circle cx="200" cy="70" r="20" fill="var(--color-accent-amber)" />
        <path d="M200 15 L200 40" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" />
        <path d="M200 100 L200 120" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        <path d="M145 35 L160 52" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" />
        <path d="M255 35 L240 52" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" />
        <path d="M130 70 L150 70" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" />
        <path d="M270 70 L250 70" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" />

        {/* Animated rays flowing onto panels */}
        <path d="M 200 90 L 200 140" stroke="var(--color-accent-amber)" strokeWidth="2" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" values="30;0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M 170 85 L 140 140" stroke="var(--color-accent-amber)" strokeWidth="1.5" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" values="30;0" dur="1.8s" repeatCount="indefinite" />
        </path>
        <path d="M 230 85 L 260 140" stroke="var(--color-accent-amber)" strokeWidth="1.5" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" values="30;0" dur="1.8s" repeatCount="indefinite" />
        </path>

        {/* Dynamic Telemetry Data Bars */}
        <rect x="110" y="280" width="40" height="12" rx="2" fill="var(--color-accent-amber)" opacity="0.8" />
        <rect x="160" y="280" width="80" height="12" rx="2" fill="var(--color-bg-border)" />
        <rect x="160" y="280" width="60" height="12" rx="2" fill="var(--color-accent-amber)" />
        <rect x="250" y="280" width="40" height="12" rx="2" fill="var(--color-accent-amber)" opacity="0.8" />
      </svg>
    )
  },
  {
    id: "ev",
    label: "EV INFRASTRUCTURE",
    title: "Station Load Balancing",
    desc: "Active EV charger load balancing, charger telemetry, and substation grid load safety monitoring.",
    badge: "EV CHARGING",
    accentColor: "#059669",
    indicatorBg: "bg-status-green-bg border-status-green/30 text-status-green",
    dotActiveColor: "bg-status-green",
    svg: (
      <svg viewBox="0 0 400 400" className="w-full max-w-[240px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Battery charging symbol frame */}
        <rect x="140" y="100" width="120" height="200" rx="10" stroke="var(--color-bg-border-strong)" strokeWidth="2.5" />
        <rect x="180" y="80" width="40" height="20" rx="3" fill="var(--color-bg-border-strong)" />

        {/* Animated charging wave lines */}
        <path d="M160 270 C180 260, 180 280, 200 270 C220 260, 220 280, 240 270" stroke="var(--color-status-green)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="d" 
            values="M160 270 C180 260, 180 280, 200 270 C220 260, 220 280, 240 270;
                    M160 270 C180 280, 180 260, 200 270 C220 280, 220 260, 240 270;
                    M160 270 C180 260, 180 280, 200 270 C220 260, 220 280, 240 270" 
            dur="2s" repeatCount="indefinite" />
        </path>
        
        {/* Battery level fill bars (glowing/charging up) */}
        <rect x="155" y="240" width="90" height="20" rx="2" fill="var(--color-status-green)" opacity="0.4" />
        <rect x="155" y="210" width="90" height="20" rx="2" fill="var(--color-status-green)" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
        </rect>
        <rect x="155" y="180" width="90" height="20" rx="2" fill="var(--color-status-green)" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
        </rect>

        {/* Glowing Lightning bolt overlay */}
        <path d="M210 120 L180 175 H210 L190 220 L230 160 H195 Z" fill="var(--color-status-green)" stroke="white" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
        </path>
      </svg>
    )
  }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SECTORS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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
          background: `radial-gradient(ellipse at top right, ${SECTORS[activeSlide].accentColor}, transparent 70%)`,
          transition: "background 0.8s ease-in-out"
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
              aria-label="AI-Powered Energy Infrastructure Monitoring"
            >
              {HEADLINE_LINES.map((line, li) => (
                <span key={li} className="flex flex-wrap gap-x-[0.25em]">
                  {line.map((word, wi) => (
                    <m.span
                      key={wi}
                      variants={wordBlur}
                      className={
                        (li === 0 && wi === 0) || (li === 1 && wi === 1)
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
            Real-time monitoring and predictive intelligence for critical power assets — engineered entirely in India.
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

        {/* RIGHT: High-tech Showcase Panel with EV, Solar & Grid rotation */}
        <m.div
          variants={slideRight}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center lg:justify-end"
        >
          <div className="bg-bg-surface border-[1.5px] border-bg-border rounded-[4px] p-6 w-full max-w-[460px] aspect-square flex flex-col justify-between shadow-sm relative overflow-hidden">
            {/* Sector indicator glows */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
              style={{ background: `${SECTORS[activeSlide].accentColor}10` }}
            />

            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-bg-border pb-3.5 mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 transition-colors duration-500`} style={{ backgroundColor: SECTORS[activeSlide].accentColor }} />
                  <span className="relative inline-flex rounded-full h-2 w-2 transition-colors duration-500" style={{ backgroundColor: SECTORS[activeSlide].accentColor }} />
                </span>
                <span 
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-[3px] border transition-all duration-500 ${SECTORS[activeSlide].indicatorBg}`}
                >
                  {SECTORS[activeSlide].badge}
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-text-muted">SECTOR PLATFORM</span>
            </div>

            {/* Central Animated SVG with crossfade animation */}
            <div className="flex-grow flex items-center justify-center py-2 bg-[#FAFBFC] border border-bg-border rounded-[3px] relative z-10 my-3 overflow-hidden">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full flex items-center justify-center h-full"
                >
                  {SECTORS[activeSlide].svg}
                </m.div>
              </AnimatePresence>
            </div>

            {/* Text description section with sliding crossfade */}
            <div className="relative z-10 min-h-[72px] mb-2 px-1">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  <h3 className="font-heading font-bold text-lg text-text-primary uppercase tracking-wide leading-tight mb-1">
                    {SECTORS[activeSlide].title}
                  </h3>
                  <p className="font-sans text-[12.5px] text-text-secondary leading-snug">
                    {SECTORS[activeSlide].desc}
                  </p>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls / Indicator Dots */}
            <div className="flex items-center justify-between border-t border-bg-border pt-4 mt-2 relative z-10">
              <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase">TELEMETRY STREAM</span>
              
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {SECTORS.map((sector, index) => (
                  <button
                    key={sector.id}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Switch to ${sector.badge}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeSlide 
                        ? `w-6 ${SECTORS[index].dotActiveColor}` 
                        : "w-2.5 bg-bg-border-strong hover:bg-text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}