import React from "react";
import HeroBanner from "@/components/HeroBanner";
import AiStatement from "@/components/AiStatement";
import AboutUsSection from "@/components/AboutUsSection";
import RoadmapSection from "@/components/RoadmapSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyFlexianaSection from "@/components/WhyFlexianaSection";
import WhoWeBuildForSection from "@/components/WhoWeBuildForSection";
import CaseStudySection from "@/components/CaseStudySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white">
      <HeroBanner />
      {/* It provides a 50% viewport height (h-[50vh]) of blank space to fix the scroll animation bug. */}
      {/* <section className="h-[50vh] bg-[linear-gradient(135deg,#fff7ed_0%,#faf5ff_90%,#f0f9ff_100%)]" /> */}

      <AiStatement />

      <AboutUsSection />

      <RoadmapSection />

      {/* <IndustriesSection /> */}

      <WhyFlexianaSection />

      <WhoWeBuildForSection />

      <CaseStudySection />

      {/* <TestimonialsSection /> */}
      {/* <CTASection imgSrc="" /> */}
    </main>
  );
}
