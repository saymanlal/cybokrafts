"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { staggerContainer, slideLeft, slideRight, fadeUp, VIEWPORT } from "@/lib/motion";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="py-28 bg-bg-muted border-t border-bg-border"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[60fr_40fr] gap-16 items-start">

        {/* Left Column: Form Console — slides in from left */}
        <m.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {submitted ? (
            <div className="bg-bg-surface border border-bg-border rounded-[3px] p-10 text-center">
              <div className="w-12 h-12 bg-status-green-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-status-green/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-status-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-2 uppercase tracking-wide">Submission Received</h3>
              <p className="font-sans text-text-secondary text-sm leading-relaxed">Thank you. Your message has been routed to our energy telemetry team. We will respond within 4 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-bg-surface border border-bg-border rounded-[3px] p-8 flex flex-col gap-5"
              noValidate
              aria-label="Contact form"
            >
              <div className="border-b border-bg-border pb-3 mb-2 flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">// TELEMETRY INTAKE CONSOLE</span>
                <span className="font-mono text-[10px] text-accent-blue uppercase tracking-widest font-semibold">SECURE GATEWAY</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[11px] text-text-muted uppercase tracking-[0.06em] mb-2">
                    Full Name <span className="text-status-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Rajesh Kumar"
                    className="w-full px-4 py-3 bg-bg-surface border border-bg-border rounded-[3px] text-text-primary font-sans text-[15px] placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-[3px] focus:ring-accent-blue/10 transition-all"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-org" className="block font-mono text-[11px] text-text-muted uppercase tracking-[0.06em] mb-2">
                    Organisation
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    placeholder="Tata Power"
                    className="w-full px-4 py-3 bg-bg-surface border border-bg-border rounded-[3px] text-text-primary font-sans text-[15px] placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-[3px] focus:ring-accent-blue/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-mono text-[11px] text-text-muted uppercase tracking-[0.06em] mb-2">
                  Work Email <span className="text-status-red" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-bg-surface border border-bg-border rounded-[3px] text-text-primary font-sans text-[15px] placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-[3px] focus:ring-accent-blue/10 transition-all"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-[11px] text-text-muted uppercase tracking-[0.06em] mb-2">
                  Message Context <span className="text-status-red" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Briefly describe your infrastructure context and monitoring requirements..."
                  className="w-full px-4 py-3 bg-bg-surface border border-bg-border rounded-[3px] text-text-primary font-sans text-[15px] placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-[3px] focus:ring-accent-blue/10 transition-all resize-none"
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-accent-blue hover:bg-accent-blue-hover text-white font-heading font-bold text-[17px] tracking-[0.06em] rounded-[3px] transition-colors shadow-none uppercase cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </m.div>

        {/* Right Column: Info Panel — slides in from right */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col gap-8 lg:pl-6"
        >
          <div>
            <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
              INFRASTRUCTURE CONNECT
            </m.p>
            <m.h2
              id="contact-heading"
              variants={slideRight}
              className="font-heading font-bold text-4xl leading-[1.05] text-text-primary uppercase tracking-tight mb-4"
            >
              Ready to Modernize Your Energy Grid?
            </m.h2>
            <m.p variants={fadeUp} className="font-sans text-text-secondary text-[15px] leading-relaxed">
              Whether you are a utility operator, industrial facility manager, or grid infrastructure investor — we would like to understand your operational context and demonstrate how Cybokrafts can serve your needs.
            </m.p>
          </div>

          <m.div variants={fadeUp} className="flex flex-col gap-6 border-t border-bg-border pt-6">
            {[
              { label: "EMAIL", value: "contact@cybokrafts.com", active: false },
              { label: "LOCATION", value: "Jabalpur, Madhya Pradesh, India", active: false },
              { label: "RESPONSE", value: "Typically within 4 hours", active: true },
            ].map((item) => (
              <div key={item.label} className="flex flex-col border-b border-bg-muted pb-4">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.06em] mb-1">
                  {item.label}
                </span>
                <div className="flex items-center">
                  <span className="font-sans text-sm font-semibold text-text-primary">
                    {item.value}
                  </span>
                  {item.active && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-status-green-bg border border-status-green/30 rounded-[3px] font-mono text-[10px] font-semibold text-status-green ml-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-status-green animate-pulse" />
                      ACTIVE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
