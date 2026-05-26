"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp, cellFadeUp, VIEWPORT, VIEWPORT_CLOSE } from "@/lib/motion";

interface Asset {
  group: string;
  dotColor: string;
  category: string;
  icon: React.ReactNode;
  name: string;
  benefit: string;
  gridSpan: string;
  isFeatured?: boolean;
  metrics?: string[];
}

const assets: Asset[] = [
  // Power Assets
  {
    group: "Power Assets",
    dotColor: "bg-accent-blue",
    category: "POWER · GRID",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
    name: "Power Transformer Monitoring",
    benefit: "Real-time thermal, load and health index monitoring",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    isFeatured: true,
    metrics: [
      "Winding Temp",
      "Top Oil Temp",
      "DGA Analysis",
      "Tan-Delta Index",
      "Bushing Leakage",
      "Load Profile"
    ]
  },
  {
    group: "Power Assets",
    dotColor: "bg-accent-blue",
    category: "POWER · DISTRIBUTION",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    name: "Distribution Transformer Monitoring",
    benefit: "Continuous load balancing and fault detection",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Power Assets",
    dotColor: "bg-accent-blue",
    category: "POWER · RENEWABLES",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    name: "Inverter Duty Transformer Monitoring",
    benefit: "Harmonic analysis and inverter-grade performance tracking",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Power Assets",
    dotColor: "bg-accent-blue",
    category: "POWER · SPECIALIZED",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    name: "Hermetically Sealed Transformer Monitoring",
    benefit: "Oil-sealed unit integrity and temperature monitoring",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Power Assets",
    dotColor: "bg-accent-blue",
    category: "POWER · CONTROL",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
    name: "Switchgear Monitoring",
    benefit: "Contact wear, insulation and trip status analytics",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Power Assets",
    dotColor: "bg-accent-blue",
    category: "POWER · SWITCHBOARD",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    ),
    name: "LT Panel (LTP) Monitoring",
    benefit: "Current, voltage and panel health monitoring",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    isFeatured: true,
    metrics: [
      "Busbar Temp",
      "ACB Trip Status",
      "Phase Balancer",
      "Harmonic Distortion",
      "Power Factor Cosφ",
      "Peak Amperage"
    ]
  },
  // Generation & Energy
  {
    group: "Generation & Energy",
    dotColor: "bg-accent-amber",
    category: "GENERATION · SYSTEMS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    name: "Energy Management System (EMS)",
    benefit: "Unified energy analytics across all connected assets",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    isFeatured: true,
    metrics: [
      "Cost Allocation",
      "Peak Demand Limiter",
      "Carbon Footprint",
      "Energy Intensity",
      "Voltage Sag/Swell",
      "Daily Saving Ratio"
    ]
  },
  {
    group: "Generation & Energy",
    dotColor: "bg-accent-amber",
    category: "GENERATION · BACKUP",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    name: "Diesel Generator (DG) Monitoring",
    benefit: "Runtime, fuel efficiency and fault prediction",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Generation & Energy",
    dotColor: "bg-accent-amber",
    category: "GENERATION · SOLAR",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    name: "Solar System Monitoring",
    benefit: "Generation analytics, panel diagnostics and fault alerts",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Generation & Energy",
    dotColor: "bg-accent-amber",
    category: "GENERATION · STORAGE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <rect x="1" y="6" width="15" height="12" rx="2" /><line x1="23" y1="13" x2="23" y2="11" /><line x1="23" y1="8" x2="16" y2="8" /><line x1="23" y1="16" x2="16" y2="16" />
      </svg>
    ),
    name: "Battery Monitoring",
    benefit: "State of charge, temperature and cycle health tracking",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    group: "Generation & Energy",
    dotColor: "bg-accent-amber",
    category: "GENERATION · STORAGE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" />
      </svg>
    ),
    name: "UPS Monitoring",
    benefit: "Battery backup status, load and uptime analytics",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    group: "Generation & Energy",
    dotColor: "bg-accent-amber",
    category: "GENERATION · STABILITY",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    name: "Stabilizer Monitoring",
    benefit: "Voltage regulation performance and anomaly detection",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  // Auxiliary & Control
  {
    group: "Auxiliary & Control",
    dotColor: "bg-text-secondary",
    category: "AUXILIARY · REGULATION",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    name: "Feeder Pillar Monitoring",
    benefit: "Distribution feeder load and connectivity monitoring",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Auxiliary & Control",
    dotColor: "bg-text-secondary",
    category: "AUXILIARY · FEED",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    name: "Busbar Monitoring",
    benefit: "Busbar temperature and current distribution monitoring",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Auxiliary & Control",
    dotColor: "bg-text-secondary",
    category: "AUXILIARY · ALARMS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    name: "Annunciator Panel Monitoring",
    benefit: "Multi-alarm fault indication and status tracking",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Auxiliary & Control",
    dotColor: "bg-text-secondary",
    category: "AUXILIARY · PUMPING",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
      </svg>
    ),
    name: "Pump Monitoring",
    benefit: "Flow rate, pressure and vibration diagnostics",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-3"
  },
  {
    group: "Auxiliary & Control",
    dotColor: "bg-text-secondary",
    category: "AUXILIARY · LIQUID",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <path d="M12 2a10 10 0 0 1 10 10c0 4-5 10-10 10S2 16 2 12A10 10 0 0 1 12 2z" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    name: "Water Flow Monitoring",
    benefit: "Flow rate anomaly detection and consumption analytics",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    isFeatured: true,
    metrics: [
      "Flow Velocity",
      "Totalizer Reading",
      "Line Pressure",
      "Leak Alert Flag",
      "Consumption Slope",
      "Valve Telemetry"
    ]
  },
  {
    group: "Auxiliary & Control",
    dotColor: "bg-text-secondary",
    category: "AUXILIARY · SENSORS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
        <circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    name: "Moisture in Oil Monitoring",
    benefit: "Oil quality and insulation degradation sensing",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    isFeatured: true,
    metrics: [
      "Oil Temp °C",
      "Moisture PPM",
      "Water Activity (aw)",
      "Breakdown Volts KV",
      "Dielectric Constant",
      "Saturation %"
    ]
  },
];

const getHoverClasses = (group: string) => {
  if (group === "Power Assets") {
    return "hover:border-t-accent-blue hover:bg-accent-blue-light/50";
  }
  if (group === "Generation & Energy") {
    return "hover:border-t-accent-amber hover:bg-accent-amber-bg/50";
  }
  return "hover:border-t-text-secondary hover:bg-bg-muted/70";
};

const getAccentTextHover = (group: string) => {
  if (group === "Power Assets") return "group-hover:text-accent-blue";
  if (group === "Generation & Energy") return "group-hover:text-accent-amber";
  return "group-hover:text-text-primary";
};

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="py-28 bg-bg-surface border-t border-bg-border"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-3xl mb-16"
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
            MONITORED ASSETS
          </m.p>
          <m.h2
            id="solutions-heading"
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.0] text-text-primary uppercase tracking-tight"
          >
            18 Critical Energy Systems<br />
            <span className="text-text-secondary text-[24px] md:text-[32px] font-medium font-sans lowercase first-letter:uppercase">
              under continuous intelligence
            </span>
          </m.h2>
        </m.div>

        {/* Blueprint Asset Grid — staggered cells */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_CLOSE}
          className="grid grid-cols-12 gap-[1px] bg-bg-border border border-bg-border overflow-hidden rounded-[3px]"
        >
          {assets.map((asset) => (
            <m.div
              key={asset.name}
              variants={cellFadeUp}
              whileHover={{ y: -2 }}
              className={`group bg-bg-surface p-6 border-t-2 border-t-transparent ${getHoverClasses(asset.group)} transition-all duration-200 ease-out cursor-default flex flex-col justify-between ${asset.gridSpan}`}
            >
              <div>
                {/* Category tag & Dot Accent */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-1.5 h-1.5 rounded-full ${asset.dotColor}`} aria-hidden="true" />
                  <span className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-wider">
                    {asset.category}
                  </span>
                </div>

                {/* Icon */}
                <div className={`text-text-secondary ${getAccentTextHover(asset.group)} transition-colors duration-200 mb-4`}>
                  {asset.icon}
                </div>

                {/* Asset Name */}
                <h4 className={`font-heading font-bold text-text-primary text-base mb-2 uppercase tracking-tight ${getAccentTextHover(asset.group)} transition-colors duration-200`}>
                  {asset.name}
                </h4>
                
                {/* Benefit */}
                <p className="font-sans text-xs text-text-secondary leading-relaxed mb-3">
                  {asset.benefit}
                </p>
              </div>

              {/* Telemetry Panel for Featured Bento Cards */}
              {asset.isFeatured && asset.metrics && (
                <div className="mt-4 border-t border-bg-border/60 pt-4">
                  <div className="font-mono text-[9px] font-bold text-text-muted uppercase mb-2 tracking-wider flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-status-green rounded-full animate-pulse" />
                    LIVE SCADA TELEMETRY
                  </div>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[9.5px] text-text-secondary/90">
                    {asset.metrics.map((metric, i) => (
                      <li key={i} className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="text-text-muted font-bold">›</span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}