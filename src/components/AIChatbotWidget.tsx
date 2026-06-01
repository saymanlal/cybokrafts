"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = { role: "bot" | "user"; text: string };
type View = "home" | "chat" | "faq";

// ─── Greeting speech ──────────────────────────────────────────────────────────
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
    return "Hello! I am the Cybokrafts AI assistant. Feel free to ask about CYBO-VAJRA, AIpowerOS, our partnerships, or how we can support your energy infrastructure.";
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
  const trySpeak = () => {
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
  };
  // Voices may not be loaded yet on first call
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  } else {
    trySpeak();
  }
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
  const [faqSpeaking, setFaqSpeaking] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ── 1. Audible greeting on site open (once, after a short delay) ────────────
  useEffect(() => {
    const t = setTimeout(() => {
      speak(getGreetingText());
    }, 1800);
    return () => clearTimeout(t);
  }, []); // runs once on mount

  // ── 2. Show silent bubble 1.5 s after mount; pulse FAB at dismissal ─────────
  useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 1500);
    const t2 = setTimeout(() => {
      setShowBubble(false);
      setPulse(true);
      setTimeout(() => setPulse(false), 2400);
    }, 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── 3. On first widget open: seed chat message (no extra speech — already spoken) ─
  useEffect(() => {
    if (open && !greeted) {
      setMessages([{ role: "bot", text: getGreetingText() }]);
      setGreeted(true);
    }
  }, [open, greeted]);

  // ── 4. Stop speech when panel closes ────────────────────────────────────────
  useEffect(() => {
    if (!open) {
      stopSpeech();
      setSpeaking(false);
      setFaqSpeaking(null);
    }
  }, [open]);

  // ── 5. Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── 6. Prevent background scroll when panel scroll reaches bounds ────────────
  const handlePanelWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atTop = el.scrollTop === 0 && e.deltaY < 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
    if (!atTop && !atBottom) {
      e.stopPropagation();
    } else {
      e.preventDefault();
    }
  }, []);

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
      setFaqSpeaking(null);
      speak(
        COMPANY_NARRATION,
        () => setSpeaking(true),
        () => setSpeaking(false)
      );
    }
  }

  // ─── FAQ speak individual answer ────────────────────────────────────────────
  function handleFaqSpeak(index: number) {
    if (faqSpeaking === index) {
      stopSpeech();
      setFaqSpeaking(null);
    } else {
      stopSpeech();
      setSpeaking(false);
      setFaqSpeaking(index);
      speak(
        `${FAQS[index].q}. ${FAQS[index].a}`,
        undefined,
        () => setFaqSpeaking(null)
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
      <style>{`
        /* ── Variables — LIGHT THEME ── */
        .ck-root {
          --ck-bg:       #ffffff;
          --ck-bg2:      #f8fafc;
          --ck-bg3:      #f1f5f9;
          --ck-cyan:     #0284c7;
          --ck-cyan2:    #0ea5e9;
          --ck-cyan-lt:  #e0f2fe;
          --ck-text:     #0f172a;
          --ck-text2:    #334155;
          --ck-muted:    #64748b;
          --ck-border:   #e2e8f0;
          --ck-border2:  #cbd5e1;
          --ck-shadow:   rgba(15,23,42,0.10);
          --ck-shadow2:  rgba(15,23,42,0.06);
          --ck-radius:   16px;
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
          background: linear-gradient(145deg, #0369a1, #0284c7);
          box-shadow:
            0 4px 14px rgba(2,132,199,0.45),
            0 2px 4px rgba(0,0,0,0.12);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          outline: none;
        }
        .ck-fab:hover {
          transform: scale(1.07);
          box-shadow:
            0 6px 20px rgba(2,132,199,0.55),
            0 2px 6px rgba(0,0,0,0.15);
        }
        .ck-fab:focus-visible { outline: 2px solid var(--ck-cyan); outline-offset: 3px; }
        .ck-fab.ck-pulse { animation: ckFabPulse 2.2s ease-in-out; }
        @keyframes ckFabPulse {
          0%,100% { box-shadow: 0 4px 14px rgba(2,132,199,.45); }
          45%      { box-shadow: 0 4px 14px rgba(2,132,199,.45), 0 0 0 14px rgba(2,132,199,.12), 0 0 0 26px rgba(2,132,199,.05); }
        }

        /* FAB inner icon */
        .ck-fab-icon {
          position: relative; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
        }
        .ck-fab-ring {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.55);
          animation: ckRingPulse 3s ease-in-out infinite;
        }
        .ck-fab-ring:nth-child(1) { width: 18px; height: 18px; animation-delay: 0s; }
        .ck-fab-ring:nth-child(2) { width: 28px; height: 28px; animation-delay: 1s; opacity: 0.45; }
        @keyframes ckRingPulse {
          0%,100% { transform: scale(0.9); opacity: 0.6; }
          50%      { transform: scale(1.1); opacity: 0.15; }
        }
        .ck-fab-center {
          width: 8px; height: 8px;
          background: #fff;
          border-radius: 50%; z-index: 1;
          box-shadow: 0 0 10px rgba(255,255,255,0.9);
        }

        /* ── Greeting bubble ── */
        .ck-greeting-bubble {
          position: fixed; bottom: 100px; right: 30px; z-index: 9998;
          background: #fff;
          border: 1px solid var(--ck-border);
          border-radius: 12px 12px 3px 12px;
          padding: 14px 18px;
          max-width: 270px;
          box-shadow:
            0 8px 30px var(--ck-shadow),
            0 2px 8px var(--ck-shadow2);
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
          color: var(--ck-text2);
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
          position: fixed; bottom: 100px; right: 30px; z-index: 9998;
          width: 390px;
          max-height: 590px;
          background: var(--ck-bg);
          border: 1px solid var(--ck-border);
          border-radius: var(--ck-radius);
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow:
            0 20px 60px var(--ck-shadow),
            0 4px 16px var(--ck-shadow2),
            0 0 0 1px rgba(2,132,199,0.06);
          animation: ckPanelIn 0.38s cubic-bezier(0.34,1.46,0.64,1);
        }
        @keyframes ckPanelIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Panel header ── */
        .ck-header {
          background: linear-gradient(135deg, #0369a1 0%, #0284c7 60%, #0ea5e9 100%);
          padding: 16px 18px;
          display: flex; align-items: center; gap: 13px;
          flex-shrink: 0;
        }
        .ck-header-logo {
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 10px;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
        }
        .ck-bolt-svg { width: 14px; height: 18px; fill: #fff; }

        .ck-header-text { flex: 1; }
        .ck-header-name {
          font-family: var(--ck-font-head);
          font-size: 14.5px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #fff; line-height: 1.1;
        }
        .ck-header-sub {
          font-size: 11px; color: rgba(255,255,255,0.78);
          margin-top: 3px; display: flex; align-items: center; gap: 5px;
        }
        .ck-online-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #86efac;
          box-shadow: 0 0 5px rgba(134,239,172,0.9);
          animation: ckDotBlink 3s ease-in-out infinite;
        }
        @keyframes ckDotBlink {
          0%,90%,100% { opacity: 1; } 95% { opacity: 0.3; }
        }
        .ck-close-btn {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer; color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .ck-close-btn:hover { background: rgba(255,255,255,0.25); }
        .ck-close-svg { width: 10px; height: 10px; stroke: currentColor; stroke-width: 2; fill: none; }

        /* ── Nav tabs ── */
        .ck-nav {
          display: flex;
          background: var(--ck-bg2);
          border-bottom: 1px solid var(--ck-border);
          flex-shrink: 0;
        }
        .ck-nav-btn {
          flex: 1; padding: 10px 6px; background: none; border: none;
          cursor: pointer; font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--ck-muted);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          text-transform: uppercase;
        }
        .ck-nav-btn.active {
          color: var(--ck-cyan);
          border-bottom-color: var(--ck-cyan);
          background: rgba(2,132,199,0.05);
        }
        .ck-nav-btn:hover:not(.active) { color: var(--ck-text2); background: var(--ck-bg3); }
        .ck-nav-icon {
          width: 14px; height: 14px; stroke: currentColor;
          stroke-width: 2; fill: none;
        }

        /* ── HOME VIEW ── */
        .ck-home {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;     /* ← prevents background scroll bleed */
          -webkit-overflow-scrolling: touch;
          padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: var(--ck-border2) transparent;
        }

        /* Identity card */
        .ck-id-card {
          background: linear-gradient(145deg, #eff6ff 0%, #f0f9ff 100%);
          border: 1px solid #bae6fd;
          border-radius: 12px; padding: 16px;
          position: relative; overflow: hidden;
        }
        .ck-id-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #0284c7, #38bdf8, #0284c7);
        }
        .ck-id-company {
          font-family: var(--ck-font-head);
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #0369a1; margin-bottom: 5px;
        }
        .ck-id-tagline {
          font-size: 12px; color: var(--ck-text2); line-height: 1.6;
        }
        .ck-id-pills {
          display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px;
        }
        .ck-pill {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.04em;
          padding: 3px 9px; border-radius: 20px;
          background: #dbeafe;
          border: 1px solid #93c5fd;
          color: #1d4ed8;
        }

        /* Action grid */
        .ck-action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .ck-action-btn {
          background: var(--ck-bg);
          border: 1px solid var(--ck-border);
          border-radius: 10px; padding: 13px 12px;
          cursor: pointer; text-align: left;
          transition: border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex; flex-direction: column; gap: 3px;
        }
        .ck-action-btn:hover {
          border-color: #7dd3fc;
          background: #f0f9ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(2,132,199,0.12);
        }
        .ck-action-icon {
          width: 18px; height: 18px; stroke: var(--ck-cyan);
          stroke-width: 1.8; fill: none; margin-bottom: 4px;
        }
        .ck-action-label {
          font-size: 12px; font-weight: 600; color: var(--ck-text);
        }
        .ck-action-sub { font-size: 10.5px; color: var(--ck-muted); }

        /* Narration card */
        .ck-narration-card {
          background: var(--ck-bg);
          border: 1px solid var(--ck-border);
          border-radius: 10px; padding: 14px 15px;
          display: flex; align-items: center; gap: 13px;
        }
        .ck-narration-info { flex: 1; min-width: 0; }
        .ck-narration-title {
          font-size: 12.5px; font-weight: 600; color: var(--ck-text);
        }
        .ck-narration-sub {
          font-size: 11px; color: var(--ck-muted); margin-top: 2px;
        }
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
        .ck-play-btn {
          width: 42px; height: 42px; border-radius: 10px; flex-shrink: 0;
          background: var(--ck-bg2);
          border: 1px solid var(--ck-border2);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s, transform 0.15s;
        }
        .ck-play-btn:hover {
          border-color: #7dd3fc;
          background: #f0f9ff;
          box-shadow: 0 2px 12px rgba(2,132,199,0.15);
          transform: scale(1.04);
        }
        .ck-play-btn.active {
          border-color: #fca5a5;
          background: #fff1f2;
        }
        .ck-play-svg {
          width: 13px; height: 13px; fill: var(--ck-cyan);
          transition: fill 0.15s;
        }
        .ck-play-btn.active .ck-play-svg { fill: #ef4444; }

        /* ── CHAT VIEW ── */
        .ck-chat-view { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        .ck-messages {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding: 16px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: var(--ck-border2) transparent;
          background: var(--ck-bg2);
        }
        .ck-msg { max-width: 86%; display: flex; flex-direction: column; }
        .ck-msg.bot { align-self: flex-start; }
        .ck-msg.user { align-self: flex-end; }
        .ck-msg-bubble {
          padding: 10px 14px; font-size: 13px; line-height: 1.65;
        }
        .ck-msg.bot .ck-msg-bubble {
          background: var(--ck-bg);
          border: 1px solid var(--ck-border);
          border-radius: 3px 12px 12px 12px;
          color: var(--ck-text);
          box-shadow: 0 1px 4px var(--ck-shadow2);
        }
        .ck-msg.user .ck-msg-bubble {
          background: linear-gradient(145deg, #0369a1, #0284c7);
          border: none;
          border-radius: 12px 12px 3px 12px;
          color: #fff;
          box-shadow: 0 2px 12px rgba(2,132,199,0.3);
        }
        /* Typing indicator */
        .ck-typing-bubble {
          align-self: flex-start;
          background: var(--ck-bg);
          border: 1px solid var(--ck-border);
          border-radius: 3px 12px 12px 12px;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 4px;
          box-shadow: 0 1px 4px var(--ck-shadow2);
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
          border-top: 1px solid var(--ck-border);
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
          background: var(--ck-bg);
        }
        .ck-text-input {
          flex: 1;
          background: var(--ck-bg2);
          border: 1px solid var(--ck-border2);
          border-radius: 9px; padding: 9px 13px;
          font-size: 13px; color: var(--ck-text); outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .ck-text-input::placeholder { color: var(--ck-muted); }
        .ck-text-input:focus {
          border-color: #7dd3fc;
          background: var(--ck-bg);
          box-shadow: 0 0 0 3px rgba(2,132,199,0.1);
        }
        .ck-send-btn {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          background: linear-gradient(145deg, #0369a1, #0284c7);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(2,132,199,0.35);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
        }
        .ck-send-btn:hover:not(:disabled) {
          transform: scale(1.07);
          box-shadow: 0 4px 16px rgba(2,132,199,0.45);
        }
        .ck-send-btn:disabled { opacity: 0.45; cursor: default; }
        .ck-send-svg { width: 13px; height: 13px; fill: #fff; }

        /* ── FAQ VIEW ── */
        .ck-faq-view {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;   /* ← key fix for background scroll */
          -webkit-overflow-scrolling: touch;
          padding: 12px;
          display: flex; flex-direction: column; gap: 6px;
          scrollbar-width: thin;
          scrollbar-color: var(--ck-border2) transparent;
          background: var(--ck-bg2);
        }
        .ck-faq-item {
          background: var(--ck-bg);
          border: 1px solid var(--ck-border);
          border-radius: 10px; overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ck-faq-item.open {
          border-color: #7dd3fc;
          box-shadow: 0 2px 10px rgba(2,132,199,0.1);
        }
        .ck-faq-q {
          width: 100%; background: none; border: none;
          padding: 12px 13px; text-align: left; cursor: pointer;
          display: flex; justify-content: space-between; align-items: flex-start;
          color: var(--ck-text); font-size: 12.5px; font-weight: 500;
          line-height: 1.45; gap: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .ck-faq-q:hover { background: var(--ck-bg2); }
        .ck-faq-item.open .ck-faq-q { color: var(--ck-cyan); background: #f0f9ff; }
        .ck-faq-q-text { flex: 1; }

        /* chevron + speak button row */
        .ck-faq-controls {
          display: flex; align-items: center; gap: 6px; flex-shrink: 0; margin-top: 1px;
        }
        .ck-faq-speak-btn {
          width: 22px; height: 22px; border-radius: 5px; flex-shrink: 0;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, border-color 0.15s;
          padding: 0;
        }
        .ck-faq-speak-btn:hover {
          background: #e0f2fe;
          border-color: #7dd3fc;
        }
        .ck-faq-speak-btn.speaking {
          background: #fff1f2;
          border-color: #fca5a5;
        }
        .ck-faq-speak-svg {
          width: 11px; height: 11px;
          stroke: var(--ck-cyan); stroke-width: 1.8; fill: none;
          transition: stroke 0.15s;
        }
        .ck-faq-speak-btn.speaking .ck-faq-speak-svg { stroke: #ef4444; }

        .ck-faq-chevron {
          width: 13px; height: 13px; flex-shrink: 0;
          stroke: var(--ck-muted); stroke-width: 2; fill: none;
          transition: transform 0.22s ease, stroke 0.15s;
        }
        .ck-faq-item.open .ck-faq-chevron {
          transform: rotate(180deg);
          stroke: var(--ck-cyan);
        }
        .ck-faq-a {
          padding: 11px 13px 13px;
          font-size: 12px; color: var(--ck-text2); line-height: 1.75;
          border-top: 1px solid var(--ck-border);
          animation: ckFadeSlide 0.2s ease;
          word-break: break-word;        /* ← prevents text overflow */
          overflow-wrap: break-word;
        }
        @keyframes ckFadeSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Mobile ── */
        @media (max-width: 440px) {
          .ck-panel { width: calc(100vw - 20px); right: 10px; bottom: 82px; max-height: 75vh; }
          .ck-fab { right: 14px; bottom: 14px; }
          .ck-greeting-bubble { right: 10px; max-width: calc(100vw - 72px); bottom: 82px; }
        }
      `}</style>

      <div className="ck-root">

        {/* ── Greeting bubble ── */}
        {showBubble && !open && (
          <div className="ck-greeting-bubble">
            <span className="ck-bubble-label">Cybokrafts AI</span>
            <p className="ck-bubble-text">{getGreetingText()}</p>
            <button className="ck-bubble-dismiss" onClick={() => setShowBubble(false)}>
              Dismiss ×
            </button>
          </div>
        )}

        {/* ── Panel ── */}
        {open && (
          <div className="ck-panel" role="dialog" aria-label="Cybokrafts AI Assistant">

            {/* Header */}
            <div className="ck-header">
              <div className="ck-header-logo">
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

                {/* Narration / Audible Explanation card */}
                <div className="ck-narration-card">
                  <div className="ck-narration-info">
                    <div className="ck-narration-title">🎧 Audible Company Overview</div>
                    <div className="ck-narration-sub">
                      {speaking ? "Playing audio narration…" : "Listen to a full spoken introduction"}
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
                      <svg className="ck-play-svg" viewBox="0 0 14 14" style={{fill:"#ef4444"}}>
                        <rect x="1" y="1" width="5" height="12" rx="1" />
                        <rect x="8" y="1" width="5" height="12" rx="1" />
                      </svg>
                    ) : (
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
                      <span className="ck-faq-q-text">{faq.q}</span>
                      <div className="ck-faq-controls">
                        {/* Per-FAQ speak button */}
                        <button
                          className={`ck-faq-speak-btn ${faqSpeaking === i ? "speaking" : ""}`}
                          onClick={e => { e.stopPropagation(); handleFaqSpeak(i); }}
                          aria-label={faqSpeaking === i ? "Stop speaking" : "Speak this answer"}
                          title={faqSpeaking === i ? "Stop" : "Listen"}
                        >
                          {faqSpeaking === i ? (
                            /* stop bars */
                            <svg className="ck-faq-speak-svg" viewBox="0 0 12 12"
                              style={{stroke:"#ef4444",strokeWidth:"2",fill:"none"}}>
                              <line x1="3" y1="2" x2="3" y2="10"/>
                              <line x1="9" y1="2" x2="9" y2="10"/>
                            </svg>
                          ) : (
                            /* speaker icon */
                            <svg className="ck-faq-speak-svg" viewBox="0 0 24 24">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                              <path d="M19.07 4.93a10 10 0 010 14.14"/>
                              <path d="M15.54 8.46a5 5 0 010 7.07"/>
                            </svg>
                          )}
                        </button>
                        <svg className="ck-faq-chevron" viewBox="0 0 24 24">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
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