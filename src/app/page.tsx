import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SolutionsSection from "@/components/sections/solutions-section";
import VisionSection from "@/components/sections/vision-section";

export default function HomePage() {
  return (
    <main className="bg-[#081120] text-white overflow-hidden">
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <VisionSection />
    </main>
  );
}