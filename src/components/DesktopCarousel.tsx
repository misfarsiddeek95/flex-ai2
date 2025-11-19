"use client";

import React, { useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CaseStudyCard from "./ui/CaseStudyCard";
import { getAllCaseStudies } from "@/lib/caseStudies";

export default function DesktopCarousel() {
  // Get case studies from data
  const caseStudies = getAllCaseStudies().map((cs) => ({
    title: cs.title,
    imgSrc: cs.heroImage,
    videoSrc: cs.heroVideo,
    href: `/case-studies/${cs.slug}`,
  }));

  // 1. Set up Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // Don't loop
    align: "start", // Align to the left
    skipSnaps: true, // Allows for a smoother, non-snapping scroll
  });

  // 2. Ref to prevent rapid scrolling from a single wheel flick
  const isWheeling = useRef(false);

  // 3. The Wheel Event Handler
  const onWheel = useCallback(
    (event: WheelEvent) => {
      if (!emblaApi) return;

      // If we're already processing a scroll, ignore this one
      if (isWheeling.current) {
        event.preventDefault(); // Still stop the page from scrolling
        return;
      }

      const deltaY = event.deltaY;
      const canScrollNext = emblaApi.canScrollNext();
      const canScrollPrev = emblaApi.canScrollPrev();

      if (deltaY > 0) {
        // Scrolling DOWN
        if (canScrollNext) {
          // If we can scroll right, do it and STOP the page scroll
          event.preventDefault();
          emblaApi.scrollNext();
        } else {
          // We're at the end, so LET the page scroll
          return;
        }
      } else if (deltaY < 0) {
        // Scrolling UP
        if (canScrollPrev) {
          // If we can scroll left, do it and STOP the page scroll
          event.preventDefault();
          emblaApi.scrollPrev();
        } else {
          // We're at the beginning, so LET the page scroll
          return;
        }
      }

      // Set a "cooldown" to prevent hyperscrolling
      isWheeling.current = true;
      setTimeout(() => {
        isWheeling.current = false;
      }, 300); // 300ms cooldown
    },
    [emblaApi]
  );

  // 4. Attach the event listener
  useEffect(() => {
    const viewport = emblaApi?.containerNode()?.parentElement;
    if (viewport) {
      // We must add { passive: false } to be able to call event.preventDefault()
      viewport.addEventListener("wheel", onWheel, { passive: false });
      return () => viewport.removeEventListener("wheel", onWheel);
    }
  }, [emblaApi, onWheel]);

  return (
    // This entire component is hidden on mobile
    <div className="hidden md:block">
      {/* Viewport: This is what we attach the wheel event to */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container */}
        <div className="flex gap-6">
          {" "}
          {/* The space between cards */}
          {caseStudies.map((study, index) => (
            // Each slide
            <div className="grow-0 shrink-0 min-w-0 w-3/4" key={index}>
              <div className="aspect-video rounded-2xl overflow-hidden">
                <CaseStudyCard
                  title={study.title}
                  videoUrl={study.videoSrc}
                  href={study.href}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
