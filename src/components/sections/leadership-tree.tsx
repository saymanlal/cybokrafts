"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import TeamMember, { TeamMemberData } from "@/components/sections/team-member";
import { VIEWPORT } from "@/lib/motion";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─── Expanded Leadership Team Data ───────────────────────────────────────────
const FOUNDER: TeamMemberData = {
  name: "Akhil Chawla",
  role: "Founder",
  img: "/images/akhil.jpeg",
  bio: "Akhil is the visionary engineer leading Cybokrafts' mission to secure India's grid infrastructure. As the primary inventor of the patented CYBO-VAJRA device, he operates at the intersection of electrical engineering and industrial IoT. His goal is to eliminate energy asset downtime through indigenous hardware innovation.",
  skills: ["Hardware IP & Sensors", "Grid Analytics", "Embedded IoT Systems", "Product Roadmap"],
  linkedin: "https://www.linkedin.com/in/akhil-chawla-cybokrafts/",
  email: "akhil@cybokrafts.com",
  color: "blue",
  objectPos: "50% 20%",
  isFounder: true,
};

const EXECUTIVES: TeamMemberData[] = [
  {
    name: "Rahul Chawla",
    role: "Co-Founder",
    img: "/images/rahul.jpeg",
    bio: "Rahul steers the operational and business strategy at Cybokrafts. With a focus on scaling utility contracts and government collaborations, he translates deep-tech engineering into commercial grid solutions. Under his operations, Cybokrafts has established strategic relationships with major electrical utility entities across India.",
    skills: ["Utility Operations", "Strategic Partnerships", "Business Development", "DPIIT & Startup India Relations"],
    linkedin: "https://www.linkedin.com/in/rahul-chawla-cybokrafts/",
    email: "rahul@cybokrafts.com",
    color: "emerald",
    objectPos: "50% 18%",
  },
  {
    name: "KK Somwane",
    role: "Chief Advisor",
    img: "/images/kk_somwane.jpeg",
    bio: "A distinguished veteran in electrical engineering and power distribution systems, Mr. Somwane guides Cybokrafts' hardware architecture and regulatory compliance. His decades of utility experience ensure that CYBO-VAJRA adheres to the highest industrial safety and grid standards.",
    skills: ["Grid Compliance", "Transformer Architecture", "Utility Grid Operations", "Technical Advisory"],
    linkedin: "https://www.linkedin.com/in/kk-somwane/",
    color: "amber",
    objectPos: "50% 16%",
  },
  {
    name: "Vishal Kumar",
    role: "Chief Business Officer",
    img: "/images/vishal.jpeg",
    bio: "Vishal leads corporate partnerships, investor relations, and commercial scaling. With extensive experience in enterprise B2B sales, he bridges the gap between Cybokrafts' advanced edge intelligence and utility boardrooms, accelerating the deployment of grid monitoring devices.",
    skills: ["Enterprise B2B Sales", "Strategic Scaling", "Investor Relations", "Corporate Alliances"],
    linkedin: "https://www.linkedin.com/in/vishal-kumar/",
    email: "vishal@cybokrafts.com",
    color: "cyan",
    objectPos: "50% 20%",
  },
  {
    name: "Ram Sanodiya",
    role: "Chief Technology Officer",
    img: "/images/ram_sanodiya.jpeg",
    bio: "Ram is the systems architect behind AIpowerOS, Cybokrafts' cloud intelligence engine. Specializing in high-throughput telemetry pipelines and predictive machine learning models, he translates raw grid sensor data into actionable asset-health insights.",
    skills: ["AIpowerOS Cloud Architect", "Predictive ML Models", "Telemetry Pipelines", "Embedded Linux Development"],
    linkedin: "https://www.linkedin.com/in/ram-sanodiya/",
    email: "ram@cybokrafts.com",
    color: "cyan",
    objectPos: "50% 20%",
  },
];

const ALL_MEMBERS = [FOUNDER, ...EXECUTIVES];

export default function LeadershipTree() {
  const [activeMember, setActiveMember] = useState<TeamMemberData>(FOUNDER);

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative py-24 md:py-32 lg:py-36 bg-bg-base overflow-hidden border-t border-bg-border/60"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.14]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leadership-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--color-grid-line)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leadership-grid)" />
        </svg>
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent-blue/5 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* ── Section Header ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <p className="font-mono text-xs text-accent-blue uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2 font-semibold">
            <span className="w-8 h-px bg-accent-blue/40" />
            EXECUTIVE LEADERSHIP
            <span className="w-8 h-px bg-accent-blue/40" />
          </p>
          
          <h2
            id="leadership-heading"
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-text-primary uppercase tracking-tight leading-tight"
          >
            The People Behind Cybokrafts
          </h2>
          
          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mt-4">
            A focused team of founders, operators, and advisors building indigenous energy intelligence for critical infrastructure.
          </p>
        </m.div>

        {/* ── Hierarchical Dashboard Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Mobile Horizontal Carousel (Visible only on < lg) */}
          <div className="lg:hidden col-span-1 flex gap-3 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {ALL_MEMBERS.map((member, idx) => (
              <button
                key={member.name}
                onClick={() => setActiveMember(member)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-300 shrink-0 snap-center cursor-pointer ${
                  activeMember.name === member.name
                    ? "bg-bg-surface border-accent-blue text-accent-blue shadow-sm"
                    : "bg-bg-surface/50 border-bg-border/60 text-text-secondary"
                }`}
              >
                <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-bg-border/60">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="20px"
                    className="object-cover"
                    style={{ objectPosition: member.objectPos || "50% 20%" }}
                  />
                </div>
                {member.name}
              </button>
            ))}
          </div>

          {/* Desktop Left Column Navigation (Visible only on >= lg) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-3.5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">
              Select a Team Member
            </p>
            {ALL_MEMBERS.map((member, idx) => (
              <TeamMember
                key={member.name}
                member={member}
                isActive={activeMember.name === member.name}
                onClick={() => setActiveMember(member)}
                index={idx}
              />
            ))}
          </div>

          {/* Right Column: Dynamic Spotlight Bio Card (7 cols on lg) */}
          <div className="col-span-1 lg:col-span-7">
            <div className="bg-bg-surface/90 backdrop-blur-xl border border-bg-border/60 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg min-h-[500px] flex flex-col justify-between relative overflow-hidden h-full">
              
              <AnimatePresence mode="wait">
                <m.div
                  key={activeMember.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Top: Avatar + Name + Badges */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-bg-border/40">
                      
                      {/* Avatar Image + Glow */}
                      <div className="relative shrink-0">
                        <div className={`absolute inset-[-12px] rounded-full blur-md opacity-35 animate-pulse ${
                          activeMember.color === 'blue' ? 'bg-accent-blue' :
                          activeMember.color === 'cyan' ? 'bg-cyan-500' :
                          activeMember.color === 'amber' ? 'bg-accent-amber' :
                          'bg-status-green'
                        }`} />
                        
                        <div className={`relative w-28 h-28 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                          activeMember.color === 'blue' ? 'border-accent-blue/30' :
                          activeMember.color === 'cyan' ? 'border-cyan-500/30' :
                          activeMember.color === 'amber' ? 'border-accent-amber/30' :
                          'border-status-green/30'
                        }`}>
                          <Image
                            src={activeMember.img}
                            alt={activeMember.name}
                            fill
                            sizes="112px"
                            className="object-cover"
                            style={{ objectPosition: activeMember.objectPos || "50% 20%" }}
                          />
                        </div>
                      </div>

                      {/* Name & Titles */}
                      <div className="text-center sm:text-left">
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-1.5">
                          {activeMember.isFounder && (
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue-light px-2.5 py-0.5 rounded-full border border-accent-blue/15">
                              Founder IP
                            </span>
                          )}
                          <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            activeMember.color === 'blue' ? 'text-accent-blue bg-accent-blue/5 border-accent-blue/15' :
                            activeMember.color === 'cyan' ? 'text-cyan-600 bg-cyan-500/5 border-cyan-500/15' :
                            activeMember.color === 'amber' ? 'text-accent-amber bg-accent-amber/5 border-accent-amber/15' :
                            'text-status-green bg-status-green/5 border-status-green/15'
                          }`}>
                            {activeMember.color.toUpperCase()} CORE
                          </span>
                        </div>
                        
                        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-primary uppercase tracking-tight leading-none mb-2">
                          {activeMember.name}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-blue">
                          {activeMember.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio Paragraph */}
                    <div className="mt-6">
                      <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                        {activeMember.bio}
                      </p>
                    </div>

                    {/* Skill Badges */}
                    <div className="mt-6 pt-6 border-t border-bg-border/30">
                      <h4 className="font-mono text-[10px] text-text-muted uppercase tracking-widest font-bold mb-3">
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-sans text-xs text-text-primary px-3 py-1 rounded-lg bg-bg-muted border border-bg-border/40 hover:border-accent-blue/30 hover:bg-bg-base transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Action Links (LinkedIn, Mail) */}
                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-bg-border/40">
                    <div className="flex items-center gap-3">
                      <a
                        href={activeMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-lg border border-bg-border/60 hover:bg-bg-muted text-text-secondary transition-all duration-300 ${
                          activeMember.color === 'blue' ? 'hover:text-accent-blue hover:border-accent-blue/40' :
                          activeMember.color === 'cyan' ? 'hover:text-cyan-500 hover:border-cyan-500/40' :
                          activeMember.color === 'amber' ? 'hover:text-accent-amber hover:border-accent-amber/40' :
                          'hover:text-status-green hover:border-status-green/40'
                        }`}
                        aria-label={`${activeMember.name}'s LinkedIn`}
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>

                      {activeMember.email && (
                        <a
                          href={`mailto:${activeMember.email}`}
                          className={`p-2.5 rounded-lg border border-bg-border/60 hover:bg-bg-muted text-text-secondary transition-all duration-300 ${
                            activeMember.color === 'blue' ? 'hover:text-accent-blue hover:border-accent-blue/40' :
                            activeMember.color === 'cyan' ? 'hover:text-cyan-500 hover:border-cyan-500/40' :
                            activeMember.color === 'amber' ? 'hover:text-accent-amber hover:border-accent-amber/40' :
                            'hover:text-status-green hover:border-status-green/40'
                          }`}
                          aria-label={`Email ${activeMember.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                      Cybokrafts Core Leadership
                    </span>
                  </div>

                  {/* Ambient Bottom Corner Glow inside Card */}
                  <div className={`absolute -right-24 -bottom-24 w-72 h-72 rounded-full blur-[100px] opacity-10 pointer-events-none transition-all duration-500 ${
                    activeMember.color === 'blue' ? 'bg-accent-blue' :
                    activeMember.color === 'cyan' ? 'bg-cyan-500' :
                    activeMember.color === 'amber' ? 'bg-accent-amber' :
                    'bg-status-green'
                  }`} />
                </m.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

