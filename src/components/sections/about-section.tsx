"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { staggerContainer, slideLeft, slideRight, fadeUp, cellFadeUp, VIEWPORT } from "@/lib/motion";

const parentLayer = {
  label: "AIpowerOS",
  desc: "Patented Cloud Intelligence Platform",
  border: "border-l-[3px] border-l-status-green hover:border-l-[5px] hover:border-l-status-green",
  patent: "Patent 202521117118",
};

const subLayers = [
  {
    label: "Edge Gateway",
    desc: "Secure Data Aggregation",
    border: "border-l-[2px] border-l-accent-blue hover:border-l-[4px] hover:border-l-accent-blue",
  },
  {
    label: "Cloud Platform",
    desc: "Real-time Data Processing",
    border: "border-l-[2px] border-l-accent-blue hover:border-l-[4px] hover:border-l-accent-blue",
  },
  {
    label: "CYBO-VAJRA",
    desc: "Edge Hardware Node",
    border: "border-l-[2px] border-l-accent-amber hover:border-l-[4px] hover:border-l-accent-amber",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 bg-bg-muted border-t border-bg-border relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-amber/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Row: Architecture (Left) + Ratan Tata Image with Quote (Right) */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          
          {/* Left: Architecture Layers */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative"
          >
            <m.div variants={slideLeft} className="bg-bg-surface border border-bg-border rounded-[3px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
                SYSTEM ARCHITECTURE
              </p>
              
              <div className="flex flex-col relative">
                
                {/* Parent Core Hardware Node */}
                <m.div
                  variants={cellFadeUp}
                  className={`bg-bg-surface border border-bg-border rounded-[4px] p-5 flex flex-col justify-between hover:border-status-green/50 hover:shadow-md transition-all duration-200 group relative ${parentLayer.border}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] font-bold text-status-green uppercase tracking-wider bg-status-green-bg px-2 py-0.5 rounded-sm border border-status-green/10">
                      PATENTED CORE SOFTWARE
                    </span>
                    <span className="font-mono text-[9px] font-bold text-text-muted">
                      {parentLayer.patent}
                    </span>
                  </div>
                  
                  <h4 className="font-heading font-bold text-lg group-hover:text-status-green transition-colors text-text-primary uppercase tracking-wide leading-tight mb-1">
                    {parentLayer.label}
                  </h4>
                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed pr-0 sm:pr-24">
                    {parentLayer.desc}
                  </p>

                  <div className="sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 relative right-auto top-auto translate-y-0 mt-3 self-start flex items-center gap-1.5 font-mono text-[8px] text-status-green font-bold uppercase tracking-widest bg-status-green-bg px-2 py-1 rounded-sm border border-status-green/20">
                    <span className="w-1.5 h-1.5 bg-status-green rounded-full animate-ping" />
                    <span>CORE PLATFORM</span>
                  </div>
                </m.div>

                {/* Tree Connection Line */}
                <div className="relative pl-10 mt-4 flex flex-col gap-4">
                  <div className="absolute left-[16px] top-[-16px] bottom-[30px] w-[2px] bg-bg-border-strong/45" />

                  {subLayers.map((layer, i) => (
                    <div key={i} className="relative">
                      <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-[24px] h-[2px] bg-bg-border-strong/45" />
                      <div className="absolute left-[-27px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-bg-border-strong bg-white z-10 flex items-center justify-center">
                        <div className={`w-1 h-1 rounded-full ${
                          layer.label === "CYBO-VAJRA" ? "bg-accent-amber" : "bg-accent-blue"
                        }`} />
                      </div>

                      <m.div
                        variants={cellFadeUp}
                        className={`bg-bg-surface border border-bg-border rounded-[4px] p-4 flex flex-col justify-between hover:border-text-muted hover:shadow-md transition-all duration-200 group relative ${layer.border}`}
                      >
                        <div>
                          <h5 className="font-heading font-bold text-[15px] group-hover:text-accent-blue transition-colors text-text-primary uppercase tracking-wide leading-tight mb-1">
                            {layer.label}
                          </h5>
                          <p className="font-sans text-[12px] text-text-secondary leading-relaxed pr-0 sm:pr-20">
                            {layer.desc}
                          </p>
                        </div>
                        <div className="sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 relative right-auto top-auto translate-y-0 mt-2 block font-mono text-[8px] text-text-muted font-bold tracking-widest uppercase">
                          // {layer.label.split(" ")[0]}
                        </div>
                      </m.div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>

          {/* Right: Ratan Tata — Wide Image with Quote */}
          <m.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative group"
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-[320px] bg-gradient-to-r from-slate-900 to-slate-800">
                <Image
                  src="/images/ratan_tata.png"
                  alt="Sir Ratan Tata"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: "50% 30%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
              </div>
              
              <div className="absolute left-6 xs:left-8 top-1/2 -translate-y-1/2 max-w-[75%] sm:max-w-[280px] text-left">
                <div className="text-6xl text-accent-amber/30 font-serif mb-2">"</div>
                <p className="font-serif text-white text-lg leading-relaxed font-medium">
                  Indian enterprise can and must lead global innovation.
                </p>
                <p className="font-mono text-[10px] text-accent-amber uppercase tracking-wider mt-3">
                  — Sir Ratan Tata
                </p>
                <div className="w-12 h-px bg-accent-amber/50 ml-auto mt-3" />
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-end gap-2">
              <div className="w-8 h-px bg-accent-amber/40" />
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                Industrial Visionary · Tata Group Chairman Emeritus
              </span>
            </div>
          </m.div>
        </div>

        {/* Middle Row: Company Story Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
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
              className="font-heading font-bold text-4xl md:text-[2.5rem] leading-[1.05] text-text-primary uppercase tracking-tight"
            >
              Bridging Industrial Assets with Modern Intelligence
            </m.h2>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-6 lg:mt-9"
          >
            <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed">
              Cybokrafts Universal Innovations is an Indian infrastructure technology company building AI-powered monitoring systems for critical energy assets. We operate at the intersection of hardware engineering and intelligent software.
            </m.p>

            <m.p variants={fadeUp} className="font-sans text-text-secondary text-[16px] leading-relaxed">
              Our mission is anchored in the Atmanirbhar Bharat vision — delivering indigenous, world-class technology solutions that strengthen India's energy infrastructure and reduce dependence on imported systems.
            </m.p>
          </m.div>
        </div>

        {/* Bottom Row: Nikola Tesla Image + Partners */}
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          
          {/* Left: Partners Section */}
          <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <div className="mb-6">
              <p className="font-mono text-[9px] text-text-muted font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-accent-blue/40" />
                ACCREDITATIONS & PARTNERS
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {["DPIIT Startup India", "IIT Indore Incubation", "Tata Tele Business"].map((partner, i) => (
                <m.span
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.1}
                  className="px-4 py-2 bg-bg-surface border border-bg-border rounded-[3px] font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider hover:border-accent-blue/40 hover:text-accent-blue transition-all duration-200 cursor-default"
                >
                  {partner}
                </m.span>
              ))}
            </div>

            <m.div variants={fadeUp} className="mt-8 pt-6 border-t border-bg-border/50">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-bg-muted border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-status-green" />
                    </div>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                  Trusted by Industry Leaders
                </span>
              </div>
            </m.div>
          </m.div>

          {/* Right: Nikola Tesla — Wide Image with Quote */}
          <m.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative group"
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-[320px] bg-gradient-to-r from-slate-800 to-slate-900">
                <Image
                  src="/images/nikola_tesla.png"
                  alt="Nikola Tesla"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: "50% 25%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>
              
              <div className="absolute left-6 xs:left-8 top-1/2 -translate-y-1/2 max-w-[75%] sm:max-w-[300px] text-left">
                <div className="text-6xl text-accent-blue/30 font-serif mb-2">"</div>
                <p className="font-serif text-white text-lg leading-relaxed font-medium">
                  Think in terms of energy, frequency and vibration.
                </p>
                <p className="font-mono text-[10px] text-accent-blue uppercase tracking-wider mt-3">
                  — Nikola Tesla
                </p>
                <div className="w-12 h-px bg-accent-blue/50 mt-3" />
              </div>
            </div>
            
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                AC Power Pioneer · Inventor of Modern Electricity
              </span>
              <div className="w-8 h-px bg-accent-blue/40" />
            </div>
          </m.div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute bottom-8 left-8 w-24 h-24 pointer-events-none opacity-20">
          <div className="absolute bottom-0 left-0 w-12 h-px bg-accent-amber" />
          <div className="absolute bottom-0 left-0 w-px h-12 bg-accent-amber" />
        </div>
        <div className="absolute top-8 right-8 w-24 h-24 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-12 h-px bg-accent-blue" />
          <div className="absolute top-0 right-0 w-px h-12 bg-accent-blue" />
        </div>
      </div>
    </section>
  );
}