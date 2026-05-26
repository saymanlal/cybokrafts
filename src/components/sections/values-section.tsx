"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    name: "Guru Grace",
    tagline: "Wisdom-led leadership",
    description: "We are guided by wisdom, humility, and reverence for knowledge in every decision we make.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.5 12" /><path d="M12 2v10" />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Gratitude",
    tagline: "Humility at the core",
    description: "We appreciate every opportunity, every stakeholder, and every challenge that has shaped us.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    number: "03",
    name: "Genius Development",
    tagline: "Nurturing innovation",
    description: "We invest in talent, foster creative thinking, and build systems that bring out engineering excellence.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    number: "04",
    name: "Green Thinking",
    tagline: "Sustainability in every solution",
    description: "Every product we build is designed to reduce energy waste, support renewables, and protect the environment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12M12 12C12 7 17 3 22 3c0 5-4 9-10 9zM12 12C12 7 7 3 2 3c0 5 4 9 10 9z" />
      </svg>
    ),
  },
  {
    number: "05",
    name: "Global Vision",
    tagline: "Building for the world from India",
    description: "Our ambitions are not bounded by geography. We build indigenous solutions with global standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: "06",
    name: "Grounded Leadership",
    tagline: "Ethics and integrity at the helm",
    description: "Leadership at Cybokrafts means leading with authenticity, accountability, and unwavering integrity.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: "07",
    name: "Growth For All",
    tagline: "Shared and inclusive prosperity",
    description: "We create value not just for shareholders, but for communities, partners, and India at large.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  return (
    <section
      id="values"
      className="py-28 bg-[#F8FAFC] border-t border-[#E2E8F0]"
      aria-labelledby="values-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
            Foundational Principles
          </p>
          <h2
            id="values-heading"
            className="font-heading font-bold text-4xl md:text-[2.75rem] leading-[1.18] text-[#0F172A] mb-4"
          >
            Our 7G Core Values
          </h2>
          <p className="text-[#334155] text-lg leading-relaxed">
            The principles that guide every solution we build, every partnership we form, and every engineer we develop.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {values.map((value, i) => (
            <motion.div
              key={value.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="text-[#2563EB]">{value.icon}</div>
                <span className="text-xs font-bold text-[#CBD5E1] font-heading">{value.number}</span>
              </div>
              <h3 className="font-heading font-bold text-base text-[#0F172A] mb-1">{value.name}</h3>
              <p className="text-xs font-semibold text-[#2563EB] mb-3">{value.tagline}</p>
              <p className="text-sm text-[#64748B] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
