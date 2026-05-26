"use client";

import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <section className="py-24 bg-white border-t border-[#E2E8F0]" aria-labelledby="vision-heading">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-5">
            Vision & Mission
          </p>
          <h2
            id="vision-heading"
            className="font-heading font-bold text-4xl md:text-5xl leading-[1.18] text-[#0F172A] mb-6"
          >
            Driving Digital Energy Transformation<br className="hidden md:block" /> under the Atmanirbhar Vision
          </h2>
          <p className="text-[#334155] text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            Cybokrafts is committed to building reliable, indigenous energy intelligence systems that reduce India's dependence on foreign infrastructure technologies — and set a new benchmark for what Indian engineering companies can achieve on the global stage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            <span>Make in India</span>
            <span className="text-[#E2E8F0]">·</span>
            <span>Atmanirbhar Bharat</span>
            <span className="text-[#E2E8F0]">·</span>
            <span>National AI Mission</span>
            <span className="text-[#E2E8F0]">·</span>
            <span>MSME Certified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}