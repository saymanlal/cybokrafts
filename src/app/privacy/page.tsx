"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

export default function PrivacyPolicy() {
  const sections = [
    {
      code: "SEC-01",
      title: "Data Ingress & Telemetry Collection",
      content:
        "Cybokrafts collects machine telemetry from patented CYBO-VAJRA IoT gateways and integrated industrial sensors. This includes transformer oil temperatures, winding thermal indices, load profiling, voltage fluctuation coefficients, and vibration signals. No personal consumer energy billing details, residential metrics, or retail subscriber properties are ingested or analyzed. Our pipelines are designed exclusively for B2B engineering analytics.",
    },
    {
      code: "SEC-02",
      title: "System Usage & ML Model Training",
      content:
        "All ingested telemetry is processed to deliver predictive failure warnings, optimize grid distribution loads, and calculate asset health indices. Selected historical datasets are anonymized and processed to train our proprietary machine learning failure prediction algorithms on AIPowerOS. Individual client datasets are strictly isolated; we do not pool cross-enterprise telemetry unless explicit authorization is documented.",
    },
    {
      code: "SEC-03",
      title: "Hardware-Level & Cloud Encryption",
      content:
        "Consistent with Atmanirbhar security benchmarks, all telemetry passing through CYBO-VAJRA edge gateways is encrypted at rest and in transit using hardware-accelerated AES-256 and Transport Layer Security (TLS 1.3). Real-time telemetry databases are hosted on ISO 27001 and SOC 2 Type II certified cloud datacenters inside Indian geographic borders, ensuring full national data residency compliance.",
    },
    {
      code: "SEC-04",
      title: "Data Retention & Archival Protocol",
      content:
        "Active operational telemetry is retained for a default duration of 36 calendar months to establish seasonal load baseline histories. After this lifecycle period, raw high-frequency data streams are systematically aggregated into long-term system trends and archived. Complete data deletion routines are initiated within 30 business days upon corporate contract termination.",
    },
    {
      code: "SEC-05",
      title: "B2B Sharing & Sovereign Governance",
      content:
        "Cybokrafts strictly enforces zero third-party monetization of industrial data. We do not sell, rent, or trade smart grid telemetry to advertisements or external analytic vendors. Information is only disclosed to official state utility boards, public electricity corporations, or designated grid transmission operators in compliance with bilateral non-disclosure agreements.",
    },
    {
      code: "SEC-06",
      title: "DPDP Act & DPIIT Alignment",
      content:
        "Although Cybokrafts deals exclusively in industrial B2B telemetry rather than personal consumer logs, our data handling standards are proactively aligned with India's Digital Personal Data Protection (DPDP) Act of 2023, DPIIT startup compliance frameworks, and international industrial IoT safety regulations.",
    },
    {
      code: "SEC-07",
      title: "DPO Inquiry & Compliance Console",
      content:
        "For technical audits, data extraction requests, or cryptographic keys verification, representatives of authenticated utility operators can contact our Data Protection Officer directly at privacy@cybokrafts.com or visit our Raipur headquarters in Chhattisgarh, India.",
    },
  ];

  return (
    <section className="py-28 bg-[#F4F6F9] border-t border-[#D1D9E4] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mb-16 border-b border-[#D1D9E4] pb-12"
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-[#1C5FD1] font-bold tracking-wider mb-3">
            // COMPLIANCE SCHEMA v2.4 · ATMANIRBHAR SECURITY STANDARDS
          </m.p>
          <m.h1
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-[3.25rem] leading-[1.0] text-[#0C1929] uppercase tracking-tight mb-6"
          >
            Privacy Policy
          </m.h1>
          <m.p variants={fadeUp} className="font-sans text-[#3D5470] text-[16px] leading-relaxed max-w-2xl">
            This document outlines the strict technical security protocols, data residency configurations, and sovereign telemetry protection mechanisms governing industrial data processed by Cybokrafts Universal Innovations.
          </m.p>
        </m.div>

        {/* Content sections */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {sections.map((section) => (
            <m.div
              key={section.code}
              variants={fadeUp}
              className="bg-white border border-[#D1D9E4] p-8 rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Left numeric/code badge */}
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1 bg-[#EEF1F6] border border-[#D1D9E4] rounded-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C5FD1] animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-[#3D5470] tracking-wider">
                  {section.code}
                </span>
              </div>

              {/* Right text body */}
              <div className="flex-1">
                <h2 className="font-heading font-bold text-lg text-[#0C1929] uppercase tracking-wider mb-3">
                  {section.title}
                </h2>
                <p className="font-sans text-[13.5px] text-[#3D5470] leading-relaxed">
                  {section.content}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Footer legal seal */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-16 pt-8 border-t border-[#D1D9E4] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#7A93AD]"
        >
          <span>LAST SYSTEM REVISION: MAY 2026</span>
          <span className="text-[#1C5FD1] font-bold uppercase">// CERTIFIED ATMANIRBHAR DATA STACK //</span>
        </m.div>

      </div>
    </section>
  );
}
