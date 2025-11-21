import React, { memo } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { CarouselData } from "@/types/caseStudy";

interface CaseStudyCardProps {
  title: string;
  videoUrl: string;
  href: string;
  carouselData?: CarouselData;
}

const CaseStudyCard = memo(function CaseStudyCard({
  title,
  videoUrl,
  href,
  carouselData,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="relative w-full h-full shrink-0 block group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Card styling - Flex col for mobile, Block for desktop */}
      <div
        className="relative flex flex-col md:block w-full h-full md:p-1 md:scale-[1.02]
                      transition-transform duration-300 md:group-hover:scale-[1.03]"
      >
        {/* Video container */}
        <div
          className="relative w-full aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full rounded-t-2xl md:rounded-2xl overflow-hidden bg-gray-100"
          style={{
            isolation: "isolate",
            transform: "translateZ(0)", // Force GPU acceleration for better rendering
            WebkitTransform: "translateZ(0)",
            maskImage: "radial-gradient(white, black)", // Safari fix for border-radius with overflow-hidden
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}
        >
          <iframe
            src={`${videoUrl}?autoplay=1&loop=1&muted=1&background=1&autopause=0&quality=720p`}
            className="absolute inset-0 w-full h-full rounded-t-2xl md:rounded-2xl"
            style={{
              border: "none",
              display: "block",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Gradient overlay - Desktop Only */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />

        {/* Content Container */}
        <div className="relative p-6 md:absolute md:inset-0 md:p-8 z-20 flex flex-col justify-start md:justify-end bg-white md:bg-transparent grow overflow-hidden">
          {/* Title */}
          <h3 className="text-gray-900 md:text-white text-2xl md:text-[32px] font-bold leading-tight drop-shadow-none md:drop-shadow-lg mb-4 line-clamp-2 md:line-clamp-none min-h-[3.75rem] md:min-h-0 transition-transform duration-300 md:group-hover:translate-x-2">
            {carouselData?.title || title}
          </h3>

          {/* Points */}
          <div className="overflow-hidden">
            <ul className="space-y-3">
              {carouselData?.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 transition-transform duration-300 md:group-hover:translate-x-2"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#51C4F6]/10 md:bg-[#51C4F6]/20 flex items-center justify-center mt-0.5 backdrop-blur-sm">
                    <Check className="w-3.5 h-3.5 text-[#0091EA] md:text-[#51C4F6] stroke-[3]" />
                  </div>
                  <span className="text-lg text-gray-700 md:text-white/90 font-medium leading-snug drop-shadow-none md:drop-shadow-md">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default CaseStudyCard;
