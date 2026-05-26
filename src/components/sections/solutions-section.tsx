"use client";

import { motion } from "framer-motion";

const assets = [
  // Power Assets
  {
    group: "Power Assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
    name: "Power Transformer Monitoring",
    benefit: "Real-time thermal, load and health index monitoring",
  },
  {
    group: "Power Assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    name: "Distribution Transformer Monitoring",
    benefit: "Continuous load balancing and fault detection",
  },
  {
    group: "Power Assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    name: "Inverter Duty Transformer Monitoring",
    benefit: "Harmonic analysis and inverter-grade performance tracking",
  },
  {
    group: "Power Assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    name: "Hermetically Sealed Transformer Monitoring",
    benefit: "Oil-sealed unit integrity and temperature monitoring",
  },
  {
    group: "Power Assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
    name: "Switchgear Monitoring",
    benefit: "Contact wear, insulation and trip status analytics",
  },
  {
    group: "Power Assets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    ),
    name: "LT Panel (LTP) Monitoring",
    benefit: "Current, voltage and panel health monitoring",
  },
  // Generation & Energy
  {
    group: "Generation & Energy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    name: "Energy Management System (EMS)",
    benefit: "Unified energy analytics across all connected assets",
  },
  {
    group: "Generation & Energy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    name: "Diesel Generator (DG) Monitoring",
    benefit: "Runtime, fuel efficiency and fault prediction",
  },
  {
    group: "Generation & Energy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    name: "Solar System Monitoring",
    benefit: "Generation analytics, panel diagnostics and fault alerts",
  },
  {
    group: "Generation & Energy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="6" width="15" height="12" rx="2" /><line x1="23" y1="13" x2="23" y2="11" /><line x1="23" y1="8" x2="16" y2="8" /><line x1="23" y1="16" x2="16" y2="16" />
      </svg>
    ),
    name: "Battery Monitoring",
    benefit: "State of charge, temperature and cycle health tracking",
  },
  {
    group: "Generation & Energy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" />
      </svg>
    ),
    name: "UPS Monitoring",
    benefit: "Battery backup status, load and uptime analytics",
  },
  {
    group: "Generation & Energy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    name: "Stabilizer Monitoring",
    benefit: "Voltage regulation performance and anomaly detection",
  },
  // Auxiliary & Control
  {
    group: "Auxiliary & Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    name: "Feeder Pillar Monitoring",
    benefit: "Distribution feeder load and connectivity monitoring",
  },
  {
    group: "Auxiliary & Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    name: "Busbar Monitoring",
    benefit: "Busbar temperature and current distribution monitoring",
  },
  {
    group: "Auxiliary & Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    name: "Annunciator Panel Monitoring",
    benefit: "Multi-alarm fault indication and status tracking",
  },
  {
    group: "Auxiliary & Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
      </svg>
    ),
    name: "Pump Monitoring",
    benefit: "Flow rate, pressure and vibration diagnostics",
  },
  {
    group: "Auxiliary & Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 4-5 10-10 10S2 16 2 12A10 10 0 0 1 12 2z" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    name: "Water Flow Monitoring",
    benefit: "Flow rate anomaly detection and consumption analytics",
  },
  {
    group: "Auxiliary & Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    name: "Moisture in Oil Monitoring",
    benefit: "Oil quality and insulation degradation sensing",
  },
];

const groups = ["Power Assets", "Generation & Energy", "Auxiliary & Control"];

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="py-28 bg-white border-t border-[#E2E8F0]"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
            Core Product
          </p>
          <h2
            id="solutions-heading"
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.18] text-[#0F172A] mb-5"
          >
            Intelligent Monitoring Across Your Infrastructure
          </h2>
          <p className="text-[#334155] text-lg leading-relaxed">
            Cybo monitors <strong>18 critical energy assets</strong> with real-time intelligence — from power transformers and switchgear to solar systems and auxiliary equipment.
          </p>
        </motion.div>

        {/* Asset groups */}
        {groups.map((group) => (
          <div key={group} className="mb-14">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#64748B] mb-6 pb-3 border-b border-[#E2E8F0]">
              {group}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets
                .filter((a) => a.group === group)
                .map((asset, i) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default"
                  >
                    <div className="text-[#2563EB] mb-3">{asset.icon}</div>
                    <h4 className="text-sm font-bold text-[#0F172A] mb-1.5 leading-snug">
                      {asset.name}
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">{asset.benefit}</p>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}