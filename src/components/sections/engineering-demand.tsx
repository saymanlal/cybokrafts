"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

interface DemandItem {
  title: string;
  subtitle: string;
  primaryStat: string;
  primaryLabel: string;
  secondaryStat: string;
  secondaryLabel: string;
  complianceCode: string;
  dialPercentage: number;
}

const demandData: DemandItem[] = [
  {
    title: "Transformer Intelligence Upgrades",
    subtitle: "GRID INFRASTRUCTURE DIAGNOSTICS",
    primaryStat: "120K+",
    primaryLabel: "DISTRIBUTION TRANSFORMERS REQUIRING LIVE SENSORS",
    secondaryStat: "44%",
    secondaryLabel: "EXPECTED FAILURE DOWNTIME REDUCTION INDEX",
    complianceCode: "DPIIT-TX-2026",
    dialPercentage: 82,
  },
  {
    title: "Renewable Load Balancing Demand",
    subtitle: "SOLAR & STORAGE HARMONIC INTEGRATION",
    primaryStat: "24.5 GW",
    primaryLabel: "GRID STORAGE CAPACITY TO BE STABILIZED BY AI",
    secondaryStat: "99.2%",
    secondaryLabel: "ACTIVE INVERTER DUTY HARMONIC EFFICIENCY RATIO",
    complianceCode: "DPIIT-RN-2028",
    dialPercentage: 91,
  },
  {
    title: "EV Grid Charging Surge Loading",
    subtitle: "PEAK TRANSIENT LOADING BALANCER",
    primaryStat: "12.8x",
    primaryLabel: "UPWARD VELOCITY IN PEAK LOAD BY 2030 TARGETS",
    secondaryStat: "87.6%",
    secondaryLabel: "SUCCESSFUL POWER FACTOR AUTO-CORRECTION SPEED",
    complianceCode: "DPIIT-EV-2030",
    dialPercentage: 74,
  }
];

// SVG Chart component with animated paths based on the active tab
const DemandChart = ({ activeTab }: { activeTab: number }) => {
  const paths = [
    "M 30,160 C 80,150 120,90 170,80 C 220,70 260,40 350,20",
    "M 30,130 Q 90,20 150,140 T 270,50 T 350,90",
    "M 30,160 H 110 V 110 H 190 V 70 H 270 V 40 H 350"
  ];
  
  const activePath = paths[activeTab];
  const activeTargetY = activeTab === 0 ? 20 : activeTab === 1 ? 90 : 40;

  return (
    <div className="relative w-full aspect-[16/9] bg-white border border-[#D1D9E4] rounded-[3px] p-6 overflow-hidden flex flex-col justify-between select-none">
      {/* Blueprint Grid Lines Overlay */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 pointer-events-none opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="border-b border-r border-[#0C1929] w-full h-full" />
        ))}
      </div>
      
      {/* Chart Header */}
      <div className="flex items-center justify-between font-mono text-[9px] text-[#7A93AD] z-10">
        <span>// OS-TELEMETRY DYNAMIC GRAPH</span>
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C5FD1] animate-ping" />
          SWEEP RATE: 120ms
        </span>
      </div>

      {/* SVG Canvas */}
      <svg className="w-full h-full min-h-[160px] z-10 overflow-visible mt-4" viewBox="0 0 380 200">
        {/* Target threshold limit */}
        <line x1="30" y1="50" x2="350" y2="50" stroke="#A8B5C8" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
        <text x="35" y="44" fill="#7A93AD" className="font-mono text-[7px] font-bold tracking-wider">LIMIT_THRESHOLD_MAX</text>

        {/* Animated Sweep Line */}
        <AnimatePresence mode="wait">
          <m.path
            key={activeTab}
            d={activePath}
            fill="none"
            stroke="#1C5FD1"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          />
        </AnimatePresence>
        
        {/* Oscillating target pulse marker */}
        <circle cx="350" cy={activeTargetY} r="4.5" fill="#1C5FD1" className="animate-pulse" />
      </svg>

      {/* Chart Footer */}
      <div className="flex items-center justify-between font-mono text-[8px] text-[#7A93AD] mt-2 border-t border-[#D1D9E4]/60 pt-2 z-10">
        <span>TELEMETRY STACK STATUS: ONLINE</span>
        <span>PEAK RESPONSE SPEED: &lt; 65ms</span>
      </div>
    </div>
  );
};

// Radial Gauge for mobile responsive view
const RadialGauge = ({ percentage }: { percentage: number }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-[#D1D9E4] rounded-[3px] w-full max-w-[120px] mx-auto relative overflow-hidden aspect-square">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-b border-r border-[#0C1929]" />
        ))}
      </div>
      <svg className="w-18 h-18 transform -rotate-90 overflow-visible relative z-10" viewBox="0 0 100 100">
        {/* Track circle */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#EEF1F6" strokeWidth="5.5" />
        {/* Active progress circle */}
        <m.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1C5FD1"
          strokeWidth="5.5"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      {/* Absolute center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="font-heading font-bold text-[#0C1929] text-base leading-none">{percentage}%</span>
        <span className="font-mono text-[6px] text-[#7A93AD] mt-0.5 uppercase tracking-widest font-bold">LOAD</span>
      </div>
    </div>
  );
};

export default function EngineeringDemandSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeData = demandData[activeTab];

  return (
    <section
      id="engineering-demand"
      className="py-28 bg-[#EEF1F6] border-t border-[#D1D9E4] relative overflow-hidden"
      aria-labelledby="demand-heading"
    >
      {/* Global blueprint trace background lines */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.02]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-[#0C1929] h-full" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-3xl mb-16"
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-[#7A93AD] uppercase tracking-wider mb-4">
            // MARKET DEMAND TELEMETRY
          </m.p>
          <m.h2
            id="demand-heading"
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.0] text-[#0C1929] uppercase tracking-tight"
          >
            Engineering Demand Stack<br />
            <span className="text-[#3D5470] text-[24px] md:text-[32px] font-medium font-sans lowercase first-letter:uppercase">
              leveraged across next-generation utility systems
            </span>
          </m.h2>
        </m.div>

        {/* Console switcher selectors - common for both but sized differently */}
        <div className="flex flex-col md:flex-row gap-2 mb-10 bg-white/70 p-1 border border-[#D1D9E4] rounded-[3px] max-w-4xl">
          {demandData.map((data, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={data.complianceCode}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-3 px-4 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border-t-2 rounded-[2px] flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#0C1929] border-t-[#1C5FD1] border-b border-x border-[#D1D9E4] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                    : "border-t-transparent text-[#7A93AD] hover:text-[#0C1929] hover:bg-white/40"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1C5FD1] animate-pulse" />}
                {data.title.split(" ")[0]} Intelligence
              </button>
            );
          })}
        </div>

        {/* Split console panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Dynamic Graphics Terminal (Charts/Dials - responsive switcher) */}
          <div className="lg:col-span-7 w-full">
            {/* Desktop: Animated blueprint chart */}
            <div className="hidden md:block">
              <DemandChart activeTab={activeTab} />
            </div>

            {/* Mobile/Tablet: Radial telemetry indicators */}
            <div className="md:hidden flex items-center justify-center p-8 bg-white border border-[#D1D9E4] rounded-[3px] relative overflow-hidden">
              {/* Radial gauge */}
              <div className="flex flex-row items-center gap-6">
                <RadialGauge percentage={activeData.dialPercentage} />
                <div className="flex-1">
                  <div className="font-mono text-[9px] text-[#7A93AD] font-bold uppercase">// ANALYTICS SCALE</div>
                  <h4 className="font-heading font-bold text-base text-[#0C1929] uppercase tracking-wide mt-1">
                    {activeData.title.split(" ")[0]} LOADING
                  </h4>
                  <p className="font-sans text-[11px] text-[#3D5470] mt-1 leading-normal">
                    Real-time operational demand and processing load metrics on the smart grid gateway node.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Diagnostics & Technical Parameters (Dynamic telemetry numbers) - SENSELESS ANIMATED DIV 1 */}
          <div className="lg:col-span-5 w-full bg-white border border-[#D1D9E4] p-8 rounded-[3px] relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            {/* Background design lines */}
            <div className="absolute right-[-10px] top-[-10px] font-heading font-bold text-[96px] text-accent-blue/5 select-none pointer-events-none leading-none">
              {activeData.complianceCode.split("-")[1]}
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className="flex-1 flex flex-col justify-between gap-6"
              >
                <div>
                  {/* Top diagnostics tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold text-[#1C5FD1] tracking-wider">
                      // {activeData.subtitle}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#7A93AD]">
                      [{activeData.complianceCode}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-2xl text-[#0C1929] uppercase tracking-wide leading-none mb-6">
                    {activeData.title}
                  </h3>

                  {/* Primary Telemetry Metric */}
                  <div className="mb-6">
                    <div className="font-heading font-bold text-4xl text-[#1C5FD1] tracking-tight leading-none">
                      {activeData.primaryStat}
                    </div>
                    <div className="font-mono text-[9px] font-bold text-[#3D5470] mt-2 tracking-wider">
                      {activeData.primaryLabel}
                    </div>
                  </div>

                  {/* Secondary Telemetry Metric */}
                  <div>
                    <div className="font-heading font-bold text-3xl text-[#0C1929] tracking-tight leading-none">
                      {activeData.secondaryStat}
                    </div>
                    <div className="font-mono text-[9px] font-bold text-[#3D5470] mt-2 tracking-wider">
                      {activeData.secondaryLabel}
                    </div>
                  </div>
                </div>

                {/* Subsystem status footer */}
                <div className="mt-8 border-t border-[#D1D9E4]/60 pt-4 flex items-center justify-between font-mono text-[8px] text-[#7A93AD]">
                  <span>RELIABILITY COEFFICIENT: 0.9997</span>
                  <span className="text-[#1C5FD1] font-bold">SCHEMATIC LOAD OK</span>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

        </div>

        {/* SENSELESS ANIMATED DIV 2 - The chaotic footer that bounces, spins, shakes and glitches */}
        <m.div
          className="mt-12 p-6 bg-white border border-[#D1D9E4] rounded-[3px] relative overflow-hidden"
          animate={{
            x: [0, -4, 4, -4, 4, 0],
            y: [0, -3, 3, -2, 2, 0],
            rotate: [0, 1, -1, 0.5, -0.5, 0],
            scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
            skewX: [0, 2, -2, 1, -1, 0],
            skewY: [0, -1, 1, -0.5, 0.5, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear"
          }}
          whileHover={{
            scale: 1.05,
            rotate: 2,
            backgroundColor: "#FFFFFF",
            transition: { duration: 0.1 }
          }}
          style={{ transformOrigin: "center center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1C5FD1]/5 to-transparent animate-[pulse_0.8s_ease-in-out_infinite]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><rect width=\"100\" height=\"100\" fill=\"none\" stroke=\"%231C5FD1\" stroke-width=\"0.5\" stroke-dasharray=\"2,2\"/><text x=\"10\" y=\"20\" fill=\"%231C5FD1\" opacity=\"0.1\" font-size=\"8\">DEBUG</text><text x=\"60\" y=\"80\" fill=\"%231C5FD1\" opacity=\"0.1\" font-size=\"8\">OVERRIDE</text></svg>')] bg-repeat opacity-5 pointer-events-none" />
          
          <div className="relative flex flex-wrap items-center justify-between gap-4 z-10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-[10px] font-bold text-[#0C1929] uppercase tracking-widest">SENSELESS DIAGNOSTIC PANEL v0.0.1-alpha</span>
            </div>
            <div className="flex gap-6">
              <div className="font-mono text-[8px] text-[#7A93AD] animate-[spin_2s_linear_infinite] inline-block">⚙️</div>
              <div className="font-mono text-[8px] text-[#1C5FD1] animate-pulse font-bold">!!! RANDOM ALERT !!!</div>
              <div className="font-mono text-[8px] text-[#7A93AD] animate-[bounce_0.5s_ease_infinite] inline-block">⚠️</div>
            </div>
            <div className="w-32 h-2 bg-[#EEF1F6] rounded-full overflow-hidden">
              <m.div 
                className="h-full w-full bg-[#1C5FD1]"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <button 
              className="px-3 py-1 bg-red-100 border border-red-300 text-red-700 font-mono text-[8px] font-bold uppercase rounded-none hover:bg-red-200 transition-all hover:rotate-2 active:scale-95"
              onClick={() => {
                // Absolutely pointless button that does nonsense
                const nonsenseMessages = [
                  "REBOOTING NEURAL INTERFACE...",
                  "SYNC LOST... ACQUIRING...",
                  "POTATO MODE ACTIVATED",
                  "404: SENSELESS NOT FOUND",
                  "CRITICAL: TOO MANY EMOTIONS",
                  "CALCULATING THE MEANING OF 42"
                ];
                const randomMsg = nonsenseMessages[Math.floor(Math.random() * nonsenseMessages.length)];
                const toastDiv = document.createElement("div");
                toastDiv.className = "fixed bottom-4 right-4 bg-black text-white font-mono text-[10px] p-2 z-50";
                toastDiv.innerText = randomMsg;
                document.body.appendChild(toastDiv);
                setTimeout(() => toastDiv.remove(), 1500);
              }}
            >
              PRESS FOR SENSELESS
            </button>
          </div>
          
          <div className="mt-3 font-mono text-[6px] text-[#7A93AD] text-center tracking-widest border-t border-[#D1D9E4] pt-2">
            THIS DIV HAS NO PROFESSIONAL PURPOSE | IT EXISTS ONLY TO CONFUSE AND DISTRACT | ALL BOUNDARIES ARE ARTIFICIAL
          </div>
        </m.div>

      </div>
    </section>
  );
}