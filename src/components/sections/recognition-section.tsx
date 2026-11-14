"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { staggerContainer, fadeUp, slideLeft, slideRight, VIEWPORT } from "@/lib/motion";

const EVENT_PHOTOS = [
  {
    src: "/images/achievements/cm-felicitation.jpg",
    alt: "Chief Minister Shri Mohan Yadav presenting the Certificate of Merit to the Cybokrafts team on stage at MP Semi Summit 2026",
    tag: "Felicitation",
    caption: "Receiving the Certificate of Merit from Chief Minister Shri Mohan Yadav",
  },
  {
    src: "/images/achievements/mp-semi-summit-stage.jpg",
    alt: "Main stage of the Madhya Pradesh Semiconductor Summit 2026 announcing Cybokrafts Universal Innovations as a winner of the Startup Challenge",
    tag: "MP Semi Summit 2026",
    caption: "Announced on the main stage of the Madhya Pradesh Semiconductor Summit 2026",
  },
];

export default function RecognitionSection() {
  return (
    <section
      id="recognition"
      className="relative py-24 lg:py-32 bg-bg-surface border-t border-bg-border overflow-hidden"
      aria-labelledby="recognition-heading"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-amber/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <m.span
            variants={fadeUp}
            className="font-mono text-xs text-accent-amber uppercase tracking-[0.25em] font-semibold mb-3 flex items-center justify-center gap-2"
          >
            <span className="w-6 h-px bg-accent-amber/40" />
            Recognition
            <span className="w-6 h-px bg-accent-amber/40" />
          </m.span>
          <m.h2
            id="recognition-heading"
            variants={fadeUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary uppercase tracking-tight leading-tight"
          >
            Honoured by the Government of Madhya Pradesh
          </m.h2>
          <m.p
            variants={fadeUp}
            className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-4 font-light"
          >
            Cybokrafts Universal Innovations was named a winner of the{" "}
            <span className="font-medium text-text-primary">Madhya Pradesh Semi Summit Startup Challenge 2026</span>{" "}
            and received a Certificate of Merit from Chief Minister Shri Mohan Yadav at the
            Madhya Pradesh Semiconductor Summit 2026.
          </m.p>
          <m.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-amber bg-accent-amber-bg border border-accent-amber/20 rounded-full px-3 py-1">
              <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
              Startup Challenge Winner
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-blue bg-accent-blue-light border border-accent-blue/15 rounded-full px-3 py-1">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              Certificate of Merit
            </span>
          </m.div>
        </m.div>

        {/* Event photos */}
        <div className="grid md:grid-cols-2 gap-5">
          {EVENT_PHOTOS.map((photo, idx) => (
            <m.figure
              key={photo.src}
              variants={idx === 0 ? slideLeft : slideRight}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="group rounded-2xl overflow-hidden border border-bg-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-bg-surface"
            >
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-slate-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <figcaption className="px-5 py-4 text-left">
                <span className="font-mono text-[10px] text-accent-amber uppercase tracking-wider font-semibold">
                  {photo.tag}
                </span>
                <p className="font-sans text-sm text-text-primary font-medium leading-snug mt-1">
                  {photo.caption}
                </p>
              </figcaption>
            </m.figure>
          ))}
        </div>

        {/* Chief Minister's words */}
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-5 grid sm:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] rounded-2xl overflow-hidden border border-bg-border bg-gradient-to-br from-accent-blue-light to-bg-surface shadow-sm"
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:min-h-[260px] bg-accent-blue-light">
            <Image
              src="/images/achievements/cm-mohan-yadav.jpg"
              alt="Shri Mohan Yadav, Chief Minister of Madhya Pradesh"
              fill
              sizes="(max-width: 640px) 100vw, 260px"
              className="object-cover object-top"
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-left">
            <div className="font-serif text-6xl text-accent-blue/30 leading-none -mb-4 select-none" aria-hidden="true">
              &ldquo;
            </div>
            <blockquote className="font-heading font-semibold text-xl sm:text-2xl lg:text-[26px] leading-snug text-text-primary">
              Innovations like CyboKrafts are strengthening India&rsquo;s electronics and deep-tech
              ecosystem and will play an important role in building a smarter and more reliable power
              infrastructure.
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-blue/40" aria-hidden="true" />
              <span>
                <span className="block font-sans font-semibold text-sm text-accent-blue">Shri Mohan Yadav</span>
                <span className="block font-mono text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
                  Chief Minister, Madhya Pradesh
                </span>
              </span>
            </figcaption>
          </div>
        </m.figure>

        {/* IIT Indore cohort */}
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-5 rounded-2xl overflow-hidden border border-bg-border shadow-sm bg-bg-surface"
        >
          <div className="relative w-full aspect-[1192/307]">
            <Image
              src="/images/achievements/iit-indore-cohort.jpg"
              alt="Cybokrafts with founders, mentors and faculty at the Indian Institute of Technology Indore"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
          <figcaption className="px-5 py-4 flex flex-wrap items-center justify-between gap-2 text-left">
            <span className="font-sans text-sm text-text-secondary">
              With founders, mentors and faculty at <span className="font-medium text-text-primary">IIT Indore</span>
            </span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              Incubation Ecosystem
            </span>
          </figcaption>
        </m.figure>
      </div>
    </section>
  );
}
