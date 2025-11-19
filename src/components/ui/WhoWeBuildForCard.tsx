import React, { forwardRef } from "react";

interface WhoWeBuildForCardProps {
  title: string;
  description: string;
  isHovered: boolean; // Receives hover state as a prop
}

// Wrap in 'forwardRef' to accept the ref from the parent
const WhoWeBuildForCard = forwardRef<HTMLDivElement, WhoWeBuildForCardProps>(
  ({ title, description, isHovered }, ref) => {
    return (
      // Attach the 'ref' to this element
      <div className="w-full max-w-[520px]" ref={ref}>
        <div
          className={`
          relative
          p-px rounded-2xl
          bg-linear-to-r from-[#51C4F6] via-[#7A45C5] to-[#FF8A3D]
          opacity-90
          transition-all duration-300
          
          md:bg-none
          
          /* Apply hover styles based on the 'isHovered' prop */
          ${
            isHovered
              ? "md:bg-linear-to-r opacity-100"
              : "md:bg-none opacity-90"
          }
        `}
        >
          {/* Soft glowing aura */}
          <div
            className={`
            absolute inset-0 rounded-2xl
            blur-xl transition-all duration-500
            bg-linear-to-r from-[#51C4F6] via-[#7A45C5] to-[#FF8A3D]
            
            /* Apply aura based on the 'isHovered' prop */
            ${isHovered ? "opacity-60" : "opacity-0"}
          `}
          />

          {/* Content Box */}
          <div
            className="
            relative z-[2]
            bg-white rounded-[15px]
            px-6 py-5 md:px-7 md:py-6
            flex flex-col
            justify-start
            min-h-[150px] md:min-h-40
            transition-all duration-300
          "
          >
            <h3
              className="
              font-bold
              text-[24px] md:text-[32px]
              leading-8 md:leading-[38px]
            "
            >
              {title}
            </h3>
            <p
              className="
              font-normal
              text-lg
              leading-6
              mt-2
            "
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

// Set display name for React DevTools
WhoWeBuildForCard.displayName = "WhoWeBuildForCard";

export default WhoWeBuildForCard;
