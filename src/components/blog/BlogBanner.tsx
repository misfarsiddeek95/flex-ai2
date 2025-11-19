import React from "react";
import Image from "next/image";

export default function BlogBanner() {
  return (
    <section className="relative w-full overflow-hidden h-[500px] max-h-[40vh] md:max-h-[60vh] min-h-[250px]">
      <Image
        src="/images/blog_banner.jpg"
        alt="Abstract white flowing lines"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-black/10 gap-3">
        <h1
          className="font-inter font-bold text-gray-900 text-center
                     text-[32px] leading-[38px]
                     md:text-[48px] md:leading-[56px]"
          style={{ letterSpacing: "0px" }}
        >
          <span className="block">What&apos;s new at</span>
          <Image
            src="/logo.svg"
            alt="Flexiana AI Logo"
            width={140}
            height={30}
            priority
            className="mt-2 block md:hidden mx-auto"
          />
        </h1>

        <Image
          src="/logo.svg"
          alt="Flexiana AI Logo"
          width={185}
          height={30}
          priority
          className="mt-2 hidden md:block"
        />
      </div>
    </section>
  );
}
