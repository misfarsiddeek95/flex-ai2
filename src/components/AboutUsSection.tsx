"use client";

import TagButton from "./ui/TagButton";
import styles from "./AboutUsSection.module.css";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";
// Assuming you have dynamically imported Spline elsewhere,
// but for component clarity, we use the standard import here for reference.
import Spline from "@splinetool/react-spline";

export default function AboutUsSection() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true, // Key: Loads once, never unmounts
    threshold: 0.1, // Trigger when 10% is visible
  });

  return (
    <>
      <div className="relative  z-30 bg-[#ffffff]">
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
                At Flexiana, we don&apos;t sell templates or black boxes. We
                co-create custom intelligence—AI that understands your data,
                your systems, and your purpose.
              </p>

              <p className="text-lg leading-relaxed text-black font-normal">
                Whether it&apos;s predicting customer behavior, automating
                processes, or giving vision to your machines, we craft systems
                that belong entirely to you: the models, the pipelines, the
                code, and the future impact.
              </p>

              <div className="bg-white/60 rounded-3xl p-8 md:py-12 shadow-xl/20 mt-8 space-y-4">
                <h3 className="text-2xl md:text-[32px] font-bold text-gray-900">
                  Our DNA
                </h3>

                <div className="text-[21px] font-semibold leading-relaxed space-y-3 text-black/90">
                  <p>You own everything — models, pipelines, data flows</p>
                  <p>We move fast, iterate, and keep it transparent.</p>
                  <p>Ethical, secure, and sustainable by design.</p>
                </div>
              </div>
            </div>

            {/* Right side image placeholder (SPLINE) */}
            <div className="relative w-full md:w-full h-[300px] md:h-full rounded-lg flex items-center justify-center overflow-hidden">
              {inView && (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      Loading Robot...
                    </div>
                  }
                >
                  <Spline
                    className="w-full h-full origin-bottom scale-110 md:scale-90"
                    scene="https://prod.spline.design/lPFhmjX09AKt3iES/scene.splinecode"
                  />
                </Suspense>
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
