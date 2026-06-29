"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
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

const getMetricsForAsset = (assetName: string, existingMetrics?: string[]) => {
  if (existingMetrics && existingMetrics.length > 0) return existingMetrics;
  
  switch (assetName) {
    case "Distribution Transformer Monitoring":
      return ["Load Ratio", "Hot-Spot Temp", "Oil Level %", "Volt Imbalance", "Neutral Current", "THD Factor"];
    case "Inverter Duty Transformer Monitoring":
      return ["Active Harmonics", "MPPT Efficiency", "Oil Temp °C", "Core Flux Index", "Insulation index", "Frequency Hz"];
    case "Hermetically Sealed Transformer Monitoring":
      return ["Tank Pressure", "Oil Temp °C", "Gas Detection", "Seal Index", "Load Ratio", "Ambient Temp"];
    case "Switchgear Monitoring":
      return ["Contact Wear %", "SF6 Gas Pressure", "Trip Counter", "Arc Detection", "Heater Status", "Spring Charge"];
    case "Diesel Generator (DG) Monitoring":
      return ["Fuel Level %", "Battery Volts", "Coolant Temp", "Oil Pressure", "RPM Speed", "Load kW"];
    case "Solar System Monitoring":
      return ["Panel Temp °C", "String Voltage", "String Current", "Irradiance W/m²", "Inverter Health", "Daily Yield kWh"];
    case "Battery Monitoring":
      return ["State of Charge", "State of Health", "Cell Volts Min/Max", "Cell Temp °C", "Charge Current", "Cycles Count"];
    case "UPS Monitoring":
      return ["Backup Time Min", "Output Load %", "Bypass Status", "Input Volts", "Battery Temp", "Inverter Status"];
    case "Stabilizer Monitoring":
      return ["Buck-Boost Status", "Input Voltage", "Output Voltage", "Winding Temp", "Servo Motor Load", "Trip Alarm"];
    case "Feeder Pillar Monitoring":
      return ["Branch Load", "Breaker Status", "Earth Leakage", "Busbar Temp", "Cabinet Door", "Power Factor"];
    case "Busbar Monitoring":
      return ["Busbar Temp", "Joint Resistance", "Contact Force", "Current Balance", "Partial Discharge", "Insulation Index"];
    case "Annunciator Panel Monitoring":
      return ["Active Alarms", "Horn Status", "Test Cycle", "Logic Battery", "Comm Link", "Event Log"];
    case "Pump Monitoring":
      return ["Flow Rate L/m", "Line Pressure", "Pump RPM", "Vibration mm/s", "Motor Current", "Winding Temp"];
    default:
      return ["Load Profile", "Active Power", "Reactive Power", "Frequency Hz", "Neutral Current", "Phase Voltages"];
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 24, 
    rotateX: 12,
    scale: 0.95 
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 160,
      damping: 18,
      delay: i * 0.05,
    }
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15 }
  }
};

interface BentoCardProps {
  asset: Asset;
  index: number;
}

function BentoCard({ asset, index }: BentoCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [telemetryTicks, setTelemetryTicks] = useState<number[]>([]);
  const [wavePhase, setWavePhase] = useState(0);

  // Initialize fake fluctuating metrics values
  useEffect(() => {
    const metricsCount = asset.metrics ? asset.metrics.length : 6;
    const initialSeeds = Array.from({ length: metricsCount }, () => Math.random());
    setTelemetryTicks(initialSeeds);

    const interval = setInterval(() => {
      setTelemetryTicks(prev => prev.map(seed => seed + (Math.random() * 0.1 - 0.05)));
    }, 1500);

    return () => clearInterval(interval);
  }, [asset]);

  // Sine wave animation frame for Featured card
  useEffect(() => {
    if (!asset.isFeatured) return;
    let frameId: number;
    const animate = () => {
      setWavePhase(p => p + 0.12);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [asset.isFeatured]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const activeMetrics = getMetricsForAsset(asset.name, asset.metrics);

  const getFluctuatedValue = (metricName: string, seed: number) => {
    const normalizedSeed = Math.max(0, Math.min(1, seed));
    if (metricName.includes("Temp") || metricName.includes("Winding")) {
      return (52 + normalizedSeed * 18).toFixed(1) + "°C";
    }
    if (metricName.includes("Fuel") || metricName.includes("Charge") || metricName.includes("Level") || metricName.includes("Health") || metricName.includes("Efficiency")) {
      return (88 + normalizedSeed * 10).toFixed(1) + "%";
    }
    if (metricName.includes("Voltage") || metricName.includes("Volts")) {
      return (218 + Math.floor(normalizedSeed * 12)) + "V";
    }
    if (metricName.includes("PPM")) {
      return (12 + Math.floor(normalizedSeed * 8)) + " PPM";
    }
    if (metricName.includes("Frequency")) {
      return (49.8 + normalizedSeed * 0.4).toFixed(2) + " Hz";
    }
    return (40 + normalizedSeed * 45).toFixed(1);
  };

  // Border/Spotlight Colors matching group
  let colorGlow = "rgba(28, 95, 209, 0.08)";
  let borderSpotlight = "rgba(28, 95, 209, 0.4)";
  let accentBorder = "hover:border-accent-blue/30";
  let activeDot = "bg-accent-blue";
  
  if (asset.group === "Generation & Energy") {
    colorGlow = "rgba(245, 158, 11, 0.08)";
    borderSpotlight = "rgba(245, 158, 11, 0.35)";
    accentBorder = "hover:border-accent-amber/30";
    activeDot = "bg-accent-amber";
  } else if (asset.group === "Auxiliary & Control") {
    colorGlow = "rgba(100, 116, 139, 0.08)";
    borderSpotlight = "rgba(100, 116, 139, 0.35)";
    accentBorder = "hover:border-text-secondary/30";
    activeDot = "bg-text-secondary";
  }

  // Draw smooth sine wave
  const drawWavePath = () => {
    const points = [];
    const width = 160;
    const height = 45;
    for (let i = 0; i <= 100; i += 4) {
      const x = (i / 100) * width;
      const y = (height / 2) + 
        Math.sin((i / 100) * Math.PI * 3.5 + wavePhase) * 11 +
        Math.sin((i / 100) * Math.PI * 7 + wavePhase * 1.5) * 4;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <m.div
      custom={index}
      variants={cardVariants}
      className={`group relative bg-bg-surface border border-bg-border rounded-[8px] p-5 overflow-hidden transition-all duration-300 ${accentBorder} flex flex-col justify-between h-full ${
        asset.isFeatured ? "col-span-12 lg:col-span-6" : "col-span-12 md:col-span-6 lg:col-span-3"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Spotlight Glow */}
      {isHovered && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${colorGlow}, transparent 70%)`
            }}
          />
          <div 
            className="absolute -inset-px pointer-events-none rounded-[8px] transition-opacity duration-300 opacity-100 z-10 border border-transparent"
            style={{
              background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${borderSpotlight}, transparent 70%)`,
              WebkitMaskImage: "linear-gradient(white, white)",
              maskImage: "linear-gradient(white, white)",
            }}
          />
        </>
      )}

      {/* Cyber Corner Accents */}
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-bg-border/60 group-hover:border-bg-border-strong" />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-bg-border/60 group-hover:border-bg-border-strong" />
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-bg-border/60 group-hover:border-bg-border-strong" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-bg-border/60 group-hover:border-bg-border-strong" />

      {asset.isFeatured ? (
        <div className="flex flex-col sm:flex-row gap-5 h-full items-stretch z-20">
          {/* Left Column: Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${activeDot} animate-pulse`} />
                <span className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-wider">
                  {asset.category}
                </span>
              </div>

              <div className="text-text-secondary mb-3">
                {asset.icon}
              </div>

              <h4 className="font-heading font-bold text-text-primary text-[15px] uppercase tracking-wide leading-snug mb-1.5">
                {asset.name.replace(" Monitoring", " Predictive Intelligence")}
              </h4>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                {asset.benefit.replace(/monitoring/i, "predictive intelligence")}
              </p>
            </div>

            <div className="mt-4 font-mono text-[9px] text-text-muted/80 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-status-green rounded-full" />
              <span>GATEWAY_CONNECTED</span>
            </div>
          </div>

          {/* Right Column: Telemetry */}
          <div className="w-full sm:w-[190px] border-t sm:border-t-0 sm:border-l border-bg-border/60 pt-4 sm:pt-0 sm:pl-4 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[9px] font-bold text-text-muted uppercase mb-2 tracking-wider flex items-center justify-between">
                <span>SCADA FEED</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-status-green-bg border border-status-green/20 font-mono text-[8px] font-bold text-status-green">
                  LIVE
                </span>
              </div>

              {/* Sine Wave */}
              <div className="h-[45px] w-full bg-bg-muted/40 border border-bg-border/40 rounded flex items-center justify-center overflow-hidden relative mb-3">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 45">
                  <path d={drawWavePath()} fill="none" stroke={asset.group === "Generation & Energy" ? "#F59E0B" : "#1C5FD1"} strokeWidth="1.25" className="opacity-80" />
                </svg>
              </div>

              {/* Metrics */}
              <ul className="flex flex-col gap-1.5 font-mono text-[9.5px]">
                {activeMetrics.slice(0, 3).map((metric, i) => {
                  const seed = telemetryTicks[i] || 0.5;
                  const displayVal = getFluctuatedValue(metric, seed);
                  return (
                    <li key={i} className="flex items-center justify-between border-b border-bg-border/30 pb-0.5">
                      <span className="text-text-muted uppercase tracking-wider text-[8px]">{metric}</span>
                      <span className="font-bold text-text-primary text-[9px]">{displayVal}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="h-6 w-full bg-bg-muted border border-bg-border rounded flex items-center justify-center mt-3">
              <span className="font-mono text-[8px] text-text-secondary font-bold uppercase tracking-wider">
                {asset.name.substring(0, 3).toUpperCase()}-NODE:{index + 1}
              </span>
            </div>
          </div>
        </div>
      ) : (
        // Standard Card Layout
        <div className="flex flex-col justify-between h-full z-20">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${activeDot}`} />
                <span className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-wider">
                  {asset.category.split(" · ")[1]}
                </span>
              </div>
              <span className="font-mono text-[9px] text-text-muted/60 font-semibold">[{String(index + 1).padStart(2, "0")}]</span>
            </div>

            <div className="text-text-secondary mb-3">
              {asset.icon}
            </div>

            <h4 className="font-heading font-bold text-text-primary text-[14px] uppercase tracking-wide leading-snug mb-1.5">
              {asset.name.replace(" Monitoring", "")}
            </h4>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              {asset.benefit.replace(/monitoring/i, "predictive intelligence")}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-bg-border/60 flex items-center justify-between font-mono text-[9px]">
            <span className="text-text-muted text-[8px]">PRIMARY SIGNAL</span>
            <span className="font-bold text-text-secondary text-[8.5px]">
              {activeMetrics[0]}: {getFluctuatedValue(activeMetrics[0], telemetryTicks[0] || 0.5)}
            </span>
          </div>
        </div>
      )}
    </m.div>
  );
}

export default function SolutionsSection() {
  const [activeGroup, setActiveGroup] = useState<"Power Assets" | "Generation & Energy" | "Auxiliary & Control">("Power Assets");

  // Filtered array
  const filteredAssets = assets.filter((asset) => asset.group === activeGroup);

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
            PREDICTIVE INTELLIGENCE
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

        {/* Subsystem Switcher Console */}
        <div className="max-w-4xl mx-auto mb-10 bg-[#EEF1F6] p-1.5 border border-[#D1D9E4] rounded-[6px] flex flex-col sm:flex-row gap-2">
          {(["Power Assets", "Generation & Energy", "Auxiliary & Control"] as const).map((group) => {
            const isActive = activeGroup === group;
            const count = assets.filter((asset) => asset.group === group).length;
            
            let activeColor = "text-accent-blue";
            let activeBorder = "border-t-accent-blue";
            let activeDot = "bg-accent-blue";
            
            if (group === "Generation & Energy") {
              activeColor = "text-accent-amber";
              activeBorder = "border-t-accent-amber";
              activeDot = "bg-accent-amber";
            } else if (group === "Auxiliary & Control") {
              activeColor = "text-text-secondary";
              activeBorder = "border-t-text-secondary";
              activeDot = "bg-text-secondary";
            }

            return (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`flex-1 py-3 px-5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border-t-2 rounded-[4px] flex items-center justify-center gap-2.5 cursor-pointer outline-none ${
                  isActive
                    ? `bg-bg-surface ${activeColor} ${activeBorder} border-b border-x border-[#D1D9E4] shadow-xs`
                    : "border-t-transparent text-text-muted hover:text-text-primary hover:bg-bg-surface/50"
                }`}
              >
                {isActive && <span className={`w-1.5 h-1.5 rounded-full ${activeDot} animate-pulse`} />}
                <span>{group}</span>
                <span className={`text-[9px] font-normal ${isActive ? "text-text-secondary" : "text-text-muted/60"}`}>
                  [{String(count).padStart(2, "0")}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Compact, Highly Animated Bento Grid Dashboard */}
        <div className="min-h-[380px]" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait">
            <m.div
              key={activeGroup}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  }
                },
                exit: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  }
                }
              }}
              className="grid grid-cols-12 gap-5 w-full items-stretch"
            >
              {filteredAssets.map((asset, idx) => (
                <BentoCard key={asset.name} asset={asset} index={idx} />
              ))}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}