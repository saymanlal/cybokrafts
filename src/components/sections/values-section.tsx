"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

// ─── Theme Definitions ────────────────────────────────────────────────────────
// Each theme: ac=accent hex, bg=section bg tint, light=border/ring, glow=shadow,
// soft=capsule active bg, textOnSoft=text ON soft bg (always dark enough to read),
// teleBg=telemetry cell bg, teleText=text inside tele cell
interface Theme {
  ac: string;          // primary accent color
  acHover: string;     // slightly darker for hover states
  bg: string;          // subtle section bg tint
  light: string;       // borders, rings
  glow: string;        // box-shadow glow
  soft: string;        // active capsule / manifesto bg
  textOnSoft: string;  // text on soft bg — always dark enough to contrast
  textOnAc: string;    // text placed directly ON the accent color
  badgeBg: string;     // telemetry badge bg
  badgeText: string;   // telemetry badge text — dark shade of same ramp
  progressTrack: string;
}

const THEMES: Theme[] = [
  // 01 Indigo
  {
    ac: "#4f46e5", acHover: "#4338ca",
    bg: "#eef2ff", light: "#a5b4fc", glow: "rgba(79,70,229,0.14)",
    soft: "#e0e7ff", textOnSoft: "#312e81", textOnAc: "#ffffff",
    badgeBg: "#e0e7ff", badgeText: "#312e81",
    progressTrack: "#c7d2fe",
  },
  // 02 Sky
  {
    ac: "#0284c7", acHover: "#0369a1",
    bg: "#e0f2fe", light: "#7dd3fc", glow: "rgba(2,132,199,0.14)",
    soft: "#bae6fd", textOnSoft: "#0c4a6e", textOnAc: "#ffffff",
    badgeBg: "#bae6fd", badgeText: "#0c4a6e",
    progressTrack: "#7dd3fc",
  },
  // 03 Violet
  {
    ac: "#7c3aed", acHover: "#6d28d9",
    bg: "#f5f3ff", light: "#c4b5fd", glow: "rgba(124,58,237,0.14)",
    soft: "#ede9fe", textOnSoft: "#3b0764", textOnAc: "#ffffff",
    badgeBg: "#ede9fe", badgeText: "#3b0764",
    progressTrack: "#c4b5fd",
  },
  // 04 Emerald
  {
    ac: "#059669", acHover: "#047857",
    bg: "#ecfdf5", light: "#6ee7b7", glow: "rgba(5,150,105,0.14)",
    soft: "#d1fae5", textOnSoft: "#064e3b", textOnAc: "#ffffff",
    badgeBg: "#d1fae5", badgeText: "#064e3b",
    progressTrack: "#6ee7b7",
  },
  // 05 Amber
  {
    ac: "#d97706", acHover: "#b45309",
    bg: "#fffbeb", light: "#fcd34d", glow: "rgba(217,119,6,0.14)",
    soft: "#fef3c7", textOnSoft: "#78350f", textOnAc: "#1c1917",
    badgeBg: "#fef3c7", badgeText: "#78350f",
    progressTrack: "#fcd34d",
  },
  // 06 Rose
  {
    ac: "#e11d48", acHover: "#be123c",
    bg: "#fff1f2", light: "#fda4af", glow: "rgba(225,29,72,0.14)",
    soft: "#ffe4e6", textOnSoft: "#881337", textOnAc: "#ffffff",
    badgeBg: "#ffe4e6", badgeText: "#881337",
    progressTrack: "#fda4af",
  },
  // 07 Pink
  {
    ac: "#db2777", acHover: "#be185d",
    bg: "#fdf2f8", light: "#f9a8d4", glow: "rgba(219,39,119,0.14)",
    soft: "#fce7f3", textOnSoft: "#831843", textOnAc: "#ffffff",
    badgeBg: "#fce7f3", badgeText: "#831843",
    progressTrack: "#f9a8d4",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const ICONS: React.ReactNode[] = [
  // 01 Guru Grace
  <svg key="01" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12L2.5 12"/><path d="M12 2v10"/>
  </svg>,
  // 02 Gratitude
  <svg key="02" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>,
  // 03 Genius Development
  <svg key="03" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
  </svg>,
  // 04 Green Thinking
  <svg key="04" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22V12M12 12C12 7 17 3 22 3c0 5-4 9-10 9zM12 12C12 7 7 3 2 3c0 5 4 9 10 9z"/>
  </svg>,
  // 05 Global Vision
  <svg key="05" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  // 06 Grounded Leadership
  <svg key="06" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  // 07 Growth For All
  <svg key="07" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
];

// ─── Data ─────────────────────────────────────────────────────────────────────
interface TelemetryMetric {
  label: string;
  value: string;
  type: "progress" | "badge" | "status";
  progressValue?: number;
}

interface CoreValue {
  number: string;
  name: string;
  tagline: string;
  description: string;
  manifesto?: string;
  telemetry: TelemetryMetric[];
}

const VALUES: CoreValue[] = [
  {
    number: "01", name: "Guru Grace", tagline: "Wisdom-led leadership",
    description: "We are guided by wisdom, humility, and reverence for knowledge in every decision we make.",
    manifesto: "Knowledge is the ultimate power grid. We lead by serving.",
    telemetry: [
      { label: "GUIDANCE INDEX", value: "99.8%", type: "badge" },
      { label: "ETHICAL RATING", value: "OPTIMAL", type: "status" },
      { label: "DECISION MATRIX", value: "WISDOM-BASED", type: "badge" },
      { label: "SERVICE LEVEL", value: "MAX LEVEL", type: "badge" },
    ],
  },
  {
    number: "02", name: "Gratitude", tagline: "Humility at the core",
    description: "We appreciate every opportunity, every stakeholder, and every challenge that has shaped us.",
    telemetry: [
      { label: "COLLAB FEEDBACK", value: "98% POSITIVE", type: "badge" },
      { label: "FEEDBACK LOOP", value: "ACTIVE", type: "status" },
      { label: "STAKEHOLDER SYNC", value: "100%", type: "progress", progressValue: 100 },
      { label: "HUMILITY COMPLIANCE", value: "OPTIMAL", type: "badge" },
    ],
  },
  {
    number: "03", name: "Genius Development", tagline: "Nurturing innovation",
    description: "We invest in talent, foster creative thinking, and build systems that bring out engineering excellence.",
    telemetry: [
      { label: "R&D RE-INVESTMENT", value: "15% REV", type: "badge" },
      { label: "INNOVATION INDEX", value: "94%", type: "progress", progressValue: 94 },
      { label: "ACTIVE PATENTS", value: "4 FILED", type: "badge" },
      { label: "DEV RATE", value: "EXCELLENT", type: "status" },
    ],
  },
  {
    number: "04", name: "Green Thinking", tagline: "Sustainability in every solution",
    description: "Every product we build is designed to reduce energy waste, support renewables, and protect the environment.",
    telemetry: [
      { label: "CARBON REDUCTION", value: "92%", type: "progress", progressValue: 92 },
      { label: "DESIGN TARGET", value: "NET ZERO LOSS", type: "badge" },
      { label: "ECO COMPLIANCE", value: "100% CLEAN", type: "badge" },
      { label: "GRID INDEX", value: "STABLE", type: "status" },
    ],
  },
  {
    number: "05", name: "Global Vision", tagline: "Building for the world from India",
    description: "Our ambitions are not bounded by geography. We build indigenous solutions with global standards.",
    telemetry: [
      { label: "GRID COMPATIBILITY", value: "IEEE & IEC", type: "badge" },
      { label: "CLOUD BOUNDARY", value: "DOMESTIC", type: "badge" },
      { label: "GLOBAL EXPORTS", value: "READY", type: "status" },
      { label: "REGULATORY COMPLIANCE", value: "100%", type: "progress", progressValue: 100 },
    ],
  },
  {
    number: "06", name: "Grounded Leadership", tagline: "Ethics and integrity at the helm",
    description: "Leadership at Cybokrafts means leading with authenticity, accountability, and unwavering integrity.",
    telemetry: [
      { label: "AUDIT TRAIL", value: "IMMUTABLE LEDGER", type: "badge" },
      { label: "COMPLIANCE CHECK", value: "100% SOURCED", type: "badge" },
      { label: "INTEGRITY RATIO", value: "EXCELLENT", type: "status" },
      { label: "TRANSPARENCY INDEX", value: "98.5%", type: "progress", progressValue: 98.5 },
    ],
  },
  {
    number: "07", name: "Growth For All", tagline: "Shared and inclusive prosperity",
    description: "We create value not just for shareholders, but for communities, partners, and India at large.",
    telemetry: [
      { label: "LOCAL EMPLOYMENT", value: "EXCELLENT", type: "status" },
      { label: "STAKEHOLDER LOOPS", value: "100% ALIGNED", type: "badge" },
      { label: "REGIONAL GROWTH", value: "95%", type: "progress", progressValue: 95 },
      { label: "PROSPERITY RATIO", value: "OPTIMAL", type: "badge" },
    ],
  },
];

// ─── Orbital radius & helpers ─────────────────────────────────────────────────
const ORB_R = 210;

function getNodePos(idx: number, total: number, r: number, cx = 270, cy = 270) {
  const angle = (idx * 360 / total - 90) * (Math.PI / 180);
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = THEMES[activeIndex];
  const value = VALUES[activeIndex];
  const electronRef = useRef<SVGCircleElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Animate electron to active node
  useEffect(() => {
    const { x: tx, y: ty } = getNodePos(activeIndex, VALUES.length, ORB_R);
    const el = electronRef.current;
    if (!el) return;
    let start: number | null = null;
    const dur = 1400;
    const sx = parseFloat(el.getAttribute("cx") ?? "270");
    const sy = parseFloat(el.getAttribute("cy") ?? "270");
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    function step(ts: number) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const ep = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      el!.setAttribute("cx", String(sx + (tx - sx) * ep));
      el!.setAttribute("cy", String(sy + (ty - sy) * ep));
      if (p < 1) animFrameRef.current = requestAnimationFrame(step);
    }
    animFrameRef.current = requestAnimationFrame(step);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [activeIndex]);

  const handlePrev = () => setActiveIndex((p) => (p - 1 + VALUES.length) % VALUES.length);
  const handleNext = () => setActiveIndex((p) => (p + 1) % VALUES.length);

  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="py-24 relative overflow-hidden transition-colors duration-500"
      style={{ background: theme.bg }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.light}55 1px, transparent 1px), linear-gradient(to bottom, ${theme.light}55 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow blobs */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-700"
        style={{ background: theme.glow, filter: "blur(90px)" }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-[340px] h-[340px] rounded-full pointer-events-none transition-all duration-700"
        style={{ background: theme.glow, filter: "blur(70px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <m.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT} className="max-w-2xl mb-16">
          <m.p variants={fadeUp} className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.ac }}>
            FOUNDATIONAL PRINCIPLES
          </m.p>
          <m.h2
            id="values-heading"
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] uppercase tracking-tight mb-4 text-[#0f172a]"
          >
            Our <span style={{ color: theme.ac }}>7G</span> Core Values
          </m.h2>
          <m.p variants={fadeUp} className="font-sans text-[16px] leading-relaxed text-[#475569]">
            The principles that guide every solution we build, every partnership we form, and every engineer we develop.
          </m.p>
        </m.div>

        {/* ══════════════════════════ DESKTOP ══════════════════════════ */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center w-full relative">

          {/* Left: Console Panel */}
          <div className="col-span-5 relative flex flex-col justify-center min-h-[500px]">
            {/* Watermark number */}
            <div
              className="absolute top-[-30px] left-[-20px] font-heading font-extrabold text-[150px] leading-none pointer-events-none select-none"
              style={{ color: theme.ac, opacity: 0.04 }}
            >
              {value.number}
            </div>

            {/* Console card */}
            <div
              className="relative rounded-xl p-8 overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(14px)",
                border: `1px solid ${theme.light}`,
                boxShadow: `0 4px 32px ${theme.glow}`,
              }}
            >
              {/* Corner brackets */}
              {(["tl","tr","bl","br"] as const).map((pos) => (
                <div
                  key={pos}
                  className="absolute w-3.5 h-3.5"
                  style={{
                    top: pos.startsWith("t") ? 0 : "auto",
                    bottom: pos.startsWith("b") ? 0 : "auto",
                    left: pos.endsWith("l") ? 0 : "auto",
                    right: pos.endsWith("r") ? 0 : "auto",
                    borderTop: pos.startsWith("t") ? `2px solid ${theme.light}` : undefined,
                    borderBottom: pos.startsWith("b") ? `2px solid ${theme.light}` : undefined,
                    borderLeft: pos.endsWith("l") ? `2px solid ${theme.light}` : undefined,
                    borderRight: pos.endsWith("r") ? `2px solid ${theme.light}` : undefined,
                  }}
                />
              ))}

              {/* Status bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] font-semibold text-[#64748b]">
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: theme.ac }}
                  />
                  CORE_NODE_{value.number}: ONLINE
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#64748b]">SYS_INTEGRITY: OPTIMAL</span>
              </div>

              {/* Title */}
              <div className="overflow-hidden h-[40px] mb-1 relative">
                <AnimatePresence mode="wait">
                  <m.h3
                    key={activeIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="font-heading font-bold text-[28px] leading-none uppercase tracking-wide"
                    style={{ color: theme.ac }}
                  >
                    {value.name}
                  </m.h3>
                </AnimatePresence>
              </div>

              {/* Tagline */}
              <div
                className="overflow-hidden h-[18px] mb-5 pl-3"
                style={{ borderLeft: `2px solid ${theme.light}` }}
              >
                <AnimatePresence mode="wait">
                  <m.p
                    key={activeIndex}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.28 }}
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "#475569" /* always slate, never tinted-light */ }}
                  >
                    {value.tagline}
                  </m.p>
                </AnimatePresence>
              </div>

              {/* Description */}
              <div className="min-h-[68px]">
                <AnimatePresence mode="wait">
                  <m.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="font-sans text-[14px] leading-relaxed mb-6 text-[#475569]"
                  >
                    {value.description}
                  </m.p>
                </AnimatePresence>
              </div>

              {/* Telemetry grid */}
              <div className="border-t border-slate-100 pt-5">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {value.telemetry.map((t, i) => (
                      <div
                        key={i}
                        className="rounded-md p-3.5 flex flex-col justify-between min-h-[62px]"
                        style={{ background: theme.badgeBg, border: `1px solid ${theme.light}44` }}
                      >
                        <span
                          className="font-mono text-[8px] uppercase tracking-wider block"
                          style={{ color: theme.badgeText, opacity: 0.7 }}
                        >
                          {t.label}
                        </span>
                        {t.type === "progress" ? (
                          <div className="mt-2">
                            <div
                              className="w-full h-1.5 rounded-full overflow-hidden"
                              style={{ background: theme.progressTrack }}
                            >
                              <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${t.progressValue ?? 0}%` }}
                                transition={{ duration: 0.65, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{ background: theme.ac }}
                              />
                            </div>
                            <span
                              className="font-mono text-[9px] font-bold mt-1 block"
                              style={{ color: theme.badgeText }}
                            >
                              {t.progressValue}%
                            </span>
                          </div>
                        ) : t.type === "status" ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ background: theme.ac }}
                            />
                            <span
                              className="font-heading font-bold text-[11px] uppercase"
                              style={{ color: theme.badgeText }}
                            >
                              {t.value}
                            </span>
                          </div>
                        ) : (
                          <span
                            className="font-heading font-bold text-[11px] mt-1 uppercase block"
                            style={{ color: theme.badgeText }}
                          >
                            {t.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Manifesto */}
              <AnimatePresence mode="wait">
                {value.manifesto && (
                  <m.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 pl-4 py-2.5 rounded-sm"
                    style={{
                      borderLeft: `2px solid ${theme.ac}`,
                      background: theme.soft,
                    }}
                  >
                    <span
                      className="font-mono text-[8px] font-bold tracking-widest uppercase block mb-1"
                      style={{ color: theme.ac }}
                    >
                      CORE MANIFESTO
                    </span>
                    <blockquote
                      className="font-heading font-semibold text-[12px] leading-snug italic uppercase"
                      style={{ color: theme.textOnSoft }}
                    >
                      &ldquo;{value.manifesto}&rdquo;
                    </blockquote>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between w-full mt-5 px-1">
              <div className="flex items-center gap-2">
                {[handlePrev, handleNext].map((fn, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    aria-label={i === 0 ? "Previous" : "Next"}
                    className="p-2.5 rounded-full border transition-all outline-none flex items-center justify-center cursor-pointer"
                    style={{
                      background: "white",
                      borderColor: theme.light,
                      color: theme.ac,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = theme.soft)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <polyline points={i === 0 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
                    </svg>
                  </button>
                ))}
              </div>
              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {VALUES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to value ${idx + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300 cursor-pointer outline-none"
                    style={{
                      width: activeIndex === idx ? "20px" : "6px",
                      background: activeIndex === idx ? theme.ac : "#cbd5e1",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Orbital */}
          <div className="col-span-7 flex items-center justify-center relative min-h-[580px] select-none">
            <div className="relative w-[540px] h-[540px] flex items-center justify-center overflow-visible">

              {/* SVG layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 540">
                {/* Orbital tracks */}
                <circle cx="270" cy="270" r={ORB_R} fill="none" stroke={theme.light} strokeWidth="0.75" strokeDasharray="4 8" opacity="0.6" />
                <circle cx="270" cy="270" r="130" fill="none" stroke={theme.light} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
                {/* Radar ping */}
                <m.circle
                  cx="270" cy="270" r="130"
                  fill="none"
                  stroke={theme.ac}
                  strokeWidth="0.75"
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{ scale: 1.65, opacity: [0, 0.3, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeOut" }}
                  style={{ transformOrigin: "270px 270px" }}
                />
                {/* Electron */}
                <circle
                  ref={electronRef}
                  cx="270" cy="60"
                  r="4"
                  fill={theme.ac}
                  opacity="0.9"
                />
              </svg>

              {/* Spinning rings */}
              <m.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%", left: "50%",
                  width: "148px", height: "148px",
                  marginTop: "-74px", marginLeft: "-74px",
                  border: `1px dashed ${theme.light}99`,
                }}
              />
              <m.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%", left: "50%",
                  width: "124px", height: "124px",
                  marginTop: "-62px", marginLeft: "-62px",
                  border: `1px dotted ${theme.ac}55`,
                }}
              />
              <m.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 11, ease: "linear" }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "50%", left: "50%",
                  width: "102px", height: "102px",
                  marginTop: "-51px", marginLeft: "-51px",
                  borderTop: `2px solid ${theme.ac}`,
                  borderRight: "2px solid transparent",
                  borderBottom: "2px solid transparent",
                  borderLeft: "2px solid transparent",
                }}
              />

              {/* Center hub */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[112px] h-[112px] rounded-full bg-white flex flex-col items-center justify-center z-10 transition-all duration-500"
                style={{
                  border: `1px solid ${theme.light}`,
                  boxShadow: `0 0 36px ${theme.glow}`,
                }}
              >
                <div className="font-mono text-[7px] text-[#94a3b8] uppercase tracking-widest mb-1">
                  SYS_ND_{value.number}
                </div>
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{ color: theme.ac }}
                  >
                    {ICONS[activeIndex]}
                  </m.div>
                </AnimatePresence>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="w-1 h-1 rounded-full animate-ping"
                    style={{ background: theme.ac }}
                  />
                  <span className="font-mono text-[6px] text-[#94a3b8] uppercase tracking-widest font-bold">LNK</span>
                </div>
              </div>

              {/* Capsule nodes */}
              {VALUES.map((val, idx) => {
                const isActive = idx === activeIndex;
                const { x, y } = getNodePos(idx, VALUES.length, ORB_R);
                return (
                  <div
                    key={val.name}
                    className="absolute"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isActive ? 30 : 20,
                    }}
                  >
                    <m.button
                      onClick={() => setActiveIndex(idx)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-wider cursor-pointer outline-none transition-all duration-300"
                      style={{
                        background: isActive ? theme.soft : "rgba(255,255,255,0.88)",
                        border: `1px solid ${isActive ? theme.ac : "#e2e8f0"}`,
                        color: isActive ? theme.textOnSoft : "#64748b",
                        fontWeight: isActive ? 700 : 400,
                        boxShadow: isActive ? `0 0 18px ${theme.glow}` : undefined,
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: isActive ? theme.ac : "#cbd5e1",
                          animation: isActive ? "pulse 2s infinite" : undefined,
                        }}
                      />
                      <span>{val.number} {val.name.toUpperCase()}</span>
                    </m.button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════ MOBILE / TABLET ══════════════════════════ */}
        <div className="lg:hidden flex flex-col gap-4">
          {/* Scrollable tabs */}
          <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none snap-x snap-mandatory">
            {VALUES.map((val, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={val.number}
                  onClick={() => setActiveIndex(idx)}
                  className="flex-shrink-0 snap-start px-4 py-2.5 rounded-md border font-mono text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer outline-none"
                  style={{
                    background: isActive ? theme.soft : "white",
                    border: `1px solid ${isActive ? theme.ac : "#e2e8f0"}`,
                    color: isActive ? theme.textOnSoft : "#64748b",
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {val.number} {val.name.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Mobile console card */}
          <div
            className="relative rounded-xl p-6 overflow-hidden transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${theme.light}`,
              boxShadow: `0 4px 24px ${theme.glow}`,
            }}
          >
            {/* Corner brackets */}
            {(["tl","tr","bl","br"] as const).map((pos) => (
              <div
                key={pos}
                className="absolute w-3 h-3"
                style={{
                  top: pos.startsWith("t") ? 0 : "auto",
                  bottom: pos.startsWith("b") ? 0 : "auto",
                  left: pos.endsWith("l") ? 0 : "auto",
                  right: pos.endsWith("r") ? 0 : "auto",
                  borderTop: pos.startsWith("t") ? `2px solid ${theme.light}` : undefined,
                  borderBottom: pos.startsWith("b") ? `2px solid ${theme.light}` : undefined,
                  borderLeft: pos.endsWith("l") ? `2px solid ${theme.light}` : undefined,
                  borderRight: pos.endsWith("r") ? `2px solid ${theme.light}` : undefined,
                }}
              />
            ))}

            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-[#64748b]">
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: theme.ac }} />
                NODE_{value.number}: ACTIVE
              </div>
              <div style={{ color: theme.ac }}>{ICONS[activeIndex]}</div>
            </div>

            {/* Title */}
            <h3
              className="font-heading font-bold text-2xl uppercase tracking-wide leading-none mb-1.5"
              style={{ color: theme.ac }}
            >
              {value.name}
            </h3>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] mb-4 text-[#475569]">
              {value.tagline}
            </p>
            <p className="font-sans text-sm leading-relaxed mb-5 text-[#475569]">
              {value.description}
            </p>

            {/* Manifesto */}
            {value.manifesto && (
              <div
                className="mb-5 pl-3 py-2.5 rounded-sm"
                style={{ borderLeft: `2px solid ${theme.ac}`, background: theme.soft }}
              >
                <span
                  className="font-mono text-[8px] font-bold tracking-widest uppercase block mb-1"
                  style={{ color: theme.ac }}
                >
                  CORE MANIFESTO
                </span>
                <blockquote
                  className="font-heading font-semibold text-[11px] leading-snug italic uppercase"
                  style={{ color: theme.textOnSoft }}
                >
                  &ldquo;{value.manifesto}&rdquo;
                </blockquote>
              </div>
            )}

            {/* Telemetry */}
            <div className="border-t border-slate-100 pt-5 grid grid-cols-2 gap-3">
              {value.telemetry.map((t, i) => (
                <div
                  key={i}
                  className="rounded-md p-3 flex flex-col justify-between min-h-[58px]"
                  style={{ background: theme.badgeBg, border: `1px solid ${theme.light}44` }}
                >
                  <span
                    className="font-mono text-[7.5px] uppercase tracking-wider block"
                    style={{ color: theme.badgeText, opacity: 0.7 }}
                  >
                    {t.label}
                  </span>
                  {t.type === "progress" ? (
                    <div className="mt-2">
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: theme.progressTrack }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${t.progressValue ?? 0}%`, background: theme.ac }}
                        />
                      </div>
                      <span
                        className="font-mono text-[9px] font-bold mt-0.5 block"
                        style={{ color: theme.badgeText }}
                      >
                        {t.progressValue}%
                      </span>
                    </div>
                  ) : t.type === "status" ? (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.ac }} />
                      <span
                        className="font-heading font-bold text-[10px] uppercase"
                        style={{ color: theme.badgeText }}
                      >
                        {t.value}
                      </span>
                    </div>
                  ) : (
                    <span
                      className="font-heading font-bold text-[10px] mt-1.5 uppercase block"
                      style={{ color: theme.badgeText }}
                    >
                      {t.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-between px-1">
            <div className="flex gap-2">
              {[handlePrev, handleNext].map((fn, i) => (
                <button
                  key={i}
                  onClick={fn}
                  aria-label={i === 0 ? "Previous" : "Next"}
                  className="p-2.5 rounded-full border cursor-pointer outline-none"
                  style={{ background: "white", borderColor: theme.light, color: theme.ac }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <polyline points={i === 0 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
                  </svg>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {VALUES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer outline-none"
                  style={{
                    width: activeIndex === idx ? "20px" : "6px",
                    background: activeIndex === idx ? theme.ac : "#cbd5e1",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}