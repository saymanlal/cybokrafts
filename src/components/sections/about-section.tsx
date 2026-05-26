"use client";

import { m } from "framer-motion";
import { staggerContainer, slideLeft, slideRight, fadeUp, cellFadeUp, VIEWPORT } from "@/lib/motion";

const layers = [
  {
    number: "04",
    label: "AIpowerOS",
    desc: "Analytics & Intelligence Layer",
    border: "border-l-[2px] border-l-accent-amber hover:border-l-[4px] hover:border-l-accent-amber",
    live: false,
  },
  {
    number: "03",
    label: "Cloud Platform",
    desc: "Real-time Data Processing",
    border: "border-l-[2px] border-l-accent-blue hover:border-l-[4px] hover:border-l-accent-blue",
    live: false,
  },
  {
    number: "02",
    label: "Edge Gateway",
    desc: "Secure Data Aggregation",
    border: "border-l-[2px] border-l-accent-blue hover:border-l-[4px] hover:border-l-accent-blue",
    live: false,
  },
  {
    number: "01",
    label: "CYBO-VAJRA",
    desc: "Patented Edge Hardware Node",
    border: "border-l-[2px] border-l-status-green hover:border-l-[4px] hover:border-l-status-green",
    live: true,
    patent: "Patent 202521117118",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 bg-bg-muted border-t border-bg-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left: Architecture Layers — slide in from left with stagger */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative"
        >
          <m.div variants={slideLeft} className="bg-bg-surface border border-bg-border rounded-[3px] p-6">
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
              SYSTEM ARCHITECTURE
            </p>
            <div className="flex flex-col gap-3">
              {layers.map((layer, i) => (
                <m.div
                  key={i}
                  variants={cellFadeUp}
                  className={`w-full py-4 px-5 bg-bg-surface border border-bg-border rounded-[3px] flex items-center justify-between hover:bg-accent-blue-light transition-all duration-150 ${layer.live ? "bg-status-green-bg" : ""} ${layer.border}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-text-muted">{layer.number}</span>
                    <div className="flex flex-col">
                      <span className="font-heading font-bold text-lg text-text-primary uppercase tracking-wide leading-tight">
                        {layer.label}
                      </span>
                      <span className="font-sans text-[13px] text-text-secondary leading-snug">
                        {layer.desc}{" "}
                        {layer.patent && (
                          <span className="font-mono text-[10px] text-text-muted ml-1">({layer.patent})</span>
                        )}
                      </span>
                    </div>
                  </div>
                  {layer.live && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-status-green-bg border border-status-green/30 rounded-[3px] font-mono text-[10px] font-semibold text-status-green">
                      <span className="h-1.5 w-1.5 rounded-full bg-status-green animate-pulse" />
                      LIVE
                    </span>
                  )}
                </m.div>
              ))}
            </div>
          </m.div>
        </m.div>

        {/* Right: Company story — slide in from right */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-5">
            WHO WE ARE
          </m.p>

          <m.h2
            id="about-heading"
            variants={slideRight}
            className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] text-text-primary mb-6 uppercase tracking-tight"
          >
            Bridging Industrial Assets with Modern Intelligence
          </m.h2>

          <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed mb-5">
            Cybokrafts Universal Innovations is an Indian infrastructure technology company building AI-powered monitoring systems for critical energy assets. We operate at the intersection of hardware engineering and intelligent software.
          </m.p>

          <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed mb-8">
            Our mission is anchored in the Atmanirbhar Bharat vision — delivering indigenous, world-class technology solutions that strengthen India's energy infrastructure and reduce dependence on imported systems.
          </m.p>

          {/* Ratan Tata quote */}
          <m.div variants={fadeUp} className="border-l-2 border-accent-amber pl-5 py-1 mb-8">
            <p className="text-text-secondary italic leading-relaxed text-[15px] font-sans">
              "We are inspired by the lifelong commitment of Sir Ratan Naval Tata Ji to nation-building — the belief that Indian enterprise can and must lead global innovation."
            </p>
          </m.div>

          <m.div variants={fadeUp} className="flex flex-wrap gap-3">
            {["DPIIT Startup India", "IIT Indore Incubation", "Tata Tele Business"].map((partner, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-bg-surface border border-bg-border rounded-[3px] font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider"
              >
                {partner}
              </span>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}