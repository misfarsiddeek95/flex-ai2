"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/contexts/ContactModalContext";

const shouldUseDarkBackground = (pathname: string): boolean => {
  // Exact matches
  if (pathname === "/about" || pathname === "/case-studies") {
    return true;
  }

  // Blog detail pages: /blog/[slug] (but not /blog)
  if (pathname.startsWith("/blog/") && pathname !== "/blog") {
    return true;
  }

  // Case study detail pages: /case-studies/[slug]
  if (pathname.startsWith("/case-studies/")) {
    return true;
  }

  return false;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useContactModal();

  const navColor = shouldUseDarkBackground(pathname)
    ? "bg-black/30"
    : "bg-white/15";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full flex justify-center pt-6 sm:pt-8">
      {/* Relative container for positioning dropdown */}
      <div className="relative max-w-4xl w-full mx-4">
        {/* The floating, glassmorphism bar */}
        <div
          className={`relative z-10 flex items-center justify-between w-full px-5 py-0 sm:py-2 ${navColor} backdrop-blur-md rounded-xl shadow-lg border border-white/10`}
        >
          <Link href="/" className="flex items-center space-x-2 sm:ml-10">
            <Image
              src="/white_logo.svg"
              alt="Flexiana AI Logo"
              width={150}
              height={30}
              priority
            />
          </Link>

          {/* Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-8 text-white text-lg font-medium">
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/case-studies"
              className="hover:text-gray-300 transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="/blog"
              className="hover:text-gray-300 transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Desktop Contact Us Button (Hidden on mobile) */}
          <button
            type="button"
            onClick={openModal}
            className="hidden md:block bg-gradient-to-r from-[#FF6F00] to-[#C33C00] text-white text-base font-normal py-[8px] px-6 rounded-lg shadow-md hover:opacity-90 transition-opacity"
          >
            Contact Us
          </button>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden w-full bg-black/40 backdrop-blur-md rounded-xl shadow-lg border border-white/10 mt-2 p-5">
            <div className="flex flex-col items-center space-y-4">
              <Link
                href="/about"
                className="text-white text-lg hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/case-studies"
                className="text-white text-lg hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="/blog"
                className="text-white text-lg hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              {/* 'Contact Us' as a full-width button in the mobile menu */}
              <button
                type="button"
                className="w-full bg-gradient-to-r from-[#FF6F00] to-[#C33C00] text-white text-base font-normal py-2 px-6 rounded-lg text-center shadow-md hover:opacity-90 transition-opacity"
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
