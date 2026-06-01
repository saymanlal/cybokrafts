"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Message = { role: "bot" | "user"; text: string; id: number };
type View = "home" | "chat" | "faq";

// ─── Greeting ──────────────────────────────────────────────────────────────────
function getGreetingText(): string {
  const h = new Date().getHours();
  const salutation =
    h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  return `${salutation}. Welcome to Cybokrafts Universal Innovations. I'm your AI assistant — here to help you explore CYBO-VAJRA, AIpowerOS, and our energy solutions. How may I assist you today?`;
}

// ─── Narration ─────────────────────────────────────────────────────────────────
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

// ─── FAQs ──────────────────────────────────────────────────────────────────────
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
    a: "Our registered office is in Raipur, Chhattisgarh, India (492001). We operate nationally and are expanding to global markets.",
  },
  {
    q: "What business problems do you solve?",
    a: "We help organisations prevent unplanned transformer failures, reduce technical distribution losses, transition from reactive to predictive maintenance, and gain real-time operational visibility across their energy infrastructure.",
  },
];

// ─── Auto-reply ────────────────────────────────────────────────────────────────
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
    return "Cybokrafts was founded by Mr. Akhil Chawla. The company is headquartered in Raipur, Chhattisgarh, and incubated at IIT Indore.";
  if (/dpiit|startup india|recognition|award/.test(t))
    return "Cybokrafts holds DPIIT Startup India recognition and is incubated at the IIT Indore Incubation Center — two of the most prestigious validations for deep-tech startups in India.";
  return "Thank you for your query. For detailed information, please browse our FAQ section or navigate through the site. You may also write to us at contact@cybokrafts.com and our team will respond promptly.";
}

// ─── Speech ────────────────────────────────────────────────────────────────────
function speak(text: string, onStart?: () => void, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.88;
  u.pitch = 1.0;
  u.volume = 1;
  if (onStart) u.onstart = onStart;
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("google") ||
         v.name.toLowerCase().includes("natural") ||
         v.name.toLowerCase().includes("neural") ||
         v.name.toLowerCase().includes("premium"))
    );
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  };
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  } else {
    trySpeak();
  }
}

function stopSpeech() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

// ─── SVG Icons ─────────────────────────────────────────────────────────────────
const IconBolt = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor">
    <path d="M9 0L0 12h7L5 20l11-13H9V0z" />
  </svg>
);
const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconChat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const IconFaq = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconClose = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
  </svg>
);
const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <polygon points="0,0 14,7 0,14 2.5,7"/>
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <polygon points="2,1 13,7 2,13"/>
  </svg>
);
const IconPause = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="1" y="1" width="4" height="12" rx="1"/><rect x="9" y="1" width="4" height="12" rx="1"/>
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconSpeaker = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/>
  </svg>
);
const IconStop = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="6" y1="4" x2="6" y2="20"/><line x1="18" y1="4" x2="18" y2="20"/>
  </svg>
);

// ──────────────────────────────────────────────────────────────────────────────
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
  const [faqSpeaking, setFaqSpeaking] = useState<number | null>(null);
  const [msgId, setMsgId]             = useState(0);
  const [inputFocused, setInputFocused] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef       = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // ── Bubble timing ────────────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 2000);
    const t2 = setTimeout(() => {
      setShowBubble(false);
      setPulse(true);
      setTimeout(() => setPulse(false), 2600);
    }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── On first open: seed greeting message + speak (user-gesture safe) ─────────
  useEffect(() => {
    if (open && !greeted) {
      const id = Date.now();
      setMsgId(id);
      setMessages([{ role: "bot", text: getGreetingText(), id }]);
      setGreeted(true);
      // Speak after tiny delay to ensure synthesis context is ready
      setTimeout(() => speak(getGreetingText()), 120);
    }
  }, [open, greeted]);

  // ── Stop speech when panel closes ────────────────────────────────────────────
  useEffect(() => {
    if (!open) {
      stopSpeech();
      setSpeaking(false);
      setFaqSpeaking(null);
    }
  }, [open]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── Focus input when switching to chat ───────────────────────────────────────
  useEffect(() => {
    if (view === "chat" && open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [view, open]);

  // ── FIX: Native non-passive wheel listener to prevent page scroll bleed ──────
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    const handler = (e: WheelEvent) => {
      // Always stop propagation to prevent page scroll
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const scrollable = target.closest(
        ".ck2-scroll-area"
      ) as HTMLElement | null;

      if (!scrollable) {
        e.preventDefault();
        return;
      }

      const atTop    = scrollable.scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    panel.addEventListener("wheel", handler, { passive: false });
    return () => panel.removeEventListener("wheel", handler);
  }, [open]);

  // ── Touch scroll fix (mobile) ────────────────────────────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    let startY = 0;
    const touchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const touchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest(".ck2-scroll-area") as HTMLElement | null;
      if (!scrollable) { e.preventDefault(); return; }

      const dy = e.touches[0].clientY - startY;
      const atTop    = scrollable.scrollTop <= 0 && dy > 0;
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1 && dy < 0;
      if (atTop || atBottom) e.preventDefault();
    };

    panel.addEventListener("touchstart", touchStart, { passive: true });
    panel.addEventListener("touchmove", touchMove, { passive: false });
    return () => {
      panel.removeEventListener("touchstart", touchStart);
      panel.removeEventListener("touchmove", touchMove);
    };
  }, [open]);

  // ─── Send message ─────────────────────────────────────────────────────────────
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    const uid = Date.now();
    setMessages(m => [...m, { role: "user", text, id: uid }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = autoReply(text);
      const bid = Date.now() + 1;
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: reply, id: bid }]);
    }, 900);
  }, [input]);

  // ─── Narration ────────────────────────────────────────────────────────────────
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

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ━━━━━━━━━━━━ TOKENS ━━━━━━━━━━━━ */
        .ck2 {
          --c-bg:          #0B1117;
          --c-surface:     #111822;
          --c-surface2:    #1A2535;
          --c-surface3:    #1F2D40;
          --c-border:      rgba(255,255,255,0.07);
          --c-border2:     rgba(255,255,255,0.12);
          --c-border3:     rgba(255,255,255,0.18);
          --c-accent:      #00C6FF;
          --c-accent2:     #0072FF;
          --c-accent-glow: rgba(0,198,255,0.18);
          --c-text:        #E8F0FE;
          --c-text2:       #8FA3C0;
          --c-text3:       #4F6680;
          --c-success:     #10D98B;
          --c-warn:        #F59E0B;
          --c-danger:      #F87171;
          --r-sm:          10px;
          --r-md:          14px;
          --r-lg:          18px;
          --r-xl:          22px;
          --shadow-panel:  0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06);
          --shadow-fab:    0 8px 32px rgba(0,198,255,0.35), 0 2px 8px rgba(0,0,0,0.4);
          --font-head:     var(--font-barlow, 'Barlow Condensed', sans-serif);
          --font-body:     var(--font-dm, 'DM Sans', sans-serif);
          --font-mono:     var(--font-jetbrains, 'JetBrains Mono', monospace);
          --transition:    0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .ck2 *, .ck2 *::before, .ck2 *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ck2, .ck2 input, .ck2 button, .ck2 textarea { font-family: var(--font-body); }

        /* ━━━━━━━━━━━━ FAB ━━━━━━━━━━━━ */
        .ck2-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          width: 60px; height: 60px; border-radius: 50%; border: none;
          background: linear-gradient(145deg, var(--c-accent2) 0%, var(--c-accent) 100%);
          box-shadow: var(--shadow-fab);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          outline: none; overflow: visible;
        }
        .ck2-fab:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,198,255,0.5), 0 4px 12px rgba(0,0,0,0.5);
        }
        .ck2-fab:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 4px; }
        .ck2-fab-inner {
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ck2-fab-open .ck2-fab-inner { transform: rotate(45deg) scale(0.9); }

        /* Pulse rings */
        .ck2-fab.ck2-pulse::after {
          content: '';
          position: absolute; inset: -8px; border-radius: 50%;
          border: 1.5px solid rgba(0,198,255,0.4);
          animation: ck2FabRing 2s ease-out;
        }
        @keyframes ck2FabRing {
          0%   { transform: scale(0.85); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* Notification dot */
        .ck2-fab-dot {
          position: absolute; top: 8px; right: 8px;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--c-danger);
          border: 2px solid #000;
          animation: ck2DotPulse 2s ease-in-out infinite;
        }
        @keyframes ck2DotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(248,113,113,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(248,113,113,0); }
        }

        /* ━━━━━━━━━━━━ BUBBLE ━━━━━━━━━━━━ */
        .ck2-bubble {
          position: fixed; bottom: 106px; right: 28px; z-index: 9998;
          background: var(--c-surface);
          border: 0.5px solid var(--c-border3);
          border-radius: var(--r-lg) var(--r-lg) 4px var(--r-lg);
          padding: 14px 18px;
          max-width: 280px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,198,255,0.15);
          animation: ck2BubbleIn 0.4s cubic-bezier(0.34,1.46,0.64,1);
        }
        @keyframes ck2BubbleIn {
          from { opacity: 0; transform: translateY(16px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ck2-bubble-tag {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono);
          font-size: 9px; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--c-accent);
          background: rgba(0,198,255,0.1); border: 0.5px solid rgba(0,198,255,0.25);
          border-radius: 4px; padding: 3px 8px; margin-bottom: 10px;
        }
        .ck2-bubble-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--c-success);
          animation: ck2LiveDot 2s ease-in-out infinite;
        }
        @keyframes ck2LiveDot {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        .ck2-bubble-text { font-size: 12.5px; line-height: 1.65; color: var(--c-text2); }
        .ck2-bubble-dismiss {
          display: block; margin-top: 10px; font-size: 11px; color: var(--c-text3);
          background: none; border: none; cursor: pointer; padding: 0;
          text-align: right; width: 100%; transition: color var(--transition);
          font-family: var(--font-body);
        }
        .ck2-bubble-dismiss:hover { color: var(--c-accent); }

        /* ━━━━━━━━━━━━ PANEL ━━━━━━━━━━━━ */
        .ck2-panel {
          position: fixed; bottom: 106px; right: 28px; z-index: 9998;
          width: 400px;
          height: 580px;
          background: var(--c-bg);
          border: 0.5px solid var(--c-border2);
          border-radius: var(--r-xl);
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: var(--shadow-panel);
          animation: ck2PanelIn 0.4s cubic-bezier(0.34,1.46,0.64,1);
          touch-action: none;
        }
        @keyframes ck2PanelIn {
          from { opacity: 0; transform: translateY(24px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Glow edge on panel top */
        .ck2-panel::before {
          content: '';
          position: absolute; top: 0; left: 20px; right: 20px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-accent), transparent);
          opacity: 0.6;
          pointer-events: none;
        }

        /* ━━━━━━━━━━━━ HEADER ━━━━━━━━━━━━ */
        .ck2-header {
          padding: 16px 18px;
          display: flex; align-items: center; gap: 13px;
          flex-shrink: 0; position: relative; overflow: hidden;
          background: var(--c-surface);
          border-bottom: 0.5px solid var(--c-border);
        }
        .ck2-header::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(0,198,255,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .ck2-header-logo {
          width: 40px; height: 40px; flex-shrink: 0; border-radius: var(--r-sm);
          background: linear-gradient(145deg, rgba(0,114,255,0.3), rgba(0,198,255,0.2));
          border: 0.5px solid rgba(0,198,255,0.3);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-accent); position: relative;
        }
        .ck2-header-logo::after {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(circle at 40% 40%, rgba(0,198,255,0.2), transparent);
        }
        .ck2-header-info { flex: 1; min-width: 0; }
        .ck2-header-name {
          font-family: var(--font-head);
          font-size: 15px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--c-text); line-height: 1;
        }
        .ck2-header-status {
          display: flex; align-items: center; gap: 6px;
          margin-top: 5px;
        }
        .ck2-live-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--font-mono);
          font-size: 9px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--c-success);
          background: rgba(16,217,139,0.1);
          border: 0.5px solid rgba(16,217,139,0.25);
          border-radius: 4px; padding: 2px 7px;
        }
        .ck2-live-dot {
          width: 4px; height: 4px; border-radius: 50%; background: var(--c-success);
          animation: ck2LiveDot 2s ease-in-out infinite;
        }
        .ck2-header-sub { font-size: 11px; color: var(--c-text3); }
        .ck2-close-btn {
          width: 30px; height: 30px; border-radius: var(--r-sm);
          background: rgba(255,255,255,0.05);
          border: 0.5px solid var(--c-border2);
          cursor: pointer; color: var(--c-text2);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--transition), color var(--transition), transform var(--transition);
          flex-shrink: 0; outline: none;
        }
        .ck2-close-btn:hover { background: rgba(255,255,255,0.1); color: var(--c-text); transform: rotate(90deg); }

        /* ━━━━━━━━━━━━ NAV ━━━━━━━━━━━━ */
        .ck2-nav {
          display: flex; flex-shrink: 0;
          background: var(--c-surface);
          border-bottom: 0.5px solid var(--c-border);
          padding: 0 8px;
          gap: 4px;
        }
        .ck2-nav-btn {
          flex: 1; padding: 10px 4px 10px;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-mono);
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--c-text3);
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          border-bottom: 2px solid transparent;
          transition: color var(--transition), border-color var(--transition);
          position: relative; outline: none;
        }
        .ck2-nav-btn.active {
          color: var(--c-accent);
          border-bottom-color: var(--c-accent);
        }
        .ck2-nav-btn:hover:not(.active) { color: var(--c-text2); }
        .ck2-nav-btn.active svg { filter: drop-shadow(0 0 4px rgba(0,198,255,0.5)); }

        /* ━━━━━━━━━━━━ SCROLL AREAS ━━━━━━━━━━━━ */
        .ck2-scroll-area {
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .ck2-scroll-area::-webkit-scrollbar { width: 4px; }
        .ck2-scroll-area::-webkit-scrollbar-track { background: transparent; }
        .ck2-scroll-area::-webkit-scrollbar-thumb { background: var(--c-border2); border-radius: 2px; }

        /* ━━━━━━━━━━━━ HOME VIEW ━━━━━━━━━━━━ */
        .ck2-home {
          flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 10px;
        }

        /* Identity card */
        .ck2-id-card {
          border-radius: var(--r-md); padding: 16px;
          background: var(--c-surface);
          border: 0.5px solid var(--c-border2);
          position: relative; overflow: hidden;
        }
        .ck2-id-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--c-accent) 50%, transparent 100%);
        }
        .ck2-id-card-bg {
          position: absolute; top: -20px; right: -20px; width: 120px; height: 120px;
          background: radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ck2-id-company {
          font-family: var(--font-head);
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 6px;
        }
        .ck2-id-tagline { font-size: 12.5px; color: var(--c-text2); line-height: 1.65; }
        .ck2-id-pills { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
        .ck2-pill {
          font-family: var(--font-mono);
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.08em;
          padding: 3px 9px; border-radius: 4px;
          background: rgba(0,198,255,0.08);
          border: 0.5px solid rgba(0,198,255,0.2);
          color: var(--c-accent);
        }

        /* Action grid */
        .ck2-action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .ck2-action-btn {
          background: var(--c-surface);
          border: 0.5px solid var(--c-border);
          border-radius: var(--r-md); padding: 14px 12px;
          cursor: pointer; text-align: left;
          transition: border-color var(--transition), background var(--transition), transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow var(--transition);
          display: flex; flex-direction: column; gap: 4px;
          position: relative; overflow: hidden; outline: none;
        }
        .ck2-action-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,198,255,0.05), transparent);
          opacity: 0; transition: opacity var(--transition);
        }
        .ck2-action-btn:hover {
          border-color: rgba(0,198,255,0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .ck2-action-btn:hover::after { opacity: 1; }
        .ck2-action-btn:active { transform: translateY(0) scale(0.98); }
        .ck2-action-icon-wrap {
          width: 30px; height: 30px; border-radius: 8px; margin-bottom: 6px;
          background: rgba(0,198,255,0.1);
          border: 0.5px solid rgba(0,198,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-accent);
        }
        .ck2-action-label { font-size: 12px; font-weight: 600; color: var(--c-text); }
        .ck2-action-sub { font-size: 10.5px; color: var(--c-text3); }

        /* Stats row */
        .ck2-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .ck2-stat {
          background: var(--c-surface); border: 0.5px solid var(--c-border);
          border-radius: var(--r-sm); padding: 12px 10px; text-align: center;
        }
        .ck2-stat-val {
          font-family: var(--font-mono);
          font-size: 16px; font-weight: 700; color: var(--c-accent);
          line-height: 1;
        }
        .ck2-stat-lbl { font-size: 9.5px; color: var(--c-text3); margin-top: 4px; line-height: 1.3; }

        /* Narration card */
        .ck2-narration-card {
          background: var(--c-surface); border: 0.5px solid var(--c-border);
          border-radius: var(--r-md); padding: 14px 15px;
          display: flex; align-items: center; gap: 12px;
        }
        .ck2-narration-info { flex: 1; min-width: 0; }
        .ck2-narration-title { font-size: 12.5px; font-weight: 600; color: var(--c-text); }
        .ck2-narration-sub { font-size: 11px; color: var(--c-text3); margin-top: 3px; }
        .ck2-waveform {
          display: flex; align-items: center; gap: 2.5px; margin-top: 8px; height: 18px;
        }
        .ck2-bar {
          width: 2.5px; border-radius: 2px; background: var(--c-accent);
          animation: ck2Bar 0.8s ease-in-out infinite;
        }
        .ck2-bar:nth-child(1){height:4px; animation-delay:0s}
        .ck2-bar:nth-child(2){height:11px;animation-delay:.08s}
        .ck2-bar:nth-child(3){height:7px; animation-delay:.16s}
        .ck2-bar:nth-child(4){height:15px;animation-delay:.24s}
        .ck2-bar:nth-child(5){height:9px; animation-delay:.32s}
        .ck2-bar:nth-child(6){height:13px;animation-delay:.40s}
        .ck2-bar:nth-child(7){height:5px; animation-delay:.48s}
        .ck2-bar:nth-child(8){height:10px;animation-delay:.56s}
        @keyframes ck2Bar {
          0%,100% { transform: scaleY(0.35); opacity: 0.4; }
          50%      { transform: scaleY(1.2);  opacity: 1; }
        }
        .ck2-play-btn {
          width: 44px; height: 44px; border-radius: var(--r-sm); flex-shrink: 0;
          background: rgba(0,198,255,0.1);
          border: 0.5px solid rgba(0,198,255,0.25);
          cursor: pointer; color: var(--c-accent);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--transition), box-shadow var(--transition), transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
          outline: none;
        }
        .ck2-play-btn:hover {
          background: rgba(0,198,255,0.18);
          box-shadow: 0 0 20px rgba(0,198,255,0.2);
          transform: scale(1.06);
        }
        .ck2-play-btn.active { background: rgba(248,113,113,0.1); border-color: rgba(248,113,113,0.3); color: var(--c-danger); }

        /* ━━━━━━━━━━━━ CHAT VIEW ━━━━━━━━━━━━ */
        .ck2-chat-view { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        .ck2-messages {
          flex: 1; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: var(--c-bg);
        }
        .ck2-msg { max-width: 88%; display: flex; flex-direction: column; }
        .ck2-msg.bot { align-self: flex-start; }
        .ck2-msg.user { align-self: flex-end; }

        /* Bot avatar row */
        .ck2-msg-row { display: flex; gap: 8px; align-items: flex-end; }
        .ck2-msg-avatar {
          width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
          background: linear-gradient(145deg, rgba(0,114,255,0.4), rgba(0,198,255,0.3));
          border: 0.5px solid rgba(0,198,255,0.3);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-accent); font-size: 10px;
        }

        .ck2-msg-bubble {
          padding: 10px 14px; font-size: 13px; line-height: 1.65;
          animation: ck2MsgIn 0.28s cubic-bezier(0.34,1.46,0.64,1);
        }
        @keyframes ck2MsgIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ck2-msg.bot .ck2-msg-bubble {
          background: var(--c-surface);
          border: 0.5px solid var(--c-border2);
          border-radius: 4px 14px 14px 14px;
          color: var(--c-text);
        }
        .ck2-msg.user .ck2-msg-bubble {
          background: linear-gradient(145deg, #0052cc, #0072FF);
          border: 0.5px solid rgba(0,198,255,0.2);
          border-radius: 14px 14px 4px 14px;
          color: #fff;
          box-shadow: 0 4px 16px rgba(0,114,255,0.3);
        }

        /* Typing indicator */
        .ck2-typing {
          align-self: flex-start;
          background: var(--c-surface);
          border: 0.5px solid var(--c-border2);
          border-radius: 4px 14px 14px 14px;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 4px;
        }
        .ck2-typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-text3);
          animation: ck2Typing 1.3s ease-in-out infinite;
        }
        .ck2-typing-dot:nth-child(2) { animation-delay: 0.22s; }
        .ck2-typing-dot:nth-child(3) { animation-delay: 0.44s; }
        @keyframes ck2Typing {
          0%,60%,100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-5px); opacity: 1; background: var(--c-accent); }
        }

        /* Input row */
        .ck2-input-row {
          padding: 12px 14px;
          border-top: 0.5px solid var(--c-border);
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
          background: var(--c-surface);
        }
        .ck2-text-input {
          flex: 1;
          background: var(--c-surface2);
          border: 0.5px solid var(--c-border2);
          border-radius: 10px; padding: 10px 14px;
          font-size: 13px; color: var(--c-text); outline: none;
          transition: border-color var(--transition), box-shadow var(--transition);
          font-family: var(--font-body);
        }
        .ck2-text-input::placeholder { color: var(--c-text3); }
        .ck2-text-input:focus {
          border-color: rgba(0,198,255,0.4);
          box-shadow: 0 0 0 3px rgba(0,198,255,0.1);
        }
        .ck2-send-btn {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(145deg, #0052cc, #0072FF);
          border: none; cursor: pointer; color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0,114,255,0.4);
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow var(--transition), opacity var(--transition);
          outline: none;
        }
        .ck2-send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,114,255,0.55);
        }
        .ck2-send-btn:active:not(:disabled) { transform: scale(0.95); }
        .ck2-send-btn:disabled { opacity: 0.35; cursor: default; }

        /* Input hint chips */
        .ck2-hint-chips {
          display: flex; gap: 6px; flex-wrap: wrap; padding: 0 14px 10px;
          background: var(--c-surface);
        }
        .ck2-hint-chip {
          font-size: 11px; color: var(--c-text3);
          background: var(--c-surface2); border: 0.5px solid var(--c-border);
          border-radius: 20px; padding: 4px 10px; cursor: pointer;
          transition: color var(--transition), border-color var(--transition), background var(--transition);
          white-space: nowrap; outline: none;
          font-family: var(--font-body);
        }
        .ck2-hint-chip:hover { color: var(--c-accent); border-color: rgba(0,198,255,0.3); background: rgba(0,198,255,0.06); }

        /* ━━━━━━━━━━━━ FAQ VIEW ━━━━━━━━━━━━ */
        .ck2-faq-view {
          flex: 1; padding: 12px;
          display: flex; flex-direction: column; gap: 6px;
          background: var(--c-bg);
        }
        .ck2-faq-item {
          background: var(--c-surface);
          border: 0.5px solid var(--c-border);
          border-radius: var(--r-md); overflow: hidden;
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        .ck2-faq-item.open {
          border-color: rgba(0,198,255,0.3);
          box-shadow: 0 0 20px rgba(0,198,255,0.08);
        }
        .ck2-faq-q {
          width: 100%; background: none; border: none;
          padding: 13px 14px; text-align: left; cursor: pointer;
          display: flex; justify-content: space-between; align-items: flex-start;
          color: var(--c-text2); font-size: 12.5px; font-weight: 500;
          line-height: 1.45; gap: 8px;
          transition: background var(--transition), color var(--transition);
          font-family: var(--font-body); outline: none;
        }
        .ck2-faq-q:hover { background: rgba(255,255,255,0.03); color: var(--c-text); }
        .ck2-faq-item.open .ck2-faq-q { color: var(--c-accent); }
        .ck2-faq-q-text { flex: 1; }
        .ck2-faq-controls {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-top: 1px;
        }
        .ck2-faq-speak-btn {
          width: 24px; height: 24px; border-radius: 6px;
          background: transparent;
          border: 0.5px solid transparent;
          cursor: pointer; color: var(--c-text3);
          display: flex; align-items: center; justify-content: center;
          transition: background var(--transition), border-color var(--transition), color var(--transition);
          outline: none;
        }
        .ck2-faq-speak-btn:hover { background: rgba(0,198,255,0.1); border-color: rgba(0,198,255,0.25); color: var(--c-accent); }
        .ck2-faq-speak-btn.speaking { background: rgba(248,113,113,0.1); border-color: rgba(248,113,113,0.3); color: var(--c-danger); }
        .ck2-faq-a {
          padding: 12px 14px 14px;
          font-size: 12.5px; color: var(--c-text2); line-height: 1.75;
          border-top: 0.5px solid var(--c-border);
          animation: ck2FaqSlide 0.22s ease;
          word-break: break-word; overflow-wrap: break-word;
        }
        @keyframes ck2FaqSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ━━━━━━━━━━━━ MOBILE ━━━━━━━━━━━━ */
        @media (max-width: 440px) {
          .ck2-panel { width: calc(100vw - 16px); right: 8px; bottom: 84px; height: 72vh; }
          .ck2-fab   { right: 16px; bottom: 16px; }
          .ck2-bubble { right: 8px; max-width: calc(100vw - 70px); bottom: 84px; }
        }
      `}</style>

      <div className="ck2">

        {/* ── Greeting Bubble ── */}
        {showBubble && !open && (
          <div className="ck2-bubble">
            <div className="ck2-bubble-tag">
              <span className="ck2-bubble-dot" />
              Cybokrafts AI
            </div>
            <p className="ck2-bubble-text">{getGreetingText()}</p>
            <button className="ck2-bubble-dismiss" onClick={() => setShowBubble(false)}>
              Dismiss ×
            </button>
          </div>
        )}

        {/* ── Panel ── */}
        {open && (
          <div
            className="ck2-panel"
            ref={panelRef}
            role="dialog"
            aria-label="Cybokrafts AI Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div className="ck2-header">
              <div className="ck2-header-logo">
                <IconBolt />
              </div>
              <div className="ck2-header-info">
                <div className="ck2-header-name">Cybokrafts AI</div>
                <div className="ck2-header-status">
                  <span className="ck2-live-badge">
                    <span className="ck2-live-dot" />
                    Online
                  </span>
                  <span className="ck2-header-sub">Energy Intelligence</span>
                </div>
              </div>
              <button
                className="ck2-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <IconClose />
              </button>
            </div>

            {/* Nav */}
            <nav className="ck2-nav" aria-label="Sections">
              {(["home", "chat", "faq"] as View[]).map((v) => (
                <button
                  key={v}
                  className={`ck2-nav-btn${view === v ? " active" : ""}`}
                  onClick={() => setView(v)}
                  aria-current={view === v ? "page" : undefined}
                >
                  {v === "home" && <IconHome />}
                  {v === "chat" && <IconChat />}
                  {v === "faq"  && <IconFaq />}
                  {v === "home" ? "Overview" : v === "chat" ? "Chat" : "FAQ"}
                </button>
              ))}
            </nav>

            {/* ── HOME ── */}
            {view === "home" && (
              <div className="ck2-scroll-area ck2-home">

                {/* Identity card */}
                <div className="ck2-id-card">
                  <div className="ck2-id-card-bg" />
                  <div className="ck2-id-company">Cybokrafts Universal Innovations</div>
                  <div className="ck2-id-tagline">
                    AI-powered monitoring for transformers, solar networks, and EV infrastructure.
                    Predictive. Real-time. Intelligent.
                  </div>
                  <div className="ck2-id-pills">
                    <span className="ck2-pill">DPIIT Recognised</span>
                    <span className="ck2-pill">IIT Indore Incubated</span>
                    <span className="ck2-pill">Patent 202521117118</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="ck2-stats">
                  <div className="ck2-stat">
                    <div className="ck2-stat-val">99.9%</div>
                    <div className="ck2-stat-lbl">Uptime SLA</div>
                  </div>
                  <div className="ck2-stat">
                    <div className="ck2-stat-val">Real-time</div>
                    <div className="ck2-stat-lbl">Analytics</div>
                  </div>
                  <div className="ck2-stat">
                    <div className="ck2-stat-val">AI</div>
                    <div className="ck2-stat-lbl">Predictive Core</div>
                  </div>
                </div>

                {/* Action grid */}
                <div className="ck2-action-grid">
                  {[
                    {
                      label: "Ask a Question", sub: "Free-form chat",
                      icon: <IconChat />, action: () => setView("chat"),
                    },
                    {
                      label: "Browse FAQ", sub: "Common queries",
                      icon: <IconFaq />, action: () => setView("faq"),
                    },
                    {
                      label: "Our Products", sub: "VAJRA · AIpowerOS",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      ),
                      action: () => scrollTo("solutions"),
                    },
                    {
                      label: "Contact Us", sub: "Request a demo",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      ),
                      action: () => scrollTo("contact"),
                    },
                  ].map(({ label, sub, icon, action }) => (
                    <button key={label} className="ck2-action-btn" onClick={action}>
                      <div className="ck2-action-icon-wrap">{icon}</div>
                      <span className="ck2-action-label">{label}</span>
                      <span className="ck2-action-sub">{sub}</span>
                    </button>
                  ))}
                </div>

                {/* Narration */}
                <div className="ck2-narration-card">
                  <div className="ck2-narration-info">
                    <div className="ck2-narration-title">🎧 Audible Company Overview</div>
                    <div className="ck2-narration-sub">
                      {speaking ? "Playing audio narration…" : "Listen to a full spoken introduction"}
                    </div>
                    {speaking && (
                      <div className="ck2-waveform">
                        {[0,1,2,3,4,5,6,7].map(i => <div key={i} className="ck2-bar" />)}
                      </div>
                    )}
                  </div>
                  <button
                    className={`ck2-play-btn${speaking ? " active" : ""}`}
                    onClick={handleNarration}
                    aria-label={speaking ? "Stop narration" : "Play company overview"}
                  >
                    {speaking ? <IconPause /> : <IconPlay />}
                  </button>
                </div>

              </div>
            )}

            {/* ── CHAT ── */}
            {view === "chat" && (
              <div className="ck2-chat-view">
                <div className="ck2-scroll-area ck2-messages" role="log" aria-live="polite">
                  {messages.map((m) => (
                    <div key={m.id} className={`ck2-msg ${m.role}`}>
                      {m.role === "bot" ? (
                        <div className="ck2-msg-row">
                          <div className="ck2-msg-avatar">
                            <IconBolt />
                          </div>
                          <div className="ck2-msg-bubble">{m.text}</div>
                        </div>
                      ) : (
                        <div className="ck2-msg-bubble">{m.text}</div>
                      )}
                    </div>
                  ))}
                  {typing && (
                    <div className="ck2-msg-row" style={{ alignSelf: "flex-start" }}>
                      <div className="ck2-msg-avatar"><IconBolt /></div>
                      <div className="ck2-typing">
                        <div className="ck2-typing-dot" />
                        <div className="ck2-typing-dot" />
                        <div className="ck2-typing-dot" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick hint chips */}
                {messages.length <= 1 && (
                  <div className="ck2-hint-chips">
                    {["What is CYBO-VAJRA?", "Request a demo", "Our partners"].map(q => (
                      <button
                        key={q}
                        className="ck2-hint-chip"
                        onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div className="ck2-input-row">
                  <input
                    ref={inputRef}
                    className="ck2-text-input"
                    placeholder="Ask about CYBO-VAJRA, AIpowerOS…"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    aria-label="Message input"
                  />
                  <button
                    className="ck2-send-btn"
                    onClick={sendMessage}
                    aria-label="Send message"
                    disabled={!input.trim()}
                  >
                    <IconSend />
                  </button>
                </div>
              </div>
            )}

            {/* ── FAQ ── */}
            {view === "faq" && (
              <div className="ck2-scroll-area ck2-faq-view" role="list">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className={`ck2-faq-item${expandedFaq === i ? " open" : ""}`}
                    role="listitem"
                  >
                    <button
                      className="ck2-faq-q"
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      aria-expanded={expandedFaq === i}
                    >
                      <span className="ck2-faq-q-text">{faq.q}</span>
                      <div className="ck2-faq-controls">
                        <button
                          className={`ck2-faq-speak-btn${faqSpeaking === i ? " speaking" : ""}`}
                          onClick={e => { e.stopPropagation(); handleFaqSpeak(i); }}
                          aria-label={faqSpeaking === i ? "Stop speaking" : "Speak this answer"}
                        >
                          {faqSpeaking === i ? <IconStop /> : <IconSpeaker />}
                        </button>
                        <IconChevron open={expandedFaq === i} />
                      </div>
                    </button>
                    {expandedFaq === i && (
                      <div className="ck2-faq-a">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ── FAB ── */}
        <button
          className={`ck2-fab${open ? " ck2-fab-open" : ""}${pulse ? " ck2-pulse" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close AI assistant" : "Open Cybokrafts AI assistant"}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          {!open && !greeted && <span className="ck2-fab-dot" aria-hidden="true" />}
          <div className="ck2-fab-inner">
            {open ? (
              <IconClose />
            ) : (
              <IconBolt />
            )}
          </div>
        </button>

      </div>
    </>
  );
}