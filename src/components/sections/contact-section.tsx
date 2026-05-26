"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="py-28 bg-[#EEF2F7] border-t border-[#E2E8F0]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">

        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-5">
            Partner with Us
          </p>
          <h2
            id="contact-heading"
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.18] text-[#0F172A] mb-6"
          >
            Ready to Modernize Your Energy Infrastructure?
          </h2>
          <p className="text-[#334155] text-lg leading-relaxed mb-10">
            Whether you are a utility operator, industrial facility, or infrastructure investor — we would like to understand your operational context and demonstrate how Cybokrafts can serve your needs.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { label: "Email", value: "contact@cybokrafts.com" },
              { label: "Location", value: "Jabalpur, Madhya Pradesh, India" },
              { label: "Incubated at", value: "IIT Indore Incubation Centre" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="mt-0.5 w-1 h-8 bg-[#2563EB] rounded-full flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {submitted ? (
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-10 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0F172A] mb-2">Thank you</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">Your message has been received. Our team will be in touch within 1–2 business days.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#E2E8F0] rounded-lg p-8 shadow-sm flex flex-col gap-5"
              noValidate
              aria-label="Contact form"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Rajesh Kumar"
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors bg-white"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-org" className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-2">
                    Organisation
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    placeholder="Tata Power"
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-2">
                  Work Email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors bg-white"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-2">
                  Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Briefly describe your infrastructure context and what you are looking for..."
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors resize-none bg-white"
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2563EB] text-white text-sm font-bold rounded hover:bg-blue-700 transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
