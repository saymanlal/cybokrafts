"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Real-Time Monitoring",
    description: "Continuous telemetry from every connected asset — updated in seconds, not minutes. Operational teams get a clear picture of infrastructure health at all times.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Predictive Intelligence",
    description: "AI-driven anomaly detection identifies failure signals before they become incidents — reducing unplanned downtime and extending asset life cycles.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Indigenous Platform",
    description: "Designed, engineered, and manufactured in India under the Atmanirbhar Bharat vision — no dependency on imported hardware or foreign cloud infrastructure.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" />
      </svg>
    ),
    title: "Retrofit-Ready Hardware",
    description: "CYBO-VAJRA nodes are designed to retrofit onto existing infrastructure with minimal installation overhead — no replacement of legacy assets required.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="platform"
      className="py-28 bg-white border-t border-[#E2E8F0]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
            Why Cybokrafts
          </p>
          <h2
            id="features-heading"
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.18] text-[#0F172A] mb-4"
          >
            Engineered for the Demands of Critical Infrastructure
          </h2>
          <p className="text-[#334155] text-lg leading-relaxed">
            Every capability we offer has been built around the realities of heavy industrial environments, not adapted from consumer software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-white border border-[#E2E8F0] rounded-lg p-7 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex gap-5"
            >
              <div className="text-[#2563EB] flex-shrink-0 mt-0.5">{feature.icon}</div>
              <div>
                <h3 className="font-heading font-bold text-[#0F172A] text-lg mb-2">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
