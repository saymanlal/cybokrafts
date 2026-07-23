"use client";

import Image from "next/image";
import { m } from "framer-motion";

export interface TeamMemberData {
  name: string;
  role: string;
  img: string;
  bio: string;
  skills: string[];
  linkedin: string;
  email?: string;
  color: "blue" | "cyan" | "amber" | "emerald" | "green";
  objectPos?: string;
  isFounder?: boolean;
}

interface TeamMemberProps {
  member: TeamMemberData;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  index: number;
}

export default function TeamMember({
  member,
  isActive,
  onClick,
  className = "",
  index,
}: TeamMemberProps) {
  const borderColors = {
    blue: "border-accent-blue/30 hover:border-accent-blue/60 group-[.active]:border-accent-blue",
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 group-[.active]:border-cyan-500",
    amber: "border-accent-amber/30 hover:border-accent-amber/60 group-[.active]:border-accent-amber",
    emerald: "border-status-green/30 hover:border-status-green/60 group-[.active]:border-status-green",
    green: "border-status-green/30 hover:border-status-green/60 group-[.active]:border-status-green",
  };

  const textColors = {
    blue: "group-hover:text-accent-blue group-[.active]:text-accent-blue",
    cyan: "group-hover:text-cyan-500 group-[.active]:text-cyan-500",
    amber: "group-hover:text-accent-amber group-[.active]:text-accent-amber",
    emerald: "group-hover:text-status-green group-[.active]:text-status-green",
    green: "group-hover:text-status-green group-[.active]:text-status-green",
  };

  const bgGlows = {
    blue: "bg-accent-blue/10",
    cyan: "bg-cyan-500/10",
    amber: "bg-accent-amber/10",
    emerald: "bg-status-green/10",
    green: "bg-status-green/10",
  };

  const activePills = {
    blue: "bg-accent-blue",
    cyan: "bg-cyan-500",
    amber: "bg-accent-amber",
    emerald: "bg-status-green",
    green: "bg-status-green",
  };

  return (
    <m.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ x: 6 }}
      className={`group w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
        isActive ? "active bg-bg-surface shadow-md" : "bg-bg-surface/50 backdrop-blur-sm"
      } ${borderColors[member.color]} ${className}`}
    >
      {/* Avatar Container */}
      <div
        className={`relative w-14 h-14 rounded-full overflow-hidden border-2 shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          isActive ? "border-accent-blue" : "border-bg-border/60"
        }`}
      >
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="56px"
          className="object-cover"
          style={{ objectPosition: member.objectPos || "50% 20%" }}
        />
      </div>

      {/* Info Column */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-heading font-bold text-base sm:text-lg text-text-primary tracking-tight transition-colors duration-200 ${
            textColors[member.color]
          }`}
        >
          {member.name}
        </h3>
        <p className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-secondary mt-0.5">
          {member.role}
        </p>
      </div>

      {/* Active Indicator Pillar / Dot */}
      <div className="flex items-center">
        {isActive ? (
          <m.div
            layoutId="active-indicator"
            className={`w-2.5 h-2.5 rounded-full ${activePills[member.color]} animate-pulse`}
          />
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-bg-border transition-colors group-hover:bg-text-muted" />
        )}
      </div>

      {/* Subtle Background Accent Glow */}
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-opacity duration-300 ${
          bgGlows[member.color]
        }`}
        aria-hidden="true"
      />
    </m.button>
  );
}

