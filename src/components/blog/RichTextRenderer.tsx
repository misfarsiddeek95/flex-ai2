"use client";

import React from "react";
import Image from "next/image";

interface RichTextRendererProps {
  htmlContent: string;
  className?: string;
}

export default function RichTextRenderer({
  htmlContent,
  className = "",
}: RichTextRendererProps) {
  // Create a ref for the content container
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) return;

    // Process images: convert img tags to Next.js Image components
    const images = contentRef.current.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "Blog image";

      if (src) {
        // Create a wrapper div for the image
        const wrapper = document.createElement("div");
        wrapper.className =
          "relative w-full my-8 rounded-xl overflow-hidden shadow-md";
        wrapper.style.minHeight = "400px";

        // For now, keep the img tag but add proper styling
        img.className = "w-full h-auto rounded-xl";
        img.style.maxWidth = "100%";
        img.style.height = "auto";
      }
    });

    // Process videos: ensure proper responsive containers
    const videos = contentRef.current.querySelectorAll("video");
    videos.forEach((video) => {
      if (!video.parentElement?.classList.contains("video-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className =
          "video-wrapper relative w-full my-8 rounded-xl overflow-hidden";
        wrapper.style.paddingBottom = "56.25%"; // 16:9 aspect ratio

        video.className = "absolute top-0 left-0 w-full h-full";
        video.setAttribute("controls", "true");

        video.parentNode?.insertBefore(wrapper, video);
        wrapper.appendChild(video);
      }
    });
  }, [htmlContent]);

  return (
    <div
      ref={contentRef}
      className={`rich-text-content max-w-[800px] mx-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={
        {
          // This will be enhanced with CSS
        }
      }
    />
  );
}
