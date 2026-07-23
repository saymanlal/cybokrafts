import Link from "next/link";
import AboutHero from "@/components/sections/about-hero";
import CoreDNA from "@/components/sections/core-dna";
import LeadershipTree from "@/components/sections/leadership-tree";
import Milestones from "@/components/sections/milestones";

export const metadata = {
  title: "About & Leadership",
  description:
    "Meet the team behind Cybokrafts Universal Innovations — founders, operators, and advisors building indigenous AI-powered energy intelligence for India's critical infrastructure.",
  alternates: { canonical: "https://cybokrafts.vercel.app/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      {/* ── 1. HERO & STATS SECTION ── */}
      <AboutHero />

      {/* ── 2. CORE DNA VALUES SECTION ── */}
      <CoreDNA />

      {/* ── 3. INTERACTIVE LEADERSHIP SECTION ── */}
      <LeadershipTree />

      {/* ── 4. OPERATIONAL MILESTONES TIMELINE ── */}
      <Milestones />

      {/* ── 5. RETURN NAVIGATION LINK ── */}
      <section className="py-24 bg-bg-base border-t border-bg-border/60">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-mono text-xs text-text-muted mb-4 uppercase tracking-widest">
            Back to main dashboard
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-accent-blue hover:text-accent-blue-hover transition-colors font-sans font-medium px-6 py-3 rounded-xl border border-accent-blue/20 hover:border-accent-blue/50 bg-bg-surface/50 backdrop-blur-md shadow-sm hover:shadow"
          >
            ← Return to Homepage
          </Link>
        </div>
      </section>
    </main>
  );
}

