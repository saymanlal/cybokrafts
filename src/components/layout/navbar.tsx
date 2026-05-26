"use client";

import Link from "next/link";
import { useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Platform", href: "#platform" },
  { label: "About", href: "#about" },
  { label: "Values", href: "#values" },
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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  return (
    <m.header
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 inset-x-0 z-50 transition-[background,border-color,padding] duration-300 ${scrolled
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

        {/* Nav Links */}
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

        {/* CTA */}
        <a
          href="#contact"
          className="px-[22px] py-[8px] bg-accent-blue text-white text-[13px] font-sans font-semibold rounded-[3px] hover:bg-accent-blue-hover transition-colors duration-200 shadow-none tracking-[0.04em]"
        >
          Request Demo
        </a>
      </div>
    </m.header>
  );
}
