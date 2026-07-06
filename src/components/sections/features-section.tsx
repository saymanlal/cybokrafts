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
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7.5px] text-[#7A93AD] z-10">
          <span>DUAL-CHANNEL REAL-TIME TELEMETRY</span>
          <span className="flex items-center gap-1 text-[#1C5FD1] font-bold">
            <span className="w-1 h-1 rounded-full bg-[#1C5FD1] animate-pulse" />
            SAMPLING: 100Hz
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            {/* Grid Baselines */}
            <line x1="10" y1="60" x2="310" y2="60" stroke="#A8B5C8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
            <line x1="10" y1="25" x2="310" y2="25" stroke="#A8B5C8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.15" />
            <line x1="10" y1="95" x2="310" y2="95" stroke="#A8B5C8" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.15" />

            {/* Channel B: Green Waveform */}
            <m.path
              d="M 10,80 C 60,120 100,20 160,80 C 220,140 260,30 310,50"
              fill="none"
              stroke="#059669"
              strokeWidth="1.25"
              strokeDasharray="3,2"
              opacity="0.75"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Channel A: Blue Waveform */}
            <m.path
              d="M 10,65 C 50,15 90,95 160,45 C 230,-5 270,75 310,65"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Time Axis Scale Ticks */}
            <line x1="10" y1="105" x2="310" y2="105" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="10" y1="105" x2="10" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="85" y1="105" x2="85" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="160" y1="105" x2="160" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="235" y1="105" x2="235" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="310" y1="105" x2="310" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />

            <text x="7" y="117" fill="#7A93AD" className="font-mono text-[5px]">-10.0s</text>
            <text x="81" y="117" fill="#7A93AD" className="font-mono text-[5px]">-7.5s</text>
            <text x="156" y="117" fill="#7A93AD" className="font-mono text-[5px]">-5.0s</text>
            <text x="231" y="117" fill="#7A93AD" className="font-mono text-[5px]">-2.5s</text>
            <text x="307" y="117" fill="#7A93AD" className="font-mono text-[5px]">0.0s</text>

            {/* Active Tracing Marker */}
            <m.circle
              cx="10"
              cy="65"
              r="2.5"
              fill="#1C5FD1"
              animate={{ 
                x: [0, 150, 300, 150, 0],
                y: [0, -20, 0, -20, 0]
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ transformBox: "fill-box" }}
            />
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span className="text-[#1C5FD1] font-bold">CH A: VOLTAGE (229.8V RMS)</span>
          <span className="text-[#059669] font-bold">CH B: CURRENT (341.2A)</span>
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
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7.5px] text-[#3D5470] z-10">
          <span>// PREDICTIVE THERMAL FORECASTING</span>
          <span className="flex items-center gap-1 text-[#DC2626] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
            72H RUNAWAY RISK: HIGH
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            {/* Split boundary vertical line (Time: NOW) */}
            <line x1="130" y1="15" x2="130" y2="105" stroke="#7A93AD" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.5" />
            <text x="133" y="22" fill="#7A93AD" className="font-mono text-[5px] font-bold">NOW (t = 0)</text>

            {/* Historical Path (solid blue) */}
            <m.path
              d="M 10,75 L 50,70 L 90,73 L 130,70"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Confidence Interval Shading (future forecasting envelop) */}
            <path
              d="M 130,70 L 190,55 L 250,35 L 310,20 L 310,100 L 250,90 L 190,85 L 130,70 Z"
              fill="rgba(12, 25, 41, 0.03)"
              stroke="rgba(12, 25, 41, 0.05)"
              strokeWidth="0.5"
            />
            <text x="210" y="93" fill="#7A93AD" className="font-mono text-[4.5px]">FORECAST ENVELOPE</text>

            {/* Normal Future Path (Green dotted) */}
            <m.path
              d="M 130,70 L 190,72 L 250,70 L 310,73"
              fill="none"
              stroke="#059669"
              strokeWidth="1.25"
              strokeDasharray="3,3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <text x="255" y="79" fill="#059669" className="font-mono text-[4.5px] font-bold">NORMAL BASELINE</text>

            {/* Predicted Fault Path (Red solid) */}
            <m.path
              d="M 130,70 Q 170,70 200,45 T 250,25 Q 280,25 310,95"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
            <text x="202" y="38" fill="#DC2626" className="font-mono text-[5px] font-bold">PREDICTED THERMAL TRIP</text>

            {/* Fault Prediction Peak target crosshair */}
            <g transform="translate(250, 25)">
              <circle cx="0" cy="0" r="3.5" fill="#DC2626" />
              <circle cx="0" cy="0" r="8" fill="none" stroke="#DC2626" strokeWidth="1" className="animate-ping" />
            </g>

            {/* X-Axis Scale */}
            <line x1="10" y1="105" x2="310" y2="105" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="10" y1="105" x2="10" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="130" y1="105" x2="130" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="190" y1="105" x2="190" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="250" y1="105" x2="250" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />
            <line x1="310" y1="105" x2="310" y2="109" stroke="#7A93AD" strokeWidth="0.75" opacity="0.4" />

            <text x="5" y="117" fill="#7A93AD" className="font-mono text-[5px]">-24h (PAST)</text>
            <text x="123" y="117" fill="#7A93AD" className="font-mono text-[5px] font-bold">t = 0 (NOW)</text>
            <text x="183" y="117" fill="#7A93AD" className="font-mono text-[5px]">+24h</text>
            <text x="243" y="117" fill="#7A93AD" className="font-mono text-[5px]">+48h</text>
            <text x="303" y="117" fill="#7A93AD" className="font-mono text-[5px]">+72h (EST)</text>
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>MODEL: THERMAL DEV FORECAST</span>
          <span className="text-[#DC2626] font-bold">PREDICTION CONFIDENCE: 94.2%</span>
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Indigenous Platform",
    tagline: "SOVEREIGN BLUEPRINT & DATA RESIDENCY",
    description:
      "Designed, engineered, and assembled locally at IIT Indore, Madhya Pradesh. Data pipelines reside securely within domestic Indian cloud boundaries, complying with sovereign grid safety benchmarks.",
    gridSpan: "col-span-12 lg:col-span-5",
    borderHoverClass: "hover:border-t-accent-blue hover:bg-accent-blue-light/30",
    metrics: ["ASSEMBLY: IIT Indore, IN", "CLOUD BOUNDS: Domestic", "COMPLIANCE: DPIIT Cert", "OWNERS: 100% India"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    diagram: (
      <div className="relative w-full aspect-[2/1] bg-white border border-[#D1D9E4] rounded-[3px] p-4 overflow-hidden flex flex-col justify-between select-none">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7.5px] text-[#1C5FD1] z-10">
          <span>SOVEREIGN INDIAN DATA RESIDENCY</span>
          <span className="font-bold text-[#059669] flex items-center gap-1">
            <span className="w-1 h-1 bg-[#059669] rounded-full animate-ping" />
            DATA DOMAIN: LOCAL LOCK
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            <defs>
              <radialGradient id="indiaSovereignGlow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="#1C5FD1" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1C5FD1" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* India Geometric Boundary Outline */}
            <path
              d="M 160,10 L 175,18 L 205,25 L 220,50 L 180,82 L 158,105 L 130,85 L 95,60 L 105,35 L 125,20 Z"
              fill="url(#indiaSovereignGlow)"
              stroke="#1C5FD1"
              strokeWidth="1.25"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            <text x="105" y="100" fill="#7A93AD" className="font-mono text-[5px] font-bold opacity-60">DOMESTIC BOUNDARY SHIELD</text>

            {/* Encrypted Data Pipes within India */}
            <m.path
              d="M 145,28 L 160,56"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="0.75"
              strokeDasharray="3,3"
              animate={{ strokeDashoffset: [0, -15] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <m.path
              d="M 115,65 L 160,56"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="0.75"
              strokeDasharray="3,3"
              animate={{ strokeDashoffset: [0, -15] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <m.path
              d="M 195,52 L 160,56"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="0.75"
              strokeDasharray="3,3"
              animate={{ strokeDashoffset: [0, -15] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <m.path
              d="M 155,88 L 160,56"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="0.75"
              strokeDasharray="3,3"
              animate={{ strokeDashoffset: [0, -15] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />

            {/* Regional Nodes */}
            <g transform="translate(145, 28)">
              <circle cx="0" cy="0" r="1.5" fill="#1C5FD1" />
              <text x="-25" y="2" fill="#7A93AD" className="font-mono text-[4.5px] font-semibold">DELHI_DC</text>
            </g>
            <g transform="translate(115, 65)">
              <circle cx="0" cy="0" r="1.5" fill="#1C5FD1" />
              <text x="-32" y="2" fill="#7A93AD" className="font-mono text-[4.5px] font-semibold">MUMBAI_CLOUD</text>
            </g>
            <g transform="translate(195, 52)">
              <circle cx="0" cy="0" r="1.5" fill="#1C5FD1" />
              <text x="5" y="2" fill="#7A93AD" className="font-mono text-[4.5px] font-semibold">KOLKATA_NODE</text>
            </g>
            <g transform="translate(155, 88)">
              <circle cx="0" cy="0" r="1.5" fill="#1C5FD1" />
              <text x="5" y="2" fill="#7A93AD" className="font-mono text-[4.5px] font-semibold">CHENNAI_DC</text>
            </g>

            {/* Central Secure Hub - IIT Indore */}
            <g transform="translate(160, 56)">
              <circle cx="0" cy="0" r="3.5" fill="#059669" />
              <circle cx="0" cy="0" r="9" fill="none" stroke="#059669" strokeWidth="0.75" className="animate-ping" />
              <text x="7" y="-2" fill="#059669" className="font-mono text-[5px] font-bold">IIT INDORE</text>
            </g>
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>PIPELINES: 100% INTERNAL IN</span>
          <span>DPIIT REGISTRATION: VERIFIED SECURE</span>
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
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="border-b border-r border-[#0C1929]/5 w-full h-full" />
          ))}
        </div>
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-[7.5px] text-[#1C5FD1] z-10">
          <span>EXTERNAL SENSOR CLAMP RETROFIT</span>
          <span className="flex items-center gap-1 text-[#059669] font-bold">
            <span className="w-1 h-1 bg-[#059669] rounded-full animate-pulse" />
            TELEMETRY LINK: ESTABLISHED
          </span>
        </div>
        {/* SVG Canvas */}
        <div className="flex-1 flex items-center justify-center relative min-h-[90px] z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
            {/* Legacy Transformer Outline */}
            <g transform="translate(20, 45)">
              <rect x="0" y="0" width="50" height="45" fill="none" stroke="#A8B5C8" strokeWidth="1.25" rx="2" />
              {/* Cooling fin slots */}
              <line x1="10" y1="8" x2="10" y2="38" stroke="#A8B5C8" strokeWidth="0.75" />
              <line x1="20" y1="8" x2="20" y2="38" stroke="#A8B5C8" strokeWidth="0.75" />
              <line x1="30" y1="8" x2="30" y2="38" stroke="#A8B5C8" strokeWidth="0.75" />
              <line x1="40" y1="8" x2="40" y2="38" stroke="#A8B5C8" strokeWidth="0.75" />
              {/* Insulator Bushing */}
              <rect x="18" y="-12" width="14" height="12" fill="none" stroke="#A8B5C8" strokeWidth="1" />
              <line x1="25" y1="-12" x2="25" y2="-22" stroke="#D97706" strokeWidth="1.5" />
              <text x="5" y="24" fill="#7A93AD" className="font-mono text-[5.5px] font-bold">LEGACY TX</text>
            </g>

            {/* Copper Busbar Conductor Line */}
            <path d="M 45,23 C 65,23 90,23 90,45 L 90,80" fill="none" stroke="#D97706" strokeWidth="1.5" />
            <text x="58" y="18" fill="#D97706" className="font-mono text-[4.5px] font-bold">LIVE BUSBAR (230V)</text>

            {/* Split-Core CT Clamp Clamped around the Busbar */}
            <g transform="translate(90, 40)">
              {/* Clamping Rings */}
              <path d="M -5,-5 A 6,6 0 0,1 5,-5" fill="none" stroke="#059669" strokeWidth="2.25" strokeLinecap="round" />
              <path d="M 5,5 A 6,6 0 0,1 -5,5" fill="none" stroke="#059669" strokeWidth="2.25" strokeLinecap="round" />
              <circle cx="0" cy="0" r="1.5" fill="#059669" className="animate-ping" />
              <text x="8" y="2" fill="#059669" className="font-mono text-[4.5px] font-bold">SPLIT-CORE CT SENSOR</text>
            </g>

            {/* Signal Route from clamp to CYBO-VAJRA */}
            <m.path
              d="M 90,45 C 90,68 150,68 200,68"
              fill="none"
              stroke="#1C5FD1"
              strokeWidth="1.25"
              strokeDasharray="4,3"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />

            {/* Cybernetic telemetry packets moving along route */}
            <m.circle
              cx="90"
              cy="45"
              r="2"
              fill="#1C5FD1"
              animate={{ 
                x: [0, 110],
                y: [0, 23]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{ transformBox: "fill-box" }}
            />

            {/* CYBO-VAJRA Edge Receiver box */}
            <g transform="translate(200, 42)">
              <rect x="0" y="0" width="85" height="48" fill="white" stroke="#1C5FD1" strokeWidth="1.5" rx="3" className="shadow-sm" />
              <circle cx="10" cy="12" r="1.5" fill="#059669" className="animate-pulse" />
              <text x="16" y="14" fill="#1C5FD1" className="font-mono text-[5.5px] font-bold">CYBO-VAJRA</text>
              <text x="10" y="28" fill="#059669" className="font-mono text-[5px] font-bold">RETROFIT: COMPLETED</text>
              <text x="10" y="38" fill="#7A93AD" className="font-mono text-[4.5px]">INSTALL TIME: 42 MIN</text>
            </g>
          </svg>
        </div>
        <div className="flex items-center justify-between font-mono text-[7px] text-[#7A93AD] border-t border-[#D1D9E4]/40 pt-1.5 z-10">
          <span>INSTALLATION STATUS: HOT Retrofit PASS</span>
          <span>GRID SHUTDOWN REQ: 0% (NONE)</span>
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
                  {feature.tagline}
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
                      {activeFeature.tagline}
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
