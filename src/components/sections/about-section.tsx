export default function AboutSection() {
    return (
      <section className="py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-6">
              Who We Are
            </p>
  
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Engineering Intelligence Into Energy Infrastructure
            </h2>
          </div>
  
          <div>
            <p className="text-slate-300 text-lg leading-8">
              Cybokrafts delivers AI-powered monitoring systems designed for
              modern energy ecosystems. Our solutions enable real-time visibility,
              predictive analytics, operational reliability, and intelligent
              infrastructure management across Solar, EV, and Transformer
              networks.
            </p>
          </div>
        </div>
      </section>
    );
  }