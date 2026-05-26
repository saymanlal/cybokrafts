export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-[#2563EB] rounded flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8L8 2L14 8L8 14L2 8Z" fill="white" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">Cybokrafts</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Driving Digital Energy Transformation under the Atmanirbhar Vision. AI-powered monitoring systems for India's critical energy infrastructure.
            </p>
            <p className="text-xs font-semibold text-[#64748B] italic leading-relaxed max-w-sm">
              "Inspired by the vision and legacy of Sir Ratan Naval Tata Ji — with deep gratitude and resolve to build something worthy."
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Products</h3>
            <ul className="space-y-3 text-sm">
              {["AIpowerOS Platform", "CYBO-VAJRA Device", "Solar Intelligence", "EV Infrastructure", "Transformer Analytics"].map((item) => (
                <li key={item}>
                  <a href="#solutions" className="hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              {["About Us", "Our 7G Values", "Careers", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#about" className="hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {year} Cybokrafts Universal Innovations Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2 font-semibold text-[#64748B]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" />
              </svg>
              Made in India
            </span>
            <span className="text-[#1E293B]">·</span>
            <span className="font-semibold text-[#64748B]">Atmanirbhar Bharat</span>
            <span className="text-[#1E293B]">·</span>
            <span className="font-semibold text-[#64748B]">DPIIT Recognized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
