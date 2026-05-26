"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut", delay },
});

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 bg-[#F8FAFC] border-t border-[#E2E8F0]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left: Architecture layers */}
        <motion.div {...fadeUp(0)} className="relative">
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-6">
              System Architecture
            </p>
            <div className="flex flex-col gap-0">
              {[
                { label: "AIpowerOS — Analytics & Intelligence Layer", accent: false },
                { label: "Cloud Platform — Real-time Data Processing", accent: false },
                { label: "Edge Gateway — Secure Data Aggregation", accent: false },
                { label: "CYBO-VAJRA — Hardware Edge Nodes", accent: true },
              ].map((layer, i) => (
                <div key={i} className="relative">
                  <div
                    className={`w-full py-4 px-6 border border-[#E2E8F0] flex items-center ${
                      layer.accent
                        ? "border-l-4 border-l-[#2563EB] bg-blue-50/50"
                        : "bg-white"
                    } ${i === 0 ? "rounded-t-sm" : ""} ${i === 3 ? "rounded-b-sm" : ""}`}
                  >
                    <span className="text-sm font-semibold text-[#0F172A]">{layer.label}</span>
                  </div>
                  {i < 3 && (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <div className="w-px h-4 bg-[#CBD5E1]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" aria-hidden="true" />
              <span className="text-xs font-medium text-[#64748B]">
                Patent No. 202521117118 · Government of India
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: Company story */}
        <motion.div {...fadeUp(0.1)}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-5">
            Who We Are
          </p>

          <h2
            id="about-heading"
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.18] text-[#0F172A] mb-6"
          >
            Bridging Industrial Assets with Modern Intelligence
          </h2>

          <p className="text-[#334155] text-lg leading-relaxed mb-5">
            Cybokrafts Universal Innovations is an Indian infrastructure technology company building AI-powered monitoring systems for critical energy assets. We operate at the intersection of hardware engineering and intelligent software.
          </p>

          <p className="text-[#334155] text-lg leading-relaxed mb-8">
            Our mission is anchored in the Atmanirbhar Bharat vision — delivering indigenous, world-class technology solutions that strengthen India's energy infrastructure and reduce dependence on imported systems.
          </p>

          {/* Ratan Tata Reference */}
          <div className="border-l-4 border-[#2563EB] pl-5 py-1 mb-8">
            <p className="text-[#334155] italic leading-relaxed text-base">
              "We are inspired by the lifelong commitment of Sir Ratan Naval Tata Ji to nation-building — the belief that Indian enterprise can and must lead global innovation."
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { label: "DPIIT Startup India", sub: "Recognized Startup" },
              { label: "IIT Indore", sub: "Incubation Partner" },
              { label: "Tata Tele Business", sub: "Technology Partner" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-sm font-bold text-[#0F172A]">{item.label}</span>
                <span className="text-xs text-[#64748B] mt-0.5">{item.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}