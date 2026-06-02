"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { m, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Motion variants ──────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const wordAnim: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = { id: number; label: string; color: string; accent: string };

// ─── Constants ────────────────────────────────────────────────────────────────
const TABS: Tab[] = [
  { id: 0, label: "Transformer", color: "#2563eb", accent: "#dbeafe" },
  { id: 1, label: "Solar PV",    color: "#d97706", accent: "#fef3c7" },
  { id: 2, label: "Wind",        color: "#7c3aed", accent: "#ede9fe" },
  { id: 3, label: "EV Network",  color: "#059669", accent: "#d1fae5" },
];

const METRICS = [
  [
    { label: "Load Factor", value: () => (84 + Math.random() * 0.6).toFixed(1), unit: "%", good: true },
    { label: "Grid Freq",   value: () => (49.97 + Math.random() * 0.05).toFixed(2), unit: "Hz", good: true },
    { label: "Efficiency",  value: () => (97.3 + Math.random() * 0.4).toFixed(1), unit: "%", good: true },
    { label: "Faults",      value: () => "0", unit: "", good: true },
  ],
  [
    { label: "Irradiance",  value: () => (847 + Math.floor(Math.random() * 15)).toString(), unit: "W/m²", good: true },
    { label: "PV Yield",    value: () => (48.5 + Math.random() * 0.6).toFixed(1), unit: "kWh", good: true },
    { label: "η Cell",      value: () => (19.1 + Math.random() * 0.3).toFixed(1), unit: "%", good: true },
    { label: "MPPT",        value: () => "LOCK", unit: "", good: true },
  ],
  [
    { label: "Wind Speed",  value: () => (8.2 + Math.random() * 0.5).toFixed(1), unit: "m/s", good: true },
    { label: "RPM",         value: () => (16.1 + Math.random() * 0.4).toFixed(1), unit: "", good: true },
    { label: "Output",      value: () => (2.38 + Math.random() * 0.05).toFixed(2), unit: "MW", good: true },
    { label: "Betz η",      value: () => (41.1 + Math.random() * 0.4).toFixed(1), unit: "%", good: true },
  ],
  [
    { label: "Active Ports", value: () => (12 + Math.floor(Math.random() * 2)).toString(), unit: "", good: true },
    { label: "Grid Load",   value: () => (347 + Math.floor(Math.random() * 10)).toString(), unit: "kW", good: true },
    { label: "Sessions",    value: () => (28 + Math.floor(Math.random() * 3)).toString(), unit: "", good: true },
    { label: "V2G",         value: () => "ON", unit: "", good: true },
  ],
];

const STATS = [
  { value: "2,847", label: "Nodes Online", color: "#2563eb" },
  { value: "99.7%", label: "Uptime SLA",   color: "#059669" },
  { value: "<50ms", label: "AI Latency",   color: "#7c3aed" },
  { value: "6 MW",  label: "Power Saved",  color: "#d97706" },
];

// Background video frames (energy infrastructure imagery)
const BG_FRAMES = [
  "https://images.unsplash.com/photo-1566908827455-9f8d724a4701?w=1600&h=900&fit=crop", // Transformer yard
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&h=900&fit=crop", // Solar farm
  "https://images.unsplash.com/photo-1518803439556-60cf7f736bae?w=1600&h=900&fit=crop", // Wind turbines
  "https://images.unsplash.com/photo-1487754180451-c456f719a49f?w=1600&h=900&fit=crop", // EV charging
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute h-full w-full rounded-full opacity-50" style={{ backgroundColor: color }} />
      <span className="relative rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  );
}

// ─── SVG Schematics (clean, professional, no emojis) ─────────────────────────

function TransformerSchematic() {
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <pattern id="lg" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#2563eb" strokeWidth="0.3" strokeOpacity="0.12" />
        </pattern>
        <linearGradient id="wire1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="wire2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="460" height="220" fill="url(#lg)" />
      <line x1="20" y1="110" x2="140" y2="110" stroke="url(#wire1)" strokeWidth="2">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
      </line>
      <text x="20" y="102" fill="#2563eb" fontSize="8" fontFamily="monospace" opacity="0.7">11kV INPUT</text>
      <circle cx="20" cy="110" r="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="140" y="60" width="180" height="100" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="140" y="60" width="180" height="100" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="155" y="75" width="65" height="70" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M155 90 Q170 90 170 100 Q170 110 155 110 M155 110 Q170 110 170 120 Q170 130 155 130" stroke="#2563eb" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
      <text x="172" y="115" fill="#2563eb" fontSize="8" fontFamily="monospace" opacity="0.6">PRI</text>
      <rect x="222" y="75" width="16" height="70" rx="2" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.5" />
      <rect x="240" y="75" width="65" height="70" rx="3" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M305 90 Q290 90 290 100 Q290 110 305 110 M305 110 Q290 110 290 120 Q290 130 305 130" stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
      <text x="245" y="115" fill="#0ea5e9" fontSize="8" fontFamily="monospace" opacity="0.6">SEC</text>
      <circle cx="230" cy="50" r="10" fill="#fef9c3" stroke="#d97706" strokeWidth="1.2">
        <animate attributeName="r" values="10;12;10" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="230" y="54" fill="#d97706" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">67°C</text>
      <line x1="320" y1="110" x2="440" y2="110" stroke="url(#wire2)" strokeWidth="2">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1.2s" repeatCount="indefinite" />
      </line>
      <text x="350" y="102" fill="#0ea5e9" fontSize="8" fontFamily="monospace" opacity="0.7">415V OUTPUT</text>
      <circle cx="440" cy="110" r="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="20" y="150" width="130" height="55" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="28" y="165" fill="#2563eb" fontSize="7" fontFamily="monospace" fontWeight="600">ANALYSIS</text>
      <text x="28" y="178" fill="#475569" fontSize="8.5" fontFamily="monospace">THD: 2.3%  Load: 84%</text>
      <text x="28" y="191" fill="#059669" fontSize="8.5" fontFamily="monospace">STATUS: NOMINAL</text>
      <rect x="310" y="150" width="130" height="55" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="318" y="165" fill="#0ea5e9" fontSize="7" fontFamily="monospace" fontWeight="600">WAVEFORM</text>
      <polyline points="318,185 326,174 334,185 342,170 350,185 358,177 366,185 374,172 382,185 390,176 398,185 406,173 414,185 422,175 428,185"
        fill="none" stroke="#0ea5e9" strokeWidth="1.2" opacity="0.85">
        <animate attributeName="points" dur="2s" repeatCount="indefinite"
          values="318,185 326,174 334,185 342,170 350,185 358,177 366,185 374,172 382,185 390,176 398,185 406,173 414,185 422,175 428,185;
                  318,185 326,176 334,185 342,172 350,185 358,175 366,185 374,170 382,185 390,174 398,185 406,171 414,185 422,173 428,185;
                  318,185 326,174 334,185 342,170 350,185 358,177 366,185 374,172 382,185 390,176 398,185 406,173 414,185 422,175 428,185" />
      </polyline>
    </svg>
  );
}

function SolarSchematic() {
  const panels = [
    [60, 80], [140, 80], [220, 80], [300, 80],
    [60, 145], [140, 145], [220, 145], [300, 145],
  ];
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <pattern id="sg" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#d97706" strokeWidth="0.3" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="460" height="220" fill="url(#sg)" />
      <circle cx="230" cy="32" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5">
        <animate attributeName="r" values="16;20;16" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="230" cy="32" r="9" fill="#fbbf24" opacity="0.8" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return <line key={i} x1={230 + Math.cos(r) * 21} y1={32 + Math.sin(r) * 21}
          x2={230 + Math.cos(r) * 28} y2={32 + Math.sin(r) * 28}
          stroke="#d97706" strokeWidth="1.5" opacity={i % 2 === 0 ? 0.7 : 0.4} />;
      })}
      {panels.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="65" height="50" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1={x} y1={y + 16} x2={x + 65} y2={y + 16} stroke="#2563eb" strokeWidth="0.4" strokeOpacity="0.4" />
          <line x1={x} y1={y + 33} x2={x + 65} y2={y + 33} stroke="#2563eb" strokeWidth="0.4" strokeOpacity="0.4" />
          <line x1={x + 21} y1={y} x2={x + 21} y2={y + 50} stroke="#2563eb" strokeWidth="0.4" strokeOpacity="0.4" />
          <line x1={x + 43} y1={y} x2={x + 43} y2={y + 50} stroke="#2563eb" strokeWidth="0.4" strokeOpacity="0.4" />
          <rect x={x} y={y} width="65" height="50" rx="2" fill="#fbbf24" opacity="0">
            <animate attributeName="opacity" values="0;0.08;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.15}s`} />
          </rect>
        </g>
      ))}
      <line x1="365" y1="145" x2="395" y2="145" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
      </line>
      <rect x="395" y="125" width="55" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.2" />
      <text x="422" y="141" fill="#d97706" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="600">MPPT</text>
      <text x="422" y="153" fill="#92400e" fontSize="7" fontFamily="monospace" textAnchor="middle">INVTR</text>
      <rect x="20" y="185" width="420" height="24" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="200" fill="#d97706" fontSize="8" fontFamily="monospace" fontWeight="600">48.7 kWh TODAY</text>
      <text x="160" y="200" fill="#475569" fontSize="8" fontFamily="monospace">|  η = 19.2%</text>
      <text x="265" y="200" fill="#475569" fontSize="8" fontFamily="monospace">|  IRRADIANCE: 847 W/m²</text>
      <text x="400" y="200" fill="#059669" fontSize="8" fontFamily="monospace">OK</text>
    </svg>
  );
}

function WindSchematic() {
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <pattern id="wg" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#7c3aed" strokeWidth="0.3" strokeOpacity="0.1" />
        </pattern>
        <style>{`.turbine-spin { animation: tspin 4s linear infinite; transform-origin: 230px 100px; }`}
          {`@keyframes tspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </defs>
      <rect width="460" height="220" fill="url(#wg)" />
      {[40, 65, 90, 110, 130].map((y, i) => (
        <line key={i} x1={10 + i * 5} y1={y} x2={110 - i * 8} y2={y}
          stroke="#7c3aed" strokeWidth={1.2 - i * 0.15} strokeOpacity={0.15 + i * 0.02} strokeDasharray={`${6 - i} ${3 + i}`}>
          <animate attributeName="stroke-dashoffset" values={`0;-${20 - i * 2}`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}
      <line x1="230" y1="200" x2="230" y2="100" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="230" cy="200" rx="12" ry="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="218" y="94" width="24" height="12" rx="3" fill="#e0e7ff" stroke="#7c3aed" strokeWidth="1" />
      <g className="turbine-spin">
        <path d="M230 100 L228 42 Q229 36 230 36 Q231 36 232 42 Z" fill="#a78bfa" opacity="0.85" />
        <path d="M230 100 L180 128 Q175 130 174 129 Q173 128 178 123 Z" fill="#a78bfa" opacity="0.85" />
        <path d="M230 100 L280 128 Q285 130 286 129 Q287 128 282 123 Z" fill="#a78bfa" opacity="0.85" />
        <circle cx="230" cy="100" r="6" fill="#7c3aed" />
        <circle cx="230" cy="100" r="3" fill="white" />
      </g>
      <line x1="230" y1="200" x2="340" y2="200" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <rect x="340" y="183" width="70" height="28" rx="3" fill="white" stroke="#7c3aed" strokeWidth="1" />
      <text x="375" y="200" fill="#7c3aed" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">SCADA</text>
      <rect x="10" y="155" width="155" height="56" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="20" y="170" fill="#7c3aed" fontSize="7" fontFamily="monospace" fontWeight="600">WIND METRICS</text>
      <text x="20" y="184" fill="#475569" fontSize="8.5" fontFamily="monospace">Speed: 8.4 m/s  RPM: 16.2</text>
      <text x="20" y="198" fill="#059669" fontSize="8.5" fontFamily="monospace">Output: 2.4 MW  η: 41.3%</text>
    </svg>
  );
}

function EVSchematic() {
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <pattern id="evg" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#059669" strokeWidth="0.3" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="460" height="220" fill="url(#evg)" />
      <rect x="30" y="60" width="75" height="120" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="40" y="75" width="55" height="35" rx="2" fill="#d1fae5" stroke="#059669" strokeWidth="0.8" />
      <text x="67" y="88" fill="#059669" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">76%</text>
      <text x="67" y="100" fill="#065f46" fontSize="7" fontFamily="monospace" textAnchor="middle">CHARGING</text>
      <rect x="40" y="117" width="55" height="8" rx="2" fill="#f0fdf4" stroke="#059669" strokeWidth="0.8" />
      <rect x="41" y="118" width="41" height="6" rx="1.5" fill="#059669">
        <animate attributeName="width" values="41;44;41" dur="3s" repeatCount="indefinite" />
      </rect>
      <circle cx="67" cy="155" r="6" fill="#d1fae5" stroke="#059669" strokeWidth="1">
        <animate attributeName="fill" values="#d1fae5;#6ee7b7;#d1fae5" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="67" y="172" fill="#059669" fontSize="6" fontFamily="monospace" textAnchor="middle">ACTIVE</text>
      <path d="M105 120 C145 120 155 120 165 120" stroke="#059669" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <g transform="translate(165, 80)">
        <path d="M0,60 L8,60 L12,38 L22,22 L58,18 L94,22 L104,38 L118,60 L126,60 L126,75 L0,75 Z"
          fill="white" stroke="#e2e8f0" strokeWidth="1.2" />
        <path d="M20,40 L25,24 L58,21 L91,24 L96,40 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="0.6" />
        <circle cx="28" cy="78" r="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
        <circle cx="28" cy="78" r="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
        <circle cx="98" cy="78" r="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
        <circle cx="98" cy="78" r="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
        <rect x="42" y="55" width="42" height="9" rx="1.5" fill="#f0fdf4" stroke="#059669" strokeWidth="0.8" />
        <rect x="43" y="56" width="31" height="7" rx="1" fill="#059669" opacity="0.8">
          <animate attributeName="width" values="31;34;31" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="63" y="62" fill="white" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="700">⚡</text>
      </g>
      <rect x="365" y="60" width="85" height="120" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.2" />
      <text x="407" y="76" fill="#059669" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="600">NETWORK</text>
      <line x1="373" y1="82" x2="441" y2="82" stroke="#e2e8f0" strokeWidth="0.8" />
      <text x="373" y="96" fill="#475569" fontSize="8.5" fontFamily="monospace">Ports: 12</text>
      <text x="373" y="111" fill="#475569" fontSize="8.5" fontFamily="monospace">Load: 347kW</text>
      <text x="373" y="126" fill="#475569" fontSize="8.5" fontFamily="monospace">Sessions: 28</text>
      <text x="373" y="141" fill="#059669" fontSize="8.5" fontFamily="monospace">Queue: 3</text>
      <text x="373" y="158" fill="#d97706" fontSize="8.5" fontFamily="monospace">V2G: ON</text>
    </svg>
  );
}

const SCHEMATICS = [TransformerSchematic, SolarSchematic, WindSchematic, EVSchematic];

// ─── Magnetic cursor button ───────────────────────────────────────────────────
function MagneticBtn({ children, style, className, href }: {
  children: React.ReactNode; style?: React.CSSProperties; className?: string; href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <m.a
      ref={ref}
      href={href || "#"}
      style={{ x: sx, y: sy, ...style }}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </m.a>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  return (
    <m.span
      onViewportEnter={() => {
        if (ref.current) return; ref.current = true;
        let start = 0; const end = to;
        const step = Math.ceil(end / (duration * 60));
        const id = setInterval(() => {
          start = Math.min(start + step, end);
          setVal(start);
          if (start >= end) clearInterval(id);
        }, 1000 / 60);
      }}
    >{val.toLocaleString()}</m.span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [metrics, setMetrics] = useState(METRICS[0].map((m) => m.value()));
  const [clock, setClock] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const autoRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax mouse effect
  const mouseX = useMotionValue(0.5); const mouseY = useMotionValue(0.5);
  const blobX = useTransform(mouseX, [0, 1], ["-4%", "4%"]);
  const blobY = useTransform(mouseY, [0, 1], ["-4%, "4%"]);

  // Clock update
  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  // Metrics update for active tab
  useEffect(() => {
    const upd = () => setMetrics(METRICS[activeTab].map((m) => m.value()));
    upd(); const id = setInterval(upd, 2000); return () => clearInterval(id);
  }, [activeTab]);

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      if (autoRef.current) setActiveTab((p) => (p + 1) % 4);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Rotate background images every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BG_FRAMES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const tab = TABS[activeTab];
  const Schematic = SCHEMATICS[activeTab];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", background: "#f8fafc" }}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
    >
      {/* Rotating Background Image Frames */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <m.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${BG_FRAMES[bgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.08) contrast(1.2) saturate(0.9)",
            }}
          />
        </AnimatePresence>
      </div>

      {/* Ambient blobs */}
      <m.div className="absolute pointer-events-none z-0" style={{ x: blobX, y: blobY, top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "40% 60% 70% 30% / 30% 40% 60% 70%", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
      <m.div className="absolute pointer-events-none z-0" style={{ bottom: "-15%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* ── CENTERED HERO CONTENT ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-12 pt-20 pb-24 flex flex-col items-center text-center">

        {/* Badge */}
        <m.div variants={fadeUp} custom={0} initial="hidden" animate="show" className="mb-8">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace", background: "white", border: "1px solid #e2e8f0", color: "#2563eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <PulseDot color="#2563eb" />
            DPIIT Recognized · IIT Indore Incubated · Patent Filed
          </span>
        </m.div>

        {/* Headline - Centered */}
        <m.div variants={stagger} initial="hidden" animate="show" className="mb-8 text-center" style={{ perspective: 1200 }}>
          {[
            [{ t: "India's", a: false }, { t: "Intelligent", a: true }],
            [{ t: "Energy", a: false }, { t: "Infrastructure", a: false }],
            [{ t: "AI", a: true }, { t: "Platform", a: false }],
          ].map((line, li) => (
            <div key={li} className="flex flex-wrap justify-center gap-x-4 leading-none mb-1">
              {line.map(({ t, a }, wi) => (
                <m.span key={wi} variants={wordAnim}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(44px, 7vw, 88px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    color: a ? "#2563eb" : "#0f172a",
                    display: "inline-block",
                  }}>
                  {t}
                </m.span>
              ))}
            </div>
          ))}
        </m.div>

        {/* Subtext - Centered */}
        <m.p variants={fadeUp} custom={0.5} initial="hidden" animate="show"
          className="mb-12 text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65 }}>
          AI-powered IoT monitoring for transformers, solar farms, EV networks, and wind turbines — built in India, for India's grid future.
        </m.p>

        {/* CTAs - Centered */}
        <m.div variants={fadeUp} custom={0.6} initial="hidden" animate="show" className="flex flex-wrap gap-4 justify-center mb-16">
          <MagneticBtn
            href="#platform"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{ background: "#2563eb", color: "white", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", boxShadow: "0 8px 24px rgba(37,99,235,0.25)" }}>
            Explore Platform
            <span style={{ fontSize: 16 }}>→</span>
          </MagneticBtn>
          <MagneticBtn
            href="#demo"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{ background: "white", color: "#0f172a", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", border: "1.5px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            Request Demo
          </MagneticBtn>
        </m.div>

        {/* Stats row - Centered */}
        <m.div variants={fadeUp} custom={0.7} initial="hidden" animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 w-full max-w-3xl mx-auto mb-20">
          {STATS.map(({ value, label, color }) => (
            <div key={label} className="p-5 rounded-xl text-center" style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "26px", color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94a3b8", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </m.div>

        {/* Schematic Panel - Centered */}
        <m.div variants={fadeUp} custom={0.3} initial="hidden" animate="show" className="w-full max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1.5px solid #e2e8f0", boxShadow: "0 24px 80px rgba(0,0,0,0.08)" }}>

            {/* Panel top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "#f1f5f9", background: "#fafbfc" }}>
              <div className="flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8" }}>
                <PulseDot color="#059669" />
                <span>CYBO-VAJRA NODE v2.1</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8" }}>
                {clock} IST
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: "#f1f5f9" }}>
              {TABS.map((t) => (
                <button key={t.id}
                  onClick={() => { autoRef.current = false; setActiveTab(t.id); }}
                  style={{
                    flex: 1, padding: "12px 4px", border: "none", cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    background: activeTab === t.id ? t.accent : "transparent",
                    color: activeTab === t.id ? t.color : "#94a3b8",
                    borderBottom: `2px solid ${activeTab === t.id ? t.color : "transparent"}`,
                    transition: "all 0.2s",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Schematic canvas */}
            <div className="relative" style={{ minHeight: 240, padding: "16px 12px 8px" }}>
              <AnimatePresence mode="wait">
                <m.div key={activeTab}
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.25 } }}>
                  <Schematic />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Telemetry strip */}
            <div className="grid grid-cols-4 border-t" style={{ borderColor: "#f1f5f9" }}>
              {METRICS[activeTab].map(({ label, unit }, i) => (
                <div key={i} className="p-3 border-r last:border-r-0 text-center" style={{ borderColor: "#f1f5f9" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                  <AnimatePresence mode="wait">
                    <m.div key={metrics[i]}
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>
                      {metrics[i]}<span style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 400 }}>{unit && ` ${unit}`}</span>
                    </m.div>
                  </AnimatePresence>
                  <div style={{ fontSize: "9px", color: "#059669", marginTop: 3 }}>Live</div>
                </div>
              ))}
            </div>

            {/* Panel footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t" style={{ borderColor: "#f1f5f9", background: "#fafbfc" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#94a3b8" }}>
                2,847 NODES · INDIA GRID · LAST SYNC: {clock}
              </span>
              <span className="animate-pulse" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: tab.color }}>LIVE</span>
            </div>
          </div>

          {/* Trust badges - Centered */}
          <m.div variants={fadeUp} custom={0.5} initial="hidden" animate="show"
            className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {["Make in India", "Patent No. 202521117118", "MSME Certified"].map((item) => (
              <span key={item} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#94a3b8",
                padding: "4px 12px", borderRadius: 99, background: "white",
                border: "1px solid #e2e8f0",
              }}>{item}</span>
            ))}
          </m.div>
        </m.div>

        {/* ── SECTORS SECTION (Centered) ── */}
        <div className="w-full mt-28">
          <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#2563eb", marginBottom: 8, letterSpacing: "0.04em" }}>SECTORS WE COVER</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", color: "#0f172a", lineHeight: 1.1 }}>
              Every Node. Every Watt.<br /><span style={{ color: "#2563eb" }}>Monitored.</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.65, maxWidth: 560, margin: "12px auto 0" }}>
              From transformers at your substation to solar panels on rooftops — CyboKrafts watches everything and predicts failures before they happen.
            </p>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { color: "#2563eb", bg: "#eff6ff", name: "Power Transformers", desc: "Real-time temperature, load, THD, and fault prediction for distribution and power transformers.", stat: "11kV – 220kV range" },
              { color: "#d97706", bg: "#fefce8", name: "Solar PV Systems", desc: "Panel-level IV tracing, MPPT optimization, shade analysis, and inverter health monitoring.", stat: "1kW – 100MW farms" },
              { color: "#7c3aed", bg: "#f5f3ff", name: "Wind Turbines", desc: "Vibration analysis, gearbox health, pitch optimization, and predictive maintenance via SCADA.", stat: "250kW – 5MW units" },
              { color: "#059669", bg: "#f0fdf4", name: "EV Charging Networks", desc: "Smart load balancing across CCS2/CHAdeMO/AC chargers, V2G monitoring, fleet optimization.", stat: "V2G + OCPP 2.0.1" },
              { color: "#0ea5e9", bg: "#f0f9ff", name: "Smart Metering (AMI)", desc: "Tamper detection, power quality analysis, and automated demand response integration.", stat: "HAN + WAN + NAN" },
              { color: "#e11d48", bg: "#fff1f2", name: "Substations & Grid", desc: "Protection relay coordination, busbar monitoring, and real-time fault location for substations.", stat: "IEC 61850 / DNP3" },
            ].map((s, i) => (
              <m.div key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
                className="p-6 rounded-2xl cursor-pointer text-left"
                style={{ background: "white", border: "1.5px solid #f1f5f9", transition: "box-shadow 0.3s" }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4" style={{ background: s.bg }}>
                  <span style={{ color: s.color, fontSize: "18px" }}>●</span>
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "17px", color: "#0f172a", marginBottom: 8 }}>{s.name}</div>
                <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: s.color, background: s.bg }}>
                  {s.stat}
                </span>
              </m.div>
            ))}
          </div>
        </div>

        {/* ── IoT STACK (Centered) ── */}
        <div className="w-full mt-28">
          <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#2563eb", marginBottom: 8, letterSpacing: "0.04em" }}>IoT ARCHITECTURE</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#0f172a", marginBottom: 8 }}>
              The Intelligence Stack
            </h2>
            <p style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>Sensor → Decision in less than 50ms</p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e2e8f0" }}>
            {[
              { layer: "Layer 1", name: "Edge Sensors", detail: "CTs, PTs, vibration, temp, pH, gas sensors — hardened for field deployment", version: "CYBO-EDGE v3", color: "#2563eb" },
              { layer: "Layer 2", name: "IoT Gateway", detail: "Local processing, protocol translation (Modbus → MQTT/AMQP), edge inference", version: "CYBO-GATE v2.1", color: "#0ea5e9" },
              { layer: "Layer 3", name: "AI Engine", detail: "Time-series anomaly detection, predictive maintenance models, load forecasting", version: "VAJRA-AI v1.4", color: "#7c3aed" },
              { layer: "Layer 4", name: "Dashboard", detail: "Real-time web/mobile dashboards, alerts, SCADA integration, audit trails", version: "CYBO-CTRL", color: "#059669" },
            ].map((layer, i) => (
              <m.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-6 lg:border-r last:border-r-0 border-b lg:border-b-0 text-left"
                style={{ borderColor: "#e2e8f0", background: "white", position: "relative" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#94a3b8", marginBottom: 8 }}>{layer.layer}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "18px", color: "#0f172a", marginBottom: 6 }}>{layer.name}</div>
                <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: 12 }}>{layer.detail}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 600, color: layer.color }}>{layer.version}</div>
              </m.div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}