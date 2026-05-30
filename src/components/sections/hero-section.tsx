"use client";

import { m, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// ─── Animation Variants ────────────────────────────────────────────────────
const wordBlur = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 16 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const panelIn = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const tabFade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Constants ─────────────────────────────────────────────────────────────
const HEADLINE_LINES = [
  [
    { text: "India's", accent: false },
    { text: "Intelligent", accent: true, color: "blue" },
  ],
  [
    { text: "Energy", accent: false },
    { text: "Grid", accent: false },
  ],
  [
    { text: "AI", accent: true, color: "teal" },
    { text: "Infrastructure", accent: false },
  ],
  [{ text: "Platform", accent: false }],
];

const TICKER_MSGS = [
  "■ TRANSFORMER-07 DHARAMSHALA: Load 84% · Temp 67°C · STATUS OK",
  "■ SOLAR FARM RAJASTHAN: 48.7 kWh Generated · Irradiance 847 W/m²",
  "■ WIND TURBINE WTG-12 GUJARAT: RPM 16.2 · Output 2.4 MW · NORMAL",
  "■ EV CHARGER NETWORK PUNE: 28 Active Sessions · 347 kW Delivered",
  "■ AI PREDICTION: No fault events detected in next 72h for Zone A",
  "■ SUBSTATION SS-04 MUMBAI: All feeders nominal · Relay status OK",
];

const TABS = [
  { id: 0, label: "TRANSFORMER" },
  { id: 1, label: "SOLAR" },
  { id: 2, label: "WIND" },
  { id: 3, label: "EV" },
];

type TeleData = {
  labels: [string, string][];
  values: (() => string)[];
  units: string[];
  trends: string[];
  trendColors: string[];
};

const TELE_DATA: TeleData[] = [
  {
    labels: [["Load Factor", "%"], ["Grid Freq", "Hz"], ["Efficiency", "%"], ["Alerts", ""]],
    values: [
      () => (84 + Math.random() * 0.4 - 0.2).toFixed(1),
      () => (49.95 + Math.random() * 0.08).toFixed(2),
      () => (97.4 + Math.random() * 0.4).toFixed(1),
      () => "0",
    ],
    units: ["%", "Hz", "%", ""],
    trends: ["▲ +1.3%", "~ stable", "▲ +0.2%", "All clear"],
    trendColors: ["text-[#22c55e]", "text-[#f5a623]", "text-[#22c55e]", "text-[#94a3b8]"],
  },
  {
    labels: [["Load Factor", "%"], ["Irradiance", "W/m²"], ["PV Efficiency", "%"], ["Alerts", ""]],
    values: [
      () => (92 + Math.random() * 2).toFixed(1),
      () => (847 + Math.floor(Math.random() * 20)).toString(),
      () => (19.1 + Math.random() * 0.3).toFixed(1),
      () => "0",
    ],
    units: ["%", "W/m²", "%", ""],
    trends: ["▲ Peak hours", "~ steady", "▲ η-optimal", "All clear"],
    trendColors: ["text-[#22c55e]", "text-[#f5a623]", "text-[#22c55e]", "text-[#94a3b8]"],
  },
  {
    labels: [["Wind Speed", "m/s"], ["Turbine RPM", "RPM"], ["Betz Factor", "%"], ["Alerts", ""]],
    values: [
      () => (8.2 + Math.random() * 0.5).toFixed(1),
      () => (16 + Math.random() * 0.5).toFixed(1),
      () => (41 + Math.random() * 0.5).toFixed(1),
      () => "0",
    ],
    units: ["m/s", "RPM", "%", ""],
    trends: ["~ 4h forecast", "▲ +0.3", "▲ Betz-optimal", "All clear"],
    trendColors: ["text-[#f5a623]", "text-[#22c55e]", "text-[#22c55e]", "text-[#94a3b8]"],
  },
  {
    labels: [["Active Ports", ""], ["Grid Load", "kW"], ["Utilization", "%"], ["Queue", ""]],
    values: [
      () => (12 + Math.floor(Math.random() * 2)).toString(),
      () => (347 + Math.floor(Math.random() * 10)).toString(),
      () => (94 + Math.random() * 2).toFixed(1),
      () => "3",
    ],
    units: ["", "kW", "%", ""],
    trends: ["▲ +2 joined", "▲ rising", "▲ high util.", "waiting"],
    trendColors: ["text-[#22c55e]", "text-[#22c55e]", "text-[#22c55e]", "text-[#f5a623]"],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────
function LiveDot() {
  return (
    <span className="relative flex h-[6px] w-[6px]">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
      <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#22c55e]" />
    </span>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-[6px] w-[6px]">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-[6px] w-[6px]" style={{ backgroundColor: color }} />
    </span>
  );
}

// ─── SVG Panels ────────────────────────────────────────────────────────────
function TransformerSVG() {
  return (
    <svg width="100%" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(29,111,242,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="480" height="280" fill="url(#tgrid)" />
      <rect x="160" y="80" width="160" height="120" rx="4" fill="rgba(29,111,242,0.08)" stroke="rgba(29,111,242,0.3)" strokeWidth="1" />
      <rect x="175" y="95" width="60" height="90" rx="2" fill="rgba(29,111,242,0.12)" stroke="rgba(29,111,242,0.4)" strokeWidth="0.8" />
      <rect x="245" y="95" width="60" height="90" rx="2" fill="rgba(0,212,170,0.12)" stroke="rgba(0,212,170,0.4)" strokeWidth="0.8" />
      <path d="M175 105 Q195 105 195 115 Q195 125 175 125 Q175 135 195 135 Q195 145 175 145 Q175 155 195 155 Q195 165 175 165" stroke="#1d6ff2" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M305 105 Q285 105 285 115 Q285 125 305 125 Q305 135 285 135 Q285 145 305 145 Q305 155 285 155 Q285 165 305 165" stroke="#00d4aa" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="230" y="90" width="20" height="100" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
      <line x1="80" y1="140" x2="160" y2="140" stroke="#1d6ff2" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="16;0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <text x="100" y="132" fill="rgba(29,111,242,0.8)" fontSize="8" fontFamily="monospace" textAnchor="middle">11kV INPUT</text>
      <circle cx="80" cy="140" r="6" fill="rgba(29,111,242,0.15)" stroke="#1d6ff2" strokeWidth="1" />
      <circle cx="80" cy="140" r="2" fill="#1d6ff2" />
      <line x1="320" y1="140" x2="400" y2="140" stroke="#00d4aa" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="0;16" dur="1.5s" repeatCount="indefinite" />
      </line>
      <text x="360" y="132" fill="rgba(0,212,170,0.8)" fontSize="8" fontFamily="monospace" textAnchor="middle">415V OUTPUT</text>
      <circle cx="400" cy="140" r="6" fill="rgba(0,212,170,0.15)" stroke="#00d4aa" strokeWidth="1" />
      <circle cx="400" cy="140" r="2" fill="#00d4aa" />
      <circle cx="240" cy="75" r="8" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.5)" strokeWidth="1">
        <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="240" y="79" fill="#f5a623" fontSize="7" fontFamily="monospace" textAnchor="middle">T</text>
      <text x="240" y="64" fill="rgba(245,166,35,0.8)" fontSize="7" fontFamily="monospace" textAnchor="middle">67°C</text>
      <rect x="10" y="200" width="130" height="65" rx="3" fill="rgba(29,111,242,0.06)" stroke="rgba(29,111,242,0.2)" strokeWidth="0.8" />
      <text x="18" y="215" fill="rgba(29,111,242,0.7)" fontSize="7" fontFamily="monospace">■ AI ANALYSIS</text>
      <text x="18" y="228" fill="rgba(200,210,220,0.8)" fontSize="8" fontFamily="sans-serif" fontWeight="600">Load: 84% nominal</text>
      <text x="18" y="240" fill="rgba(200,210,220,0.8)" fontSize="8" fontFamily="sans-serif" fontWeight="600">THD: 2.3%</text>
      <text x="18" y="252" fill="rgba(34,197,94,0.9)" fontSize="8" fontFamily="sans-serif" fontWeight="600">● Status: NORMAL</text>
      <g transform="translate(340,200)">
        <rect width="130" height="65" rx="3" fill="rgba(0,212,170,0.04)" stroke="rgba(0,212,170,0.15)" strokeWidth="0.8" />
        <text x="8" y="14" fill="rgba(0,212,170,0.6)" fontSize="7" fontFamily="monospace">■ WAVEFORM</text>
        <polyline points="8,42 18,28 28,42 38,22 48,42 58,30 68,42 78,26 88,42 98,32 108,42 118,29 126,42" fill="none" stroke="#00d4aa" strokeWidth="1" opacity="0.8">
          <animate attributeName="points" dur="2s" repeatCount="indefinite"
            values="8,42 18,28 28,42 38,22 48,42 58,30 68,42 78,26 88,42 98,32 108,42 118,29 126,42;
                    8,42 18,30 28,42 38,24 48,42 58,28 68,42 78,24 88,42 98,30 108,42 118,27 126,42;
                    8,42 18,28 28,42 38,22 48,42 58,30 68,42 78,26 88,42 98,32 108,42 118,29 126,42" />
        </polyline>
        <line x1="8" y1="42" x2="126" y2="42" stroke="rgba(0,212,170,0.1)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function SolarSVG() {
  return (
    <svg width="100%" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,166,35,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="480" height="280" fill="url(#sgrid)" />
      <circle cx="240" cy="50" r="18" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.4)" strokeWidth="1">
        <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="50" r="10" fill="rgba(245,166,35,0.3)" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={240 + Math.cos(rad) * 22} y1={50 + Math.sin(rad) * 22} x2={240 + Math.cos(rad) * 30} y2={50 + Math.sin(rad) * 30} stroke="#f5a623" strokeWidth="1.2" opacity={i % 2 === 0 ? "0.6" : "0.35"} />;
      })}
      {[0,80,0,80].map((xOff, i) => {
        const yOff = i < 2 ? 0 : 60;
        return (
          <g key={i} transform={`translate(${60 + xOff}, ${100 + yOff})`}>
            <rect width="70" height="50" rx="2" fill="rgba(29,111,242,0.12)" stroke="rgba(29,111,242,0.4)" strokeWidth="0.8" />
            <line x1="0" y1="16" x2="70" y2="16" stroke="rgba(29,111,242,0.3)" strokeWidth="0.5" />
            <line x1="0" y1="33" x2="70" y2="33" stroke="rgba(29,111,242,0.3)" strokeWidth="0.5" />
            <line x1="23" y1="0" x2="23" y2="50" stroke="rgba(29,111,242,0.3)" strokeWidth="0.5" />
            <line x1="46" y1="0" x2="46" y2="50" stroke="rgba(29,111,242,0.3)" strokeWidth="0.5" />
          </g>
        );
      })}
      <line x1="210" y1="175" x2="310" y2="175" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" />
      </line>
      <rect x="310" y="155" width="60" height="40" rx="3" fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
      <text x="340" y="170" fill="rgba(245,166,35,0.9)" fontSize="7" fontFamily="monospace" textAnchor="middle">MPPT</text>
      <text x="340" y="183" fill="rgba(245,166,35,0.7)" fontSize="7" fontFamily="monospace" textAnchor="middle">INVTR</text>
      <line x1="370" y1="175" x2="430" y2="175" stroke="#00d4aa" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="16;0" dur="1.2s" repeatCount="indefinite" />
      </line>
      <circle cx="430" cy="175" r="6" fill="rgba(0,212,170,0.15)" stroke="#00d4aa" strokeWidth="1" />
      <text x="240" y="255" fill="rgba(245,166,35,0.8)" fontSize="9" fontFamily="monospace" textAnchor="middle">■ 48.7 kWh TODAY | ηPV = 19.2% | IRRADIANCE: 847 W/m²</text>
    </svg>
  );
}

function WindSVG() {
  return (
    <svg width="100%" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="0.5" />
        </pattern>
        <style>{`@keyframes spin-blade { from{transform:rotate(0deg)} to{transform:rotate(360deg)} } .blade-spin { animation: spin-blade 4s linear infinite; transform-origin: 240px 130px; }`}</style>
      </defs>
      <rect width="480" height="280" fill="url(#wgrid)" />
      {[80,100,120].map((y, i) => (
        <line key={i} x1="10" y1={y} x2={140 - i * 20} y2={y} stroke="rgba(139,92,246,0.2)" strokeWidth={1 - i * 0.1} strokeDasharray={`${8 - i} ${4 + i}`}>
          <animate attributeName="stroke-dashoffset" values={`0;${-24 + i * 2}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </line>
      ))}
      <line x1="240" y1="240" x2="240" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
      <rect x="228" y="124" width="24" height="12" rx="2" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
      <g className="blade-spin">
        <line x1="240" y1="130" x2="240" y2="60" stroke="rgba(139,92,246,0.7)" strokeWidth="3" strokeLinecap="round" />
        <line x1="240" y1="130" x2="180" y2="165" stroke="rgba(139,92,246,0.7)" strokeWidth="3" strokeLinecap="round" />
        <line x1="240" y1="130" x2="300" y2="165" stroke="rgba(139,92,246,0.7)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="240" cy="60" r="4" fill="rgba(139,92,246,0.4)" />
        <circle cx="180" cy="165" r="4" fill="rgba(139,92,246,0.4)" />
        <circle cx="300" cy="165" r="4" fill="rgba(139,92,246,0.4)" />
      </g>
      <circle cx="240" cy="130" r="8" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" />
      <circle cx="240" cy="130" r="3" fill="#8b5cf6" />
      <line x1="240" y1="240" x2="340" y2="240" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="16;0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <rect x="340" y="228" width="50" height="24" rx="2" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
      <text x="365" y="242" fill="rgba(139,92,246,0.9)" fontSize="8" fontFamily="monospace" textAnchor="middle">SCADA</text>
      <rect x="10" y="200" width="140" height="60" rx="3" fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.8" />
      <text x="18" y="216" fill="rgba(139,92,246,0.7)" fontSize="7" fontFamily="monospace">■ WIND METRICS</text>
      <text x="18" y="230" fill="rgba(200,210,220,0.85)" fontSize="9" fontFamily="sans-serif" fontWeight="600">Wind speed: 8.4 m/s</text>
      <text x="18" y="243" fill="rgba(200,210,220,0.85)" fontSize="9" fontFamily="sans-serif" fontWeight="600">RPM: 16.2 | η: 41.3%</text>
      <text x="18" y="255" fill="rgba(34,197,94,0.85)" fontSize="8" fontFamily="sans-serif">Output: 2.4 MW</text>
    </svg>
  );
}

function EVSVG() {
  return (
    <svg width="100%" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="evgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34,197,94,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="480" height="280" fill="url(#evgrid)" />
      <rect x="60" y="80" width="80" height="130" rx="6" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
      <rect x="76" y="96" width="48" height="34" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" />
      <text x="100" y="111" fill="rgba(34,197,94,0.9)" fontSize="8" fontFamily="monospace" textAnchor="middle">76%</text>
      <text x="100" y="122" fill="rgba(34,197,94,0.5)" fontSize="6" fontFamily="monospace" textAnchor="middle">CHARGING</text>
      <rect x="78" y="136" width="44" height="8" rx="1" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
      <rect x="78" y="136" width="33" height="8" rx="1" fill="rgba(34,197,94,0.5)">
        <animate attributeName="width" values="33;36;33" dur="3s" repeatCount="indefinite" />
      </rect>
      <circle cx="100" cy="195" r="5" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.8)" strokeWidth="1">
        <animate attributeName="fill" values="rgba(34,197,94,0.3);rgba(34,197,94,0.7);rgba(34,197,94,0.3)" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M140 160 C180 160 190 160 200 160" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <g transform="translate(200,120)">
        <path d="M0,60 L10,60 L15,40 L25,25 L55,20 L85,25 L95,40 L110,60 L120,60 L120,75 L0,75 Z" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
        <path d="M22,42 L28,28 L55,23 L85,28 L91,42 Z" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5" />
        <circle cx="28" cy="78" r="12" fill="rgba(0,0,0,0.5)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
        <circle cx="28" cy="78" r="6" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
        <circle cx="92" cy="78" r="12" fill="rgba(0,0,0,0.5)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
        <circle cx="92" cy="78" r="6" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
        <rect x="40" y="55" width="40" height="8" rx="1" fill="rgba(0,0,0,0.4)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
        <rect x="41" y="56" width="30" height="6" rx="0.5" fill="#22c55e" opacity="0.7">
          <animate attributeName="width" values="30;33;30" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="60" y="50" fill="rgba(34,197,94,0.8)" fontSize="10" fontFamily="monospace" textAnchor="middle">⚡</text>
      </g>
      <rect x="350" y="80" width="110" height="120" rx="3" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.8" />
      <text x="406" y="97" fill="rgba(34,197,94,0.7)" fontSize="7" fontFamily="monospace" textAnchor="middle">■ NETWORK</text>
      <text x="360" y="114" fill="rgba(200,210,220,0.85)" fontSize="9" fontFamily="sans-serif" fontWeight="600">Active: 12 ports</text>
      <text x="360" y="128" fill="rgba(200,210,220,0.85)" fontSize="9" fontFamily="sans-serif" fontWeight="600">Power: 347 kW</text>
      <text x="360" y="142" fill="rgba(200,210,220,0.85)" fontSize="9" fontFamily="sans-serif" fontWeight="600">Sessions: 28</text>
      <text x="360" y="158" fill="rgba(34,197,94,0.8)" fontSize="9" fontFamily="sans-serif" fontWeight="600">Queue: 3 EVs</text>
      <text x="360" y="174" fill="rgba(245,166,35,0.8)" fontSize="9" fontFamily="sans-serif">V2G: ENABLED</text>
    </svg>
  );
}

const SVG_VIEWS = [TransformerSVG, SolarSVG, WindSVG, EVSVG];

// ─── Sector Cards ──────────────────────────────────────────────────────────
const SECTORS = [
  { color: "#1d6ff2", name: "Power Transformers", desc: "Real-time temperature, load, THD, and oil level monitoring with AI-based fault prediction for distribution and power transformers.", stat: "11kV – 220kV range" },
  { color: "#f5a623", name: "Solar PV Systems", desc: "Panel-level IV curve tracing, MPPT optimization, shade analysis, and inverter health monitoring with irradiance correlation.", stat: "1kW – 100MW farms" },
  { color: "#8b5cf6", name: "Wind Turbines", desc: "Vibration analysis, gearbox health, pitch angle optimization, and predictive maintenance using SCADA integration with ML models.", stat: "250kW – 5MW units" },
  { color: "#22c55e", name: "EV Charging Networks", desc: "Smart load balancing across CCS2/CHAdeMO/AC chargers, V2G capability monitoring, and fleet charging optimization.", stat: "V2G + OCPP 2.0.1" },
  { color: "#00d4aa", name: "Smart Metering (AMI)", desc: "Advanced metering infrastructure with tamper detection, power quality analysis, and automated demand response integration.", stat: "HAN + WAN + NAN" },
  { color: "#ff4d4d", name: "Substations & Grid", desc: "Protection relay coordination, busbar monitoring, switchgear health, and real-time fault location for the full substation ecosystem.", stat: "IEC 61850 / DNP3" },
];

// ─── IoT Stack ─────────────────────────────────────────────────────────────
const IOT_LAYERS = [
  { layer: "Layer 1", name: "Edge Sensors", detail: "CTs, PTs, vibration, temp, pH, gas sensors — hardened for field deployment", version: "CYBO-EDGE v3", color: "#1d6ff2" },
  { layer: "Layer 2", name: "IoT Gateway", detail: "Local processing, protocol translation (Modbus → MQTT/AMQP), edge inference", version: "CYBO-GATE v2.1", color: "#00d4aa" },
  { layer: "Layer 3", name: "AI Engine", detail: "Time-series anomaly detection, predictive maintenance models, load forecasting", version: "VAJRA-AI v1.4", color: "#f5a623" },
  { layer: "Layer 4", name: "Dashboard", detail: "Real-time web/mobile dashboards, alerts, SCADA integration, audit trails", version: "CYBO-CTRL", color: "#22c55e" },
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [teleValues, setTeleValues] = useState<string[]>(["84.2", "49.98", "97.6", "0"]);
  const [clock, setClock] = useState("");
  const [nodeCount, setNodeCount] = useState(0);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let count = 0;
    const target = 2847;
    const id = setInterval(() => {
      count = Math.min(count + 47, target);
      setNodeCount(count);
      if (count >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const d = TELE_DATA[activeTab];
      setTeleValues(d.values.map((fn) => fn()));
    };
    update();
    const id = setInterval(update, 2000);
    return () => clearInterval(id);
  }, [activeTab]);

  useEffect(() => {
    const id = setInterval(() => {
      if (autoRotateRef.current) setActiveTab((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleTabClick = (idx: number) => {
    autoRotateRef.current = false;
    setActiveTab(idx);
  };

  const CurrentSVG = SVG_VIEWS[activeTab];
  const tele = TELE_DATA[activeTab];
  const tickerFull = TICKER_MSGS.join("     ") + "     " + TICKER_MSGS.join("     ");

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#0a0d14", color: "#e2e8f0" }}
    >
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(29,111,242,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,111,242,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(10,13,20,0.9) 100%)" }} />
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full pointer-events-none animate-pulse" style={{ background: "radial-gradient(circle, rgba(29,111,242,0.08) 0%, transparent 70%)" }} />

      {/* ── NAVBAR ── */}
      <m.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-12 py-4 border-b sticky top-0 z-50 backdrop-blur-xl"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(10,13,20,0.7)" }}
      >
        <div className="flex items-center gap-2.5 font-bold text-lg tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <polygon points="15,1.5 27,8.25 27,21.75 15,28.5 3,21.75 3,8.25" fill="none" stroke="#1d6ff2" strokeWidth="1.5" />
            <polygon points="15,6 23,10.5 23,19.5 15,24 7,19.5 7,10.5" fill="rgba(29,111,242,0.15)" stroke="#1d6ff2" strokeWidth="0.5" />
            <circle cx="15" cy="15" r="3" fill="#00d4aa" />
          </svg>
          CYBOKRAFTS
        </div>
        <div className="hidden lg:flex gap-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {["Platform", "Solutions", "IoT Layers", "Research", "About"].map((link) => (
            <a key={link} href="#" className="text-[11px] uppercase tracking-widest transition-colors" style={{ color: "#94a3b8", textDecoration: "none" }}>
              {link}
            </a>
          ))}
        </div>
        <button className="text-[11px] uppercase tracking-widest px-5 py-2 border" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1d6ff2", borderColor: "#1d6ff2", background: "transparent" }}>
          Request Demo
        </button>
      </m.nav>

      {/* ── STATUS BAR ── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-6 px-12 py-2 border-b overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(10,13,20,0.5)" }}
      >
        <div className="flex items-center gap-2 shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8" }}>
          <StatusDot color="#22c55e" /> GRID ONLINE
        </div>
        <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="flex items-center gap-2 shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8" }}>
          <StatusDot color="#1d6ff2" /> AI ENGINE ACTIVE
        </div>
        <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="flex items-center gap-2 shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8" }}>
          <StatusDot color="#f5a623" /> {nodeCount.toLocaleString()} NODES MONITORED
        </div>
        <div className="w-px h-3 shrink-0" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="flex-1 overflow-hidden whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4a5568" }}>
          <span className="inline-block" style={{ animation: "ticker-scroll 40s linear infinite" }}>{tickerFull}</span>
        </div>
        <style>{`@keyframes ticker-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </m.div>

      {/* ── HERO GRID ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-12 grid lg:grid-cols-[58fr_42fr] gap-16 items-center w-full py-16 lg:min-h-[calc(100vh-100px)]">

        {/* LEFT */}
        <m.div variants={staggerContainer} initial="hidden" animate="show">
          <m.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 text-[10px] uppercase tracking-[0.12em] border" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00d4aa", borderColor: "rgba(0,212,170,0.25)", background: "rgba(0,212,170,0.06)" }}>
              <span className="animate-pulse">■</span>
              DPIIT Recognized &nbsp;·&nbsp; IIT Indore Incubated &nbsp;·&nbsp; Patent Filed
            </div>
          </m.div>

          <h1 className="mb-6" style={{ lineHeight: 0.95 }}>
            <m.span variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col">
              {HEADLINE_LINES.map((line, li) => (
                <span key={li} className="flex flex-wrap gap-x-[0.2em]">
                  {line.map((word, wi) => (
                    <m.span
                      key={wi}
                      variants={wordBlur}
                      className="inline-block"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(40px, 5.5vw, 78px)",
                        letterSpacing: "-0.02em",
                        color: word.accent ? (word.color === "blue" ? "#1d6ff2" : "#00d4aa") : "#e2e8f0",
                      }}
                    >
                      {word.text}
                    </m.span>
                  ))}
                </span>
              ))}
            </m.span>
          </h1>

          <m.p variants={fadeUp} className="mb-10 leading-relaxed" style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "460px", lineHeight: 1.65 }}>
            AI-powered IoT monitoring for transformers, solar arrays, EV networks, wind farms, and the entire energy ecosystem — built in India, for India&apos;s grid future.
          </m.p>

          <m.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-10">
            <a href="#solutions" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest" style={{ background: "#1d6ff2", color: "#fff", fontFamily: "'Rajdhani', sans-serif", textDecoration: "none" }}>
              Explore Platform
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest border" style={{ fontFamily: "'Rajdhani', sans-serif", color: "#00d4aa", borderColor: "rgba(0,212,170,0.4)", background: "transparent", textDecoration: "none" }}>
              Request Demo
            </a>
          </m.div>

          <m.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-7 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {["Make in India", "Patent No. 202521117118", "MSME Certified", "ISO 27001"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4a5568" }}>{item}</span>
                {i < arr.length - 1 && <span className="w-px h-3" style={{ background: "rgba(255,255,255,0.07)" }} />}
              </span>
            ))}
          </m.div>
        </m.div>

        {/* RIGHT: SCHEMATIC PANEL */}
        <m.div variants={panelIn} initial="hidden" animate="show" className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[500px] flex flex-col relative overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(15,20,28,0.95)" }}>
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none animate-pulse" style={{ background: "linear-gradient(90deg, transparent, #1d6ff2, #00d4aa, transparent)" }} />

            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(29,111,242,0.04)" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8" }}>CYBO-VAJRA NODE v2.1</div>
              <div className="flex items-center gap-4" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}>
                <div className="flex items-center gap-1.5" style={{ color: "#22c55e" }}><LiveDot /> LIVE</div>
                <span style={{ color: "#4a5568" }}>{clock}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(10,13,20,0.5)" }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  style={{
                    flex: 1, padding: "10px 0", textAlign: "center" as const,
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.08em",
                    textTransform: "uppercase" as const, background: "transparent", border: "none",
                    borderBottom: `2px solid ${activeTab === tab.id ? "#1d6ff2" : "transparent"}`,
                    color: activeTab === tab.id ? "#1d6ff2" : "#4a5568",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SVG Canvas */}
            <div className="relative" style={{ minHeight: 280 }}>
              <AnimatePresence mode="wait">
                <m.div key={activeTab} variants={tabFade} initial="hidden" animate="show" exit="exit">
                  <CurrentSVG />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Telemetry strip */}
            <div className="grid grid-cols-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {tele.labels.map(([label], i) => (
                <div key={i} className="p-3 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#4a5568", textTransform: "uppercase" as const, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#e2e8f0" }}>
                    {teleValues[i]}<span style={{ fontSize: "9px", color: "#4a5568" }}>{tele.units[i]}</span>
                  </div>
                  <div style={{ fontSize: "9px", marginTop: 2 }} className={tele.trendColors[i]}>{tele.trends[i]}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(10,13,20,0.5)" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4a5568" }}>CYBO-VAJRA · {nodeCount.toLocaleString()} NODES · INDIA GRID</span>
              <div className="flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4a5568" }}>
                <span>LAST SYNC: {clock}</span>
                <span className="animate-pulse" style={{ color: "#1d6ff2" }}>█</span>
              </div>
            </div>
          </div>
        </m.div>
      </div>

      {/* ── SECTOR CARDS ── */}
      <div className="max-w-[1400px] mx-auto px-12 py-20 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, color: "#e2e8f0", marginBottom: 12 }}>
            Every Node.<br />Every Watt.<br /><span style={{ color: "#1d6ff2" }}>Monitored.</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.65, maxWidth: 440, marginTop: 12, marginBottom: 48 }}>
            From the transformer at your substation to the solar panel on your rooftop — CyboKrafts&apos; IoT intelligence layer watches everything, predicts failures before they happen.
          </p>
        </m.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {SECTORS.map((sector, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative p-7 border-r border-b overflow-hidden cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(15,20,28,1)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: sector.color }} />
              <div className="mb-2 text-base font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "#e2e8f0" }}>{sector.name}</div>
              <div className="mb-4 text-[13px] leading-relaxed" style={{ color: "#94a3b8" }}>{sector.desc}</div>
              <span className="inline-block px-2 py-1 text-[10px] border" style={{ fontFamily: "'JetBrains Mono', monospace", color: sector.color, borderColor: `${sector.color}33` }}>
                ■ {sector.stat}
              </span>
            </m.div>
          ))}
        </div>
      </div>

      {/* ── IOT STACK ── */}
      <div className="max-w-[1400px] mx-auto px-12 py-20 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#1d6ff2", marginBottom: 8 }}>// IoT ARCHITECTURE</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 44px)", color: "#e2e8f0", marginBottom: 8 }}>The Intelligence Stack</h2>
          <p style={{ color: "#4a5568", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>From sensor to decision in &lt; 50ms latency</p>
        </m.div>
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {IOT_LAYERS.map((layer, i) => (
            <div key={i} className="flex lg:flex-col items-center flex-1">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex-1 p-6 border"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(15,20,28,1)" }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4a5568", marginBottom: 8 }}>{layer.layer}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#e2e8f0", marginBottom: 6 }}>{layer.name}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6, marginBottom: 12 }}>{layer.detail}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: layer.color }}>{layer.version}</div>
              </m.div>
              {i < IOT_LAYERS.length - 1 && (
                <div className="w-10 lg:w-full h-10 lg:h-8 shrink-0 flex items-center justify-center">
                  <div style={{ background: `linear-gradient(90deg, ${layer.color}, ${IOT_LAYERS[i + 1].color})`, height: 1, width: "100%", position: "relative" }}>
                    <style>{`@keyframes flow-dot-${i} { from{left:0;opacity:1} to{left:100%;opacity:0} }`}</style>
                    <div style={{ position: "absolute", top: -3, width: 8, height: 8, background: layer.color, borderRadius: "50%", animation: `flow-dot-${i} 2s linear infinite` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="flex items-center justify-between flex-wrap gap-6 px-12 py-10 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", color: "#4a5568", fontSize: "16px", fontWeight: "bold" }}>CYBOKRAFTS</div>
        <div className="flex gap-6 flex-wrap">
          {["Patent No. 202521117118", "DPIIT Recognized Startup", "IIT Indore Incubated", "MSME Certified"].map((item) => (
            <span key={item} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4a5568" }}>{item}</span>
          ))}
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4a5568" }}>© 2025 CyboKrafts Pvt. Ltd.</span>
      </footer>
    </section>
  );
}