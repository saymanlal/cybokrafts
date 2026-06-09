"use client";

import { useState, useRef } from "react";
import { m, useMotionValue, useTransform, useSpring } from "framer-motion";
import { staggerContainer, slideLeft, slideRight, fadeUp, VIEWPORT } from "@/lib/motion";

const PHONE_RAW = "9300501865"; // replace with actual number
const PHONE_DISPLAY = "+91 930 050 1865"; // replace with actual number
const PHONE_HREF = `tel:+91${PHONE_RAW}`;
const EMAIL = "aiinnovations@cybokrafts.com";
const EMAIL_SUBJECT = encodeURIComponent("Inquiry – Cybokrafts Grid Solutions");
const EMAIL_BODY = encodeURIComponent(
  `Dear Cybokrafts Team,\n\nI am reaching out regarding your industrial IoT and smart grid solutions.\n\nOrganisation: \nContact Name: \nMessage:\n\n\nLooking forward to hearing from you.\n\nBest regards,`
);
const EMAIL_HREF = `mailto:${EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

const contactMeta = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
    label: "EMAIL",
    value: EMAIL,
    href: EMAIL_HREF,
    badge: null,
    action: "Draft a message",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7A16 16 0 0 0 16 16.79l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "PHONE",
    value: PHONE_DISPLAY,
    href: PHONE_HREF,
    badge: null,
    action: "Tap to call",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "LOCATION",
    value: "Raipur, Chhattisgarh · IIT Indore Incubated",
    href: null,
    badge: null,
    action: null,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "RESPONSE TIME",
    value: "Typically within 4 hours",
    href: null,
    badge: "ACTIVE",
    action: null,
  },
];

/* ── Floating label input/textarea ── */
function FloatingField({
  id,
  label,
  type = "text",
  required,
  placeholder,
  multiline,
  rows,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const lifted = focused || hasValue;

  const baseClass =
    "w-full bg-transparent border border-bg-border rounded-[3px] text-text-primary font-sans text-[15px] focus:outline-none focus:border-accent-blue focus:ring-[3px] focus:ring-accent-blue/10 transition-all placeholder-transparent";
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-4 font-mono text-[11px] uppercase tracking-[0.06em] transition-all duration-200 pointer-events-none select-none ${
          lifted ? "top-2 text-accent-blue" : "top-1/2 -translate-y-1/2 text-text-muted"
        } ${multiline && !lifted ? "top-4 translate-y-0" : ""}`}
      >
        {label}
        {required && (
          <span className="text-status-red ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {/* @ts-ignore */}
      <Tag
        id={id}
        type={!multiline ? type : undefined}
        required={required}
        rows={multiline ? rows : undefined}
        placeholder={placeholder}
        className={`${baseClass} ${lifted ? "pt-6 pb-2 px-4" : "pt-4 pb-4 px-4"} ${multiline ? "resize-none" : ""}`}
        onFocus={() => setFocused(true)}
        onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setHasValue(e.target.value.length > 0)
        }
        aria-required={required}
      />
    </div>
  );
}

/* ── Tilt card wrapper ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 30 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), springConfig);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <m.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </m.div>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden bg-bg-muted border-t border-bg-border"
      aria-labelledby="contact-heading"
    >
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-accent-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent-blue) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* large decorative label */}
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 font-heading font-bold text-[clamp(80px,12vw,160px)] leading-none text-text-primary/[0.03] uppercase tracking-tighter select-none"
        aria-hidden="true"
      >
        CONTACT
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section eyebrow */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-14"
        >
          <m.p variants={fadeUp} className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
            INFRASTRUCTURE CONNECT
          </m.p>
          <m.h2
            id="contact-heading"
            variants={slideLeft}
            className="font-heading font-bold text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-text-primary uppercase tracking-tight"
          >
            Ready to Modernize
            <br />
            <span className="text-accent-blue">Your Energy Grid?</span>
          </m.h2>
        </m.div>

        <div className="grid lg:grid-cols-[55fr_45fr] gap-14 items-start">

          {/* ── Left: Form ── */}
          <m.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {submitted ? (
              <TiltCard>
                <div className="bg-bg-surface border border-bg-border rounded-[3px] p-10 text-center">
                  <div className="w-14 h-14 bg-status-green-bg rounded-full flex items-center justify-center mx-auto mb-5 border border-status-green/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-status-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-text-primary mb-2 uppercase tracking-wide">
                    Submission Received
                  </h3>
                  <p className="font-sans text-text-secondary text-sm leading-relaxed">
                    Your message has been routed to our energy telemetry team. We will respond within 4 hours.
                  </p>
                </div>
              </TiltCard>
            ) : (
              <TiltCard>
                <form
                  onSubmit={handleSubmit}
                  className="bg-bg-surface border border-bg-border rounded-[3px] p-8 flex flex-col gap-5"
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Console header */}
                  <div className="border-b border-bg-border pb-4 mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-status-green animate-pulse" aria-hidden="true" />
                      <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                        TELEMETRY INTAKE CONSOLE
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-accent-blue uppercase tracking-widest font-semibold">
                      SECURE GATEWAY
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingField id="contact-name" label="Full Name" required placeholder="Rajesh Kumar" />
                    <FloatingField id="contact-org" label="Organisation" placeholder="Tata Power" />
                  </div>

                  <FloatingField id="contact-email" label="Work Email" type="email" required placeholder="you@company.com" />

                  <FloatingField
                    id="contact-phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                  />

                  <FloatingField
                    id="contact-message"
                    label="Message Context"
                    required
                    multiline
                    rows={4}
                    placeholder="Describe your infrastructure context..."
                  />

                  <button
                    type="submit"
                    className="group relative w-full py-4 bg-accent-blue hover:bg-accent-blue-hover text-white font-heading font-bold text-[17px] tracking-[0.06em] rounded-[3px] transition-colors uppercase cursor-pointer overflow-hidden"
                  >
                    <span className="relative z-10">Send Message</span>
                    {/* shimmer sweep */}
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/10 skew-x-12"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </TiltCard>
            )}
          </m.div>

          {/* ── Right: Info ── */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-4"
          >
            <m.p variants={fadeUp} className="font-sans text-text-secondary text-[15px] leading-relaxed mb-2">
              Whether you are a utility operator, industrial facility manager, or grid infrastructure investor — we
              would like to understand your operational context and demonstrate how Cybokrafts can serve your needs.
            </m.p>

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {contactMeta.map((item, i) => {
                const isClickable = !!item.href;

                const inner = (
                  <>
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-[3px] bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.06em] mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-sans text-sm font-semibold text-text-primary truncate">{item.value}</p>
                        {item.action && (
                          <p className="font-mono text-[10px] text-accent-blue mt-0.5">{item.action} →</p>
                        )}
                      </div>
                      {item.badge && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-status-green-bg border border-status-green/30 rounded-[3px] font-mono text-[10px] font-semibold text-status-green self-start mt-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-status-green animate-pulse" aria-hidden="true" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </>
                );

                return (
                  <m.div
                    key={item.label}
                    variants={fadeUp}
                    custom={i}
                    whileHover={isClickable ? { x: 4 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {isClickable ? (
                      <a
                        href={item.href!}
                        className="block bg-bg-surface border border-bg-border hover:border-accent-blue/50 rounded-[3px] p-4 transition-all group"
                        aria-label={`${item.label}: ${item.value}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="bg-bg-surface border border-bg-border rounded-[3px] p-4">
                        {inner}
                      </div>
                    )}
                  </m.div>
                );
              })}
            </div>

            {/* DPIIT badge */}
            <m.div
              variants={fadeUp}
              className="mt-2 flex items-center gap-3 border border-bg-border rounded-[3px] bg-bg-surface px-4 py-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-[3px] bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.06em]">RECOGNITION</p>
                <p className="font-sans text-xs font-semibold text-text-primary">DPIIT-Recognised · Incubated at IIT Indore</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}