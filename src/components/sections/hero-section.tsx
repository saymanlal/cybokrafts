"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)",
          backgroundSize: "3.5rem 3.5rem",
        }}
        aria-hidden="true"
      />
      {/* Soft radial light from top-right */}
      <div
        className="absolute top-0 right-0 w-[650px] h-[500px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, #BFDBFE, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT: Copy & CTAs */}
        <div>
          <motion.div {...fadeUp}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-6">
              Atmanirbhar Bharat · Intelligent Energy
            </p>

            <h1
              id="hero-heading"
              className="font-heading font-bold text-[2.75rem] lg:text-[3.5rem] leading-[1.12] tracking-tight text-[#0F172A] mb-6"
            >
              India's Intelligent<br />
              Energy Infrastructure<br />
              Platform
            </h1>

            <p className="text-lg text-[#334155] leading-relaxed max-w-lg mb-10 font-sans">
              Cybokrafts engineers AI-powered monitoring systems for critical energy assets — transformers, solar, EV networks, and beyond. Trusted infrastructure intelligence, built in India.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#solutions"
                className="px-7 py-3.5 bg-[#2563EB] text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors shadow-sm"
              >
                Explore Solutions
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 bg-white border border-[#E2E8F0] text-[#334155] text-sm font-semibold rounded hover:bg-[#F8FAFC] transition-colors shadow-sm"
              >
                Request Demo
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex items-center gap-6 pt-8 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="text-[#10B981]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0L10.2 5.4L16 6.2L11.8 10.2L12.9 16L8 13.4L3.1 16L4.2 10.2L0 6.2L5.8 5.4L8 0Z" />
                  </svg>
                </span>
                <span className="text-xs font-semibold text-[#334155]">Make in India</span>
              </div>
              <div className="w-px h-4 bg-[#E2E8F0]" aria-hidden="true" />
              <span className="text-xs font-semibold text-[#334155]">DPIIT Startup India Recognized</span>
              <div className="w-px h-4 bg-[#E2E8F0]" aria-hidden="true" />
              <span className="text-xs font-semibold text-[#334155]">IIT Indore Incubated</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Abstract Energy Network SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-full max-w-[480px] aspect-square">
            <svg
              viewBox="0 0 480 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              role="img"
              aria-label="Abstract energy network diagram"
            >
              {/* Grid background */}
              <defs>
                <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                </pattern>
                <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="480" height="480" fill="url(#hero-grid)" />

              {/* Network lines */}
              <g stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4">
                <line x1="80" y1="380" x2="200" y2="260" />
                <line x1="200" y1="260" x2="320" y2="180" />
                <line x1="320" y1="180" x2="420" y2="100" />
                <line x1="200" y1="260" x2="280" y2="340" />
                <line x1="320" y1="180" x2="380" y2="280" />
                <line x1="80" y1="380" x2="160" y2="440" />
              </g>

              {/* Primary lines */}
              <g stroke="#2563EB" strokeWidth="2" strokeOpacity="0.5">
                <line x1="80" y1="380" x2="200" y2="260" />
                <line x1="200" y1="260" x2="320" y2="180" />
                <line x1="320" y1="180" x2="420" y2="100" />
              </g>

              {/* Filled area under primary path */}
              <path
                d="M80 380 L200 260 L320 180 L420 100 L420 480 L80 480 Z"
                fill="#2563EB"
                fillOpacity="0.04"
              />

              {/* Node halos */}
              <circle cx="200" cy="260" r="28" fill="url(#node-glow)" />
              <circle cx="320" cy="180" r="22" fill="url(#node-glow)" />

              {/* Nodes */}
              <g>
                {/* Main hub */}
                <circle cx="200" cy="260" r="8" fill="#2563EB" />
                <circle cx="200" cy="260" r="14" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.3" />

                <circle cx="320" cy="180" r="6" fill="#0EA5E9" />
                <circle cx="420" cy="100" r="5" fill="#2563EB" />
                <circle cx="80" cy="380" r="5" fill="#64748B" />
                <circle cx="280" cy="340" r="5" fill="#64748B" />
                <circle cx="380" cy="280" r="4" fill="#94A3B8" />
                <circle cx="160" cy="440" r="4" fill="#94A3B8" />
              </g>

              {/* Label at main hub */}
              <rect x="214" y="246" width="100" height="22" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" />
              <text x="264" y="261" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="Inter, sans-serif" fontWeight="600">CYBO-VAJRA Node</text>

              {/* Animated pulse ring (CSS keyframe via style) */}
              <circle cx="200" cy="260" r="20" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.6">
                <animate attributeName="r" values="14;26;14" dur="3s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}