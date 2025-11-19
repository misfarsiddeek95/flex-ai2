import React, { memo } from "react";
import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  videoUrl: string;
  href: string;
}

const CaseStudyCard = memo(function CaseStudyCard({
  title,
  videoUrl,
  href,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="relative w-full h-full shrink-0 block group cursor-pointer rounded-2xl overflow-hidden"
    >
      {/* Card styling - with padding to show rounded corners */}
      <div
        className="relative flex items-center justify-center w-full h-full p-1 scale-[1.02]
                      transition-transform duration-300 group-hover:scale-[1.03]"
      >
        {/* Video container with rounded corners */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            isolation: "isolate",
            transform: "translateZ(0)", // Force GPU acceleration for better rendering
            WebkitTransform: "translateZ(0)",
          }}
        >
          <iframe
            src={`${videoUrl}?autoplay=1&loop=1&muted=1&background=1&autopause=0&quality=720p`}
            className="absolute inset-0 w-full h-full"
            style={{
              border: "none",
              display: "block",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-1" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-2" />

        {/* Text - positioned for visibility on both mobile and desktop */}
        <span className="absolute top-4 left-4 md:top-6 md:right-6 md:left-auto text-white text-xl md:text-2xl font-bold z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-[80%] md:max-w-none">
          {title}
        </span>
      </div>
    </Link>
  );
});

export default CaseStudyCard;
