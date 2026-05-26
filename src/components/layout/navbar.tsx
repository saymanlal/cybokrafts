"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Platform", href: "#platform" },
  { label: "About", href: "#about" },
  { label: "Values", href: "#values" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Cybokrafts Home">
          <div className="w-8 h-8 bg-[#2563EB] rounded flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8L8 2L14 8L8 14L2 8Z" fill="white" />
            </svg>
          </div>
          <span className="font-heading font-bold text-xl text-[#0F172A] tracking-tight">
            Cybokrafts
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="px-5 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Request Demo
        </a>
      </div>
    </header>
  );
}
