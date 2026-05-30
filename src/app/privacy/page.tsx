import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Cybokrafts",
  description:
    "Privacy Policy for Cybokrafts AI-powered energy infrastructure platform.",
};

const sections = [
  {
    title: "1. Introduction",
    content: `
Cybokrafts (“Company”, “we”, “our”, or “us”) is committed to protecting the privacy, confidentiality, and security of information associated with our digital platforms, AI-powered monitoring systems, industrial infrastructure technologies, and related services.

This Privacy Policy explains how we collect, use, process, store, disclose, and protect information when users interact with our website, enterprise platforms, communication systems, and associated technologies.
    `,
  },
  {
    title: "2. Information We Collect",
    content: `
We may collect technical, operational, and personal information necessary for business communication, infrastructure analytics, platform performance, security monitoring, and service optimization.

This may include:

• Name, organization name, designation, and contact details
• Business email addresses and phone numbers
• Infrastructure telemetry and device-generated data
• Browser type, IP address, operating system, and device identifiers
• Website interaction analytics and usage patterns
• Communications submitted through contact forms or business inquiries
• Cookies and session-related technologies
    `,
  },
  {
    title: "3. How We Use Information",
    content: `
Collected information may be used for:

• Delivering and improving infrastructure intelligence services
• Responding to business inquiries and enterprise requests
• Monitoring system reliability and cybersecurity
• Conducting analytics, diagnostics, and operational optimization
• Maintaining legal, regulatory, and compliance obligations
• Enhancing platform stability, scalability, and performance
• Communicating product updates, technical notices, and service-related information
    `,
  },
  {
    title: "4. Industrial & Infrastructure Data",
    content: `
Cybokrafts develops technologies for energy infrastructure environments including Solar, EV, Transformer, and industrial monitoring systems.

Operational telemetry, infrastructure diagnostics, and analytical outputs generated through enterprise systems remain subject to contractual agreements with clients and infrastructure operators.

We implement commercially reasonable safeguards to protect sensitive operational and infrastructure-related data against unauthorized access, misuse, disclosure, or disruption.
    `,
  },
  {
    title: "5. Cookies & Tracking Technologies",
    content: `
Our website may use cookies, analytics technologies, and related mechanisms to improve website functionality, performance measurement, traffic analysis, and user experience optimization.

Users may modify browser settings to disable cookies; however, certain website functionality may become limited.
    `,
  },
  {
    title: "6. Data Sharing & Disclosure",
    content: `
Cybokrafts does not sell personal information.

Information may be shared only under limited circumstances including:

• Service providers supporting infrastructure, hosting, analytics, or security operations
• Legal or regulatory compliance obligations
• Protection of rights, systems, security, or operational integrity
• Corporate restructuring, merger, acquisition, or asset transfer activities

All third-party service providers are expected to maintain appropriate confidentiality and security standards.
    `,
  },
  {
    title: "7. Data Security",
    content: `
We maintain administrative, technical, and organizational safeguards designed to protect systems, platforms, and stored information from unauthorized access, alteration, disclosure, or destruction.

Despite commercially reasonable safeguards, no internet-based transmission or storage system can be guaranteed as completely secure.
    `,
  },
  {
    title: "8. Data Retention",
    content: `
Information may be retained for operational, legal, analytical, contractual, cybersecurity, or compliance purposes for durations reasonably necessary to fulfill business obligations and legitimate operational requirements.
    `,
  },
  {
    title: "9. Third-Party Services",
    content: `
Our website or platforms may contain references or integrations involving third-party services, infrastructure providers, analytics platforms, cloud systems, or external websites.

Cybokrafts is not responsible for the privacy practices, content, or operational policies of third-party services.
    `,
  },
  {
    title: "10. International Operations",
    content: `
Information may be processed, stored, or accessed across jurisdictions where infrastructure providers, cloud systems, or operational partners maintain facilities.

Users acknowledge that data protection regulations may differ across jurisdictions.
    `,
  },
  {
    title: "11. User Rights",
    content: `
Subject to applicable law, users may request access, correction, deletion, restriction, or clarification regarding personal information maintained by Cybokrafts.

Requests may be submitted through official communication channels listed below.
    `,
  },
  {
    title: "12. Policy Updates",
    content: `
Cybokrafts reserves the right to modify or update this Privacy Policy periodically to reflect operational, legal, technological, or regulatory changes.

Updated versions become effective immediately upon publication unless otherwise stated.
    `,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bg-border">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="privacy-grid"
                width="42"
                height="42"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 42 0 L 0 0 0 42"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#privacy-grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-36 pb-24 relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-blue mb-6">
            Legal Information
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] max-w-4xl">
            Privacy Policy
          </h1>

          <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-3xl">
            This Privacy Policy outlines how Cybokrafts collects,
            processes, protects, and manages information associated with our
            AI-powered infrastructure intelligence platforms and digital
            services.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-text-muted">
            <span>Effective Date: May 26, 2026</span>
            <span>•</span>
            <span>Cybokrafts Energy Intelligence Platform</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="space-y-20">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border-b border-bg-border pb-16"
              >
                <h2 className="text-3xl font-semibold tracking-tight mb-8">
                  {section.title}
                </h2>

                <div className="text-text-secondary leading-8 whitespace-pre-line text-[15.5px]">
                  {section.content}
                </div>
              </div>
            ))}

            {/* CONTACT */}
            <div className="bg-bg-surface border border-bg-border rounded-[4px] p-10">
              <h2 className="text-3xl font-semibold tracking-tight mb-6">
                13. Contact Information
              </h2>

              <p className="text-text-secondary leading-8 text-[15.5px] mb-8">
                Questions, compliance inquiries, or privacy-related requests
                may be directed to Cybokrafts through official communication
                channels.
              </p>

              <div className="space-y-3 text-[15px]">
                <p>
                  <span className="text-text-muted">Company:</span>{" "}
                  Cybokrafts
                </p>

                <p>
                  <span className="text-text-muted">Industry:</span>{" "}
                  AI-Powered Energy Infrastructure Systems
                </p>

                <p>
                  <span className="text-text-muted">Email:</span>{" "}
                  contact@cybokrafts.com
                </p>

                <p>
                  <span className="text-text-muted">Website:</span>{" "}
                  https://cybokrafts.vercel.app
                </p>
              </div>
            </div>

            {/* BACK */}
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-accent-blue hover:opacity-80 transition-opacity"
              >
                ← Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}