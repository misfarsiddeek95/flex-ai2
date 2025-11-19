import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";
import LogoCarouselSection from "@/components/case-studies/LogoCarouselSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen relative bg-white">
      <LogoCarouselSection />
      <CaseStudiesGrid />
      {/* <TestimonialsSection /> */}
      {/* <CTASection imgSrc="" /> */}
    </main>
  );
};

export default page;
