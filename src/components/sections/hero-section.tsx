"use client";

import { useEffect, useState, useRef } from "react";
import {
  m,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Fonts (add to your layout.tsx <head> if not already) ────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

// ─── Motion Variants ──────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: (d: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.85, delay: d, ease: EASE },
  }),
};

const wordAnim: Variants = {
  hidden: { opacity: 0, y: 44, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -44, filter: "blur(6px)", transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = { id: number; label: string; color: string; accent: string };

// ─── Constants ────────────────────────────────────────────────────────────────
const TABS: Tab[] = [
  { id: 0, label: "Transformer", color: "#2563eb", accent: "#eff6ff" },
  { id: 1, label: "Solar PV", color: "#d97706", accent: "#fefce8" },
  { id: 2, label: "Wind", color: "#7c3aed", accent: "#f5f3ff" },
  { id: 3, label: "EV Network", color: "#059669", accent: "#f0fdf4" },
];

// Dynamic headline words (rotates every 3 seconds)
const DYNAMIC_WORDS = [
  { word: "Energy", suffix: "Grid" },
  { word: "Solar", suffix: "Intelligence" },
  { word: "Wind", suffix: "Analytics" },
  { word: "EV", suffix: "Infrastructure" },
  { word: "Predictive", suffix: "Maintenance" },
];

// High-quality energy sector photography (Unsplash)
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&h=1080&fit=crop",      // Power lines / transformers
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&h=1080&fit=crop",      // Solar farm
  "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1920&h=1080&fit=crop",         // Wind turbines
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&h=1080&fit=crop",      // EV charging station
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&h=1080&fit=crop",      // Power plant / grid infrastructure
  "https://images.unsplash.com/photo-1566908827455-9f8d724a4701?w=1920&h=1080&fit=crop",      // Transformer substation
];

const METRICS = [
  [
    { label: "Load Factor", unit: "%", val: () => (84 + Math.random() * 0.6).toFixed(1) },
    { label: "Grid Freq", unit: "Hz", val: () => (49.97 + Math.random() * 0.05).toFixed(2) },
    { label: "Efficiency", unit: "%", val: () => (97.3 + Math.random() * 0.4).toFixed(1) },
    { label: "Faults", unit: "", val: () => "0" },
  ],
  [
    { label: "Irradiance", unit: "W/m²", val: () => (847 + Math.floor(Math.random() * 15)).toString() },
    { label: "PV Yield", unit: "kWh", val: () => (48.5 + Math.random() * 0.6).toFixed(1) },
    { label: "η Cell", unit: "%", val: () => (19.1 + Math.random() * 0.3).toFixed(1) },
    { label: "MPPT", unit: "", val: () => "LOCK" },
  ],
  [
    { label: "Wind Speed", unit: "m/s", val: () => (8.2 + Math.random() * 0.5).toFixed(1) },
    { label: "RPM", unit: "", val: () => (16.1 + Math.random() * 0.4).toFixed(1) },
    { label: "Output", unit: "MW", val: () => (2.38 + Math.random() * 0.05).toFixed(2) },
    { label: "Betz η", unit: "%", val: () => (41.1 + Math.random() * 0.4).toFixed(1) },
  ],
  [
    { label: "Active Ports", unit: "", val: () => (12 + Math.floor(Math.random() * 2)).toString() },
    { label: "Grid Load", unit: "kW", val: () => (347 + Math.floor(Math.random() * 10)).toString() },
    { label: "Sessions", unit: "", val: () => (28 + Math.floor(Math.random() * 3)).toString() },
    { label: "V2G", unit: "", val: () => "ON" },
  ],
];

const STATS = [
  { value: "2,847", label: "Nodes Online", color: "#2563eb" },
  { value: "99.7%", label: "Uptime SLA", color: "#059669" },
  { value: "<50ms", label: "AI Latency", color: "#7c3aed" },
  { value: "6 MW", label: "Power Saved", color: "#d97706" },
];

// ─── SVG Schematics ───────────────────────────────────────────────────────────

function TransformerSchematic() {
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="tw1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="tw2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <line x1="20" y1="110" x2="140" y2="110" stroke="url(#tw1)" strokeWidth="2" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
      </line>
      <text x="20" y="102" fill="#2563eb" fontSize="8" fontFamily="monospace" opacity="0.7">11kV INPUT</text>
      <circle cx="20" cy="110" r="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="140" y="55" width="180" height="110" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="140" y="55" width="180" height="110" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" />
      <rect x="155" y="70" width="65" height="75" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M155 85 Q170 85 170 97 Q170 110 155 110 M155 110 Q170 110 170 122 Q170 134 155 134" stroke="#2563eb" strokeWidth="1.5" fill="none" />
      <rect x="222" y="70" width="16" height="75" rx="2" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.6" />
      <rect x="240" y="70" width="65" height="75" rx="3" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M305 85 Q290 85 290 97 Q290 110 305 110 M305 110 Q290 110 290 122 Q290 134 305 134" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
      <circle cx="230" cy="44" r="11" fill="#fef9c3" stroke="#d97706" strokeWidth="1.2">
        <animate attributeName="r" values="11;13;11" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="230" y="48" fill="#d97706" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">67°C</text>
      <line x1="320" y1="110" x2="440" y2="110" stroke="url(#tw2)" strokeWidth="2" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1.2s" repeatCount="indefinite" />
      </line>
      <text x="345" y="102" fill="#0ea5e9" fontSize="8" fontFamily="monospace" opacity="0.7">415V OUTPUT</text>
      <circle cx="440" cy="110" r="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="20" y="152" width="130" height="52" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="28" y="166" fill="#2563eb" fontSize="7" fontFamily="monospace" fontWeight="600">ANALYSIS</text>
      <text x="28" y="179" fill="#475569" fontSize="8" fontFamily="monospace">THD: 2.3%  Load: 84%</text>
      <text x="28" y="193" fill="#059669" fontSize="8" fontFamily="monospace">STATUS: NOMINAL</text>
      <rect x="310" y="152" width="130" height="52" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <polyline
        points="318,187 326,175 334,187 342,170 350,187 358,178 366,187 374,172 382,187 390,177 398,187 406,173 414,187 422,176 428,187"
        fill="none" stroke="#0ea5e9" strokeWidth="1.2" opacity="0.85">
        <animate attributeName="points" dur="2s" repeatCount="indefinite"
          values="318,187 326,175 334,187 342,170 350,187 358,178 366,187 374,172 382,187 390,177 398,187 406,173 414,187 422,176 428,187;318,187 326,177 334,187 342,172 350,187 358,176 366,187 374,170 382,187 390,175 398,187 406,171 414,187 422,174 428,187;318,187 326,175 334,187 342,170 350,187 358,178 366,187 374,172 382,187 390,177 398,187 406,173 414,187 422,176 428,187" />
      </polyline>
    </svg>
  );
}

function SolarSchematic() {
  const sunRays = [0, 45, 90, 135, 180, 225, 270, 315];
  const panels: [number, number][] = [
    [60, 78], [140, 78], [220, 78], [300, 78],
    [60, 142], [140, 142], [220, 142], [300, 142],
  ];
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <circle cx="230" cy="32" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5">
        <animate attributeName="r" values="18;22;18" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="230" cy="32" r="10" fill="#fbbf24" opacity="0.85" />
      {sunRays.map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return <line key={i}
          x1={230 + Math.cos(r) * 23} y1={32 + Math.sin(r) * 23}
          x2={230 + Math.cos(r) * 31} y2={32 + Math.sin(r) * 31}
          stroke="#d97706" strokeWidth="1.5" opacity={i % 2 === 0 ? 0.7 : 0.35} />;
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
      <line x1="365" y1="142" x2="397" y2="142" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
      </line>
      <rect x="397" y="122" width="55" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.2" />
      <text x="424" y="139" fill="#d97706" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="600">MPPT</text>
      <text x="424" y="152" fill="#92400e" fontSize="7" fontFamily="monospace" textAnchor="middle">INVTR</text>
      <rect x="20" y="186" width="420" height="24" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="201" fill="#d97706" fontSize="8" fontFamily="monospace" fontWeight="600">48.7 kWh TODAY</text>
      <text x="160" y="201" fill="#475569" fontSize="8" fontFamily="monospace">|  η = 19.2%  |  847 W/m²</text>
      <text x="380" y="201" fill="#059669" fontSize="8" fontFamily="monospace">OK</text>
    </svg>
  );
}

function WindSchematic() {
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <style>{`
        .ts { animation: tspin 4s linear infinite; transform-origin: 230px 100px; }
        @keyframes tspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      {[40, 60, 80, 100, 120].map((y, i) => (
        <line key={i}
          x1={10 + i * 5} y1={y} x2={120 - i * 10} y2={y}
          stroke="#7c3aed" strokeWidth={1.2 - i * 0.15}
          strokeOpacity={0.15 + i * 0.03} strokeDasharray={`${6 - i} ${3 + i}`}>
          <animate attributeName="stroke-dashoffset" values={`0;${-(20 - i * 2)}`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}
      <line x1="230" y1="200" x2="230" y2="100" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="230" cy="200" rx="14" ry="5" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="218" y="94" width="24" height="12" rx="3" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
      <g className="ts">
        <path d="M230 100 L228 40 Q229 34 230 34 Q231 34 232 40 Z" fill="#a78bfa" opacity="0.9" />
        <path d="M230 100 L178 130 Q173 132 172 131 Q171 130 176 125 Z" fill="#a78bfa" opacity="0.9" />
        <path d="M230 100 L282 130 Q287 132 288 131 Q289 130 284 125 Z" fill="#a78bfa" opacity="0.9" />
        <circle cx="230" cy="100" r="7" fill="#7c3aed" />
        <circle cx="230" cy="100" r="3" fill="white" />
      </g>
      <line x1="230" y1="200" x2="345" y2="200" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <rect x="345" y="185" width="72" height="28" rx="3" fill="white" stroke="#7c3aed" strokeWidth="1" />
      <text x="381" y="202" fill="#7c3aed" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">SCADA</text>
      <rect x="10" y="152" width="160" height="58" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="20" y="167" fill="#7c3aed" fontSize="7" fontFamily="monospace" fontWeight="600">WIND METRICS</text>
      <text x="20" y="181" fill="#475569" fontSize="8" fontFamily="monospace">Speed: 8.4 m/s  RPM: 16.2</text>
      <text x="20" y="197" fill="#059669" fontSize="8" fontFamily="monospace">Output: 2.4 MW  η: 41.3%</text>
    </svg>
  );
}

function EVSchematic() {
  return (
    <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <rect x="28" y="55" width="78" height="125" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="38" y="70" width="58" height="40" rx="2" fill="#d1fae5" stroke="#059669" strokeWidth="0.8" />
      <text x="67" y="84" fill="#059669" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">76%</text>
      <text x="67" y="97" fill="#065f46" fontSize="7" fontFamily="monospace" textAnchor="middle">CHARGING</text>
      <rect x="38" y="117" width="58" height="9" rx="2" fill="#f0fdf4" stroke="#059669" strokeWidth="0.8" />
      <rect x="39" y="118" width="43" height="7" rx="1.5" fill="#059669">
        <animate attributeName="width" values="43;47;43" dur="3s" repeatCount="indefinite" />
      </rect>
      <circle cx="67" cy="152" r="7" fill="#d1fae5" stroke="#059669" strokeWidth="1">
        <animate attributeName="fill" values="#d1fae5;#6ee7b7;#d1fae5" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M106 117 C148 117 158 117 168 117" stroke="#059669" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <g transform="translate(168,80)">
        <path d="M0,60 L8,60 L12,38 L22,22 L58,18 L94,22 L104,38 L118,60 L126,60 L126,75 L0,75 Z" fill="white" stroke="#e2e8f0" strokeWidth="1.2" />
        <path d="M20,40 L25,24 L58,21 L91,24 L96,40 Z" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="0.6" />
        <circle cx="28" cy="78" r="13" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
        <circle cx="28" cy="78" r="7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
        <circle cx="98" cy="78" r="13" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
        <circle cx="98" cy="78" r="7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
        <rect x="42" y="53" width="42" height="10" rx="1.5" fill="#f0fdf4" stroke="#059669" strokeWidth="0.8" />
        <rect x="43" y="54" width="32" height="8" rx="1" fill="#059669" opacity="0.8">
          <animate attributeName="width" values="32;36;32" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="63" y="61" fill="white" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="700">⚡</text>
      </g>
      <rect x="368" y="55" width="84" height="125" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.2" />
      <text x="410" y="72" fill="#059669" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="600">NETWORK</text>
      <line x1="373" y1="78" x2="443" y2="78" stroke="#e2e8f0" strokeWidth="0.8" />
      <text x="377" y="93" fill="#475569" fontSize="8.5" fontFamily="monospace">Ports: 12</text>
      <text x="377" y="108" fill="#475569" fontSize="8.5" fontFamily="monospace">Load: 347kW</text>
      <text x="377" y="123" fill="#475569" fontSize="8.5" fontFamily="monospace">Sessions: 28</text>
      <text x="377" y="140" fill="#059669" fontSize="8.5" fontFamily="monospace">Queue: 3</text>
      <text x="377" y="157" fill="#d97706" fontSize="8.5" fontFamily="monospace">V2G: ON</text>
    </svg>
  );
}

const SCHEMATICS = [TransformerSchematic, SolarSchematic, WindSchematic, EVSchematic];

// ─── PulseDot ─────────────────────────────────────────────────────────────────
function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className="animate-ping absolute h-full w-full rounded-full opacity-50" style={{ backgroundColor: color }} />
      <span className="relative rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticBtn({
  children, href, style, className,
}: {
  children: React.ReactNode; href?: string; style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20 });
  const sy = useSpring(y, { stiffness: 280, damping: 20 });
  return (
    <m.a ref={ref} href={href || "#"} style={{ x: sx, y: sy, ...style }} className={className}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      {children}
    </m.a>
  );
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </m.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [metrics, setMetrics] = useState(() => METRICS[0].map((m) => m.val()));
  const [clock, setClock] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(5.75); // Higher base opacity for more visible background
  const [dynIdx, setDynIdx] = useState(0);
  const autoRef = useRef(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Clock
  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // BG image rotation — SLOWER: every 5 seconds for more visible transitions
  useEffect(() => {
    const id = setInterval(() => setBgIndex((p) => (p + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Scroll → fade bg opacity slightly but keep it visible (starts at 0.45, goes to 0.15)
  useEffect(() => {
    const onScroll = () => {
      const heroH = sectionRef.current?.offsetHeight ?? window.innerHeight;
      const ratio = Math.min(window.scrollY / (heroH * 0.8), 1);
      setBgOpacity(0.45 - ratio * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Metrics ticker
  useEffect(() => {
    const upd = () => setMetrics(METRICS[activeTab].map((m) => m.val()));
    upd();
    const id = setInterval(upd, 2000);
    return () => clearInterval(id);
  }, [activeTab]);

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      if (autoRef.current) setActiveTab((p) => (p + 1) % 4);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Dynamic headline rotation every 3 seconds
  useEffect(() => {
    const id = setInterval(() => setDynIdx((p) => (p + 1) % DYNAMIC_WORDS.length), 3000);
    return () => clearInterval(id);
  }, []);

  const tab = TABS[activeTab];
  const Schematic = SCHEMATICS[activeTab];
  const dynWord = DYNAMIC_WORDS[dynIdx];

  return (
    <>
      {/* ── Fonts ── */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');`}</style>

      {/* ── BACKGROUND SLIDESHOW ── */}
      {/* Higher base opacity (0.45) for more visible imagery, smoother crossfade (2.5s) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: bgOpacity, transition: "opacity 0.4s ease-out" }}>
        <AnimatePresence mode="wait">
          <m.div key={bgIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${BG_IMAGES[bgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </AnimatePresence>
        {/* Soft gradient overlay to maintain text readability while keeping background visible */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(248,250,252,0.65) 0%, rgba(248,250,252,0.5) 40%, rgba(248,250,252,0.75) 80%, rgba(248,250,252,0.95) 100%)",
        }} />
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center text-center px-6 lg:px-12 pt-24 pb-28"
        style={{ minHeight: "100vh", background: "transparent", zIndex: 1 }}>

        {/* Badge */}
        <m.div variants={fadeUp} custom={0} initial="hidden" animate="show" className="mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "white",
              border: "1px solid #e2e8f0",
              color: "#2563eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
            <PulseDot color="#2563eb" />
            DPIIT Recognized · IIT Indore Incubated · Patent Filed
          </span>
        </m.div>

        {/* ── DYNAMIC HEADLINE ── */}
        <m.div variants={fadeUp} custom={0.12} initial="hidden" animate="show" className="mb-8">
          {/* Line 1 - Static */}
          <div className="flex flex-wrap justify-center gap-x-4 leading-none mb-1">
            {["India's", "Intelligent"].map((w, i) => (
              <span key={i} style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 900,
                fontSize: "clamp(42px, 7vw, 92px)", letterSpacing: "-0.03em", lineHeight: 1.03,
                color: i === 1 ? "#2563eb" : "#0f172a",
              }}>{w}</span>
            ))}
          </div>

          {/* Line 2 - DYNAMIC (changes every 3 seconds) */}
          <div className="flex flex-wrap justify-center gap-x-4 overflow-hidden" style={{ minHeight: "1.06em" }}>
            <AnimatePresence mode="wait">
              <m.span key={`word-${dynIdx}`} variants={wordAnim} initial="hidden" animate="show" exit="exit"
                style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: 900,
                  fontSize: "clamp(42px, 7vw, 92px)", letterSpacing: "-0.03em", lineHeight: 1.03,
                  color: "#2563eb", display: "inline-block",
                }}>
                {dynWord.word}
              </m.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <m.span key={`suffix-${dynIdx}`} variants={wordAnim} initial="hidden" animate="show" exit="exit"
                style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: 900,
                  fontSize: "clamp(42px, 7vw, 92px)", letterSpacing: "-0.03em", lineHeight: 1.03,
                  color: "#0f172a", display: "inline-block",
                }}>
                {dynWord.suffix}
              </m.span>
            </AnimatePresence>
          </div>

          {/* Line 3 - Static */}
          <div className="flex flex-wrap justify-center gap-x-4 leading-none">
            {["AI", "Platform"].map((w, i) => (
              <span key={i} style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 900,
                fontSize: "clamp(42px, 7vw, 92px)", letterSpacing: "-0.03em", lineHeight: 1.03,
                color: i === 0 ? "#2563eb" : "#0f172a",
              }}>{w}</span>
            ))}
          </div>
        </m.div>

        {/* Subtext */}
        <m.p variants={fadeUp} custom={0.28} initial="hidden" animate="show"
          className="mb-12 max-w-2xl mx-auto"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "#334155", lineHeight: 1.7,
          }}>
          AI-powered IoT monitoring for transformers, solar farms, EV networks, and wind turbines — built in India, for India's grid future.
        </m.p>

        {/* CTAs */}
        <m.div variants={fadeUp} custom={0.4} initial="hidden" animate="show"
          className="flex flex-wrap gap-4 justify-center mb-16">
          <MagneticBtn href="#platform" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 12,
            background: "#2563eb", color: "#fff",
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 14,
            textDecoration: "none", boxShadow: "0 8px 28px rgba(37,99,235,0.28)",
          }}>
            Explore Platform <span style={{ fontSize: 16 }}>→</span>
          </MagneticBtn>
          <MagneticBtn href="#demo" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 12,
            background: "white", color: "#0f172a",
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 14,
            textDecoration: "none", border: "1.5px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}>
            Request Demo
          </MagneticBtn>
        </m.div>

        {/* Stats */}
        <m.div variants={fadeUp} custom={0.5} initial="hidden" animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mx-auto mb-16">
          {STATS.map(({ value, label, color }) => (
            <div key={label} style={{
              padding: "20px 12px", borderRadius: 14, textAlign: "center",
              background: "white", border: "1px solid #f1f5f9",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 26, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#94a3b8", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </m.div>

        {/* ── Schematic Panel ── */}
        <m.div variants={fadeUp} custom={0.6} initial="hidden" animate="show"
          className="w-full max-w-4xl mx-auto">

          <div style={{
            borderRadius: 20, overflow: "hidden",
            background: "white",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 24px 72px rgba(0,0,0,0.09)",
          }}>
            {/* Top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 20px", borderBottom: "1px solid #f1f5f9",
              background: "#fafbfc",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#94a3b8" }}>
                <PulseDot color="#059669" />
                CYBO-VAJRA NODE v2.1
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#94a3b8" }}>
                {clock} IST
              </span>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9" }}>
              {TABS.map((t) => (
                <button key={t.id}
                  onClick={() => { autoRef.current = false; setActiveTab(t.id); }}
                  style={{
                    flex: 1, padding: "12px 4px", border: "none", cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    letterSpacing: "0.05em", textTransform: "uppercase",
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
            <div style={{ position: "relative", minHeight: 240, padding: "16px 12px 8px", background: "white" }}>
              <AnimatePresence mode="wait">
                <m.div key={activeTab}
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE } }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.25 } }}>
                  <Schematic />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Telemetry strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid #f1f5f9" }}>
              {METRICS[activeTab].map(({ label, unit }, i) => (
                <div key={i} style={{
                  padding: 12, textAlign: "center",
                  borderRight: i < 3 ? "1px solid #f1f5f9" : "none",
                  background: "white",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                  <AnimatePresence mode="wait">
                    <m.div key={metrics[i]}
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600, color: "#0f172a" }}>
                      {metrics[i]}<span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 400 }}>{unit ? ` ${unit}` : ""}</span>
                    </m.div>
                  </AnimatePresence>
                  <div style={{ fontSize: 8, color: "#059669", marginTop: 3 }}>Live</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 20px", borderTop: "1px solid #f1f5f9", background: "#fafbfc",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#94a3b8" }}>
                2,847 NODES · INDIA GRID · LAST SYNC: {clock}
              </span>
              <span className="animate-pulse" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: tab.color }}>
                ● LIVE
              </span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {["Make in India", "Patent No. 202521117118", "MSME Certified"].map((item) => (
              <span key={item} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                color: "#94a3b8", padding: "4px 14px", borderRadius: 999,
                border: "1px solid #e2e8f0", background: "white",
              }}>{item}</span>
            ))}
          </div>
        </m.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTORS SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative px-6 lg:px-12 pb-28"
        style={{ background: "#f8fafc", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2563eb", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>
            SECTORS WE COVER
          </p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(28px,4.5vw,52px)", color: "#0f172a", lineHeight: 1.1, textAlign: "center", marginBottom: 14 }}>
            Every Node. Every Watt.<br /><span style={{ color: "#2563eb" }}>Monitored.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "#64748b", maxWidth: 520, margin: "0 auto 48px", textAlign: "center", lineHeight: 1.65 }}>
            From transformers at your substation to solar panels on rooftops — CyboKrafts watches everything and predicts failures before they happen.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { color: "#2563eb", bg: "#eff6ff", icon: "⚡", name: "Power Transformers", desc: "Real-time temperature, load, THD, and fault prediction for distribution and power transformers.", tag: "11kV – 220kV range" },
            { color: "#d97706", bg: "#fefce8", icon: "☀️", name: "Solar PV Systems", desc: "Panel-level IV tracing, MPPT optimization, shade analysis, and inverter health monitoring.", tag: "1kW – 100MW farms" },
            { color: "#7c3aed", bg: "#f5f3ff", icon: "💨", name: "Wind Turbines", desc: "Vibration analysis, gearbox health, pitch optimization, and predictive maintenance via SCADA.", tag: "250kW – 5MW units" },
            { color: "#059669", bg: "#f0fdf4", icon: "🔌", name: "EV Charging Networks", desc: "Smart load balancing across CCS2/CHAdeMO/AC chargers, V2G monitoring, fleet optimization.", tag: "V2G + OCPP 2.0.1" },
            { color: "#0ea5e9", bg: "#f0f9ff", icon: "📡", name: "Smart Metering (AMI)", desc: "Tamper detection, power quality analysis, and automated demand response integration.", tag: "HAN + WAN + NAN" },
            { color: "#e11d48", bg: "#fff1f2", icon: "🏗️", name: "Substations & Grid", desc: "Protection relay coordination, busbar monitoring, and real-time fault location for substations.", tag: "IEC 61850 / DNP3" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <m.div whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  padding: 24, borderRadius: 16, cursor: "default",
                  background: "white", border: "1.5px solid #f1f5f9",
                }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, fontSize: 18 }}>
                  {s.icon}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>{s.name}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</div>
                <span style={{ display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, padding: "3px 10px", borderRadius: 999, color: s.color, background: s.bg }}>{s.tag}</span>
              </m.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          IoT STACK
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 lg:px-12 pb-28" style={{ background: "#f8fafc", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2563eb", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>
            IoT ARCHITECTURE
          </p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(28px,3.5vw,48px)", color: "#0f172a", textAlign: "center", marginBottom: 8 }}>
            The Intelligence Stack
          </h2>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#94a3b8", textAlign: "center", marginBottom: 40 }}>
            Sensor → Decision in less than 50ms
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderRadius: 16, overflow: "hidden", border: "1.5px solid #e2e8f0" }}>
          {[
            { layer: "Layer 1", name: "Edge Sensors", detail: "CTs, PTs, vibration, temp, pH, gas sensors — hardened for field deployment", version: "CYBO-EDGE v3", color: "#2563eb" },
            { layer: "Layer 2", name: "IoT Gateway", detail: "Local processing, protocol translation (Modbus → MQTT/AMQP), edge inference", version: "CYBO-GATE v2.1", color: "#0ea5e9" },
            { layer: "Layer 3", name: "AI Engine", detail: "Time-series anomaly detection, predictive maintenance models, load forecasting", version: "VAJRA-AI v1.4", color: "#7c3aed" },
            { layer: "Layer 4", name: "Dashboard", detail: "Real-time web/mobile dashboards, alerts, SCADA integration, audit trails", version: "CYBO-CTRL", color: "#059669" },
          ].map((layer, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                padding: "28px 22px", background: "white", height: "100%",
                borderRight: i < 3 ? "1px solid #e2e8f0" : "none",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#94a3b8", marginBottom: 8 }}>{layer.layer}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 8 }}>{layer.name}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#64748b", lineHeight: 1.65, marginBottom: 12 }}>{layer.detail}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: layer.color }}>{layer.version}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}