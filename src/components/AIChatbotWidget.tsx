"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = { role: "bot" | "user"; text: string };
type View = "home" | "chat" | "faq";

// ─── Greeting speech (spoken aloud when widget opens) ─────────────────────────
function getGreetingText(): string {
  const h = new Date().getHours();
  const salutation =
    h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  return `${salutation}. Welcome to Cybokrafts Universal Innovations Private Limited. I am your AI assistant, here to help you explore our products, solutions, and company. How may I assist you today?`;
}

// ─── Company audio narration ──────────────────────────────────────────────────
const COMPANY_NARRATION = `Cybokrafts Universal Innovations Private Limited is a deep-technology startup
incubated at the IIT Indore Incubation Center and recognized by DPIIT under Startup India.

Our mission is to modernize energy infrastructure through artificial intelligence and the Internet of Things.

Our flagship product, CYBO-VAJRA, is a patented industrial IoT device — patent number 2 0 2 5 2 1 1 1 7 1 1 8 — 
that attaches directly to distribution transformers. It continuously monitors health parameters, 
detects anomalies in real time, and delivers predictive maintenance alerts before failures occur.

Complementing CYBO-VAJRA is AIpowerOS — our cloud-based smart grid intelligence platform. 
AIpowerOS provides live monitoring dashboards, automated reporting, and AI-driven analytics 
accessible from any browser, for utilities and industrial enterprises of any scale.

Cybokrafts is headquartered in Raipur, Chhattisgarh, and was founded by Mr. Akhil Chawla. 
We are strategic partners with Tata Tele Business Services and IIT Indore, 
and we serve electric utilities, DISCOMs, solar operators, EV charging networks, and industrial facilities.

Our vision is to eliminate preventable transformer failures, reduce distribution losses, 
and accelerate India's transition to an intelligent, resilient power grid —
in alignment with the Atmanirbhar Bharat initiative.

Thank you for your interest in Cybokrafts. We look forward to powering your infrastructure with intelligence.`;

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is Cybokrafts?",
    a: "Cybokrafts Universal Innovations Pvt. Ltd. is a DPIIT-recognised deep-tech startup incubated at IIT Indore. We develop AI-powered monitoring solutions for energy infrastructure including transformers, solar systems, and EV charging networks.",
  },
  {
    q: "What is CYBO-VAJRA?",
    a: "CYBO-VAJRA (Patent No. 202521117118) is our patented industrial IoT monitoring device. It attaches to distribution transformers and delivers real-time health diagnostics, anomaly detection, and predictive failure alerts through embedded AI.",
  },
  {
    q: "What is AIpowerOS?",
    a: "AIpowerOS is our cloud-based smart grid intelligence platform offering live monitoring dashboards, AI-driven analytics, automated alerts, and comprehensive reporting — accessible from any browser, built for utilities and enterprises.",
  },
  {
    q: "Who are your key partners?",
    a: "Cybokrafts is partnered with Tata Tele Business Services and IIT Indore. We are a DPIIT Startup India recognised company and an active member of the IIT Indore Incubation Center.",
  },
  {
    q: "Which sectors do you serve?",
    a: "We serve electricity distribution companies (DISCOMs), industrial facilities, solar energy operators, EV charging network providers, and any organisation managing critical power infrastructure.",
  },
  {
    q: "How do I request a demo?",
    a: "Scroll to the Contact section on this page or write to us at contact@cybokrafts.com. Our engineering team will schedule a tailored demonstration within 24 hours.",
  },
  {
    q: "Where is Cybokrafts headquartered?",
    a: "Our registered office is in Raipur, Chhattisgarh, India (492001). We operate nationally and are expanding to global markets.",
  },
  {
    q: "What business problems do you solve?",
    a: "We help organisations prevent unplanned transformer failures, reduce technical distribution losses, transition from reactive to predictive maintenance, and gain real-time operational visibility across their energy infrastructure.",
  },
];

// ─── Keyword auto-reply ────────────────────────────────────────────────────────
function autoReply(text: string): string {
  const t = text.toLowerCase();
  if (/\b(hi|hello|hey|namaste|greetings)\b/.test(t))
    return "Hello. I am the Cybokrafts AI assistant. Feel free to ask about CYBO-VAJRA, AIpowerOS, our partnerships, or how we can support your energy infrastructure.";
  if (/vajra|patent|device|iot|sensor/.test(t)) return FAQS[1].a;
  if (/aipoweros|dashboard|platform|cloud|software/.test(t)) return FAQS[2].a;
  if (/partner|iit|tata|collaboration/.test(t)) return FAQS[3].a;
  if (/sector|industry|utility|discom|solar|ev|client/.test(t)) return FAQS[4].a;
  if (/demo|contact|email|reach|meeting/.test(t)) return FAQS[5].a;
  if (/location|headquarter|raipur|chhattisgarh|office/.test(t)) return FAQS[6].a;
  if (/problem|solve|failure|downtime|loss|benefit/.test(t)) return FAQS[7].a;
  if (/what.*cybokrafts|about.*company|who.*you/.test(t)) return FAQS[0].a;
  if (/service|offer|product|solution/.test(t))
    return "Cybokrafts offers two core products: CYBO-VAJRA, our patented transformer monitoring device, and AIpowerOS, our cloud-based grid intelligence platform. Together they deliver real-time analytics and predictive maintenance for energy infrastructure.";
  if (/founder|ceo|akhil|chawla/.test(t))
    return "Cybokrafts was founded by Mr. Akhil Chawla. The company is headquartered in Raipur, Chhattisgarh, and incubated at IIT Indore.";
  if (/dpiit|startup india|recognition|award/.test(t))
    return "Cybokrafts holds DPIIT Startup India recognition and is incubated at the IIT Indore Incubation Center — two of the most prestigious validations for deep-tech startups in India.";
  return "Thank you for your query. For detailed information, please browse our FAQ section or navigate through the site. You may also write to us at contact@cybokrafts.com and our team will respond promptly.";
}

// ─── Speech utility ────────────────────────────────────────────────────────────
function speak(text: string, onStart?: () => void, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.0;
  u.volume = 1;
  if (onStart) u.onstart = onStart;
  if (onEnd) {
    u.onend = onEnd;
    u.onerror = onEnd;
  }
  // Prefer a natural-sounding voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.toLowerCase().includes("google") ||
        v.name.toLowerCase().includes("natural") ||
        v.name.toLowerCase().includes("neural") ||
        v.name.toLowerCase().includes("premium"))
  );
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

function stopSpeech() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AIChatbotWidget() {
  const [open, setOpen]               = useState(false);
  const [view, setView]               = useState<View>("home");
  const [messages, setMessages]       = useState<Message[]>([]);
  const [input, setInput]             = useState("");
  const [speaking, setSpeaking]       = useState(false);
  const [greeted, setGreeted]         = useState(false);
  const [showBubble, setShowBubble]   = useState(false);
  const [pulse, setPulse]             = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [typing, setTyping]           = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show silent greeting bubble 1.5s after mount; pulse FAB at dismissal
  useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 1500);
    const t2 = setTimeout(() => {
      setShowBubble(false);
      setPulse(true);
      setTimeout(() => setPulse(false), 2400);
    }, 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // On first open: seed chat message + speak greeting aloud
  useEffect(() => {
    if (open && !greeted) {
      const greetText = getGreetingText();
      setMessages([{ role: "bot", text: greetText }]);
      setGreeted(true);
      // Small delay so the panel animation completes before speech starts
      setTimeout(() => {
        speak(greetText);
      }, 500);
    }
  }, [open, greeted]);

  // Stop speech when panel closes
  useEffect(() => {
    if (!open) { stopSpeech(); setSpeaking(false); }
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ─── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = autoReply(text);
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: reply }]);
    }, 800);
  }, [input]);

  // ─── Narration controls ────────────────────────────────────────────────────
  function handleNarration() {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
    } else {
      speak(
        COMPANY_NARRATION,
        () => setSpeaking(true),
        () => setSpeaking(false)
      );
    }
  }

  // ─── Section scroll ────────────────────────────────────────────────────────
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        /* ── Variables ── */
        .ck-root {
          --ck-navy:    #06101e;
          --ck-navy2:   #0b1d35;
          --ck-navy3:   #102648;
          --ck-cyan:    #00AEEF;
          --ck-cyan2:   #33c3f7;
          --ck-text:    #e8edf3;
          --ck-muted:   #7a8fa6;
          --ck-border:  rgba(0,174,239,0.14);
          --ck-border2: rgba(255,255,255,0.07);
          --ck-radius:  18px;
          --ck-font-head: var(--font-barlow, 'Barlow Condensed', sans-serif);
          --ck-font-body: var(--font-dm, 'DM Sans', sans-serif);
        }
        .ck-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .ck-root, .ck-root input, .ck-root button, .ck-root textarea {
          font-family: var(--ck-font-body);
        }

        /* ── FAB ── */
        .ck-fab {
          position: fixed; bottom: 30px; right: 30px; z-index: 9999;
          width: 58px; height: 58px; border-radius: 50%; border: none;
          background: var(--ck-navy2);
          box-shadow:
            0 0 0 1px var(--ck-border),
            0 8px 32px rgba(0,0,0,0.5),
            0 0 28px rgba(0,174,239,0.2);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          outline: none;
        }
        .ck-fab:hover {
          transform: scale(1.07);
          box-shadow:
            0 0 0 1px rgba(0,174,239,0.35),
            0 12px 40px rgba(0,0,0,0.6),
            0 0 40px rgba(0,174,239,0.35);
        }
        .ck-fab:focus-visible { outline: 2px solid var(--ck-cyan); outline-offset: 3px; }
        .ck-fab.ck-pulse { animation: ckFabPulse 2.2s ease-in-out; }
        @keyframes ckFabPulse {
          0%,100% { box-shadow: 0 0 0 1px var(--ck-border), 0 8px 32px rgba(0,0,0,.5), 0 0 28px rgba(0,174,239,.2); }
          45%      { box-shadow: 0 0 0 1px rgba(0,174,239,.4), 0 8px 32px rgba(0,0,0,.5), 0 0 0 18px rgba(0,174,239,.08), 0 0 50px rgba(0,174,239,.4); }
        }

        /* FAB inner icon */
        .ck-fab-icon {
          position: relative; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
        }
        .ck-fab-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(0,174,239,0.5);
          animation: ckRingPulse 3s ease-in-out infinite;
        }
        .ck-fab-ring:nth-child(1) { width: 20px; height: 20px; animation-delay: 0s; }
        .ck-fab-ring:nth-child(2) { width: 30px; height: 30px; animation-delay: 1s; opacity: 0.4; }
        @keyframes ckRingPulse {
          0%,100% { transform: scale(0.9); opacity: 0.6; }
          50%      { transform: scale(1.1); opacity: 0.15; }
        }
        .ck-fab-center {
          width: 8px; height: 8px;
          background: var(--ck-cyan);
          border-radius: 50%; z-index: 1;
          box-shadow: 0 0 12px rgba(0,174,239,0.9), 0 0 4px rgba(0,174,239,1);
        }

        /* ── Greeting bubble ── */
        .ck-greeting-bubble {
          position: fixed; bottom: 98px; right: 30px; z-index: 9998;
          background: var(--ck-navy2);
          border: 1px solid var(--ck-border);
          border-radius: 12px 12px 3px 12px;
          padding: 14px 18px;
          max-width: 260px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.55);
          animation: ckBubbleIn 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes ckBubbleIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ck-bubble-label {
          font-family: var(--ck-font-head);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ck-cyan); display: block; margin-bottom: 7px;
        }
        .ck-bubble-text {
          font-size: 12.5px; line-height: 1.6;
          color: var(--ck-text);
        }
        .ck-bubble-dismiss {
          display: block; margin-top: 10px;
          font-size: 11px; color: var(--ck-muted);
          background: none; border: none; cursor: pointer;
          padding: 0; text-align: right; width: 100%;
          transition: color 0.15s;
        }
        .ck-bubble-dismiss:hover { color: var(--ck-cyan); }

        /* ── Main panel ── */
        .ck-panel {
          position: fixed; bottom: 98px; right: 30px; z-index: 9998;
          width: 380px;
          max-height: 580px;
          background: var(--ck-navy);
          border: 1px solid var(--ck-border);
          border-radius: var(--ck-radius);
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow:
            0 24px 80px rgba(0,0,0,0.7),
            0 0 0 1px rgba(0,174,239,0.05),
            inset 0 1px 0 rgba(255,255,255,0.04);
          animation: ckPanelIn 0.38s cubic-bezier(0.34,1.46,0.64,1);
        }
        @keyframes ckPanelIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Panel header ── */
        .ck-header {
          background: linear-gradient(160deg, var(--ck-navy3) 0%, var(--ck-navy2) 100%);
          padding: 16px 18px;
          display: flex; align-items: center; gap: 13px;
          border-bottom: 1px solid var(--ck-border);
          flex-shrink: 0;
        }
        .ck-header-logo {
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 10px;
          background: linear-gradient(145deg, var(--ck-navy3), var(--ck-navy2));
          border: 1px solid var(--ck-border);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .ck-header-logo::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 60% 30%, rgba(0,174,239,0.18), transparent 70%);
        }
        /* SVG lightning bolt mark */
        .ck-bolt-svg { width: 16px; height: 20px; fill: var(--ck-cyan); z-index: 1; }

        .ck-header-text { flex: 1; }
        .ck-header-name {
          font-family: var(--ck-font-head);
          font-size: 14.5px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ck-text); line-height: 1.1;
        }
        .ck-header-sub {
          font-size: 11px; color: var(--ck-muted);
          margin-top: 3px; display: flex; align-items: center; gap: 5px;
        }
        .ck-online-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.8);
          animation: ckDotBlink 3s ease-in-out infinite;
        }
        @keyframes ckDotBlink {
          0%,90%,100% { opacity: 1; } 95% { opacity: 0.3; }
        }
        .ck-close-btn {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ck-border2);
          cursor: pointer; color: var(--ck-muted);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          flex-shrink: 0;
        }
        .ck-close-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.14);
          color: var(--ck-text);
        }
        /* close X icon */
        .ck-close-svg { width: 10px; height: 10px; stroke: currentColor; stroke-width: 2; fill: none; }

        /* ── Nav tabs ── */
        .ck-nav {
          display: flex;
          background: rgba(0,0,0,0.25);
          border-bottom: 1px solid var(--ck-border2);
          flex-shrink: 0;
        }
        .ck-nav-btn {
          flex: 1; padding: 10px 6px; background: none; border: none;
          cursor: pointer; font-size: 11px; font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--ck-muted);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, background 0.15s, border-color 0.15s;
          text-transform: uppercase;
        }
        .ck-nav-btn.active {
          color: var(--ck-cyan);
          border-bottom-color: var(--ck-cyan);
          background: rgba(0,174,239,0.04);
        }
        .ck-nav-btn:hover:not(.active) { color: rgba(232,237,243,0.7); }
        .ck-nav-icon {
          width: 15px; height: 15px; stroke: currentColor;
          stroke-width: 1.8; fill: none;
        }

        /* ── HOME VIEW ── */
        .ck-home {
          flex: 1; overflow-y: auto; padding: 18px;
          display: flex; flex-direction: column; gap: 13px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,174,239,0.18) transparent;
        }

        /* Identity card */
        .ck-id-card {
          background: linear-gradient(145deg, rgba(0,174,239,0.07) 0%, rgba(0,174,239,0.02) 100%);
          border: 1px solid var(--ck-border);
          border-radius: 12px; padding: 18px;
          position: relative; overflow: hidden;
        }
        .ck-id-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,174,239,0.4), transparent);
        }
        .ck-id-company {
          font-family: var(--ck-font-head);
          font-size: 13.5px; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--ck-text); margin-bottom: 5px;
        }
        .ck-id-tagline {
          font-size: 12px; color: var(--ck-muted); line-height: 1.55;
        }
        .ck-id-pills {
          display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px;
        }
        .ck-pill {
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.05em;
          padding: 4px 10px; border-radius: 20px;
          background: rgba(0,174,239,0.09);
          border: 1px solid rgba(0,174,239,0.22);
          color: rgba(0,174,239,0.9);
        }

        /* Action grid */
        .ck-action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
        .ck-action-btn {
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--ck-border2);
          border-radius: 10px; padding: 14px 12px;
          cursor: pointer; text-align: left;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          display: flex; flex-direction: column; gap: 4px;
        }
        .ck-action-btn:hover {
          border-color: var(--ck-border);
          background: rgba(0,174,239,0.05);
          transform: translateY(-1px);
        }
        .ck-action-icon {
          width: 20px; height: 20px; stroke: var(--ck-cyan);
          stroke-width: 1.6; fill: none; margin-bottom: 4px;
        }
        .ck-action-label {
          font-size: 12px; font-weight: 600; color: var(--ck-text);
        }
        .ck-action-sub { font-size: 10.5px; color: var(--ck-muted); }

        /* Narration card */
        .ck-narration-card {
          background: rgba(0,174,239,0.04);
          border: 1px solid var(--ck-border);
          border-radius: 10px; padding: 14px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .ck-narration-info { flex: 1; }
        .ck-narration-title {
          font-size: 12.5px; font-weight: 600; color: var(--ck-text);
          letter-spacing: 0.02em;
        }
        .ck-narration-sub {
          font-size: 11px; color: var(--ck-muted); margin-top: 3px;
        }
        /* Waveform */
        .ck-waveform {
          display: flex; align-items: center; gap: 2.5px; margin-top: 8px; height: 16px;
        }
        .ck-bar {
          width: 2.5px; border-radius: 2px; background: var(--ck-cyan);
          animation: ckBar 0.8s ease-in-out infinite;
        }
        .ck-bar:nth-child(1){height:5px;  animation-delay:0s}
        .ck-bar:nth-child(2){height:10px; animation-delay:.1s}
        .ck-bar:nth-child(3){height:7px;  animation-delay:.2s}
        .ck-bar:nth-child(4){height:14px; animation-delay:.3s}
        .ck-bar:nth-child(5){height:9px;  animation-delay:.4s}
        .ck-bar:nth-child(6){height:13px; animation-delay:.5s}
        .ck-bar:nth-child(7){height:6px;  animation-delay:.6s}
        @keyframes ckBar {
          0%,100% { transform: scaleY(0.4); opacity: 0.5; }
          50%      { transform: scaleY(1.2); opacity: 1; }
        }
        /* Play/stop button */
        .ck-play-btn {
          width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0;
          background: linear-gradient(145deg, var(--ck-navy3), var(--ck-navy2));
          border: 1px solid var(--ck-border);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .ck-play-btn:hover {
          border-color: rgba(0,174,239,0.4);
          box-shadow: 0 0 18px rgba(0,174,239,0.2);
          transform: scale(1.04);
        }
        .ck-play-btn.active {
          border-color: rgba(239,68,68,0.4);
          background: linear-gradient(145deg, rgba(127,29,29,0.3), rgba(127,29,29,0.15));
        }
        .ck-play-svg {
          width: 14px; height: 14px; fill: var(--ck-cyan);
          transition: fill 0.15s;
        }
        .ck-play-btn.active .ck-play-svg { fill: #ef4444; }

        /* ── CHAT VIEW ── */
        .ck-chat-view { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        .ck-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,174,239,0.18) transparent;
        }
        .ck-msg { max-width: 86%; display: flex; flex-direction: column; }
        .ck-msg.bot { align-self: flex-start; }
        .ck-msg.user { align-self: flex-end; }
        .ck-msg-bubble {
          padding: 10px 14px; font-size: 13px; line-height: 1.65;
        }
        .ck-msg.bot .ck-msg-bubble {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ck-border2);
          border-radius: 3px 12px 12px 12px;
          color: var(--ck-text);
        }
        .ck-msg.user .ck-msg-bubble {
          background: linear-gradient(145deg, #005fa3, #0080c8);
          border: 1px solid rgba(0,174,239,0.3);
          border-radius: 12px 12px 3px 12px;
          color: #fff;
          box-shadow: 0 2px 16px rgba(0,100,180,0.25);
        }
        /* Typing indicator */
        .ck-typing-bubble {
          align-self: flex-start;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ck-border2);
          border-radius: 3px 12px 12px 12px;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 4px;
        }
        .ck-typing-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--ck-muted);
          animation: ckTyping 1.2s ease-in-out infinite;
        }
        .ck-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .ck-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes ckTyping {
          0%,60%,100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        /* Input row */
        .ck-input-row {
          padding: 12px 14px;
          border-top: 1px solid var(--ck-border2);
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
          background: rgba(0,0,0,0.15);
        }
        .ck-text-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ck-border2);
          border-radius: 9px; padding: 9px 13px;
          font-size: 13px; color: var(--ck-text); outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .ck-text-input::placeholder { color: rgba(122,143,166,0.6); }
        .ck-text-input:focus {
          border-color: rgba(0,174,239,0.4);
          background: rgba(255,255,255,0.06);
        }
        .ck-send-btn {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          background: linear-gradient(145deg, #005fa3, #007ec0);
          border: 1px solid rgba(0,174,239,0.35);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(0,100,180,0.25);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .ck-send-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 4px 18px rgba(0,100,180,0.4);
        }
        .ck-send-svg {
          width: 14px; height: 14px; fill: #fff;
        }

        /* ── FAQ VIEW ── */
        .ck-faq-view {
          flex: 1; overflow-y: auto; padding: 14px;
          display: flex; flex-direction: column; gap: 7px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,174,239,0.18) transparent;
        }
        .ck-faq-item {
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--ck-border2);
          border-radius: 10px; overflow: hidden;
          transition: border-color 0.2s;
        }
        .ck-faq-item.open { border-color: var(--ck-border); }
        .ck-faq-q {
          width: 100%; background: none; border: none;
          padding: 12px 14px; text-align: left; cursor: pointer;
          display: flex; justify-content: space-between; align-items: flex-start;
          color: var(--ck-text); font-size: 12.5px; font-weight: 500;
          line-height: 1.45; gap: 10px;
          transition: color 0.15s;
        }
        .ck-faq-q:hover { color: var(--ck-cyan-2, #33c3f7); }
        .ck-faq-item.open .ck-faq-q { color: var(--ck-cyan); }
        .ck-faq-chevron {
          width: 14px; height: 14px; flex-shrink: 0;
          stroke: var(--ck-muted); stroke-width: 2; fill: none;
          transition: transform 0.22s ease, stroke 0.15s;
          margin-top: 1px;
        }
        .ck-faq-item.open .ck-faq-chevron {
          transform: rotate(180deg);
          stroke: var(--ck-cyan);
        }
        .ck-faq-a {
          padding: 0 14px 13px;
          font-size: 12px; color: var(--ck-muted); line-height: 1.7;
          border-top: 1px solid var(--ck-border2);
          padding-top: 11px;
          animation: ckFadeSlide 0.2s ease;
        }
        @keyframes ckFadeSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Mobile ── */
        @media (max-width: 440px) {
          .ck-panel { width: calc(100vw - 24px); right: 12px; bottom: 80px; max-height: 72vh; }
          .ck-fab { right: 14px; bottom: 16px; }
          .ck-greeting-bubble { right: 12px; max-width: calc(100vw - 80px); }
        }
      `}</style>

      <div className="ck-root">

        {/* ── Greeting bubble ── */}
        {showBubble && !open && (
          <div className="ck-greeting-bubble">
            <span className="ck-bubble-label">Cybokrafts AI</span>
            <p className="ck-bubble-text">
              {getGreetingText()}
            </p>
            <button className="ck-bubble-dismiss" onClick={() => setShowBubble(false)}>
              Dismiss
            </button>
          </div>
        )}

        {/* ── Panel ── */}
        {open && (
          <div className="ck-panel" role="dialog" aria-label="Cybokrafts AI Assistant">

            {/* Header */}
            <div className="ck-header">
              <div className="ck-header-logo">
                {/* Lightning bolt SVG mark */}
                <svg className="ck-bolt-svg" viewBox="0 0 14 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L0 11h6l-1 9 9-12H8L8 0z" />
                </svg>
              </div>
              <div className="ck-header-text">
                <div className="ck-header-name">Cybokrafts AI</div>
                <div className="ck-header-sub">
                  <span className="ck-online-dot" />
                  Energy Intelligence Assistant
                </div>
              </div>
              <button
                className="ck-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <svg className="ck-close-svg" viewBox="0 0 10 10">
                  <line x1="1" y1="1" x2="9" y2="9" />
                  <line x1="9" y1="1" x2="1" y2="9" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="ck-nav" aria-label="Assistant sections">
              {(["home", "chat", "faq"] as View[]).map((v) => (
                <button
                  key={v}
                  className={`ck-nav-btn ${view === v ? "active" : ""}`}
                  onClick={() => setView(v)}
                  aria-current={view === v ? "page" : undefined}
                >
                  {/* Icons */}
                  {v === "home" && (
                    <svg className="ck-nav-icon" viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  )}
                  {v === "chat" && (
                    <svg className="ck-nav-icon" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  )}
                  {v === "faq" && (
                    <svg className="ck-nav-icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )}
                  {v === "home" ? "Overview" : v === "chat" ? "Chat" : "FAQ"}
                </button>
              ))}
            </nav>

            {/* ── HOME ── */}
            {view === "home" && (
              <div className="ck-home">

                {/* Identity card */}
                <div className="ck-id-card">
                  <div className="ck-id-company">Cybokrafts Universal Innovations</div>
                  <div className="ck-id-tagline">
                    AI-powered monitoring for transformers, solar networks, and EV infrastructure. Predictive. Real-time. Intelligent.
                  </div>
                  <div className="ck-id-pills">
                    <span className="ck-pill">DPIIT Recognised</span>
                    <span className="ck-pill">IIT Indore Incubated</span>
                    <span className="ck-pill">Patent 202521117118</span>
                  </div>
                </div>

                {/* Action grid */}
                <div className="ck-action-grid">
                  <button className="ck-action-btn" onClick={() => setView("chat")}>
                    <svg className="ck-action-icon" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    <span className="ck-action-label">Ask a Question</span>
                    <span className="ck-action-sub">Free-form conversation</span>
                  </button>
                  <button className="ck-action-btn" onClick={() => setView("faq")}>
                    <svg className="ck-action-icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span className="ck-action-label">Browse FAQ</span>
                    <span className="ck-action-sub">Common queries</span>
                  </button>
                  <button className="ck-action-btn" onClick={() => scrollTo("solutions")}>
                    <svg className="ck-action-icon" viewBox="0 0 24 24">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span className="ck-action-label">Our Products</span>
                    <span className="ck-action-sub">VAJRA · AIpowerOS</span>
                  </button>
                  <button className="ck-action-btn" onClick={() => scrollTo("contact")}>
                    <svg className="ck-action-icon" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="ck-action-label">Contact Us</span>
                    <span className="ck-action-sub">Request a demo</span>
                  </button>
                </div>

                {/* Narration card */}
                <div className="ck-narration-card">
                  <div className="ck-narration-info">
                    <div className="ck-narration-title">Company Overview</div>
                    <div className="ck-narration-sub">
                      {speaking ? "Narration in progress…" : "Listen to an audio introduction"}
                    </div>
                    {speaking && (
                      <div className="ck-waveform">
                        {[0,1,2,3,4,5,6].map(i => (
                          <div key={i} className="ck-bar" />
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    className={`ck-play-btn ${speaking ? "active" : ""}`}
                    onClick={handleNarration}
                    aria-label={speaking ? "Stop narration" : "Play company overview"}
                  >
                    {speaking ? (
                      // Stop icon
                      <svg className="ck-play-svg" viewBox="0 0 14 14" style={{fill:"#ef4444"}}>
                        <rect x="1" y="1" width="5" height="12" rx="1" />
                        <rect x="8" y="1" width="5" height="12" rx="1" />
                      </svg>
                    ) : (
                      // Play icon
                      <svg className="ck-play-svg" viewBox="0 0 14 14">
                        <polygon points="2,1 13,7 2,13" />
                      </svg>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* ── CHAT ── */}
            {view === "chat" && (
              <div className="ck-chat-view">
                <div className="ck-messages" role="log" aria-live="polite">
                  {messages.map((m, i) => (
                    <div key={i} className={`ck-msg ${m.role}`}>
                      <div className="ck-msg-bubble">{m.text}</div>
                    </div>
                  ))}
                  {typing && (
                    <div className="ck-typing-bubble">
                      <div className="ck-typing-dot" />
                      <div className="ck-typing-dot" />
                      <div className="ck-typing-dot" />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="ck-input-row">
                  <input
                    className="ck-text-input"
                    placeholder="Ask about CYBO-VAJRA, AIpowerOS…"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                    aria-label="Message input"
                  />
                  <button
                    className="ck-send-btn"
                    onClick={sendMessage}
                    aria-label="Send message"
                    disabled={!input.trim()}
                  >
                    <svg className="ck-send-svg" viewBox="0 0 14 14">
                      <polygon points="0,0 14,7 0,14 2,7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── FAQ ── */}
            {view === "faq" && (
              <div className="ck-faq-view" role="list">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className={`ck-faq-item ${expandedFaq === i ? "open" : ""}`}
                    role="listitem"
                  >
                    <button
                      className="ck-faq-q"
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      aria-expanded={expandedFaq === i}
                    >
                      <span>{faq.q}</span>
                      <svg className="ck-faq-chevron" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {expandedFaq === i && (
                      <div className="ck-faq-a">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ── FAB ── */}
        <button
          className={`ck-fab${pulse ? " ck-pulse" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close AI assistant" : "Open Cybokrafts AI assistant"}
          aria-expanded={open}
        >
          <div className="ck-fab-icon">
            <div className="ck-fab-ring" />
            <div className="ck-fab-ring" />
            <div className="ck-fab-center" />
          </div>
        </button>

      </div>
    </>
  );
}