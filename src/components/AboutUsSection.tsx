"use client";

import TagButton from "./ui/TagButton";
import styles from "./AboutUsSection.module.css";
import { useInView } from "react-intersection-observer";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSplineCache } from "@/hooks/useSplineCache";
import { Database, Zap, ShieldCheck } from "lucide-react";

// Dynamically import Spline with SSR disabled
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      Loading Robot...
    </div>
  ),
});

export default function AboutUsSection() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(true);
  // Use the custom hook to get the cached URL
  const { sceneUrl } = useSplineCache(
    "https://prod.spline.design/lPFhmjX09AKt3iES/scene.splinecode"
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="relative z-30 bg-[#ffffff]">
        <div className={`${styles.waveWrapper} rotate-180`}>
          <svg
            className={styles.wavesInner}
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={styles.parallax}>
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="#fff7ed" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="#faf5ff" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="#f0f9ff" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#faf5ff" />
            </g>
          </svg>
        </div>
      </div>
      <section
        ref={sectionRef}
        className="relative bg-white py-16 md:py-24 px-4 sm:px-4 overflow-hidden"
      >
        <div className="relative bg-white rounded-xl p-10 z-10">
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left side */}
            <div className="flex flex-col space-y-8">
              <TagButton text="What is Flexiana AI?" className="self-start" />

              <p className="text-lg leading-relaxed text-black font-normal">
                At Flexiana, we don’t hand you templates or one-size-fits-all
                solutions. We build intelligence together. AI that truly
                understands your data, your systems, and what you’re trying to
                achieve.
              </p>

              <p className="text-lg leading-relaxed text-black font-normal">
                Whether it’s anticipating customer needs, automating your
                workflows, or giving new life to your machines, we craft systems
                that are completely yours. Every model, every pipeline, every
                line of code is designed for your world and the impact you want
                to create.
              </p>

              <h3 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-6 md:mb-8">
                Our DNA
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center group-hover:bg-[#FF6F00]/20 transition-colors duration-300">
                    <Database className="w-4 h-4 md:w-5 md:h-5 text-[#FF6F00]" />
                  </div>
                  <p className="text-base md:text-[19px] font-medium text-gray-800 leading-relaxed pt-1 md:pt-1.5">
                    You own everything — models, pipelines, data flows
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center group-hover:bg-[#FF6F00]/20 transition-colors duration-300">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#FF6F00]" />
                  </div>
                  <p className="text-base md:text-[19px] font-medium text-gray-800 leading-relaxed pt-1 md:pt-1.5">
                    We move fast, iterate, and keep it transparent.
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center group-hover:bg-[#FF6F00]/20 transition-colors duration-300">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#FF6F00]" />
                  </div>
                  <p className="text-base md:text-[19px] font-medium text-gray-800 leading-relaxed pt-1 md:pt-1.5">
                    Ethical, secure, and sustainable by design.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side image placeholder (SPLINE) */}
            <div className="relative w-full md:w-full h-[300px] md:h-full rounded-lg flex items-center justify-center overflow-hidden">
              {/* Only render Spline if in view AND not mobile AND we have a URL */}
              {inView && !isMobile && sceneUrl ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      Loading Robot...
                    </div>
                  }
                >
                  <Spline
                    className="w-full h-full origin-bottom scale-110 md:scale-90"
                    scene={sceneUrl}
                  />
                </Suspense>
              ) : (
                /* Fallback for mobile or not in view - could be a static image or just empty/loading state */
                /* For now, keeping it empty or showing a placeholder if needed.
                   The user asked to "do the proper implementation", so not loading 27MB on mobile is proper. */
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                  {isMobile ? (
                    <div className="text-gray-400 text-sm">
                      3D View available on Desktop
                    </div>
                  ) : (
                    <div className="text-gray-400">Loading...</div>
                  )}
                </div>
              )}

              {/* 💡 INTERACTIVE FRAME (Fade Overlay) */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/4 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />

              {/* 💡 WATERMARK BLOCKER (Mask) */}
              <div className="absolute bottom-0 right-0 md:bottom-0 md:right-0 w-80 md:w-55 h-16 bg-white z-30" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
