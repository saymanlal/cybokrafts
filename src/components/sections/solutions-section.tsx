const solutions = [
    {
      title: "Solar Energy Intelligence",
      description:
        "Real-time generation analytics, panel diagnostics, fault detection, and performance optimization for utility-scale solar infrastructure.",
    },
    {
      title: "EV Infrastructure Monitoring",
      description:
        "Smart monitoring systems for EV charging networks with uptime analytics, load balancing, and predictive operational insights.",
    },
    {
      title: "Transformer Analytics",
      description:
        "Advanced thermal monitoring and predictive maintenance systems for high-reliability transformer operations.",
    },
  ];
  
  export default function SolutionsSection() {
    return (
      <section className="py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-20">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-6">
              Core Solutions
            </p>
  
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Intelligent Monitoring Across Critical Energy Systems
            </h2>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="border border-white/10 bg-white/[0.02] p-10 hover:border-cyan-500/40 transition"
              >
                <h3 className="text-2xl font-semibold mb-6">
                  {solution.title}
                </h3>
  
                <p className="text-slate-300 leading-7">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }