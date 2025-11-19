"use client";

import React, { useEffect, useRef, useState } from "react";
import GradientText from "../ui/GradientText";

const HistorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0); // Kept for desktop animation

  const timelineData = [
    {
      year: "2016",
      description:
        "The main focus on Clojure and Clojure script projects with 10 team members",
    },
    {
      year: "2017",
      description: "20 team members, became the software polyglots",
    },
    {
      year: "2018",
      description: "The company reached profitability",
    },
    {
      year: "2019",
      description: "47 team members, US branch founded",
    },
    {
      year: "2020",
      description: "60+ team members, Service Design extension",
    },
    {
      year: "2022",
      description: "100 team members, Building our own product",
    },
    {
      year: "2023",
      description:
        "Expanding our portfolio by incorporating AI and undertaking additional internal projects.",
    },
    {
      year: "2024",
      description:
        "We focused on improving our internal projects and delivered important AI features, showing our dedication to progress and helping our clients succeed.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop <= windowHeight && sectionTop + sectionHeight >= 0) {
        const scrolled = windowHeight - sectionTop;
        const total = sectionHeight + windowHeight;
        const progress = Math.max(0, Math.min(1, scrolled / total));

        // Active index calculation with better distribution
        // Add more padding at the start to give 2016 more time to be visible
        // Increased from 0.05 to 0.15 for a longer initial delay
        const paddedProgress = Math.max(
          0,
          Math.min(1, (progress - 0.15) / 0.7)
        );
        const exactIndex = paddedProgress * (timelineData.length - 1);
        const clampedIndex = Math.max(
          0,
          Math.min(Math.round(exactIndex), timelineData.length - 1)
        );
        setActiveIndex(clampedIndex);

        // Calculate rotation to position active year at the indicator
        // Years are distributed from -45deg to 225deg (270 degree arc)
        // Indicator is at middle-left, which corresponds to 180 degrees in standard position
        const totalItems = timelineData.length;
        const startAngle = -45;
        const endAngle = 225;
        const angleRange = endAngle - startAngle;

        // The indicator position: right: 120px from a 300px container = 180px from left
        // At 50% height = center vertically
        // This is at 180 degrees (pointing left)
        const targetAngle = 180;

        // Calculate where the current active year is positioned on the arc
        const currentYearAngle =
          startAngle + (angleRange / (totalItems - 1)) * clampedIndex;

        // Rotate to bring the active year to the target position
        const newRotation = targetAngle - currentYearAngle;
        setRotation(newRotation);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [timelineData.length]);

  // Calculate dynamic scroll height based on number of years
  // Each year gets approximately 80vh of scroll space
  const scrollHeight = Math.max(300, timelineData.length * 80);

  return (
    <div
      ref={sectionRef}
      className="bg-white"
      style={{ minHeight: `${scrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* --- DESKTOP VIEW --- */}
          <div className="hidden lg:flex items-center gap-32">
            <div
              className="shrink-0 relative overflow-hidden"
              style={{ width: "300px", height: "600px" }}
            >
              {/* Rotating circle (SVG only) */}
              <div
                className="absolute transition-transform duration-100 ease-linear"
                style={{
                  transform: `scaleX(-1) rotate(${rotation}deg)`,
                  right: "0",
                  top: "45%",
                  marginTop: "-275px",
                  width: "600px",
                  height: "600px",
                }}
              >
                <svg viewBox="0 0 550 550" className="w-full h-full">
                  <defs>
                    <linearGradient
                      id="ringGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#51C4F6", stopOpacity: 1 }}
                      />
                      <stop
                        offset="25%"
                        style={{ stopColor: "#4A66CC", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#7A45C5", stopOpacity: 1 }}
                      />
                      <stop
                        offset="75%"
                        style={{ stopColor: "#FF8A3D", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#FFC34A", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="275"
                    cy="275"
                    r="210"
                    fill="none"
                    stroke="url(#ringGradient)"
                    strokeWidth="80"
                  />

                  <circle cx="275" cy="275" r="145" fill="white" />
                </svg>
              </div>

              {/* Years positioned on the circle arc - separate container (not flipped) */}
              <div
                className="absolute transition-transform duration-100 ease-linear"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  right: "0",
                  top: "45%",
                  marginTop: "-275px",
                  width: "600px",
                  height: "600px",
                }}
              >
                {timelineData.map((item, index) => {
                  const totalItems = timelineData.length;
                  // Distribute years evenly around the circle (270 degrees arc)
                  const startAngle = -45; // Start angle (top-right)
                  const endAngle = 225; // End angle (bottom-right)
                  const angleRange = endAngle - startAngle;
                  const angle =
                    startAngle + (angleRange / (totalItems - 1)) * index;

                  // Calculate position on circle (radius 250px for outer positioning)
                  const radius = 250;
                  const angleRad = (angle * Math.PI) / 180;
                  const x = 50 + (radius / 275) * 50 * Math.cos(angleRad); // Convert to percentage
                  const y = 50 + (radius / 275) * 50 * Math.sin(angleRad); // Convert to percentage

                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={index}
                      className={`absolute font-semibold transition-all duration-300 whitespace-nowrap ${
                        isActive ? "text-[#1A1A1A]" : "text-[#9CA3AF] italic"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: isActive
                          ? `translate(-50%, -50%)`
                          : `translate(-50%, -50%) rotate(${-rotation}deg)`,
                        fontSize: isActive ? "24px" : "20px",
                      }}
                    >
                      {item.year}
                    </div>
                  );
                })}
              </div>

              {/* Active year indicator (dot) and year display - fixed position */}
              <div
                className="absolute pointer-events-none flex items-center gap-3"
                style={{
                  right: "120px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div className="w-3 h-3 rounded-full bg-[#4A9AE8]"></div>
                <span className="text-2xl font-semibold text-[#1A1A1A]">
                  {timelineData[activeIndex].year}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <GradientText
                colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
                animationSpeed={5}
                showBorder={false}
                className="ml-0 mb-20"
              >
                <h1 className="text-[48px] font-bold leading-14">
                  Flexiana Throughout
                  <br />
                  the Years
                </h1>
              </GradientText>
              <div className="relative" style={{ height: "450px" }}>
                {timelineData.map((item, index) => {
                  const totalItems = timelineData.length;
                  // Better spacing with padding
                  const padding = 8;
                  const availableSpace = 100 - padding * 2;
                  const activeYPercent =
                    padding + (availableSpace / (totalItems - 1)) * activeIndex;
                  const inactiveYPercent =
                    padding + (availableSpace / (totalItems - 1)) * index;
                  const isActive = index === activeIndex;
                  const isAboveActive = index > activeIndex; // For above-active text hiding

                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-500 ${
                        isActive
                          ? "opacity-100 text-[#1A1A1A]"
                          : isAboveActive
                          ? "opacity-0" // Hide the text if above active
                          : "opacity-35 text-[#9CA3AF] italic"
                      }`}
                      style={{
                        top: isActive
                          ? `${activeYPercent}%`
                          : `${inactiveYPercent}%`,
                        transform: `translateY(-50%) ${
                          !isActive ? "rotate(-8deg)" : "rotate(0deg)"
                        }`,
                        transformOrigin: "left center",
                        width: "85%",
                        maxWidth: "600px",
                      }}
                    >
                      <p
                        className="text-[24px] font-semibold leading-8"
                        style={{ fontFamily: "Inter" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- MOBILE VIEW --- */}
          <div className="lg:hidden flex flex-col items-center space-y-10">
            <GradientText
              colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
              animationSpeed={5}
              showBorder={false}
            >
              <h1 className="text-[32px] sm:text-[40px] font-bold leading-10 sm:leading-12 text-center px-4">
                Flexiana Throughout
                <br />
                the Years
              </h1>
            </GradientText>

            {/* --- THIS IS THE MODIFIED SECTION --- */}
            <div className="relative w-full max-w-sm h-[200px]">
              <div className="absolute inset-0">
                <svg viewBox="0 0 360 200" className="w-full h-full">
                  <defs>
                    {/* <linearGradient
                      id="arcGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#6B5FE8", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#4A9AE8", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#6B5FE8", stopOpacity: 1 }}
                      />
                    </linearGradient> */}
                    <linearGradient
                      id="arcGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#51C4F6", stopOpacity: 1 }}
                      />
                      <stop
                        offset="25%"
                        style={{ stopColor: "#4A66CC", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#7A45C5", stopOpacity: 1 }}
                      />
                      <stop
                        offset="75%"
                        style={{ stopColor: "#FF8A3D", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#FFC34A", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>

                  {/* 1. This path is now flipped to draw at the top (y=0) */}
                  <path
                    d="M 30 0 A 150 150 0 0 0 330 0"
                    fill="none"
                    stroke="url(#arcGradient)"
                    strokeWidth="50"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* 2. This container is moved from 'bottom-0' to 'top-0'
                   and the dot/year are re-ordered.
              */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8">
                <span className="text-2xl font-semibold text-[#1A1A1A] transition-all -rotate-90">
                  {timelineData[activeIndex].year}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-[#42A5F5] to-[#7E57C2]"></div>
              </div>
            </div>
            {/* --- END OF MODIFIED SECTION --- */}

            <div className="px-8 text-center max-w-lg">
              <p className="text-[20px] sm:text-[24px] font-semibold leading-7 sm:leading-8 text-[#1A1A1A] transition-all">
                {timelineData[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
