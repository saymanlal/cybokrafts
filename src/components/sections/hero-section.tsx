"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center border-b border-white/10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#081120]/80 to-[#081120]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-cyan-400 mb-6">
            Intelligent Energy Infrastructure
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
            AI-Powered Monitoring Systems for Modern Energy Networks
          </h1>

          <p className="mt-8 text-lg text-slate-300 max-w-2xl leading-8">
            Cybokrafts develops advanced monitoring and predictive intelligence
            systems for Solar, EV, and Transformer infrastructure, enabling
            scalable, reliable, and data-driven energy operations.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-sm font-medium text-black">
              Explore Solutions
            </button>

            <button className="border border-white/20 hover:border-white/50 transition px-8 py-4 text-sm font-medium">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}