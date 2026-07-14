import { Suspense } from "react";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SolutionsSection from "@/components/sections/solutions-section";
import FeaturesSection from "@/components/sections/features-section";
import ValuesSection from "@/components/sections/values-section";
import VisionSection from "@/components/sections/vision-section";
import BlogSection from "@/components/sections/blog-section";
import BlogSkeleton from "@/components/sections/blog-skeleton";
import ContactSection from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <FeaturesSection />
      <ValuesSection />
      <VisionSection />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogSection />
      </Suspense>
      <ContactSection />
    </>
  );
}