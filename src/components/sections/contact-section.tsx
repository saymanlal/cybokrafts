"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { staggerContainer, slideLeft, fadeUp, VIEWPORT } from "@/lib/motion";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */
const PHONE_NUMBER  = "9300501865";          // ← replace with real 10-digit number
const PHONE_DISPLAY = "+91 930 050 1865";     // ← replace with display form
const EMAIL_ADDRESS = "aiinnovations@cybokrafts.com";

/* ───────────────────────────── SVGS ────────────────────────────── */
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7A16 16 0 0 0 16 16.79l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

/* ──────────────────── FLOATING LABEL FIELD ─────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}

function FloatingField({ id, label, type = "text", required, multiline, rows = 4, value, onChange }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";
  const commonClass =
    "w-full bg-transparent border border-bg-border rounded-[3px] text-text-primary font-sans text-[15px] " +
    "placeholder-transparent transition-all duration-200 " +
    "focus:outline-none focus:border-accent-blue focus:ring-[3px] focus:ring-accent-blue/10 " +
    (multiline ? "resize-none " : "") +
    (lifted ? "pt-6 pb-2.5 px-4 " : "pt-4 pb-4 px-4 ");

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={
          "absolute left-4 font-mono text-[11px] uppercase tracking-[0.06em] pointer-events-none select-none transition-all duration-200 " +
          (lifted ? "top-2 text-[10px] text-accent-blue" : (multiline ? "top-4 text-text-muted" : "top-1/2 -translate-y-1/2 text-text-muted"))
        }
      >
        {label}{required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {/* @ts-ignore */}
      <Tag
        id={id}
        type={!multiline ? type : undefined}
        required={required}
        rows={multiline ? rows : undefined}
        placeholder={label}
        value={value}
        className={commonClass}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        aria-required={required}
      />
    </div>
  );
}

/* ─────────────────────── TILT CARD WRAPPER ─────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 180, damping: 28 };
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), cfg);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), cfg);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function leave() { mx.set(0); my.set(0); }

  return (
    <m.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="[perspective:900px]"
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </m.div>
  );
}

/* ─────────────────── EMAIL MODAL COMPONENT ─────────────────────── */
function EmailModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    const subject = encodeURIComponent("Inquiry – Cybokrafts Grid Solutions");
    const emailBody = encodeURIComponent(
      `Dear Cybokrafts Team,\n\nI am reaching out regarding your industrial IoT and smart grid solutions.\n\nName: ${name}\nOrganisation: ${org}\n\nMessage:\n${body}\n\nLooking forward to hearing from you.\n\nBest regards,\n${name}`
    );
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${emailBody}`;
    setSent(true);
    setTimeout(onClose, 2000);
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(12,25,41,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Compose email"
    >
      <m.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="w-full max-w-lg bg-bg-surface border border-bg-border rounded-[3px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-bg-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[3px] bg-accent-blue/10 flex items-center justify-center text-accent-blue">
              <IconMail />
            </div>
            <div>
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">COMPOSE MESSAGE</p>
              <p className="font-sans text-sm font-semibold text-text-primary">{EMAIL_ADDRESS}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[3px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-muted transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <AnimatePresence mode="wait">
          {sent ? (
            <m.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 px-6 gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
                <IconCheck />
              </div>
              <p className="font-heading font-bold text-lg text-text-primary uppercase tracking-wide">Mail Client Opened</p>
              <p className="font-sans text-sm text-text-secondary text-center">Your draft has been prepared and your mail client is opening. Send when ready.</p>
            </m.div>
          ) : (
            <m.div key="form" className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FloatingField id="modal-name" label="Your Name" required value={name} onChange={setName} />
                <FloatingField id="modal-org" label="Organisation" value={org} onChange={setOrg} />
              </div>
              <div className="px-4 py-3 bg-bg-muted border border-bg-border rounded-[3px]">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-0.5">TO</p>
                <p className="font-sans text-sm text-text-primary">{EMAIL_ADDRESS}</p>
              </div>
              <div className="px-4 py-3 bg-bg-muted border border-bg-border rounded-[3px]">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-0.5">SUBJECT</p>
                <p className="font-sans text-sm text-text-primary">Inquiry – Cybokrafts Grid Solutions</p>
              </div>
              <FloatingField id="modal-body" label="Your Message" required multiline rows={4} value={body} onChange={setBody} />
              <button
                onClick={handleSend}
                disabled={!name.trim() || !body.trim()}
                className={
                  "group relative w-full py-3.5 font-heading font-bold text-base tracking-[0.06em] uppercase rounded-[3px] transition-all duration-200 cursor-pointer overflow-hidden " +
                  "disabled:opacity-40 disabled:cursor-not-allowed " +
                  "bg-accent-blue hover:bg-accent-blue-hover text-white"
                }
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Open in Mail App
                  <span className="group-hover:translate-x-1 transition-transform duration-200"><IconArrow /></span>
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/10 skew-x-12" aria-hidden="true"/>
              </button>
              <p className="font-mono text-[10px] text-text-muted text-center uppercase tracking-wider">
                Opens your default mail application · Gmail, Outlook, Apple Mail
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}

/* ──────────────────── CALL CONFIRMATION MODAL ───────────────────── */
function CallModal({ onClose }: { onClose: () => void }) {
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleCall() {
    setCalling(true);
    window.location.href = `tel:+91${PHONE_NUMBER}`;
    setTimeout(onClose, 1500);
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(12,25,41,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Confirm call"
    >
      <m.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="w-full max-w-sm bg-bg-surface border border-bg-border rounded-[3px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 flex flex-col items-center text-center gap-5">
          {/* Animated phone icon */}
          <m.div
            animate={calling ? { scale: [1, 1.15, 1], rotate: [0, 12, -12, 0] } : { scale: [1, 1.04, 1] }}
            transition={{ duration: calling ? 0.6 : 2, repeat: calling ? 0 : Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7A16 16 0 0 0 16 16.79l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </m.div>

          <div>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">DIRECT LINE</p>
            <p className="font-heading font-bold text-2xl text-text-primary tracking-wide">{PHONE_DISPLAY}</p>
            <p className="font-sans text-sm text-text-secondary mt-1">Cybokrafts — Energy Telemetry Team</p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleCall}
              disabled={calling}
              className="group relative w-full py-3.5 bg-green-600 hover:bg-green-500 disabled:bg-green-600/60 text-white font-heading font-bold text-base tracking-[0.06em] uppercase rounded-[3px] transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {calling ? "Connecting..." : "Call Now"}
                {!calling && <IconArrow />}
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/10 skew-x-12" aria-hidden="true"/>
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 border border-bg-border text-text-secondary hover:text-text-primary hover:border-bg-border/80 font-sans text-sm rounded-[3px] transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

/* ──────────────────────── CONTACT CARD ─────────────────────────── */
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  badge?: string;
  actionLabel?: string;
  actionVariant?: "blue" | "green";
  onAction?: () => void;
  delay?: number;
}

function ContactCard({ icon, label, value, subtext, badge, actionLabel, actionVariant = "blue", onAction, delay = 0 }: ContactCardProps) {
  return (
    <m.div
      variants={fadeUp}
      custom={delay}
      className="bg-bg-surface border border-bg-border rounded-[3px] p-4 flex items-start gap-4 group hover:border-accent-blue/30 transition-all duration-300"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-[3px] bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/20 transition-colors duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.06em] mb-0.5">{label}</p>
        <p className="font-sans text-sm font-semibold text-text-primary truncate">{value}</p>
        {subtext && <p className="font-sans text-xs text-text-secondary mt-0.5">{subtext}</p>}
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-2">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-[3px] font-mono text-[10px] font-semibold text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true"/>
            {badge}
          </span>
        )}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={
              "group/btn relative flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer overflow-hidden " +
              (actionVariant === "green"
                ? "bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white hover:border-green-600"
                : "bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue hover:text-white hover:border-accent-blue")
            }
          >
            <span className="relative z-10 flex items-center gap-1.5">
              {actionVariant === "green" ? <IconPhone /> : <IconMail />}
              {actionLabel}
            </span>
          </button>
        )}
      </div>
    </m.div>
  );
}

/* ──────────────────────── MAIN COMPONENT ───────────────────────── */
export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showCall, setShowCall] = useState(false);

  // Field state lifted up for controlled inputs
  const [fname, setFname] = useState("");
  const [forg, setForg] = useState("");
  const [femail, setFemail] = useState("");
  const [fphone, setFphone] = useState("");
  const [fmsg, setFmsg] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* ── Modals ── */}
      <AnimatePresence>
        {showEmail && <EmailModal onClose={() => setShowEmail(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCall && <CallModal onClose={() => setShowCall(false)} />}
      </AnimatePresence>

      <section
        id="contact"
        className="relative py-28 overflow-hidden bg-bg-muted border-t border-bg-border"
        aria-labelledby="contact-heading"
      >
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* Ghost watermark */}
        <div
          className="pointer-events-none absolute -bottom-4 -right-4 font-heading font-bold leading-none text-text-primary/[0.025] uppercase tracking-tighter select-none"
          style={{ fontSize: "clamp(80px,14vw,180px)" }}
          aria-hidden="true"
        >CONNECT</div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          {/* ── Eyebrow + heading ── */}
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
              variants={fadeUp}
              className="font-heading font-bold leading-[1.05] text-text-primary uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Ready to Modernize<br />
              <span className="text-accent-blue">Your Energy Grid?</span>
            </m.h2>
          </m.div>

          {/* ── Two-column layout ── */}
          <div className="grid lg:grid-cols-[56fr_44fr] gap-14 items-start">

            {/* ── LEFT: Form ── */}
            <m.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <TiltCard>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                      className="bg-bg-surface border border-bg-border rounded-[3px] p-12 text-center flex flex-col items-center gap-5"
                    >
                      <m.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500"
                      >
                        <IconCheck />
                      </m.div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-text-primary uppercase tracking-wide mb-2">
                          Submission Received
                        </h3>
                        <p className="font-sans text-text-secondary text-sm leading-relaxed">
                          Your message has been routed to our energy telemetry team. We will respond within 4 hours.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 font-mono text-[11px] text-text-muted hover:text-accent-blue uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Send another message →
                      </button>
                    </m.div>
                  ) : (
                    <m.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="bg-bg-surface border border-bg-border rounded-[3px] p-8 flex flex-col gap-5"
                      noValidate
                      aria-label="Contact form"
                    >
                      {/* Console bar */}
                      <div className="border-b border-bg-border pb-4 mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"/>
                          <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">TELEMETRY INTAKE CONSOLE</span>
                        </div>
                        <span className="font-mono text-[10px] text-accent-blue uppercase tracking-widest font-semibold">SECURE</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <FloatingField id="f-name" label="Full Name" required value={fname} onChange={setFname} />
                        <FloatingField id="f-org" label="Organisation" value={forg} onChange={setForg} />
                      </div>
                      <FloatingField id="f-email" label="Work Email" type="email" required value={femail} onChange={setFemail} />
                      <FloatingField id="f-phone" label="Phone Number" type="tel" value={fphone} onChange={setFphone} />
                      <FloatingField id="f-msg" label="Message Context" required multiline rows={4} value={fmsg} onChange={setFmsg} />

                      <m.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full py-4 bg-accent-blue hover:bg-accent-blue-hover text-white font-heading font-bold text-[17px] tracking-[0.06em] rounded-[3px] transition-colors uppercase cursor-pointer overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2.5">
                          Send Message
                          <m.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <IconArrow />
                          </m.span>
                        </span>
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/10 skew-x-12" aria-hidden="true"/>
                      </m.button>
                    </m.form>
                  )}
                </AnimatePresence>
              </TiltCard>
            </m.div>

            {/* ── RIGHT: Info cards ── */}
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex flex-col gap-4"
            >
              <m.p variants={fadeUp} className="font-sans text-text-secondary text-[15px] leading-relaxed mb-2">
                Whether you are a utility operator, industrial facility manager, or grid infrastructure investor — we would like to understand your operational context and demonstrate how Cybokrafts can serve your needs.
              </m.p>

              {/* Email card */}
              <ContactCard
                icon={<IconMail />}
                label="EMAIL"
                value={EMAIL_ADDRESS}
                subtext="Opens a pre-filled draft in your mail app"
                actionLabel="Draft Mail"
                actionVariant="blue"
                onAction={() => setShowEmail(true)}
                delay={0}
              />

              {/* Phone card */}
              <ContactCard
                icon={<IconPhone />}
                label="DIRECT LINE"
                value={PHONE_DISPLAY}
                subtext="Connects directly with +91 prefix"
                actionLabel="Call Now"
                actionVariant="green"
                onAction={() => setShowCall(true)}
                delay={1}
              />

              {/* Location card */}
              <ContactCard
                icon={<IconPin />}
                label="HEADQUARTERS"
                value="Jabalpur, Madhya Pradesh, India"
                subtext="Incubated at IIT Indore · DPIIT Recognised"
                delay={2}
              />

              {/* Response card */}
              <ContactCard
                icon={<IconClock />}
                label="RESPONSE TIME"
                value="Typically within 4 hours"
                badge="ACTIVE"
                delay={3}
              />

              {/* Trust strip */}
              <m.div
                variants={fadeUp}
                className="mt-1 flex items-center gap-3 border border-bg-border rounded-[3px] bg-bg-surface px-4 py-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-[3px] bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <IconShield />
                </div>
                <p className="font-sans text-xs text-text-secondary leading-snug">
                  <span className="text-text-primary font-semibold">DPIIT-Recognised Deep-Tech Startup.</span>{" "}
                  Incubated at IIT Indore. Headquartered in Jabalpur, M.P.
                </p>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>
    </>
  );
}