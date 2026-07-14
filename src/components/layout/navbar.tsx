"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image"
import { m, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Platform", href: "#platform" },
  { label: "About", href: "#about" },
  { label: "Values", href: "#values" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

/** Navbar slide-in animation */
const navbarVariants = {
  hidden: { y: -64, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  return (
    <m.header
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 inset-x-0 z-50 transition-[background,border-color,padding] duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/96 backdrop-blur-[12px] border-b border-bg-border py-3"
          : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 group"
          aria-label="Cybokrafts Home"
        >
          <div className="flex-shrink-0">
            <Image
              src="/images/cybokrafts_logo.png"
              alt="Cybokrafts Logo"
              width={42}
              height={42}
              priority
              className="object-contain"
            />
          </div>

          <div className="flex flex-col -space-y-1">
            <span className="font-heading font-bold text-xl text-text-primary tracking-[0.06em] leading-tight">
              CYBOKRAFTS
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
              Energy Intelligence
            </span>
          </div>
        </Link>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary border-b-[1.5px] border-transparent hover:border-accent-blue transition-all duration-150 pb-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-4">
          {/* CTA - Desktop / Tablet */}
          <a
            href="#contact"
            className="hidden sm:inline-block px-[22px] py-[8px] bg-accent-blue text-white text-[13px] font-sans font-semibold rounded-[3px] hover:bg-accent-blue-hover transition-colors duration-200 shadow-none tracking-[0.04em]"
          >
            Request Demo
          </a>

          {/* Hamburger Menu Toggle - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary focus:outline-none rounded-[3px] border border-transparent active:border-bg-border/60"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full inset-x-0 bg-white/98 backdrop-blur-[16px] border-b border-bg-border md:hidden overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col px-6 py-6 gap-4 bg-white/90">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 py-2 border-b border-bg-border/20 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-3 bg-accent-blue text-white text-[13px] font-sans font-semibold rounded-[3px] hover:bg-accent-blue-hover transition-colors duration-200 mt-2 block shadow-sm tracking-[0.04em]"
              >
                Request Demo
              </a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}

