import React from "react";
import BlogBanner from "@/components/blog/BlogBanner";
import BlogSection from "@/components/blog/BlogSection";
import CTASection from "@/components/CTASection";

const page = () => {
  return (
    <main className="min-h-screen relative bg-white">
      <BlogBanner />
      <BlogSection />
      {/* <CTASection imgSrc="" /> */}
    </main>
  );
};

export default page;
