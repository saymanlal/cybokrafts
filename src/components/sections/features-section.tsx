"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp, cellFadeUp, scaleIn, VIEWPORT, VIEWPORT_CLOSE } from "@/lib/motion";

const features = [
  {
    num: "01",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-9 h-9">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Real-Time Monitoring",
    description:
      "Continuous telemetry from every connected asset — updated in seconds, not minutes. Operational teams get a clear picture of infrastructure health at all times.",
  },
  {
    num: "02",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-9 h-9">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Predictive Intelligence",
    description:
      "AI-driven anomaly detection identifies failure signals before they become incidents — reducing unplanned downtime and extending asset life cycles.",
  },
  {
    num: "03",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-9 h-9">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Indigenous Platform",
    description:
      "Designed, engineered, and manufactured in India under the Atmanirbhar Bharat vision — no dependency on imported hardware or foreign cloud infrastructure.",
  },
  {
    num: "04",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-9 h-9">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" />
      </svg>
    ),
    title: "Retrofit-Ready Hardware",
    description:
      "CYBO-VAJRA nodes are designed to retrofit onto existing infrastructure with minimal installation overhead — no replacement of legacy assets required.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="platform"
      className="py-28 bg-bg-muted border-t border-bg-border"
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

        {/* 2×2 Feature grid — staggered */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_CLOSE}
          className="grid md:grid-cols-2 border border-bg-border bg-bg-surface overflow-hidden rounded-[3px]"
        >
          {features.map((feature, i) => {
            const borderClasses = `
              p-8 flex flex-col sm:flex-row gap-6 items-start transition-all duration-200 hover:bg-bg-muted/40
              border-bg-border
              ${i < 2 ? "border-b" : ""}
              ${i % 2 === 0 ? "md:border-r" : ""}
              ${i === 2 ? "max-md:border-b" : ""}
            `;
            return (
              <m.div
                key={feature.title}
                variants={cellFadeUp}
                className={borderClasses}
              >
                {/* Icon wrapper & Number */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-start w-full sm:w-auto gap-4 flex-shrink-0">
                  <span className="font-mono text-[11px] text-text-muted tracking-widest">{feature.num}</span>
                  {/* Icon scales in on stagger */}
                  <m.div
                    variants={scaleIn}
                    className="text-accent-blue"
                  >
                    {feature.icon}
                  </m.div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-xl uppercase tracking-wider mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-text-secondary text-[14px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
