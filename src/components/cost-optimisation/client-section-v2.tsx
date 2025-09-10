"use client";

import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeFade,
} from "@/components/ui/marquee";

const partnerLogos = [
  { name: "Mayo Clinic", src: "/logo/client-1.webp", alt: "Mayo Clinic" },
  { name: "Cisco", src: "/logo/client-1.webp", alt: "Cisco" },
  { name: "TIME", src: "/logo/client-1.webp", alt: "TIME" },
  { name: "DLA Piper", src: "/logo/client-1.webp", alt: "DLA Piper" },
  {
    name: "Global Atlantic",
    src: "/logo/client-1.webp",
    alt: "Global Atlantic",
  },
  { name: "Howard Hughes", src: "/logo/client-1.webp", alt: "Howard Hughes" },
  { name: "Cengage", src: "/logo/client-1.webp", alt: "Cengage" },
];

export default function ClientSectionV2() {
  return (
    <div className="py-20  bg-foreground/[0.02]">
      <div className=" mx-auto px-4">
        {/* Main Text */}
        <div className="text-center pb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-4">
            Proven Savings. Real Impact
          </h2>
        </div>

        {/* Micro-Metrics */}
        <div className="flex gap-16 mb-4 justify-center items-center">
          <p className="text-lg font-medium border-b">
            <span className="font-bold text-2xl">12+</span> Years in Amazon/AWS
          </p>
          <p className="text-lg font-medium border-b">
            <span className="font-bold text-2xl">$60M+</span> Annual Savings
          </p>
          <p className="text-lg font-medium border-b">
            Up to <span className="font-bold text-2xl">68%</span> Annual Savings
          </p>
        </div>

        {/* Partner Logos Marquee */}
        <div className="relative">
          <Marquee className="pt-8">
            <MarqueeContent
              speed={60}
              pauseOnHover={true}
              loop={0}
              autoFill={true}
            >
              {partnerLogos.map((logo, index) => (
                <MarqueeItem key={index} className="mx-8">
                  <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={80}
                      className="w-full h-full object-contain transition-opacity duration-300"
                    />
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>

          {/* Fade edges */}
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
        </div>
      </div>
    </div>
  );
}
