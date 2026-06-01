"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn, VIEWPORT } from "@/lib/motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1929] text-white/60 border-t border-[#1E293B]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">

        {/* Top row */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <m.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" fill="#0C1929" stroke="#1C5FD1" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="2.5" fill="#1C5FD1" />
                  <path d="M12 2.5V6.5M12 17.5V21.5M3.5 12H7.5M16.5 12H20.5" stroke="#1C5FD1" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-heading font-bold text-xl text-white tracking-[0.06em] leading-tight">
                  CYBOKRAFTS
                </span>
                <span className="font-mono text-[9px] font-semibold text-white/40 tracking-wider">
                  ENERGY INTELLIGENCE
                </span>
              </div>
            </div>

            <p className="font-sans text-[14px] leading-relaxed mb-6 max-w-sm text-white/70">
              Driving Digital Energy Transformation under the Atmanirbhar Vision. AI-powered monitoring systems for India's critical energy infrastructure.
            </p>

            {/* Ratan Tata tribute */}
            <div className="mb-4">
              <blockquote className="border-l-2 border-accent-amber pl-5 py-1 mb-2 max-w-md">
                <p className="font-sans italic text-[14px] text-white/70 leading-relaxed">
                  "Inspired by the vision and legacy of Sir Ratan Naval Tata Ji — with deep gratitude and resolve to build something worthy."
                </p>
              </blockquote>
              <cite className="block font-mono text-[11px] text-white/35 not-italic pl-5">
                — In memory of Sir Ratan Naval Tata Ji
              </cite>
            </div>
          </m.div>

          {/* Products */}
          <m.div variants={fadeUp}>
            <h3 className="text-white font-heading font-bold text-xs mb-6 uppercase tracking-widest">PRODUCTS</h3>
            <ul className="space-y-3 font-sans text-[13px] uppercase tracking-wider font-semibold">
              {["AIpowerOS Platform", "CYBO-VAJRA Device", "Solar Intelligence", "EV Infrastructure", "Transformer Analytics"].map((item) => (
                <li key={item}>
                  <a href="#solutions" className="text-white/60 hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Company */}
          <m.div variants={fadeUp}>
            <h3 className="text-white font-heading font-bold text-xs mb-6 uppercase tracking-widest">
              COMPANY
            </h3>

            <ul className="space-y-3 font-sans text-[13px] uppercase tracking-wider font-semibold">
              <li>
                <a href="#about" className="text-white/60 hover:text-white transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#values" className="text-white/60 hover:text-white transition-colors duration-200">Our 7G Values</a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-colors duration-200">Careers</a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-colors duration-200">Contact</a>
              </li>
              <li>
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
            </ul>
          </m.div>
        </m.div>

        {/* Bottom bar */}
        <m.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-sans text-xs text-white/40">
            © {year} Cybokrafts Universal Innovations Private Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-accent-amber uppercase tracking-[0.05em] font-semibold">
            <span>Made in India 🇮🇳</span>
            <span className="text-white/20">·</span>
            <span>Atmanirbhar Bharat</span>
            <span className="text-white/20">·</span>
            <span>DPIIT Recognized</span>
          </div>
        </m.div>
      </div>
    </footer>
  );
}
