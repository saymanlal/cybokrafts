"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type Message = { role: "bot" | "user"; text: string; id: number };
type View = "home" | "chat" | "faq";

// ─── Greeting ────────────────────────────────────────────────────────────────
function getGreetingText(): string {
  const h = new Date().getHours();
  const salutation = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return `${salutation}. Welcome to Cybokrafts Universal Innovations. I'm your AI assistant — here to help you explore CYBO-VAJRA, AIpowerOS, and our energy solutions. How may I assist you today?`;
}

// ─── Narration ───────────────────────────────────────────────────────────────
const COMPANY_NARRATION = `Cybokrafts Universal Innovations Private Limited is a deep-technology startup incubated at the IIT Indore Incubation Center and recognised by DPIIT under Startup India.

Our mission is to modernise energy infrastructure through artificial intelligence and the Internet of Things.

Our flagship product, CYBO-VAJRA, is a patented industrial IoT device — patent number 202521117118 — that attaches directly to distribution transformers. It continuously monitors health parameters, detects anomalies in real time, and delivers predictive maintenance alerts before failures occur.

Complementing CYBO-VAJRA is AIpowerOS — our cloud-based smart grid intelligence platform. AIpowerOS provides live monitoring dashboards, automated reporting, and AI-driven analytics accessible from any browser.

Cybokrafts is headquartered at IIT Indore, Madhya Pradesh, and was founded by Mr. Akhil Chawla. We are strategic partners with Tata Tele Business Services.

Our vision is to eliminate preventable transformer failures, reduce distribution losses, and accelerate India's transition to an intelligent, resilient power grid.`;

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
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
    a: "Our registered office is at IIT Indore, Madhya Pradesh, India (453552). We operate nationally and are expanding to global markets.",
  },
  {
    q: "What business problems do you solve?",
    a: "We help organisations prevent unplanned transformer failures, reduce technical distribution losses, transition from reactive to predictive maintenance, and gain real-time operational visibility across their energy infrastructure.",
  },
];

// ─── Auto-reply ───────────────────────────────────────────────────────────────
function autoReply(text: string): string {
  const t = text.toLowerCase();
  if (/\b(hi|hello|hey|namaste|greetings)\b/.test(t))
    return "Hello! I'm the Cybokrafts AI assistant. Feel free to ask about CYBO-VAJRA, AIpowerOS, our partnerships, or how we can support your energy infrastructure.";
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
    return "Cybokrafts was founded by Mr. Akhil Chawla. The company is headquartered at IIT Indore, Madhya Pradesh.";
  if (/dpiit|startup india|recognition|award/.test(t))
    return "Cybokrafts holds DPIIT Startup India recognition and is incubated at the IIT Indore Incubation Center — two of the most prestigious validations for deep-tech startups in India.";
  return "Thank you for your query. For detailed information, please browse our FAQ section or navigate through the site. You may also write to us at contact@cybokrafts.com and our team will respond promptly.";
}

// ─── Speech — gesture-safe ────────────────────────────────────────────────────
function speak(text: string, onStart?: () => void, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  // Resume context first (required after browser suspends it)
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.pitch = 1.0;
  utter.volume = 1;
  if (onStart) utter.onstart = onStart;
  if (onEnd) { utter.onend = onEnd; utter.onerror = onEnd; }

  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("neural") ||
          v.name.toLowerCase().includes("premium"))
    );
    if (preferred) utter.voice = preferred;
    window.speechSynthesis.speak(utter);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", trySpeak, { once: true });
  } else {
    trySpeak();
  }
}

function stopSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────
// Signal/waveform FAB icon — precision instrumentation
const IconSignal = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 11h3l2.5-6L9 17l2.5-10L14 14l1.5-3H21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconOverview = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const IconChat = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconFaq = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconClose = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="1" y1="1" x2="10" y2="10" /><line x1="10" y1="1" x2="1" y2="10" />
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const IconStop = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg
    width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round"
    style={{ transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconSpeaker = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 010 14.14" /><path d="M15.54 8.46a5 5 0 010 7.07" />
  </svg>
);
const IconMute = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const [faqSpeaking, setFaqSpeaking] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Bubble timing
  useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 3000);
    const t2 = setTimeout(() => {
      setShowBubble(false);
      setPulse(true);
      setTimeout(() => setPulse(false), 2800);
    }, 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // On first open: seed greeting + speak (inside user gesture = safe)
  useEffect(() => {
    if (open && !greeted) {
      const greet = getGreetingText();
      setMessages([{ role: "bot", text: greet, id: Date.now() }]);
      setGreeted(true);
      // Small delay lets the panel render before speech fires
      setTimeout(() => speak(greet), 150);
    }
  }, [open, greeted]);

  // Stop speech when panel closes
  useEffect(() => {
    if (!open) {
      stopSpeech();
      setSpeaking(false);
      setFaqSpeaking(null);
    }
  }, [open]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when switching to chat
  useEffect(() => {
    if (view === "chat" && open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [view, open]);

  // Prevent page scroll bleed — non-passive wheel on panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    const handler = (e: WheelEvent) => {
      e.stopPropagation();
      const scrollable = (e.target as HTMLElement).closest(".cw-scroll") as HTMLElement | null;
      if (!scrollable) { e.preventDefault(); return; }
      const atTop = scrollable.scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atBottom) e.preventDefault();
    };

    panel.addEventListener("wheel", handler, { passive: false });
    return () => panel.removeEventListener("wheel", handler);
  }, [open]);

  // Touch scroll fix
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onMove = (e: TouchEvent) => {
      const scrollable = (e.target as HTMLElement).closest(".cw-scroll") as HTMLElement | null;
      if (!scrollable) { e.preventDefault(); return; }
      const dy = e.touches[0].clientY - startY;
      const atTop = scrollable.scrollTop <= 0 && dy > 0;
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1 && dy < 0;
      if (atTop || atBottom) e.preventDefault();
    };
    panel.addEventListener("touchstart", onStart, { passive: true });
    panel.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      panel.removeEventListener("touchstart", onStart);
      panel.removeEventListener("touchmove", onMove);
    };
  }, [open]);

  // Send message
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { role: "user", text, id: Date.now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = autoReply(text);
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: reply, id: Date.now() + 1 }]);
    }, 950);
  }, [input]);

  function handleNarration() {
    if (speaking) {
      stopSpeech(); setSpeaking(false);
    } else {
      setFaqSpeaking(null);
      speak(COMPANY_NARRATION, () => setSpeaking(true), () => setSpeaking(false));
    }
  }

  function handleFaqSpeak(index: number) {
    if (faqSpeaking === index) {
      stopSpeech(); setFaqSpeaking(null);
    } else {
      stopSpeech(); setSpeaking(false); setFaqSpeaking(index);
      speak(`${FAQS[index].q}. ${FAQS[index].a}`, undefined, () => setFaqSpeaking(null));
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

        /* ── TOKEN LAYER ─────────────────────────────────── */
        .cw-root {
          --ink:       #0A1628;
          --ink2:      #3D5068;
          --ink3:      #8298B0;
          --ink4:      #B8C8D8;
          --paper:     #FFFFFF;
          --paper2:    #F4F7FA;
          --paper3:    #EBF0F5;
          --rule:      #DDE4EC;
          --rule2:     #C8D4E0;
          --accent:    #006EAF;
          --accent-lt: #E5F2F9;
          --accent-md: #CCE7F5;
          --accent-hi: #00A3C4;
          --green:     #00875A;
          --green-lt:  #E3F5EE;
          --red:       #C0392B;
          --shadow-sm: 0 1px 4px rgba(10,22,40,0.06), 0 0 0 1px rgba(10,22,40,0.04);
          --shadow-md: 0 4px 20px rgba(10,22,40,0.10), 0 1px 6px rgba(10,22,40,0.06);
          --shadow-lg: 0 16px 48px rgba(10,22,40,0.14), 0 4px 16px rgba(10,22,40,0.08), 0 0 0 1px rgba(10,22,40,0.04);
          --r:         12px;
          --r-sm:      8px;
          --r-lg:      16px;
          --speed:     0.18s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .cw-root *, .cw-root *::before, .cw-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── FAB ─────────────────────────────────────────── */
        .cw-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          width: 56px; height: 56px; border-radius: 50%; border: none;
          background: var(--ink);
          box-shadow: 0 6px 24px rgba(10,22,40,0.3), 0 2px 8px rgba(10,22,40,0.2);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, background 0.18s ease;
          outline: none;
        }
        .cw-fab:hover {
          transform: scale(1.08) translateY(-2px);
          background: var(--accent);
          box-shadow: 0 10px 32px rgba(0,110,175,0.35), 0 3px 10px rgba(0,110,175,0.2);
        }
        .cw-fab:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .cw-fab-icon { transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1); }
        .cw-fab-open .cw-fab-icon { transform: rotate(45deg); }
        .cw-fab.cw-pulse { animation: cwFabPulse 0.6s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes cwFabPulse {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.18); }
          70%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .cw-fab-dot {
          position: absolute; top: 10px; right: 10px;
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--accent-hi); border: 2px solid var(--paper);
          animation: cwDotBlink 2.5s ease-in-out infinite;
        }
        @keyframes cwDotBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* ── BUBBLE ──────────────────────────────────────── */
        .cw-bubble {
          position: fixed; bottom: 100px; right: 28px; z-index: 9998;
          background: var(--paper);
          border: 1px solid var(--rule);
          border-radius: var(--r-lg) var(--r-lg) 4px var(--r-lg);
          padding: 14px 16px;
          max-width: 272px;
          box-shadow: var(--shadow-lg);
          animation: cwBubbleIn 0.38s cubic-bezier(0.34,1.46,0.64,1);
        }
        @keyframes cwBubbleIn {
          from { opacity:0; transform:translateY(14px) scale(0.94); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .cw-bubble-label {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 8px;
        }
        .cw-bubble-dot-live {
          width: 5px; height: 5px; border-radius: 50%; background: var(--green);
          animation: cwLive 2s ease-in-out infinite;
        }
        @keyframes cwLive { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .cw-bubble-text { font-size: 12.5px; line-height: 1.6; color: var(--ink2); }
        .cw-bubble-dismiss {
          display: block; width: 100%; text-align: right;
          font-size: 11px; color: var(--ink3);
          background: none; border: none; cursor: pointer;
          margin-top: 8px; padding: 0; font-family: inherit;
          transition: color var(--speed);
        }
        .cw-bubble-dismiss:hover { color: var(--accent); }

        /* ── PANEL ───────────────────────────────────────── */
        .cw-panel {
          position: fixed; bottom: 100px; right: 28px; z-index: 9998;
          width: 396px; height: 580px;
          background: var(--paper2);
          border: 1px solid var(--rule);
          border-radius: var(--r-lg);
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: cwPanelIn 0.36s cubic-bezier(0.34,1.46,0.64,1);
          touch-action: none;
        }
        @keyframes cwPanelIn {
          from { opacity:0; transform:translateY(20px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── HEADER ──────────────────────────────────────── */
        .cw-header {
          background: var(--paper);
          border-bottom: 1px solid var(--rule);
          padding: 14px 16px;
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0; position: relative; overflow: hidden;
        }
        /* Scan line animation */
        .cw-header::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,110,175,0.04), transparent);
          animation: cwScan 4s linear infinite;
          pointer-events: none;
        }
        @keyframes cwScan { to { left: 160%; } }
        .cw-header-mark {
          width: 38px; height: 38px; border-radius: var(--r-sm); flex-shrink: 0;
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
        }
        .cw-header-info { flex: 1; min-width: 0; }
        .cw-header-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
          color: var(--ink); line-height: 1;
        }
        .cw-header-row { display: flex; align-items: center; gap: 7px; margin-top: 4px; }
        .cw-live-pill {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--green);
          background: var(--green-lt); border-radius: 4px;
          padding: 2px 7px;
        }
        .cw-live-pip {
          width: 4px; height: 4px; border-radius: 50%; background: var(--green);
          animation: cwLive 2s ease-in-out infinite;
        }
        .cw-header-sub { font-size: 11px; color: var(--ink3); }
        .cw-close {
          width: 30px; height: 30px; border-radius: var(--r-sm); flex-shrink: 0;
          background: var(--paper2); border: 1px solid var(--rule);
          cursor: pointer; color: var(--ink2);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--speed), color var(--speed), transform var(--speed);
          outline: none;
        }
        .cw-close:hover { background: var(--paper3); color: var(--ink); transform: rotate(90deg); }

        /* ── NAV ─────────────────────────────────────────── */
        .cw-nav {
          display: flex; background: var(--paper);
          border-bottom: 1px solid var(--rule);
          padding: 0 8px; gap: 2px;
          flex-shrink: 0;
        }
        .cw-nav-btn {
          flex: 1; padding: 10px 4px;
          background: none; border: none; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.04em;
          color: var(--ink3);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          border-bottom: 2px solid transparent;
          transition: color var(--speed), border-color var(--speed);
          outline: none;
        }
        .cw-nav-btn.active { color: var(--accent); border-bottom-color: var(--accent); }
        .cw-nav-btn:hover:not(.active) { color: var(--ink2); }

        /* ── SCROLL CONTAINER ────────────────────────────── */
        .cw-scroll {
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .cw-scroll::-webkit-scrollbar { width: 4px; }
        .cw-scroll::-webkit-scrollbar-track { background: transparent; }
        .cw-scroll::-webkit-scrollbar-thumb { background: var(--rule2); border-radius: 2px; }
        .cw-scroll::-webkit-scrollbar-thumb:hover { background: var(--ink4); }

        /* ── HOME VIEW ───────────────────────────────────── */
        .cw-home {
          flex: 1; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
        }

        /* Identity card */
        .cw-id-card {
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: var(--r); padding: 16px;
          position: relative; overflow: hidden;
        }
        .cw-id-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-hi));
        }
        .cw-id-eyebrow {
          font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 6px;
        }
        .cw-id-tagline { font-size: 12.5px; color: var(--ink2); line-height: 1.65; }
        .cw-id-pills { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
        .cw-pill {
          font-size: 10px; font-weight: 600; letter-spacing: 0.04em;
          padding: 3px 9px; border-radius: 4px;
          background: var(--accent-lt); color: var(--accent);
          border: 1px solid var(--accent-md);
        }

        /* Stats */
        .cw-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .cw-stat {
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: var(--r-sm); padding: 12px 10px; text-align: center;
        }
        .cw-stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800; color: var(--ink); line-height: 1;
        }
        .cw-stat-lbl { font-size: 9.5px; color: var(--ink3); margin-top: 4px; line-height: 1.3; }

        /* Action grid */
        .cw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .cw-action {
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: var(--r); padding: 14px 12px;
          cursor: pointer; text-align: left;
          transition: border-color var(--speed), transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow var(--speed);
          display: flex; flex-direction: column; gap: 4px;
          outline: none;
        }
        .cw-action:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,110,175,0.1);
        }
        .cw-action:active { transform: translateY(0) scale(0.98); }
        .cw-action-icon {
          width: 30px; height: 30px; border-radius: 7px; margin-bottom: 6px;
          background: var(--accent-lt); border: 1px solid var(--accent-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .cw-action-label { font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .cw-action-sub { font-size: 10.5px; color: var(--ink3); }

        /* Narration */
        .cw-narration {
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: var(--r); padding: 14px;
          display: flex; align-items: center; gap: 12px;
        }
        .cw-narration-info { flex: 1; min-width: 0; }
        .cw-narration-title { font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .cw-narration-sub { font-size: 11px; color: var(--ink3); margin-top: 3px; }
        .cw-waveform { display: flex; align-items: center; gap: 2.5px; margin-top: 8px; height: 18px; }
        .cw-bar {
          width: 2.5px; border-radius: 2px; background: var(--accent);
          animation: cwBar 0.9s ease-in-out infinite;
        }
        .cw-bar:nth-child(1){height:4px;  animation-delay:0s}
        .cw-bar:nth-child(2){height:12px; animation-delay:.1s}
        .cw-bar:nth-child(3){height:7px;  animation-delay:.2s}
        .cw-bar:nth-child(4){height:16px; animation-delay:.3s}
        .cw-bar:nth-child(5){height:9px;  animation-delay:.4s}
        .cw-bar:nth-child(6){height:13px; animation-delay:.5s}
        .cw-bar:nth-child(7){height:5px;  animation-delay:.6s}
        .cw-bar:nth-child(8){height:10px; animation-delay:.7s}
        @keyframes cwBar {
          0%,100% { transform:scaleY(0.35); opacity:0.3; }
          50%      { transform:scaleY(1.2);  opacity:1; }
        }
        .cw-play-btn {
          width: 42px; height: 42px; border-radius: var(--r-sm); flex-shrink: 0;
          background: var(--accent-lt); border: 1px solid var(--accent-md);
          cursor: pointer; color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--speed), color var(--speed), transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
          outline: none;
        }
        .cw-play-btn:hover {
          background: var(--accent); color: #fff;
          transform: scale(1.06);
        }
        .cw-play-btn.active { background: #FEE8E8; border-color: #F5C5C5; color: var(--red); }
        .cw-play-btn.active:hover { background: var(--red); color: #fff; }

        /* ── CHAT VIEW ───────────────────────────────────── */
        .cw-chat { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        .cw-messages {
          flex: 1; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: var(--paper2);
        }
        .cw-msg { max-width: 86%; display: flex; flex-direction: column; }
        .cw-msg.bot { align-self: flex-start; }
        .cw-msg.user { align-self: flex-end; }
        .cw-msg-row { display: flex; gap: 8px; align-items: flex-end; }
        .cw-avatar {
          width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
          background: var(--ink); border: 1px solid var(--rule2);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
        }
        .cw-bubble-msg {
          padding: 10px 13px; font-size: 13px; line-height: 1.65;
          animation: cwMsgIn 0.24s cubic-bezier(0.34,1.46,0.64,1);
        }
        @keyframes cwMsgIn {
          from { opacity:0; transform:translateY(6px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .cw-msg.bot .cw-bubble-msg {
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: 4px 12px 12px 12px; color: var(--ink);
          box-shadow: var(--shadow-sm);
        }
        .cw-msg.user .cw-bubble-msg {
          background: var(--ink); color: #fff;
          border-radius: 12px 12px 4px 12px;
          box-shadow: 0 4px 14px rgba(10,22,40,0.2);
        }
        .cw-typing {
          align-self: flex-start;
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: 4px 12px 12px 12px;
          padding: 12px 15px;
          display: flex; align-items: center; gap: 4px;
          box-shadow: var(--shadow-sm);
        }
        .cw-typing-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--ink3);
          animation: cwTyping 1.3s ease-in-out infinite;
        }
        .cw-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .cw-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cwTyping {
          0%,60%,100% { transform:translateY(0); opacity:0.35; }
          30% { transform:translateY(-5px); opacity:1; background: var(--accent); }
        }

        /* Input */
        .cw-input-bar {
          padding: 12px 14px;
          border-top: 1px solid var(--rule);
          background: var(--paper);
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
        }
        .cw-text-input {
          flex: 1; background: var(--paper2); border: 1px solid var(--rule2);
          border-radius: var(--r-sm); padding: 9px 13px;
          font-size: 13px; color: var(--ink); outline: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: border-color var(--speed), box-shadow var(--speed);
        }
        .cw-text-input::placeholder { color: var(--ink4); }
        .cw-text-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(0,110,175,0.1);
        }
        .cw-send-btn {
          width: 36px; height: 36px; border-radius: var(--r-sm); flex-shrink: 0;
          background: var(--ink); border: none; cursor: pointer; color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background var(--speed), opacity var(--speed);
          outline: none;
        }
        .cw-send-btn:hover:not(:disabled) { transform: scale(1.08); background: var(--accent); }
        .cw-send-btn:active:not(:disabled) { transform: scale(0.95); }
        .cw-send-btn:disabled { opacity: 0.3; cursor: default; }

        /* Hint chips */
        .cw-hints { display: flex; gap: 6px; flex-wrap: wrap; padding: 0 14px 10px; background: var(--paper); }
        .cw-hint {
          font-size: 11px; font-weight: 500; color: var(--ink2);
          background: var(--paper2); border: 1px solid var(--rule);
          border-radius: 20px; padding: 4px 10px; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: color var(--speed), border-color var(--speed), background var(--speed);
          white-space: nowrap; outline: none;
        }
        .cw-hint:hover { color: var(--accent); border-color: var(--accent-md); background: var(--accent-lt); }

        /* ── FAQ VIEW ────────────────────────────────────── */
        .cw-faq-view {
          flex: 1; padding: 12px;
          display: flex; flex-direction: column; gap: 6px;
          background: var(--paper2);
        }
        .cw-faq-item {
          background: var(--paper); border: 1px solid var(--rule);
          border-radius: var(--r); overflow: hidden;
          transition: border-color var(--speed), box-shadow var(--speed);
        }
        .cw-faq-item.open {
          border-color: var(--accent-md);
          box-shadow: 0 4px 16px rgba(0,110,175,0.08);
        }
        .cw-faq-q {
          width: 100%; background: none; border: none; padding: 13px 14px;
          text-align: left; cursor: pointer;
          display: flex; justify-content: space-between; align-items: flex-start;
          color: var(--ink2); font-size: 13px; font-weight: 500;
          line-height: 1.45; gap: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background var(--speed), color var(--speed);
          outline: none;
        }
        .cw-faq-q:hover { background: var(--paper2); color: var(--ink); }
        .cw-faq-item.open .cw-faq-q { color: var(--accent); }
        .cw-faq-q-text { flex: 1; }
        .cw-faq-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-top: 1px; }
        .cw-faq-speak {
          width: 24px; height: 24px; border-radius: 5px;
          background: transparent; border: 1px solid transparent;
          cursor: pointer; color: var(--ink3);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--speed), border-color var(--speed), color var(--speed);
          outline: none;
        }
        .cw-faq-speak:hover { background: var(--accent-lt); border-color: var(--accent-md); color: var(--accent); }
        .cw-faq-speak.on { background: #FEE8E8; border-color: #F5C5C5; color: var(--red); }
        .cw-faq-a {
          padding: 12px 14px 15px;
          font-size: 12.5px; color: var(--ink2); line-height: 1.75;
          border-top: 1px solid var(--rule);
          background: var(--paper2);
          animation: cwFaqOpen 0.2s ease;
          word-break: break-word; overflow-wrap: break-word;
        }
        @keyframes cwFaqOpen {
          from { opacity:0; transform:translateY(-4px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── MOBILE ──────────────────────────────────────── */
        @media (max-width: 440px) {
          .cw-panel  { width: calc(100vw - 16px); right: 8px; bottom: 84px; height: 74vh; }
          .cw-fab    { right: 16px; bottom: 16px; }
          .cw-bubble { right: 8px; max-width: calc(100vw - 64px); bottom: 84px; }
        }
      `}</style>

      <div className="cw-root">

        {/* ── GREETING BUBBLE ─────────────────────────────── */}
        {showBubble && !open && (
          <div className="cw-bubble">
            <div className="cw-bubble-label">
              <span className="cw-bubble-dot-live" />
              Cybokrafts AI
            </div>
            <p className="cw-bubble-text">{getGreetingText()}</p>
            <button className="cw-bubble-dismiss" onClick={() => setShowBubble(false)}>
              Dismiss ×
            </button>
          </div>
        )}

        {/* ── PANEL ───────────────────────────────────────── */}
        {open && (
          <div
            className="cw-panel"
            ref={panelRef}
            role="dialog"
            aria-label="Cybokrafts AI Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div className="cw-header">
              <div className="cw-header-mark">
                <IconSignal />
              </div>
              <div className="cw-header-info">
                <div className="cw-header-name">Cybokrafts AI</div>
                <div className="cw-header-row">
                  <span className="cw-live-pill">
                    <span className="cw-live-pip" />
                    Online
                  </span>
                  <span className="cw-header-sub">Energy Intelligence</span>
                </div>
              </div>
              <button className="cw-close" onClick={() => setOpen(false)} aria-label="Close">
                <IconClose />
              </button>
            </div>

            {/* Nav */}
            <nav className="cw-nav" aria-label="Sections">
              {(["home", "chat", "faq"] as View[]).map((v) => (
                <button
                  key={v}
                  className={`cw-nav-btn${view === v ? " active" : ""}`}
                  onClick={() => setView(v)}
                  aria-current={view === v ? "page" : undefined}
                >
                  {v === "home" && <IconOverview />}
                  {v === "chat" && <IconChat />}
                  {v === "faq" && <IconFaq />}
                  {v === "home" ? "Overview" : v === "chat" ? "Chat" : "FAQ"}
                </button>
              ))}
            </nav>

            {/* ── HOME ────────────────────────────────────── */}
            {view === "home" && (
              <div className="cw-scroll cw-home">
                <div className="cw-id-card">
                  <div className="cw-id-eyebrow">Cybokrafts Universal Innovations</div>
                  <div className="cw-id-tagline">
                    AI-powered monitoring for transformers, solar networks, and EV infrastructure.
                    Predictive. Real-time. Intelligent.
                  </div>
                  <div className="cw-id-pills">
                    <span className="cw-pill">DPIIT Recognised</span>
                    <span className="cw-pill">IIT Indore Incubated</span>
                    <span className="cw-pill">Patent 202521117118</span>
                  </div>
                </div>

                <div className="cw-stats">
                  <div className="cw-stat">
                    <div className="cw-stat-val">99.9%</div>
                    <div className="cw-stat-lbl">Uptime SLA</div>
                  </div>
                  <div className="cw-stat">
                    <div className="cw-stat-val">Live</div>
                    <div className="cw-stat-lbl">Real-time Analytics</div>
                  </div>
                  <div className="cw-stat">
                    <div className="cw-stat-val">AI</div>
                    <div className="cw-stat-lbl">Predictive Core</div>
                  </div>
                </div>

                <div className="cw-grid">
                  {[
                    { label: "Ask a Question", sub: "Free-form chat", icon: <IconChat />, action: () => setView("chat") },
                    { label: "Browse FAQ", sub: "Common queries", icon: <IconFaq />, action: () => setView("faq") },
                    {
                      label: "Our Products", sub: "VAJRA · AIpowerOS",
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      ),
                      action: () => scrollTo("solutions"),
                    },
                    {
                      label: "Contact Us", sub: "Request a demo",
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      ),
                      action: () => scrollTo("contact"),
                    },
                  ].map(({ label, sub, icon, action }) => (
                    <button key={label} className="cw-action" onClick={action}>
                      <div className="cw-action-icon">{icon}</div>
                      <span className="cw-action-label">{label}</span>
                      <span className="cw-action-sub">{sub}</span>
                    </button>
                  ))}
                </div>

                <div className="cw-narration">
                  <div className="cw-narration-info">
                    <div className="cw-narration-title">Audible Company Overview</div>
                    <div className="cw-narration-sub">
                      {speaking ? "Playing audio narration…" : "Listen to a spoken introduction"}
                    </div>
                    {speaking && (
                      <div className="cw-waveform">
                        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="cw-bar" />)}
                      </div>
                    )}
                  </div>
                  <button
                    className={`cw-play-btn${speaking ? " active" : ""}`}
                    onClick={handleNarration}
                    aria-label={speaking ? "Stop narration" : "Play company overview"}
                  >
                    {speaking ? <IconStop /> : <IconPlay />}
                  </button>
                </div>
              </div>
            )}

            {/* ── CHAT ────────────────────────────────────── */}
            {view === "chat" && (
              <div className="cw-chat">
                <div className="cw-scroll cw-messages" role="log" aria-live="polite">
                  {messages.map((m) => (
                    <div key={m.id} className={`cw-msg ${m.role}`}>
                      {m.role === "bot" ? (
                        <div className="cw-msg-row">
                          <div className="cw-avatar"><IconSignal /></div>
                          <div className="cw-bubble-msg">{m.text}</div>
                        </div>
                      ) : (
                        <div className="cw-bubble-msg">{m.text}</div>
                      )}
                    </div>
                  ))}
                  {typing && (
                    <div className="cw-msg-row" style={{ alignSelf: "flex-start" }}>
                      <div className="cw-avatar"><IconSignal /></div>
                      <div className="cw-typing">
                        <div className="cw-typing-dot" />
                        <div className="cw-typing-dot" />
                        <div className="cw-typing-dot" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {messages.length <= 1 && (
                  <div className="cw-hints">
                    {["What is CYBO-VAJRA?", "Request a demo", "Our partners"].map(q => (
                      <button
                        key={q}
                        className="cw-hint"
                        onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div className="cw-input-bar">
                  <input
                    ref={inputRef}
                    className="cw-text-input"
                    placeholder="Ask about CYBO-VAJRA, AIpowerOS…"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                    aria-label="Message input"
                  />
                  <button
                    className="cw-send-btn"
                    onClick={sendMessage}
                    aria-label="Send message"
                    disabled={!input.trim()}
                  >
                    <IconSend />
                  </button>
                </div>
              </div>
            )}

            {/* ── FAQ ─────────────────────────────────────── */}
            {view === "faq" && (
              <div className="cw-scroll cw-faq-view" role="list">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className={`cw-faq-item${expandedFaq === i ? " open" : ""}`}
                    role="listitem"
                  >
                    <button
                      className="cw-faq-q"
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      aria-expanded={expandedFaq === i}
                    >
                      <span className="cw-faq-q-text">{faq.q}</span>
                      <div className="cw-faq-controls">
                        <button
                          className={`cw-faq-speak${faqSpeaking === i ? " on" : ""}`}
                          onClick={e => { e.stopPropagation(); handleFaqSpeak(i); }}
                          aria-label={faqSpeaking === i ? "Stop" : "Speak this answer"}
                        >
                          {faqSpeaking === i ? <IconMute /> : <IconSpeaker />}
                        </button>
                        <IconChevron open={expandedFaq === i} />
                      </div>
                    </button>
                    {expandedFaq === i && (
                      <div className="cw-faq-a">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── FAB ─────────────────────────────────────────── */}
        <button
          className={`cw-fab${open ? " cw-fab-open" : ""}${pulse ? " cw-pulse" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close AI assistant" : "Open Cybokrafts AI assistant"}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          {!open && !greeted && <span className="cw-fab-dot" aria-hidden="true" />}
          <span className="cw-fab-icon">
            {open ? <IconClose /> : <IconSignal />}
          </span>
        </button>

      </div>
    </>
  );
}