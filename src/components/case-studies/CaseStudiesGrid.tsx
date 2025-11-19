import React from "react";
import DisplayCard from "../ui/DisplayCard";
import { getAllCaseStudies } from "@/lib/caseStudies";

export default function CaseStudiesGrid() {
  const caseStudies = getAllCaseStudies();

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
          {caseStudies.map((caseStudy) => (
            <DisplayCard
              key={caseStudy.slug}
              title={caseStudy.title}
              imageUrl={caseStudy.heroImage}
              href={`/case-studies/${caseStudy.slug}`}
              tags={caseStudy.tags}
              imageHeightClass="h-[280px]"
              hasVideoThumbnail={true}
              videoUrl={caseStudy.heroVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
