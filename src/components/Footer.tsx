"use client";

import Image from "next/image";
import Link from "next/link";
import { useContactModal } from "@/contexts/ContactModalContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// --- Icon Components (unchanged) ---
const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.9455 23L10.396 15.0901L3.44886 23H0.509766L9.09209 13.2311L0.509766 1H8.05571L13.286 8.45502L19.8393 1H22.7784L14.5943 10.3165L23.4914 23H15.9455ZM19.2185 20.77H17.2398L4.71811 3.23H6.6971L11.7121 10.2532L12.5793 11.4719L19.2185 20.77Z"
      fill="url(#paint0_linear_346_304)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_346_304"
        x1="1.92092"
        y1="1"
        x2="26.8613"
        y2="5.92102"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#42A5F5" />
        <stop offset="1" stopColor="#7E57C2" />
      </linearGradient>
    </defs>
  </svg>
);
const LinkedInIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_346_305)">
      <path
        d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
        fill="url(#paint0_linear_346_305)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_346_305"
        x1="1.47368"
        y1="6.97275e-07"
        x2="27.6011"
        y2="4.93503"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#42A5F5" />
        <stop offset="1" stopColor="#7E57C2" />
      </linearGradient>
      <clipPath id="clip0_346_305">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const YouTubeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.7609 7.1998C23.7609 7.1998 23.5266 5.54512 22.8047 4.81855C21.8906 3.8623 20.8688 3.85762 20.4 3.80137C17.0438 3.55762 12.0047 3.55762 12.0047 3.55762H11.9953C11.9953 3.55762 6.95625 3.55762 3.6 3.80137C3.13125 3.85762 2.10938 3.8623 1.19531 4.81855C0.473438 5.54512 0.24375 7.1998 0.24375 7.1998C0.24375 7.1998 0 9.14512 0 11.0857V12.9045C0 14.8451 0.239062 16.7904 0.239062 16.7904C0.239062 16.7904 0.473437 18.4451 1.19062 19.1717C2.10469 20.1279 3.30469 20.0951 3.83906 20.1982C5.76094 20.3811 12 20.4373 12 20.4373C12 20.4373 17.0438 20.4279 20.4 20.1889C20.8688 20.1326 21.8906 20.1279 22.8047 19.1717C23.5266 18.4451 23.7609 16.7904 23.7609 16.7904C23.7609 16.7904 24 14.8498 24 12.9045V11.0857C24 9.14512 23.7609 7.1998 23.7609 7.1998ZM9.52031 15.1123V8.36699L16.0031 11.7514L9.52031 15.1123Z"
      fill="url(#paint0_linear_346_306)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_346_306"
        x1="1.47368"
        y1="3.55762"
        x2="26.7128"
        y2="10.3358"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#42A5F5" />
        <stop offset="1" stopColor="#7E57C2" />
      </linearGradient>
    </defs>
  </svg>
);
const GitHubIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_346_307)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
        fill="url(#paint0_linear_346_307)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_346_307"
        x1="1.47368"
        y1="6.81183e-07"
        x2="27.5581"
        y2="5.04331"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#42A5F5" />
        <stop offset="1" stopColor="#7E57C2" />
      </linearGradient>
      <clipPath id="clip0_346_307">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// --- Data for Links ---
const products = [
  { name: "Gitrevio", href: "#" },
  { name: "Workrevio", href: "#" },
  { name: "Frankie", href: "#" },
  { name: "Flexdoc", href: "#" },
  { name: "Kaleidux", href: "#" },
  { name: "Xiana", href: "#" },
  { name: "Margin Boost", href: "#" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

const socials = [
  { name: "X", href: "#", icon: <XIcon /> },
  { name: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  { name: "YouTube", href: "#", icon: <YouTubeIcon /> },
  { name: "GitHub", href: "#", icon: <GitHubIcon /> },
];

// --- Main Component ---
export default function Footer() {
  const { openModal } = useContactModal();
  const ctaRef = useRef(null);

  // Track scroll progress of the CTA section
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"], // Track from when it enters to when it leaves viewport
  });

  // Transform scroll progress to scale (0.85 to 1.05)
  // When section enters viewport (scrollYProgress 0), scale is 0.85
  // When section is centered (scrollYProgress 0.5), scale is 1.05
  // When section leaves (scrollYProgress 1), scale is 0.85
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);

  // Optional: Add opacity for extra effect
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.5, 1, 1, 0.5]
  );

  return (
    <footer className="bg-white">
      {/* ===== LAYER 1: Main Content Layer ===== */}
      <div className="bg-linear-to-br from-[#F8F9FA] via-[#F5F7FA] to-[#F0F4F8] relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-[#42A5F5]/10 to-[#7E57C2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-[#FF6F00]/10 to-[#C33C00]/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          {/* Top Row: CTA Section */}
          <div className="mb-12 md:mb-16" ref={ctaRef}>
            <motion.div
              style={{
                scale: scale,
                opacity: opacity,
              }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/50 transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left: Catchy CTA */}
                <div className="text-center lg:text-left">
                  <h2 className="font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-tight mb-4">
                    <span className="bg-linear-to-r from-[#42A5F5] via-[#7E57C2] to-[#FF6F00] bg-clip-text text-transparent">
                      Still Curious?
                    </span>
                  </h2>
                  <p className="text-[18px] md:text-[21px] text-[#616161] mb-6">
                    Let&apos;s turn your ideas into reality. We&apos;re just a
                    message away!
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      href="mailto:hello@flexiana.com"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-[#FF6F00] to-[#C33C00] text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      hello@flexiana.com
                    </Link>

                    <button
                      onClick={openModal}
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#42A5F5] text-[#42A5F5] font-semibold rounded-xl shadow-md hover:bg-[#42A5F5] hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      Say Hi!
                    </button>
                  </div>
                </div>

                {/* Right: Social Icons */}
                <div className="flex justify-center lg:justify-end">
                  <div className="flex gap-4">
                    {socials.map((social) => (
                      <Link
                        key={social.name}
                        href={social.href}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                        aria-label={`Flexiana on ${social.name}`}
                      >
                        <div className="transform group-hover:scale-110 transition-transform">
                          {social.icon}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Logo & Links */}
          <div className="border-t border-gray-200/50 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left: Logo */}
              <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                <Image
                  src="/logo.svg"
                  alt="Flexiana AI Logo"
                  width={200}
                  height={40}
                  className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                  priority
                />
              </div>

              {/* Right: All Links Section */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
                {/* Products Links - 2 Columns */}
                <div className="w-full lg:w-auto">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto lg:mx-0">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="font-sans text-[15px] text-[#1A1A1A] hover:text-[#42A5F5] transition-colors duration-200 font-medium text-center lg:text-left"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Legal Links - Horizontal on Mobile, Vertical on Desktop */}
                <div className="flex flex-row flex-wrap lg:flex-col justify-center lg:justify-start gap-4 lg:gap-3 items-center lg:items-start w-full lg:w-auto">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="font-sans text-[14px] text-[#616161] hover:text-[#42A5F5] transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#42A5F5] after:to-[#7E57C2] hover:after:w-full after:transition-all after:duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== LAYER 2: Copyright Layer ===== */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="font-sans text-[14px] text-[#616161]">
              © {new Date().getFullYear()} Flexiana AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
